'use client';

import { useState, useCallback } from 'react';
import { User, AuthState } from '@/types/auth.types';

/**
 * 認証状態を管理するカスタムフック
 * @returns 認証状態と認証関連の関数
 */
export const useAuth = () => {
  const [authState, setAuthState] = useState<AuthState>(() => {
    if (typeof window !== 'undefined') {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        try {
          const user: User = JSON.parse(storedUser);
          return {
            isAuthenticated: true,
            user,
          };
        } catch (error) {
          console.error('Failed to parse stored user data:', error);
          localStorage.removeItem('user');
        }
      }
    }
    return {
      isAuthenticated: false,
      user: null,
    };
  });

  /**
   * ログイン処理
   * @param email - メールアドレス
   */
  const login = useCallback(async (email: string) => {
    const mockUser: User = {
      id: '1',
      name: 'テストユーザー',
      email: email,
    };

    setAuthState({
      isAuthenticated: true,
      user: mockUser,
    });

    localStorage.setItem('user', JSON.stringify(mockUser));
  }, []);

  /**
   * ログアウト処理
   */
  const logout = useCallback(() => {
    setAuthState({
      isAuthenticated: false,
      user: null,
    });
    localStorage.removeItem('user');
  }, []);

  return {
    isAuthenticated: authState.isAuthenticated,
    user: authState.user,
    login,
    logout,
  };
};
