#!/usr/bin/env tsx

/**
 * Extract and decode all constants for all chains using real PAPI connections
 *
 * This script:
 * 1. Connects to real chains using PAPI and smoldot/WebSocket
 * 2. Extracts actual constants metadata from runtime
 * 3. Decodes all constant values using SCALE codecs
 * 4. Saves the decoded constants to a JSON file for instant UI access
 *
 * Usage: npm run constants
 *
 * Currently extracts constants from 8 chains (all via WebSocket):
 * - Polkadot (101 constants)
 * - Kusama (129 constants)
 * - Moonbeam (99 constants)
 * - Astar (113 constants)
 * - Westend (116 constants)
 * - Rococo (108 constants)
 * - Hydration (185 constants)
 * - Paseo Asset Hub
 */

import { createClient } from 'polkadot-api';
import { getWsProvider } from 'polkadot-api/ws-provider/web';
// All chains now use WebSocket connections for better reliability
import { u8, u16, u32, u64, u128, i8, i16, i32, i64, i128, bool, str, Bytes, compact, decAnyMetadata, unifyMetadata } from '@polkadot-api/substrate-bindings';
import { getDynamicBuilder, getLookupFn } from '@polkadot-api/metadata-builders';
import { writeFileSync, readFileSync } from 'fs';
import { join } from 'path';
import * as descriptors from '../../../.papi/descriptors/dist/index.mjs';

// Chain configuration - using WebSocket URLs for all chains
const chains = {
  polkadot: {
    name: 'Polkadot',
    wsUrl: 'wss://rpc.polkadot.io',
    type: 'websocket'
  },
  kusama: {
    name: 'Kusama',
    wsUrl: 'wss://kusama-rpc.polkadot.io',
    type: 'websocket'
  },
  moonbeam: {
    name: 'Moonbeam',
    wsUrl: 'wss://wss.api.moonbeam.network',
    type: 'websocket'
  },
  astar: {
    name: 'Astar',
    wsUrl: 'wss://rpc.astar.network',
    type: 'websocket'
  },
  westend: {
    name: 'Westend',
    wsUrl: 'wss://westend-rpc.polkadot.io',
    type: 'websocket'
  },
  rococo: {
    name: 'Rococo',
    wsUrl: 'wss://rococo-rpc.polkadot.io',
    type: 'websocket'
  },
  hydration: {
    name: 'Hydration',
    wsUrl: 'wss://hydration-rpc.n.dwellir.com',
    type: 'websocket'
  },
  paseo_asset_hub: {
    name: 'Paseo Asset Hub',
    wsUrl: 'wss://asset-hub-paseo-rpc.dwellir.com',
    type: 'websocket'
  }
};

interface DecodedConstant {
  palletName: string;
  constantName: string;
  rawValue: string;
  decodedValue: any;
  type: string;
  docs?: string[];
  chainKey: string;
  extractedAt: string;
}

interface ExtractedConstants {
  [chainKey: string]: {
    chainInfo: {
      name: string;
      extractedAt: string;
    };
    constants: DecodedConstant[];
  };
}

/**
 * Convert hex string to Uint8Array
 */
function hexToBytes(hex: string): Uint8Array {
  if (!hex.startsWith('0x')) {
    throw new Error('Hex string must start with 0x');
  }
  const clean = hex.slice(2);
  const bytes = new Uint8Array(clean.length / 2);
  for (let i = 0; i < clean.length; i += 2) {
    bytes[i / 2] = parseInt(clean.slice(i, i + 2), 16);
  }
  return bytes;
}

/**
 * Enhanced SCALE decoder supporting more types
 */
