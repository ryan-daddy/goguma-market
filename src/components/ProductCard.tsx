import Link from 'next/link'
import { Product } from '@/types/product'

const STATUS_BADGE: Record<Product['status'], { label: string; className: string } | null> = {
  '판매중': null,
  '예약중': { label: '예약중', className: 'bg-yellow-100 text-yellow-700' },
  '판매완료': { label: '거래완료', className: 'bg-gray-100 text-gray-500' },
}

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

export default function ProductCard({ product }: { product: Product }) {
  const badge = STATUS_BADGE[product.status]
  const isSold = product.status === '판매완료'

  return (
    <Link href={`/products/${product.id}`} className="flex gap-4 px-4 py-5 hover:bg-gray-50 active:bg-gray-100 transition-colors border-b border-gray-100 last:border-0">
      <div className="w-[100px] h-[100px] rounded-2xl bg-gray-100 overflow-hidden flex-shrink-0">
        {product.image_url ? (
          <img
            src={product.image_url}
            alt={product.title}
            className={`w-full h-full object-cover ${isSold ? 'opacity-50' : ''}`}
          />
        ) : (
          <div className={`w-full h-full flex items-center justify-center text-4xl ${isSold ? 'opacity-40' : ''}`}>
            🍠
          </div>
        )}
      </div>

      <div className="flex flex-col justify-between min-w-0 py-0.5 flex-1">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-1.5 flex-wrap">
            {badge && (
              <span className={`text-xs font-medium px-1.5 py-0.5 rounded ${badge.className}`}>
                {badge.label}
              </span>
            )}
            <h2 className={`text-[15px] font-medium truncate ${isSold ? 'text-gray-400' : 'text-gray-900'}`}>
              {product.title}
            </h2>
          </div>
          <p className="text-xs text-gray-400">
            {product.seller_name} · {timeAgo(product.created_at)}
          </p>
        </div>

        <p className={`text-[15px] font-bold ${isSold ? 'text-gray-400' : 'text-gray-900'}`}>
          {isSold ? '거래완료' : `₩${product.price.toLocaleString()}`}
        </p>
      </div>
    </Link>
  )
}
