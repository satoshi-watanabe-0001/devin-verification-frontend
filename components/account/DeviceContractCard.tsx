'use client';

import React from 'react';
import type { DeviceContract } from '@/types/account';

interface DeviceContractCardProps {
  device: DeviceContract;
}

/**
 * 契約端末情報カード
 * @param props - 端末情報
 */
export const DeviceContractCard: React.FC<DeviceContractCardProps> = ({ device }) => {
  const remainingPayments = device.totalPayments - device.completedPayments;
  const progressPercentage = (device.completedPayments / device.totalPayments) * 100;

  return (
    <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200" aria-label="契約端末">
      <h2 className="text-lg font-bold text-gray-900 mb-4">ご利用端末</h2>
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="w-20 h-20 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
          <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
          </svg>
        </div>
        <div className="flex-1 space-y-2">
          <div>
            <p className="text-sm font-semibold text-gray-900">{device.deviceName}</p>
            <p className="text-xs text-gray-500">{device.manufacturer}</p>
          </div>
          <div className="flex justify-between items-center text-sm">
            <span className="text-gray-600">購入日</span>
            <span className="text-gray-900">{device.purchaseDate}</span>
          </div>
          <div className="flex justify-between items-center text-sm">
            <span className="text-gray-600">月々のお支払い</span>
            <span className="font-semibold text-gray-900">¥{device.monthlyPayment.toLocaleString()}</span>
          </div>
          <div>
            <div className="flex justify-between items-center text-sm mb-1">
              <span className="text-gray-600">分割払い</span>
              <span className="text-gray-900">{device.completedPayments}/{device.totalPayments}回</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-blue-600 h-full rounded-full transition-all"
                style={{ width: `${progressPercentage}%` }}
              />
            </div>
            <p className="text-xs text-gray-500 mt-1">
              残り{remainingPayments}回（¥{device.remainingAmount.toLocaleString()}）
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
