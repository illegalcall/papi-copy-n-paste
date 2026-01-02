/**
 * Contract metadata parsing and fetching utilities
 * Handles ink! .contract/.json files and EVM ABI JSON files
 */

import type {
  InkMetadata,
  EvmAbi,
  UnifiedMethod,
  LoadedContract,
  ContractType,
  AbiItem,
  ContractMethod,
} from "@workspace/core/contracts/types";

// ── ink! Metadata Parsing ──

/**
 * Parse an ink! metadata file (.contract or .json from cargo-contract)
 * Supports ink! metadata v4 and v5 formats
 */
export async function parseInkMetadata(file: File): Promise<InkMetadata> {
  const text = await file.text();
  let json: Record<string, unknown>;

  try {
    json = JSON.parse(text);
  } catch {
    throw new Error("Invalid JSON: could not parse ink! metadata file");
  }

  // .contract files from cargo-contract have the metadata nested
  const metadata = (json.V3 ?? json.V4 ?? json.V5 ?? json) as Record<string, unknown>;

  // Validate required fields
  if (!metadata.spec || typeof metadata.spec !== "object") {
    throw new Error(
      "Invalid ink! metadata: missing 'spec' field. Ensure this is a .contract or metadata.json file from cargo-contract.",
    );
  }

  const spec = metadata.spec as Record<string, unknown>;
  if (!Array.isArray(spec.messages)) {
    throw new Error("Invalid ink! metadata: missing 'spec.messages' array");
  }

  if (!Array.isArray(spec.constructors)) {
    throw new Error("Invalid ink! metadata: missing 'spec.constructors' array");
  }

  return {
    source: (metadata.source as InkMetadata["source"]) ?? {
      hash: "",
      language: "ink!",
      compiler: "unknown",
    },
    contract: (metadata.contract as InkMetadata["contract"]) ?? {
      name: file.name.replace(/\.(contract|json)$/, ""),
      version: "unknown",
    },
    spec: {
      constructors: spec.constructors as ContractMethod[],
      messages: spec.messages as ContractMethod[],
      events: (spec.events as InkMetadata["spec"]["events"]) ?? [],
      environment: spec.environment as Record<string, unknown>,
    },
    storage: (metadata.storage as InkMetadata["storage"]) ?? {},
    types: (metadata.types as InkMetadata["types"]) ?? [],
    version: String(metadata.version ?? "5"),
  };
}

// ── EVM ABI Parsing ──

/**
 * Parse an EVM ABI file (JSON array or Hardhat/Foundry artifact)
 */
export async function parseEvmAbi(file: File): Promise<EvmAbi> {
  const text = await file.text();
  let json: unknown;

  try {
    json = JSON.parse(text);
  } catch {
    throw new Error("Invalid JSON: could not parse ABI file");
  }

  // Handle different ABI formats
  let abi: AbiItem[];
  let bytecode: string | undefined;
  let contractName: string | undefined;

  if (Array.isArray(json)) {
    // Plain ABI array
    abi = json as AbiItem[];
  } else if (typeof json === "object" && json !== null) {
    const artifact = json as Record<string, unknown>;

    // Hardhat artifact format
    if (Array.isArray(artifact.abi)) {
      abi = artifact.abi as AbiItem[];
      bytecode = artifact.bytecode as string | undefined;
      contractName = artifact.contractName as string | undefined;
    }
    // Foundry artifact format
    else if (artifact.abi && typeof artifact.abi === "object") {
      abi = artifact.abi as AbiItem[];
      if (artifact.bytecode && typeof artifact.bytecode === "object") {
        bytecode = (artifact.bytecode as Record<string, unknown>).object as string;
      }
    } else {
      throw new Error(
        "Invalid ABI format: expected a JSON array or an artifact with an 'abi' field",
      );
    }
  } else {
    throw new Error("Invalid ABI format: expected JSON array or object");
  }

  // Validate ABI entries
  for (const item of abi) {
    if (!item.type) {
      throw new Error("Invalid ABI entry: missing 'type' field");
    }
  }

  return {
    abi,
    bytecode,
    contractName: contractName ?? file.name.replace(/\.json$/, ""),
  };
}

/**
 * Parse ABI from a pasted JSON string
 */
export function parseEvmAbiFromString(abiJson: string): EvmAbi {
  let json: unknown;

  try {
    json = JSON.parse(abiJson);
  } catch {
    throw new Error("Invalid JSON: could not parse the pasted ABI");
  }

  if (!Array.isArray(json)) {
    throw new Error("Expected a JSON array of ABI entries");
  }

  return {
    abi: json as AbiItem[],
  };
}

// ── Unified Method Conversion ──

/**
 * Convert ink! metadata to unified method list
 */
