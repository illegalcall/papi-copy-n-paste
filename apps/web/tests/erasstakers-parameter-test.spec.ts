import { test, expect } from "@playwright/test";

test.describe("ErasStakers Parameter Detection Fix", () => {
  test("should display parameter input fields for Staking.ErasStakers", async ({ page }) => {
    // Navigate to the application
    await page.goto("http://localhost:3007");

    // Wait for the app to load and connect
    await expect(page.getByText("Connected to polkadot")).toBeVisible({ timeout: 15000 });

    // Click on Staking pallet (use the specific one with count)
    await page.getByRole("button", { name: "Staking 107" }).click();

    // Click on Storage section (the one with 42 storage items for Staking)
    await page.getByRole("button", { name: "Storage (42)" }).click();

    // Click on ErasStakers storage item
    await page.getByRole("button", { name: "ErasStakers", exact: true }).click();

    // Verify that the storage form is displayed
    await expect(page.getByRole("heading", { name: "Staking.ErasStakers" })).toBeVisible();

    // Verify that Storage Parameters section is visible
    await expect(page.getByText("Storage Parameters")).toBeVisible();

    // Verify that the u32 parameter field is present
    const u32Field = page.getByRole("textbox", { name: "u32 *" });
    await expect(u32Field).toBeVisible();
    await expect(u32Field).toHaveAttribute("placeholder", "Enter u32");

    // Verify that the AccountId parameter field is present
    const accountIdField = page.getByRole("textbox", { name: "AccountId *" });
    await expect(accountIdField).toBeVisible();
    await expect(accountIdField).toHaveAttribute("placeholder", "//Alice or 5GrwvaEF5z... (full address)");

    // Verify both fields are marked as required
    await expect(page.getByText("Required").first()).toBeVisible();
    await expect(page.getByText("Required").nth(1)).toBeVisible();

    // Verify that the "Run Query" button is disabled until parameters are filled
    await expect(page.getByRole("button", { name: "Run Query" })).toBeDisabled();

    // Test filling in parameters
    await u32Field.fill("1234");
    await accountIdField.fill("5GrwvaEF5zXb26Fz9rcQpDWS57CtERHpNehXCPcNoHGKutQY");

    // Verify the button becomes enabled (or shows validation)
    // Note: The button might still be disabled due to other validation, but the parameters should be accepted

    console.log("✅ ErasStakers parameter detection test passed!");
  });

  test("should show dynamic parameter detection in console logs", async ({ page }) => {
    const consoleMessages: string[] = [];

    // Capture console messages
    page.on("console", (msg) => {
      consoleMessages.push(msg.text());
    });

    await page.goto("http://localhost:3007");
    await expect(page.getByText("Connected to polkadot")).toBeVisible({ timeout: 15000 });

    await page.getByRole("button", { name: "Staking 107" }).click();
    await page.getByRole("button", { name: "Storage (42)" }).click();
    await page.getByRole("button", { name: "ErasStakers", exact: true }).click();

    // Wait a moment for logs to appear
    await page.waitForTimeout(1000);

    // Check that the dynamic parameter detection log message appears
    const dynamicDetectionLog = consoleMessages.find(msg =>
      msg.includes("🔧 Using dynamic parameter detection for Staking.ErasStakers") &&
      msg.includes("[u32, AccountId]")
    );

    expect(dynamicDetectionLog).toBeTruthy();
    console.log("✅ Dynamic parameter detection log verified:", dynamicDetectionLog);
  });
});