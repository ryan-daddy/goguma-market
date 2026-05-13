'use client'

import { useState, useMemo } from 'react'
import { Product, ProductStatus } from '@/types/product'
import ProductCard from '@/components/ProductCard'

type FilterStatus = '전체' | ProductStatus
type SortOption = 'latest' | 'price_asc' | 'price_desc'

const STATUS_FILTERS: FilterStatus[] = ['전체', '판매중', '예약중', '판매완료']

const SORT_OPTIONS: { value: SortOption; label: string }[] = [
  { value: 'latest', label: '최신순' },
  { value: 'price_asc', label: '낮은 가격순' },
  { value: 'price_desc', label: '높은 가격순' },
]

export default function ProductList({ products }: { products: Product[] }) {
  const [query, setQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState<FilterStatus>('전체')
  const [sort, setSort] = useState<SortOption>('latest')

  const filtered = useMemo(() => {
    let result = products.filter(p => {
      const matchesQuery = query.trim()
        ? p.title.toLowerCase().includes(query.trim().toLowerCase())
        : true
      const matchesStatus = statusFilter === '전체' ? true : p.status === statusFilter
      return matchesQuery && matchesStatus
    })

    if (sort === 'price_asc') result = [...result].sort((a, b) => a.price - b.price)
    else if (sort === 'price_desc') result = [...result].sort((a, b) => b.price - a.price)

    return result
  }, [products, query, statusFilter, sort])

  return (
    <>
      {/* 검색창 */}
      <div className="px-4 pt-3 pb-2">
        <div className="flex items-center gap-2 bg-gray-100 rounded-full px-4 py-2.5">
          <svg className="w-4 h-4 text-gray-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />
          </svg>
          <input
            type="text"
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="상품명을 검색해보세요"
            className="flex-1 bg-transparent text-sm text-gray-700 placeholder:text-gray-400 outline-none"
          />
          {query && (
            <button onClick={() => setQuery('')} className="text-gray-400 hover:text-gray-600 transition-colors">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>
      </div>

      {/* 상태 필터 + 정렬 */}
      <div className="flex items-center justify-between px-4 py-2 border-b border-gray-100">
        <div className="flex gap-2">
          {STATUS_FILTERS.map(status => (
            <button
              key={status}
              onClick={() => setStatusFilter(status)}
              className={`px-3.5 py-1.5 rounded-full text-sm font-medium transition-colors ${
                statusFilter === status
                  ? 'bg-orange-500 text-white'
                  : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
              }`}
            >
              {status}
            </button>
          ))}
        </div>
        <select
          value={sort}
          onChange={e => setSort(e.target.value as SortOption)}
          className="text-sm text-gray-500 bg-transparent outline-none cursor-pointer"
        >
          {SORT_OPTIONS.map(o => (
            <option key={o.value} value={o.value}>{o.label}</option>
          ))}
        </select>
      </div>

      {/* 결과 */}
      {filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-32 gap-3 text-gray-400">
          <span className="text-5xl">🍠</span>
          <p className="text-sm">
            {query ? `"${query}"에 해당하는 상품이 없습니다.` : '등록된 상품이 없습니다.'}
          </p>
        </div>
      ) : (
        <ul>
          {filtered.map(product => (
            <li key={product.id}>
              <ProductCard product={product} />
            </li>
          ))}
        </ul>
      )}
    </>
  )
}
