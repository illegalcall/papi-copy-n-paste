"use client";

import { Badge } from "@workspace/ui/components/badge";
import { TypeScriptTypeInfo } from "@/utils/typeExtraction";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";

interface CallSignatureProps {
  typeInfo: TypeScriptTypeInfo;
  description?: string;
}

export function CallSignature({ typeInfo, description }: CallSignatureProps) {
  const [showDetails, setShowDetails] = useState(false);
  
  return (
    <div className="space-y-2">
      {/* Description */}
      {description && (
        <p className="text-xs text-muted-foreground leading-relaxed">
          {description}
        </p>
      )}
      
      {/* Parameter Details Toggle */}
      {typeInfo.parameters.length > 0 && (
        <>
          <button
            type="button"
            className="flex items-center justify-between w-full p-2 bg-muted/20 rounded-md hover:bg-muted/30 transition-colors text-left"
            onClick={() => setShowDetails(!showDetails)}
          >
            <div className="flex items-center space-x-2">
              <span className="text-xs font-medium">Parameter Details</span>
              <Badge variant="outline" className="text-xs">
                {typeInfo.parameters.length}
              </Badge>
            </div>
            {showDetails ? (
              <ChevronUp className="w-4 h-4" />
            ) : (
              <ChevronDown className="w-4 h-4" />
            )}
          </button>
          
          {showDetails && (
            <div className="space-y-2 pl-3 border-l-2 border-muted">
              {typeInfo.parameters.map((param, index) => (
                <div key={index} className="space-y-1">
                  <div className="flex items-center gap-2">
                    <code className="text-xs font-mono px-1.5 py-0.5 bg-muted/50 rounded text-foreground">
                      {param.name}
                    </code>
                    <Badge variant="outline" className="text-xs font-mono px-1.5 py-0.5">
                      {param.type}
                    </Badge>
                  </div>
                  {param.description && (
                    <p className="text-xs text-muted-foreground ml-1">
                      {param.description}
                    </p>
                  )}
                </div>
              ))}
            </div>
          )}
        </>
      )}
      
      {/* Return Type Info */}
      {typeInfo.returnType && (
        <div className="space-y-1">
          <div className="text-xs font-medium text-muted-foreground">Returns</div>
          <div className="flex items-center gap-2">
            <Badge variant="secondary" className="text-xs font-mono px-1.5 py-0.5">
              {typeInfo.returnType}
            </Badge>
            <span className="text-xs text-muted-foreground">
              A submittable extrinsic that can be signed and submitted to the blockchain
            </span>
          </div>
        </div>
      )}
      
      {/* Additional Info */}
      <div className="text-xs text-muted-foreground">
        <p className="mb-1">
          <strong>The dispatch origin for this call must be</strong> Signed by the transactor.
        </p>
      </div>
    </div>
  );
}