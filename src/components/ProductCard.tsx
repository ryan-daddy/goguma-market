import { Product } from '@/types/product'

const STATUS_STYLE: Record<Product['status'], string> = {
  '판매중': 'bg-orange-100 text-orange-600',
  '예약중': 'bg-yellow-100 text-yellow-600',
  '판매완료': 'bg-gray-100 text-gray-500',
}

function timeAgo(dateStr: string) {
  const diff = Date.now() - new Date(dateStr).getTime()
  const minutes = Math.floor(diff / 60000)
  if (minutes < 1) return '방금 전'
  if (minutes < 60) return `${minutes}분 전`
  const hours = Math.floor(minutes / 60)
  if (hours < 24) return `${hours}시간 전`
  const days = Math.floor(hours / 24)
  return `${days}일 전`
}

export default function ProductCard({ product }: { product: Product }) {
  return (
    <article className="flex gap-4 p-4 rounded-xl bg-white shadow-sm border border-gray-100 cursor-pointer transition-all duration-200 hover:-translate-y-1 hover:shadow-md">
      <div className="w-24 h-24 rounded-xl bg-gray-100 overflow-hidden flex-shrink-0">
        {product.image_url ? (
          <img
            src={product.image_url}
            alt={product.title}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-3xl">🍠</div>
        )}
      </div>

      <div className="flex flex-col gap-1 min-w-0">
        <div className="flex items-center gap-2">
          {product.status !== '판매중' && (
            <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${STATUS_STYLE[product.status]}`}>
              {product.status}
            </span>
          )}
          <h2 className={`font-medium text-gray-900 truncate ${product.status === '판매완료' ? 'text-gray-400' : ''}`}>
            {product.title}
          </h2>
        </div>
        <p className="text-xs text-gray-400">{product.seller_name} · {timeAgo(product.created_at)}</p>
        <p className="font-bold text-gray-900 mt-auto">
          {product.status === '판매완료'
            ? <span className="text-gray-400 font-normal">거래완료</span>
            : `₩${product.price.toLocaleString()}`
          }
        </p>
      </div>
    </article>
  )
}
