import React from 'react';
import Link from 'next/link';
import { SectionContainer } from '@/components/ui/SectionContainer';

/**
 * サポートセクションコンポーネント
 * サポート情報へのクイックアクセスを提供
 */
export const SupportSection: React.FC = () => {
  const supportLinks = [
    {
      id: 1,
      icon: '❓',
      title: 'よくある質問',
      description: 'お客様からよくいただく質問と回答',
      href: '/faq',
    },
    {
      id: 2,
      icon: '💬',
      title: 'チャットサポート',
      description: '24時間365日対応のチャットサポート',
      href: '/support/chat',
    },
    {
      id: 3,
      icon: '📧',
      title: 'お問い合わせ',
      description: 'メールでのお問い合わせはこちら',
      href: '/contact',
    },
    {
      id: 4,
      icon: '📱',
      title: '契約内容の確認・変更',
      description: 'プラン変更や契約情報の確認',
      href: '/mypage',
    },
    {
      id: 5,
      icon: '🔧',
      title: '各種手続き',
      description: 'SIM再発行、解約などの手続き',
      href: '/support/procedures',
    },
    {
      id: 6,
      icon: '📖',
      title: '利用ガイド',
      description: 'ahamoの使い方・設定方法',
      href: '/support/guide',
    },
  ];

  return (
    <SectionContainer background="white">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          サポート
        </h2>
        <p className="text-lg text-gray-600">
          お困りの際はこちらからお問い合わせください
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {supportLinks.map((link) => (
          <Link
            key={link.id}
            href={link.href}
            className="block bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 p-6 border border-gray-100 hover:border-blue-300"
          >
            <div className="text-5xl mb-4 text-center">{link.icon}</div>
            <h3 className="text-xl font-bold text-gray-900 mb-3 text-center">
              {link.title}
            </h3>
            <p className="text-gray-600 text-center text-sm leading-relaxed">
              {link.description}
            </p>
          </Link>
        ))}
      </div>

      <div className="text-center mt-12">
        <Link
          href="/support"
          className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-medium rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all shadow-lg hover:shadow-xl"
        >
          サポートページへ
          <svg
            className="w-5 h-5 ml-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </Link>
      </div>
    </SectionContainer>
  );
};
