'use client';

import React from 'react';
import Link from 'next/link';

interface SupportItem {
  label: string;
  href: string;
  icon: 'chat' | 'faq' | 'form' | 'phone';
  description: string;
}

const supportItems: SupportItem[] = [
  {
    label: 'チャットサポート',
    href: '/support',
    icon: 'chat',
    description: 'AIチャットで24時間対応',
  },
  {
    label: 'よくある質問',
    href: '/support',
    icon: 'faq',
    description: 'FAQ・トラブルシューティング',
  },
  {
    label: 'お問い合わせフォーム',
    href: '/support',
    icon: 'form',
    description: 'テキストでのお問い合わせ',
  },
  {
    label: '電話サポート',
    href: '/support',
    icon: 'phone',
    description: '有料（1回3,300円）',
  },
];

const iconMap = {
  chat: (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
    </svg>
  ),
  faq: (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
  form: (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg>
  ),
  phone: (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
    </svg>
  ),
};

/**
 * サポートアクセスセクション
 */
export const SupportAccessSection: React.FC = () => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200" aria-label="サポート">
      <h2 className="text-lg font-bold text-gray-900 mb-4">サポート</h2>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {supportItems.map((item) => (
          <Link
            key={item.label}
            href={item.href}
            className="flex flex-col items-center p-4 rounded-lg border border-gray-200 hover:bg-blue-50 hover:border-blue-300 transition-colors group text-center"
          >
            <div className="text-gray-400 group-hover:text-blue-600 mb-2">
              {iconMap[item.icon]}
            </div>
            <p className="text-sm font-medium text-gray-900 group-hover:text-blue-700">
              {item.label}
            </p>
            <p className="text-xs text-gray-500 mt-1">{item.description}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};
