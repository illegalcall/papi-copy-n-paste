import { describe, it, expect } from "vitest";
import {
  getDescriptorName,
  getDescriptorImport,
  getChainSpecImport,
  getChainConnection,
  getParameterDescription,
} from "../../utils/chainConfig";

describe("chainConfig", () => {
  describe("getDescriptorName", () => {
    it("returns descriptor name for known chains", () => {
      expect(getDescriptorName("polkadot")).toBe("polkadot");
      expect(getDescriptorName("kusama")).toBe("kusama");
      expect(getDescriptorName("moonbeam")).toBe("moonbeam");
      expect(getDescriptorName("hydration")).toBe("hydration");
    });

    it("returns name for new chains", () => {
      expect(getDescriptorName("polkadot_asset_hub")).toBe("polkadot_asset_hub");
      expect(getDescriptorName("polkadot_people")).toBe("polkadot_people");
    });

    it("returns null for acala (no descriptor)", () => {
      expect(getDescriptorName("acala")).toBeNull();
    });

    it("returns null for unknown chains", () => {
      expect(getDescriptorName("unknown_chain")).toBeNull();
    });
  });

  describe("getDescriptorImport", () => {
    it("generates correct import for polkadot", () => {
      expect(getDescriptorImport("polkadot")).toBe(
        'import { polkadot } from "@polkadot-api/descriptors"',
      );
    });

    it("generates correct import for hydration", () => {
      expect(getDescriptorImport("hydration")).toBe(
        'import { hydration } from "@polkadot-api/descriptors"',
      );
    });

    it("throws for chains without descriptors", () => {
      expect(() => getDescriptorImport("acala")).toThrow("No descriptor available");
    });
  });

  describe("getChainSpecImport", () => {
    it("returns chain spec import for Polkadot", () => {
      expect(getChainSpecImport("polkadot")).toContain("polkadot-api/chains/polkadot");
    });

    it("returns chain spec import for Kusama", () => {
      expect(getChainSpecImport("kusama")).toContain("polkadot-api/chains/ksmcc3");
    });

    it("returns RPC comment for parachains", () => {
      expect(getChainSpecImport("moonbeam")).toContain("connects via RPC");
    });
  });

  describe("getChainConnection", () => {
    it("returns Smoldot connection for relay chains", () => {
      const result = getChainConnection("polkadot");
      expect(result.imports).toContain("smoldot");
      expect(result.imports).toContain("getSmProvider");
      expect(result.connection).toContain("smoldot.addChain");
    });

    it("returns WebSocket connection for parachains", () => {
      const result = getChainConnection("moonbeam");
      expect(result.imports).toContain("getWsProvider");
      expect(result.connection).toContain("wss://wss.api.moonbeam.network");
    });

    it("returns WebSocket for new Asset Hub chain", () => {
      const result = getChainConnection("polkadot_asset_hub");
      expect(result.imports).toContain("getWsProvider");
      expect(result.connection).toContain("polkadot-asset-hub-rpc.polkadot.io");
    });

    it("returns WebSocket for new People chain", () => {
      const result = getChainConnection("polkadot_people");
      expect(result.imports).toContain("getWsProvider");
      expect(result.connection).toContain("polkadot-people-rpc.polkadot.io");
    });

    it("throws for unknown chains without custom RPC", () => {
      expect(() => getChainConnection("nonexistent")).toThrow("No RPC URL configured");
    });
  });

  describe("getParameterDescription", () => {
    it("returns description for known params", () => {
      expect(getParameterDescription("dest", "AccountId")).toContain("destination");
      expect(getParameterDescription("value", "Balance")).toContain("planck");
    });

    it("returns generic description for unknown params", () => {
      const result = getParameterDescription("custom", "CustomType");
      expect(result).toContain("parameter of type CustomType");
    });
  });
});
