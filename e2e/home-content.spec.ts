import { test, expect } from '@playwright/test';

/**
 * DEVIN-5: PBI-TP-002 主要コンテンツ表示
 * 
 * このテストファイルはトップページの主要コンテンツ表示をテストします。
 * 実装参照: app/page.tsx, components/layout/*
 */

test.describe('DEVIN-5: 主要コンテンツ表示', () => {
  
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('5-1: プロモーションバナーの表示確認', async ({ page }) => {
    const banner = page.locator('text=ahamoで、もっと自由に。');
    await expect(banner).toBeVisible();

    const description = page.locator('text=月額2,970円で20GB使える');
    await expect(description).toBeVisible();

    const applyButton = page.locator('a[href="/flow"]').first();
    await expect(applyButton).toBeVisible();
    await expect(applyButton).toContainText('今すぐ申し込む');

    const planButton = page.locator('a[href="/plan"]').first();
    await expect(planButton).toBeVisible();
    await expect(planButton).toContainText('料金プランを見る');
  });

  test('5-2: キャンペーンカルーセルの表示と自動再生確認', async ({ page }) => {
    const campaignSection = page.locator('text=キャンペーン情報').first();
    await expect(campaignSection).toBeVisible();

    const carousel = page.locator('[role="region"]').first();
    await expect(carousel).toBeVisible();

    const prevButton = page.locator('button[aria-label*="前"]').first();
    const nextButton = page.locator('button[aria-label*="次"]').first();
    await expect(prevButton).toBeVisible();
    await expect(nextButton).toBeVisible();

    await nextButton.click();
    await page.waitForTimeout(500);

    await prevButton.click();
    await page.waitForTimeout(500);
  });

  test('5-3: 料金プランセクションの表示確認', async ({ page }) => {
    const planSection = page.locator('text=料金プラン').first();
    await expect(planSection).toBeVisible();

    const planCards = page.locator('.bg-white.rounded-lg.shadow-md').filter({ has: page.locator('text=/GB/') });
    await expect(planCards.first()).toBeVisible();

    const priceInfo = page.locator('text=/円\/月/').first();
    await expect(priceInfo).toBeVisible();
  });

  test('5-4: アクションボタンセクションの表示確認', async ({ page }) => {
    const buttons = [
      { href: '/flow', text: '申し込みの流れ' },
      { href: '/plan', text: '料金プランを見る' },
      { href: '/smartphones', text: '製品を見る' }
    ];

    for (const button of buttons) {
      const btn = page.locator(`a[href="${button.href}"]`).filter({ hasText: button.text });
      await expect(btn).toBeVisible();
    }
  });

  test('5-5: スマートフォンカルーセルの表示確認', async ({ page }) => {
    const smartphoneSection = page.locator('text=おすすめスマートフォン').first();
    await expect(smartphoneSection).toBeVisible();

    const carousel = page.locator('[role="region"]').nth(1);
    await expect(carousel).toBeVisible();

    const prevButton = page.locator('button[aria-label*="前"]').nth(1);
    const nextButton = page.locator('button[aria-label*="次"]').nth(1);
    await expect(prevButton).toBeVisible();
    await expect(nextButton).toBeVisible();
  });

  test('5-6: ahamoの特徴セクションの表示確認', async ({ page }) => {
    const featureSection = page.locator('text=ahamoの特徴').first();
    await expect(featureSection).toBeVisible();

    const features = [
      'シンプルな料金',
      '高速通信',
      '海外でも使える'
    ];

    for (const feature of features) {
      const featureCard = page.locator(`text=${feature}`);
      await expect(featureCard).toBeVisible();
    }
  });

  test('5-7: お知らせセクションの表示確認', async ({ page }) => {
    const newsSection = page.locator('text=お知らせ').first();
    await expect(newsSection).toBeVisible();

    const newsLink = page.locator('a[href="/news"]');
    await expect(newsLink).toBeVisible();

    const newsItems = page.locator('.bg-white.rounded-lg.shadow-sm').filter({ has: page.locator('text=/202/') });
    const count = await newsItems.count();
    expect(count).toBeGreaterThan(0);
  });

  test('5-8: サポートセクションの表示確認', async ({ page }) => {
    const supportSection = page.locator('text=サポート').first();
    await expect(supportSection).toBeVisible();

    const supportCards = [
      'よくある質問',
      'チャットサポート',
      'お問い合わせ'
    ];

    for (const card of supportCards) {
      const supportCard = page.locator(`text=${card}`);
      await expect(supportCard).toBeVisible();
    }

    const supportLink = page.locator('a[href="/support"]').filter({ hasText: 'サポートページへ' });
    await expect(supportLink).toBeVisible();
  });

  test('5-9: フッターの表示確認', async ({ page }) => {
    const footer = page.locator('footer');
    await expect(footer).toBeVisible();

    const categories = [
      'サービス',
      'サポート',
      '会社情報'
    ];

    for (const category of categories) {
      const categoryHeading = footer.locator(`text=${category}`);
      await expect(categoryHeading).toBeVisible();
    }

    const socialLinks = footer.locator('a[aria-label*="LINE"], a[aria-label*="Facebook"], a[aria-label*="Instagram"]');
    await expect(socialLinks.first()).toBeVisible();

    const copyright = footer.locator('text=/© 202.*NTT DOCOMO/');
    await expect(copyright).toBeVisible();
  });
});
