'use client';

import React from 'react';
import Link from 'next/link';

interface DataUsageProgressBarProps {
  usedGB: number;
  totalGB: number;
  remainingGB: number;
  usagePercentage: number;
}

/**
 * データ使用量プログレスバー
 * @param props - データ使用量情報
 */
export const DataUsageProgressBar: React.FC<DataUsageProgressBarProps> = ({
  usedGB,
  totalGB,
  remainingGB,
  usagePercentage,
}) => {
  const getBarColor = () => {
    if (usagePercentage >= 90) return 'bg-red-500';
    if (usagePercentage >= 70) return 'bg-yellow-500';
    return 'bg-blue-600';
  };

  const getStatusText = () => {
    if (usagePercentage >= 90) return '残りわずか';
    if (usagePercentage >= 70) return '注意';
    return '余裕あり';
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200" aria-label="データ使用量">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-bold text-gray-900">データ使用量</h2>
        <Link
          href="/mypage/data-usage"
          className="text-sm text-blue-600 hover:text-blue-800 hover:underline"
        >
          詳細を見る
        </Link>
      </div>

      <div className="mb-2">
        <div className="flex justify-between items-end mb-1">
          <div>
            <span className="text-3xl font-bold text-gray-900">{usedGB}</span>
            <span className="text-sm text-gray-500 ml-1">GB / {totalGB}GB</span>
          </div>
          <span className={`text-xs font-medium px-2 py-1 rounded-full ${
            usagePercentage >= 90
              ? 'bg-red-100 text-red-700'
              : usagePercentage >= 70
                ? 'bg-yellow-100 text-yellow-700'
                : 'bg-green-100 text-green-700'
          }`}>
            {getStatusText()}
          </span>
        </div>

        <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden" role="progressbar" aria-valuenow={usagePercentage} aria-valuemin={0} aria-valuemax={100}>
          <div
            className={`h-full rounded-full transition-all duration-500 ${getBarColor()}`}
            style={{ width: `${Math.min(usagePercentage, 100)}%` }}
          />
        </div>

        <div className="flex justify-between mt-2">
          <span className="text-xs text-gray-500">使用済み: {usedGB}GB</span>
          <span className="text-xs text-gray-500">残り: {remainingGB}GB</span>
        </div>
      </div>
    </div>
  );
};
