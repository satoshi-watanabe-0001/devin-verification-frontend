/**
 * アカウント管理 API サービス
 * EC-278: ahamo マイページシステム
 */

import type {
  AccountDashboard,
  ContractInfo,
  DataUsage,
  BillingInfo,
  OptionService,
  AvailablePlan,
  ProfileUpdateRequest,
  PasswordChangeRequest,
  NotificationSettings,
  PlanChangeRequest,
} from '@/types/account';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080';

/**
 * 認証トークンを取得するヘルパー
 */
function getAuthHeaders(): HeadersInit {
  const token = typeof window !== 'undefined' ? localStorage.getItem('auth_token') : null;
  return {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
}

/**
 * レスポンスを処理するヘルパー
 */
async function handleResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    if (response.status === 401) {
      throw new Error('認証が必要です。再度ログインしてください。');
    }
    if (response.status === 403) {
      throw new Error('アクセス権限がありません。');
    }
    if (response.status === 500) {
      throw new Error('サーバーエラーが発生しました。しばらくしてから再度お試しください。');
    }
    throw new Error('リクエストに失敗しました。');
  }
  const json = await response.json();
  return json.data;
}

export class AccountApiService {
  /**
   * ダッシュボード集約データを取得
   */
  static async getDashboard(): Promise<AccountDashboard> {
    try {
      const response = await fetch(`${API_BASE_URL}/api/v1/account/dashboard`, {
        headers: getAuthHeaders(),
      });
      return await handleResponse<AccountDashboard>(response);
    } catch (error) {
      console.error('ダッシュボードデータの取得に失敗しました:', error);
      throw error;
    }
  }

  /**
   * 契約情報を取得
   */
  static async getContractInfo(): Promise<ContractInfo> {
    try {
      const response = await fetch(`${API_BASE_URL}/api/v1/account/contract`, {
        headers: getAuthHeaders(),
      });
      return await handleResponse<ContractInfo>(response);
    } catch (error) {
      console.error('契約情報の取得に失敗しました:', error);
      throw error;
    }
  }

  /**
   * データ使用量を取得
   */
  static async getDataUsage(): Promise<DataUsage> {
    try {
      const response = await fetch(`${API_BASE_URL}/api/v1/account/data-usage`, {
        headers: getAuthHeaders(),
      });
      return await handleResponse<DataUsage>(response);
    } catch (error) {
      console.error('データ使用量の取得に失敗しました:', error);
      throw error;
    }
  }

  /**
   * 請求情報を取得
   */
  static async getBillingInfo(): Promise<BillingInfo> {
    try {
      const response = await fetch(`${API_BASE_URL}/api/v1/account/billing`, {
        headers: getAuthHeaders(),
      });
      return await handleResponse<BillingInfo>(response);
    } catch (error) {
      console.error('請求情報の取得に失敗しました:', error);
      throw error;
    }
  }

  /**
   * オプションサービス一覧を取得
   */
  static async getOptions(): Promise<OptionService[]> {
    try {
      const response = await fetch(`${API_BASE_URL}/api/v1/account/options`, {
        headers: getAuthHeaders(),
      });
      return await handleResponse<OptionService[]>(response);
    } catch (error) {
      console.error('オプションサービスの取得に失敗しました:', error);
      throw error;
    }
  }

  /**
   * 利用可能プラン一覧を取得
   */
  static async getAvailablePlans(): Promise<AvailablePlan[]> {
    try {
      const response = await fetch(`${API_BASE_URL}/api/v1/account/plans`, {
        headers: getAuthHeaders(),
      });
      return await handleResponse<AvailablePlan[]>(response);
    } catch (error) {
      console.error('利用可能プランの取得に失敗しました:', error);
      throw error;
    }
  }

  /**
   * 連絡先情報を更新
   */
  static async updateProfile(data: ProfileUpdateRequest): Promise<void> {
    try {
      const response = await fetch(`${API_BASE_URL}/api/v1/account/profile`, {
        method: 'PUT',
        headers: getAuthHeaders(),
        body: JSON.stringify(data),
      });
      await handleResponse<null>(response);
    } catch (error) {
      console.error('連絡先情報の更新に失敗しました:', error);
      throw error;
    }
  }

  /**
   * パスワードを変更
   */
  static async changePassword(data: PasswordChangeRequest): Promise<void> {
    try {
      const response = await fetch(`${API_BASE_URL}/api/v1/account/password`, {
        method: 'PUT',
        headers: getAuthHeaders(),
        body: JSON.stringify(data),
      });
      await handleResponse<null>(response);
    } catch (error) {
      console.error('パスワードの変更に失敗しました:', error);
      throw error;
    }
  }

  /**
   * 通知設定を更新
   */
  static async updateNotificationSettings(data: NotificationSettings): Promise<void> {
    try {
      const response = await fetch(`${API_BASE_URL}/api/v1/account/notifications`, {
        method: 'PUT',
        headers: getAuthHeaders(),
        body: JSON.stringify(data),
      });
      await handleResponse<null>(response);
    } catch (error) {
      console.error('通知設定の更新に失敗しました:', error);
      throw error;
    }
  }

  /**
   * プランを変更
   */
  static async changePlan(data: PlanChangeRequest): Promise<void> {
    try {
      const response = await fetch(`${API_BASE_URL}/api/v1/account/plan`, {
        method: 'PUT',
        headers: getAuthHeaders(),
        body: JSON.stringify(data),
      });
      await handleResponse<null>(response);
    } catch (error) {
      console.error('プラン変更に失敗しました:', error);
      throw error;
    }
  }

  /**
   * オプションサービスの契約/解約
   */
  static async toggleOption(optionId: string, subscribe: boolean): Promise<void> {
    try {
      const response = await fetch(`${API_BASE_URL}/api/v1/account/options/${optionId}`, {
        method: 'PUT',
        headers: getAuthHeaders(),
        body: JSON.stringify({ subscribe }),
      });
      await handleResponse<null>(response);
    } catch (error) {
      console.error('オプション変更に失敗しました:', error);
      throw error;
    }
  }
}
