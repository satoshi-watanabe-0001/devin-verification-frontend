import React from 'react';
import { ColorOption } from '@/types/smartphone';

/**
 * カラーバリエーション表示コンポーネント
 * 製品の利用可能なカラーオプションを小さな円形ドットで表示
 */
interface ColorDotsProps {
  colors: ColorOption[];
  maxVisible?: number;
  className?: string;
}

export const ColorDots: React.FC<ColorDotsProps> = ({
  colors,
  maxVisible = 5,
  className = '',
}) => {
  const visibleColors = colors.slice(0, maxVisible);
  const remainingCount = colors.length - maxVisible;

  return (
    <div className={`flex items-center gap-1.5 ${className}`}>
      {visibleColors.map((color, index) => (
        <div
          key={index}
          className="w-3 h-3 rounded-full border border-gray-300 shadow-sm"
          style={{ backgroundColor: color.colorCode }}
          title={color.name}
          aria-label={color.name}
        />
      ))}
      {remainingCount > 0 && (
        <span className="text-xs text-gray-500 ml-1">+{remainingCount}</span>
      )}
    </div>
  );
};
