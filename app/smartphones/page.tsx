import React from 'react';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/Footer';
import { CategoryCard } from '@/components/ui/CategoryCard';

/**
 * 製品カテゴリトップページ
 * PBI-DP-001: 4つのカテゴリカード（iPhone、Android、ドコモ認定リユース品、アクセサリ）を表示
 * @returns JSX.Element
 */
export default function SmartphonesPage() {
  const categories = [
    {
      title: 'iPhone',
      image: '📱',
      link: '/smartphones/iphone',
      description: undefined,
    },
    {
      title: 'Android',
      image: '🤖',
      link: '/smartphones/android',
      description: undefined,
    },
    {
      title: 'ドコモ認定リユース品',
      image: '♻️',
      link: '/smartphones/docomo-certified',
      description: '30日以内無料交換可能',
    },
    {
      title: 'アクセサリ',
      image: '🎧',
      link: '/accessories',
      description: undefined,
    },
  ];

  return (
    <>
      <Header />
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
