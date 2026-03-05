'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/hooks/useAuth';
import { useBillingInfo } from '@/hooks/useBillingInfo';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import { ErrorMessage } from '@/components/ui/ErrorMessage';

/**
 * 請求情報ページ
 * EC-278: 請求明細・履歴・支払い方法
 */
export default function BillingPage() {
  const router = useRouter();
  const { isAuthenticated } = useAuth();
  const { billingInfo, loading, error } = useBillingInfo();

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

  if (!billingInfo) return null;

  const { currentMonth, billingHistory, paymentMethods } = billingInfo;

  const getPaymentStatusLabel = (status: string) => {
    switch (status) {
      case 'paid': return { text: '支払い済み', className: 'bg-green-100 text-green-700' };
      case 'pending': return { text: '未確定', className: 'bg-yellow-100 text-yellow-700' };
      case 'overdue': return { text: '未払い', className: 'bg-red-100 text-red-700' };
      default: return { text: status, className: 'bg-gray-100 text-gray-700' };
    }
  };

  return (
    <main className="container mx-auto px-4 py-8 max-w-3xl">
      <nav className="mb-4 text-sm text-gray-500" aria-label="パンくずリスト">
        <Link href="/mypage" className="hover:text-blue-600">マイページ</Link>
        <span className="mx-2">/</span>
        <span className="text-gray-900">料金・お支払い</span>
      </nav>

      <h1 className="text-2xl font-bold text-gray-900 mb-6">料金・お支払い</h1>

      {/* 当月請求明細 */}
      <section className="bg-white rounded-lg shadow-md p-6 border border-gray-200 mb-6">
        <h2 className="text-lg font-bold text-gray-900 mb-4">今月のご利用料金</h2>
        <dl className="space-y-3">
          <div className="flex justify-between">
            <dt className="text-sm text-gray-600">基本料金</dt>
            <dd className="text-sm text-gray-900">¥{currentMonth.baseFee.toLocaleString()}</dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-sm text-gray-600">通話料</dt>
            <dd className="text-sm text-gray-900">¥{currentMonth.callCharges.toLocaleString()}</dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-sm text-gray-600">オプション料</dt>
            <dd className="text-sm text-gray-900">¥{currentMonth.optionFees.toLocaleString()}</dd>
          </div>
          {currentMonth.discounts !== 0 && (
            <div className="flex justify-between">
              <dt className="text-sm text-gray-600">割引</dt>
              <dd className="text-sm text-green-600">¥{currentMonth.discounts.toLocaleString()}</dd>
            </div>
          )}
          <div className="flex justify-between">
            <dt className="text-sm text-gray-600">消費税等</dt>
            <dd className="text-sm text-gray-900">¥{currentMonth.tax.toLocaleString()}</dd>
          </div>
          <hr />
          <div className="flex justify-between items-center">
            <dt className="text-base font-bold text-gray-900">合計（税込）</dt>
            <dd className="text-xl font-bold text-blue-600">¥{currentMonth.totalAmount.toLocaleString()}</dd>
          </div>
        </dl>
      </section>

      {/* 請求履歴 */}
      <section className="bg-white rounded-lg shadow-md p-6 border border-gray-200 mb-6">
        <h2 className="text-lg font-bold text-gray-900 mb-4">請求履歴</h2>
        {billingHistory.length === 0 ? (
          <p className="text-sm text-gray-500 text-center py-4">請求履歴はありません</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-2 text-gray-600 font-medium">請求月</th>
                  <th className="text-right py-2 text-gray-600 font-medium">金額</th>
                  <th className="text-center py-2 text-gray-600 font-medium">状態</th>
                  <th className="text-right py-2 text-gray-600 font-medium">領収書</th>
                </tr>
              </thead>
              <tbody>
                {billingHistory.map((entry) => {
                  const statusInfo = getPaymentStatusLabel(entry.paymentStatus);
                  return (
                    <tr key={entry.id} className="border-b border-gray-100">
                      <td className="py-3 text-gray-900">{entry.billingMonth}</td>
                      <td className="py-3 text-right text-gray-900">¥{entry.amount.toLocaleString()}</td>
                      <td className="py-3 text-center">
                        <span className={`text-xs font-medium px-2 py-1 rounded-full ${statusInfo.className}`}>
                          {statusInfo.text}
                        </span>
                      </td>
                      <td className="py-3 text-right">
                        {entry.receiptUrl ? (
                          <a
                            href={entry.receiptUrl}
                            className="text-blue-600 hover:text-blue-800 hover:underline text-xs"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            ダウンロード
                          </a>
                        ) : (
                          <span className="text-xs text-gray-400">-</span>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </section>

      {/* 支払い方法 */}
      <section className="bg-white rounded-lg shadow-md p-6 border border-gray-200 mb-6">
        <h2 className="text-lg font-bold text-gray-900 mb-4">お支払い方法</h2>
        <div className="space-y-3">
          {paymentMethods.map((method) => (
            <div
              key={method.id}
              className={`p-4 rounded-lg border ${
                method.isDefault ? 'border-blue-300 bg-blue-50' : 'border-gray-200'
              }`}
            >
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm font-medium text-gray-900">
                    {method.displayName}
                    {method.isDefault && (
                      <span className="ml-2 text-xs font-medium px-2 py-0.5 rounded-full bg-blue-100 text-blue-700">
                        メイン
                      </span>
                    )}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">{method.maskedNumber}</p>
                  {method.expirationDate && (
                    <p className="text-xs text-gray-500">有効期限: {method.expirationDate}</p>
                  )}
                </div>
                <button className="text-sm text-blue-600 hover:text-blue-800 hover:underline">
                  変更
                </button>
              </div>
            </div>
          ))}
        </div>
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
