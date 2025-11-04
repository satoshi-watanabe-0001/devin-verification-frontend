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
