'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import apiClient from '@/lib/apiClient'

interface Product {
  id: string
  name: string
  category: string
  quantity: number
  tags: string[]
  image_url?: string
  status: string
  created_at: string
}

interface ProductListProps {
  refreshTrigger?: number
}

export default function ProductList({ refreshTrigger }: ProductListProps) {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchProducts = async () => {
    try {
      setLoading(true)
      const response = await apiClient.get('/products')
      setProducts(response.data.data || [])
    } catch (err: any) {
      setError(err.response?.data?.error?.message || '商品の取得に失敗しました')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchProducts()
  }, [refreshTrigger])

  const handleDelete = async (id: string) => {
    if (!confirm('この商品を削除しますか？')) return

    try {
      await apiClient.delete(`/products/${id}`)
      fetchProducts() // リストを更新
    } catch (err: any) {
      alert('削除に失敗しました: ' + (err.response?.data?.error?.message || '不明なエラー'))
    }
  }

  if (loading) {
    return (
      <div className="text-center py-8">
        <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        <p className="mt-2 text-gray-600">読み込み中...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-center py-8">
        <p className="text-red-600">{error}</p>
        <button
          onClick={fetchProducts}
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          再試行
        </button>
      </div>
    )
  }

  if (products.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">まだ商品が登録されていません</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {products.map((product) => (
        <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden">
          {product.image_url && (
            <div className="relative h-48">
              <Image
                src={product.image_url}
                alt={product.name}
                fill
                className="object-cover"
              />
            </div>
          )}
          <div className="p-4">
            <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
            <p className="text-sm text-gray-600 mb-2">カテゴリ: {product.category}</p>
            <p className="text-sm text-gray-600 mb-2">数量: {product.quantity}</p>
            {product.tags && product.tags.length > 0 && (
              <div className="mb-2">
                <p className="text-sm text-gray-600 mb-1">タグ:</p>
                <div className="flex flex-wrap gap-1">
                  {product.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}
            <div className="flex justify-end mt-4">
              <button
                onClick={() => handleDelete(product.id)}
                className="px-3 py-1 bg-red-600 text-white text-sm rounded hover:bg-red-700"
              >
                削除
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}