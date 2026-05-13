import { notFound } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import { Product } from '@/types/product'
import DeleteButton from '@/components/DeleteButton'
import StatusSelector from '@/components/StatusSelector'

function timeAgo(dateStr: string) {
  const diff = Date.now() - new Date(dateStr).getTime()
  const minutes = Math.floor(diff / 60000)
  if (minutes < 1) return '방금 전'
  if (minutes < 60) return `${minutes}분 전`
  const hours = Math.floor(minutes / 60)
  if (hours < 24) return `${hours}시간 전`
  const days = Math.floor(hours / 24)
  if (days < 30) return `${days}일 전`
  return `${Math.floor(days / 30)}달 전`
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const supabase = await createClient()
  const { data: product } = await supabase
    .from('products')
    .select('*')
    .eq('id', id)
    .single()

  if (!product) notFound()

  const isSold = product.status === '판매완료'

  return (
    <div className="min-h-screen bg-white">
      {/* 헤더 */}
      <header className="sticky top-0 z-10 bg-white border-b border-gray-200">
        <div className="max-w-2xl mx-auto px-4 h-14 flex items-center gap-3">
          <Link href="/" className="p-2 -ml-2 rounded-full hover:bg-gray-100 transition-colors">
            <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </Link>
          <span className="font-semibold text-gray-900 flex-1">상품 정보</span>
          <div className="flex items-center gap-3">
            <Link
              href={`/products/${product.id}/edit`}
              className="text-sm text-orange-500 font-semibold hover:text-orange-600 transition-colors"
            >
              수정
            </Link>
            <DeleteButton productId={product.id} />
          </div>
        </div>
      </header>

      <main className="max-w-2xl mx-auto">
        {/* 이미지 */}
        <div className="w-full aspect-square bg-gray-100">
          {product.image_url ? (
            <img
              src={product.image_url}
              alt={product.title}
              className={`w-full h-full object-cover ${isSold ? 'opacity-50' : ''}`}
            />
          ) : (
            <div className={`w-full h-full flex items-center justify-center text-8xl ${isSold ? 'opacity-40' : ''}`}>
              🍠
            </div>
          )}
        </div>

        {/* 상품 정보 */}
        <div className="px-4 py-5 border-b border-gray-100">
          <div className="flex items-center gap-2 mb-2">
            <StatusSelector productId={product.id} initialStatus={product.status} />
          </div>
          <h1 className="text-xl font-bold text-gray-900 mb-1">{product.title}</h1>
          <p className="text-sm text-gray-400">{product.seller_name} · {timeAgo(product.created_at)}</p>
        </div>

        {/* 설명 */}
        {product.description && (
          <div className="px-4 py-5 border-b border-gray-100">
            <p className="text-[15px] text-gray-700 leading-relaxed whitespace-pre-wrap">
              {product.description}
            </p>
          </div>
        )}
      </main>

      {/* 하단 가격 + 버튼 */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200">
        <div className="max-w-2xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
          <div>
            {isSold ? (
              <span className="text-gray-400 font-medium">거래완료</span>
            ) : (
              <span className="text-xl font-bold text-gray-900">₩{product.price.toLocaleString()}</span>
            )}
          </div>
          <button
            disabled={isSold}
            className="flex-1 max-w-[200px] bg-orange-500 hover:bg-orange-600 disabled:bg-gray-200 disabled:text-gray-400 text-white font-semibold py-3 rounded-full transition-colors text-sm"
          >
            {isSold ? '판매완료' : '채팅으로 구매하기'}
          </button>
        </div>
      </div>

      {/* 하단 버튼 공간 확보 */}
      <div className="h-20" />
    </div>
  )
}
