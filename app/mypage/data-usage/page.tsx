'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/hooks/useAuth';
import { useDataUsage } from '@/hooks/useDataUsage';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import { ErrorMessage } from '@/components/ui/ErrorMessage';

/**
 * データ使用量詳細ページ
 * EC-278: 当月使用量・日別グラフ・月別推移・チャージ履歴
 */
export default function DataUsagePage() {
  const router = useRouter();
  const { isAuthenticated } = useAuth();
  const { dataUsage, loading, error } = useDataUsage();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login');
    }
  }, [isAuthenticated, router]);

  if (!isAuthenticated) return null;

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

  if (!dataUsage) return null;

  const { currentMonth, dailyUsage, monthlyHistory, chargeHistory } = dataUsage;
  const maxDailyUsage = Math.max(...dailyUsage.map((d) => d.usageGB), 1);

  return (
    <main className="container mx-auto px-4 py-8 max-w-3xl">
      <nav className="mb-4 text-sm text-gray-500" aria-label="パンくずリスト">
        <Link href="/mypage" className="hover:text-blue-600">マイページ</Link>
        <span className="mx-2">/</span>
        <span className="text-gray-900">データ使用量</span>
      </nav>

      <h1 className="text-2xl font-bold text-gray-900 mb-6">データ使用量</h1>

      {/* 当月使用量 */}
      <section className="bg-white rounded-lg shadow-md p-6 border border-gray-200 mb-6">
        <h2 className="text-lg font-bold text-gray-900 mb-4">今月のデータ使用量</h2>
        <p className="text-xs text-gray-500 mb-3">
          期間: {currentMonth.billingPeriodStart} 〜 {currentMonth.billingPeriodEnd}
        </p>
        <div className="text-center mb-4">
          <span className="text-4xl font-bold text-gray-900">{currentMonth.usedGB}</span>
          <span className="text-lg text-gray-500 ml-2">GB / {currentMonth.totalGB}GB</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-5 overflow-hidden mb-2" role="progressbar" aria-valuenow={currentMonth.usagePercentage} aria-valuemin={0} aria-valuemax={100}>
          <div
            className={`h-full rounded-full transition-all duration-500 ${
              currentMonth.usagePercentage >= 90
                ? 'bg-red-500'
                : currentMonth.usagePercentage >= 70
                  ? 'bg-yellow-500'
                  : 'bg-blue-600'
            }`}
            style={{ width: `${Math.min(currentMonth.usagePercentage, 100)}%` }}
          />
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">使用済み: {currentMonth.usedGB}GB</span>
          <span className="text-gray-600">残り: {currentMonth.remainingGB}GB</span>
        </div>
      </section>

      {/* 日別使用量グラフ */}
      <section className="bg-white rounded-lg shadow-md p-6 border border-gray-200 mb-6">
        <h2 className="text-lg font-bold text-gray-900 mb-4">日別データ使用量</h2>
        <div className="space-y-2">
          {dailyUsage.map((day) => (
            <div key={day.date} className="flex items-center gap-3">
              <span className="text-xs text-gray-500 w-20 flex-shrink-0">
                {day.date.split('-').slice(1).join('/')}
              </span>
              <div className="flex-1 bg-gray-100 rounded-full h-4 overflow-hidden">
                <div
                  className="bg-blue-500 h-full rounded-full"
                  style={{ width: `${(day.usageGB / maxDailyUsage) * 100}%` }}
                />
              </div>
              <span className="text-xs text-gray-700 w-14 text-right flex-shrink-0">{day.usageGB}GB</span>
            </div>
          ))}
        </div>
      </section>

      {/* 月別推移 */}
      <section className="bg-white rounded-lg shadow-md p-6 border border-gray-200 mb-6">
        <h2 className="text-lg font-bold text-gray-900 mb-4">月別データ使用量推移</h2>
        <div className="space-y-3">
          {monthlyHistory.map((month) => {
            const percentage = (month.usageGB / month.capacityGB) * 100;
            return (
              <div key={month.month} className="flex items-center gap-3">
                <span className="text-xs text-gray-500 w-16 flex-shrink-0">
                  {month.month.replace('-', '/')}
                </span>
                <div className="flex-1 bg-gray-100 rounded-full h-5 overflow-hidden">
                  <div
                    className={`h-full rounded-full ${
                      percentage >= 90 ? 'bg-red-400' : percentage >= 70 ? 'bg-yellow-400' : 'bg-blue-400'
                    }`}
                    style={{ width: `${Math.min(percentage, 100)}%` }}
                  />
                </div>
                <span className="text-xs text-gray-700 w-20 text-right flex-shrink-0">
                  {month.usageGB}GB / {month.capacityGB}GB
                </span>
              </div>
            );
          })}
        </div>
      </section>

      {/* データチャージ履歴 */}
      <section className="bg-white rounded-lg shadow-md p-6 border border-gray-200 mb-6">
        <h2 className="text-lg font-bold text-gray-900 mb-4">データチャージ履歴</h2>
        {chargeHistory.length === 0 ? (
          <p className="text-sm text-gray-500 text-center py-4">チャージ履歴はありません</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-2 text-gray-600 font-medium">チャージ日時</th>
                  <th className="text-right py-2 text-gray-600 font-medium">容量</th>
                  <th className="text-right py-2 text-gray-600 font-medium">料金</th>
                  <th className="text-right py-2 text-gray-600 font-medium">有効期限</th>
                </tr>
              </thead>
              <tbody>
                {chargeHistory.map((charge) => (
                  <tr key={charge.id} className="border-b border-gray-100">
                    <td className="py-2 text-gray-900">
                      {charge.chargeDate.replace('T', ' ').slice(0, 16)}
                    </td>
                    <td className="py-2 text-right text-gray-900">{charge.amountGB}GB</td>
                    <td className="py-2 text-right text-gray-900">¥{charge.price.toLocaleString()}</td>
                    <td className="py-2 text-right text-gray-900">{charge.expirationDate}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>

      <div className="text-center">
        <Link
          href="/mypage"
          className="inline-block px-6 py-3 rounded-lg border border-gray-300 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
        >
          マイページに戻る
        </Link>
      </div>
    </main>
  );
}
