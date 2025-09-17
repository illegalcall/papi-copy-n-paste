"use client";

import { useState } from "react";
import { Badge } from "@workspace/ui/components/badge";
import { Calendar, Code2, ChevronDown, ChevronUp, Info, Copy, Check } from "lucide-react";
import { PalletEvent } from "@workspace/core";
import { Button } from "@workspace/ui/components/button";
import { generateEventSignature } from "@/utils/typeExtraction";
import { CallSignature } from "@/components/type-display";

interface EventFormProps {
  pallet: string;
  event: PalletEvent;
  chainKey: string;
}

export function EventForm({ pallet, event, chainKey }: EventFormProps) {
  const [showTypeInfo, setShowTypeInfo] = useState(true);
  const [showExamples, setShowExamples] = useState(false);
  const [copied, setCopied] = useState(false);

  // Generate TypeScript type information
  const typeInfo = generateEventSignature(pallet, event.name, event.args || []);

  // Generate context about when this event is emitted
  const generateEventContext = (palletName: string, eventName: string): string => {
    const contexts: Record<string, Record<string, string>> = {
      Balances: {
        Transfer: "Emitted when tokens are transferred between accounts",
        Deposit: "Emitted when tokens are deposited into an account",
        Withdraw: "Emitted when tokens are withdrawn from an account",
        Reserved: "Emitted when tokens are reserved for future use",
        Unreserved: "Emitted when previously reserved tokens are unreserved",
        ReserveRepatriated: "Emitted when reserved tokens are moved between accounts",
      },
      System: {
        ExtrinsicSuccess: "Emitted when an extrinsic completes successfully",
        ExtrinsicFailed: "Emitted when an extrinsic fails to execute",
        CodeUpdated: "Emitted when the runtime code is updated",
        NewAccount: "Emitted when a new account is created",
        KilledAccount: "Emitted when an account is reaped",
      },
      Staking: {
        Bonded: "Emitted when an account bonds tokens for staking",
        Unbonded: "Emitted when tokens are unbonded from staking",
        Withdrawn: "Emitted when unbonded tokens are withdrawn",
        Slashed: "Emitted when a validator or nominator is slashed",
        Rewarded: "Emitted when staking rewards are distributed",
        EraPaid: "Emitted when era rewards are calculated and paid",
      },
      Democracy: {
        Proposed: "Emitted when a new referendum is proposed",
        Started: "Emitted when a referendum begins voting",
        Passed: "Emitted when a referendum passes",
        NotPassed: "Emitted when a referendum fails to pass",
        Cancelled: "Emitted when a referendum is cancelled",
        Executed: "Emitted when a passed referendum is executed",
      }
    };

    return contexts[palletName]?.[eventName] ||
           "This event is emitted during specific runtime operations";
  };

  const eventContext = generateEventContext(pallet, event.name);

  const generateListeningExamples = (palletName: string, eventName: string): string[] => {
    const examples = [];

    // Basic event listening example
    examples.push(`// Listen for ${palletName}::${eventName} events
const subscription = typedApi.event.${palletName}.${eventName}.watch().subscribe({
  next: (event) => {
    console.log('${eventName} event:', event);
    // Handle the event data here
    ${event.args && event.args.length > 0 ?
      event.args.map(arg => `// event.${arg.name}: ${arg.type}`).join('\n    ') :
      '// This event has no additional data'}
  },
  error: (error) => {
    console.error('Event listening error:', error);
  }
});

// Don't forget to unsubscribe when done
// subscription.unsubscribe()`);

    // Filtered event listening example
    examples.push(`// Listen for ${palletName}::${eventName} with filtering
const filteredSubscription = typedApi.event.${palletName}.${eventName}.watch().pipe(
  filter(event => {
    // Add your filtering logic here
    ${event.args && event.args.length > 0 ?
      `// Example: return event.${event.args[0]?.name} === someCondition` :
      '// return someCondition'}
    return true; // Remove this and add your condition
  })
).subscribe({
  next: (filteredEvent) => {
    console.log('Filtered ${eventName} event:', filteredEvent);
  }
});`);

    // Historical event querying example
    examples.push(`// Query historical ${palletName}::${eventName} events
const historicalEvents = await typedApi.query.system.events.getValue();
const ${eventName.toLowerCase()}Events = historicalEvents
  .filter(record =>
    record.event.type === '${palletName}' &&
    record.event.value.type === '${eventName}'
  )
  .map(record => ({
    blockNumber: record.phase,
    event: record.event.value.value,
    topics: record.topics
  }));

