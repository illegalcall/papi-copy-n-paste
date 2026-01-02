"use client";

import { memo, useMemo } from "react";
import { Badge } from "@workspace/ui/components/badge";
import { ScrollArea } from "@workspace/ui/components/scroll-area";
import { Eye, Pencil, Hammer, Radio } from "lucide-react";
import type { UnifiedMethod } from "@workspace/core/contracts/types";

interface MethodListProps {
  methods: UnifiedMethod[];
  events: UnifiedMethod[];
  constructors: UnifiedMethod[];
  selectedMethod: string | null;
  onMethodSelect: (method: UnifiedMethod) => void;
}

export const MethodList = memo(function MethodList({
  methods,
  events,
  constructors,
  selectedMethod,
  onMethodSelect,
}: MethodListProps) {
  const readMethods = useMemo(
    () => methods.filter((m) => m.isReadOnly),
    [methods],
  );
  const writeMethods = useMemo(
    () => methods.filter((m) => !m.isReadOnly),
    [methods],
  );

  return (
    <ScrollArea className="h-full">
      <div className="p-3 space-y-4">
        {/* Read Methods */}
        {readMethods.length > 0 && (
          <MethodGroup
            title="Read"
            icon={<Eye className="h-3 w-3" />}
            methods={readMethods}
            selectedMethod={selectedMethod}
            onMethodSelect={onMethodSelect}
            variant="read"
          />
        )}

        {/* Write Methods */}
        {writeMethods.length > 0 && (
          <MethodGroup
            title="Write"
            icon={<Pencil className="h-3 w-3" />}
            methods={writeMethods}
            selectedMethod={selectedMethod}
            onMethodSelect={onMethodSelect}
            variant="write"
          />
        )}

        {/* Constructors */}
        {constructors.length > 0 && (
          <MethodGroup
            title="Deploy"
            icon={<Hammer className="h-3 w-3" />}
            methods={constructors}
            selectedMethod={selectedMethod}
            onMethodSelect={onMethodSelect}
            variant="deploy"
          />
        )}

        {/* Events */}
        {events.length > 0 && (
          <MethodGroup
            title="Events"
            icon={<Radio className="h-3 w-3" />}
            methods={events}
            selectedMethod={selectedMethod}
            onMethodSelect={onMethodSelect}
            variant="event"
          />
        )}

        {methods.length === 0 && events.length === 0 && constructors.length === 0 && (
          <p className="text-sm text-muted-foreground text-center py-4">
            Load a contract to see its methods
          </p>
        )}
      </div>
    </ScrollArea>
  );
});

// ── Method Group ──

interface MethodGroupProps {
  title: string;
  icon: React.ReactNode;
  methods: UnifiedMethod[];
  selectedMethod: string | null;
  onMethodSelect: (method: UnifiedMethod) => void;
  variant: "read" | "write" | "deploy" | "event";
}

const variantColors = {
  read: "text-blue-600 dark:text-blue-400",
  write: "text-orange-600 dark:text-orange-400",
  deploy: "text-purple-600 dark:text-purple-400",
  event: "text-green-600 dark:text-green-400",
};

const variantBg = {
  read: "bg-blue-50 dark:bg-blue-950/30",
  write: "bg-orange-50 dark:bg-orange-950/30",
  deploy: "bg-purple-50 dark:bg-purple-950/30",
  event: "bg-green-50 dark:bg-green-950/30",
};

function MethodGroup({
  title,
  icon,
  methods,
  selectedMethod,
  onMethodSelect,
  variant,
}: MethodGroupProps) {
  return (
    <div>
      <div className={`flex items-center gap-1.5 mb-1.5 px-1 ${variantColors[variant]}`}>
        {icon}
        <span className="text-xs font-semibold uppercase tracking-wider">
          {title}
        </span>
        <Badge variant="outline" className="text-[10px] px-1 py-0 ml-auto">
          {methods.length}
        </Badge>
      </div>

      <div className="space-y-0.5">
        {methods.map((method, idx) => {
          const isSelected = selectedMethod === method.name;
          return (
            <button
              key={`${method.name}-${method.selector || idx}`}
              onClick={() => onMethodSelect(method)}
              className={`w-full text-left px-2 py-1.5 rounded text-sm transition-colors ${
                isSelected
                  ? `${variantBg[variant]} font-medium`
                  : "hover:bg-muted/50"
              }`}
            >
              <div className="flex items-center gap-1.5">
                <span
                  className={`w-1.5 h-1.5 rounded-full ${
                    isSelected ? "bg-primary" : "bg-muted-foreground/30"
                  }`}
                />
                <span className="font-mono text-xs truncate">
                  {method.name}
                </span>
                {method.isPayable && (
                  <Badge
                    variant="outline"
                    className="text-[9px] px-1 py-0 text-amber-600 border-amber-600"
                  >
                    payable
                  </Badge>
                )}
              </div>
              {method.args.length > 0 && (
                <span className="text-[10px] text-muted-foreground ml-4">
                  ({method.args.map((a) => a.name).join(", ")})
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
