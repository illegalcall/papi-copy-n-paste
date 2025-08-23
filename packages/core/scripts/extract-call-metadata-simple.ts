#!/usr/bin/env tsx

/**
 * Simplified call metadata extractor using regex parsing
 * Extracts TxDescriptor parameter information directly from descriptor files
 */

import * as fs from 'fs';
import * as path from 'path';

interface CallMetadata {
  required: string[];
  optional: string[];
  description?: string;
  returnType?: string;
}

interface ChainCallMetadata {
  pallets: {
    [pallet: string]: {
      [call: string]: CallMetadata;
    };
  };
}

interface AllChainsMetadata {
  [chainKey: string]: ChainCallMetadata;
}

class SimpleCallExtractor {

  /**
   * Extract call metadata for all chains
   */
  extractAllMetadata(): AllChainsMetadata {
    const result: AllChainsMetadata = {};

    // Get all actual chain descriptor files (not metadata files)
    const descriptorPath = path.resolve(process.cwd(), '.papi/descriptors/dist');
    const chainFiles = fs.readdirSync(descriptorPath)
      .filter(file =>
        file.endsWith('.d.ts') &&
        !file.includes('_metadata') &&
        !file.includes('common') &&
        !file.includes('metadataTypes') &&
        !file.includes('descriptors') &&
        file !== 'index.d.ts'
      )
      .map(file => file.replace('.d.ts', ''));

    console.log(`Found chain files: ${chainFiles.join(', ')}`);

    for (const chainKey of chainFiles) {
      console.log(`🔍 Extracting call metadata for ${chainKey}...`);
      try {
        result[chainKey] = this.extractChainMetadata(chainKey);
        const totalCalls = Object.values(result[chainKey].pallets).reduce(
          (sum, pallet) => sum + Object.keys(pallet).length, 0
        );
        console.log(`✅ Extracted ${Object.keys(result[chainKey].pallets).length} pallets, ${totalCalls} calls for ${chainKey}`);
      } catch (error) {
        console.warn(`⚠️  Failed to extract call metadata for ${chainKey}:`, error);
        result[chainKey] = { pallets: {} };
      }
    }

    return result;
  }

  /**
   * Extract call metadata for a specific chain using regex parsing
   */
  private extractChainMetadata(chainKey: string): ChainCallMetadata {
    const descriptorFile = path.resolve(process.cwd(), '.papi/descriptors/dist', `${chainKey}.d.ts`);

    if (!fs.existsSync(descriptorFile)) {
      throw new Error(`Descriptor file not found: ${descriptorFile}`);
    }

    const fileContent = fs.readFileSync(descriptorFile, 'utf-8');
    const metadata: ChainCallMetadata = { pallets: {} };

    // Find the ICalls type definition using a more robust approach
    const txTypeStart = fileContent.indexOf('type ICalls = {');
    if (txTypeStart === -1) {
      console.warn(`No ICalls type found in ${chainKey}`);
      return metadata;
    }

    // Find the matching closing brace by counting braces
    let braceCount = 0;
    let txTypeEnd = -1;
    let inTx = false;

    for (let i = txTypeStart; i < fileContent.length; i++) {
      const char = fileContent[i];

      if (char === '{') {
        braceCount++;
        inTx = true;
      } else if (char === '}') {
        braceCount--;
        if (inTx && braceCount === 0) {
          txTypeEnd = i;
          break;
        }
      }
    }

    if (txTypeEnd === -1) {
      console.warn(`Could not find end of ICalls type in ${chainKey}`);
      return metadata;
    }

    // Extract the content between the opening and closing braces
    const openBracePos = fileContent.indexOf('{', txTypeStart) + 1;
    const txContent = fileContent.substring(openBracePos, txTypeEnd);
    console.log(`  🔍 ICalls content length: ${txContent.length} characters`);

    // Parse pallets by finding pallet blocks with proper brace matching
    const pallets = this.parsePallets(txContent);
    console.log(`  🔍 Found ${Object.keys(pallets).length} pallets: ${Object.keys(pallets).join(', ')}`);

    for (const [palletName, palletContent] of Object.entries(pallets)) {
      console.log(`  📦 Processing pallet: ${palletName}`);
      metadata.pallets[palletName] = {};

      // Parse call items in the pallet using improved regex to handle both formats:
      // Format 1: TxDescriptor<[Key: Type], ...>
      // Format 2: TxDescriptor<Anonymize<...>, ...>
      const callRegex = /(\w+): TxDescriptor<(?:\[(.*?)\]|([^,\>]+))(?:,\s*[^>]*)?\>/g;
      let callMatch;

      while ((callMatch = callRegex.exec(palletContent)) !== null) {
        const callName = callMatch[1];
        // Handle both formats: bracketed args [2] or direct type [3]
        const callArgs = (callMatch[2] || callMatch[3] || '').trim();

        // Extract parameter types from the arguments
        const parameters = this.parseCallArguments(callArgs, palletName, callName);

        metadata.pallets[palletName][callName] = {
          required: parameters,
          optional: [],
          description: this.extractDescription(palletContent, callName),
          returnType: 'void', // Calls typically don't have return types
        };

        console.log(`    📝 Found call: ${callName} (${parameters.join(', ')})`);
      }
    }

    return metadata;
  }

