import { http, HttpResponse } from 'msw';
import type {
  AccountDashboard,
  ContractInfo,
  DataUsage,
  BillingInfo,
  OptionService,
  AvailablePlan,
} from '@/types/account';

/**
 * アカウント管理API用MSWモックハンドラー
 * EC-278: ahamo マイページシステム
 */

/** 認証チェックヘルパー */
function checkAuth(request: Request): boolean {
  const authHeader = request.headers.get('Authorization');
  return !!authHeader && authHeader.startsWith('Bearer ');
}

function unauthorizedResponse() {
  return HttpResponse.json(
    { message: '認証が必要です。ログインしてください。', status: 'error' },
    { status: 401 }
  );
}

export const accountHandlers = [
  /**
   * GET /api/v1/account/dashboard - ダッシュボード集約データ
   */
  http.get('*/api/v1/account/dashboard', ({ request }) => {
    if (!checkAuth(request)) return unauthorizedResponse();

    const dashboard: AccountDashboard = {
      contract: {
        planName: 'ahamo',
        monthlyFee: 2970,
        dataCapacityGB: 20,
        phoneNumber: '090-1234-5678',
      },
      dataUsage: {
        usedGB: 12.5,
        totalGB: 20,
        remainingGB: 7.5,
        usagePercentage: 62.5,
      },
      billing: {
        currentMonthTotal: 3520,
        previousMonthTotal: 2970,
        baseFee: 2970,
        callCharges: 550,
      },
      device: {
        id: 'device-001',
        deviceName: 'iPhone 15 Pro',
        manufacturer: 'Apple',
        imageUrl: '/images/iphone-15-pro.jpg',
        purchaseDate: '2024-09-15',
        totalPayments: 36,
        completedPayments: 18,
        monthlyPayment: 3280,
        remainingAmount: 59040,
      },
      notifications: [
        {
          id: 'notif-001',
          title: '【重要】メンテナンスのお知らせ',
          message: '2026年3月10日(火) 02:00〜06:00の間、システムメンテナンスを実施いたします。',
          date: '2026-03-05',
          isRead: false,
          category: 'important',
        },
        {
          id: 'notif-002',
          title: '3月のご利用料金が確定しました',
          message: '2026年3月分のご利用料金は3,520円です。',
          date: '2026-03-01',
          isRead: false,
          category: 'billing',
        },
        {
          id: 'notif-003',
          title: 'ahamo大盛り キャンペーン実施中',
          message: '期間限定でahamo大盛りオプションが初月無料！',
          date: '2026-02-28',
          isRead: true,
          category: 'campaign',
        },
        {
          id: 'notif-004',
          title: 'データ使用量が80%に達しました',
          message: '今月のデータ使用量が16GBに達しました。残り4GBです。',
          date: '2026-02-25',
          isRead: true,
          category: 'info',
        },
      ],
      unreadNotificationCount: 2,
    };

    return HttpResponse.json({ data: dashboard, message: '成功', status: 'success' });
  }),

  /**
   * GET /api/v1/account/contract - 契約詳細
   */
  http.get('*/api/v1/account/contract', ({ request }) => {
    if (!checkAuth(request)) return unauthorizedResponse();

    const contractInfo: ContractInfo = {
      contractor: {
        name: '田中 太郎',
        nameKana: 'タナカ タロウ',
        birthDate: '1990-05-15',
        postalCode: '150-0001',
        address: '東京都渋谷区神宮前1-2-3 ahamoマンション101号室',
        phoneNumber: '090-1234-5678',
        email: 'tanaka.taro@example.com',
      },
      contract: {
        phoneNumber: '090-1234-5678',
        contractDate: '2021-03-26',
        planName: 'ahamo',
        planId: 'plan-ahamo-20gb',
        monthlyFee: 2970,
        dataCapacity: '20GB',
        dataCapacityGB: 20,
        optionServices: [
          { id: 'opt-kakehoudai', name: 'かけ放題オプション', monthlyFee: 1100 },
          { id: 'opt-warranty', name: 'ケータイ補償サービス', monthlyFee: 825 },
        ],
      },
    };

    return HttpResponse.json({ data: contractInfo, message: '成功', status: 'success' });
  }),

  /**
   * GET /api/v1/account/data-usage - データ使用量詳細
   */
  http.get('*/api/v1/account/data-usage', ({ request }) => {
    if (!checkAuth(request)) return unauthorizedResponse();

    const dataUsage: DataUsage = {
      currentMonth: {
        usedGB: 12.5,
        totalGB: 20,
        remainingGB: 7.5,
        usagePercentage: 62.5,
        billingPeriodStart: '2026-03-01',
        billingPeriodEnd: '2026-03-31',
      },
      dailyUsage: [
        { date: '2026-03-01', usageGB: 0.8 },
        { date: '2026-03-02', usageGB: 1.2 },
        { date: '2026-03-03', usageGB: 0.5 },
        { date: '2026-03-04', usageGB: 2.1 },
        { date: '2026-03-05', usageGB: 1.8 },
        { date: '2026-03-06', usageGB: 0.9 },
        { date: '2026-03-07', usageGB: 1.5 },
        { date: '2026-03-08', usageGB: 0.7 },
        { date: '2026-03-09', usageGB: 1.0 },
        { date: '2026-03-10', usageGB: 2.0 },
      ],
      monthlyHistory: [
        { month: '2025-10', usageGB: 15.2, capacityGB: 20 },
        { month: '2025-11', usageGB: 18.1, capacityGB: 20 },
        { month: '2025-12', usageGB: 12.8, capacityGB: 20 },
        { month: '2026-01', usageGB: 16.5, capacityGB: 20 },
        { month: '2026-02', usageGB: 19.3, capacityGB: 20 },
        { month: '2026-03', usageGB: 12.5, capacityGB: 20 },
      ],
      chargeHistory: [
        {
          id: 'charge-001',
          chargeDate: '2026-02-20T14:30:00',
          amountGB: 1,
          price: 550,
          expirationDate: '2026-02-28',
        },
        {
          id: 'charge-002',
          chargeDate: '2026-01-25T10:15:00',
          amountGB: 1,
          price: 550,
          expirationDate: '2026-01-31',
        },
      ],
    };

    return HttpResponse.json({ data: dataUsage, message: '成功', status: 'success' });
  }),

  /**
   * GET /api/v1/account/billing - 請求情報
   */
  http.get('*/api/v1/account/billing', ({ request }) => {
    if (!checkAuth(request)) return unauthorizedResponse();

    const billingInfo: BillingInfo = {
      currentMonth: {
        baseFee: 2970,
        callCharges: 550,
        optionFees: 1925,
        discounts: 0,
        tax: 545,
        totalAmount: 5990,
      },
      previousMonth: {
        baseFee: 2970,
        callCharges: 0,
        optionFees: 1925,
        discounts: -1100,
        tax: 380,
        totalAmount: 4175,
      },
      billingHistory: [
        {
          id: 'bill-202603',
          billingMonth: '2026年3月',
          amount: 5990,
          paymentStatus: 'pending',
        },
        {
          id: 'bill-202602',
          billingMonth: '2026年2月',
          amount: 4175,
          paymentStatus: 'paid',
          paidDate: '2026-02-27',
          receiptUrl: '/receipts/202602.pdf',
        },
        {
          id: 'bill-202601',
          billingMonth: '2026年1月',
          amount: 3520,
          paymentStatus: 'paid',
          paidDate: '2026-01-27',
          receiptUrl: '/receipts/202601.pdf',
        },
        {
          id: 'bill-202512',
          billingMonth: '2025年12月',
          amount: 2970,
          paymentStatus: 'paid',
          paidDate: '2025-12-27',
          receiptUrl: '/receipts/202512.pdf',
        },
        {
          id: 'bill-202511',
          billingMonth: '2025年11月',
          amount: 4895,
          paymentStatus: 'paid',
          paidDate: '2025-11-27',
          receiptUrl: '/receipts/202511.pdf',
        },
      ],
      paymentMethods: [
        {
          id: 'pm-001',
          type: 'credit_card',
          displayName: 'VISA',
          maskedNumber: '**** **** **** 1234',
          expirationDate: '2028/03',
          isDefault: true,
        },
        {
          id: 'pm-002',
          type: 'bank_account',
          displayName: 'みずほ銀行',
          maskedNumber: '***-*******-1234567',
          isDefault: false,
        },
      ],
    };

    return HttpResponse.json({ data: billingInfo, message: '成功', status: 'success' });
  }),

  /**
   * GET /api/v1/account/options - オプションサービス一覧
   */
  http.get('*/api/v1/account/options', ({ request }) => {
    if (!checkAuth(request)) return unauthorizedResponse();

    const options: OptionService[] = [
      {
        id: 'opt-kakehoudai',
        name: 'かけ放題オプション',
        description: '国内通話が24時間かけ放題になります。5分以内の国内通話が無料のahamo基本プランに加えて、5分を超える通話も無料に。',
        monthlyFee: 1100,
        isSubscribed: true,
        category: 'calling',
      },
      {
        id: 'opt-oomori',
        name: 'ahamo大盛り',
        description: '月間データ容量を100GBまで拡大。テザリングも100GBまでご利用いただけます。',
        monthlyFee: 1980,
        isSubscribed: false,
        category: 'data',
      },
      {
        id: 'opt-warranty',
        name: 'ケータイ補償サービス',
        description: '故障・水濡れ・盗難・紛失などのトラブルを幅広くサポート。交換電話機を最短翌日にお届け。',
        monthlyFee: 825,
        isSubscribed: true,
        category: 'insurance',
      },
      {
        id: 'opt-security',
        name: 'あんしんセキュリティ',
        description: 'ウイルス対策・危険サイト対策・迷惑メール対策などセキュリティ機能をまとめて提供。',
        monthlyFee: 220,
        isSubscribed: false,
        category: 'other',
      },
      {
        id: 'opt-cloud',
        name: 'クラウド容量オプション（50GB）',
        description: 'ドコモクラウドの保存容量を50GBに拡大。写真・動画のバックアップに。',
        monthlyFee: 440,
        isSubscribed: false,
        category: 'other',
      },
    ];

    return HttpResponse.json({ data: options, message: '成功', status: 'success' });
  }),

  /**
   * GET /api/v1/account/plans - 利用可能プラン一覧
   */
  http.get('*/api/v1/account/plans', ({ request }) => {
    if (!checkAuth(request)) return unauthorizedResponse();

    const plans: AvailablePlan[] = [
      {
        id: 'plan-ahamo-20gb',
        name: 'ahamo',
        monthlyFee: 2970,
        dataCapacityGB: 20,
        description: '月額2,970円（税込）で20GBまで使える基本プラン',
        features: [
          '月間データ容量20GB',
          '5分以内の国内通話無料',
          'テザリング無料',
          '海外82の国・地域でそのまま使える',
          '速度制限時も最大1Mbps',
        ],
        isCurrent: true,
      },
      {
        id: 'plan-ahamo-100gb',
        name: 'ahamo大盛り',
        monthlyFee: 4950,
        dataCapacityGB: 100,
        description: '月額4,950円（税込）で100GBまで使える大容量プラン',
        features: [
          '月間データ容量100GB',
          '5分以内の国内通話無料',
          'テザリング100GBまで無料',
          '海外82の国・地域でそのまま使える',
          '速度制限時も最大1Mbps',
          '大容量で動画・ゲームも安心',
        ],
        isCurrent: false,
      },
    ];

    return HttpResponse.json({ data: plans, message: '成功', status: 'success' });
  }),

  /**
   * PUT /api/v1/account/profile - 連絡先情報の更新
   */
  http.put('*/api/v1/account/profile', ({ request }) => {
    if (!checkAuth(request)) return unauthorizedResponse();

    return HttpResponse.json({
      data: null,
      message: '連絡先情報を更新しました。',
      status: 'success',
    });
  }),

  /**
   * PUT /api/v1/account/password - パスワード変更
   */
  http.put('*/api/v1/account/password', ({ request }) => {
    if (!checkAuth(request)) return unauthorizedResponse();

    return HttpResponse.json({
      data: null,
      message: 'パスワードを変更しました。',
      status: 'success',
    });
  }),

  /**
   * PUT /api/v1/account/notifications - 通知設定の更新
   */
  http.put('*/api/v1/account/notifications', ({ request }) => {
    if (!checkAuth(request)) return unauthorizedResponse();

    return HttpResponse.json({
      data: null,
      message: '通知設定を更新しました。',
      status: 'success',
    });
  }),

  /**
   * PUT /api/v1/account/plan - プラン変更
   */
  http.put('*/api/v1/account/plan', ({ request }) => {
    if (!checkAuth(request)) return unauthorizedResponse();

    return HttpResponse.json({
      data: null,
      message: 'プラン変更を受け付けました。翌月1日より適用されます。',
      status: 'success',
    });
  }),

  /**
   * PUT /api/v1/account/options/:optionId - オプション管理
   */
  http.put('*/api/v1/account/options/:optionId', ({ request }) => {
    if (!checkAuth(request)) return unauthorizedResponse();

    return HttpResponse.json({
      data: null,
      message: 'オプションの変更を受け付けました。',
      status: 'success',
    });
  }),
];
