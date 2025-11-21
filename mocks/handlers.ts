import { http, HttpResponse } from 'msw';
import { CategoryDetailResponse } from '@/types/api.types';

export const handlers = [
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
];
