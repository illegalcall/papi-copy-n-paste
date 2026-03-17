import { describe, it, expect, vi, afterEach } from "vitest";
import { render, screen, fireEvent, cleanup } from "@testing-library/react";
import { ContractSelector } from "@/app/contracts/components/contract-selector";

function renderSelector(overrides: Partial<React.ComponentProps<typeof ContractSelector>> = {}) {
  const props: React.ComponentProps<typeof ContractSelector> = {
    contractType: "ink",
    selectedChain: "pop-testnet",
    contractAddress: "",
    onContractTypeChange: vi.fn(),
    onChainChange: vi.fn(),
    onAddressChange: vi.fn(),
    onMetadataFile: vi.fn(),
    onLoad: vi.fn(),
    isLoading: false,
    isConnected: false,
    uploadError: null,
    contractName: undefined,
    ...overrides,
  };
  const view = render(<ContractSelector {...props} />);
  return { ...view, props };
}

describe("ContractSelector", () => {
  afterEach(() => {
    cleanup();
  });

  it("renders both ink and EVM type tabs", () => {
    renderSelector();
    expect(screen.getByRole("tab", { name: /ink!/i })).toBeInTheDocument();
    expect(screen.getByRole("tab", { name: /^evm$/i })).toBeInTheDocument();
  });

  it("emits onAddressChange when typing into the address field", () => {
    const { props } = renderSelector();
    const input = screen.getByPlaceholderText(/5GrwvaEF/);
    fireEvent.change(input, { target: { value: "5Grw123" } });
    expect(props.onAddressChange).toHaveBeenCalledWith("5Grw123");
  });

  it("shows an EVM placeholder when contractType is 'evm'", () => {
    renderSelector({ contractType: "evm" });
    expect(screen.getByPlaceholderText(/0x1234/)).toBeInTheDocument();
  });

  it("disables the Load button when address is empty", () => {
    renderSelector();
    const button = screen.getByRole("button", { name: /load/i });
    expect(button).toBeDisabled();
  });

  it("enables Load when an address is provided and fires onLoad", () => {
    const { props } = renderSelector({ contractAddress: "5Grw123" });
    const button = screen.getByRole("button", { name: /load/i });
    expect(button).not.toBeDisabled();
    fireEvent.click(button);
    expect(props.onLoad).toHaveBeenCalledTimes(1);
  });

  it("renders a Connected badge when isConnected is true", () => {
    renderSelector({ isConnected: true });
    expect(screen.getByText(/connected/i)).toBeInTheDocument();
  });

  it("renders the contract name badge when loaded", () => {
    renderSelector({ contractName: "Flipper" });
    expect(screen.getByText("Flipper")).toBeInTheDocument();
    expect(screen.getByText(/loaded/i)).toBeInTheDocument();
  });

  it("shows Loading state and disables Load button while loading", () => {
    renderSelector({ isLoading: true, contractAddress: "5Grw" });
    const button = screen.getByRole("button", { name: /loading/i });
    expect(button).toBeDisabled();
  });
});
