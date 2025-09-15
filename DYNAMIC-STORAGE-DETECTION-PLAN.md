# Dynamic Storage Parameter Detection - Comprehensive Implementation Plan

## Executive Summary

Based on thorough investigation of the PAPI Copy-Paste codebase, I have identified the root cause of the storage query issues and designed a comprehensive solution to replace the hard-coded parameter detection system with a dynamic, metadata-driven approach.

## Problem Analysis

### Current Issues Identified

1. **Multiple Hard-Coded Systems**: Found 3 separate hard-coded parameter detection systems:
   - `/apps/web/utils/storageHelpers.ts` - Main parameter detection
   - `/apps/web/components/forms/storage-form.tsx` - Form-level parameter detection
   - `/apps/web/utils/typeExtraction.ts` - Type mapping system

2. **Missing Storage Items**: `InactiveIssuance` and other parameter-less storage items not included in hard-coded lists

3. **Chain Incompatibility**: Hard-coded systems assume all chains have identical storage structures

4. **Maintenance Burden**: Every new storage item requires manual updates across multiple files

### Root Cause

The storage query `Balances.InactiveIssuance` fails because:
- ✅ **Storage exists**: Confirmed in Polkadot descriptor as `StorageDescriptor<[], bigint, false, never>`
- ❌ **Not in hard-coded list**: Missing from `storageHelpers.ts` parameter detection
- ❌ **Pattern mismatch**: Not covered by fallback pattern matching

## Technical Investigation Results

### PAPI Descriptor Structure Discovery

```typescript
// TypeScript Definition (Available at compile-time)
type StorageDescriptor<Args, ReturnType, Optional, Default> = {
    _type: ReturnType;
    _args: Args;
    _optional: Optional;
}

// Examples from actual Polkadot descriptor
TotalIssuance: StorageDescriptor<[], bigint, false, never>       // No parameters
InactiveIssuance: StorageDescriptor<[], bigint, false, never>    // No parameters
Account: StorageDescriptor<[Key: SS58String], AccountInfo, false, never> // Requires SS58String
BlockHash: StorageDescriptor<[Key: number], Hash, false, never> // Requires number
```

### Runtime Introspection Limitations

**Challenge**: PAPI descriptors contain all necessary type information at TypeScript compile-time, but this information is **not directly accessible at JavaScript runtime**.

**Current Attempts**:
- ❌ `getTypedCodecs()` - Returns empty structure
- ❌ `descriptor.descriptors` - Empty at runtime
- ❌ `descriptor.metadataTypes` - Empty at runtime

## Solution Architecture

### Hybrid Approach: Compile-Time Generation + Runtime Fallbacks

Since direct runtime introspection is not available, we'll use a **hybrid approach**:

1. **Pre-Generation Phase**: Extract type information during build process
2. **Runtime Optimization**: Use pre-generated metadata with intelligent fallbacks
3. **Chain-Specific Support**: Generate metadata for each supported chain
4. **Progressive Enhancement**: Graceful degradation for unsupported chains

## Detailed Implementation Plan

### Phase 1: Type Information Extraction System

**Goal**: Extract parameter requirements from TypeScript descriptor files during build

**Implementation**:

```typescript
// Build-time type extractor
// File: scripts/extractStorageMetadata.ts

interface StorageMetadata {
  [chainKey: string]: {
    [pallet: string]: {
      [storage: string]: {
        paramTypes: string[];           // e.g., ["SS58String"] or []
        returnType: string;             // e.g., "bigint", "AccountInfo"
        optional: boolean;              // Whether storage can return undefined
        description?: string;           // From TypeScript comments
      }
    }
  }
}

// Extract from TypeScript AST
function extractStorageMetadataFromDescriptor(descriptorPath: string): StorageMetadata {
  // Parse TypeScript files
  // Extract StorageDescriptor type parameters
  // Generate metadata JSON
}
```

**Build Integration**:
```json
{
  "scripts": {
    "build": "npm run extract-storage-metadata && next build",
    "extract-storage-metadata": "tsx scripts/extractStorageMetadata.ts"
  }
}
```

### Phase 2: Dynamic Parameter Detection Engine

**Goal**: Replace hard-coded systems with metadata-driven detection

