import { setupWorker } from 'msw/browser';
import { handlers } from './handlers';

/**
 * ブラウザ用MSWワーカー
 * 開発環境でのみ有効化される
 */
export const worker = setupWorker(...handlers);
