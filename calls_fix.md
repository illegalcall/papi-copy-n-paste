# CALLS FIX: Migration to POC Metadata Approach

## 🎯 **Objective**
Replace the current dual static/dynamic parameter detection system with the unified POC metadata approach that matches PAPI Console functionality.

## 📋 **Requirements**
1. **Live Metadata Fetching**: Fetch metadata from live chain with local caching
2. **Background Updates**: Cache-first with background refresh strategy
3. **No Fallbacks**: Complete replacement, no static fallback system
4. **Rich UI**: Show enum variants with dropdown selection (reference: papi-console-main)
5. **Error Handling**: Show error and disable form on metadata fetch failure
6. **Complete Replacement**: Remove all current parameter detection systems

## 🏗️ **Migration Plan**

### **Phase 1: Core Infrastructure** (Steps 1-3)

#### **Step 1: Create New Metadata Service**
**File**: `apps/web/services/metadataService.ts`

**Responsibilities**:
- Live metadata fetching from chains
- Local caching with IndexedDB/localStorage
- Background refresh strategy
- Cache invalidation and updates

**Implementation**:
```typescript
class MetadataService {
  async getMetadata(chainKey: string): Promise<MetadataAnalyzer>
  async refreshMetadataBackground(chainKey: string): Promise<void>
  private cacheMetadata(chainKey: string, metadata: string): Promise<void>
  private getCachedMetadata(chainKey: string): Promise<string | null>
}
```

#### **Step 2: Port POC MetadataAnalyzer**
**File**: `apps/web/utils/metadataAnalyzer.ts`

**Port from**: `/scripts/metadata-poc.ts`
- Extract `MetadataAnalyzer` class
- Add UI-specific enhancements
- Integrate with metadata service
- Add enum variant extraction for UI

**Key Methods**:
```typescript
class MetadataAnalyzer {
  extractCallInfo(palletName: string, callName: string): CallInfo
  extractParameterInfo(callData: any): ParameterInfo[]
  getEnumVariants(typeId: number): EnumVariant[]
  isOptionalType(typeInfo: any): boolean
  isComplexType(typeInfo: any): boolean
}
```

#### **Step 3: Replace dynamicCallDetection.ts**
**Action**: Delete current file, replace with new implementation

**New File**: `apps/web/utils/callParameterDetection.ts`
```typescript
export async function getCallParameterInfo(
  chainKey: string,
  pallet: string,
  call: string
): Promise<CallParameterInfo>
```

### **Phase 2: UI Component Updates** (Steps 4-6)

#### **Step 4: Research PAPI Console Enum UI**
**Task**: Find and analyze enum variant selection in papi-console-main
- Locate enum rendering components
- Understand variant selection UI patterns
- Extract reusable patterns for our implementation

#### **Step 5: Update SimpleCallForm**
**File**: `apps/web/components/forms/simple-call-form.tsx`

**Changes**:
- Replace `call.args` usage with `getCallParameterInfo()`
- Add enum variant dropdown components
- Handle optional parameters (show/hide)
- Implement rich parameter tooltips
- Add metadata loading states

**New Parameter Rendering**:
```typescript
const renderParameterField = (param: ParameterInfo) => {
  if (param.type.startsWith('Enum')) {
    return <EnumVariantSelector variants={param.enumVariants} />
  }
  if (param.isOptional) {
    return <OptionalParameterField param={param} />
  }
  return <StandardParameterField param={param} />
}
```

#### **Step 6: Create Enum Variant Components**
**Files**:
- `apps/web/components/forms/EnumVariantSelector.tsx`
- `apps/web/components/forms/OptionalParameterField.tsx`

**Reference**: papi-console-main enum rendering patterns

### **Phase 3: Helper Function Updates** (Steps 7-8)

#### **Step 7: Update callHelpers.ts**
**File**: `apps/web/utils/callHelpers.ts`

**Changes**:
- Update all functions to use `ParameterInfo[]` instead of `string[]`
- Enhance `generateCallParamValues()` for complex types
- Add enum variant value conversion
- Support optional parameter handling

#### **Step 8: Update formHelpers.ts**
**File**: `apps/web/utils/formHelpers.ts`

**Changes**:
- Enhance `parseSimpleType()` for complex types
- Add `parseEnumType()`, `parseOptionalType()`
- Update validation logic for rich parameter info
- Add default value handling for complex types

### **Phase 4: Integration and Cleanup** (Steps 9-11)

#### **Step 9: Remove Old System**
**Delete Files**:
- `apps/web/utils/runtimeMetadataDetection.ts`
- `apps/web/utils/runtimeClientAccess.ts` (if unused elsewhere)
- Any static parameter fallback code

**Update Files**:
- Remove fallback logic from all components
- Update imports to use new services

#### **Step 10: Update Page Components**
**Files**:
- `apps/web/app/PageContent.tsx` - Use new parameter detection
- `apps/web/hooks/useCallSelection.ts` - Integrate metadata service
- `apps/web/components/layout/center-pane.tsx` - Pass rich parameter info

#### **Step 11: Add Error Handling**
**Implement**:
- Metadata fetch error UI components
- Form disable state when metadata unavailable
- User-friendly error messages
- Retry mechanisms for failed metadata fetches

### **Phase 5: Testing and Optimization** (Steps 12-13)

#### **Step 12: Comprehensive Testing**
**Test Cases**:
- Different chain metadata fetching
- Cache hit/miss scenarios
- Background refresh functionality
- Enum variant selection
- Optional parameter handling
- Error states and recovery

#### **Step 13: Performance Optimization**
**Optimizations**:
- Metadata parsing performance
- Cache size management
- Background update timing
- Memory usage optimization

## 📊 **Implementation Steps**

### **Immediate Actions**:
1. ✅ Create this migration plan
2. 🔄 Research PAPI Console enum UI patterns
3. 🔄 Create MetadataService with caching
4. 🔄 Port and enhance MetadataAnalyzer
5. 🔄 Replace dynamicCallDetection.ts

### **Priority Order**:
1. **Core Infrastructure** (Steps 1-3) - Foundation
2. **PAPI Console Research** (Step 4) - UI patterns
3. **UI Components** (Steps 5-6) - User interface
4. **Helper Updates** (Steps 7-8) - Supporting functions
5. **Integration** (Steps 9-11) - System integration
6. **Testing** (Steps 12-13) - Quality assurance

## 🎯 **Success Criteria**

### **Functional Requirements**:
- ✅ Live metadata fetching with caching
- ✅ Background metadata refresh
- ✅ Enum variant dropdown selection
- ✅ Optional parameter support
- ✅ Rich parameter tooltips
- ✅ Error handling with form disable

### **Non-Functional Requirements**:
- ✅ Fast parameter detection (<500ms cache hit)
- ✅ Reliable metadata updates
- ✅ Clean error states
- ✅ Memory efficient caching
- ✅ No static fallback dependencies

### **User Experience**:
- ✅ Immediate parameter loading (cache)
- ✅ Background updates (transparent)
- ✅ Rich parameter information
- ✅ Clear error messages
- ✅ Intuitive enum selection

## 📝 **Notes**

### **Critical Dependencies**:
- PAPI Console enum UI patterns research
- MetadataAnalyzer class from POC script
- Caching strategy implementation
- Error boundary components

### **Risk Mitigation**:
- Gradual component migration
- Comprehensive testing at each step
- Clear rollback plan if needed
- Performance monitoring during migration

### **Future Enhancements**:
- Advanced type validation
- Parameter value suggestions
- Multi-chain metadata management
- Offline mode support