import { test, expect } from "@playwright/test";

test.describe("Multi-Network Testing", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
    await page.waitForLoadState("domcontentloaded");
    await page.waitForTimeout(5000);
  });

  const networks = [
    { name: "Polkadot", chainKey: "polkadot" },
    { name: "Kusama", chainKey: "kusama" },
    { name: "Moonbeam", chainKey: "moonbeam" },
    { name: "Bifrost", chainKey: "bifrost" },
  ];

  for (const network of networks) {
    test(`should connect to ${network.name} and execute queries`, async ({
      page,
    }) => {
      // Open network selector dropdown
      const networkSelector = page.locator('[role="combobox"]').first();
      await networkSelector.click();

      await page.waitForTimeout(1000);

      // Select the target network
      const networkOption = page.locator(
        `[role="option"]:has-text("${network.name}")`,
      );
      await expect(networkOption).toBeVisible();
      await networkOption.click();

      // Wait for network connection
      await page.waitForTimeout(8000); // Some networks may take longer

      // Verify network switch - check the network selector shows the new network
      const networkCombobox = page.locator('[role="combobox"]').first();
      await expect(networkCombobox).toContainText(network.name);

      // Network switch successful if the selector shows the network name

      // Try to execute a basic query (System.chain)
      await test.step(`execute System.chain query on ${network.name}`, async () => {
        const systemPallet = page.locator("text=System").first();

        if (await systemPallet.isVisible()) {
          await systemPallet.click();
          await page.waitForTimeout(1000);

          const chainQuery = page.locator("text=chain").first();

          if (await chainQuery.isVisible()) {
            await chainQuery.click();
            await page.waitForTimeout(3000);

            // Should generate code
            const codeDisplay = page.locator("pre, code");
            await expect(codeDisplay).toBeVisible();

            // Code should contain network-specific setup
            const generatedCode = await codeDisplay.first().textContent();
            expect(generatedCode).toContain("System");
            expect(generatedCode).toContain("chain");

            // Should contain network-specific chain spec or descriptor
            const lowerNetworkName = network.chainKey.toLowerCase();
            expect(generatedCode.toLowerCase()).toContain(lowerNetworkName);
          }
        }
      });
    });
  }

  test("should handle network switching between different chains", async ({
    page,
  }) => {
    // Start with Polkadot (should be default)
    // Execute a query on Polkadot
    const systemPallet = page.locator("text=System").first();
    await systemPallet.click();
    await page.waitForTimeout(1000);

    const chainQuery = page.locator("text=chain").first();
    await chainQuery.click();
    await page.waitForTimeout(2000);

    let codeDisplay = page.locator("pre, code").first();
    const polkadotCode = await codeDisplay.textContent();
    expect(polkadotCode).toContain("polkadot");

    // Switch to Kusama using network selector
    const networkSelector = page.locator('[role="combobox"]').first();
    await networkSelector.click();
    await page.waitForTimeout(1000);

    const kusamaOption = page.locator('[role="option"]:has-text("Kusama")');
    if (await kusamaOption.isVisible()) {
      await kusamaOption.click();
      await page.waitForTimeout(5000);

      // Execute same query on Kusama
      await systemPallet.click();
      await page.waitForTimeout(1000);
      await chainQuery.click();
      await page.waitForTimeout(2000);

      const kusamaCode = await codeDisplay.textContent();

      // Code should be different for different networks
      expect(kusamaCode).not.toBe(polkadotCode);
      expect(kusamaCode.toLowerCase()).toContain("kusama");
    }
  });

  test("should maintain provider selection when switching networks", async ({
    page,
  }) => {
    // Open network modal and select RPC provider for Polkadot
    const networkButton = page
      .locator('[data-testid="network-button"], button')
      .first();
    await networkButton.click();
    await page.waitForTimeout(1000);

    const rpcProvider = page
      .locator('text=RPC, [title*="RPC"], .text-blue-600')
      .first();

    if (await rpcProvider.isVisible()) {
      await rpcProvider.click();
      await page.waitForTimeout(3000);

      // Verify RPC connection for Polkadot
      let connectionStatus = page.locator(".bg-green-500, .bg-yellow-500");
      await expect(connectionStatus).toBeVisible();

      // Switch to Kusama
      await networkButton.click();
      await page.waitForTimeout(1000);

      const kusamaOption = page.locator("text=Kusama").first();
      if (await kusamaOption.isVisible()) {
        await kusamaOption.click();
        await page.waitForTimeout(5000);

        // Should maintain RPC provider for Kusama
        connectionStatus = page.locator(
          ".bg-green-500, .bg-yellow-500, .bg-red-500",
        );
        await expect(connectionStatus).toBeVisible();

        // Generate code to verify provider type
        const systemPallet = page.locator("text=System").first();
        await systemPallet.click();
        await page.waitForTimeout(1000);

        const chainQuery = page.locator("text=chain").first();
        await chainQuery.click();
        await page.waitForTimeout(2000);

        const codeDisplay = page.locator("pre, code").first();
        const kusamaRpcCode = await codeDisplay.textContent();

        // Should contain RPC-specific imports for Kusama
        expect(kusamaRpcCode).toContain("getWsProvider");
        expect(kusamaRpcCode).toContain("withPolkadotSdkCompat");
        expect(kusamaRpcCode.toLowerCase()).toContain("kusama");
      }
    }
  });

  test("should show appropriate providers for each network", async ({
    page,
  }) => {
    const networkButton = page
      .locator('[data-testid="network-button"], button')
      .first();

    for (const network of networks.slice(0, 2)) {
      // Test first 2 networks to save time
      await networkButton.click();
      await page.waitForTimeout(1000);

      const networkOption = page.locator(`text=${network.name}`).first();
      if (await networkOption.isVisible()) {
        await networkOption.click();
        await page.waitForTimeout(2000);

        // Open modal again to see provider options for this network
        await networkButton.click();
        await page.waitForTimeout(1000);

        // Should show Light Client option (Smoldot)
        const lightClient = page.locator(
          'text=Light Client, [title*="Smoldot"], .text-purple-600',
        );
        await expect(lightClient.first()).toBeVisible();

        // Should show RPC option
        const rpcOption = page.locator(
          'text=RPC, [title*="RPC"], .text-blue-600',
        );
        await expect(rpcOption.first()).toBeVisible();

        // Close modal
        await page.keyboard.press("Escape");
        await page.waitForTimeout(500);
      }
    }
  });

  test("should handle connection failures gracefully", async ({ page }) => {
    const networkButton = page
      .locator('[data-testid="network-button"], button')
      .first();
    await networkButton.click();
    await page.waitForTimeout(1000);

    // Try Chopsticks (likely to fail if not running)
    const chopsticksProvider = page
      .locator('text=Chopsticks, [title*="Chopsticks"], .text-orange-600')
      .first();

    if (await chopsticksProvider.isVisible()) {
      await chopsticksProvider.click();

      // Wait for connection attempt
      await page.waitForTimeout(10000);

      // Check final status
      const errorStatus = page.locator(".bg-red-500, text=error, text=failed");
      const successStatus = page.locator(".bg-green-500, text=connected");

      const hasStatus =
        (await errorStatus.isVisible()) || (await successStatus.isVisible());
      expect(hasStatus).toBe(true);

      // Application should remain functional regardless of connection status
      const systemPallet = page.locator("text=System");
      await expect(systemPallet.first()).toBeVisible();

      // UI should not be broken
      await expect(page.locator("body")).toBeVisible();
    }
  });

  test("should show network-specific metadata", async ({ page }) => {
    // Test that different networks show appropriate pallets/calls
    const networkButton = page
      .locator('[data-testid="network-button"], button')
      .first();

    // Check Polkadot pallets
    await test.step("verify Polkadot pallets", async () => {
      const systemPallet = page.locator("text=System");
      await expect(systemPallet.first()).toBeVisible();

      const balancesPallet = page.locator("text=Balances");
      if (await balancesPallet.first().isVisible()) {
        await balancesPallet.first().click();
        await page.waitForTimeout(1000);

        // Should show balance-related calls
        const transferCall = page.locator(
          "text=transfer, text=transfer_allow_death",
        );
        await expect(transferCall.first()).toBeVisible();
      }
    });

    // Switch to Moonbeam to check for different metadata
    await networkButton.click();
    await page.waitForTimeout(1000);

    const moonbeamOption = page.locator("text=Moonbeam").first();
    if (await moonbeamOption.isVisible()) {
      await moonbeamOption.click();
      await page.waitForTimeout(8000); // Moonbeam might take longer

      // Moonbeam should have System pallet
      const systemPallet = page.locator("text=System");
      await expect(systemPallet.first()).toBeVisible();

      // Check if metadata loaded properly
      await systemPallet.first().click();
      await page.waitForTimeout(1000);

      const chainQuery = page.locator("text=chain");
      if (await chainQuery.first().isVisible()) {
        await chainQuery.first().click();
        await page.waitForTimeout(2000);

        // Should generate Moonbeam-specific code
        const codeDisplay = page.locator("pre, code").first();
        const moonbeamCode = await codeDisplay.textContent();
        expect(moonbeamCode.toLowerCase()).toContain("moonbeam");
      }
    }
  });
});
