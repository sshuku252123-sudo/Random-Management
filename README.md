# Random-Management

ランダム商品（ライブグッズ・アルバム特典など）を視覚的かつ効率的に管理・整理するアプリケーション

## 目次
- [プロジェクト概要](#プロジェクト概要)
- [対象ユーザー](#対象ユーザー)
- [機能要件](#機能要件)
- [非機能要件](#非機能要件)
- [技術仕様](#技術仕様)
- [データ構造](#データ構造)
- [画面構成](#画面構成)
- [セットアップ](#セットアップ)

---

## プロジェクト概要

### アプリ名（仮）
**ランダム商品管理アプリ**

### 目的
ユーザーが所有しているランダム商品（ライブグッズ・アルバム特典など）を、視覚的かつ効率的に管理・整理することを目的とする。

---

## 対象ユーザー
- 音楽ライブやイベントのグッズを収集している人
- ランダム商品のコレクション管理に課題を感じている人

---

## 機能要件

### 1. 商品登録機能
- ユーザーが商品を登録できる
- 登録時に以下の情報を入力できる：
  - 商品画像（アップロード）
  - 商品名（任意）
  - 公演名またはアルバム名（必須）
  - 所持数（数値）

### 2. 分類機能
- 商品を「公演名」「アルバム名」ごとにグループ化する
- グループごとに一覧表示できる

### 3. タグ機能
- 商品に複数のタグを付与できる
- タグ例：
  - 会場限定
  - レア
  - 推し
- タグは視覚的に識別できる（色・アイコンなど）

### 4. 数量管理機能
- 各商品に対して所持数を設定できる
- グループごとの合計所持数を表示する

### 5. カスタマイズ機能
- グループ（公演名・アルバム名）の表示設定を変更可能：
  - 文字色
  - 背景色
  - フォントスタイル（可能であれば）

### 6. 未所持リスト機能（ウィッシュリスト）
- ユーザーが「欲しい商品」を登録できる
- 所持商品とは別のリストとして管理する
- 将来的に「所持済み」へ移動できる設計とする

---

## 非機能要件
- スマートフォン・PC両対応（レスポンシブデザイン）
- 直感的に操作できるUI
- データは永続化されること（ログイン機能は任意）

---

## 技術仕様

### フロントエンド
- **Framework**: Next.js
- **UI Library**: React
- **Styling**: Tailwind CSS（候補）

### バックエンド
- **Runtime**: Node.js
- **API**: RESTful API設計

### データベース
- **選択**: Supabase（PostgreSQL）

---

## データ構造

### 商品データ（products テーブル）
```json
{
  "id": "UUID",
  "user_id": "UUID",
  "name": "string",
  "image_url": "string (nullable)",
  "category": "string (公演名 or アルバム名)",
  "quantity": "integer",
  "tags": "string[] (JSON array)",
  "status": "owned | wishlisted",
  "created_at": "timestamp",
  "updated_at": "timestamp"
}
```

### ウィッシュリスト（items テーブル）
```json
{
  "id": "UUID",
  "user_id": "UUID",
  "name": "string",
  "category": "string",
  "memo": "string (nullable)",
  "status": "wishlist",
  "created_at": "timestamp"
}
```

### グループ設定（group_settings テーブル）
```json
{
  "id": "UUID",
  "user_id": "UUID",
  "group_name": "string",
  "text_color": "string (hex code)",
  "background_color": "string (hex code)",
  "font_style": "string (optional)",
  "created_at": "timestamp",
  "updated_at": "timestamp"
}
```

---

## 画面構成

### 1. ホーム画面
- グループ一覧表示
- グループごとの統計情報（所持数など）

### 2. 商品一覧画面
- グループごとの商品表示
- 商品のフィルタリング・検索機能

### 3. 商品登録画面
- フォーム形式で入力
- 画像アップロード機能

### 4. ウィッシュリスト画面
- 欲しい商品の一覧表示
- 所持済みへの移動機能

---

## セットアップ

### 前提条件
- Node.js v18 以上
- npm または yarn

### インストール手順

```bash
# リポジトリをクローン
git clone <repository-url>
cd Random-Management

# フロントエンドの依存関係をインストール
cd frontend
npm install

# バックエンドの依存関係をインストール
cd ../backend
npm install
```

### 環境設定

フロントエンドとバックエンド各ディレクトリに `.env.local` ファイルを作成し、環境変数を設定してください。

**フロントエンド (.env.local)**
```
NEXT_PUBLIC_API_URL=http://localhost:3001
```

**バックエンド (.env.local)**
```
DATABASE_URL=<Your Supabase Connection String>
PORT=3001
```

### 開発環境の起動

```bash
# ターミナル 1: フロントエンド起動
cd frontend
npm run dev

# ターミナル 2: バックエンド起動
cd backend
npm run dev
```

フロントエンド: http://localhost:3000
バックエンド: http://localhost:3001
