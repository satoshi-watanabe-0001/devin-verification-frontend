import { test, expect } from '@playwright/test';

/**
 * DEVIN-1: PBI-CM-001 ヘッダーナビゲーション
 * 
 * このテストファイルはヘッダーナビゲーションの機能をテストします。
 * 実装参照: components/layout/header.tsx
 */

test.describe('DEVIN-1: ヘッダーナビゲーション', () => {
  
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.evaluate(() => localStorage.clear());
  });

  test('1-1: ヘッダーの基本表示確認', async ({ page }) => {
    await page.goto('/');

    const header = page.locator('header');
    await expect(header).toBeVisible();

    const logo = page.locator('a[href="/"]').filter({ hasText: 'ahamo' });
    await expect(logo).toBeVisible();

    const navItems = [
      'ホーム',
      '料金プラン',
      '製品',
      'サービス',
      '申し込みの流れ',
      'サポート'
    ];

    for (const item of navItems) {
      const navLink = page.locator('nav a', { hasText: item });
      await expect(navLink).toBeVisible();
    }

    const searchIcon = page.locator('button[aria-label*="検索"]');
    await expect(searchIcon).toBeVisible();

    const loginButton = page.locator('a[href="/login"]', { hasText: 'ログイン' });
    await expect(loginButton).toBeVisible();
  });

  test('1-2: アクティブページのハイライト表示確認', async ({ page }) => {
    await page.goto('/');
    const homeLink = page.locator('nav a[href="/"]');
    await expect(homeLink).toHaveClass(/bg-blue-100/);
    await expect(homeLink).toHaveClass(/text-blue-700/);
    await expect(homeLink).toHaveClass(/border-b-2/);

    await page.goto('/plan');
    const planLink = page.locator('nav a[href="/plan"]');
    await expect(planLink).toHaveClass(/bg-blue-100/);
    await expect(planLink).toHaveClass(/text-blue-700/);

    await page.goto('/smartphones');
    const smartphonesLink = page.locator('nav a[href="/smartphones"]');
    await expect(smartphonesLink).toHaveClass(/bg-blue-100/);
    await expect(smartphonesLink).toHaveClass(/text-blue-700/);
  });

  test('1-3: 認証状態に応じたボタン切り替え確認', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('a[href="/login"]', { hasText: 'ログイン' })).toBeVisible();
    await expect(page.locator('a[href="/mypage"]')).not.toBeVisible();

    await page.evaluate(() => {
      localStorage.setItem('user', JSON.stringify({
        id: '1',
        name: 'テストユーザー',
        email: 'test@example.com'
      }));
    });
    await page.reload();

    await expect(page.locator('a[href="/mypage"]', { hasText: 'マイページ' })).toBeVisible();
    await expect(page.locator('button', { hasText: 'ログアウト' })).toBeVisible();
    await expect(page.locator('a[href="/login"]', { hasText: 'ログイン' })).not.toBeVisible();

    await page.locator('button', { hasText: 'ログアウト' }).click();

    await expect(page.locator('a[href="/login"]', { hasText: 'ログイン' })).toBeVisible();
    await expect(page.locator('a[href="/mypage"]')).not.toBeVisible();
  });

  test('1-4: レスポンシブ対応確認（モバイル）', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');

    const desktopNav = page.locator('nav.hidden.md\\:flex');
    await expect(desktopNav).not.toBeVisible();

    const hamburgerButton = page.locator('button[aria-label*="メニュー"]');
    await expect(hamburgerButton).toBeVisible();

    await hamburgerButton.click();

    const mobileMenu = page.locator('nav[aria-label*="モバイル"]');
    await expect(mobileMenu).toBeVisible();

    const navItems = [
      'ホーム',
      '料金プラン',
      '製品',
      'サービス',
      '申し込みの流れ',
      'サポート'
    ];

    for (const item of navItems) {
      const navLink = mobileMenu.locator('a', { hasText: item });
      await expect(navLink).toBeVisible();
    }

    await mobileMenu.locator('a[href="/plan"]').click();

    await expect(mobileMenu).not.toBeVisible();

    await expect(page).toHaveURL('/plan');
  });

  test('1-5: スクロール時のヘッダー固定確認', async ({ page }) => {
    await page.goto('/');

    const header = page.locator('header');
    await expect(header).toBeVisible();

    await expect(header).toHaveClass(/sticky/);
    await expect(header).toHaveClass(/top-0/);
    await expect(header).toHaveClass(/z-50/);

    await page.evaluate(() => window.scrollTo(0, 500));
    await page.waitForTimeout(500);

    await expect(header).toBeVisible();

    await page.evaluate(() => window.scrollTo(0, 0));
    await page.waitForTimeout(500);

    await expect(header).toBeVisible();
  });

  test('1-6: ahamoロゴのリンク機能確認', async ({ page }) => {
    await page.goto('/plan');
    await expect(page).toHaveURL('/plan');

    const logo = page.locator('a[href="/"]').filter({ hasText: 'ahamo' });
    await logo.click();

    await expect(page).toHaveURL('/');
  });
});
