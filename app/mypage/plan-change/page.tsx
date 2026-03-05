'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/hooks/useAuth';
import { AccountApiService } from '@/services/accountService';
import type { AvailablePlan } from '@/types/account';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import { ErrorMessage } from '@/components/ui/ErrorMessage';

/**
 * プラン変更ページ
 * EC-278: 現在プラン表示・利用可能プラン選択・変更申込
 */
export default function PlanChangePage() {
  const router = useRouter();
  const { isAuthenticated } = useAuth();
  const [plans, setPlans] = useState<AvailablePlan[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const [timing, setTiming] = useState<'next_month' | 'immediate'>('next_month');
  const [step, setStep] = useState<'select' | 'confirm' | 'complete'>('select');
  const [submitLoading, setSubmitLoading] = useState(false);

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login');
    }
  }, [isAuthenticated, router]);

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        setLoading(true);
        const result = await AccountApiService.getAvailablePlans();
        setPlans(result);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'プラン情報の取得に失敗しました');
      } finally {
        setLoading(false);
      }
    };
    if (isAuthenticated) {
      fetchPlans();
    }
  }, [isAuthenticated]);

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

  const currentPlan = plans.find((p) => p.isCurrent);
  const selectedPlanObj = plans.find((p) => p.id === selectedPlan);

  const handleSubmit = async () => {
    if (!selectedPlan) return;
    setSubmitLoading(true);
    try {
      await AccountApiService.changePlan({
        newPlanId: selectedPlan,
        applicationTiming: timing,
      });
      setStep('complete');
    } catch {
      setError('プラン変更に失敗しました。もう一度お試しください。');
      setStep('select');
    } finally {
      setSubmitLoading(false);
    }
  };

  return (
    <main className="container mx-auto px-4 py-8 max-w-3xl">
      <nav className="mb-4 text-sm text-gray-500" aria-label="パンくずリスト">
        <Link href="/mypage" className="hover:text-blue-600">マイページ</Link>
        <span className="mx-2">/</span>
        <span className="text-gray-900">プラン変更</span>
      </nav>

      <h1 className="text-2xl font-bold text-gray-900 mb-6">プラン変更</h1>

      {step === 'complete' ? (
        <section className="bg-white rounded-lg shadow-md p-8 border border-gray-200 text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-xl font-bold text-gray-900 mb-2">プラン変更を受け付けました</h2>
          <p className="text-sm text-gray-600 mb-6">
            {timing === 'next_month' ? '翌月1日より新プランが適用されます。' : 'プラン変更が即時適用されました。'}
          </p>
          <Link
            href="/mypage"
            className="inline-block px-6 py-3 rounded-lg bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 transition-colors"
          >
            マイページに戻る
          </Link>
        </section>
      ) : step === 'confirm' && selectedPlanObj ? (
        <section className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
          <h2 className="text-lg font-bold text-gray-900 mb-4">変更内容の確認</h2>
          <div className="bg-gray-50 rounded-lg p-4 mb-4 space-y-2">
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">変更先プラン</span>
              <span className="text-sm font-semibold text-gray-900">{selectedPlanObj.name}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">月額料金</span>
              <span className="text-sm font-semibold text-gray-900">¥{selectedPlanObj.monthlyFee.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">データ容量</span>
              <span className="text-sm font-semibold text-gray-900">{selectedPlanObj.dataCapacityGB}GB</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">適用タイミング</span>
              <span className="text-sm font-semibold text-gray-900">
                {timing === 'next_month' ? '翌月1日から' : '即時適用'}
              </span>
            </div>
          </div>

          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 mb-4">
            <p className="text-xs text-yellow-800">
              プラン変更は日割り計算となります。変更月の料金は、旧プランと新プランの日割り額の合算となりますのでご了承ください。
            </p>
          </div>

          <div className="flex gap-3">
            <button
              onClick={handleSubmit}
              disabled={submitLoading}
              className="px-6 py-2 rounded-md text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-50 transition-colors"
            >
              {submitLoading ? '処理中...' : '変更を確定する'}
            </button>
            <button
              onClick={() => setStep('select')}
              className="px-6 py-2 rounded-md text-sm font-medium text-gray-700 border border-gray-300 hover:bg-gray-50 transition-colors"
            >
              戻る
            </button>
          </div>
        </section>
      ) : (
        <>
          {/* 現在のプラン */}
          {currentPlan && (
            <section className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6">
              <h2 className="text-sm font-semibold text-blue-800 mb-2">現在のプラン</h2>
              <p className="text-xl font-bold text-gray-900">{currentPlan.name}</p>
              <p className="text-sm text-gray-600 mt-1">
                月額¥{currentPlan.monthlyFee.toLocaleString()}（税込） / {currentPlan.dataCapacityGB}GB
              </p>
            </section>
          )}

          {/* 利用可能プラン */}
          <section className="mb-6">
            <h2 className="text-lg font-bold text-gray-900 mb-4">利用可能なプラン</h2>
            <div className="space-y-4">
              {plans.map((plan) => (
                <div
                  key={plan.id}
                  className={`bg-white rounded-lg shadow-md p-6 border-2 cursor-pointer transition-colors ${
                    selectedPlan === plan.id
                      ? 'border-blue-500 bg-blue-50'
                      : plan.isCurrent
                        ? 'border-gray-300 opacity-60'
                        : 'border-gray-200 hover:border-blue-300'
                  }`}
                  onClick={() => !plan.isCurrent && setSelectedPlan(plan.id)}
                >
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="text-lg font-bold text-gray-900">{plan.name}</h3>
                      {plan.isCurrent && (
                        <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-blue-100 text-blue-700">
                          現在のプラン
                        </span>
                      )}
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-blue-600">¥{plan.monthlyFee.toLocaleString()}</p>
                      <p className="text-xs text-gray-500">月額（税込）</p>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 mb-3">{plan.description}</p>
                  <ul className="space-y-1">
                    {plan.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center text-sm text-gray-700">
                        <svg className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>

          {/* 適用タイミング */}
          {selectedPlan && (
            <section className="bg-white rounded-lg shadow-md p-6 border border-gray-200 mb-6">
              <h2 className="text-lg font-bold text-gray-900 mb-4">適用タイミング</h2>
              <div className="space-y-3">
                <label className="flex items-center gap-3 p-3 rounded-lg border border-gray-200 cursor-pointer hover:bg-gray-50">
                  <input
                    type="radio"
                    name="timing"
                    value="next_month"
                    checked={timing === 'next_month'}
                    onChange={() => setTiming('next_month')}
                    className="w-4 h-4 text-blue-600"
                  />
                  <div>
                    <p className="text-sm font-medium text-gray-900">翌月1日から適用</p>
                    <p className="text-xs text-gray-500">現在の請求期間終了後に変更が適用されます</p>
                  </div>
                </label>
                <label className="flex items-center gap-3 p-3 rounded-lg border border-gray-200 cursor-pointer hover:bg-gray-50">
                  <input
                    type="radio"
                    name="timing"
                    value="immediate"
                    checked={timing === 'immediate'}
                    onChange={() => setTiming('immediate')}
                    className="w-4 h-4 text-blue-600"
                  />
                  <div>
                    <p className="text-sm font-medium text-gray-900">即時適用</p>
                    <p className="text-xs text-gray-500">本日から変更が適用されます（日割り計算）</p>
                  </div>
                </label>
              </div>

              <button
                onClick={() => setStep('confirm')}
                className="mt-4 px-6 py-2 rounded-md text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 transition-colors"
              >
                変更内容を確認
              </button>
            </section>
          )}

          <div className="text-center">
            <Link
              href="/mypage"
              className="inline-block px-6 py-3 rounded-lg border border-gray-300 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
            >
              マイページに戻る
            </Link>
          </div>
        </>
      )}
    </main>
  );
}
