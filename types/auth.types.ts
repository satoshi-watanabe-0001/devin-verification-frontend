/**
 * 認証関連の型定義
 */

export interface User {
  id: string;
  name: string;
  email: string;
}

export interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
}

export interface AuthContextType extends AuthState {
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}
