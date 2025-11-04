import React from 'react';
import Link from 'next/link';

/**
 * フッターコンポーネント
 */
export const Footer: React.FC = () => {
  const footerLinks = {
    services: [
      { label: '料金プラン', href: '/plan' },
      { label: '製品', href: '/smartphones' },
      { label: 'サービス', href: '/services' },
      { label: '申し込みの流れ', href: '/flow' },
    ],
    support: [
      { label: 'よくある質問', href: '/faq' },
      { label: 'お問い合わせ', href: '/contact' },
      { label: 'サポート', href: '/support' },
      { label: 'お知らせ', href: '/news' },
    ],
    company: [
      { label: '会社概要', href: '/about' },
      { label: '利用規約', href: '/terms' },
      { label: 'プライバシーポリシー', href: '/privacy' },
    ],
  };

  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 md:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="text-2xl font-bold mb-4">ahamo</h3>
            <p className="text-gray-400 text-sm">
              シンプルでわかりやすい料金プラン。
              <br />
              月額2,970円で20GB使える。
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-4">サービス</h4>
            <ul className="space-y-2">
              {footerLinks.services.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-white transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">サポート</h4>
            <ul className="space-y-2">
              {footerLinks.support.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-white transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">会社情報</h4>
            <ul className="space-y-2">
              {footerLinks.company.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-white transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 text-center">
          <p className="text-gray-400 text-sm">
            © 2025 ahamo. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};
