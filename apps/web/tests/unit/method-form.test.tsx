import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen, fireEvent, cleanup } from "@testing-library/react";
import { MethodForm } from "@/app/contracts/components/method-form";
import type { UnifiedMethod } from "@workspace/core/contracts/types";

const readMethod: UnifiedMethod = {
  name: "balanceOf",
  selector: "0x12345678",
  args: [{ name: "account", type: "AccountId" }],
  returnType: "u128",
  isReadOnly: true,
  isPayable: false,
  docs: ["Returns the balance for a given account."],
  kind: "message",
};

const writeMethod: UnifiedMethod = {
  name: "transfer",
  selector: "0x87654321",
  args: [
    { name: "to", type: "AccountId" },
    { name: "amount", type: "u128" },
  ],
  returnType: undefined,
  isReadOnly: false,
  isPayable: true,
  docs: [],
  kind: "message",
};

const argOnlyMethod: UnifiedMethod = {
  name: "ping",
  selector: "0x00000000",
  args: [],
  returnType: "bool",
  isReadOnly: true,
  isPayable: false,
  docs: [],
  kind: "message",
};

describe("MethodForm", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });
  afterEach(() => {
    cleanup();
  });

  it("renders method name, read badge, and documentation", () => {
    render(
      <MethodForm
        method={readMethod}
        onQuery={vi.fn()}
        onExecute={vi.fn()}
      />,
    );
    expect(screen.getByText("balanceOf")).toBeInTheDocument();
    expect(screen.getByText("read")).toBeInTheDocument();
    expect(
      screen.getByText("Returns the balance for a given account."),
    ).toBeInTheDocument();
  });

  it("disables Query button while required args are empty", () => {
    render(
      <MethodForm
        method={readMethod}
        onQuery={vi.fn()}
        onExecute={vi.fn()}
      />,
    );
    const button = screen.getByRole("button", { name: /query/i });
    expect(button).toBeDisabled();
  });

  it("calls onQuery with form data for read-only methods", () => {
    const onQuery = vi.fn();
    const onExecute = vi.fn();
    render(
      <MethodForm
        method={readMethod}
        onQuery={onQuery}
        onExecute={onExecute}
      />,
    );
    const input = screen.getByPlaceholderText(/5GrwvaEF/);
    fireEvent.change(input, { target: { value: "5Grw" } });

    const button = screen.getByRole("button", { name: /query/i });
    expect(button).not.toBeDisabled();
    fireEvent.click(button);

    expect(onQuery).toHaveBeenCalledWith({ account: "5Grw" });
    expect(onExecute).not.toHaveBeenCalled();
  });

  it("calls onExecute with args and parsed payable value for write methods", () => {
    const onQuery = vi.fn();
    const onExecute = vi.fn();
    render(
      <MethodForm
        method={writeMethod}
        onQuery={onQuery}
        onExecute={onExecute}
      />,
    );

    // Two required args (to, amount)
    const inputs = screen.getAllByRole("textbox");
    // inputs: [to, amount, payableValue]
    fireEvent.change(inputs[0]!, { target: { value: "5Grw" } });
    fireEvent.change(inputs[1]!, { target: { value: "1000" } });
    fireEvent.change(inputs[2]!, { target: { value: "42" } });

    const button = screen.getByRole("button", { name: /execute/i });
    fireEvent.click(button);

    expect(onExecute).toHaveBeenCalledWith(
      { to: "5Grw", amount: "1000" },
      42n,
    );
    expect(onQuery).not.toHaveBeenCalled();
  });

  it("surfaces an error prop via Alert", () => {
    render(
      <MethodForm
        method={readMethod}
        onQuery={vi.fn()}
        onExecute={vi.fn()}
        error="Something broke"
      />,
    );
    expect(screen.getByText("Something broke")).toBeInTheDocument();
  });

  it("shows running state on submit button", () => {
    render(
      <MethodForm
        method={argOnlyMethod}
        onQuery={vi.fn()}
        onExecute={vi.fn()}
        isRunning
      />,
    );
    expect(screen.getByRole("button")).toBeDisabled();
    expect(screen.getByText(/querying/i)).toBeInTheDocument();
  });

  it("renders 'no parameters required' for argless methods", () => {
    render(
      <MethodForm
        method={argOnlyMethod}
        onQuery={vi.fn()}
        onExecute={vi.fn()}
      />,
    );
    expect(screen.getByText(/no parameters required/i)).toBeInTheDocument();
  });
});
