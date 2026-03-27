'use client'

import React, { useState } from 'react'
import ProductForm from '@/components/ProductForm'
import ProductList from '@/components/ProductList'

export default function Home() {
  const [showForm, setShowForm] = useState(false)
  const [refreshTrigger, setRefreshTrigger] = useState(0)

  const handleProductAdded = () => {
    setShowForm(false)
    setRefreshTrigger(prev => prev + 1) // 商品一覧を更新
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <section className="text-center py-12 bg-white">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          ランダム商品管理アプリ
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          あなたのコレクションを効率的に管理・整理しましょう
        </p>
        <div className="flex gap-4 justify-center">
          <button
            onClick={() => setShowForm(!showForm)}
            className="btn-primary"
          >
            {showForm ? 'キャンセル' : '商品を登録'}
          </button>
        </div>
      </section>

      {showForm && (
        <section className="py-8">
          <div className="container mx-auto px-4">
            <ProductForm
              onSuccess={handleProductAdded}
              onCancel={() => setShowForm(false)}
            />
          </div>
        </section>
      )}

      <section className="py-8">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold mb-6 text-center">商品一覧</h2>
          <ProductList refreshTrigger={refreshTrigger} />
        </div>
      </section>

      <section className="py-8 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="card text-center">
              <div className="text-4xl mb-4">📸</div>
              <h3 className="text-lg font-bold mb-2">商品を登録</h3>
              <p className="text-gray-600">
                画像とともに商品情報を登録できます
              </p>
            </div>
            <div className="card text-center">
              <div className="text-4xl mb-4">🏷️</div>
              <h3 className="text-lg font-bold mb-2">タグで整理</h3>
              <p className="text-gray-600">
                複数のタグで効率的に分類できます
              </p>
            </div>
            <div className="card text-center">
              <div className="text-4xl mb-4">📊</div>
              <h3 className="text-lg font-bold mb-2">数量管理</h3>
              <p className="text-gray-600">
                所持数を追跡・管理できます
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
        <p className="text-gray-600">
          ここにはグループ一覧が表示されます（開発中）
        </p>
      </section>
    </div>
  )
}
