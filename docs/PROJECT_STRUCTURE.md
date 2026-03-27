# プロジェクト構造

```
Random-Management/
├── frontend/                    # Next.js フロントエンド
│   ├── src/
│   │   ├── pages/              # ページコンポーネント
│   │   ├── components/         # 再利用可能なコンポーネント
│   │   ├── lib/                # ユーティリティ関数
│   │   │   ├── supabase.ts     # Supabase クライアント
│   │   │   ├── apiClient.ts    # API クライアント
│   │   │   └── types.ts        # TypeScript 型定義
│   │   ├── styles/             # CSS スタイル
│   │   └── app/                # Next.js App Router
│   ├── public/                 # 静的ファイル
│   ├── package.json
│   ├── tsconfig.json
│   ├── next.config.js
│   ├── tailwind.config.ts
│   ├── postcss.config.js
│   ├── .eslintrc.json
│   └── .env.example
│
├── backend/                     # Node.js バックエンド API
│   ├── src/
│   │   ├── server.ts           # メインサーバーファイル
│   │   ├── routes/             # API ルート
│   │   │   └── products.ts     # 商品エンドポイント
│   │   ├── middleware/         # Express ミドルウェア
│   │   │   └── auth.ts         # 認証ミドルウェア
│   │   ├── models/             # データモデル
│   │   │   └── types.ts        # TypeScript 型定義
│   │   └── config/             # 環境設定
│   │       └── database.ts     # Supabase 設定
│   ├── package.json
│   ├── tsconfig.json
│   ├── .eslintrc.json
│   └── .env.example
│
├── docs/                        # ドキュメント
│   ├── SUPABASE_SETUP.md       # Supabase セットアップガイド
│   ├── supabase-schema.sql     # データベーススキーマ
│   └── PROJECT_STRUCTURE.md    # プロジェクト構造
│
├── .gitignore                  # Git 設定
└── README.md                   # プロジェクト説明
```

## フロントエンド構造詳細

### pages/ ディレクトリ
- `index.tsx`: ホーム画面
- `products/index.tsx`: 商品一覧画面
- `add-product.tsx`: 商品登録画面
- `wishlist.tsx`: ウィッシュリスト画面

### components/ ディレクトリ
- `Header.tsx`: ヘッダーコンポーネント
- `Footer.tsx`: フッターコンポーネント
- `ProductCard.tsx`: 商品カードコンポーネント
- `GroupCard.tsx`: グループカードコンポーネント
- `ProductForm.tsx`: 商品登録フォーム

### lib/ ディレクトリ
- `supabase.ts`: Supabase クライアントの初期化
- `apiClient.ts`: API クライアントの初期化
- `types.ts`: TypeScript 型定義

## バックエンド構造詳細

### routes/ ディレクトリ
- `products.ts`: 商品関連エンドポイント（GET, POST, PUT, DELETE）

### middleware/ ディレクトリ
- `auth.ts`: 認証処理とエラーハンドリング

### models/ ディレクトリ
- `types.ts`: ビジネスロジック用の型定義

### config/ ディレクトリ
- `database.ts`: Supabase クライアントの設定

## API エンドポイント

### 商品関連
- `GET /api/products` - 全商品取得
- `GET /api/products/:id` - 特定商品取得
- `GET /api/products/category/:category` - カテゴリ別取得
- `POST /api/products` - 商品作成
- `PUT /api/products/:id` - 商品更新
- `DELETE /api/products/:id` - 商品削除

## 開発環境起動手順

```bash
# フロントエンド起動
cd frontend
npm install
npm run dev

# バックエンド起動（別ターミナル）
cd backend
npm install
npm run dev
```

- フロントエンド: http://localhost:3000
- バックエンド: http://localhost:3001
