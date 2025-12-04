import { test, expect } from '@playwright/test';

/**
 * DEVIN-8: PBI-DP-003 Androidカテゴリページ閲覧
 * 
 * このテストファイルはAndroidカテゴリページの表示と機能をテストします。
 * 実装参照: app/smartphones/[brand]/page.tsx, components/smartphones/BrandPageClient.tsx
 */

test.describe('DEVIN-8: Androidカテゴリページ閲覧', () => {
  
  test.beforeEach(async ({ page }) => {
    await page.goto('/smartphones/android');
  });

  test('8-1: Androidカテゴリページへの遷移確認', async ({ page }) => {
    await expect(page).toHaveURL('/smartphones/android');

    const pageTitle = page.locator('h1', { hasText: 'Android' });
    await expect(pageTitle).toBeVisible();

    const description = page.locator('text=さまざまなメーカーから選べるAndroidスマートフォン');
    await expect(description).toBeVisible();

    const main = page.locator('main');
    await expect(main).toHaveClass(/from-green-100/);
  });

  test('8-2: Androidキャンペーンバナーの表示確認', async ({ page }) => {
    const campaignBanner = page.locator('text=Android特別キャンペーン実施中！');
    await expect(campaignBanner).toBeVisible();

    const campaignDescription = page.locator('text=対象機種が最大58,201円引き');
    await expect(campaignDescription).toBeVisible();
  });

  test('8-3: Android製品グリッドの表示確認', async ({ page }) => {
    const productCount = page.locator('text=/件の製品が見つかりました/');
    await expect(productCount).toBeVisible();

    const productCards = page.locator('.bg-white.rounded-lg.shadow-md').filter({ has: page.locator('text=/Galaxy|Pixel|Xperia|AQUOS/') });
    const count = await productCards.count();
    expect(count).toBe(5);

    const firstCard = productCards.first();
    
    await expect(firstCard.locator('h3')).toBeVisible();
    
    const priceInfo = firstCard.locator('text=/円/');
    await expect(priceInfo).toBeVisible();
    
    const storageOptions = firstCard.locator('text=/GB/');
    await expect(storageOptions.first()).toBeVisible();
    
    const colorOptions = firstCard.locator('button[aria-label*="カラー"]');
    await expect(colorOptions.first()).toBeVisible();
  });

  test('8-4: 製品並び替え機能の確認', async ({ page }) => {
    const sortSelect = page.locator('select#sort');
    await expect(sortSelect).toBeVisible();

    await expect(sortSelect).toHaveValue('name');

    await sortSelect.selectOption('price');
    await page.waitForTimeout(500);

    await expect(sortSelect).toHaveValue('price');

    await sortSelect.selectOption('name');
    await page.waitForTimeout(500);

    await expect(sortSelect).toHaveValue('name');
  });

  test('8-5: ドコモオンラインショップへのリンク確認', async ({ page }) => {
    const purchaseButtons = page.locator('a', { hasText: 'ドコモオンラインショップで購入' });
    await expect(purchaseButtons.first()).toBeVisible();

    const firstButton = purchaseButtons.first();
    const href = await firstButton.getAttribute('href');
    expect(href).toContain('onlineshop.smt.docomo.ne.jp');

    const target = await firstButton.getAttribute('target');
    expect(target).toBe('_blank');

    const rel = await firstButton.getAttribute('rel');
    expect(rel).toContain('noopener');
    expect(rel).toContain('noreferrer');
  });

  test('8-6: Androidページのレスポンシブ対応確認', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 720 });
    await page.goto('/smartphones/android');

    const grid = page.locator('.grid').filter({ has: page.locator('text=/Galaxy|Pixel|Xperia|AQUOS/') });
    await expect(grid.first()).toBeVisible();

    await page.setViewportSize({ width: 768, height: 1024 });
    await page.goto('/smartphones/android');
    await expect(grid.first()).toBeVisible();

    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/smartphones/android');
    await expect(grid.first()).toBeVisible();

    const productCards = page.locator('.bg-white.rounded-lg.shadow-md').filter({ has: page.locator('text=/Galaxy|Pixel|Xperia|AQUOS/') });
    const count = await productCards.count();
    expect(count).toBe(5);
  });

  test('8-7: 製品カードの詳細情報表示確認', async ({ page }) => {
    const firstCard = page.locator('.bg-white.rounded-lg.shadow-md').filter({ has: page.locator('text=/Galaxy|Pixel|Xperia|AQUOS/') }).first();
    await expect(firstCard).toBeVisible();

    const productImage = firstCard.locator('img');
    await expect(productImage).toBeVisible();

    const productName = firstCard.locator('h3');
    await expect(productName).toBeVisible();

    const regularPrice = firstCard.locator('text=/円/').first();
    await expect(regularPrice).toBeVisible();

    const storageButtons = firstCard.locator('button').filter({ hasText: /GB/ });
    const storageCount = await storageButtons.count();
    expect(storageCount).toBeGreaterThan(0);

    const colorButtons = firstCard.locator('button[aria-label*="カラー"]');
    const colorCount = await colorButtons.count();
    expect(colorCount).toBeGreaterThan(0);

    const features = firstCard.locator('ul li');
    const featureCount = await features.count();
    expect(featureCount).toBeGreaterThan(0);

    const purchaseButton = firstCard.locator('a', { hasText: 'ドコモオンラインショップで購入' });
    await expect(purchaseButton).toBeVisible();
  });
});