export function inkToUnifiedMethods(metadata: InkMetadata): {
  methods: UnifiedMethod[];
  events: UnifiedMethod[];
  constructors: UnifiedMethod[];
} {
  const resolveTypeName = (typeDef: { type: number; displayName?: string[] }): string => {
    if (typeDef.displayName?.length) {
      return typeDef.displayName.join("::");
    }
    const entry = metadata.types.find((t) => t.id === typeDef.type);
    if (!entry) return `Type(${typeDef.type})`;
    const def = entry.type.def;
    if ("primitive" in def) return def.primitive;
    if (entry.type.path?.length) return entry.type.path.join("::");
    return `Type(${typeDef.type})`;
  };

  const methods: UnifiedMethod[] = metadata.spec.messages.map((msg) => ({
    name: msg.label,
    selector: msg.selector,
    args: msg.args.map((arg) => ({
      name: arg.label,
      type: resolveTypeName(arg.type),
      description: arg.docs?.join(" "),
    })),
    returnType: msg.returnType ? resolveTypeName(msg.returnType) : undefined,
    isReadOnly: !msg.mutates,
    isPayable: msg.payable,
    docs: msg.docs,
    kind: "message" as const,
  }));

  const events: UnifiedMethod[] = metadata.spec.events.map((evt) => ({
    name: evt.label,
    selector: evt.signature_topic ?? "",
    args: evt.args.map((arg) => ({
      name: arg.label,
      type: resolveTypeName(arg.type),
      description: arg.docs?.join(" "),
    })),
    isReadOnly: true,
    isPayable: false,
    docs: evt.docs,
    kind: "event" as const,
  }));

  const constructors: UnifiedMethod[] = metadata.spec.constructors.map((ctor) => ({
    name: ctor.label,
    selector: ctor.selector,
    args: ctor.args.map((arg) => ({
      name: arg.label,
      type: resolveTypeName(arg.type),
      description: arg.docs?.join(" "),
    })),
    isReadOnly: false,
    isPayable: ctor.payable,
    docs: ctor.docs,
    kind: "constructor" as const,
  }));

  return { methods, events, constructors };
}

/**
 * Convert EVM ABI to unified method list
 */
export function evmToUnifiedMethods(abi: EvmAbi): {
  methods: UnifiedMethod[];
  events: UnifiedMethod[];
  constructors: UnifiedMethod[];
} {
  const formatType = (input: { name: string; type: string }): string => input.type;

  const methods: UnifiedMethod[] = abi.abi
    .filter((item): item is AbiItem & { type: "function" } => item.type === "function")
    .map((fn) => ({
      name: fn.name!,
      selector: "", // computed at call time
      args: (fn.inputs ?? []).map((inp) => ({
        name: inp.name,
        type: formatType(inp),
      })),
      returnType: fn.outputs?.map((o) => formatType(o)).join(", "),
      isReadOnly: fn.stateMutability === "view" || fn.stateMutability === "pure",
      isPayable: fn.stateMutability === "payable",
      docs: [],
      kind: "function" as const,
    }));

  const events: UnifiedMethod[] = abi.abi
    .filter((item): item is AbiItem & { type: "event" } => item.type === "event")
    .map((evt) => ({
      name: evt.name!,
      selector: "",
      args: (evt.inputs ?? []).map((inp) => ({
        name: inp.name,
        type: formatType(inp),
        description: inp.indexed ? "(indexed)" : undefined,
      })),
      isReadOnly: true,
      isPayable: false,
      docs: [],
      kind: "event" as const,
    }));

  const constructors: UnifiedMethod[] = abi.abi
    .filter(
      (item): item is AbiItem & { type: "constructor" } => item.type === "constructor",
    )
    .map((ctor) => ({
      name: "constructor",
      selector: "",
      args: (ctor.inputs ?? []).map((inp) => ({
        name: inp.name,
        type: formatType(inp),
      })),
      isReadOnly: false,
      isPayable: ctor.stateMutability === "payable",
      docs: [],
      kind: "constructor" as const,
    }));

  return { methods, events, constructors };
}

/**
 * Create a LoadedContract from parsed metadata
 */
export function createLoadedContract(
  type: ContractType,
  address: string,
  chainKey: string,
  rawMetadata: InkMetadata | EvmAbi,
): LoadedContract {
  const converter =
    type === "ink"
      ? inkToUnifiedMethods(rawMetadata as InkMetadata)
      : evmToUnifiedMethods(rawMetadata as EvmAbi);

  const name =
    type === "ink"
      ? (rawMetadata as InkMetadata).contract.name
      : (rawMetadata as EvmAbi).contractName;

  return {
    type,
    address,
    chainKey,
    name,
    methods: converter.methods,
    events: converter.events,
    constructors: converter.constructors,
    rawMetadata,
  };
}
