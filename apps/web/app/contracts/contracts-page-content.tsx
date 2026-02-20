"use client";

import { useState, useCallback } from "react";
import { useTheme } from "next-themes";
import { Button } from "@workspace/ui/components/button";
import { Badge } from "@workspace/ui/components/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@workspace/ui/components/tabs";
import {
  Moon,
  Sun,
  Github,
  BookOpen,
  FileCode,
  ArrowLeft,
} from "lucide-react";
import Link from "next/link";

import { ContractSelector } from "./components/contract-selector";
import { MethodList } from "./components/method-list";
import { MethodForm } from "./components/method-form";
import { ResultPanel } from "./components/result-panel";
import { EventMonitor, type ContractEventLog } from "./components/event-monitor";
import { DeployForm } from "./components/deploy-form";
import { ExampleContracts } from "./components/example-contracts";
import type { ExampleContract } from "./data/example-contracts";

import {
  parseInkMetadata,
  parseEvmAbi,
  parseEvmAbiFromString,
  createLoadedContract,
} from "@/utils/metadataFetcher";
import { generateContractCode, generateContractExample } from "@/utils/contractCodeGenerators";
import { getDefaultTestnet, findContractChain } from "@workspace/core/contracts/chains";
import { MAX_METADATA_FILE_SIZE, isValidEvmAddress, isValidSs58Address } from "@workspace/core/contracts/utils";
import { useContractConnection } from "@/hooks/useContractConnection";
import type {
  ContractType,
  LoadedContract,
  UnifiedMethod,
  ContractCallResult,
  InkMetadata,
  EvmAbi,
} from "@workspace/core/contracts/types";

