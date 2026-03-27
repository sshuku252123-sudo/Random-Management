# Supabase セットアップガイド

## 概要
このドキュメントでは、Supabase を使用したデータベースのセットアップ手順を説明します。

## 前提条件
- Supabase アカウント（https://supabase.io）
- ターミナル / コマンドラインへのアクセス

## セットアップ手順

### 1. Supabase プロジェクトの作成

1. [Supabase Dashboard](https://app.supabase.com) にアクセス
2. 「New Project」をクリック
3. 以下の情報を入力：
   - Project Name: `random-management`
   - Database Password: 強力なパスワードを設定
   - Region: 最寄りのリージョンを選択
   - Pricing Plan: Free または Pro（必要に応じて）

4. プロジェクト作成後、接続情報をメモ：
   - Supabase URL
   - Supabase Anon Key
   - Supabase Service Role Key

### 2. データベーススキーマの作成

1. Supabase Dashboard で「SQL Editor」を開く
2. [supabase-schema.sql](./supabase-schema.sql) の内容をコピー
3. SQL エディタに貼り付けて実行

### 3. Row Level Security (RLS) の設定

セキュリティのため、RLS ポリシーを設定することを推奨します：

```sql
-- Products RLS Policies
CREATE POLICY "Users can view their own products"
ON products FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own products"
ON products FOR INSERT
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own products"
ON products FOR UPDATE
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own products"
ON products FOR DELETE
USING (auth.uid() = user_id);
```

### 4. 環境変数の設定

#### フロントエンド (.env.local)
```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
NEXT_PUBLIC_API_URL=http://localhost:3001
```

#### バックエンド (.env.local)
```
DATABASE_URL=your_supabase_connection_string
SUPABASE_URL=your_supabase_url
SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
PORT=3001
NODE_ENV=development
CORS_ORIGIN=http://localhost:3000
```

### 5. 接続確認

バックエンド サーバーを起動して、Supabase への接続を確認：

```bash
cd backend
npm install
npm run dev
```

ヘルスチェック エンドポイントを確認：
```bash
curl http://localhost:3001/api/health
```

## トラブルシューティング

### 接続エラーが発生する場合
- Supabase URL と API キーが正しく入力されているか確認
- ファイアウォール設定を確認
- ブラウザの開発者ツールでネットワークタブを確認

### RLS エラーが発生する場合
- RLS ポリシーが正しく設定されているか確認
- 認証ユーザーのログイン情報が正しいか確認

## 参考資料
- [Supabase ドキュメント](https://supabase.io/docs)
- [PostgreSQL ドキュメント](https://www.postgresql.org/docs/)