```typescript
// File: apps/web/utils/dynamicStorageDetection.ts

interface StorageParameterInfo {
  required: string[];
  optional: string[];
  description?: string;
}

class DynamicStorageDetector {
  private metadata: StorageMetadata;
  private fallbackPatterns: Map<string, string[]>;

  constructor(metadata: StorageMetadata) {
    this.metadata = metadata;
    this.setupFallbackPatterns();
  }

  detectParameters(
    chainKey: string,
    pallet: string,
    storage: string
  ): StorageParameterInfo {
    // 1. Primary: Use generated metadata
    const chainMetadata = this.metadata[chainKey];
    if (chainMetadata?.pallets?.[pallet]?.[storage]) {
      return {
        required: chainMetadata.pallets[pallet][storage].paramTypes,
        optional: [],
        description: chainMetadata.pallets[pallet][storage].description
      };
    }

    // 2. Secondary: Cross-chain lookup (try other chains)
    for (const otherChain of Object.keys(this.metadata)) {
      const otherChainData = this.metadata[otherChain]?.pallets?.[pallet]?.[storage];
      if (otherChainData) {
        console.warn(`Using ${otherChain} metadata for ${chainKey}.${pallet}.${storage}`);
        return {
          required: otherChainData.paramTypes,
          optional: [],
          description: `Cross-chain metadata from ${otherChain}`
        };
      }
    }

    // 3. Tertiary: Intelligent pattern matching
    return this.intelligentPatternMatch(pallet, storage);
  }

  private intelligentPatternMatch(pallet: string, storage: string): StorageParameterInfo {
    // Enhanced pattern matching with semantic analysis
    const patterns = [
      // No parameters (common global state)
      { pattern: /^(Total|Current|Next|Last|Min|Max)/, params: [] },
      { pattern: /^(Issuance|Supply|Count|Index|Number|Now|Deposit)$/, params: [] },

      // Account-based (single AccountId parameter)
      { pattern: /^(Account|Balance|Lock|Reserve|Hold|Freeze)s?$/, params: ["AccountId"] },
      { pattern: /(Of|For)Account$/, params: ["AccountId"] },

      // ID-based (requires numeric/hash ID)
      { pattern: /^(Proposal|Referendum|Era|Session|Block)/, params: ["u32"] },
      { pattern: /(Of|For)(Proposal|Referendum|Era|Session|Block)/, params: ["u32"] },

      // Complex mappings (multiple parameters)
      { pattern: /^(Era.*Staker|Session.*Validator)/, params: ["u32", "AccountId"] },
      { pattern: /^Asset(Account|Approval)/, params: ["AssetId", "AccountId"] }
    ];

    for (const { pattern, params } of patterns) {
      if (pattern.test(storage)) {
        return { required: params, optional: [] };
      }
    }

    // Default: assume no parameters for safety
    return { required: [], optional: [] };
  }
}
```

### Phase 3: Integration and Migration

**Goal**: Replace all hard-coded systems with the dynamic detector

**Files to Update**:

1. **storageHelpers.ts** - Replace `detectStorageParameters()`
```typescript
// Replace entire detectStorageParameters function
const dynamicDetector = new DynamicStorageDetector(storageMetadata);

export function detectStorageParameters(pallet: string, storage: string): string[] {
  const chainKey = getCurrentChainKey(); // Get from context
  const info = dynamicDetector.detectParameters(chainKey, pallet, storage);
  return info.required;
}
```

2. **storage-form.tsx** - Replace `determineStorageParameters()`
```typescript
// Remove hard-coded storagePatterns
// Use DynamicStorageDetector instead
```

3. **typeExtraction.ts** - Use generated metadata
```typescript
// Replace knownTypeMappings with generated data
// Use dynamic detection for unknown types
```

### Phase 4: Enhanced Features

**Goal**: Add capabilities beyond the current hard-coded system

1. **Parameter Validation**:
```typescript
interface ParameterValidation {
  type: string;
  constraints?: {
    minLength?: number;
    maxLength?: number;
    pattern?: RegExp;
    examples?: string[];
  };
}

function validateStorageParameter(
  param: any,
  validation: ParameterValidation
): { valid: boolean; error?: string } {
  // Type-specific validation logic
}
```

2. **Smart Defaults**:
```typescript
function generateParameterDefaults(paramTypes: string[]): Record<string, any> {
  return paramTypes.reduce((defaults, type) => {
    switch(type) {
      case 'AccountId':
        defaults[type.toLowerCase()] = '5GrwvaEF5zXb26Fz9rcQpDWS57CtERHpNehXCPcNoHGKutQY'; // Alice
        break;
      case 'u32':
        defaults['id'] = '0';
        break;
      // ... more smart defaults
    }
    return defaults;
  }, {});
}
```

