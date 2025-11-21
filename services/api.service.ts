/**
 * API サービス
 * バックエンドAPIとの通信を管理
 */

import { 
  Campaign, 
  News, 
  Smartphone, 
  Plan, 
  ApiResponse, 
  PaginatedResponse,
  CategoryDetailResponse,
  FilterParams
} from '@/types/api.types';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8080';

export class ContentApiService {
  /**
   * キャンペーン一覧を取得
   */
  static async getCampaigns(page: number = 1, pageSize: number = 10): Promise<PaginatedResponse<Campaign>> {
    try {
      const response = await fetch(`${API_BASE_URL}/api/campaigns?page=${page}&pageSize=${pageSize}`);
      if (!response.ok) {
        throw new Error('Failed to fetch campaigns');
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching campaigns:', error);
      return {
        data: [],
        total: 0,
        page,
        pageSize,
      };
    }
  }

  /**
   * ニュース一覧を取得
   */
  static async getNews(page: number = 1, pageSize: number = 5): Promise<PaginatedResponse<News>> {
    try {
      const response = await fetch(`${API_BASE_URL}/api/news?page=${page}&pageSize=${pageSize}`);
      if (!response.ok) {
        throw new Error('Failed to fetch news');
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching news:', error);
      return {
        data: [],
        total: 0,
        page,
        pageSize,
      };
    }
  }

  /**
   * スマートフォン一覧を取得
   */
  static async getSmartphones(page: number = 1, pageSize: number = 10): Promise<PaginatedResponse<Smartphone>> {
    try {
      const response = await fetch(`${API_BASE_URL}/api/smartphones?page=${page}&pageSize=${pageSize}`);
      if (!response.ok) {
        throw new Error('Failed to fetch smartphones');
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching smartphones:', error);
      return {
        data: [],
        total: 0,
        page,
        pageSize,
      };
    }
  }

  /**
   * 料金プラン一覧を取得
   */
  static async getPlans(): Promise<Plan[]> {
    try {
      const response = await fetch(`${API_BASE_URL}/api/plans`);
      if (!response.ok) {
        throw new Error('Failed to fetch plans');
      }
      const result: ApiResponse<Plan[]> = await response.json();
      return result.data;
    } catch (error) {
      console.error('Error fetching plans:', error);
      return [];
    }
  }

  /**
   * カテゴリ別製品一覧を取得
   * @param categoryCode - カテゴリコード（例: 'iphone', 'android', 'docomo-certified'）
   * @param filters - フィルタパラメータ（オプション）
   * @returns カテゴリ詳細レスポンス
   */
  static async getCategoryProducts(
    categoryCode: string,
    filters?: FilterParams
  ): Promise<CategoryDetailResponse> {
    try {
      const queryParams = new URLSearchParams();
      
      if (filters) {
        if (filters.sort) queryParams.append('sort', filters.sort);
        if (filters.priceMin !== undefined) queryParams.append('priceMin', filters.priceMin.toString());
        if (filters.priceMax !== undefined) queryParams.append('priceMax', filters.priceMax.toString());
        if (filters.storage) {
          filters.storage.forEach(s => queryParams.append('storage', s));
        }
        if (filters.color) {
          filters.color.forEach(c => queryParams.append('color', c));
        }
        if (filters.campaignId) queryParams.append('campaignId', filters.campaignId);
      }

      const queryString = queryParams.toString();
      const url = `${API_BASE_URL}/api/v1/v1/products/categories/${categoryCode}${queryString ? `?${queryString}` : ''}`;
      
      const response = await fetch(url, { cache: 'no-store' });
      if (!response.ok) {
        throw new Error(`Failed to fetch category products: ${response.status}`);
      }
      
      const json = await response.json();
      return json.data;
    } catch (error) {
      console.error('Error fetching category products:', error);
      return {
        categoryCode,
        categoryName: '',
        products: [],
        totalCount: 0,
      };
    }
  }
}
