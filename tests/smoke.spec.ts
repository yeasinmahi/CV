import { expect, test } from '@playwright/test';

test.describe('portfolio smoke tests', () => {
  test('main sections and nav anchors work', async ({ page }) => {
    await page.goto('/');

    await expect(page.getByRole('heading', { name: 'Md. Yeasin Arafat' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'About Me' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Key Projects' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Work Experience' })).toBeVisible();

    await page.locator('nav a[href="#projects"]').first().click();
    await expect(page).toHaveURL(/#projects$/);
    await expect(page.locator('section#projects')).toBeVisible();
  });

  test('download and generate actions are wired', async ({ page }) => {
    const dialogs: string[] = [];
    page.on('dialog', async (dialog) => {
      dialogs.push(dialog.message());
      await dialog.dismiss();
    });

    await page.goto('/');

    const downloadPromise = page.waitForEvent('download');
    await page.getByRole('button', { name: 'Download PDF' }).click();
    const download = await downloadPromise;
    expect(download.suggestedFilename()).toContain('Yeasin_Arafat_CV');

    const generateButton = page.getByRole('button', { name: /Generate (ATS )?PDF/ });
    await expect(generateButton).toBeEnabled();
    await generateButton.click();

    await expect(page.getByRole('button', { name: 'Generating...' })).toBeVisible();
    await expect(page.getByRole('button', { name: /Generate (ATS )?PDF/ })).toBeVisible({ timeout: 120_000 });
    expect(dialogs).toHaveLength(0);
  });
});
