import { test, expect } from "@playwright/test";

test.describe("ErasStakers Parameter Detection Fix", () => {
  test.setTimeout(60000);

  test("should display parameter input fields for Staking.ErasStakers", async ({ page }) => {
    // Navigate to the application
    await page.goto("/");

    // Wait for pallets to load (don't depend on chain connection status text)
    const stakingButton = page.getByRole("button", { name: /^Staking \d+$/ });
    await expect(stakingButton).toBeVisible({ timeout: 30000 });

    // Click on Staking pallet (dynamic count)
    await stakingButton.click();

    // Click on Storage section (dynamic count)
    const storageButton = page.getByRole("button", { name: /^Storage \(\d+\)$/ });
    await expect(storageButton).toBeVisible({ timeout: 5000 });
    await storageButton.click();

    // Click on ErasStakers storage item
    await page.getByRole("button", { name: "ErasStakers", exact: true }).click();

    // Verify that the storage form is displayed
    await expect(page.getByRole("heading", { name: "Staking.ErasStakers" })).toBeVisible();

    // Verify that Storage Parameters section is visible
    await expect(page.getByText("Storage Parameters")).toBeVisible();

    // Verify that parameter fields are present (at least one input)
    const paramInputs = page.locator('input');
    const inputCount = await paramInputs.count();
    // Filter to only visible inputs (exclude search input)
    const visibleInputs = page.locator('.space-y-4 input, [placeholder*="Enter"], [placeholder*="Alice"]');
    const visibleCount = await visibleInputs.count();
    expect(visibleCount).toBeGreaterThanOrEqual(2);

    // Test filling in parameters
    await visibleInputs.first().fill("1234");
    await visibleInputs.nth(1).fill("5GrwvaEF5zXb26Fz9rcQpDWS57CtERHpNehXCPcNoHGKutQY");

    console.log("✅ ErasStakers parameter detection test passed!");
  });

  test("should detect parameters dynamically for ErasStakers", async ({ page }) => {
    await page.goto("/");

    // Wait for pallets to load
    const stakingButton = page.getByRole("button", { name: /^Staking \d+$/ });
    await expect(stakingButton).toBeVisible({ timeout: 30000 });

    await stakingButton.click();

    const storageButton = page.getByRole("button", { name: /^Storage \(\d+\)$/ });
    await expect(storageButton).toBeVisible({ timeout: 5000 });
    await storageButton.click();

    await page.getByRole("button", { name: "ErasStakers", exact: true }).click();

    // Wait for the form to render with detected parameters
    await page.waitForTimeout(1000);

    // Verify that parameter inputs were dynamically generated
    // ErasStakers requires a u32 (era index) and AccountId
    const paramInputs = page.locator('[placeholder*="Enter"], [placeholder*="Alice"], [placeholder*="address"]');
    const inputCount = await paramInputs.count();
    expect(inputCount).toBeGreaterThanOrEqual(2);

    // Verify the heading shows correct storage item
    await expect(page.getByRole("heading", { name: "Staking.ErasStakers" })).toBeVisible();

    console.log("✅ Dynamic parameter detection verified via UI - found", inputCount, "parameter inputs");
  });
});