  /**
   * Parse pallets from IStorage content using proper brace matching
   */
  private parsePallets(content: string): Record<string, string> {
    const pallets: Record<string, string> = {};
    const lines = content.split('\n');

    let currentPallet = '';
    let currentContent: string[] = [];
    let braceDepth = 0;
    let inPallet = false;

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];

      // Check if line starts a new pallet (format: "    PalletName: {")
      const palletMatch = line.match(/^\s{4}(\w+): \{$/);
      if (palletMatch) {
        // Save previous pallet if we have one
        if (currentPallet && currentContent.length > 0) {
          pallets[currentPallet] = currentContent.join('\n').trim();
        }

        // Start new pallet
        currentPallet = palletMatch[1];
        currentContent = [];
        braceDepth = 1;
        inPallet = true;
        continue;
      }

      if (inPallet) {
        // Count braces to track depth
        const openBraces = (line.match(/\{/g) || []).length;
        const closeBraces = (line.match(/\}/g) || []).length;
        braceDepth += openBraces - closeBraces;

        // Add line to current pallet content
        currentContent.push(line);

        // If we've closed all braces for this pallet, end it
        if (braceDepth === 0 && line.trim() === '};') {
          // Remove the closing "};" line from content
          currentContent.pop();
          pallets[currentPallet] = currentContent.join('\n').trim();
          console.log(`    ✅ Extracted pallet ${currentPallet}: ${currentContent.length} lines`);

          // Reset for next pallet
          currentPallet = '';
          currentContent = [];
          inPallet = false;
        }
      }
    }

    // Handle final pallet if file doesn't end cleanly
    if (currentPallet && currentContent.length > 0) {
      pallets[currentPallet] = currentContent.join('\n').trim();
      console.log(`    ✅ Extracted final pallet ${currentPallet}: ${currentContent.length} lines`);
    }

