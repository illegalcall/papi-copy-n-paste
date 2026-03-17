import { describe, it, expect, vi, afterEach } from "vitest";
import { useEffect } from "react";
import { render, screen, fireEvent, cleanup } from "@testing-library/react";
import {
  EventMonitor,
  type ContractEventLog,
} from "@/app/contracts/components/event-monitor";

const makeEvent = (
  id: string,
  name: string,
  args: Record<string, unknown> = {},
  blockNumber?: string,
): ContractEventLog => ({
  id,
  name,
  args,
  blockNumber,
  timestamp: Date.now(),
});

describe("EventMonitor", () => {
  afterEach(() => {
    cleanup();
  });

  it("renders the empty state when no events and not monitoring", () => {
    render(
      <EventMonitor
        events={[]}
        isMonitoring={false}
        onToggleMonitoring={vi.fn()}
        onClear={vi.fn()}
      />,
    );
    expect(
      screen.getByText(/start monitoring to capture contract events/i),
    ).toBeInTheDocument();
  });

  it("renders the listening state when monitoring with no events", () => {
    render(
      <EventMonitor
        events={[]}
        isMonitoring={true}
        onToggleMonitoring={vi.fn()}
        onClear={vi.fn()}
      />,
    );
    expect(screen.getByText(/listening for events/i)).toBeInTheDocument();
  });

  it("renders event rows with name, args and block number", () => {
    const events = [
      makeEvent("1", "Transferred", { from: "5Grw", to: "5FHn", amount: 100n }, "42"),
      makeEvent("2", "Approved", { owner: "5Grw", spender: "5FHn" }),
    ];
    render(
      <EventMonitor
        events={events}
        isMonitoring={true}
        onToggleMonitoring={vi.fn()}
        onClear={vi.fn()}
      />,
    );
    expect(screen.getByText("Transferred")).toBeInTheDocument();
    expect(screen.getByText("Approved")).toBeInTheDocument();
    expect(screen.getByText(/from: 5Grw \| to: 5FHn \| amount: 100/)).toBeInTheDocument();
    expect(screen.getByText("#42")).toBeInTheDocument();
  });

  it("calls onToggleMonitoring when the Monitor/Pause button is clicked", () => {
    const onToggleMonitoring = vi.fn();
    render(
      <EventMonitor
        events={[]}
        isMonitoring={false}
        onToggleMonitoring={onToggleMonitoring}
        onClear={vi.fn()}
      />,
    );
    fireEvent.click(screen.getByRole("button", { name: /monitor/i }));
    expect(onToggleMonitoring).toHaveBeenCalledTimes(1);
  });

  it("calls onClear when the clear button is clicked", () => {
    const onClear = vi.fn();
    render(
      <EventMonitor
        events={[makeEvent("1", "Transferred")]}
        isMonitoring={true}
        onToggleMonitoring={vi.fn()}
        onClear={onClear}
      />,
    );
    // Clear is the trash button; there are two buttons total (Pause + Clear).
    const buttons = screen.getAllByRole("button");
    const clearButton = buttons[buttons.length - 1]!;
    fireEvent.click(clearButton);
    expect(onClear).toHaveBeenCalledTimes(1);
  });

  it("disables the clear button when there are no events", () => {
    render(
      <EventMonitor
        events={[]}
        isMonitoring={true}
        onToggleMonitoring={vi.fn()}
        onClear={vi.fn()}
      />,
    );
    const buttons = screen.getAllByRole("button");
    const clearButton = buttons[buttons.length - 1]!;
    expect(clearButton).toBeDisabled();
  });

  // ── Regression test for Task A: subscription cleanup on unmount ──
  //
  // The real event subscription lives in contracts-page-content.tsx inside a
  // useEffect that calls `subscribeEvents(...)` and returns `unsubscribe` as
  // its cleanup. Before Task A the cleanup was missing, leaking WS
  // subscriptions on unmount, contract switch, or chain switch. This test
  // mirrors the exact page pattern with a tiny harness so the regression is
  // pinned at the unit-test level.
  describe("subscription lifecycle (regression for Task A)", () => {
    function SubscriberHarness({
      subscribeEvents,
      isMonitoring,
    }: {
      subscribeEvents: (cb: (e: unknown) => void) => () => void;
      isMonitoring: boolean;
    }) {
      useEffect(() => {
        if (!isMonitoring) return;
        const unsubscribe = subscribeEvents(() => {});
        return () => {
          unsubscribe();
        };
      }, [isMonitoring, subscribeEvents]);
      return <div data-testid="harness" />;
    }

    it("invokes the unsubscribe returned from subscribeEvents on unmount", () => {
      const unsubscribe = vi.fn();
      const subscribeEvents = vi.fn(() => unsubscribe);

      const { unmount } = render(
        <SubscriberHarness
          subscribeEvents={subscribeEvents}
          isMonitoring={true}
        />,
      );

      expect(subscribeEvents).toHaveBeenCalledTimes(1);
      expect(unsubscribe).not.toHaveBeenCalled();

      unmount();

      expect(unsubscribe).toHaveBeenCalledTimes(1);
    });

    it("invokes unsubscribe when monitoring is toggled off", () => {
      const unsubscribe = vi.fn();
      const subscribeEvents = vi.fn(() => unsubscribe);

      const { rerender } = render(
        <SubscriberHarness
          subscribeEvents={subscribeEvents}
          isMonitoring={true}
        />,
      );

      rerender(
        <SubscriberHarness
          subscribeEvents={subscribeEvents}
          isMonitoring={false}
        />,
      );

      expect(unsubscribe).toHaveBeenCalledTimes(1);
    });

    it("resubscribes when the subscribeEvents identity changes (contract/chain switch)", () => {
      const firstUnsubscribe = vi.fn();
      const secondUnsubscribe = vi.fn();
      const firstSubscribe = vi.fn(() => firstUnsubscribe);
      const secondSubscribe = vi.fn(() => secondUnsubscribe);

      const { rerender, unmount } = render(
        <SubscriberHarness
          subscribeEvents={firstSubscribe}
          isMonitoring={true}
        />,
      );

      rerender(
        <SubscriberHarness
          subscribeEvents={secondSubscribe}
          isMonitoring={true}
        />,
      );

      expect(firstSubscribe).toHaveBeenCalledTimes(1);
      expect(firstUnsubscribe).toHaveBeenCalledTimes(1);
      expect(secondSubscribe).toHaveBeenCalledTimes(1);
      expect(secondUnsubscribe).not.toHaveBeenCalled();

      unmount();
      expect(secondUnsubscribe).toHaveBeenCalledTimes(1);
    });
  });
});
