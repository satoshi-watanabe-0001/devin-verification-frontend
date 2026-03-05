'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/hooks/useAuth';
import { AccountApiService } from '@/services/accountService';
import type { OptionService } from '@/types/account';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import { ErrorMessage } from '@/components/ui/ErrorMessage';

/**
 * オプション管理ページ
 * EC-278: オプションサービスの一覧・追加・解約
 */
export default function OptionsPage() {
  const router = useRouter();
  const { isAuthenticated } = useAuth();
  const [options, setOptions] = useState<OptionService[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [actionLoading, setActionLoading] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login');
    }
  }, [isAuthenticated, router]);

  useEffect(() => {
    const fetchOptions = async () => {
      try {
        setLoading(true);
        const result = await AccountApiService.getOptions();
        setOptions(result);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'オプション情報の取得に失敗しました');
      } finally {
        setLoading(false);
      }
    };
    if (isAuthenticated) {
      fetchOptions();
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

  const handleToggleOption = async (optionId: string, subscribe: boolean) => {
    setActionLoading(optionId);
    setSuccessMessage('');
    try {
      await AccountApiService.toggleOption(optionId, subscribe);
      setOptions((prev) =>
        prev.map((opt) =>
          opt.id === optionId ? { ...opt, isSubscribed: subscribe } : opt
        )
      );
      setSuccessMessage(subscribe ? 'オプションに加入しました。' : 'オプションを解約しました。');
    } catch {
      setError('オプション変更に失敗しました。もう一度お試しください。');
    } finally {
      setActionLoading(null);
    }
  };

  const getCategoryLabel = (category: OptionService['category']) => {
    switch (category) {
      case 'calling': return '通話';
      case 'data': return 'データ';
      case 'insurance': return '補償・保険';
      case 'other': return 'その他';
    }
  };

  const subscribedOptions = options.filter((o) => o.isSubscribed);
  const availableOptions = options.filter((o) => !o.isSubscribed);

  return (
    <main className="container mx-auto px-4 py-8 max-w-3xl">
      <nav className="mb-4 text-sm text-gray-500" aria-label="パンくずリスト">
        <Link href="/mypage" className="hover:text-blue-600">マイページ</Link>
        <span className="mx-2">/</span>
        <span className="text-gray-900">オプション管理</span>
      </nav>

      <h1 className="text-2xl font-bold text-gray-900 mb-6">オプション管理</h1>

      {successMessage && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-3 mb-6" role="alert">
          <p className="text-sm text-green-800">{successMessage}</p>
        </div>
      )}

      {/* 加入中のオプション */}
      <section className="mb-6">
        <h2 className="text-lg font-bold text-gray-900 mb-4">加入中のオプション</h2>
        {subscribedOptions.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
            <p className="text-sm text-gray-500 text-center">加入中のオプションはありません</p>
          </div>
        ) : (
          <div className="space-y-3">
            {subscribedOptions.map((option) => (
              <div key={option.id} className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-blue-100 text-blue-700">
                        {getCategoryLabel(option.category)}
                      </span>
                      <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-green-100 text-green-700">
                        加入中
                      </span>
                    </div>
                    <h3 className="text-base font-bold text-gray-900">{option.name}</h3>
                    <p className="text-xs text-gray-600 mt-1">{option.description}</p>
                    <p className="text-sm font-semibold text-gray-900 mt-2">
                      月額¥{option.monthlyFee.toLocaleString()}
                    </p>
                  </div>
                  <button
                    onClick={() => handleToggleOption(option.id, false)}
                    disabled={actionLoading === option.id}
                    className="ml-4 px-4 py-2 rounded-md text-sm font-medium text-red-600 border border-red-300 hover:bg-red-50 disabled:opacity-50 transition-colors flex-shrink-0"
                  >
                    {actionLoading === option.id ? '処理中...' : '解約'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* 利用可能なオプション */}
      <section className="mb-6">
        <h2 className="text-lg font-bold text-gray-900 mb-4">追加可能なオプション</h2>
        {availableOptions.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
            <p className="text-sm text-gray-500 text-center">追加可能なオプションはありません</p>
          </div>
        ) : (
          <div className="space-y-3">
            {availableOptions.map((option) => (
              <div key={option.id} className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-blue-100 text-blue-700">
                        {getCategoryLabel(option.category)}
                      </span>
                    </div>
                    <h3 className="text-base font-bold text-gray-900">{option.name}</h3>
                    <p className="text-xs text-gray-600 mt-1">{option.description}</p>
                    <p className="text-sm font-semibold text-gray-900 mt-2">
                      月額¥{option.monthlyFee.toLocaleString()}
                    </p>
                  </div>
                  <button
                    onClick={() => handleToggleOption(option.id, true)}
                    disabled={actionLoading === option.id}
                    className="ml-4 px-4 py-2 rounded-md text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-50 transition-colors flex-shrink-0"
                  >
                    {actionLoading === option.id ? '処理中...' : '追加'}
                  </button>
                </div>
              </div>
            ))}
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
