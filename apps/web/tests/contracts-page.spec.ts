import { test, expect } from "@playwright/test";

/**
 * E2E smoke test for the Contract IDE at /contracts.
 *
 * This flow is deterministic: it loads a pre-bundled ink! example ("Flipper")
 * whose metadata is shipped statically with the app, so it does not depend
 * on any live RPC / Smoldot connection to render the method list and
 * generated code. We never submit a real transaction.
 */
test.describe("Contract IDE", () => {
  test.setTimeout(60_000);

  test("loads Flipper example and renders methods + generated code", async ({
    page,
  }) => {
    // Step 1: Navigate to /contracts
    await page.goto("/contracts");
    await page.waitForLoadState("domcontentloaded");

    // Step 2: The hero example cards should render (Flipper, PSP22, Incrementer for ink!)
    const flipperCard = page.getByRole("button", { name: /Flipper/i }).first();
    await expect(flipperCard).toBeVisible({ timeout: 15_000 });

    const psp22Card = page.getByRole("button", { name: /PSP22/i }).first();
    const incrementerCard = page
      .getByRole("button", { name: /Incrementer/i })
      .first();
    await expect(psp22Card).toBeVisible();
    await expect(incrementerCard).toBeVisible();

    // Step 3: Click the Flipper example to load its metadata
    await flipperCard.click();

    // Step 4: On the Interact tab, the method list should show Flipper's
    // messages (flip + get). Constructors live under the Deploy tab as
    // options of a <select>, not buttons.
    const flipMethod = page.getByRole("button", { name: /^flip\b/ }).first();
    const getMethod = page.getByRole("button", { name: /^get\b/ }).first();

    await expect(flipMethod).toBeVisible({ timeout: 10_000 });
    await expect(getMethod).toBeVisible();

    // Step 5: Select the read-only `get` method (no form fields required,
    // keeps the test deterministic — no wallet, no RPC).
    await getMethod.click();

    // Step 6: The Generated Code panel should appear and contain a PAPI import.
    const generatedCodeHeading = page.getByText("Generated Code", {
      exact: true,
    });
    await expect(generatedCodeHeading).toBeVisible({ timeout: 10_000 });

    const codeBlock = page.locator("pre").filter({ hasText: /polkadot-api/ }).first();
    await expect(codeBlock).toBeVisible({ timeout: 10_000 });

    const codeText = (await codeBlock.textContent()) ?? "";
    expect(codeText).toContain("polkadot-api");
    expect(codeText).toContain("createClient");
    // Must not contain any PAPI hallucination traps
    expect(codeText).not.toMatch(/@polkadot\/api/);
    expect(codeText).not.toContain("signAndSend");
    expect(codeText).not.toMatch(/\bnew BN\b/);
    expect(codeText).not.toContain("ApiPromise.create");
  });

  test("EVM examples render when switching contract type", async ({ page }) => {
    await page.goto("/contracts");
    await page.waitForLoadState("domcontentloaded");

    // Switch to EVM contract type (Radix Tabs → role=tab)
    const evmToggle = page.getByRole("tab", { name: /^EVM$/ }).first();
    await expect(evmToggle).toBeVisible({ timeout: 15_000 });
    await evmToggle.click();

    // EVM hero cards: ERC-20, ERC-721, WGLMR
    const erc20Card = page.getByRole("button", { name: /ERC-20/i }).first();
    await expect(erc20Card).toBeVisible({ timeout: 10_000 });

    // Curated live XC-20 cards
    await expect(
      page.getByRole("button", { name: /xcDOT/i }).first(),
    ).toBeVisible();
    await expect(
      page.getByRole("button", { name: /xcUSDC/i }).first(),
    ).toBeVisible();
    await expect(
      page.getByRole("button", { name: /xcUSDT/i }).first(),
    ).toBeVisible();
  });

  test("clicking xcDOT loads the live Moonbeam precompile address", async ({
    page,
  }) => {
    await page.goto("/contracts");
    await page.waitForLoadState("domcontentloaded");

    const evmToggle = page.getByRole("tab", { name: /^EVM$/ }).first();
    await expect(evmToggle).toBeVisible({ timeout: 15_000 });
    await evmToggle.click();

    const xcdotCard = page.getByRole("button", { name: /xcDOT/i }).first();
    await expect(xcdotCard).toBeVisible({ timeout: 15_000 });
    await xcdotCard.click();

    // The Moonbeam XC-20 precompile address should populate the address field.
    await expect(
      page
        .locator(
          'input[value="0xFfFFfFff1FcaCBd218EDc0EbA20Fc2308C778080" i]',
        )
        .first(),
    ).toBeVisible({ timeout: 15_000 });

    // Standard ERC-20 methods should surface from the ABI.
    await expect(
      page.getByRole("button", { name: /^balanceOf\b/ }).first(),
    ).toBeVisible({ timeout: 15_000 });
  });
});
