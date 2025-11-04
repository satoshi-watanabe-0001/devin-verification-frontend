import React from 'react';

/**
 * セクションコンテナコンポーネント
 * 一貫したスペーシングと背景を提供
 */
interface SectionContainerProps {
  children: React.ReactNode;
  className?: string;
  background?: 'white' | 'gray' | 'gradient';
}

export const SectionContainer: React.FC<SectionContainerProps> = ({
  children,
  className = '',
  background = 'white',
}) => {
  const backgroundClasses = {
    white: 'bg-white',
    gray: 'bg-gradient-to-br from-gray-50 to-white',
    gradient: 'bg-gradient-to-br from-blue-50 to-white',
  };

  return (
    <section className={`py-16 md:py-20 ${backgroundClasses[background]} ${className}`}>
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        {children}
      </div>
    </section>
  );
};
