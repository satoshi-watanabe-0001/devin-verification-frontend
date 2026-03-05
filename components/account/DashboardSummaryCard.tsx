'use client';

import React from 'react';
import Link from 'next/link';

interface DashboardSummaryCardProps {
  planName: string;
  monthlyFee: number;
  dataCapacityGB: number;
  phoneNumber: string;
}

/**
 * ダッシュボード契約概要カード
 * @param props - 契約概要情報
 */
export const DashboardSummaryCard: React.FC<DashboardSummaryCardProps> = ({
  planName,
  monthlyFee,
  dataCapacityGB,
  phoneNumber,
}) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200" aria-label="契約概要">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-bold text-gray-900">ご契約情報</h2>
        <Link
          href="/mypage/contract"
          className="text-sm text-blue-600 hover:text-blue-800 hover:underline"
        >
          詳細を見る
        </Link>
      </div>
      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-600">ご利用プラン</span>
          <span className="text-sm font-semibold text-gray-900">{planName}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-600">月額料金</span>
          <span className="text-sm font-semibold text-gray-900">
            ¥{monthlyFee.toLocaleString()}
          </span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-600">データ容量</span>
          <span className="text-sm font-semibold text-gray-900">{dataCapacityGB}GB</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-600">電話番号</span>
          <span className="text-sm font-semibold text-gray-900">{phoneNumber}</span>
        </div>
      </div>
    </div>
  );
};
