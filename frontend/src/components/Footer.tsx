'use client'

import React from 'react'

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white mt-12">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-bold mb-4">Random-Management</h3>
            <p className="text-gray-400">
              ランダム商品を効率的に管理するアプリケーション
            </p>
          </div>
          <div>
            <h4 className="text-lg font-bold mb-4">リンク</h4>
            <ul className="space-y-2 text-gray-400">
              <li><a href="/" className="hover:text-white">ホーム</a></li>
              <li><a href="/products" className="hover:text-white">商品一覧</a></li>
              <li><a href="/add-product" className="hover:text-white">商品登録</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-bold mb-4">その他</h4>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#" className="hover:text-white">プライバシーポリシー</a></li>
              <li><a href="#" className="hover:text-white">利用規約</a></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2024 Random-Management. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
