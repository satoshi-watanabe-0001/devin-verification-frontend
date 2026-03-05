'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import { useAccountDashboard } from '@/hooks/useAccountDashboard';
import { DashboardSummaryCard } from '@/components/account/DashboardSummaryCard';
import { DataUsageProgressBar } from '@/components/account/DataUsageProgressBar';
import { DeviceContractCard } from '@/components/account/DeviceContractCard';
import { NotificationList } from '@/components/account/NotificationList';
import { ProcedureLinks } from '@/components/account/ProcedureLinks';
import { SupportAccessSection } from '@/components/account/SupportAccessSection';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import { ErrorMessage } from '@/components/ui/ErrorMessage';
import Link from 'next/link';

/**
 * マイページ ダッシュボード
 * EC-278: ahamo アカウント管理メインページ
 */
export default function MyPage() {
  const router = useRouter();
  const { isAuthenticated } = useAuth();
  const { dashboard, loading, error } = useAccountDashboard();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login');
    }
  }, [isAuthenticated, router]);

  if (!isAuthenticated) {
    return null;
  }

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-12">
        <LoadingSpinner size="large" className="py-20" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <ErrorMessage message={error} />
      </div>
    );
  }

  if (!dashboard) {
    return null;
  }

  return (
    <main className="container mx-auto px-4 py-8 max-w-5xl">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">マイページ</h1>

      {/* 契約概要 & データ使用量 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <DashboardSummaryCard
          planName={dashboard.contract.planName}
          monthlyFee={dashboard.contract.monthlyFee}
          dataCapacityGB={dashboard.contract.dataCapacityGB}
          phoneNumber={dashboard.contract.phoneNumber}
        />
        <DataUsageProgressBar
          usedGB={dashboard.dataUsage.usedGB}
          totalGB={dashboard.dataUsage.totalGB}
          remainingGB={dashboard.dataUsage.remainingGB}
          usagePercentage={dashboard.dataUsage.usagePercentage}
        />
      </div>

      {/* 請求プレビュー */}
      <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200 mb-6" aria-label="ご利用料金">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-gray-900">今月のご利用料金</h2>
          <Link
            href="/mypage/billing"
            className="text-sm text-blue-600 hover:text-blue-800 hover:underline"
          >
            詳細を見る
          </Link>
        </div>
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">基本料金</span>
            <span className="text-sm text-gray-900">¥{dashboard.billing.baseFee.toLocaleString()}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">通話料</span>
            <span className="text-sm text-gray-900">¥{dashboard.billing.callCharges.toLocaleString()}</span>
          </div>
          <hr className="my-2" />
          <div className="flex justify-between items-center">
            <span className="text-sm font-semibold text-gray-900">合計（税込）</span>
            <span className="text-lg font-bold text-blue-600">
              ¥{dashboard.billing.currentMonthTotal.toLocaleString()}
            </span>
          </div>
          {dashboard.billing.previousMonthTotal > 0 && (
            <div className="flex justify-between items-center">
              <span className="text-xs text-gray-500">前月比</span>
              <span className={`text-xs font-medium ${
                dashboard.billing.currentMonthTotal > dashboard.billing.previousMonthTotal
                  ? 'text-red-600'
                  : 'text-green-600'
              }`}>
                {dashboard.billing.currentMonthTotal > dashboard.billing.previousMonthTotal ? '+' : ''}
                ¥{(dashboard.billing.currentMonthTotal - dashboard.billing.previousMonthTotal).toLocaleString()}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* 端末情報 */}
      {dashboard.device && (
        <div className="mb-6">
          <DeviceContractCard device={dashboard.device} />
        </div>
      )}

      {/* お知らせ */}
      <div className="mb-6">
        <NotificationList
          notifications={dashboard.notifications}
          unreadCount={dashboard.unreadNotificationCount}
        />
      </div>

      {/* ナビゲーションリンク */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 mb-6">
        {[
          { label: 'ご契約内容', href: '/mypage/contract' },
          { label: 'データ使用量', href: '/mypage/data-usage' },
          { label: '料金・お支払い', href: '/mypage/billing' },
          { label: 'プラン変更', href: '/mypage/plan-change' },
          { label: 'オプション', href: '/mypage/options' },
        ].map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="flex items-center justify-center p-4 rounded-lg border border-gray-200 hover:bg-blue-50 hover:border-blue-300 transition-colors text-sm font-medium text-gray-900 hover:text-blue-700 text-center"
          >
            {item.label}
          </Link>
        ))}
      </div>

      {/* 各種お手続き */}
      <div className="mb-6">
        <ProcedureLinks />
      </div>

      {/* サポート */}
      <div className="mb-6">
        <SupportAccessSection />
      </div>

      {/* アカウント設定リンク */}
      <div className="text-center">
        <Link
          href="/mypage/settings"
          className="inline-block px-6 py-3 rounded-lg border border-gray-300 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
        >
          アカウント設定
        </Link>
      </div>
    </main>
  );
}