    console.log(`  🔍 Total pallets extracted: ${Object.keys(pallets).length}`);
    return pallets;
  }

  /**
   * Split storage content into top-level sections (pallets)
   */
  private splitTopLevelSections(content: string): string[] {
    const sections: string[] = [];
    let currentSection = '';
    let braceCount = 0;
    let inSection = false;

    const lines = content.split('\n');

    for (const line of lines) {
      // Check if this line starts a new top-level section
      const topLevelMatch = line.match(/^\s*(\w+): \{/);

      if (topLevelMatch && braceCount === 0) {
        // Save previous section if we have one
        if (currentSection.trim() && inSection) {
          sections.push(currentSection.trim());
        }

        // Start new section
        currentSection = line + '\n';
        braceCount = 1;
        inSection = true;
      } else if (inSection) {
        currentSection += line + '\n';

        // Count braces to track nesting
        for (const char of line) {
          if (char === '{') braceCount++;
          else if (char === '}') braceCount--;
        }

        // If we've closed all braces, end this section
        if (braceCount === 0) {
          sections.push(currentSection.trim());
          currentSection = '';
          inSection = false;
        }
      }
    }

    // Add final section if needed
    if (currentSection.trim() && inSection) {
      sections.push(currentSection.trim());
    }

    return sections;
  }

  /**
   * Parse call arguments to extract parameter types
   */
  private parseCallArguments(args: string, palletName: string, callName: string): string[] {
    if (!args || args.trim() === '') {
      return [];
    }

    const parameters: string[] = [];

    // Handle Anonymize<...> types - these indicate complex multi-parameter types
    if (args.startsWith('Anonymize<')) {
      // Use pattern matching to determine parameters based on pallet and storage name
      return this.getParametersFromPattern(palletName, callName);
    }

    // Split by comma and parse each parameter (for bracket format like [Key: Type])
    const parts = args.split(',').map(part => part.trim());

    for (const part of parts) {
      if (part.includes(':')) {
        // Extract type after the colon
        const typePart = part.split(':')[1].trim();
        const paramType = this.mapTypeToParameterType(typePart);
        parameters.push(paramType);
      }
    }

    return parameters;
  }

  /**
   * Get parameters from pattern matching for common call patterns
   */
  private getParametersFromPattern(pallet: string, call: string): string[] {
    // Balances pallet patterns
    if (pallet === 'Balances') {
      if (/^transfer$/.test(call)) return ['AccountId', 'Balance'];
      if (/^transfer_allow_death$/.test(call)) return ['AccountId', 'Balance'];
      if (/^transfer_keep_alive$/.test(call)) return ['AccountId', 'Balance'];
      if (/^force_transfer$/.test(call)) return ['AccountId', 'AccountId', 'Balance'];
      if (/^set_balance$/.test(call)) return ['AccountId', 'Balance', 'Balance'];
    }

    // Assets pallet patterns
    if (pallet === 'Assets') {
      if (/^transfer$/.test(call)) return ['AssetId', 'AccountId', 'Balance'];
      if (/^transfer_keep_alive$/.test(call)) return ['AssetId', 'AccountId', 'Balance'];
      if (/^create$/.test(call)) return ['AssetId', 'AccountId', 'Balance'];
      if (/^mint$/.test(call)) return ['AssetId', 'AccountId', 'Balance'];
      if (/^burn$/.test(call)) return ['AssetId', 'AccountId', 'Balance'];
    }

    // System pallet patterns
    if (pallet === 'System') {
      if (/^remark$/.test(call)) return ['bytes'];
      if (/^set_code$/.test(call)) return ['bytes'];
      if (/^kill_storage$/.test(call)) return ['Vec<bytes>'];
    }

    // Staking pallet patterns
    if (pallet === 'Staking') {
      if (/^bond$/.test(call)) return ['AccountId', 'Balance', 'RewardDestination'];
      if (/^nominate$/.test(call)) return ['Vec<AccountId>'];
      if (/^unbond$/.test(call)) return ['Balance'];
      if (/^validate$/.test(call)) return ['ValidatorPrefs'];
    }

    // Democracy pallet patterns
    if (pallet === 'Democracy') {
      if (/^propose$/.test(call)) return ['Hash', 'Balance'];
      if (/^vote$/.test(call)) return ['u32', 'AccountVote'];
      if (/^second$/.test(call)) return ['u32', 'u32'];
    }

    // Default: assume no parameters for unknown complex types
    return [];
  }

  /**
   * Extract and clean return type from StorageDescriptor
   */
  private extractReturnType(returnTypeRaw: string): string {
    // Remove Anonymize wrapper and clean the type
    let returnType = returnTypeRaw.replace(/^Anonymize</, '').replace(/>$/, '');

    // Map specific PAPI types to more readable types
    const returnTypeMap: Record<string, string> = {
      'bigint': 'bigint',
      'number': 'number',
      'boolean': 'boolean',
      'string': 'string',
      'Binary': 'Uint8Array',
      'SS58String': 'string',
      'FixedSizeBinary<32>': 'Hash',
      'H256': 'Hash',
    };

    // Check for exact matches first
    if (returnTypeMap[returnType]) {
      return returnTypeMap[returnType];
    }

    // Handle specific patterns
    if (returnType.startsWith('FixedSizeBinary<')) {
      return 'Hash';
    }

    if (returnType.startsWith('I') && returnType.length > 10) {
      // These are complex anonymized types - try to infer from name context
      return 'unknown';
    }

    // Return the cleaned type
    return returnType;
  }

  /**
   * Map TypeScript types to parameter types
   */
  private mapTypeToParameterType(tsType: string): string {
    // Remove any generic brackets for matching
    const cleanType = tsType.replace(/[<>]/g, '');

    const typeMap: Record<string, string> = {
      'SS58String': 'AccountId',
      'AccountId32': 'AccountId',
      'MultiAddress': 'AccountId',
      'HexString': 'HexString',
      'number': 'u32',
      'bigint': 'u64',
      'boolean': 'bool',
      'string': 'string',
      'Binary': 'bytes',
      'FixedSizeBinary<32>': 'Hash',
      'FixedSizeBinary': 'Hash',
      'H256': 'Hash'
    };

    // Check exact matches first for FixedSizeBinary<32>
    if (tsType.includes('FixedSizeBinary<32>')) {
      return 'Hash';
    }

    // Check other exact matches
    for (const [pattern, result] of Object.entries(typeMap)) {
      if (tsType.includes(pattern)) {
        return result;
      }
    }

    // Handle specific patterns
    if (tsType.includes('AccountId') || tsType.includes('SS58')) {
      return 'AccountId';
    }

    if (tsType.includes('Balance') || tsType.includes('Compact<bigint>')) {
      return 'Balance';
    }

    if (tsType.includes('Compact<number>') || tsType.startsWith('u') || tsType.startsWith('i')) {
      return 'u32';
    }

    // Default fallback
    return tsType.replace(/[<>,\s]/g, '_');
  }

  /**
   * Extract description comment for call item
   */
  private extractDescription(palletContent: string, callName: string): string {
    const lines = palletContent.split('\n');
    let description = '';

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];

      // If this line contains our call name
      if (line && line.includes(`${callName}:`)) {
        // Look backwards for comment lines
        for (let j = i - 1; j >= 0; j--) {
          const commentLine = lines[j]?.trim();
          if (commentLine && commentLine.startsWith('*') && !commentLine.startsWith('*/')) {
            const comment = commentLine.replace(/^\*\s?/, '').trim();
            if (comment) {
              description = comment;
              break;
            }
          } else if (commentLine !== '/**' && commentLine !== '') {
            break;
          }
        }
        break;
      }
    }

    return description || `Call ${callName}`;
  }
}

