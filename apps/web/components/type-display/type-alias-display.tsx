"use client";

import { Badge } from "@workspace/ui/components/badge";
import { TypeScriptTypeInfo } from "@/utils/typeExtraction";

// Component to render TypeScript type signature with proper syntax highlighting
function TypeScriptSignature({ signature }: { signature: string }) {
  // Parse the signature to identify different parts for coloring
  const renderSignature = (sig: string) => {
    // Handle TxDescriptor<{...}> pattern
    const txDescriptorMatch = sig.match(/^(TxDescriptor)<(.+)>$/);
    if (txDescriptorMatch && txDescriptorMatch[1] && txDescriptorMatch[2]) {
      const [, descriptor, content] = txDescriptorMatch;
      return (
        <>
          <span className="text-purple-600">{descriptor}</span>
          <span className="text-gray-400">&lt;</span>
          {renderObjectType(content)}
          <span className="text-gray-400">&gt;</span>
        </>
      );
    }
    
    // Handle StorageDescriptor pattern
    const storageDescriptorMatch = sig.match(/^(StorageDescriptor)<(.+)>$/);
    if (storageDescriptorMatch && storageDescriptorMatch[1] && storageDescriptorMatch[2]) {
      const [, descriptor, content] = storageDescriptorMatch;
      return (
        <>
          <span className="text-purple-600">{descriptor}</span>
          <span className="text-gray-400">&lt;</span>
          {content}
          <span className="text-gray-400">&gt;</span>
        </>
      );
    }
    
    return <span className="text-foreground">{sig}</span>;
  };
  
  // Helper to render object types like { dest: MultiAddress; value: bigint }
  const renderObjectType = (content: string) => {
    if (content.startsWith('{ ') && content.endsWith(' }')) {
      const inner = content.slice(2, -2); // Remove { and }
      const parts = inner.split('; ');
      
      return (
        <>
          <span className="text-gray-500">&#123;</span>
          <span> </span>
          {parts.map((part, index) => {
            const splitParts = part.split(': ');
            const name = splitParts[0] || '';
            const type = splitParts[1] || '';
            return (
              <span key={index}>
                <span className="text-foreground">{name}</span>
                <span className="text-gray-400">: </span>
                {renderType(type)}
                {index < parts.length - 1 && <span className="text-gray-400">; </span>}
              </span>
            );
          })}
          <span> </span>
          <span className="text-gray-500">&#125;</span>
        </>
      );
    }
    return <span className="text-foreground">{content}</span>;
  };
  
  // Helper to render individual types with proper coloring
  const renderType = (type: string) => {
    if (['string', 'number', 'bigint', 'boolean', 'undefined'].includes(type)) {
      return <span className="text-blue-600">{type}</span>;
    }
    if (['MultiAddress', 'HexString', 'Result'].includes(type)) {
      return <span className="text-purple-600">{type}</span>;
    }
    return <span className="text-foreground">{type}</span>;
  };
  
  return <span className="text-foreground">{renderSignature(signature)}</span>;
}

interface TypeAliasDisplayProps {
  typeInfo: TypeScriptTypeInfo;
  callName: string;
  pallet: string;
}

export function TypeAliasDisplay({ typeInfo, callName }: TypeAliasDisplayProps) {
  return (
    <div className="space-y-2">
      {/* Main Type Signature */}
      <div className="bg-muted/30 border rounded-lg p-2">
        <div className="font-mono text-xs">
          <span className="text-pink-600">{callName}</span>
          <span className="text-muted-foreground">: </span>
          <TypeScriptSignature signature={typeInfo.signature} />
        </div>
      </div>
      
      {/* Parameter Count Badge */}
      {typeInfo.parameters.length > 0 && (
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="text-xs">
            {typeInfo.parameters.length} parameter{typeInfo.parameters.length !== 1 ? 's' : ''}
          </Badge>
        </div>
      )}
    </div>
  );
}