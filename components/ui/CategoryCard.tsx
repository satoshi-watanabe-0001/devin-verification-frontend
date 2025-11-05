import React from 'react';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

/**
 * カテゴリカードコンポーネント
 */
interface CategoryCardProps {
  title: string;
  image: string;
  link: string;
  description?: string;
}

export const CategoryCard: React.FC<CategoryCardProps> = ({
  title,
  image,
  link,
  description,
}) => {
  return (
    <Link
      href={link}
      className="group bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden"
      aria-label={`${title}のページへ移動`}
    >
      <div className="aspect-square bg-gray-100 flex items-center justify-center p-8">
        <div className="text-8xl">{image}</div>
      </div>
      <div className="p-6">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-xl font-bold text-gray-900">{title}</h3>
          <ChevronRight className="w-6 h-6 text-blue-600 group-hover:translate-x-1 transition-transform" />
        </div>
        {description && (
          <p className="text-sm text-gray-600">{description}</p>
        )}
      </div>
    </Link>
  );
};