/**
 * Main execution
 */
async function main() {
  console.log('🚀 Starting simplified call metadata extraction...');

  try {
    const extractor = new SimpleCallExtractor();
    const metadata = extractor.extractAllMetadata();

    // Generate the metadata file
    const outputPath = path.resolve(process.cwd(), 'packages/core/generated/call-metadata.json');
    const outputDir = path.dirname(outputPath);

    // Ensure output directory exists
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    // Write metadata
    fs.writeFileSync(outputPath, JSON.stringify(metadata, null, 2));

    // Generate TypeScript interface file
    const tsOutputPath = path.resolve(process.cwd(), 'packages/core/generated/call-metadata.ts');
    generateTypeScriptInterface(metadata, tsOutputPath);

    console.log('✅ Call metadata extraction completed!');
    console.log(`📄 Generated: ${outputPath}`);
    console.log(`📄 Generated: ${tsOutputPath}`);

    // Print summary
    const totalChains = Object.keys(metadata).length;
    const totalPallets = Object.values(metadata).reduce((sum, chain) => sum + Object.keys(chain.pallets).length, 0);
    const totalCalls = Object.values(metadata).reduce((sum, chain) =>
      sum + Object.values(chain.pallets).reduce((palletSum, pallet) => palletSum + Object.keys(pallet).length, 0), 0
    );

    console.log(`📊 Summary: ${totalChains} chains, ${totalPallets} pallets, ${totalCalls} calls`);

    // Show sample data
    console.log('\n🔍 Sample data:');
    for (const [chainKey, chainData] of Object.entries(metadata)) {
      console.log(`\n${chainKey}:`);
      for (const [palletName, palletData] of Object.entries(chainData.pallets)) {
        const callCount = Object.keys(palletData).length;
        console.log(`  ${palletName}: ${callCount} calls`);

        // Show a few examples
        const examples = Object.entries(palletData).slice(0, 3);
        for (const [callName, callInfo] of examples) {
          console.log(`    ${callName}: [${callInfo.required.join(', ')}]`);
        }

        if (callCount > 3) {
          console.log(`    ... and ${callCount - 3} more`);
        }
        break; // Just show first pallet
      }
      if (Object.keys(chainData.pallets).length > 0) break; // Just show first chain
    }

  } catch (error) {
    console.error('❌ Metadata extraction failed:', error);
    process.exit(1);
  }
}

/**
 * Generate TypeScript interface file
 */
function generateTypeScriptInterface(metadata: AllChainsMetadata, outputPath: string): void {
  const content = `/**
 * Auto-generated call metadata from PAPI descriptors
 * Generated on: ${new Date().toISOString()}
 */

export interface CallParameterInfo {
  required: string[];
  optional: string[];
  description?: string;
  returnType?: string;
}

export interface ChainCallMetadata {
  pallets: {
    [pallet: string]: {
      [call: string]: CallParameterInfo;
    };
  };
}

export const callMetadata: { [chainKey: string]: ChainCallMetadata } = ${JSON.stringify(metadata, null, 2)};

/**
 * Get call parameters for a specific chain, pallet, and call
 */
export function getCallParameters(chainKey: string, pallet: string, call: string): string[] {
  return callMetadata[chainKey]?.pallets?.[pallet]?.[call]?.required || [];
}

/**
 * Check if a call exists
 */
export function hasCall(chainKey: string, pallet: string, call: string): boolean {
  return !!(callMetadata[chainKey]?.pallets?.[pallet]?.[call]);
}

/**
 * Get all supported chains
 */
export function getSupportedChains(): string[] {
  return Object.keys(callMetadata);
}

/**
 * Get all supported pallets for a chain
 */
export function getSupportedPallets(chainKey: string): string[] {
  return Object.keys(callMetadata[chainKey]?.pallets || {});
}

/**
 * Get all supported calls for a pallet
 */
export function getSupportedCalls(chainKey: string, pallet: string): string[] {
  return Object.keys(callMetadata[chainKey]?.pallets?.[pallet] || {});
}

/**
 * Get return type for a call
 */
export function getCallReturnType(chainKey: string, pallet: string, call: string): string {
  return callMetadata[chainKey]?.pallets?.[pallet]?.[call]?.returnType || 'void';
}
`;

  fs.writeFileSync(outputPath, content);
}

// Run the script
main().catch(console.error);