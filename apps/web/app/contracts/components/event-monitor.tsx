"use client";

import { memo, useState, useCallback } from "react";
import { Badge } from "@workspace/ui/components/badge";
import { Button } from "@workspace/ui/components/button";
import { ScrollArea } from "@workspace/ui/components/scroll-area";
import { Radio, Trash2, Pause, Play } from "lucide-react";

export interface ContractEventLog {
  id: string;
  name: string;
  args: Record<string, unknown>;
  blockNumber?: string;
  timestamp: number;
}

interface EventMonitorProps {
  events: ContractEventLog[];
  isMonitoring: boolean;
  onToggleMonitoring: () => void;
  onClear: () => void;
}

export const EventMonitor = memo(function EventMonitor({
  events,
  isMonitoring,
  onToggleMonitoring,
  onClear,
}: EventMonitorProps) {
  return (
    <div className="border-t">
      <div className="flex items-center justify-between px-4 py-2 bg-muted/30">
        <div className="flex items-center gap-2">
          <Radio
            className={`h-3.5 w-3.5 ${
              isMonitoring ? "text-green-500 animate-pulse" : "text-muted-foreground"
            }`}
          />
          <span className="text-xs font-semibold uppercase tracking-wider">
            Event Log
          </span>
          {events.length > 0 && (
            <Badge variant="secondary" className="text-[10px] px-1 py-0">
              {events.length}
            </Badge>
          )}
        </div>

        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="sm"
            onClick={onToggleMonitoring}
            className="h-6 text-xs"
          >
            {isMonitoring ? (
              <>
                <Pause className="h-3 w-3 mr-1" />
                Pause
              </>
            ) : (
              <>
                <Play className="h-3 w-3 mr-1" />
                Monitor
              </>
            )}
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClear}
            className="h-6 text-xs"
            disabled={events.length === 0}
          >
            <Trash2 className="h-3 w-3" />
          </Button>
        </div>
      </div>

      <ScrollArea className="h-[150px]">
        <div className="px-4 py-2 space-y-1">
          {events.length === 0 ? (
            <p className="text-xs text-muted-foreground text-center py-4">
              {isMonitoring
                ? "Listening for events..."
                : "Start monitoring to capture contract events"}
            </p>
          ) : (
            events.map((event) => (
              <div
                key={event.id}
                className="flex items-start gap-2 text-xs font-mono py-1 border-b border-border/50 last:border-0"
              >
                <Badge
                  variant="outline"
                  className="text-[10px] px-1 py-0 text-green-600 border-green-600 shrink-0"
                >
                  {event.name}
                </Badge>
                <span className="text-muted-foreground truncate">
                  {Object.entries(event.args)
                    .map(
                      ([key, val]) =>
                        `${key}: ${typeof val === "bigint" ? val.toString() : String(val)}`,
                    )
                    .join(" | ")}
                </span>
                {event.blockNumber && (
                  <span className="text-muted-foreground/50 shrink-0 ml-auto">
                    #{event.blockNumber}
                  </span>
                )}
              </div>
            ))
          )}
        </div>
      </ScrollArea>
    </div>
  );
});
