import { test, expect } from '@playwright/test';

/**
 * E2Eテスト: 製品カテゴリトップページ
 * PBI-DP-001: 製品カテゴリトップページ表示機能のテスト
 */

test.describe('製品カテゴリトップページ', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/smartphones');
  });

  test('ページが正しく表示される', async ({ page }) => {
    await expect(page).toHaveTitle(/製品カテゴリ/);
    await expect(page.locator('h1')).toContainText('製品カテゴリ');
  });

  test('4つのカテゴリカードが表示される', async ({ page }) => {
    const cards = page.locator('a[aria-label*="ページへ移動"]');
    await expect(cards).toHaveCount(4);
  });

  test('iPhoneカードが正しく表示される', async ({ page }) => {
    const iphoneCard = page.locator('a[href="/smartphones/iphone"]');
    await expect(iphoneCard).toBeVisible();
    await expect(iphoneCard.locator('h3')).toContainText('iPhone');
  });

  test('Androidカードが正しく表示される', async ({ page }) => {
    const androidCard = page.locator('a[href="/smartphones/android"]');
    await expect(androidCard).toBeVisible();
    await expect(androidCard.locator('h3')).toContainText('Android');
  });

  test('ドコモ認定リユース品カードが正しく表示される', async ({ page }) => {
    const docomoCard = page.locator('a[href="/smartphones/docomo-certified"]');
    await expect(docomoCard).toBeVisible();
    await expect(docomoCard.locator('h3')).toContainText('ドコモ認定リユース品');
    await expect(docomoCard).toContainText('30日以内無料交換可能');
  });

  test('アクセサリカードが正しく表示される', async ({ page }) => {
    const accessoryCard = page.locator('a[href="/accessories"]');
    await expect(accessoryCard).toBeVisible();
    await expect(accessoryCard.locator('h3')).toContainText('アクセサリ');
  });

  test('iPhoneカードをクリックするとiPhoneページに遷移する', async ({ page }) => {
    await page.click('a[href="/smartphones/iphone"]');
    await expect(page).toHaveURL('/smartphones/iphone');
    await expect(page.locator('h1')).toContainText('iPhone');
  });

  test('AndroidカードをクリックするとAndroidページに遷移する', async ({ page }) => {
    await page.click('a[href="/smartphones/android"]');
    await expect(page).toHaveURL('/smartphones/android');
    await expect(page.locator('h1')).toContainText('Android');
  });

  test('ドコモ認定リユース品カードをクリックするとドコモ認定リユース品ページに遷移する', async ({ page }) => {
    await page.click('a[href="/smartphones/docomo-certified"]');
    await expect(page).toHaveURL('/smartphones/docomo-certified');
    await expect(page.locator('h1')).toContainText('ドコモ認定リユース品');
  });

  test('アクセサリカードをクリックするとアクセサリページに遷移する', async ({ page }) => {
    await page.click('a[href="/accessories"]');
    await expect(page).toHaveURL('/accessories');
  });

  test('パステル波模様の背景が適用されている', async ({ page }) => {
    const main = page.locator('main');
    await expect(main).toHaveClass(/bg-gradient-to-br/);
    await expect(main).toHaveClass(/from-purple-100/);
    await expect(main).toHaveClass(/via-blue-50/);
    await expect(main).toHaveClass(/to-cyan-100/);
  });

  test('ヘッダーが表示される', async ({ page }) => {
    const header = page.locator('header');
    await expect(header).toBeVisible();
    await expect(header.locator('a[href="/"]')).toContainText('ahamo');
  });

  test('フッターが表示される', async ({ page }) => {
    const footer = page.locator('footer');
    await expect(footer).toBeVisible();
    await expect(footer).toContainText('© NTT DOCOMO, INC.');
  });

  test('フッターにソーシャルメディアアイコンが表示される', async ({ page }) => {
    const footer = page.locator('footer');
    const socialLinks = footer.locator('a[aria-label*="LINE"], a[aria-label*="Facebook"], a[aria-label*="Instagram"], a[aria-label*="TikTok"], a[aria-label*="YouTube"]');
    await expect(socialLinks).toHaveCount(5);
  });
});

test.describe('製品カテゴリトップページ - レスポンシブデザイン', () => {
  test('モバイル表示で1カラムのグリッドレイアウトになる', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/smartphones');
    
    const grid = page.locator('div.grid');
    await expect(grid).toHaveClass(/grid-cols-1/);
  });

  test('タブレット表示で2カラムのグリッドレイアウトになる', async ({ page }) => {
    await page.setViewportSize({ width: 768, height: 1024 });
    await page.goto('/smartphones');
    
    const grid = page.locator('div.grid');
    await expect(grid).toHaveClass(/md:grid-cols-2/);
  });

  test('デスクトップ表示で2カラムのグリッドレイアウトになる', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 720 });
    await page.goto('/smartphones');
    
    const grid = page.locator('div.grid');
    await expect(grid).toHaveClass(/lg:grid-cols-2/);
  });
});

test.describe('ブランドページ', () => {
  test('iPhoneブランドページが正しく表示される', async ({ page }) => {
    await page.goto('/smartphones/iphone');
    await expect(page.locator('h1')).toContainText('iPhone');
    await expect(page.locator('main')).toHaveClass(/from-gray-100/);
  });

  test('Androidブランドページが正しく表示される', async ({ page }) => {
    await page.goto('/smartphones/android');
    await expect(page.locator('h1')).toContainText('Android');
    await expect(page.locator('main')).toHaveClass(/from-green-100/);
  });

  test('ドコモ認定リユース品ブランドページが正しく表示される', async ({ page }) => {
    await page.goto('/smartphones/docomo-certified');
    await expect(page.locator('h1')).toContainText('ドコモ認定リユース品');
    await expect(page.locator('main')).toHaveClass(/from-emerald-100/);
    await expect(page.locator('p')).toContainText('30日以内無料交換可能');
  });

  test('存在しないブランドページは404エラーになる', async ({ page }) => {
    const response = await page.goto('/smartphones/invalid-brand');
    expect(response?.status()).toBe(404);
  });
});
