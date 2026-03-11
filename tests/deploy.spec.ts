import { test, expect } from '@playwright/test';

const BASE_URL = process.env.BASE_URL || 'https://stacks-skills.vercel.app';

test.describe('StacksSkills Deployment', () => {
  
  test('homepage loads correctly', async ({ page }) => {
    await page.goto(BASE_URL);
    
    // Check title
    await expect(page).toHaveTitle(/StacksSkills/);
    
    // Check main heading
    const heading = page.locator('h1');
    await expect(heading).toContainText('Stacks');
    
    // Check key elements exist
    await expect(page.locator('.marquee')).toBeVisible();
    await expect(page.locator('.skills-grid')).toBeVisible();
  });

  test('skills page loads', async ({ page }) => {
    await page.goto(`${BASE_URL}/SKILL.md`);
    // Markdown files are served as raw text
    const content = await page.content();
    expect(content).toContain('STACKSSKILLS');
  });

  test('docs pages load', async ({ page }) => {
    const docs = ['why', 'ship', 'clarity', 'security', 'tokens', 'nft', 'sbtc', 'stacking'];
    
    for (const doc of docs) {
      await page.goto(`${BASE_URL}/docs/${doc}.html`);
      await expect(page.locator('h1')).toBeVisible({ timeout: 10000 });
    }
  });

  test('no critical console errors', async ({ page }) => {
    const errors: string[] = [];
    page.on('console', msg => {
      if (msg.type() === 'error') {
        errors.push(msg.text());
      }
    });
    
    await page.goto(BASE_URL);
    await page.waitForLoadState('networkidle');
    
    // Filter out non-critical errors
    const criticalErrors = errors.filter(e => 
      !e.includes('favicon') && 
      !e.includes('Font')
    );
    
    expect(criticalErrors).toHaveLength(0);
  });

  test('navigation works correctly', async ({ page }) => {
    await page.goto(BASE_URL);
    
    // Click on a skill card
    await page.click('a[href="skills/why/SKILL.md"]');
    
    // Should navigate to skill page
    await expect(page).toHaveURL(/skills\/why\/SKILL\.md/);
  });
});
