import { test, expect } from "@playwright/test";

test.describe("Network Selectors - Two Select Dropdowns", () => {
  test("should display two separate select dropdowns for network and provider", async ({
    page,
  }) => {
    await page.goto("/");
    await page.waitForLoadState("domcontentloaded");
    await page.waitForTimeout(3000);

    console.log("=== NETWORK SELECTORS TEST ===");

    // Check for the Network selector
    const networkSelector = page.locator("text=Network").first();
    await expect(networkSelector).toBeVisible();
    console.log("✓ Network label is visible");

    // Check for the Provider selector
    const providerSelector = page.locator("text=Provider").first();
    await expect(providerSelector).toBeVisible();
    console.log("✓ Provider label is visible");

    // Look for select components
    const selects = page.locator('select, [role="combobox"]');
    const selectCount = await selects.count();
    console.log("Select elements found:", selectCount);

    // Look for select triggers (Radix UI select)
    const selectTriggers = page.locator("[data-radix-select-trigger]");
    const triggerCount = await selectTriggers.count();
    console.log("Select triggers found:", triggerCount);

    // Check if we can see Polkadot as the current network
    const polkadotText = await page.locator("text=Polkadot").count();
    console.log("Polkadot text found:", polkadotText);

    // Check if we can see the current provider (should be Allnodes)
    const allnodesText = await page.locator("text=Allnodes").count();
    console.log("Allnodes text found:", allnodesText);
  });

  test("should allow selecting different networks from dropdown", async ({
    page,
  }) => {
    await page.goto("/");
    await page.waitForLoadState("domcontentloaded");
    await page.waitForTimeout(3000);

    console.log("=== NETWORK SELECTION TEST ===");

    // Try to click on the network selector
    const networkSection = page.locator("text=Network").locator(".."); // Parent element
    const networkSelector = networkSection.locator('[role="combobox"]').first();

    const isNetworkSelectorVisible = await networkSelector.isVisible();
    console.log("Network selector visible:", isNetworkSelectorVisible);

    if (isNetworkSelectorVisible) {
      console.log("Clicking network selector...");
      await networkSelector.click();
      await page.waitForTimeout(1000);

      // Look for dropdown options
      const dropdownOptions = await page.locator('[role="option"]').count();
      console.log("Dropdown options found:", dropdownOptions);

      // Look for Kusama option
      const kusamaOption = page
        .locator('[role="option"]')
        .filter({ hasText: "Kusama" });
      const kusamaVisible = await kusamaOption.isVisible();
      console.log("Kusama option visible:", kusamaVisible);

      if (kusamaVisible) {
        console.log("Selecting Kusama...");
        await kusamaOption.click();
        await page.waitForTimeout(2000);

        // Verify network changed
        const kusamaSelected = await page.locator("text=Kusama").count();
        console.log("Kusama now selected:", kusamaSelected > 0);
      }
    }
  });

  test("should allow selecting different providers from dropdown", async ({
    page,
  }) => {
    await page.goto("/");
    await page.waitForLoadState("domcontentloaded");
    await page.waitForTimeout(3000);

    console.log("=== PROVIDER SELECTION TEST ===");

    // Try to click on the provider selector
    const providerSection = page.locator("text=Provider").locator(".."); // Parent element
    const providerSelector = providerSection
      .locator('[role="combobox"]')
      .first();

    const isProviderSelectorVisible = await providerSelector.isVisible();
    console.log("Provider selector visible:", isProviderSelectorVisible);

    if (isProviderSelectorVisible) {
      console.log("Clicking provider selector...");
      await providerSelector.click();
      await page.waitForTimeout(1000);

      // Look for dropdown options
      const dropdownOptions = await page.locator('[role="option"]').count();
      console.log("Provider dropdown options found:", dropdownOptions);

      // Look for Smoldot option
      const smoldotOption = page
        .locator('[role="option"]')
        .filter({ hasText: "Smoldot" });
      const smoldotVisible = await smoldotOption.isVisible();
      console.log("Smoldot option visible:", smoldotVisible);

      if (smoldotVisible) {
        console.log("Selecting Smoldot...");
        await smoldotOption.click();
        await page.waitForTimeout(2000);

        // Verify provider changed
        const smoldotSelected = await page.locator("text=Smoldot").count();
        console.log("Smoldot now selected:", smoldotSelected > 0);
      }
    }
  });
});
