'use client';

import React from 'react';
import type { AccountNotification } from '@/types/account';

interface NotificationListProps {
  notifications: AccountNotification[];
  unreadCount: number;
}

/**
 * お知らせ一覧コンポーネント
 * @param props - お知らせ情報
 */
export const NotificationList: React.FC<NotificationListProps> = ({
  notifications,
  unreadCount,
}) => {
  const getCategoryBadge = (category: AccountNotification['category']) => {
    switch (category) {
      case 'important':
        return <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-red-100 text-red-700">重要</span>;
      case 'billing':
        return <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-blue-100 text-blue-700">料金</span>;
      case 'campaign':
        return <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-green-100 text-green-700">キャンペーン</span>;
      case 'info':
        return <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-gray-100 text-gray-700">お知らせ</span>;
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200" aria-label="お知らせ">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-bold text-gray-900">お知らせ</h2>
        {unreadCount > 0 && (
          <span className="text-xs font-medium px-2 py-1 rounded-full bg-red-500 text-white">
            未読 {unreadCount}件
          </span>
        )}
      </div>
      <div className="space-y-3">
        {notifications.length === 0 ? (
          <p className="text-sm text-gray-500 text-center py-4">お知らせはありません</p>
        ) : (
          notifications.map((notification) => (
            <div
              key={notification.id}
              className={`p-3 rounded-lg border ${
                notification.isRead ? 'border-gray-100 bg-white' : 'border-blue-200 bg-blue-50'
              }`}
            >
              <div className="flex items-center gap-2 mb-1">
                {getCategoryBadge(notification.category)}
                {!notification.isRead && (
                  <span className="w-2 h-2 rounded-full bg-blue-600" aria-label="未読" />
                )}
                <span className="text-xs text-gray-400 ml-auto">{notification.date}</span>
              </div>
              <p className="text-sm font-medium text-gray-900">{notification.title}</p>
              <p className="text-xs text-gray-600 mt-1">{notification.message}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
