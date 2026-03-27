'use client'

import Link from 'next/link'
import React from 'react'

export default function Header() {
  return (
    <header className="bg-white shadow">
      <nav className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="text-2xl font-bold text-indigo-600">
          Random-Management
        </Link>
        <ul className="flex gap-6">
          <li>
            <Link href="/" className="text-gray-700 hover:text-indigo-600">
              ホーム
            </Link>
          </li>
          <li>
            <Link href="/products" className="text-gray-700 hover:text-indigo-600">
              商品一覧
            </Link>
          </li>
          <li>
            <Link href="/add-product" className="text-gray-700 hover:text-indigo-600">
              商品登録
            </Link>
          </li>
          <li>
            <Link href="/wishlist" className="text-gray-700 hover:text-indigo-600">
              ウィッシュリスト
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  )
}
