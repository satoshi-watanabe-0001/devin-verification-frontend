import React from 'react';
import Link from 'next/link';

/**
 * グラデーションボタンコンポーネント
 */
interface GradientButtonProps {
  href?: string;
  onClick?: () => void;
  children: React.ReactNode;
  variant?: 'primary' | 'secondary';
  className?: string;
}

export const GradientButton: React.FC<GradientButtonProps> = ({
  href,
  onClick,
  children,
  variant = 'primary',
  className = '',
}) => {
  const baseClasses = 'px-6 py-3 rounded-lg font-medium transition-all duration-300 hover:shadow-lg';
  const variantClasses = {
    primary: 'bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:from-blue-700 hover:to-blue-800',
    secondary: 'bg-white text-blue-600 border-2 border-blue-600 hover:bg-blue-50',
  };

  const buttonClasses = `${baseClasses} ${variantClasses[variant]} ${className}`;

  if (href) {
    return (
      <Link href={href} className={buttonClasses}>
        {children}
      </Link>
    );
  }

  return (
    <button onClick={onClick} className={buttonClasses}>
      {children}
    </button>
  );
};
