/**
 * API サービス
 * バックエンドAPIとの通信を管理
 */

import { Campaign, News, Smartphone, Plan, ApiResponse, PaginatedResponse } from '@/types/api.types';

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
}
