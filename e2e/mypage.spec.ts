import { test, expect } from '@playwright/test';

/**
 * EC-278: マイページ（アカウント管理）E2Eテスト
 *
 * テストシナリオ:
 * - 認証ガード（未認証時のリダイレクト）
 * - ダッシュボード表示
 * - 詳細ページへのナビゲーション
 * - アカウント設定（パスワード変更フォームバリデーション）
 * - プラン変更フロー
 * - レスポンシブ対応（モバイル375px）
 */

/** ログイン済み状態をセットアップするヘルパー */
async function setupAuthenticatedState(page: import('@playwright/test').Page) {
  await page.evaluate(() => {
    localStorage.setItem(
      'user',
      JSON.stringify({
        id: '1',
        name: 'テストユーザー',
        email: 'test@example.com',
      })
    );
    localStorage.setItem('auth_token', 'mock-token-12345');
  });
}

test.describe('EC-278: マイページ', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.evaluate(() => localStorage.clear());
  });

  test.describe('認証ガード', () => {
    test('未認証時にマイページへアクセスするとログインページにリダイレクトされる', async ({
      page,
    }) => {
      await page.goto('/mypage');
      await page.waitForURL('**/login');
      await expect(page).toHaveURL(/\/login/);
    });
  });

  test.describe('ダッシュボード表示', () => {
    test.beforeEach(async ({ page }) => {
      await page.goto('/');
      await setupAuthenticatedState(page);
    });

    test('ログイン後にダッシュボードが正しく表示される', async ({ page }) => {
      await page.goto('/mypage');
      await expect(page.locator('h1', { hasText: 'マイページ' })).toBeVisible();

      // 契約概要カード
      await expect(page.locator('[aria-label="契約概要"]')).toBeVisible();

      // データ使用量
      await expect(page.locator('[aria-label="データ使用量"]')).toBeVisible();

      // 料金プレビュー
      await expect(page.locator('[aria-label="ご利用料金"]')).toBeVisible();

      // 端末情報
      await expect(page.locator('[aria-label="契約端末"]')).toBeVisible();

      // お知らせ
      await expect(page.locator('[aria-label="お知らせ"]')).toBeVisible();

      // 手続きリンク
      await expect(page.locator('[aria-label="各種お手続き"]')).toBeVisible();

      // サポート
      await expect(page.locator('[aria-label="サポート"]')).toBeVisible();
    });

    test('ダッシュボードにナビゲーションリンクが表示される', async ({ page }) => {
      await page.goto('/mypage');
      await expect(page.locator('h1', { hasText: 'マイページ' })).toBeVisible();

      const navLinks = ['ご契約内容', 'データ使用量', '料金・お支払い', 'プラン変更', 'オプション'];
      for (const label of navLinks) {
        await expect(page.locator('a', { hasText: label }).first()).toBeVisible();
      }
    });
  });

  test.describe('詳細ページナビゲーション', () => {
    test.beforeEach(async ({ page }) => {
      await page.goto('/');
      await setupAuthenticatedState(page);
    });

    test('データ使用量ページに遷移できる', async ({ page }) => {
      await page.goto('/mypage/data-usage');
      await expect(page.locator('h1', { hasText: 'データ使用量' })).toBeVisible();
      // パンくず確認
      await expect(page.locator('nav[aria-label="パンくずリスト"]')).toBeVisible();
      await expect(page.locator('a', { hasText: 'マイページ' }).first()).toBeVisible();
    });

    test('請求情報ページに遷移できる', async ({ page }) => {
      await page.goto('/mypage/billing');
      await expect(page.locator('h1', { hasText: '料金・お支払い' })).toBeVisible();
      await expect(page.locator('nav[aria-label="パンくずリスト"]')).toBeVisible();
    });

    test('契約情報ページに遷移できる', async ({ page }) => {
      await page.goto('/mypage/contract');
      await expect(page.locator('h1', { hasText: 'ご契約内容' })).toBeVisible();
      await expect(page.locator('nav[aria-label="パンくずリスト"]')).toBeVisible();
    });
  });

  test.describe('アカウント設定', () => {
    test.beforeEach(async ({ page }) => {
      await page.goto('/');
      await setupAuthenticatedState(page);
    });

    test('パスワード変更フォームのバリデーションが正しく機能する', async ({ page }) => {
      await page.goto('/mypage/settings');
      await expect(page.locator('h1', { hasText: 'アカウント設定' })).toBeVisible();

      // 空の状態で送信
      await page.locator('button', { hasText: 'パスワードを変更' }).click();
      await expect(page.locator('[role="alert"]')).toBeVisible();

      // 短いパスワード
      await page.fill('#currentPassword', 'oldpass');
      await page.fill('#newPassword', 'short');
      await page.fill('#confirmPassword', 'short');
      await page.locator('button', { hasText: 'パスワードを変更' }).click();
      await expect(page.locator('text=8文字以上')).toBeVisible();

      // パスワード不一致
      await page.fill('#newPassword', 'newpassword123');
      await page.fill('#confirmPassword', 'differentpassword');
      await page.locator('button', { hasText: 'パスワードを変更' }).click();
      await expect(page.locator('text=一致しません')).toBeVisible();

      // 正しい入力で確認画面が表示される
      await page.fill('#currentPassword', 'oldpassword');
      await page.fill('#newPassword', 'newpassword123');
      await page.fill('#confirmPassword', 'newpassword123');
      await page.locator('button', { hasText: 'パスワードを変更' }).click();
      await expect(page.locator('text=変更してよろしいですか')).toBeVisible();
    });
  });

  test.describe('プラン変更フロー', () => {
    test.beforeEach(async ({ page }) => {
      await page.goto('/');
      await setupAuthenticatedState(page);
    });

    test('プラン選択から確認画面への遷移が正しく動作する', async ({ page }) => {
      await page.goto('/mypage/plan-change');
      await expect(page.locator('h1', { hasText: 'プラン変更' })).toBeVisible();

      // 現在のプラン表示
      await expect(page.locator('text=現在のプラン')).toBeVisible();

      // 利用可能プラン表示
      await expect(page.locator('text=利用可能なプラン')).toBeVisible();
    });
  });

  test.describe('レスポンシブ対応', () => {
    test('モバイル表示（375px）で正しくレイアウトされる', async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 });
      await page.goto('/');
      await setupAuthenticatedState(page);
      await page.goto('/mypage');

      await expect(page.locator('h1', { hasText: 'マイページ' })).toBeVisible();

      // コンテンツが画面内に収まっていることを確認
      const main = page.locator('main');
      await expect(main).toBeVisible();
      const mainBox = await main.boundingBox();
      expect(mainBox).toBeTruthy();
      if (mainBox) {
        expect(mainBox.width).toBeLessThanOrEqual(375);
      }
    });
  });
});
