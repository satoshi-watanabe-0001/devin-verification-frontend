'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/hooks/useAuth';
import { AccountApiService } from '@/services/accountService';

/**
 * アカウント設定ページ
 * EC-278: 連絡先情報・パスワード変更・通知設定
 */
export default function SettingsPage() {
  const router = useRouter();
  const { isAuthenticated } = useAuth();

  // パスワード変更フォーム
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [passwordSuccess, setPasswordSuccess] = useState('');
  const [passwordLoading, setPasswordLoading] = useState(false);

  // 通知設定
  const [emailNotification, setEmailNotification] = useState(true);
  const [smsNotification, setSmsNotification] = useState(true);
  const [billingNotif, setBillingNotif] = useState(true);
  const [dataUsageNotif, setDataUsageNotif] = useState(true);
  const [campaignNotif, setCampaignNotif] = useState(true);
  const [maintenanceNotif, setMaintenanceNotif] = useState(true);
  const [notifSuccess, setNotifSuccess] = useState('');
  const [notifLoading, setNotifLoading] = useState(false);

  // 確認画面
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login');
    }
  }, [isAuthenticated, router]);

  if (!isAuthenticated) return null;

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordError('');
    setPasswordSuccess('');

    if (!currentPassword) {
      setPasswordError('現在のパスワードを入力してください。');
      return;
    }
    if (newPassword.length < 8) {
      setPasswordError('新しいパスワードは8文字以上で入力してください。');
      return;
    }
    if (newPassword !== confirmPassword) {
      setPasswordError('新しいパスワードと確認用パスワードが一致しません。');
      return;
    }

    setShowPasswordConfirm(true);
  };

  const confirmPasswordChange = async () => {
    setPasswordLoading(true);
    setShowPasswordConfirm(false);
    try {
      await AccountApiService.changePassword({
        currentPassword,
        newPassword,
        confirmPassword,
      });
      setPasswordSuccess('パスワードを変更しました。');
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
    } catch {
      setPasswordError('パスワードの変更に失敗しました。もう一度お試しください。');
    } finally {
      setPasswordLoading(false);
    }
  };

  const handleNotificationSave = async () => {
    setNotifLoading(true);
    setNotifSuccess('');
    try {
      await AccountApiService.updateNotificationSettings({
        emailNotification,
        smsNotification,
        categories: {
          billing: billingNotif,
          dataUsage: dataUsageNotif,
          campaign: campaignNotif,
          maintenance: maintenanceNotif,
        },
      });
      setNotifSuccess('通知設定を更新しました。');
    } catch {
      // Error is logged in service
    } finally {
      setNotifLoading(false);
    }
  };

  return (
    <main className="container mx-auto px-4 py-8 max-w-3xl">
      <nav className="mb-4 text-sm text-gray-500" aria-label="パンくずリスト">
        <Link href="/mypage" className="hover:text-blue-600">マイページ</Link>
        <span className="mx-2">/</span>
        <span className="text-gray-900">アカウント設定</span>
      </nav>

      <h1 className="text-2xl font-bold text-gray-900 mb-6">アカウント設定</h1>

      {/* パスワード変更 */}
      <section className="bg-white rounded-lg shadow-md p-6 border border-gray-200 mb-6">
        <h2 className="text-lg font-bold text-gray-900 mb-4">パスワード変更</h2>

        {showPasswordConfirm ? (
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <p className="text-sm text-yellow-800 mb-4">パスワードを変更してよろしいですか？</p>
            <div className="flex gap-3">
              <button
                onClick={confirmPasswordChange}
                disabled={passwordLoading}
                className="px-4 py-2 rounded-md text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-50 transition-colors"
              >
                {passwordLoading ? '変更中...' : '変更する'}
              </button>
              <button
                onClick={() => setShowPasswordConfirm(false)}
                className="px-4 py-2 rounded-md text-sm font-medium text-gray-700 border border-gray-300 hover:bg-gray-50 transition-colors"
              >
                キャンセル
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handlePasswordSubmit} className="space-y-4">
            {passwordError && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-3" role="alert">
                <p className="text-sm text-red-800">{passwordError}</p>
              </div>
            )}
            {passwordSuccess && (
              <div className="bg-green-50 border border-green-200 rounded-lg p-3" role="alert">
                <p className="text-sm text-green-800">{passwordSuccess}</p>
              </div>
            )}
            <div>
              <label htmlFor="currentPassword" className="block text-sm font-medium text-gray-700 mb-1">
                現在のパスワード
              </label>
              <input
                id="currentPassword"
                type="password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                aria-label="現在のパスワード"
              />
            </div>
            <div>
              <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700 mb-1">
                新しいパスワード
              </label>
              <input
                id="newPassword"
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                aria-label="新しいパスワード"
                minLength={8}
              />
              <p className="text-xs text-gray-500 mt-1">8文字以上で入力してください</p>
            </div>
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                新しいパスワード（確認）
              </label>
              <input
                id="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                aria-label="新しいパスワード確認"
              />
            </div>
            <button
              type="submit"
              disabled={passwordLoading}
              className="px-6 py-2 rounded-md text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-50 transition-colors"
            >
              パスワードを変更
            </button>
          </form>
        )}
      </section>

      {/* 通知設定 */}
      <section className="bg-white rounded-lg shadow-md p-6 border border-gray-200 mb-6">
        <h2 className="text-lg font-bold text-gray-900 mb-4">通知設定</h2>

        {notifSuccess && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-3 mb-4" role="alert">
            <p className="text-sm text-green-800">{notifSuccess}</p>
          </div>
        )}

        <div className="space-y-4">
          <h3 className="text-sm font-semibold text-gray-700">通知方法</h3>
          <div className="space-y-3">
            <label className="flex items-center justify-between">
              <span className="text-sm text-gray-700">メール通知</span>
              <button
                type="button"
                role="switch"
                aria-checked={emailNotification}
                onClick={() => setEmailNotification(!emailNotification)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  emailNotification ? 'bg-blue-600' : 'bg-gray-300'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    emailNotification ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </label>
            <label className="flex items-center justify-between">
              <span className="text-sm text-gray-700">SMS通知</span>
              <button
                type="button"
                role="switch"
                aria-checked={smsNotification}
                onClick={() => setSmsNotification(!smsNotification)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  smsNotification ? 'bg-blue-600' : 'bg-gray-300'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    smsNotification ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </label>
          </div>

          <hr />

          <h3 className="text-sm font-semibold text-gray-700">通知カテゴリ</h3>
          <div className="space-y-3">
            {[
              { label: '料金・請求関連', value: billingNotif, setter: setBillingNotif },
              { label: 'データ使用量', value: dataUsageNotif, setter: setDataUsageNotif },
              { label: 'キャンペーン・おすすめ', value: campaignNotif, setter: setCampaignNotif },
              { label: 'メンテナンス・障害情報', value: maintenanceNotif, setter: setMaintenanceNotif },
            ].map((item) => (
              <label key={item.label} className="flex items-center justify-between">
                <span className="text-sm text-gray-700">{item.label}</span>
                <button
                  type="button"
                  role="switch"
                  aria-checked={item.value}
                  onClick={() => item.setter(!item.value)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    item.value ? 'bg-blue-600' : 'bg-gray-300'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      item.value ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </label>
            ))}
          </div>

          <button
            onClick={handleNotificationSave}
            disabled={notifLoading}
            className="mt-4 px-6 py-2 rounded-md text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-50 transition-colors"
          >
            {notifLoading ? '保存中...' : '通知設定を保存'}
          </button>
        </div>
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
