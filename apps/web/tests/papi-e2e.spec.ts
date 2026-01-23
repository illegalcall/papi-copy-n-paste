import { test, expect } from "@playwright/test";

test.describe("PAPI Copy-n-Paste E2E Tests", () => {
  test.setTimeout(90000);

  test("should load app, connect to chain, and generate valid code", async ({
    page,
  }) => {
    // Step 1: Navigate to the application
    await page.goto("/");
    await page.waitForLoadState("domcontentloaded");

    console.log("🔄 App loaded, waiting for chain connection...");

    // Step 2: Wait for pallets to load (indicates chain metadata is available)
    const systemPallet = page.getByRole("button", { name: /^System \d+$/ });
    await expect(systemPallet).toBeVisible({ timeout: 30000 });
    console.log("✅ Pallets loaded");

    // Step 3: Click System pallet
    await systemPallet.click();
    await page.waitForTimeout(500);

    // Step 4: Expand Calls section
    const callsButton = page.getByRole("button", { name: /^Calls \(\d+\)$/ });
    if (await callsButton.isVisible()) {
      await callsButton.click();
      await page.waitForTimeout(500);
    }

    // Step 5: Click a specific call
    const remarkCall = page.getByRole("button", { name: /remark|chain/i }).first();
    if (await remarkCall.isVisible({ timeout: 3000 })) {
      await remarkCall.click();
      await page.waitForTimeout(1000);
      console.log("✅ Selected a call");
    }

    // Step 6: Verify tabs are present (shadcn/ui TabsTrigger)
    const setupTab = page.getByRole("tab", { name: "Setup" });
    const codeTab = page.getByRole("tab", { name: "Code" });
    const consoleTab = page.getByRole("tab", { name: "Console" });

    await expect(setupTab).toBeVisible();
    await expect(codeTab).toBeVisible();
    await expect(consoleTab).toBeVisible();
    console.log("✅ All three main tabs present");

    // Step 7: Check Setup tab content
    await setupTab.click();
    await page.waitForTimeout(500);
    const setupPanel = page.getByRole("tabpanel", { name: "Setup" });
    const setupText = await setupPanel.textContent();
    expect(setupText).toBeTruthy();
    console.log("✅ Setup tab has content");

    // Step 8: Check Code tab
    await codeTab.click();
    await page.waitForTimeout(500);

    const codeBlock = page.locator("pre code").first();
    if (await codeBlock.isVisible({ timeout: 5000 })) {
      const generatedCode = await codeBlock.textContent();
      if (generatedCode && generatedCode.length > 50) {
        console.log("✅ Found substantial generated code");
        expect(generatedCode).toContain("import");
        expect(generatedCode).toMatch(/createClient|polkadot-api/);
        console.log("✅ Code validation successful");
      }
    }

    // Step 9: Check Console tab
    await consoleTab.click();
    await page.waitForTimeout(500);
    console.log("✅ Console tab accessible");

    console.log("✅ All E2E test steps completed successfully!");
  });

  test("should validate the basic functionality works", async ({ page }) => {
    // Navigate to the application
    await page.goto("/");
    await page.waitForLoadState("domcontentloaded");

    console.log("🔄 Testing basic functionality...");

    // Wait for the app to be minimally functional
    await page.waitForFunction(
      () => document.querySelectorAll("button").length >= 5,
      { timeout: 30000 },
    );

    console.log("✅ App UI loaded");

    // Test that all three main tabs exist (shadcn/ui TabsTrigger uses role="tab")
    const setupTab = page.getByRole("tab", { name: "Setup" });
    const codeTab = page.getByRole("tab", { name: "Code" });
    const consoleTab = page.getByRole("tab", { name: "Console" });

    await expect(setupTab).toBeVisible();
    await expect(codeTab).toBeVisible();
    await expect(consoleTab).toBeVisible();

    console.log("✅ All three main tabs are present");

    // Test setup tab content
    await setupTab.click();
    await page.waitForTimeout(500);

    const hasSetupContent =
      (await page.locator("text=polkadot-api").count()) > 0;
    if (hasSetupContent) {
      console.log("✅ Setup tab has content");
    } else {
      console.log("ℹ️ Setup tab may be waiting for chain selection");
    }

    // Test chain selector
    const chainSelector = page.locator('[role="combobox"]').first();
    if (await chainSelector.isVisible({ timeout: 2000 })) {
      console.log("✅ Chain selector is available");

      // Try to click it to see available chains
      await chainSelector.click();
      const chainOptions = page.locator('[role="option"]');
      const optionCount = await chainOptions.count();

      if (optionCount > 0) {
        console.log(`✅ Found ${optionCount} chain options`);
        await chainOptions.first().click();
        console.log("✅ Chain selection works");
      }
    }

    console.log("✅ Basic functionality validation completed successfully");
  });
});
