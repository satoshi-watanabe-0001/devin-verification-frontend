import { http, HttpResponse } from 'msw';
import { CategoryDetailResponse, CategoryListResponse } from '@/types/api.types';

export const handlers = [
  http.get('*/api/v1/v1/products/categories', () => {
    const categoryListResponse: CategoryListResponse = {
      categories: [
        {
          categoryCode: 'iphone',
          displayName: 'iPhone',
          heroImageUrl: null,
          productCount: 5,
          leadText: '',
        },
        {
          categoryCode: 'android',
          displayName: 'Android',
          heroImageUrl: null,
          productCount: 0,
          leadText: '',
        },
        {
          categoryCode: 'docomo-certified',
          displayName: 'ドコモ認定リユース品',
          heroImageUrl: null,
          productCount: 0,
          leadText: '30日以内無料交換可能',
        },
        {
          categoryCode: 'accessories',
          displayName: 'アクセサリ',
          heroImageUrl: null,
          productCount: 0,
          leadText: '',
        },
      ],
    };

    return HttpResponse.json({ data: categoryListResponse });
  }),

  http.get('*/api/v1/v1/products/categories/iphone', () => {
    const categoryResponse: CategoryDetailResponse = {
      categoryCode: 'iphone',
      categoryName: 'iPhone',
      totalCount: 5,
      products: [
        {
          productId: 'iphone-16-pro-max',
          manufacturer: 'Apple',
          modelName: 'iPhone 16 Pro Max',
          imageUrl: '/images/iphone-16-pro-max.jpg',
          storageOptions: ['256GB', '512GB', '1TB'],
          colorOptions: [
            { name: 'ナチュラルチタニウム', code: '#8E8E93' },
            { name: 'ブルーチタニウム', code: '#5B9BD5' },
            { name: 'ホワイトチタニウム', code: '#F2F2F7' },
            { name: 'ブラックチタニウム', code: '#1C1C1E' },
          ],
          priceInfo: {
            regularPrice: 189800,
            campaignPrice: 174800,
          },
          availability: {
            inStock: true,
            estimatedDeliveryDays: 2,
          },
          campaignBadges: [
            { id: 'winter-sale', label: '最大15,000円引き', discountAmount: 15000 },
          ],
        },
        {
          productId: 'iphone-16-pro',
          manufacturer: 'Apple',
          modelName: 'iPhone 16 Pro',
          imageUrl: '/images/iphone-16-pro.jpg',
          storageOptions: ['128GB', '256GB', '512GB', '1TB'],
          colorOptions: [
            { name: 'ナチュラルチタニウム', code: '#8E8E93' },
            { name: 'ブルーチタニウム', code: '#5B9BD5' },
            { name: 'ホワイトチタニウム', code: '#F2F2F7' },
            { name: 'ブラックチタニウム', code: '#1C1C1E' },
          ],
          priceInfo: {
            regularPrice: 159800,
            campaignPrice: 144800,
          },
          availability: {
            inStock: true,
            estimatedDeliveryDays: 2,
          },
          campaignBadges: [
            { id: 'winter-sale', label: '最大15,000円引き', discountAmount: 15000 },
          ],
        },
        {
          productId: 'iphone-16-plus',
          manufacturer: 'Apple',
          modelName: 'iPhone 16 Plus',
          imageUrl: '/images/iphone-16-plus.jpg',
          storageOptions: ['128GB', '256GB', '512GB'],
          colorOptions: [
            { name: 'ブラック', code: '#1C1C1E' },
            { name: 'ホワイト', code: '#F2F2F7' },
            { name: 'ピンク', code: '#FFB6C1' },
            { name: 'ティール', code: '#008080' },
            { name: 'ウルトラマリン', code: '#4169E1' },
          ],
          priceInfo: {
            regularPrice: 134800,
          },
          availability: {
            inStock: true,
            estimatedDeliveryDays: 2,
          },
          campaignBadges: [],
        },
        {
          productId: 'iphone-16',
          manufacturer: 'Apple',
          modelName: 'iPhone 16',
          imageUrl: '/images/iphone-16.jpg',
          storageOptions: ['128GB', '256GB', '512GB'],
          colorOptions: [
            { name: 'ブラック', code: '#1C1C1E' },
            { name: 'ホワイト', code: '#F2F2F7' },
            { name: 'ピンク', code: '#FFB6C1' },
            { name: 'ティール', code: '#008080' },
            { name: 'ウルトラマリン', code: '#4169E1' },
          ],
          priceInfo: {
            regularPrice: 124800,
          },
          availability: {
            inStock: true,
            estimatedDeliveryDays: 2,
          },
          campaignBadges: [],
        },
        {
          productId: 'iphone-15',
          manufacturer: 'Apple',
          modelName: 'iPhone 15',
          imageUrl: '/images/iphone-15.jpg',
          storageOptions: ['128GB', '256GB', '512GB'],
          colorOptions: [
            { name: 'ブラック', code: '#1C1C1E' },
            { name: 'ブルー', code: '#5B9BD5' },
            { name: 'グリーン', code: '#90EE90' },
            { name: 'イエロー', code: '#FFD700' },
            { name: 'ピンク', code: '#FFB6C1' },
          ],
          priceInfo: {
            regularPrice: 112800,
            campaignPrice: 99800,
          },
          availability: {
            inStock: true,
            estimatedDeliveryDays: 2,
          },
          campaignBadges: [
            { id: 'clearance-sale', label: '最大13,000円引き', discountAmount: 13000 },
          ],
        },
      ],
    };

    return HttpResponse.json({ data: categoryResponse });
  }),

  http.get('*/api/v1/v1/products/categories/android', () => {
    const categoryResponse: CategoryDetailResponse = {
      categoryCode: 'android',
      categoryName: 'Android',
      totalCount: 5,
      products: [
        {
          productId: 'galaxy-s24-ultra',
          manufacturer: 'Samsung',
          modelName: 'Galaxy S24 Ultra',
          imageUrl: '/images/galaxy-s24-ultra.jpg',
          storageOptions: ['256GB', '512GB', '1TB'],
          colorOptions: [
            { name: 'チタニウムグレー', code: '#6B7280' },
            { name: 'チタニウムブラック', code: '#111827' },
            { name: 'チタニウムバイオレット', code: '#7C3AED' },
          ],
          priceInfo: {
            regularPrice: 189800,
            campaignPrice: 169800,
          },
          availability: {
            inStock: true,
            estimatedDeliveryDays: 3,
          },
          campaignBadges: [
            { id: 'android-sale', label: '最大58,201円引き', discountAmount: 20000 },
          ],
        },
        {
          productId: 'galaxy-s24',
          manufacturer: 'Samsung',
          modelName: 'Galaxy S24',
          imageUrl: '/images/galaxy-s24.jpg',
          storageOptions: ['128GB', '256GB'],
          colorOptions: [
            { name: 'オニキスブラック', code: '#1F2937' },
            { name: 'マーブルグレー', code: '#9CA3AF' },
            { name: 'コバルトバイオレット', code: '#8B5CF6' },
            { name: 'アンバーイエロー', code: '#F59E0B' },
          ],
          priceInfo: {
            regularPrice: 139800,
            campaignPrice: 124800,
          },
          availability: {
            inStock: true,
            estimatedDeliveryDays: 2,
          },
          campaignBadges: [
            { id: 'android-sale', label: '最大58,201円引き', discountAmount: 15000 },
          ],
        },
        {
          productId: 'pixel-8-pro',
          manufacturer: 'Google',
          modelName: 'Pixel 8 Pro',
          imageUrl: '/images/pixel-8-pro.jpg',
          storageOptions: ['128GB', '256GB', '512GB'],
          colorOptions: [
            { name: 'オブシディアン', code: '#1F2937' },
            { name: 'ポーセリン', code: '#F9FAFB' },
            { name: 'ベイ', code: '#60A5FA' },
          ],
          priceInfo: {
            regularPrice: 159800,
            campaignPrice: 139800,
          },
          availability: {
            inStock: true,
            estimatedDeliveryDays: 2,
          },
          campaignBadges: [
            { id: 'android-sale', label: '最大58,201円引き', discountAmount: 20000 },
          ],
        },
        {
          productId: 'xperia-1-vi',
          manufacturer: 'Sony',
          modelName: 'Xperia 1 VI',
          imageUrl: '/images/xperia-1-vi.jpg',
          storageOptions: ['256GB', '512GB'],
          colorOptions: [
            { name: 'ブラック', code: '#000000' },
            { name: 'プラチナシルバー', code: '#D1D5DB' },
            { name: 'カーキグリーン', code: '#65A30D' },
          ],
          priceInfo: {
            regularPrice: 179800,
            campaignPrice: 159800,
          },
          availability: {
            inStock: true,
            estimatedDeliveryDays: 3,
          },
          campaignBadges: [
            { id: 'android-sale', label: '最大58,201円引き', discountAmount: 20000 },
          ],
        },
        {
          productId: 'aquos-r8-pro',
          manufacturer: 'Sharp',
          modelName: 'AQUOS R8 Pro',
          imageUrl: '/images/aquos-r8-pro.jpg',
          storageOptions: ['256GB'],
          colorOptions: [
            { name: 'ブラック', code: '#000000' },
            { name: 'ブルー', code: '#2563EB' },
          ],
          priceInfo: {
            regularPrice: 149800,
            campaignPrice: 134800,
          },
          availability: {
            inStock: true,
            estimatedDeliveryDays: 2,
          },
          campaignBadges: [
            { id: 'android-sale', label: '最大58,201円引き', discountAmount: 15000 },
          ],
        },
      ],
    };

    return HttpResponse.json({ data: categoryResponse });
  }),
];