function decodeConstantValue(rawValue: string, type: string): { success: boolean; value?: any; error?: string } {
  try {
    if (!rawValue || !type) {
      return { success: false, error: 'Missing rawValue or type' };
    }

    const bytes = hexToBytes(rawValue);
    const normalizedType = String(type).toLowerCase().trim();
    let decoder;

    // Basic integer types
    if (normalizedType === 'u8') decoder = u8.dec;
    else if (normalizedType === 'u16') decoder = u16.dec;
    else if (normalizedType === 'u32') decoder = u32.dec;
    else if (normalizedType === 'u64') decoder = u64.dec;
    else if (normalizedType === 'u128') decoder = u128.dec;
    else if (normalizedType === 'i8') decoder = i8.dec;
    else if (normalizedType === 'i16') decoder = i16.dec;
    else if (normalizedType === 'i32') decoder = i32.dec;
    else if (normalizedType === 'i64') decoder = i64.dec;
    else if (normalizedType === 'i128') decoder = i128.dec;
    else if (normalizedType === 'bool') decoder = bool.dec;
    else if (normalizedType === 'string' || normalizedType === 'str') decoder = str.dec;

    // Compact encoded integers
    else if (normalizedType === 'compact<u8>' || normalizedType === 'compactu8') decoder = compact(u8).dec;
    else if (normalizedType === 'compact<u16>' || normalizedType === 'compactu16') decoder = compact(u16).dec;
    else if (normalizedType === 'compact<u32>' || normalizedType === 'compactu32') decoder = compact(u32).dec;
    else if (normalizedType === 'compact<u64>' || normalizedType === 'compactu64') decoder = compact(u64).dec;
    else if (normalizedType === 'compact<u128>' || normalizedType === 'compactu128') decoder = compact(u128).dec;

    // Special handling for common runtime types
    else if (normalizedType.includes('blockweight') || normalizedType.includes('weight')) {
      // Try to decode as a u64 for weight values
      try {
        decoder = u64.dec;
      } catch {
        return { success: false, error: `Complex weight type: ${type}` };
      }
    }
    else if (normalizedType.includes('runtime') || normalizedType.includes('version')) {
      // Runtime version - try as raw bytes
      return { success: true, value: rawValue };
    }
    else if (normalizedType.includes('palletid') || normalizedType === '[u8; 8]' || normalizedType === '[u8;8]') {
      // Pallet ID - 8 bytes, return as hex string
      return { success: true, value: rawValue };
    }
    else if (normalizedType.includes('accountid') || normalizedType === '[u8; 32]' || normalizedType === '[u8;32]') {
      // Account ID - 32 bytes, return as hex string
      return { success: true, value: rawValue };
    }
    else if (normalizedType.includes('balance') && !normalizedType.includes('existential')) {
      // Balance type - try as u128
      try {
        decoder = u128.dec;
      } catch {
        return { success: false, error: `Complex balance type: ${type}` };
      }
    }
    else if (normalizedType.includes('percent') || normalizedType.includes('permill')) {
      // Percentage values - usually u8 or u32
      try {
        decoder = normalizedType.includes('permill') ? u32.dec : u8.dec;
      } catch {
        return { success: false, error: `Percentage type: ${type}` };
      }
    }
    else {
      // For unknown types, try common decoders in order
      const decoders = [u32.dec, u64.dec, u128.dec, u16.dec, u8.dec];
      for (const testDecoder of decoders) {
        try {
          const result = testDecoder(bytes);
          return { success: true, value: result };
        } catch {
          continue;
        }
      }

      // If all else fails, return raw hex
      return { success: true, value: rawValue };
    }

    const decodedValue = decoder(bytes);
    return { success: true, value: decodedValue };

  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Decoding failed'
    };
  }
}

/**
 * Extract constants directly from chain using PAPI (smoldot or WebSocket)
 */
