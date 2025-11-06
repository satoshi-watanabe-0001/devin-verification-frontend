/**
 * スマートフォン製品関連の型定義
 */

export interface ColorOption {
  name: string;
  colorCode: string;
}

export interface SmartphoneProduct {
  id: string;
  name: string;
  brand: string;
  price: string;
  campaignPrice?: string;
  monthlyPrice?: string;
  imageUrl: string;
  storageOptions: string[];
  colorOptions: ColorOption[];
  saleLabel?: string;
  has5G: boolean;
  link: string;
  features: string[];
  description: string;
  specifications: string[];
}
