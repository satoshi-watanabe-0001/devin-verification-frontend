import { test, expect } from '@playwright/test';

/**
 * 統合シナリオ1: エンドツーエンドユーザージャーニー（端末購入検討）
 * 
 * このテストファイルは、ユーザーがトップページから製品を閲覧し、
 * 購入リンクまで到達する一連の流れをテストします。
 * 
 * 実装参照: e2e-test-scenarios-implementation-based.md (統合シナリオ1)
 */

test.describe('統合シナリオ1: エンドツーエンドユーザージャーニー', () => {
  
  test('ユーザーがトップページから製品詳細、購入リンクまで到達できる', async ({ page }) => {
    await page.goto('/');
    
    const header = page.locator('header');
    await expect(header).toBeVisible();
    const ahamoLogo = header.locator('a[href="/"]').filter({ hasText: 'ahamo' }).first();
    await expect(ahamoLogo).toContainText('ahamo');
    
    const promotionBanner = page.locator('text=月額2,970円で20GB使える').first();
    await expect(promotionBanner).toBeVisible();
    
    const campaignSection = page.locator('text=キャンペーン').first();
    await expect(campaignSection).toBeVisible();
    
    const initialCampaign = await page.locator('h3').filter({ hasText: /キャンペーン|割引|特典/ }).first().textContent();
    
    await page.waitForTimeout(4000);
    
    const planSection = page.locator('text=料金プラン').first();
    await planSection.scrollIntoViewIfNeeded();
    await expect(planSection).toBeVisible();
    
    const planCards = page.locator('div').filter({ hasText: /GB/ });
    await expect(planCards.first()).toBeVisible();
    
    const smartphoneSection = page.locator('text=人気のスマートフォン').first();
    await smartphoneSection.scrollIntoViewIfNeeded();
    await expect(smartphoneSection).toBeVisible();
    
    await page.click('header a[href="/smartphones"]');
    
    await expect(page).toHaveURL('/smartphones');
    
    const categoryCards = page.locator('a[aria-label*="ページへ移動"]');
    await expect(categoryCards).toHaveCount(4);
    
    await page.click('a[href="/smartphones/iphone"]');
    
    await expect(page).toHaveURL('/smartphones/iphone');
    
    const iphoneCampaignBanner = page.locator('text=iPhone').first();
    await expect(iphoneCampaignBanner).toBeVisible();
    
    const productCards = page.locator('div').filter({ hasText: /iPhone/ }).filter({ hasText: /円/ });
    await expect(productCards.first()).toBeVisible();
    
    const iphone16ProMax = page.locator('text=iPhone 16 Pro Max').first();
    if (await iphone16ProMax.isVisible()) {
      const saleLabel = page.locator('text=/最大.*円引き/').first();
      if (await saleLabel.isVisible()) {
        await expect(saleLabel).toBeVisible();
      }
      
      const priceInfo = page.locator('text=/円/');
      await expect(priceInfo.first()).toBeVisible();
    }
    
    const purchaseButton = page.locator('a[href*="onlineshop.smt.docomo.ne.jp"]').first();
    await expect(purchaseButton).toBeVisible();
    
    const targetBlank = await purchaseButton.getAttribute('target');
    expect(targetBlank).toBe('_blank');
    
    const footer = page.locator('footer');
    await footer.scrollIntoViewIfNeeded();
    
    await expect(footer).toBeVisible();
    await expect(footer).toContainText('© NTT DOCOMO, INC.');
    
    const socialLinks = footer.locator('a[aria-label*="LINE"], a[aria-label*="Facebook"], a[aria-label*="Instagram"], a[aria-label*="TikTok"], a[aria-label*="YouTube"]');
    await expect(socialLinks).toHaveCount(5);
  });
});
