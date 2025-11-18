/**
 * API関連の型定義
 */

export interface Campaign {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  startDate: string;
  endDate: string;
  discountRate?: number;
}

export interface News {
  id: string;
  title: string;
  category: string;
  date: string;
  content: string;
}

export interface Smartphone {
  id: string;
  name: string;
  manufacturer: string;
  price: number;
  imageUrl: string;
  description: string;
  specifications?: {
    display?: string;
    camera?: string;
    battery?: string;
    storage?: string;
  };
}

export interface Plan {
  id: string;
  name: string;
  price: number;
  dataCapacity: string;
  features: string[];
  isPopular?: boolean;
}

export interface ApiResponse<T> {
  data: T;
  message: string;
  status: 'success' | 'error';
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
}

/**
 * バックエンドAPIのDTO型定義
 * CategoryControllerから返されるレスポンス構造
 */

export interface PriceInfo {
  regularPrice: number;
  campaignPrice?: number;
  monthlyPrice?: number;
}

export interface AvailabilityInfo {
  inStock: boolean;
  estimatedDeliveryDays?: number;
}

export interface CampaignBadge {
  id: string;
  label: string;
  discountAmount?: number;
}

export interface ProductCardDto {
  productId: string;
  productName: string;
  manufacturer: string;
  priceInfo: PriceInfo;
  imageUrl: string;
  storageOptions: string[];
  colorOptions: Array<{
    name: string;
    colorCode: string;
  }>;
  availability?: AvailabilityInfo;
  campaignBadges?: CampaignBadge[];
  has5G: boolean;
  purchaseLink: string;
  features: string[];
  description: string;
  specifications: string[];
}

export interface CategoryDetailResponse {
  categoryCode: string;
  categoryName: string;
  products: ProductCardDto[];
  totalCount: number;
}

export interface FilterParams {
  sort?: string;
  priceMin?: number;
  priceMax?: number;
  storage?: string[];
  color?: string[];
  campaignId?: string;
}