3. **Chain-Specific Optimizations**:
```typescript
// Handle chain-specific storage differences
const chainSpecificOverrides = {
  'hydration': {
    'Balances': {
      // Hydration-specific Balances storage items that differ from Polkadot
      'SpecialStorage': { paramTypes: ['AccountId'], returnType: 'Balance' }
    }
  }
};
```

### Phase 5: Performance and Caching

**Goal**: Ensure zero performance regression

```typescript
class CachedStorageDetector extends DynamicStorageDetector {
  private cache = new Map<string, StorageParameterInfo>();
  private hitRate = 0;
  private totalRequests = 0;

  detectParameters(chainKey: string, pallet: string, storage: string): StorageParameterInfo {
    const cacheKey = `${chainKey}:${pallet}:${storage}`;

    this.totalRequests++;

    if (this.cache.has(cacheKey)) {
      this.hitRate++;
      return this.cache.get(cacheKey)!;
    }

    const result = super.detectParameters(chainKey, pallet, storage);
    this.cache.set(cacheKey, result);

    return result;
  }

  getCacheStats() {
    return {
      hitRate: (this.hitRate / this.totalRequests) * 100,
      cacheSize: this.cache.size
    };
  }
}
```

## Migration Strategy

### Step 1: Parallel Implementation (1-2 days)
- Create the dynamic detection system alongside existing hard-coded systems
- Add feature flag to switch between systems
- Comprehensive testing on all supported chains

### Step 2: Gradual Rollout (1 day)
- Enable dynamic system for Polkadot only
- Verify `InactiveIssuance` and other missing storage items work
- Monitor for any regressions

### Step 3: Full Migration (1 day)
- Enable for all chains
- Remove hard-coded systems
- Update documentation

### Step 4: Enhancement (Ongoing)
- Add new features like parameter validation
- Improve pattern matching based on real usage
- Add support for new chains automatically

## Benefits of This Approach

### Immediate Benefits
✅ **Fixes Current Issue**: `InactiveIssuance` and all missing storage items work immediately
✅ **Chain Agnostic**: Automatically works with any PAPI-supported chain
✅ **Future Proof**: New storage items work without code changes
✅ **Maintainability**: Eliminates manual updates to hard-coded lists

### Long-term Benefits
✅ **Accuracy**: Always reflects actual chain metadata
✅ **Performance**: Cached lookups with intelligent fallbacks
✅ **Extensibility**: Easy to add new parameter types and validation
✅ **Debugging**: Clear visibility into parameter detection logic

### Risk Mitigation
✅ **Graceful Fallbacks**: Multiple layers of detection ensure reliability
✅ **Cache Layer**: Performance optimization with hit rate monitoring
✅ **Feature Flags**: Safe rollout with ability to revert
✅ **Cross-Chain Logic**: Handles chain differences intelligently

## Technical Requirements

### Build Dependencies
```json
{
  "devDependencies": {
    "typescript": "^5.0.0",
    "ts-morph": "^20.0.0",     // TypeScript AST parsing
    "tsx": "^4.0.0"            // TypeScript execution
  }
}
```

### Generated Assets
- `storage-metadata.json` - Extracted type information for all chains
- `storage-patterns.json` - Enhanced fallback patterns
- Type definitions for parameter validation

### Testing Strategy
- Unit tests for each detection method
- Integration tests with real chain descriptors
- Performance benchmarks vs. hard-coded systems
- Cross-chain compatibility tests

## Expected Timeline

- **Week 1**: Core implementation and basic testing (Phase 1-3)
- **Week 2**: Advanced features, performance optimization, full testing (Phase 4-5)
- **Week 3**: Documentation, final testing, deployment

## Conclusion

This plan provides a complete solution that:
1. **Solves the immediate problem** (`InactiveIssuance` not working)
2. **Eliminates the root cause** (hard-coded parameter detection)
3. **Provides long-term maintainability** (automatic support for new chains/storage)
4. **Enhances user experience** (better error messages, validation, defaults)

The hybrid approach balances the ideal solution (full runtime introspection) with the practical constraints of PAPI's current architecture, while providing a clear path for future enhancements as PAPI evolves.