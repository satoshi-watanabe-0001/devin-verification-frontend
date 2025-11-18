/**
 * データ変換ユーティリティ
 * バックエンドDTOとフロントエンド型の変換を行う
 */

import { ProductCardDto } from '@/types/api.types';
import { SmartphoneProduct } from '@/types/smartphone';

/**
 * 通貨フォーマット関数
 * @param amount - 金額（数値）
 * @returns フォーマットされた金額文字列（例: "189,800円"）
 */
export function formatCurrency(amount: number): string {
  return `${amount.toLocaleString('ja-JP')}円`;
}

/**
 * 月額料金フォーマット関数
 * @param amount - 月額金額（数値）
 * @returns フォーマットされた月額料金文字列（例: "7,283円/月"）
 */
export function formatMonthlyPrice(amount: number): string {
  return `${amount.toLocaleString('ja-JP')}円/月`;
}

/**
 * ProductCardDtoをSmartphoneProductに変換
 * @param dto - バックエンドから返されるProductCardDto
 * @returns フロントエンド用のSmartphoneProduct
 */
export function transformProductCardDto(dto: ProductCardDto): SmartphoneProduct {
  const price = formatCurrency(dto.priceInfo.regularPrice);
  const campaignPrice = dto.priceInfo.campaignPrice 
    ? formatCurrency(dto.priceInfo.campaignPrice) 
    : undefined;
  const monthlyPrice = dto.priceInfo.monthlyPrice 
    ? formatMonthlyPrice(dto.priceInfo.monthlyPrice) 
    : undefined;

  let saleLabel: string | undefined;
  if (dto.campaignBadges && dto.campaignBadges.length > 0) {
    const badge = dto.campaignBadges[0];
    if (badge.discountAmount) {
      saleLabel = `最大${badge.discountAmount.toLocaleString('ja-JP')}円引き`;
    } else {
      saleLabel = badge.label;
    }
  }

  return {
    id: dto.productId,
    name: dto.productName,
    brand: dto.manufacturer,
    price: price,
    campaignPrice: campaignPrice,
    monthlyPrice: monthlyPrice,
    imageUrl: dto.imageUrl,
    storageOptions: dto.storageOptions,
    colorOptions: dto.colorOptions.map(color => ({
      name: color.name,
      colorCode: color.colorCode,
    })),
    saleLabel: saleLabel,
    has5G: dto.has5G,
    link: dto.purchaseLink,
    features: dto.features,
    description: dto.description,
    specifications: dto.specifications,
  };
}

/**
 * ProductCardDto配列をSmartphoneProduct配列に変換
 * @param dtos - バックエンドから返されるProductCardDto配列
 * @returns フロントエンド用のSmartphoneProduct配列
 */
export function transformProductCardDtos(dtos: ProductCardDto[]): SmartphoneProduct[] {
  return dtos.map(dto => transformProductCardDto(dto));
}
