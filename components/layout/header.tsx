'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';

/**
 * Headerコンポーネント
 * DEVIN-1: 5つのナビゲーション項目、アクティブページハイライト、認証状態対応、検索スペース確保、レスポンシブデザイン
 * @returns JSX.Element
 */
export const Header: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const { isAuthenticated, logout } = useAuth();

  const navigationItems = [
    { label: 'ホーム', href: '/' },
    { label: '料金プラン', href: '/plan' },
    { label: '製品', href: '/smartphones' },
    { label: 'サービス', href: '/services' },
    { label: '申し込みの流れ', href: '/flow' },
    { label: 'サポート', href: '/support' },
  ];

  /**
   * アクティブページかどうかを判定
   * @param href - リンク先のパス
   * @returns アクティブページの場合true
   */
  const isActive = (href: string): boolean => {
    if (href === '/') {
      return pathname === '/';
    }
    return pathname.startsWith(href);
  };

  /**
   * モバイルメニューの開閉を切り替え
   */
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  /**
   * ログアウト処理
   */
  const handleLogout = () => {
    logout();
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-white shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* ロゴ */}
          <div className="flex-shrink-0">
            <Link href="/" className="text-2xl font-bold text-blue-600">
              ahamo
            </Link>
          </div>

          {/* デスクトップナビゲーション */}
          <nav className="hidden md:flex items-center space-x-1" aria-label="メインナビゲーション">
            {navigationItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive(item.href)
                    ? 'bg-blue-100 text-blue-700 border-b-2 border-blue-600'
                    : 'text-gray-700 hover:bg-gray-100 hover:text-blue-600'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* 検索スペース（将来の統合用） */}
          <div className="hidden md:flex items-center space-x-4">
            <div className="w-8 h-8 flex items-center justify-center text-gray-400">
              {/* 検索アイコン用のスペース確保 - PBI-CM-003で実装予定 */}
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>

            {/* 認証状態に応じたボタン切り替え */}
            {isAuthenticated ? (
              <div className="flex items-center space-x-2">
                <Link
                  href="/mypage"
                  className="px-4 py-2 rounded-md text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 transition-colors"
                >
                  マイページ
                </Link>
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 rounded-md text-sm font-medium text-gray-700 border border-gray-300 hover:bg-gray-50 transition-colors"
                >
                  ログアウト
                </button>
              </div>
            ) : (
              <Link
                href="/login"
                className="px-4 py-2 rounded-md text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 transition-colors"
              >
                ログイン
              </Link>
            )}
          </div>

          {/* ハンバーガーメニューボタン（モバイル） */}
          <button
            onClick={toggleMobileMenu}
            className="md:hidden p-2 rounded-md text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-600"
            aria-label="メニューを開く"
            aria-expanded={isMobileMenuOpen}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              {isMobileMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {/* モバイルメニュー */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200">
            <nav className="flex flex-col space-y-2" aria-label="モバイルナビゲーション">
              {navigationItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                    isActive(item.href)
                      ? 'bg-blue-100 text-blue-700 border-l-4 border-blue-600'
                      : 'text-gray-700 hover:bg-gray-100 hover:text-blue-600'
                  }`}
                >
                  {item.label}
                </Link>
              ))}

              {/* 検索スペース（モバイル） */}
              <div className="px-4 py-2 flex items-center text-gray-400">
                <svg
                  className="w-5 h-5 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
                <span className="text-sm">検索（準備中）</span>
              </div>

              {/* 認証状態に応じたボタン切り替え（モバイル） */}
              <div className="px-4 pt-4 border-t border-gray-200 space-y-2">
                {isAuthenticated ? (
                  <>
                    <Link
                      href="/mypage"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="block w-full px-4 py-2 rounded-md text-sm font-medium text-center text-white bg-blue-600 hover:bg-blue-700 transition-colors"
                    >
                      マイページ
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="block w-full px-4 py-2 rounded-md text-sm font-medium text-center text-gray-700 border border-gray-300 hover:bg-gray-50 transition-colors"
                    >
                      ログアウト
                    </button>
                  </>
                ) : (
                  <Link
                    href="/login"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block w-full px-4 py-2 rounded-md text-sm font-medium text-center text-white bg-blue-600 hover:bg-blue-700 transition-colors"
                  >
                    ログイン
                  </Link>
                )}
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