console.log('Historical ${eventName} events:', ${eventName.toLowerCase()}Events);`);

    return examples;
  };

  const codeExamples = generateListeningExamples(pallet, event.name);

  const handleCopyEventName = async () => {
    const eventPath = `${pallet}.${event.name}`;
    await navigator.clipboard.writeText(eventPath);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-4">
      {/* Event Header */}
      <div className="space-y-1">
        <div className="flex items-center space-x-2">
          <Calendar className="w-4 h-4 text-blue-500" />
          <h3 className="text-lg font-semibold text-foreground">
            {pallet}.{event.name}
          </h3>
          <Badge variant="outline" className="text-xs bg-blue-50 border-blue-200">Event</Badge>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleCopyEventName}
            className="h-6 w-6 p-0"
          >
            {copied ? (
              <Check className="h-3 w-3 text-green-500" />
            ) : (
              <Copy className="h-3 w-3" />
            )}
          </Button>
        </div>
        <p className="text-sm text-muted-foreground">
          {event.docs?.[0] || "Runtime event emitted during execution"}
        </p>
      </div>

      {/* Event Context */}
      <div className="flex items-start gap-3 p-3 bg-blue-50 border border-blue-200 rounded-md">
        <Info className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
        <div className="text-sm text-blue-800">
          <strong>When this event is emitted:</strong> {eventContext}
        </div>
      </div>

      {/* TypeScript Type Information */}
      <div className="space-y-2">
        <button
          type="button"
          className="flex items-center justify-between w-full p-2 bg-muted/20 rounded-md hover:bg-muted/30 transition-colors border"
          onClick={() => setShowTypeInfo(!showTypeInfo)}
        >
          <div className="flex items-center space-x-2 flex-1 min-w-0">
            <Code2 className="w-3 h-3 text-muted-foreground" />
            <div className="font-mono text-xs text-foreground truncate">
              <span className="text-pink-600">{event.name}</span>
              <span className="text-muted-foreground">: </span>
              <span className="text-blue-600">Event</span>
              {event.args && event.args.length > 0 && (
                <>
                  <span className="text-gray-400">&lt;</span>
                  <span className="text-foreground">{event.args.length} field{event.args.length !== 1 ? 's' : ''}</span>
                  <span className="text-gray-400">&gt;</span>
                </>
              )}
            </div>
          </div>
          {showTypeInfo ? (
            <ChevronUp className="w-3 h-3 text-muted-foreground" />
          ) : (
            <ChevronDown className="w-3 h-3 text-muted-foreground" />
          )}
        </button>

        {showTypeInfo && (
          <div className="max-h-48 overflow-y-auto p-3 bg-muted/10 rounded-md border border-muted/50">
            <CallSignature
              typeInfo={typeInfo}
              description={event.docs?.[0] || "Runtime event emitted during execution"}
            />
          </div>
        )}
      </div>

      {/* Event Fields */}
      {event.args && event.args.length > 0 && (
        <div className="space-y-2">
          <h4 className="text-sm font-medium text-foreground">Event Fields:</h4>
          <div className="space-y-2">
            {event.args.map((arg, index) => (
              <div key={index} className="flex items-center justify-between p-2 bg-muted/10 rounded-md">
                <div className="flex items-center space-x-2">
                  <span className="text-xs font-mono text-purple-600">{arg.name}</span>
                  <span className="text-xs text-muted-foreground">:</span>
                  <span className="text-xs font-mono text-blue-600">{arg.type}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Code Examples */}
      <div className="space-y-2">
        <button
          type="button"
          className="flex items-center justify-between w-full p-2 bg-muted/30 rounded-md hover:bg-muted/50 transition-colors"
          onClick={() => setShowExamples(!showExamples)}
        >
          <div className="flex items-center space-x-2">
            <Code2 className="w-4 h-4" />
            <span className="text-sm font-medium">Event Listening Examples</span>
            <Badge variant="outline" className="text-xs">TypeScript</Badge>
          </div>
          {showExamples ? (
            <ChevronUp className="w-4 h-4" />
          ) : (
            <ChevronDown className="w-4 h-4" />
          )}
        </button>

        {showExamples && (
          <div className="bg-muted/20 rounded-md p-3 border border-muted space-y-4">
            {codeExamples.map((example, index) => (
              <div key={index}>
                <div className="text-xs font-medium text-muted-foreground mb-2">
                  Example {index + 1}:
                </div>
                <pre className="text-xs font-mono text-muted-foreground overflow-x-auto whitespace-pre-wrap bg-muted/50 p-2 rounded">
                  {example}
                </pre>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Event Information */}
      <div className="text-xs text-muted-foreground space-y-1">
        <div>
          <strong>Pallet:</strong> {pallet}
        </div>
        <div>
          <strong>Event Name:</strong> {event.name}
        </div>
        <div>
          <strong>Fields:</strong> {event.args ? event.args.length : 0}
        </div>
        <div className="text-blue-500">
          📡 Events are emitted during runtime execution and can be listened to
        </div>
        <div className="text-green-500">
          🔍 Use event listeners to react to on-chain state changes
        </div>
        <div className="text-purple-500">
          📚 Events provide real-time notifications of blockchain activity
        </div>
      </div>
    </div>
  );
}