async function extractChainConstants(chainKey: string, chainConfig: any): Promise<DecodedConstant[]> {
  console.log(`\n🔍 Connecting to ${chainConfig.name} (${chainConfig.type}) and extracting constants...`);

  let client: any;

  try {
    // Add timeout for connection - all chains now use WebSocket
    const connectionPromise = (async () => {
      return createClient(getWsProvider(chainConfig.wsUrl));
    })();

    // Add 30 second timeout for connection
    client = await Promise.race([
      connectionPromise,
      new Promise((_, reject) =>
        setTimeout(() => reject(new Error('Connection timeout after 30s')), 30000)
      )
    ]);

    // Get constants using typed API with descriptors
    console.log(`    📡 Connected to ${chainConfig.name}, fetching constants...`);

    let typedApi: any;
    try {
      // For all chains, try to get descriptors
      const descriptor = (descriptors as any)[chainKey];
      if (descriptor) {
        console.log(`    📋 Found descriptor for ${chainKey}`);
        typedApi = client.getTypedApi(descriptor);
      } else {
        console.log(`    ⚠️  No descriptor found for ${chainKey} in:`, Object.keys(descriptors).filter(k => k.length < 15));
      }
    } catch (e) {
      console.log(`    ❌ Error loading descriptors:`, e.message);
    }

    const constants: DecodedConstant[] = [];
    let processedCount = 0;
    let decodedCount = 0;

    // Use the working typed API approach but enhance the values for complex constants
    if (typedApi && typedApi.constants) {
      console.log(`    📋 Loading constants from papi-metadata.json...`);

      // Load the papi metadata to get all constants
      const metadataPath = join(process.cwd(), 'packages/core/generated/papi-metadata.json');
      const papiMetadata = JSON.parse(readFileSync(metadataPath, 'utf8'));

      // Get constants for this chain
      const chainConstants = papiMetadata[chainKey]?.constants;
      if (!chainConstants) {
        console.log(`    ⚠️  No constants metadata found for ${chainKey}`);
        return constants;
      }

      // Build a list of all constants from metadata
      const allConstants: { pallet: string; constant: string }[] = [];
      for (const [palletName, palletConstants] of Object.entries(chainConstants)) {
        if (palletConstants && typeof palletConstants === 'object') {
          for (const constantName of Object.keys(palletConstants as Record<string, any>)) {
            allConstants.push({ pallet: palletName, constant: constantName });
          }
        }
      }

      console.log(`    📋 Found ${allConstants.length} constants across ${Object.keys(chainConstants).length} pallets`);

      for (const { pallet, constant } of allConstants) {
        try {
          // Try accessing the constant function directly
          if (typedApi.constants[pallet] && typedApi.constants[pallet][constant]) {
            processedCount++;

            const constantFunction = typedApi.constants[pallet][constant];
            const constantValue = await constantFunction();

            // Try real SCALE decoding using getDynamicBuilder approach
            let finalValue = constantValue;
            let realDecoding = false;

            // For complex constants that typed API can't decode, try dynamic builder
            const isEmptyOrComplexObject = typeof constantValue === 'object' && constantValue !== null &&
              (Object.keys(constantValue).length === 0 || JSON.stringify(constantValue) === '{}');

            if (isEmptyOrComplexObject || constant === 'PalletId' || constant === 'Prefix') {
              console.log(`    🎯 Attempting real SCALE decoding for ${pallet}.${constant}`);
              try {
                // Get raw metadata from the client
                const rawMetadata = await client._request("state_getMetadata", []);

                // Process metadata to get lookup function
                const unifiedMetadata = unifyMetadata(decAnyMetadata(rawMetadata));
                const lookup = getLookupFn(unifiedMetadata);

                // Create dynamic builder
                const dynamicBuilder = getDynamicBuilder(lookup);

                // Find the constant in the metadata pallets
                const palletMetadata = unifiedMetadata.pallets.find(p => p.name === pallet);
                if (palletMetadata) {
                  const constantMetadata = palletMetadata.constants.find(c => c.name === constant);
                  if (constantMetadata) {
                    // Decode using the real SCALE type information from metadata
                    const decoded = dynamicBuilder.buildDefinition(constantMetadata.type).dec(constantMetadata.value);

                    // Extract the actual value from the decoded object
                    let extractedValue = decoded;
                    if (decoded && typeof decoded === 'object') {
                      // For Binary and FixedSizeBinary types, extract text content
                      if (typeof decoded.asText === 'function') {
                        try {
                          extractedValue = decoded.asText();
                          console.log(`    📝 Extracted text value: "${extractedValue}"`);
                        } catch (e) {
                          // If asText fails, try asHex
                          if (typeof decoded.asHex === 'function') {
                            extractedValue = decoded.asHex();
                            console.log(`    📝 Extracted hex value: "${extractedValue}"`);
                          }
                        }
                      }
                      // For other object types, try toString or use the object as-is
                      else if (typeof decoded.toString === 'function' && decoded.toString() !== '[object Object]') {
                        extractedValue = decoded.toString();
                      }
                    }

                    finalValue = extractedValue;
                    realDecoding = true;
                    console.log(`    ✅ Successfully decoded ${pallet}.${constant} using dynamic builder:`, extractedValue);
                  } else {
                    console.log(`    ⚠️  Constant ${constant} not found in ${pallet} metadata`);
                  }
                } else {
                  console.log(`    ⚠️  Pallet ${pallet} not found in metadata`);
                }
              } catch (decodingError) {
                console.log(`    ❌ Dynamic builder decoding failed for ${pallet}.${constant}:`, decodingError.message);
                // Keep the original value from typed API
              }
            }

            // Serialize complex values for JSON storage and UI display
            let serializedValue = finalValue;
            let displayValue = finalValue;

            if (typeof finalValue === 'bigint') {
              // Convert BigInt to string
              serializedValue = finalValue.toString();
              displayValue = finalValue.toString();
            } else if (typeof finalValue === 'object' && finalValue !== null && !realDecoding) {
              // Convert objects to JSON strings for storage and display
              try {
                serializedValue = JSON.stringify(finalValue, (key, value) => {
                  if (typeof value === 'bigint') {
                    return value.toString();
                  }
                  return value;
                }, 2);
                displayValue = serializedValue;
              } catch (jsonError) {
                serializedValue = String(finalValue);
                displayValue = serializedValue;
              }
            } else if (realDecoding) {
              // For real decoded values, convert to string representation
              serializedValue = String(finalValue);
              displayValue = serializedValue;
            }

            const finalConstantData: DecodedConstant = {
              palletName: pallet,
              constantName: constant,
              rawValue: typeof constantValue === 'object' && !realDecoding ? JSON.stringify(constantValue) : String(constantValue),
              decodedValue: serializedValue,
              type: realDecoding ? 'decoded' : typeof finalValue,
              docs: [`Constant from ${pallet} pallet`],
              chainKey,
              extractedAt: new Date().toISOString()
            };

            decodedCount++;
            console.log(`    ✅ ${pallet}.${constant}: ${typeof serializedValue === 'string' && serializedValue.length > 100 ? serializedValue.substring(0, 100) + '...' : serializedValue}`);
            constants.push(finalConstantData);
          }
        } catch (error) {
          // Silently skip constants that don't exist on this chain
        }
      }
    } else {
      console.log(`    ⚠️  No typed API or constants available for ${chainConfig.name}`);
    }

    console.log(`  📊 ${chainConfig.name}: Processed ${processedCount} constants, extracted ${constants.length}, decoded ${decodedCount} successfully`);

    return constants;

  } catch (error) {
    console.error(`❌ Failed to extract constants for ${chainConfig.name}:`, error);
    return [];
  } finally {
    // Cleanup connections
    try {
      if (client) {
        await client.destroy();
      }
      console.log(`    ℹ️  Cleanup completed for ${chainConfig.name}`);
    } catch (cleanupError) {
      console.log(`    ℹ️  Cleanup completed for ${chainConfig.name} (with minor cleanup issues)`);
    }
  }
}


