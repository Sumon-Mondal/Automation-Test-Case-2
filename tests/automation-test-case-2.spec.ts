import { expect, type Locator, type Page, test } from '@playwright/test';

const credentials = {
  username: process.env.DEMO_APP_USERNAME ?? 'admin',
  password: process.env.DEMO_APP_PASSWORD ?? 'password123',
};

const demoStepDelayMs = Number(process.env.DEMO_STEP_DELAY_MS ?? 700);

async function pauseForDemo(page: Page) {
  if (demoStepDelayMs > 0) {
    await page.waitForTimeout(demoStepDelayMs);
  }
}

async function loginToDemoApp(page: Page) {
  await page.goto('/');
  await pauseForDemo(page);
  await page.getByLabel('Username').fill(credentials.username);
  await pauseForDemo(page);
  await page.getByLabel('Password').fill(credentials.password);
  await pauseForDemo(page);
  await page.getByRole('button', { name: 'Sign in' }).click();
  await pauseForDemo(page);
}

async function navigateToProject(page: Page, projectName: string) {
  await page.getByRole('button', { name: new RegExp(projectName) }).click();
  await expect(page.getByRole('banner').getByRole('heading', { name: projectName })).toBeVisible();
  await pauseForDemo(page);
}

function getColumn(page: Page, columnName: string): Locator {
  return page.locator('.w-80').filter({
    has: page.getByRole('heading', { name: new RegExp(`^${columnName}\\s*\\(\\d+\\)$`) }),
  });
}

function getTaskInColumn(page: Page, columnName: string, taskName: string): Locator {
  return getColumn(page, columnName).locator('.bg-white').filter({
    has: page.getByRole('heading', { name: taskName }),
  });
}

test.describe('Automation Test Case 2', () => {
  test('verifies Fix navigation bug is To Do with Bug tag', async ({ page }) => {
    await test.step('Login to Demo App', async () => {
      await loginToDemoApp(page);
    });

    await test.step('Navigate to Web Application', async () => {
      await navigateToProject(page, 'Web Application');
    });

    const task = getTaskInColumn(page, 'To Do', 'Fix navigation bug');

    await test.step('Verify Fix navigation bug is in the To Do column', async () => {
      await expect(task).toBeVisible();
      await pauseForDemo(page);
    });

    await test.step('Confirm tag is Bug', async () => {
      await expect(task.getByText('Bug', { exact: true })).toBeVisible();
      await pauseForDemo(page);
    });
  });
});
