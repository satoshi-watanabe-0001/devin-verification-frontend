'use client';

import React from 'react';
import Link from 'next/link';

interface ProcedureItem {
  label: string;
  href: string;
  description: string;
}

const procedures: ProcedureItem[] = [
  {
    label: '機種変更',
    href: '/smartphones',
    description: '新しい端末への変更手続き',
  },
  {
    label: 'SIM再発行',
    href: '/support',
    description: 'SIMカードの再発行・交換',
  },
  {
    label: '名義変更',
    href: '/support',
    description: '契約者名義の変更手続き',
  },
  {
    label: '解約',
    href: '/support',
    description: 'ahamoの解約手続き',
  },
  {
    label: 'その他の手続き',
    href: '/support',
    description: '住所変更、請求先変更など',
  },
];

/**
 * 各種手続きリンクコンポーネント
 */
export const ProcedureLinks: React.FC = () => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200" aria-label="各種お手続き">
      <h2 className="text-lg font-bold text-gray-900 mb-4">各種お手続き</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {procedures.map((procedure) => (
          <Link
            key={procedure.label}
            href={procedure.href}
            className="flex items-center p-3 rounded-lg border border-gray-200 hover:bg-blue-50 hover:border-blue-300 transition-colors group"
          >
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-900 group-hover:text-blue-700">
                {procedure.label}
              </p>
              <p className="text-xs text-gray-500">{procedure.description}</p>
            </div>
            <svg className="w-4 h-4 text-gray-400 group-hover:text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        ))}
      </div>
    </div>
  );
};
