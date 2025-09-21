/**
 * Content area container that manages the three-pane layout
 * Optimized with memoization and separated concerns
 */

import React, { memo, useRef } from 'react';
import { LeftPane, LeftPaneRef } from '../layout/left-pane';
import { CenterPane } from '../layout/center-pane';
import { RightPane } from '../layout/right-pane';

interface ContentAreaProps {
  // Left pane props
  pallets: any[];
  onCallSelect: (pallet: string, call: any) => void;
  onStorageSelect: (pallet: string, storage: any) => void;
  onConstantSelect: (pallet: string, constant: any) => void;
  onErrorSelect: (pallet: string, error: any) => void;
  onEventSelect: (pallet: string, event: any) => void;

  // Center pane props
  selectedCall?: any;
  selectedStorage?: any;
  selectedConstant?: any;
  selectedError?: any;
  selectedEvent?: any;
  formData: Record<string, any>;
  storageParams: Record<string, any>;
  storageQueryType: string;
  canRunCall: boolean;
  canRunStorage: boolean;
  onFormChange: (data: Record<string, any>) => void;
  onValidChange: (isValid: boolean, errors: Record<string, string>) => void;
  onStorageParamsChange: (params: Record<string, any>) => void;
  onStorageQueryTypeChange: (type: string) => void;
  onStorageValidationChange: (isValid: boolean, errors: Record<string, string>) => void;
  onExecuteCall: () => void;
  onExecuteStorage: () => void;

  // Right pane props
  generatedCode: string;
  storageCode: string;
  consoleOutput: any[];
  transactionHistory: any[];
  isLoadingMetadata: boolean;
  metadataError?: string;
  chainStatus: string;
  selectedChain?: string;
}

export const ContentArea = memo(({
  // Left pane props
  pallets,
  onCallSelect,
  onStorageSelect,
  onConstantSelect,
  onErrorSelect,
  onEventSelect,

  // Center pane props
  selectedCall,
  selectedStorage,
  selectedConstant,
  selectedError,
  selectedEvent,
  formData,
  storageParams,
  storageQueryType,
  canRunCall,
  canRunStorage,
  onFormChange,
  onValidChange,
  onStorageParamsChange,
  onStorageQueryTypeChange,
  onStorageValidationChange,
  onExecuteCall,
  onExecuteStorage,

  // Right pane props
  generatedCode,
  storageCode,
  consoleOutput,
  transactionHistory,
  isLoadingMetadata,
  metadataError,
  chainStatus,
  selectedChain,
}: ContentAreaProps) => {
  const leftPaneRef = useRef<LeftPaneRef>(null);

  return (
    <div className="flex flex-1 overflow-hidden">
      {/* Left Pane - Hidden on mobile, shown in sheet */}
      <div className="hidden lg:flex w-80 border-r border-border">
        <LeftPane
          ref={leftPaneRef}
          isOpen={true}
          onClose={() => {}} // Not needed for desktop view
          pallets={pallets}
          onCallSelect={onCallSelect}
          onStorageSelect={onStorageSelect}
          onConstantSelect={onConstantSelect}
          onErrorSelect={onErrorSelect}
          onEventSelect={onEventSelect}
        />
      </div>

      {/* Center Pane - Always visible */}
      <div className="flex-1 border-r border-border">
        <CenterPane
          selectedCall={selectedCall}
          selectedStorage={selectedStorage}
          selectedConstant={selectedConstant}
          selectedError={selectedError}
          selectedEvent={selectedEvent}
          formData={formData}
          storageParams={storageParams}
          storageQueryType={storageQueryType}
          canRunCall={canRunCall}
          canRunStorage={canRunStorage}
          onFormChange={onFormChange}
          onValidChange={(isValid: boolean) => onValidChange(isValid, {})}
          onStorageParamsChange={onStorageParamsChange}
          onStorageQueryTypeChange={onStorageQueryTypeChange}
          onStorageValidationChange={onStorageValidationChange}
          onRunClick={onExecuteCall}
          onExecuteCall={onExecuteCall}
          onExecuteStorage={onExecuteStorage}
          chainStatus={chainStatus as "connecting" | "ready" | "error"}
          selectedChain={selectedChain}
        />
      </div>

      {/* Right Pane - Hidden on mobile below lg breakpoint */}
      <div className="hidden lg:flex w-96">
        <RightPane
          code={generatedCode}
          consoleOutput={consoleOutput}
          selectedChain={selectedChain}
          transactionHistory={transactionHistory}
        />
      </div>
    </div>
  );
});

ContentArea.displayName = 'ContentArea';