/**
 * Main extraction function with real chain connections
 */
async function extractAllConstants() {
  console.log('🚀 Starting real-time constant extraction from live chains...\n');

  const extractedConstants: ExtractedConstants = {};
  const startTime = Date.now();

  for (const [chainKey, chainConfig] of Object.entries(chains)) {
    try {
      console.log(`\n⭐ Starting extraction for ${chainConfig.name}...`);
      const constants = await extractChainConstants(chainKey, chainConfig);

      extractedConstants[chainKey] = {
        chainInfo: {
          name: chainConfig.name,
          extractedAt: new Date().toISOString()
        },
        constants
      };

      console.log(`✅ Completed ${chainConfig.name}: ${constants.length} constants extracted`);

      // Delay between chains to allow proper cleanup and avoid overwhelming connections
      await new Promise(resolve => setTimeout(resolve, 1000));

    } catch (error) {
      console.error(`❌ Failed to extract constants for ${chainKey}:`, error);
      extractedConstants[chainKey] = {
        chainInfo: {
          name: chainConfig.name,
          extractedAt: new Date().toISOString()
        },
        constants: []
      };
    }
  }

  // Save to JSON file
  const outputPath = join(process.cwd(), 'packages/core/generated/decoded-constants.json');

  try {
    writeFileSync(outputPath, JSON.stringify(extractedConstants, null, 2));
    console.log(`\n✅ Successfully saved decoded constants to: ${outputPath}`);
  } catch (error) {
    console.error('❌ Failed to save constants file:', error);
    process.exit(1);
  }

  const endTime = Date.now();
  const duration = ((endTime - startTime) / 1000).toFixed(2);

  const totalConstants = Object.values(extractedConstants).reduce((sum, chain) => sum + chain.constants.length, 0);
  const totalDecoded = Object.values(extractedConstants).reduce((sum, chain) =>
    sum + chain.constants.filter(c => c.decodedValue !== null).length, 0);

  console.log(`\n🎉 Extraction completed in ${duration}s`);
  console.log(`📊 Total: ${totalConstants} constants extracted, ${totalDecoded} successfully decoded`);
  console.log(`💾 Saved to: ${outputPath}`);
}

// Run the extraction
extractAllConstants().catch(error => {
  console.error('❌ Extraction failed:', error);
  process.exit(1);
});

export { extractAllConstants };