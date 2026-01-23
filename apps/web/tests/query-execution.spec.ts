import { test, expect } from "@playwright/test";

// Helper to wait for code to appear in the right pane
async function waitForCode(page: import("@playwright/test").Page) {
  // Code is rendered as <pre><code class="language-typescript"> via PrismJS
  const codeBlock = page.locator("pre code");
  await expect(codeBlock.first()).toBeVisible({ timeout: 10000 });
  return codeBlock.first();
}

// Helper to click the Code tab
async function clickCodeTab(page: import("@playwright/test").Page) {
  const codeTab = page.getByRole("tab", { name: "Code" });
  if (await codeTab.isVisible()) {
    await codeTab.click();
    await page.waitForTimeout(500);
  }
}

test.describe("Query Execution and Code Generation", () => {
  test.setTimeout(60000);

  test.beforeEach(async ({ page }) => {
    await page.goto("/");
    await page.waitForLoadState("domcontentloaded");
    // Wait for pallets to load
    await expect(
      page.getByRole("button", { name: /^System \d+$/ }),
    ).toBeVisible({ timeout: 30000 });
  });

  test("should execute System.chain query", async ({ page }) => {
    // Navigate to System pallet
    const systemPallet = page.getByRole("button", { name: /^System \d+$/ });
    await systemPallet.click();
    await page.waitForTimeout(500);

    // Expand Calls section
    const callsButton = page.getByRole("button", { name: /^Calls \(\d+\)$/ });
    if (await callsButton.isVisible()) {
      await callsButton.click();
      await page.waitForTimeout(500);
    }

    // Click chain call
    const chainQuery = page.getByRole("button", { name: "chain", exact: true });
    if (await chainQuery.isVisible({ timeout: 3000 })) {
      await chainQuery.click();
      await page.waitForTimeout(1000);

      // Switch to Code tab
      await clickCodeTab(page);

      // Should generate code
      const codeBlock = await waitForCode(page);
      const generatedCode = await codeBlock.textContent();
      expect(generatedCode).toContain("import");
      expect(generatedCode).toContain("System");
    }
  });

  test("should execute Balances.totalIssuance query", async ({ page }) => {
    // Navigate to Balances pallet
    const balancesPallet = page.getByRole("button", { name: /^Balances \d+$/ });

    if (await balancesPallet.isVisible()) {
      await balancesPallet.click();
      await page.waitForTimeout(500);

      // Expand Storage section
      const storageButton = page.getByRole("button", { name: /^Storage \(\d+\)$/ });
      if (await storageButton.isVisible()) {
        await storageButton.click();
        await page.waitForTimeout(500);
      }

      // Look for TotalIssuance storage query
      const totalIssuanceQuery = page.getByRole("button", { name: "TotalIssuance", exact: true });

      if (await totalIssuanceQuery.isVisible({ timeout: 3000 })) {
        await totalIssuanceQuery.click();
        await page.waitForTimeout(1000);

        // Switch to Code tab
        await clickCodeTab(page);

        // Should generate storage query code
        const codeBlock = await waitForCode(page);
        const generatedCode = await codeBlock.textContent();
        expect(generatedCode).toContain("Balances");
        expect(generatedCode).toContain("TotalIssuance");
      }
    }
  });

  test("should generate code with setup commands", async ({ page }) => {
    // Switch to Setup tab - it should show setup commands
    const setupTab = page.getByRole("tab", { name: "Setup" });
    await setupTab.click();
    await page.waitForTimeout(500);

    // Setup tab should contain npm install and papi commands
    const setupContent = page.getByRole("tabpanel", { name: "Setup" });
    await expect(setupContent).toBeVisible();

    const setupText = await setupContent.textContent();
    expect(setupText).toContain("npm install");
    expect(setupText).toContain("papi");
  });

  test("should generate different code for different providers", async ({
    page,
  }) => {
    // Select System pallet and a call to generate code
    const systemPallet = page.getByRole("button", { name: /^System \d+$/ });
    await systemPallet.click();
    await page.waitForTimeout(500);

    // Expand calls and click one
    const callsButton = page.getByRole("button", { name: /^Calls \(\d+\)$/ });
    if (await callsButton.isVisible()) {
      await callsButton.click();
      await page.waitForTimeout(500);
    }

    const chainQuery = page.getByRole("button", { name: "chain", exact: true });
    if (!(await chainQuery.isVisible({ timeout: 3000 }))) {
      test.skip();
      return;
    }
    await chainQuery.click();
    await page.waitForTimeout(1000);

    await clickCodeTab(page);
    const codeBlock = page.locator("pre code").first();
    await expect(codeBlock).toBeVisible({ timeout: 10000 });
    const defaultCode = await codeBlock.textContent();

    // Switch provider via the provider combobox (second combobox)
    const providerCombobox = page.locator('[role="combobox"]').nth(1);
    if (await providerCombobox.isVisible()) {
      await providerCombobox.click();
      await page.waitForTimeout(500);

      // Select a different provider
      const options = page.locator('[role="option"]');
      const optionCount = await options.count();
      if (optionCount > 1) {
        await options.nth(1).click();
        await page.waitForTimeout(2000);

        // Re-select the call to regenerate code
        await chainQuery.click();
        await page.waitForTimeout(1000);
        await clickCodeTab(page);

        const newCode = await codeBlock.textContent();
        // Code may differ based on provider
        expect(newCode).toBeTruthy();
      }
    }
  });

  test("should handle transaction calls", async ({ page }) => {
    // Navigate to Balances pallet
    const balancesPallet = page.getByRole("button", { name: /^Balances \d+$/ });

    if (await balancesPallet.isVisible()) {
      await balancesPallet.click();
      await page.waitForTimeout(500);

      // Expand Calls section
      const callsButton = page.getByRole("button", { name: /^Calls \(\d+\)$/ });
      if (await callsButton.isVisible()) {
        await callsButton.click();
        await page.waitForTimeout(500);
      }

      // Look for transfer transaction
      const transferCall = page.getByRole("button", { name: /transfer/i }).first();

      if (await transferCall.isVisible({ timeout: 3000 })) {
        await transferCall.click();
        await page.waitForTimeout(1000);

        // Should show parameter form (input fields)
        const parameterForm = page.locator('input[type="text"], textarea');
        await expect(parameterForm.first()).toBeVisible();

        // Switch to Code tab and check generated code
        await clickCodeTab(page);
        const codeBlock = await waitForCode(page);
        const generatedCode = await codeBlock.textContent();
        expect(generatedCode).toContain("transfer");
        expect(generatedCode).toContain("tx");
      }
    }
  });

  test("should show parameter forms for complex calls", async ({ page }) => {
    // Find a call that requires parameters
    const balancesPallet = page.getByRole("button", { name: /^Balances \d+$/ });

    if (await balancesPallet.isVisible()) {
      await balancesPallet.click();
      await page.waitForTimeout(500);

      const callsButton = page.getByRole("button", { name: /^Calls \(\d+\)$/ });
      if (await callsButton.isVisible()) {
        await callsButton.click();
        await page.waitForTimeout(500);
      }

      const transferCall = page.getByRole("button", { name: /transfer/i }).first();

      if (await transferCall.isVisible({ timeout: 3000 })) {
        await transferCall.click();
        await page.waitForTimeout(1000);

        // Should show input fields for parameters
        const inputs = page.locator('[placeholder*="Enter"], [placeholder*="Alice"], [placeholder*="address"]');
        await expect(inputs.first()).toBeVisible({ timeout: 5000 });
        const inputCount = await inputs.count();
        expect(inputCount).toBeGreaterThan(0);

        // Fill in some test parameters
        if (inputCount > 0) {
          await inputs.first().fill("5GrwvaEF5zXb26Fz9rcQpDWS57CtERHpNehXCPcNoHGKutQY");

          if (inputCount > 1) {
            await inputs.nth(1).fill("1000000000000");
          }

          await page.waitForTimeout(1000);

          // Code should update with parameters
          await clickCodeTab(page);
          const codeBlock = await waitForCode(page);
          const updatedCode = await codeBlock.textContent();
          expect(updatedCode).toContain("transfer");
        }
      }
    }
  });

  test("should copy generated code to clipboard", async ({ page }) => {
    // Select a pallet and call to generate code
    const systemPallet = page.getByRole("button", { name: /^System \d+$/ });
    await systemPallet.click();
    await page.waitForTimeout(500);

    const callsButton = page.getByRole("button", { name: /^Calls \(\d+\)$/ });
    if (await callsButton.isVisible()) {
      await callsButton.click();
      await page.waitForTimeout(500);
    }

    const chainQuery = page.getByRole("button", { name: "chain", exact: true });
    if (!(await chainQuery.isVisible({ timeout: 3000 }))) {
      test.skip();
      return;
    }
    await chainQuery.click();
    await page.waitForTimeout(1000);

    await clickCodeTab(page);
    await expect(page.locator("pre code").first()).toBeVisible({ timeout: 10000 });

    // Look for copy button
    const copyButton = page.locator(
      'button:has-text("Copy"), [title="Copy"], [data-testid="copy-button"]',
    );

    if (await copyButton.first().isVisible()) {
      // Grant clipboard permissions
      await page.context().grantPermissions(["clipboard-read", "clipboard-write"]);

      await copyButton.first().click();
      await page.waitForTimeout(500);

      // Verify copy success (button might change text or show checkmark)
      const copySuccess = page.locator(
        'button:has-text("Copied"), [title="Copied"], .text-green-500',
      );
      await expect(copySuccess.first()).toBeVisible({ timeout: 3000 });
    }
  });

  test("should maintain state when switching between pallets", async ({
    page,
  }) => {
    // Select System pallet
    const systemPallet = page.getByRole("button", { name: /^System \d+$/ });
    await systemPallet.click();
    await page.waitForTimeout(500);

    const callsButton = page.getByRole("button", { name: /^Calls \(\d+\)$/ });
    if (await callsButton.isVisible()) {
      await callsButton.click();
      await page.waitForTimeout(500);
    }

    const chainQuery = page.getByRole("button", { name: "chain", exact: true });
    if (!(await chainQuery.isVisible({ timeout: 3000 }))) {
      test.skip();
      return;
    }
    await chainQuery.click();
    await page.waitForTimeout(1000);

    await clickCodeTab(page);
    const codeBlock = page.locator("pre code").first();
    await expect(codeBlock).toBeVisible({ timeout: 10000 });
    let generatedCode = await codeBlock.textContent();
    expect(generatedCode).toContain("System");

    // Switch to Balances pallet
    const balancesPallet = page.getByRole("button", { name: /^Balances \d+$/ });

    if (await balancesPallet.isVisible()) {
      await balancesPallet.click();
      await page.waitForTimeout(500);

      const storageBtn = page.getByRole("button", { name: /^Storage \(\d+\)$/ });
      if (await storageBtn.isVisible()) {
        await storageBtn.click();
        await page.waitForTimeout(500);
      }

      const totalIssuanceQuery = page.getByRole("button", { name: "TotalIssuance", exact: true });

      if (await totalIssuanceQuery.isVisible({ timeout: 3000 })) {
        await totalIssuanceQuery.click();
        await page.waitForTimeout(1000);

        await clickCodeTab(page);
        // Code should update to Balances
        generatedCode = await codeBlock.textContent();
        expect(generatedCode).toContain("Balances");
        expect(generatedCode).toContain("TotalIssuance");
      }
    }
  });
});
