import { test, expect } from "@playwright/test";

test.describe("Provider-Specific Functionality", () => {
  test.setTimeout(60000);

  test.beforeEach(async ({ page }) => {
    await page.goto("/");
    await page.waitForLoadState("domcontentloaded");
    await page.waitForTimeout(3000);
  });

  test("should test Smoldot Light Client provider", async ({ page }) => {
    // The provider combobox is the second combobox (first is network)
    const providerCombobox = page.locator('[role="combobox"]').nth(1);

    if (await providerCombobox.isVisible()) {
      await providerCombobox.click();
      await page.waitForTimeout(500);

      // Look for Smoldot/Light Client provider option
      const smoldotOption = page.locator('[role="option"]').filter({ hasText: /Smoldot|Light/i });

      if (await smoldotOption.isVisible()) {
        await smoldotOption.click();

        // Wait for connection
        await page.waitForTimeout(8000);

        // Check connection status
        const connectionStatus = page.locator(".bg-green-500, .bg-yellow-500");
        await expect(connectionStatus.first()).toBeVisible();
      }
    }
  });

  test("should test RPC provider connections", async ({ page }) => {
    const providerCombobox = page.locator('[role="combobox"]').nth(1);

    if (await providerCombobox.isVisible()) {
      await providerCombobox.click();
      await page.waitForTimeout(500);

      // Look for an RPC provider option (not Smoldot/Chopsticks)
      const rpcOption = page.locator('[role="option"]').filter({ hasText: /Allnodes|Dwellir|OnFinality|RPC/i });

      if (await rpcOption.first().isVisible()) {
        await rpcOption.first().click();

        // Wait for RPC connection
        await page.waitForTimeout(5000);

        // Check connection status
        const connectionStatus = page.locator(".bg-green-500, .bg-yellow-500");
        await expect(connectionStatus.first()).toBeVisible();
      }
    }
  });

  test("should test Chopsticks provider", async ({ page }) => {
    const providerCombobox = page.locator('[role="combobox"]').nth(1);

    if (await providerCombobox.isVisible()) {
      await providerCombobox.click();
      await page.waitForTimeout(500);

      // Look for Chopsticks provider
      const chopsticksOption = page.locator('[role="option"]').filter({ hasText: /Chopsticks/i });

      if (await chopsticksOption.isVisible()) {
        await chopsticksOption.click();

        // Wait for connection attempt (will likely fail without running Chopsticks)
        await page.waitForTimeout(5000);

        // Should show some status (connected, error, etc.)
        const connectionStatus = page.locator(".bg-green-500, .bg-yellow-500, .bg-red-500");
        await expect(connectionStatus.first()).toBeVisible();
      }
    }
  });

  test("should handle provider connection errors gracefully", async ({
    page,
  }) => {
    const providerCombobox = page.locator('[role="combobox"]').nth(1);

    if (await providerCombobox.isVisible()) {
      await providerCombobox.click();
      await page.waitForTimeout(500);

      // Try Chopsticks (likely to fail if not running)
      const chopsticksOption = page.locator('[role="option"]').filter({ hasText: /Chopsticks/i });

      if (await chopsticksOption.isVisible()) {
        await chopsticksOption.click();

        // Wait for connection attempt
        await page.waitForTimeout(8000);

        // Application should remain functional regardless of connection status
        const connectionStatus = page.locator(".bg-green-500, .bg-yellow-500, .bg-red-500");
        await expect(connectionStatus.first()).toBeVisible();

        // UI should not be broken
        await expect(page.locator("body")).toBeVisible();
        await expect(page.locator('[role="combobox"]').first()).toBeVisible();
      }
    }
  });

  test("should switch between providers and maintain functionality", async ({
    page,
  }) => {
    const providerCombobox = page.locator('[role="combobox"]').nth(1);

    if (await providerCombobox.isVisible()) {
      // Get initial provider options
      await providerCombobox.click();
      await page.waitForTimeout(500);

      const options = page.locator('[role="option"]');
      const optionCount = await options.count();

      if (optionCount >= 2) {
        // Select second option
        await options.nth(1).click();
        await page.waitForTimeout(5000);

        // Verify connection status
        let connectionStatus = page.locator(".bg-green-500, .bg-yellow-500, .bg-red-500");
        await expect(connectionStatus.first()).toBeVisible();

        // Switch back to first option
        await providerCombobox.click();
        await page.waitForTimeout(500);
        await page.locator('[role="option"]').first().click();
        await page.waitForTimeout(5000);

        // Should still show connection status
        connectionStatus = page.locator(".bg-green-500, .bg-yellow-500, .bg-red-500");
        await expect(connectionStatus.first()).toBeVisible();
      }
    }
  });

  test("should show provider-specific information", async ({ page }) => {
    const providerCombobox = page.locator('[role="combobox"]').nth(1);

    if (await providerCombobox.isVisible()) {
      await providerCombobox.click();
      await page.waitForTimeout(500);

      // Should show provider options
      const providerOptions = page.locator('[role="option"]');
      const providerCount = await providerOptions.count();

      // Should have at least one provider
      expect(providerCount).toBeGreaterThan(0);

      // Each provider option should have text content (name)
      for (let i = 0; i < Math.min(providerCount, 3); i++) {
        const option = providerOptions.nth(i);
        const text = await option.textContent();
        expect(text).toBeTruthy();
        expect(text!.length).toBeGreaterThan(0);
      }

      // Close dropdown
      await page.keyboard.press("Escape");
    }
  });
});
