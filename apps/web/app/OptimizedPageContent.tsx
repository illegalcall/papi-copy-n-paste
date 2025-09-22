
"use client";

import React, { useCallback, useRef } from "react";
import { MainLayout } from "@/components/layout/main-layout";
import { ContentArea } from "@/components/containers/content-area";
import { TransactionContainer } from "@/components/containers/transaction-container";
import { LeftPane, LeftPaneRef } from "@/components/layout/left-pane";

import { useChainConnection } from "../hooks/useChainConnection";
import { useCallSelection } from "../hooks/useCallSelection";
import { useStorageQuery } from "../hooks/useStorageQuery";
import { useConstantSelection } from "../hooks/useConstantSelection";
import { useErrorSelection } from "../hooks/useErrorSelection";
import { useEventSelection } from "../hooks/useEventSelection";
import { useCodeGeneration } from "../hooks/useCodeGeneration";
import { useExecution } from "../hooks/useExecution";
import { useWallet } from "../hooks/useWallet";
import { useMobileDetection } from "../hooks/useMobileDetection";
import { usePageExecution } from "../hooks/usePageExecution";

export default function OptimizedPageContent() {
  const leftPaneRef = useRef<LeftPaneRef>(null);

  const chainConnection = useChainConnection();
  const wallet = useWallet();
  const mobileDetection = useMobileDetection();

  const callSelection = useCallSelection();
  const storageQuery = useStorageQuery(chainConnection.selectedChain);
  const constantSelection = useConstantSelection();
  const errorSelection = useErrorSelection();
  const eventSelection = useEventSelection();

  const codeGeneration = useCodeGeneration(
    chainConnection.selectedChain || '',
    chainConnection.selectedProvider || '',
    wallet.isConnected
  );
  const execution = useExecution();

  // Derived state for mobile sheet
  const [isMobileSheetOpen, setIsMobileSheetOpen] = React.useState(false);

  // Enhanced execution logic with page-specific functionality
  const pageExecution = usePageExecution({
    api: chainConnection.api,
    selectedAccount: wallet.selectedAccount,
    getSigner: wallet.getSigner,
    addConsoleOutput: execution.addConsoleOutput,
    addTransactionResult: (result) => {
      // This will be handled by TransactionContainer
      console.log('Transaction result:', result);
    },
    showTransactionPreview: (transactions) => {
      // This will be handled by TransactionContainer
      console.log('Show preview for transactions:', transactions);
    },
    chainKey: chainConnection.selectedChain,
  });

  // Optimized event handlers with useCallback
  const handleCallSelect = useCallback((pallet: string, call: any) => {
    callSelection.handleCallSelect(pallet, call);
    // Clear other selections when a call is selected
    storageQuery.clearStorageSelection();
    constantSelection.clearConstantSelection();
    errorSelection.clearErrorSelection();
    eventSelection.clearEventSelection();
  }, [
    callSelection.handleCallSelect,
    storageQuery.clearStorageSelection,
    constantSelection.clearConstantSelection,
    errorSelection.clearErrorSelection,
    eventSelection.clearEventSelection,
  ]);

  const handleStorageSelect = useCallback((pallet: string, storage: any) => {
    storageQuery.handleStorageSelect(pallet, storage);
    // Clear other selections when storage is selected
    callSelection.clearCallSelection();
    constantSelection.clearConstantSelection();
    errorSelection.clearErrorSelection();
    eventSelection.clearEventSelection();
  }, [
    storageQuery.handleStorageSelect,
    callSelection.clearCallSelection,
    constantSelection.clearConstantSelection,
    errorSelection.clearErrorSelection,
    eventSelection.clearEventSelection,
  ]);

  const handleConstantSelect = useCallback((pallet: string, constant: any) => {
    constantSelection.handleConstantSelect(pallet, constant);
    // Clear other selections
    callSelection.clearCallSelection();
    storageQuery.clearStorageSelection();
    errorSelection.clearErrorSelection();
    eventSelection.clearEventSelection();
  }, [
    constantSelection.handleConstantSelect,
    callSelection.clearCallSelection,
    storageQuery.clearStorageSelection,
    errorSelection.clearErrorSelection,
    eventSelection.clearEventSelection,
  ]);

  const handleErrorSelect = useCallback((pallet: string, error: any) => {
    errorSelection.handleErrorSelect(pallet, error);
    // Clear other selections
    callSelection.clearCallSelection();
    storageQuery.clearStorageSelection();
    constantSelection.clearConstantSelection();
    eventSelection.clearEventSelection();
  }, [
    errorSelection.handleErrorSelect,
    callSelection.clearCallSelection,
    storageQuery.clearStorageSelection,
    constantSelection.clearConstantSelection,
    eventSelection.clearEventSelection,
  ]);

  const handleEventSelect = useCallback((pallet: string, event: any) => {
    eventSelection.handleEventSelect(pallet, event);
    // Clear other selections
    callSelection.clearCallSelection();
    storageQuery.clearStorageSelection();
    constantSelection.clearConstantSelection();
    errorSelection.clearErrorSelection();
  }, [
    eventSelection.handleEventSelect,
    callSelection.clearCallSelection,
    storageQuery.clearStorageSelection,
    constantSelection.clearConstantSelection,
    errorSelection.clearErrorSelection,
  ]);

  const handleExecuteCall = useCallback(() => {
    pageExecution.executeCall(
      callSelection.selectedCall,
      callSelection.formData,
      callSelection.canRun
    );
  }, [
    pageExecution.executeCall,
    callSelection.selectedCall,
    callSelection.formData,
    callSelection.canRun,
  ]);

  const handleExecuteStorage = useCallback(() => {
    pageExecution.executeStorage(
      storageQuery.selectedStorage,
      storageQuery.storageParams,
      storageQuery.storageQueryType,
      storageQuery.canRunStorage
    );
  }, [
    pageExecution.executeStorage,
    storageQuery.selectedStorage,
    storageQuery.storageParams,
    storageQuery.storageQueryType,
    storageQuery.canRunStorage,
  ]);

  // Mobile left pane content
  const mobileLeftPaneContent = (
    <LeftPane
      ref={leftPaneRef}
      isOpen={isMobileSheetOpen}
      onClose={() => setIsMobileSheetOpen(false)}
      pallets={chainConnection.pallets}
      onCallSelect={handleCallSelect}
      onStorageSelect={handleStorageSelect}
      onConstantSelect={handleConstantSelect}
      onErrorSelect={handleErrorSelect}
      onEventSelect={handleEventSelect}
    />
  );

  return (
    <TransactionContainer
      selectedChain={chainConnection.selectedChain}
      api={chainConnection.api}
    >
      {(transactionAPI) => (
        <MainLayout
          showMobileWarning={mobileDetection.showMobileWarning}
          onDismissMobileWarning={mobileDetection.dismissMobileWarning}
          isMobileSheetOpen={isMobileSheetOpen}
          onMobileSheetOpenChange={setIsMobileSheetOpen}
          mobileLeftPaneContent={mobileLeftPaneContent}
          selectedChain={chainConnection.selectedChain}
          selectedProvider={chainConnection.selectedProvider}
          onNetworkChange={chainConnection.handleNetworkChange}
        >
          <ContentArea
            // Left pane props
            pallets={chainConnection.pallets}
            onCallSelect={handleCallSelect}
            onStorageSelect={handleStorageSelect}
            onConstantSelect={handleConstantSelect}
            onErrorSelect={handleErrorSelect}
            onEventSelect={handleEventSelect}

            // Center pane props
            selectedCall={callSelection.selectedCall}
            selectedStorage={storageQuery.selectedStorage}
            selectedConstant={constantSelection.selectedConstant}
            selectedError={errorSelection.selectedError}
            selectedEvent={eventSelection.selectedEvent}
            formData={callSelection.formData}
            storageParams={storageQuery.storageParams}
            storageQueryType={storageQuery.storageQueryType}
            canRunCall={callSelection.canRun}
            canRunStorage={storageQuery.canRunStorage}
            onFormChange={callSelection.handleFormChange}
            onValidChange={callSelection.handleValidChange}
            onStorageParamsChange={storageQuery.handleStorageParamsChange}
            onStorageQueryTypeChange={storageQuery.handleStorageQueryTypeChange}
            onStorageValidationChange={storageQuery.handleStorageValidationChange}
            onExecuteCall={handleExecuteCall}
            onExecuteStorage={handleExecuteStorage}

            // Right pane props
            generatedCode={codeGeneration.code}
            storageCode={codeGeneration.code} // Use the same code for both
            consoleOutput={execution.consoleOutput}
            transactionHistory={transactionAPI.transactionHistory}
            isLoadingMetadata={chainConnection.isLoadingMetadata}
            metadataError={chainConnection.metadataError || undefined}
            chainStatus={chainConnection.chainStatus}
          />
        </MainLayout>
      )}
    </TransactionContainer>
  );
}