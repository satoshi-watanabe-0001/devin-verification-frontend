import React from 'react';
import { GradientButton } from '@/components/ui/GradientButton';

/**
 * アクションボタンコンポーネント
 * 主要なCTAボタンを表示
 */
export const ActionButtons: React.FC = () => {
  return (
    <div className="bg-gradient-to-r from-blue-600 to-purple-600 py-12">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-6">
          <GradientButton
            href="/flow"
            variant="secondary"
            className="w-full md:w-auto text-lg px-8 py-4"
          >
            申し込みの流れを見る
          </GradientButton>
          <GradientButton
            href="/plan"
            variant="secondary"
            className="w-full md:w-auto text-lg px-8 py-4"
          >
            料金プランを見る
          </GradientButton>
          <GradientButton
            href="/smartphones"
            variant="secondary"
            className="w-full md:w-auto text-lg px-8 py-4"
          >
            対応機種を見る
          </GradientButton>
        </div>
      </div>
    </div>
  );
};
