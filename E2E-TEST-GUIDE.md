# Playwright E2Eテスト実行ガイド

## 概要

このドキュメントは、devin-verification-frontendプロジェクトのPlaywright E2Eテスト環境の使用方法を説明します。

## 目次

1. [環境セットアップ](#環境セットアップ)
2. [テストファイル構成](#テストファイル構成)
3. [テスト実行方法](#テスト実行方法)
4. [テストシナリオ](#テストシナリオ)
5. [トラブルシューティング](#トラブルシューティング)

---

## 環境セットアップ

### 前提条件

- Node.js 18以上がインストールされていること
- pnpmがインストールされていること

### 初回セットアップ

1. **依存関係のインストール**

```bash
pnpm install
```

2. **Playwrightブラウザのインストール**

```bash
pnpm playwright:install
```

このコマンドは、Chromium、Firefox、WebKitの3つのブラウザエンジンと必要なシステム依存関係をインストールします。

### 環境変数の設定（オプション）

テスト対象のベースURLを変更する場合は、環境変数を設定します。

```bash
# デフォルトは http://localhost:3000
export BASE_URL=http://localhost:3000
```

---

## テストファイル構成

### ディレクトリ構造

```
devin-verification-frontend/
├── e2e/                                    # E2Eテストディレクトリ
│   ├── header-navigation.spec.ts          # DEVIN-1: ヘッダーナビゲーション
│   ├── home-content.spec.ts               # DEVIN-5: 主要コンテンツ表示
│   ├── product-category.spec.ts           # DEVIN-6: 製品カテゴリページ
│   └── iphone-category.spec.ts            # DEVIN-7: iPhoneカテゴリページ
├── playwright.config.ts                    # Playwright設定ファイル
├── e2e-test-scenarios.md                   # 要件ベースのテストシナリオ
└── e2e-test-scenarios-implementation-based.md  # 実装ベースのテストシナリオ
```

### テストファイルの説明

#### 1. `header-navigation.spec.ts` (DEVIN-1)
ヘッダーナビゲーションの機能をテストします。

**テスト内容**:
- ヘッダーの基本表示確認
- アクティブページのハイライト表示確認
- 認証状態に応じたボタン切り替え確認
- レスポンシブ対応確認（モバイル）
- スクロール時のヘッダー固定確認
- ahamoロゴのリンク機能確認

#### 2. `home-content.spec.ts` (DEVIN-5)
トップページの主要コンテンツ表示をテストします。

**テスト内容**:
- プロモーションバナーの表示確認
- キャンペーンカルーセルの表示と自動再生確認
- 料金プランセクションの表示確認
- アクションボタンセクションの表示確認
- スマートフォンカルーセルの表示確認
- ahamoの特徴セクションの表示確認
- お知らせセクションの表示確認
- サポートセクションの表示確認
- フッターの表示確認

#### 3. `product-category.spec.ts` (DEVIN-6)
製品カテゴリトップページの表示をテストします。

**テスト内容**:
- 4つのカテゴリカード表示確認
- カテゴリカードのクリック遷移確認
- レスポンシブデザイン確認
- ブランドページの表示確認
- 404エラーハンドリング確認

#### 4. `iphone-category.spec.ts` (DEVIN-7)
iPhoneカテゴリページの表示と機能をテストします。

**テスト内容**:
- iPhoneカテゴリページへの遷移確認
- iPhoneキャンペーンバナーの表示確認
- iPhone製品グリッドの表示確認
- 製品並び替え機能の確認
- ドコモオンラインショップへのリンク確認
- Androidカテゴリページの表示確認
- ドコモ認定リユース品ページの表示確認
- 無効なブランドページの404処理確認
- レスポンシブ対応確認
- 製品カードの詳細情報表示確認

---

## テスト実行方法

### 基本的なテスト実行

#### 1. 全テストを実行（ヘッドレスモード）

```bash
pnpm test:e2e
```

このコマンドは、すべてのテストをヘッドレスモードで実行します。開発サーバーが起動していない場合は、自動的に起動されます。

#### 2. UIモードでテスト実行

```bash
pnpm test:e2e:ui
```

Playwright Test UIを使用してテストを実行します。テストの実行状況をリアルタイムで確認でき、デバッグに便利です。

#### 3. ブラウザを表示してテスト実行

```bash
pnpm test:e2e:headed
```

ブラウザウィンドウを表示しながらテストを実行します。テストの動作を視覚的に確認できます。

#### 4. デバッグモードでテスト実行

```bash
pnpm test:e2e:debug
```

Playwright Inspectorを使用してテストをステップ実行します。テストのデバッグに最適です。

### ブラウザ別のテスト実行

#### Chromiumのみでテスト実行

```bash
pnpm test:e2e:chromium
```

#### Firefoxのみでテスト実行

```bash
pnpm test:e2e:firefox
```

#### WebKit（Safari）のみでテスト実行

```bash
pnpm test:e2e:webkit
```

#### モバイルブラウザでテスト実行

```bash
pnpm test:e2e:mobile
```

Mobile ChromeとMobile Safariでテストを実行します。

### 特定のテストファイルのみ実行

```bash
# ヘッダーナビゲーションのテストのみ実行
pnpm test:e2e e2e/header-navigation.spec.ts

# iPhoneカテゴリページのテストのみ実行
pnpm test:e2e e2e/iphone-category.spec.ts
```

### 特定のテストケースのみ実行

```bash
# テスト名でフィルタリング
pnpm test:e2e -g "ヘッダーの基本表示確認"
```

### テストレポートの表示

```bash
pnpm test:e2e:report
```

テスト実行後、HTMLレポートをブラウザで開きます。

### エビデンスの確認

テスト実行時、以下のエビデンスが自動的に保存されます：

#### 保存されるエビデンス

1. **スクリーンショット** (`.png`)
   - 全テストの最終画面をキャプチャ
   - 失敗時は追加のスクリーンショットも保存

2. **ビデオ録画** (`.webm`)
   - テスト実行中の全操作を録画
   - ブラウザの動作を完全に記録

3. **トレースファイル** (`.zip`)
   - テスト実行の詳細なトレース情報
   - Playwright Trace Viewerで再生可能

#### エビデンスの保存場所

```
test-results/
├── [テスト名]-[ブラウザ]/
│   ├── test-finished-1.png      # スクリーンショット
│   ├── video.webm                # ビデオ録画
│   └── trace.zip                 # トレースファイル
```

#### エビデンスの確認方法

**スクリーンショットの確認**:
```bash
# 画像ビューアで開く
xdg-open test-results/[テスト名]-chromium/test-finished-1.png
```

**ビデオの再生**:
```bash
# ビデオプレイヤーで開く
xdg-open test-results/[テスト名]-chromium/video.webm
```

**トレースの確認**:
```bash
# Playwright Trace Viewerで開く
pnpm exec playwright show-trace test-results/[テスト名]-chromium/trace.zip
```

Trace Viewerでは、以下の情報を確認できます：
- 各アクションのタイムライン
- スクリーンショット
- ネットワークリクエスト
- コンソールログ
- DOMスナップショット

---

## テストシナリオ

### DEVIN-1: ヘッダーナビゲーション

**実装参照**: `components/layout/header.tsx`

| テストID | テスト名 | 説明 |
|---------|---------|------|
| 1-1 | ヘッダーの基本表示確認 | ahamoロゴ、6つのナビゲーション項目、検索アイコン、ログインボタンが表示されることを確認 |
| 1-2 | アクティブページのハイライト表示確認 | 現在表示中のページがヘッダーでハイライト表示されることを確認 |
| 1-3 | 認証状態に応じたボタン切り替え確認 | ログイン前後でヘッダーのボタン表示が切り替わることを確認 |
| 1-4 | レスポンシブ対応確認（モバイル） | モバイル画面でハンバーガーメニューが正しく動作することを確認 |
| 1-5 | スクロール時のヘッダー固定確認 | ページをスクロールしてもヘッダーが画面上部に固定されることを確認 |
| 1-6 | ahamoロゴのリンク機能確認 | ahamoロゴをクリックするとトップページに遷移することを確認 |

### DEVIN-5: 主要コンテンツ表示

**実装参照**: `app/page.tsx`, `components/layout/*`

| テストID | テスト名 | 説明 |
|---------|---------|------|
| 5-1 | プロモーションバナーの表示確認 | トップページのヒーローセクションが正しく表示されることを確認 |
| 5-2 | キャンペーンカルーセルの表示と自動再生確認 | キャンペーンカルーセルが表示され、ナビゲーションボタンが動作することを確認 |
| 5-3 | 料金プランセクションの表示確認 | 料金プランカードが表示されることを確認 |
| 5-4 | アクションボタンセクションの表示確認 | 3つのアクションボタンが表示されることを確認 |
| 5-5 | スマートフォンカルーセルの表示確認 | スマートフォンカルーセルが表示されることを確認 |
| 5-6 | ahamoの特徴セクションの表示確認 | ahamoの特徴カードが表示されることを確認 |
| 5-7 | お知らせセクションの表示確認 | お知らせ一覧が表示されることを確認 |
| 5-8 | サポートセクションの表示確認 | サポートカードが表示されることを確認 |
| 5-9 | フッターの表示確認 | フッターが正しく表示されることを確認 |

### DEVIN-6: 製品カテゴリトップページ表示

**実装参照**: `app/smartphones/page.tsx`, `components/ui/CategoryCard.tsx`

| テストID | テスト名 | 説明 |
|---------|---------|------|
| 6-1 | 製品カテゴリページへのアクセス確認 | 製品カテゴリページが正しく表示されることを確認 |
| 6-2 | 4つのカテゴリカード表示確認 | iPhone、Android、ドコモ認定リユース品、アクセサリの4つのカードが表示されることを確認 |
| 6-3 | カテゴリカードのホバー効果確認 | カードにホバーした際のスタイル変更を確認 |
| 6-4 | カテゴリカードのレスポンシブ対応確認 | 画面サイズに応じてグリッドレイアウトが変更されることを確認 |
| 6-5 | フッターの表示確認 | フッターが正しく表示されることを確認 |
| 6-6 | カテゴリカードのクリック遷移確認 | カードをクリックすると対応するページに遷移することを確認 |

### DEVIN-7: iPhoneカテゴリページ閲覧

**実装参照**: `app/smartphones/[brand]/page.tsx`, `components/smartphones/iPhoneGrid.tsx`

| テストID | テスト名 | 説明 |
|---------|---------|------|
| 7-1 | iPhoneカテゴリページへの遷移確認 | iPhoneカテゴリページが正しく表示されることを確認 |
| 7-2 | iPhoneキャンペーンバナーの表示確認 | キャンペーンバナーが表示されることを確認 |
| 7-3 | iPhone製品グリッドの表示確認 | 製品カードが正しく表示されることを確認 |
| 7-4 | 製品並び替え機能の確認 | 名前順・価格順の並び替えが動作することを確認 |
| 7-5 | ドコモオンラインショップへのリンク確認 | 購入ボタンのリンクが正しく設定されていることを確認 |
| 7-6 | Androidカテゴリページの表示確認 | Androidページが正しく表示されることを確認 |
| 7-7 | ドコモ認定リユース品ページの表示確認 | ドコモ認定リユース品ページが正しく表示されることを確認 |
| 7-8 | 無効なブランドページの404処理確認 | 無効なブランドにアクセスすると404が返されることを確認 |
| 7-9 | iPhoneページのレスポンシブ対応確認 | 画面サイズに応じて表示が変更されることを確認 |
| 7-10 | 製品カードの詳細情報表示確認 | 製品カードに必要な情報が全て表示されることを確認 |

---

## トラブルシューティング

### 開発サーバーが起動しない

**症状**: テスト実行時に開発サーバーが起動しない

**解決方法**:
```bash
# 手動で開発サーバーを起動
pnpm dev

# 別のターミナルでテストを実行
pnpm test:e2e
```

### ブラウザがインストールされていない

**症状**: `Executable doesn't exist` エラーが表示される

**解決方法**:
```bash
pnpm playwright:install
```

### テストがタイムアウトする

**症状**: テストが30秒でタイムアウトする

**解決方法**:
- `playwright.config.ts`の`timeout`設定を増やす
- または、特定のテストで`test.setTimeout(60000)`を使用する

### LocalStorageがクリアされない

**症状**: 認証状態のテストが失敗する

**解決方法**:
各テストの`beforeEach`でLocalStorageをクリアしています。それでも問題がある場合は、手動でクリアしてください。

```typescript
await page.evaluate(() => localStorage.clear());
```

### CI環境でテストが失敗する

**症状**: ローカルでは成功するがCI環境で失敗する

**解決方法**:
- `playwright.config.ts`でCI環境用の設定を確認
- リトライ回数が2回に設定されていることを確認
- ワーカー数が1に設定されていることを確認

---

## HTMLとMarkdownファイルのプレビュー

### VS Code拡張機能

このプロジェクトでは、HTMLとMarkdownファイルのプレビューを簡単に行うために、以下のVS Code拡張機能を推奨しています。

プロジェクトを開くと、VS Codeが自動的にこれらの拡張機能のインストールを提案します。

#### 推奨拡張機能

1. **Markdown All in One** (`yzhang.markdown-all-in-one`)
   - Markdownの編集とプレビュー機能を強化
   - ショートカット、目次生成、リスト編集などの便利な機能

2. **Markdown Preview Enhanced** (`shd101wyy.markdown-preview-enhanced`)
   - 高機能なMarkdownプレビュー
   - 数式、図表、スライドなどのサポート

3. **Live Server** (`ritwickdey.liveserver`)
   - HTMLファイルのライブプレビュー
   - ファイル変更時の自動リロード

4. **Live Preview** (`ms-vscode.live-preview`)
   - Microsoft公式のHTMLプレビュー拡張機能
   - VS Code内でのプレビュー表示

### Markdownファイルのプレビュー方法

#### VS Code内でプレビュー

1. **プレビューを開く**
   - Markdownファイルを開いた状態で `Ctrl+Shift+V` (Windows/Linux) または `Cmd+Shift+V` (Mac)
   - または、エディタ右上の「プレビューを開く」アイコンをクリック

2. **サイドバイサイドでプレビュー**
   - `Ctrl+K V` (Windows/Linux) または `Cmd+K V` (Mac)
   - エディタとプレビューを並べて表示

#### プレビュー対象のMarkdownファイル

- `E2E-TEST-GUIDE.md` - このガイド
- `e2e-test-scenarios.md` - 要件ベースのテストシナリオ
- `e2e-test-scenarios-implementation-based.md` - 実装ベースのテストシナリオ
- `README.md` - プロジェクトのREADME

### HTMLファイルのプレビュー方法

#### Playwrightテストレポートの表示

**方法1: Playwrightの組み込みコマンド（推奨）**

```bash
pnpm test:e2e:report
```

このコマンドは、最新のテストレポートをブラウザで自動的に開きます。

**方法2: Live Serverを使用**

1. `playwright-report/index.html` を右クリック
2. 「Open with Live Server」を選択
3. ブラウザでレポートが開きます

**方法3: Live Previewを使用**

1. `playwright-report/index.html` を右クリック
2. 「Show Preview」を選択
3. VS Code内でプレビューが表示されます

**方法4: Pythonの組み込みHTTPサーバー**

```bash
# playwright-reportディレクトリをサーバーで公開
python3 -m http.server 9323 --directory playwright-report

# ブラウザで http://localhost:9323 を開く
```

リモート環境の場合は、ポート9323をフォワードしてください。

### エビデンスファイルの表示

テスト実行後に生成されるエビデンスファイルも簡単に確認できます。

**スクリーンショット（.png）**
- VS Codeで直接開いて表示
- または、ファイルマネージャーで開く

**ビデオ（.webm）**
- システムのデフォルトビデオプレイヤーで再生
- または、ブラウザにドラッグ&ドロップ

**トレースファイル（.zip）**
```bash
pnpm exec playwright show-trace test-results/[テスト名]-chromium/trace.zip
```

---

## 参考資料

### 関連ドキュメント

- [e2e-test-scenarios.md](./e2e-test-scenarios.md) - 要件ベースのテストシナリオ
- [e2e-test-scenarios-implementation-based.md](./e2e-test-scenarios-implementation-based.md) - 実装ベースのテストシナリオ
- [Playwright公式ドキュメント](https://playwright.dev/)

### Jiraチケット

- [DEVIN-1](https://namunamuyaohachi.atlassian.net/browse/DEVIN-1) - PBI-CM-001 ヘッダーナビゲーション
- [DEVIN-5](https://namunamuyaohachi.atlassian.net/browse/DEVIN-5) - PBI-TP-002 主要コンテンツ表示
- [DEVIN-6](https://namunamuyaohachi.atlassian.net/browse/DEVIN-6) - PBI-DP-001 製品カテゴリトップページ表示
- [DEVIN-7](https://namunamuyaohachi.atlassian.net/browse/DEVIN-7) - PBI-DP-002 iPhoneカテゴリページ閲覧

---

## 更新履歴

| 日付 | 変更内容 | 担当者 |
|------|---------|--------|
| 2025-11-07 | 初版作成 | Devin AI |
| 2025-11-07 | エビデンス保存設定を追加（スクリーンショット、ビデオ、トレース） | Devin AI |

---

## お問い合わせ

テスト環境に関する質問や問題がある場合は、プロジェクトのIssueトラッカーに報告してください。
