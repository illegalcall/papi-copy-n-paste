/**
 * Clean, minimal wallet integration code generation
 */

import { PalletCall } from "@workspace/core";
import {
  getDescriptorImport,
  getDescriptorName,
  getChainConnection,
} from "./chainConfig";

export function generateWalletIntegratedCode(
  chainKey: string,
  providerId: string,
  pallet: string,
  call: PalletCall,
  formData: Record<string, any>,
  isWalletConnected: boolean,
): string {
  try {
    const descriptorImport = getDescriptorImport(chainKey);
    const descriptorName = getDescriptorName(chainKey);
    const connectionInfo = getChainConnection(chainKey, providerId);

    if (!descriptorName) {
      return `// ❌ Chain "${chainKey}" is not supported for typed API queries`;
    }

    const args = call.args
      .map((arg) => {
        const value = formData[arg.name] || "";

        // Handle MultiAddress types properly for dest/target fields
        if (
          arg.name === "dest" ||
          arg.name === "target" ||
          arg.type.includes("MultiAddress")
        ) {
          if (typeof value === "string" && value.startsWith("//")) {
            const accountMap: Record<string, string> = {
              "//Alice": "5GrwvaEF5zXb26Fz9rcQpDWS57CtERHpNehXCPcNoHGKutQY",
              "//Bob": "5FHneW46xGXgs5mUiveU4sbTyGBzmstUspZC92UhjJM694ty",
              "//Charlie": "5FLSigC9HGRKVhB9FiEo4Y3koPsNmBmLJbpXg2mp1hXcS59Y",
            };
            const address = accountMap[value] || accountMap["//Alice"];
            return `  ${arg.name}: MultiAddress.Id("${address}"), // ${value}`;
          } else if (typeof value === "string" && value.length > 40) {
            return `  ${arg.name}: MultiAddress.Id("${value}")`;
          } else {
            return `  ${arg.name}: MultiAddress.Id("5GrwvaEF5zXb26Fz9rcQpDWS57CtERHpNehXCPcNoHGKutQY")`;
          }
        }

        if (
          arg.type.includes("u128") ||
          arg.type.includes("u64") ||
          arg.name === "value" ||
          arg.name === "amount"
        ) {
          const numValue = typeof value === "string" ? value : String(value || "0");
          const cleanValue = numValue.trim() || "0";
          return `  ${arg.name}: ${cleanValue}n`;
        }

        return `  ${arg.name}: ${JSON.stringify(value)}`;
      })
      .join(",\n");

    return `import { createClient } from "polkadot-api"
import { MultiAddress } from "polkadot-api"
import { getPolkadotSigner } from "polkadot-api/signer"
${descriptorImport}
${connectionInfo.imports}

${connectionInfo.connection}
const typedApi = client.getTypedApi(${descriptorName})

// Connect to wallet
const extension = await window.injectedWeb3["polkadot-js"].enable("app")
const accounts = await extension.accounts.get()
const signer = getPolkadotSigner(extension.signer)

const call = typedApi.tx.${pallet}.${call.name}({
${args}
})

// Sign and submit
const txHash = await call.signAndSubmit(signer)
console.log("Transaction hash:", txHash)${connectionInfo.cleanup || ''}`;

  } catch (error) {
    return `// ❌ Error generating wallet code: ${error instanceof Error ? error.message : "Unknown error"}`;
  }
}

export function generateWalletStorageCode(
  chainKey: string,
  providerId: string,
  pallet: string,
  storage: any,
  queryType: string,
  storageParams: Record<string, any>,
  isWalletConnected: boolean,
): string {
  try {
    const descriptorImport = getDescriptorImport(chainKey);
    const descriptorName = getDescriptorName(chainKey);
    const connectionInfo = getChainConnection(chainKey, providerId);

    if (!descriptorName) {
      return `// ❌ Chain "${chainKey}" is not supported for typed API queries`;
    }

    // Check if user provided any parameters
    const userProvidedParams = Object.keys(storageParams).filter(key =>
      storageParams[key] && String(storageParams[key]).trim() !== ""
    );

    const hasParams = userProvidedParams.length > 0;

    // Generate parameter string for the query (only if user provided parameters)
    const paramString = hasParams
      ? Object.values(storageParams)
          .filter(value => value && String(value).trim() !== "")
          .map(value => JSON.stringify(value))
          .join(", ")
      : "";

    let queryCode;
    if (hasParams) {
      queryCode = `const result = await typedApi.query.${pallet}.${storage.name}.getValue(${paramString})
console.log('${pallet}.${storage.name}:', result)`;
    } else {
      queryCode = `const entries = await typedApi.query.${pallet}.${storage.name}.getEntries()
console.log('All entries:', entries)`;
    }

    // Add wallet account querying for relevant storage items
    const walletQuery = (pallet === "System" && storage.name === "Account")
      ? `
// Get wallet account
const extension = await window.injectedWeb3["polkadot-js"].enable("app")
const accounts = await extension.accounts.get()
const walletAddress = accounts[0]?.address

if (walletAddress) {
  const accountInfo = await typedApi.query.System.Account.getValue(walletAddress)
  console.log('Wallet account info:', accountInfo)
}
` : "";

    return `import { createClient } from "polkadot-api"
${descriptorImport}
${connectionInfo.imports}

${connectionInfo.connection}
const typedApi = client.getTypedApi(${descriptorName})
${walletQuery}
${queryCode}${connectionInfo.cleanup || ''}`;

  } catch (error) {
    return `// ❌ Error generating wallet storage code: ${error instanceof Error ? error.message : "Unknown error"}`;
  }
}