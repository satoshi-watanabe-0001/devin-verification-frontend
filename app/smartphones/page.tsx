import React from 'react';
import { Footer } from '@/components/layout/Footer';
import { CategoryCard } from '@/components/ui/CategoryCard';
import { ContentApiService } from '@/services/api.service';
import { transformCategoryInfos } from '@/utils/dataTransforms';

/**
 * 製品カテゴリトップページ
 * PBI-DP-001: 4つのカテゴリカード（iPhone、Android、ドコモ認定リユース品、アクセサリ）を表示
 * バックエンドAPIからカテゴリ一覧を取得して表示
 * @returns JSX.Element
 */
export default async function SmartphonesPage() {
  const categoryListResponse = await ContentApiService.getCategories();
  
  const categories = transformCategoryInfos(categoryListResponse.categories);

  return (
    <>
      <main className="min-h-screen bg-gradient-to-br from-purple-100 via-blue-50 to-cyan-100">
        <div className="container mx-auto px-4 py-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-8 text-center">
            製品カテゴリ
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {categories.map((category) => (
              <CategoryCard
                key={category.link}
                title={category.title}
                image={category.image}
                link={category.link}
                description={category.description}
              />
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
