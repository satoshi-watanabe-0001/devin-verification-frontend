/**
 * アカウント管理（マイページ）関連の型定義
 * EC-278: ahamo アカウント管理システム
 */

/**
 * 契約者情報
 */
export interface ContractorInfo {
  name: string;
  nameKana: string;
  birthDate: string;
  postalCode: string;
  address: string;
  phoneNumber: string;
  email: string;
}

/**
 * 契約詳細情報
 */
export interface ContractDetail {
  phoneNumber: string;
  contractDate: string;
  planName: string;
  planId: string;
  monthlyFee: number;
  dataCapacity: string;
  dataCapacityGB: number;
  optionServices: OptionServiceSummary[];
}

/**
 * 契約情報（契約者情報 + 契約詳細）
 */
export interface ContractInfo {
  contractor: ContractorInfo;
  contract: ContractDetail;
}

/**
 * 日次データ使用量
 */
export interface DailyUsage {
  date: string;
  usageGB: number;
}

/**
 * 月次データ使用量
 */
export interface MonthlyUsage {
  month: string;
  usageGB: number;
  capacityGB: number;
}

/**
 * データチャージ履歴
 */
export interface DataChargeHistory {
  id: string;
  chargeDate: string;
  amountGB: number;
  price: number;
  expirationDate: string;
}

/**
 * データ使用量情報
 */
export interface DataUsage {
  currentMonth: {
    usedGB: number;
    totalGB: number;
    remainingGB: number;
    usagePercentage: number;
    billingPeriodStart: string;
    billingPeriodEnd: string;
  };
  dailyUsage: DailyUsage[];
  monthlyHistory: MonthlyUsage[];
  chargeHistory: DataChargeHistory[];
}

/**
 * 請求明細
 */
export interface BillingDetail {
  baseFee: number;
  callCharges: number;
  optionFees: number;
  discounts: number;
  tax: number;
  totalAmount: number;
}

/**
 * 請求履歴エントリ
 */
export interface BillingHistoryEntry {
  id: string;
  billingMonth: string;
  amount: number;
  paymentStatus: 'paid' | 'pending' | 'overdue';
  paidDate?: string;
  receiptUrl?: string;
}

/**
 * 支払い方法
 */
export interface PaymentMethod {
  id: string;
  type: 'credit_card' | 'bank_account';
  displayName: string;
  maskedNumber: string;
  expirationDate?: string;
  isDefault: boolean;
}

/**
 * 請求情報
 */
export interface BillingInfo {
  currentMonth: BillingDetail;
  previousMonth?: BillingDetail;
  billingHistory: BillingHistoryEntry[];
  paymentMethods: PaymentMethod[];
}

/**
 * 契約端末情報
 */
export interface DeviceContract {
  id: string;
  deviceName: string;
  manufacturer: string;
  imageUrl: string;
  purchaseDate: string;
  totalPayments: number;
  completedPayments: number;
  monthlyPayment: number;
  remainingAmount: number;
}

/**
 * オプションサービス概要
 */
export interface OptionServiceSummary {
  id: string;
  name: string;
  monthlyFee: number;
}

/**
 * オプションサービス詳細
 */
export interface OptionService {
  id: string;
  name: string;
  description: string;
  monthlyFee: number;
  isSubscribed: boolean;
  category: 'calling' | 'data' | 'insurance' | 'other';
}

/**
 * 通知設定
 */
export interface NotificationSettings {
  emailNotification: boolean;
  smsNotification: boolean;
  categories: {
    billing: boolean;
    dataUsage: boolean;
    campaign: boolean;
    maintenance: boolean;
  };
}

/**
 * お知らせ
 */
export interface AccountNotification {
  id: string;
  title: string;
  message: string;
  date: string;
  isRead: boolean;
  category: 'important' | 'billing' | 'campaign' | 'info';
}

/**
 * ダッシュボード集約データ
 */
export interface AccountDashboard {
  contract: {
    planName: string;
    monthlyFee: number;
    dataCapacityGB: number;
    phoneNumber: string;
  };
  dataUsage: {
    usedGB: number;
    totalGB: number;
    remainingGB: number;
    usagePercentage: number;
  };
  billing: {
    currentMonthTotal: number;
    previousMonthTotal: number;
    baseFee: number;
    callCharges: number;
  };
  device: DeviceContract | null;
  notifications: AccountNotification[];
  unreadNotificationCount: number;
}

/**
 * プラン変更リクエスト
 */
export interface PlanChangeRequest {
  newPlanId: string;
  applicationTiming: 'next_month' | 'immediate';
}

/**
 * プロフィール更新リクエスト
 */
export interface ProfileUpdateRequest {
  email?: string;
  phoneNumber?: string;
  postalCode?: string;
  address?: string;
}

/**
 * パスワード変更リクエスト
 */
export interface PasswordChangeRequest {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

/**
 * 利用可能プラン
 */
export interface AvailablePlan {
  id: string;
  name: string;
  monthlyFee: number;
  dataCapacityGB: number;
  description: string;
  features: string[];
  isCurrent: boolean;
}

/**
 * API成功レスポンス
 */
export interface AccountApiResponse<T> {
  data: T;
  message: string;
  status: 'success';
}

/**
 * APIエラーレスポンス
 */
export interface AccountApiError {
  message: string;
  status: 'error';
  code?: string;
}
