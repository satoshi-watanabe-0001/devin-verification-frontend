'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/hooks/useAuth';
import { useContractInfo } from '@/hooks/useContractInfo';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import { ErrorMessage } from '@/components/ui/ErrorMessage';

/**
 * 契約情報詳細ページ
 * EC-278: 契約者情報と契約詳細を表示
 */
export default function ContractPage() {
  const router = useRouter();
  const { isAuthenticated } = useAuth();
  const { contractInfo, loading, error } = useContractInfo();

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

  if (!contractInfo) return null;

  const { contractor, contract } = contractInfo;

  return (
    <main className="container mx-auto px-4 py-8 max-w-3xl">
      <nav className="mb-4 text-sm text-gray-500" aria-label="パンくずリスト">
        <Link href="/mypage" className="hover:text-blue-600">マイページ</Link>
        <span className="mx-2">/</span>
        <span className="text-gray-900">ご契約内容</span>
      </nav>

      <h1 className="text-2xl font-bold text-gray-900 mb-6">ご契約内容</h1>

      {/* 契約者情報 */}
      <section className="bg-white rounded-lg shadow-md p-6 border border-gray-200 mb-6">
        <h2 className="text-lg font-bold text-gray-900 mb-4">契約者情報</h2>
        <dl className="space-y-3">
          <div className="flex flex-col sm:flex-row sm:justify-between">
            <dt className="text-sm text-gray-600">お名前</dt>
            <dd className="text-sm font-medium text-gray-900">{contractor.name}（{contractor.nameKana}）</dd>
          </div>
          <hr />
          <div className="flex flex-col sm:flex-row sm:justify-between">
            <dt className="text-sm text-gray-600">生年月日</dt>
            <dd className="text-sm font-medium text-gray-900">{contractor.birthDate}</dd>
          </div>
          <hr />
          <div className="flex flex-col sm:flex-row sm:justify-between">
            <dt className="text-sm text-gray-600">ご住所</dt>
            <dd className="text-sm font-medium text-gray-900">〒{contractor.postalCode} {contractor.address}</dd>
          </div>
          <hr />
          <div className="flex flex-col sm:flex-row sm:justify-between">
            <dt className="text-sm text-gray-600">電話番号</dt>
            <dd className="text-sm font-medium text-gray-900">{contractor.phoneNumber}</dd>
          </div>
          <hr />
          <div className="flex flex-col sm:flex-row sm:justify-between">
            <dt className="text-sm text-gray-600">メールアドレス</dt>
            <dd className="text-sm font-medium text-gray-900">{contractor.email}</dd>
          </div>
        </dl>
      </section>

      {/* 契約詳細 */}
      <section className="bg-white rounded-lg shadow-md p-6 border border-gray-200 mb-6">
        <h2 className="text-lg font-bold text-gray-900 mb-4">契約詳細</h2>
        <dl className="space-y-3">
          <div className="flex flex-col sm:flex-row sm:justify-between">
            <dt className="text-sm text-gray-600">ご利用電話番号</dt>
            <dd className="text-sm font-medium text-gray-900">{contract.phoneNumber}</dd>
          </div>
          <hr />
          <div className="flex flex-col sm:flex-row sm:justify-between">
            <dt className="text-sm text-gray-600">契約日</dt>
            <dd className="text-sm font-medium text-gray-900">{contract.contractDate}</dd>
          </div>
          <hr />
          <div className="flex flex-col sm:flex-row sm:justify-between">
            <dt className="text-sm text-gray-600">ご利用プラン</dt>
            <dd className="text-sm font-medium text-gray-900">
              {contract.planName}（{contract.dataCapacity} / 月額¥{contract.monthlyFee.toLocaleString()}）
            </dd>
          </div>
          <hr />
          <div>
            <dt className="text-sm text-gray-600 mb-2">オプションサービス</dt>
            <dd>
              {contract.optionServices.length === 0 ? (
                <p className="text-sm text-gray-500">加入中のオプションサービスはありません</p>
              ) : (
                <ul className="space-y-2">
                  {contract.optionServices.map((option) => (
                    <li key={option.id} className="flex justify-between items-center p-2 bg-gray-50 rounded">
                      <span className="text-sm text-gray-900">{option.name}</span>
                      <span className="text-sm text-gray-600">月額¥{option.monthlyFee.toLocaleString()}</span>
                    </li>
                  ))}
                </ul>
              )}
            </dd>
          </div>
        </dl>
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
