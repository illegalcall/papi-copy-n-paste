"use client";

import { useState, useEffect } from "react";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@workspace/ui/components/tabs";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@workspace/ui/components/card";
import { Button } from "@workspace/ui/components/button";
import { Toast } from "@workspace/ui/components/toast";
import { Badge } from "@workspace/ui/components/badge";
import { Copy, Terminal, Trash2, Settings, Code, Eye } from "lucide-react";
import { SyntaxHighlighter } from "@/components/code/syntax-highlighter";
import { ConsoleItem } from "@/hooks/useExecution";
import { ArrayResult } from "@/utils/cleanLogger";

interface TransactionResult {
  hash: string;
  blockHash?: string;
  blockNumber?: string;
  success: boolean;
  error?: string;
  events?: Record<string, unknown>[];
  fee?: string;
  timestamp: number;
}

interface RightPaneProps {
  code: string;
  consoleOutput: ConsoleItem[];
  onClearConsole?: () => void;
  activeTab?: "setup" | "code" | "console" | "transactions";
  selectedChain?: string;
  transactionHistory?: TransactionResult[];
  onClearTransactionHistory?: () => void;
}

export function RightPane({
  code,
  consoleOutput,
  onClearConsole,
  activeTab,
  selectedChain,
}: RightPaneProps) {
  const [currentTab, setCurrentTab] = useState<"setup" | "code" | "console" | "transactions">(
    "setup",
  );
  const [showToast, setShowToast] = useState(false);
  const [developerMode, setDeveloperMode] = useState(false);
  const [copiedResult, setCopiedResult] = useState<string | null>(null);
  const [copiedArrayResult, setCopiedArrayResult] = useState<string | null>(null);

  // Update current tab when activeTab prop changes
  useEffect(() => {
    if (activeTab) {
      setCurrentTab(activeTab);
    }
  }, [activeTab]);

  const getSetupCommands = (
    chainKey: string,
  ): {
    commands: string[];
    createPapiCommands: string[];
    description: string;
    templates: { name: string; description: string }[];
  } => {
    const chainConfigs: Record<
      string,
      {
        wellKnown?: string;
        wsUrl?: string;
        description: string;
        keyName: string;
      }
    > = {
      polkadot: {
        wellKnown: "polkadot",
        description: "Polkadot mainnet",
        keyName: "dot",
      },
      kusama: {
        wellKnown: "ksmcc3",
        description: "Kusama network",
        keyName: "kusama",
      },
      moonbeam: {
        wellKnown: "moonbeam",
        description: "Moonbeam parachain",
        keyName: "moonbeam",
      },
      bifrost: {
        wsUrl: "wss://hk.p.bifrost-rpc.liebi.com/ws",
        description: "Bifrost parachain",
        keyName: "bifrost",
      },
      astar: {
        wellKnown: "astar",
        description: "Astar parachain",
        keyName: "astar",
      },
      acala: {
        wellKnown: "acala",
        description: "Acala parachain",
        keyName: "acala",
      },
      hydration: {
        wsUrl: "wss://hydration-rpc.n.dwellir.com",
        description: "Hydration parachain",
        keyName: "hydration",
      },
      paseo: {
        wellKnown: "paseo",
        description: "Paseo testnet",
        keyName: "paseo",
      },
      paseo_asset_hub: {
        wsUrl: "wss://asset-hub-paseo-rpc.dwellir.com",
        description: "Paseo Asset Hub",
        keyName: "paseo_asset_hub",
      },
    };

    const config = chainConfigs[chainKey] || chainConfigs.polkadot;

    if (!config) {
      throw new Error(`No configuration found for chain: ${chainKey}`);
    }

    const addCommand = config.wellKnown
      ? `npx papi add ${config.keyName} -n ${config.wellKnown}`
      : `npx papi add ${config.keyName} --wsUrl ${config.wsUrl}`;

    return {
      createPapiCommands: ["npx create-papi-app"],
      commands: [
        "npm install polkadot-api",
        addCommand,
        "npx papi",
        "npm install",
      ],
      description: config.description,
      templates: [
        { name: "minimal", description: "Basic setup for learning" },
        {
          name: "vite-react",
          description: "React + Vite with modern UI (Recommended)",
        },
        { name: "next-app", description: "Next.js with App Router" },
        { name: "node-cli", description: "Command-line application" },
      ],
    };
  };

  const handleCopyCode = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setShowToast(true);
    } catch (err) {
      console.error("Failed to copy code:", err);
      // Fallback: show toast anyway to indicate attempt was made
      setShowToast(true);
    }
  };

  const handleCopyCommand = async (command: string) => {
    try {
      await navigator.clipboard.writeText(command);
      setShowToast(true);
    } catch (err) {
      console.error("Failed to copy command:", err);
      setShowToast(true);
    }
  };

  const renderConsoleLine = (line: string) => {
    // In basic mode, filter out developer-specific lines
    if (!developerMode) {
      const developerLines = [
        /> 🔗 SCALE Encoded Call:/,
        /> 📝 This is the actual SCALE-encoded call data/,
        /> 🔗 Call Structure Hex:/,
        /> 📝 This is a JSON-encoded representation/,
        /> 📝 Note: This is NOT the actual SCALE encoding/,
        /> 📝 Transaction encoding skipped due to/,
        /> 📝 You can copy this hex and use it in/,
        /> 📝 This allows you to verify the transaction/,
        /> 📝 You can use the transaction structure above/,
        /> Debug -/,
      ];

      if (developerLines.some((regex) => regex.test(line))) {
        return null; // Don't render developer-only lines in basic mode
      }
    }

    // Enhanced SCALE-encoded call hex handling
    const scaleHexMatch = line.match(
      /> 🔗 SCALE Encoded Call: (0x[a-fA-F0-9]+)/,
    );
    if (scaleHexMatch && scaleHexMatch[1]) {
      const fullHex = scaleHexMatch[1];
      const trimmedHex =
        fullHex.length > 20
          ? `${fullHex.slice(0, 16)}...${fullHex.slice(-16)}`
          : fullHex;

      return (
        <div className="bg-emerald-900/20 border border-emerald-500/30 rounded-lg p-3 my-2">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <Code className="w-4 h-4 text-emerald-400" />
              <span className="text-emerald-400 font-semibold">
                SCALE-Encoded Call Data
              </span>
              <Badge
                variant="secondary"
                className="text-xs bg-emerald-500/20 text-emerald-300 border-emerald-500/30"
              >
                Real Blockchain Format
              </Badge>
            </div>
            <Button
              variant="ghost"
              size="sm"
              className="h-6 w-6 p-0 text-emerald-400 hover:text-emerald-300"
              onClick={() => {
                navigator.clipboard.writeText(fullHex);
                setShowToast(true);
              }}
              title="Copy full SCALE-encoded hex"
            >
              <Copy className="w-3 h-3" />
            </Button>
          </div>
          <div className="space-y-2">
            <code className="text-emerald-300 font-mono text-xs bg-black/30 px-3 py-2 rounded block break-all">
              {trimmedHex}
            </code>
            <p className="text-xs text-emerald-200/80">
              💡 This is actual SCALE-encoded data that can be used in
              polkadot-js apps, CLI tools, and other Polkadot ecosystem tools.
            </p>
          </div>
        </div>
      );
    }

    // Call structure hex (educational fallback)
    const structureHexMatch = line.match(
      /> 🔗 Call Structure Hex: (0x[a-fA-F0-9]+)/,
    );
    if (structureHexMatch && structureHexMatch[1]) {
      const fullHex = structureHexMatch[1];
      const trimmedHex =
        fullHex.length > 20
          ? `${fullHex.slice(0, 16)}...${fullHex.slice(-16)}`
          : fullHex;

      return (
        <div className="bg-amber-900/20 border border-amber-500/30 rounded-lg p-3 my-2">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <Eye className="w-4 h-4 text-amber-400" />
              <span className="text-amber-400 font-semibold">
                Call Structure (Educational)
              </span>
              <Badge
                variant="secondary"
                className="text-xs bg-amber-500/20 text-amber-300 border-amber-500/30"
              >
                JSON Format
              </Badge>
            </div>
            <Button
              variant="ghost"
              size="sm"
              className="h-6 w-6 p-0 text-amber-400 hover:text-amber-300"
              onClick={() => {
                navigator.clipboard.writeText(fullHex);
                setShowToast(true);
              }}
              title="Copy call structure hex"
            >
              <Copy className="w-3 h-3" />
            </Button>
          </div>
          <div className="space-y-2">
            <code className="text-amber-300 font-mono text-xs bg-black/30 px-3 py-2 rounded block break-all">
              {trimmedHex}
            </code>
            <p className="text-xs text-amber-200/80">
              📝 This is a JSON-encoded representation of the transaction
              structure for educational purposes.
            </p>
          </div>
        </div>
      );
    }

    // Legacy transaction hex handling
    const legacyHexMatch = line.match(/> 🔗 Transaction hex: (0x[a-fA-F0-9]+)/);
    if (legacyHexMatch && legacyHexMatch[1]) {
      const fullHex = legacyHexMatch[1];
      const trimmedHex =
        fullHex.length > 20
          ? `${fullHex.slice(0, 10)}...${fullHex.slice(-10)}`
          : fullHex;

      return (
        <div className="flex items-center gap-2 group">
          <span className="text-green-400">🔗 Transaction hex:</span>
          <code className="text-yellow-400 font-mono text-xs bg-muted/50 px-2 py-1 rounded">
            {trimmedHex}
          </code>
          <Button
            variant="ghost"
            size="sm"
            className="opacity-0 group-hover:opacity-100 h-6 w-6 p-0 transition-opacity"
            onClick={() => {
              navigator.clipboard.writeText(fullHex);
              setShowToast(true);
            }}
            title="Copy full transaction hex"
          >
            <Copy className="w-3 h-3" />
          </Button>
        </div>
      );
    }

    // Educational messages enhancement
    if (line.includes("📝 This is the actual SCALE-encoded call data")) {
      return <div className="text-xs text-emerald-200/80 pl-4">{line}</div>;
    }
    if (line.includes("📝 This is a JSON-encoded representation")) {
      return <div className="text-xs text-amber-200/80 pl-4">{line}</div>;
    }
    if (line.includes("📝 Note: This is NOT the actual SCALE encoding")) {
      return <div className="text-xs text-orange-200/80 pl-4">{line}</div>;
    }

    // URL handling
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    const parts = line.split(urlRegex);

    return parts.map((part, index) => {
      if (part.match(urlRegex)) {
        return (
          <a
            key={index}
            href={part}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-400 hover:text-blue-300 underline transition-colors break-all inline-block max-w-full"
            title={part}
          >
            {part}
          </a>
        );
      }
      return part;
    });
  };

  return (
    <div className="flex-1 border-l bg-muted/30 flex flex-col min-h-0 max-h-full overflow-hidden">
      <Tabs
        value={currentTab}
        onValueChange={(value) =>
          setCurrentTab(value as "setup" | "code" | "console")
        }
        className="flex-1 flex flex-col min-h-0 max-h-full"
      >
        <div className="p-4 border-b">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="setup">Setup</TabsTrigger>
            <TabsTrigger value="code">Code</TabsTrigger>
            <TabsTrigger value="console">Console</TabsTrigger>
          </TabsList>
        </div>

        <TabsContent
          value="setup"
          className="flex-1 p-4 m-0 h-0 max-h-full overflow-auto"
        >
          <Card className="h-full flex flex-col max-h-full">
            <CardHeader className="pb-3">
              <div className="flex items-center gap-2">
                <Settings className="w-4 h-4" />
                <CardTitle className="text-sm">
                  Setup Required
                  {selectedChain &&
                    ` for ${selectedChain.charAt(0).toUpperCase() + selectedChain.slice(1)}`}
                </CardTitle>
              </div>
            </CardHeader>
            <CardContent className="p-4 flex-1 overflow-auto">
              {selectedChain ? (
                <div className="space-y-6">
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary">Recommended</Badge>
                      <h3 className="font-medium">
                        Option 1: Quick Start with Template
                      </h3>
                    </div>

                    <div className="text-sm text-muted-foreground mb-3">
                      Run the command below and follow the interactive prompts
                      to create your project:
                    </div>

                    <div className="bg-muted/50 border rounded-lg p-4 space-y-2">
                      {getSetupCommands(selectedChain).createPapiCommands.map(
                        (command, index) => (
                          <div
                            key={index}
                            className="group flex items-center gap-2 hover:bg-muted/70 p-2 rounded-md transition-colors"
                          >
                            <span className="text-muted-foreground select-none font-mono text-xs">
                              $
                            </span>
                            <span className="font-mono text-sm text-foreground flex-1">
                              {command}
                            </span>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="opacity-0 group-hover:opacity-100 h-6 w-6 p-0 transition-opacity"
                              onClick={() => handleCopyCommand(command)}
                            >
                              <Copy className="w-3 h-3" />
                            </Button>
                          </div>
                        ),
                      )}
                    </div>

                    <div className="text-xs text-muted-foreground mt-3 p-3 bg-green-50/50 dark:bg-green-950/20 rounded-md space-y-1">
                      <div>
                        <strong>
                          Template Options (you&apos;ll be prompted to choose):
                        </strong>
                      </div>
                      {getSetupCommands(selectedChain).templates.map(
                        (template, index) => (
                          <div key={index}>
                            • <strong>{template.name}</strong>:{" "}
                            {template.description}
                          </div>
                        ),
                      )}
                    </div>
                  </div>

                  {/* Option 2: Manual Setup */}
                  <div className="space-y-3">
                    <h3 className="font-medium">
                      Option 2: Manual Setup in Existing Project
                    </h3>

                    <div className="text-sm text-muted-foreground mb-3">
                      Add PAPI to your existing project:
                    </div>

                    <div className="bg-muted/50 border rounded-lg p-4 space-y-2">
                      {getSetupCommands(selectedChain).commands.map(
                        (command, index) => (
                          <div
                            key={index}
                            className="group flex items-center gap-2 hover:bg-muted/70 p-2 rounded-md transition-colors"
                          >
                            <span className="text-muted-foreground select-none font-mono text-xs">
                              $
                            </span>
                            <span className="font-mono text-sm text-foreground flex-1">
                              {command}
                            </span>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="opacity-0 group-hover:opacity-100 h-6 w-6 p-0 transition-opacity"
                              onClick={() => handleCopyCommand(command)}
                            >
                              <Copy className="w-3 h-3" />
                            </Button>
                          </div>
                        ),
                      )}
                    </div>
                  </div>

                  <div className="text-sm text-muted-foreground">
                    <strong>Setting up:</strong>{" "}
                    {getSetupCommands(selectedChain).description}
                  </div>
                </div>
              ) : (
                <div className="text-sm text-muted-foreground">
                  Select a chain from the left panel to see setup instructions.
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent
          value="code"
          className="flex-1 p-4 m-0 h-0 max-h-full overflow-hidden"
        >
          <Card className="h-full flex flex-col max-h-full">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm">Generated Code</CardTitle>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleCopyCode}
                  disabled={!code}
                >
                  <Copy className="w-3 h-3 mr-1" />
                  Copy
                </Button>
              </div>
            </CardHeader>
            <CardContent className="p-0 flex-1 flex flex-col">
              <div className="overflow-auto p-4 bg-muted rounded-md h-[calc(100vh-20rem)]">
                <SyntaxHighlighter
                  code={code}
                  language="typescript"
                  className="text-xs"
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent
          value="console"
          className="flex-1 p-4 m-0 h-0 max-h-full overflow-hidden"
        >
          <Card className="h-full flex flex-col max-h-full">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm flex items-center gap-2">
                  <Terminal className="w-4 h-4" />
                  Console Output
                </CardTitle>
                <div className="flex items-center gap-2">
                  <Button
                    variant={developerMode ? "default" : "outline"}
                    size="sm"
                    onClick={() => setDeveloperMode(!developerMode)}
                    className={
                      developerMode
                        ? "bg-emerald-600 hover:bg-emerald-700 text-white"
                        : ""
                    }
                  >
                    <Code className="w-3 h-3 mr-1" />
                    {developerMode ? "Dev Mode" : "Basic"}
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={onClearConsole}
                    disabled={consoleOutput.length === 0}
                  >
                    <Trash2 className="w-3 h-3 mr-1" />
                    Clear
                  </Button>
                </div>
              </div>
              {developerMode && (
                <div className="text-xs text-muted-foreground mt-2 p-2 bg-emerald-50/50 dark:bg-emerald-950/30 rounded border border-emerald-200/50 dark:border-emerald-800/50">
                  🧪 <strong>Developer Mode:</strong> Showing SCALE encoding,
                  transaction hex data, and technical details for advanced users
                  and educational purposes.
                </div>
              )}
            </CardHeader>
            <CardContent className="p-0 flex-1 flex flex-col">
              <div className="overflow-auto p-4 pr-6 font-mono text-xs space-y-1 h-[calc(100vh-20rem)]">
                {consoleOutput.length === 0 ? (
                  <div className="text-muted-foreground">No output yet...</div>
                ) : (
                  consoleOutput
                    .map((item, index) => {
                      // Handle ArrayResult objects (summarized arrays with copy button)
                      if (typeof item === 'object' && item && 'type' in item && item.type === 'array-result') {
                        const arrayResult = item as ArrayResult;
                        const fullJsonString = JSON.stringify(arrayResult.rawData, (_, val) =>
                          typeof val === 'bigint' ? val.toString() : val, 2
                        );
                        const copyId = `array-${index}`;

                        return (
                          <div key={index} className="flex items-center gap-2 group break-words whitespace-pre-wrap leading-relaxed">
                            <span>{arrayResult.displayText}</span>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="opacity-0 group-hover:opacity-100 h-6 w-6 p-0 transition-opacity"
                              onClick={() => {
                                navigator.clipboard.writeText(fullJsonString);
                                setCopiedArrayResult(copyId);
                                setTimeout(() => setCopiedArrayResult(null), 2000);
                              }}
                              title="Copy full array data"
                            >
                              <Copy className="w-3 h-3" />
                            </Button>
                            {copiedArrayResult === copyId && (
                              <span className="text-xs text-green-500">Copied!</span>
                            )}
                          </div>
                        );
                      }

                      // Handle string messages
                      const line = item as string;

                      // Check if this line contains a result that should have a copy button
                      const resultMatch = line.match(/^Result: (.+)$/);
                      if (resultMatch && resultMatch[1]) {
                        const resultValue = resultMatch[1];
                        return (
                          <div key={index} className="flex items-center gap-2 group break-words whitespace-pre-wrap leading-relaxed">
                            <span>{line}</span>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="opacity-0 group-hover:opacity-100 h-6 w-6 p-0 transition-opacity"
                              onClick={() => {
                                navigator.clipboard.writeText(resultValue);
                                setCopiedResult(resultValue);
                                setTimeout(() => setCopiedResult(null), 2000);
                              }}
                              title="Copy result"
                            >
                              <Copy className="w-3 h-3" />
                            </Button>
                            {copiedResult === resultValue && (
                              <span className="text-xs text-green-500">Copied!</span>
                            )}
                          </div>
                        );
                      }

                      const renderedLine = renderConsoleLine(line);
                      // Skip rendering if the line is filtered out (returns null)
                      if (renderedLine === null) {
                        return null;
                      }
                      return (
                        <div
                          key={index}
                          className="break-words whitespace-pre-wrap leading-relaxed"
                        >
                          {renderedLine}
                        </div>
                      );
                    })
                    .filter(Boolean) // Remove null entries
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

      </Tabs>

      <Toast
        message="Code copied to clipboard!"
        show={showToast}
        onHide={() => setShowToast(false)}
      />
    </div>
  );
}