export default function ContractsPageContent() {
  const { theme, setTheme } = useTheme();

  // ── Contract Selection State ──
  const [contractType, setContractType] = useState<ContractType>("ink");
  const [selectedChain, setSelectedChain] = useState(
    getDefaultTestnet("ink").key,
  );
  const [contractAddress, setContractAddress] = useState("");
  const [metadataFile, setMetadataFile] = useState<File | null>(null);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [isLoadingContract, setIsLoadingContract] = useState(false);

  // ── Loaded Contract State ──
  const [loadedContract, setLoadedContract] = useState<LoadedContract | null>(null);
  const [selectedMethod, setSelectedMethod] = useState<UnifiedMethod | null>(null);
  const [rawMetadata, setRawMetadata] = useState<InkMetadata | EvmAbi | null>(null);

  // ── Live Connection ──
  const {
    isConnected,
    isConnecting,
    error: connectionError,
    queryContract,
    executeContract,
  } = useContractConnection(
    loadedContract ? loadedContract.type : null,
    loadedContract ? loadedContract.chainKey : null,
    loadedContract ? loadedContract.address : null,
    rawMetadata,
  );

  // ── Interaction State ──
  const [isRunning, setIsRunning] = useState(false);
  const [lastResult, setLastResult] = useState<ContractCallResult | null>(null);
  const [generatedCode, setGeneratedCode] = useState("");
  const [interactionError, setInteractionError] = useState<string | null>(null);

  // ── Event State ──
  const [eventLogs, setEventLogs] = useState<ContractEventLog[]>([]);
  const [isMonitoring, setIsMonitoring] = useState(false);

  // ── Active Tab ──
  const [activeTab, setActiveTab] = useState<"interact" | "deploy">("interact");

  // ── Handlers ──

  const handleContractTypeChange = useCallback(
    (type: ContractType) => {
      setContractType(type);
      setSelectedChain(getDefaultTestnet(type).key);
      setLoadedContract(null);
      setRawMetadata(null);
      setSelectedMethod(null);
      setLastResult(null);
      setGeneratedCode("");
      setUploadError(null);
    },
    [],
  );

  const handleChainChange = useCallback((chainKey: string) => {
    setSelectedChain(chainKey);
    setLoadedContract(null);
    setRawMetadata(null);
    setSelectedMethod(null);
    setLastResult(null);
    setGeneratedCode("");
  }, []);

  const handleMetadataFile = useCallback((file: File) => {
    if (file.size > MAX_METADATA_FILE_SIZE) {
      setUploadError(`File too large (${(file.size / 1024 / 1024).toFixed(1)}MB). Maximum is 5MB.`);
      return;
    }
    setMetadataFile(file);
    setUploadError(null);
  }, []);

  const handleAbiPasted = useCallback(
    (abiJson: string) => {
      try {
        const abi = parseEvmAbiFromString(abiJson);
        const contract = createLoadedContract("evm", contractAddress, selectedChain, abi);
        setLoadedContract(contract);
        setRawMetadata(abi);
        setUploadError(null);
        setSelectedMethod(null);
        setLastResult(null);
        const chain = findContractChain(contract.chainKey);
        if (chain) {
          setGeneratedCode(generateContractExample(contract.type, chain.ws));
        }
      } catch (err) {
        setUploadError(err instanceof Error ? err.message : "Failed to parse ABI");
      }
    },
    [contractAddress, selectedChain],
  );

  const handleLoadContract = useCallback(async () => {
    if (!contractAddress) return;

    // Validate address format
    if (contractType === "evm" && !isValidEvmAddress(contractAddress)) {
      setUploadError("Invalid EVM address. Expected 0x followed by 40 hex characters.");
      return;
    }
    if (contractType === "ink" && !contractAddress.startsWith("0x") && !isValidSs58Address(contractAddress)) {
      setUploadError("Invalid address. Provide an SS58 address or hex public key (0x...).");
      return;
    }

    setIsLoadingContract(true);
    setUploadError(null);

    try {
      let contract: LoadedContract;
      let metadata: InkMetadata | EvmAbi;

      if (rawMetadata) {
        // Metadata already loaded (e.g. from an example) — just update the address
        metadata = rawMetadata;
        contract = createLoadedContract(contractType, contractAddress, selectedChain, metadata);
      } else if (metadataFile) {
        if (contractType === "ink") {
          metadata = await parseInkMetadata(metadataFile);
          contract = createLoadedContract("ink", contractAddress, selectedChain, metadata);
        } else {
          metadata = await parseEvmAbi(metadataFile);
          contract = createLoadedContract("evm", contractAddress, selectedChain, metadata);
        }
      } else {
        setUploadError("Please upload contract metadata/ABI first, or select an example below.");
        setIsLoadingContract(false);
        return;
      }

      setLoadedContract(contract);
      setRawMetadata(metadata);
      setSelectedMethod(null);
      setLastResult(null);
      const chain = findContractChain(contract.chainKey);
      if (chain) {
        setGeneratedCode(generateContractExample(contract.type, chain.ws));
      }
    } catch (err) {
      setUploadError(err instanceof Error ? err.message : "Failed to load contract");
    } finally {
      setIsLoadingContract(false);
    }
  }, [contractAddress, contractType, selectedChain, metadataFile, rawMetadata]);

  const handleLoadExample = useCallback(
    (example: ExampleContract) => {
      // Set contract type and chain
      setContractType(example.contractType);
      setSelectedChain(example.chainKey);
      setContractAddress(example.address);
      setUploadError(null);
      setMetadataFile(null);

      // Load the contract directly from the example metadata
      const contract = createLoadedContract(
        example.contractType,
        example.address,
        example.chainKey,
        example.metadata,
      );
      setLoadedContract(contract);
      setRawMetadata(example.metadata);
      setSelectedMethod(null);
      setLastResult(null);

      const chain = findContractChain(example.chainKey);
      if (chain) {
        setGeneratedCode(generateContractExample(contract.type, chain.ws));
      }
    },
    [],
  );

  const handleMethodSelect = useCallback(
    (method: UnifiedMethod) => {
      setSelectedMethod(method);
      setLastResult(null);
      setInteractionError(null);

      if (loadedContract) {
        const chain = findContractChain(loadedContract.chainKey);
        if (chain) {
          const code = generateContractCode({
            chainKey: loadedContract.chainKey,
            chainWs: chain.ws,
            contractAddress: loadedContract.address,
            contractType: loadedContract.type,
            methodName: method.name,
            method,
            args: {},
          });
          setGeneratedCode(code);
        }
      }
    },
    [loadedContract],
  );

  const handleQuery = useCallback(
    async (args: Record<string, string>) => {
      if (!selectedMethod || !loadedContract) return;

      setIsRunning(true);
      setInteractionError(null);

      // Update generated code with actual args
      const chain = findContractChain(loadedContract.chainKey);
      if (chain) {
        const code = generateContractCode({
          chainKey: loadedContract.chainKey,
          chainWs: chain.ws,
          contractAddress: loadedContract.address,
          contractType: loadedContract.type,
          methodName: selectedMethod.name,
          method: selectedMethod,
          args,
        });
        setGeneratedCode(code);
      }

      // Execute live query via the contract client
      const argValues = selectedMethod.args.map((a) => args[a.name] ?? "");
      const result = await queryContract(
        selectedMethod.name,
        argValues,
        loadedContract.address,
      );
      setLastResult(result);
      setIsRunning(false);
    },
    [selectedMethod, loadedContract, queryContract],
  );

  const handleExecute = useCallback(
    async (args: Record<string, string>, value?: bigint) => {
      if (!selectedMethod || !loadedContract) return;

      setIsRunning(true);
      setInteractionError(null);

      const chain = findContractChain(loadedContract.chainKey);
      if (chain) {
        const code = generateContractCode({
          chainKey: loadedContract.chainKey,
          chainWs: chain.ws,
          contractAddress: loadedContract.address,
          contractType: loadedContract.type,
          methodName: selectedMethod.name,
          method: selectedMethod,
          args,
        });
        setGeneratedCode(code);
      }

      const argValues = selectedMethod.args.map((a) => args[a.name] ?? "");
      const result = await executeContract(selectedMethod.name, argValues, { value });
      setLastResult(result);
      setIsRunning(false);
    },
    [selectedMethod, loadedContract, executeContract],
  );

  const handleDeploy = useCallback(
    (
      constructorName: string,
      args: Record<string, string>,
      codeHash: string,
      value?: bigint,
    ) => {
      const chain = findContractChain(loadedContract?.chainKey ?? "");
      if (chain && loadedContract) {
        const deployMethod = loadedContract.constructors.find(
          (c) => c.name === constructorName,
        );
        if (deployMethod) {
          const code = generateContractCode({
            chainKey: loadedContract.chainKey,
            chainWs: chain.ws,
            contractAddress: codeHash || "0x...",
            contractType: loadedContract.type,
            methodName: constructorName,
            method: deployMethod,
            args,
          });
          setGeneratedCode(code);
          setLastResult({
            success: true,
            decodedValue:
              `Deployment code generated for constructor "${constructorName}".\nCopy the code from the right panel and run it with a wallet signer.`,
          });
        }
      }
    },
    [loadedContract],
  );

  const handleCopyCode = useCallback(() => {
    navigator.clipboard.writeText(generatedCode);
  }, [generatedCode]);

  const handleToggleMonitoring = useCallback(() => {
    // TODO: Implement event subscription via contract client
    setIsMonitoring((prev) => !prev);
  }, []);

  const handleClearEvents = useCallback(() => {
    setEventLogs([]);
  }, []);

  return (
    <div className="h-screen flex flex-col overflow-hidden">
      {/* Header */}
      <header className="flex justify-between items-center px-6 h-12 border-b bg-background shrink-0">
        <div className="flex items-center gap-3">
          <Link href="/">
            <Button variant="ghost" size="sm" className="gap-1.5">
              <ArrowLeft className="h-4 w-4" />
              <span className="sr-only">Back to </span>Explorer
            </Button>
          </Link>
          <div className="h-4 border-l border-border" />
          <div className="flex items-center gap-1.5">
            <FileCode className="h-4 w-4 text-primary" />
            <span className="font-bold text-lg">Contract IDE</span>
          </div>
          {isConnected && (
            <Badge variant="outline" className="text-green-600 border-green-600 text-xs">
              Connected
            </Badge>
          )}
          {isConnecting && (
            <Badge variant="outline" className="text-yellow-600 border-yellow-600 text-xs">
              Connecting...
            </Badge>
          )}
          {connectionError && (
            <Badge variant="outline" className="text-red-600 border-red-600 text-xs" title={connectionError}>
              Error
            </Badge>
          )}
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === "light" ? "dark" : "light")}
          >
            <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            <span className="sr-only">Toggle theme</span>
          </Button>
          <Button variant="ghost" size="icon" asChild>
            <a
              href="https://github.com/polkadot-api/polkadot-api"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Github className="h-4 w-4" />
              <span className="sr-only">GitHub</span>
            </a>
          </Button>
          <Button variant="ghost" size="icon" asChild>
            <a
              href="https://papi.how"
              target="_blank"
              rel="noopener noreferrer"
            >
              <BookOpen className="h-4 w-4" />
              <span className="sr-only">Documentation</span>
            </a>
          </Button>
        </div>
      </header>

      {/* Contract Selector */}
      <ContractSelector
        contractType={contractType}
        selectedChain={selectedChain}
        contractAddress={contractAddress}
        onContractTypeChange={handleContractTypeChange}
        onChainChange={handleChainChange}
        onAddressChange={setContractAddress}
        onMetadataFile={handleMetadataFile}
        onAbiPasted={handleAbiPasted}
        onLoad={handleLoadContract}
        isLoading={isLoadingContract}
        isConnected={isConnected}
        uploadError={uploadError}
        contractName={loadedContract?.name}
      />

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left: Method List */}
        <div className="w-64 border-r flex flex-col shrink-0">
          <Tabs
            value={activeTab}
            onValueChange={(v) => setActiveTab(v as "interact" | "deploy")}
            className="flex flex-col h-full"
          >
            <TabsList className="mx-3 mt-2 h-8">
              <TabsTrigger value="interact" className="text-xs">
                Interact
              </TabsTrigger>
              <TabsTrigger value="deploy" className="text-xs">
                Deploy
              </TabsTrigger>
            </TabsList>

            <TabsContent value="interact" className="flex-1 overflow-hidden m-0">
              <MethodList
                methods={loadedContract?.methods ?? []}
                events={loadedContract?.events ?? []}
                constructors={[]}
                selectedMethod={selectedMethod?.name ?? null}
                onMethodSelect={handleMethodSelect}
              />
            </TabsContent>

            <TabsContent value="deploy" className="flex-1 overflow-auto m-0 p-3">
              <DeployForm
                constructors={loadedContract?.constructors ?? []}
                onDeploy={handleDeploy}
              />
            </TabsContent>
          </Tabs>
        </div>

        {/* Center + Right: Interaction + Results */}
        <div className="flex-1 flex flex-col overflow-hidden">
          <div className="flex-1 flex overflow-hidden">
            {/* Center: Method Form */}
            <div className="flex-1 overflow-auto p-4 border-r">
              {selectedMethod ? (
                <MethodForm
                  method={selectedMethod}
                  onQuery={handleQuery}
                  onExecute={handleExecute}
                  isRunning={isRunning}
                  error={interactionError}
                />
              ) : loadedContract ? (
                <div className="flex items-center justify-center h-full">
                  <div className="text-center">
                    <FileCode className="h-12 w-12 mx-auto mb-3 text-muted-foreground/30" />
                    <p className="text-sm text-muted-foreground">
                      Select a method from the left panel
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {loadedContract.methods.length} methods available
                    </p>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-full gap-8 max-w-2xl mx-auto px-4">
                  <div className="text-center space-y-2">
                    <h2 className="text-lg font-semibold">
                      Explore Smart Contracts
                    </h2>
                    <p className="text-sm text-muted-foreground max-w-md mx-auto">
                      Pick a contract below to visualize its methods, or upload your own metadata file above.
                    </p>
                  </div>
                  <ExampleContracts
                    contractType={contractType}
                    onSelectExample={handleLoadExample}
                  />
                </div>
              )}
            </div>

            {/* Right: Results + Code */}
            <div className="w-[400px] overflow-auto p-4 shrink-0">
              <ResultPanel
                result={lastResult}
                generatedCode={generatedCode}
                onCopyCode={handleCopyCode}
              />
            </div>
          </div>

          {/* Bottom: Event Monitor */}
          <EventMonitor
            events={eventLogs}
            isMonitoring={isMonitoring}
            onToggleMonitoring={handleToggleMonitoring}
            onClear={handleClearEvents}
          />
        </div>
      </div>
    </div>
  );
}
