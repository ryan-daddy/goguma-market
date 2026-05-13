'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { ProductStatus } from '@/types/product'

const STATUS_STYLE: Record<ProductStatus, string> = {
  '판매중': 'bg-orange-100 text-orange-600',
  '예약중': 'bg-yellow-100 text-yellow-700',
  '판매완료': 'bg-gray-100 text-gray-500',
}

const OPTIONS: ProductStatus[] = ['판매중', '예약중', '판매완료']

export default function StatusSelector({
  productId,
  initialStatus,
}: {
  productId: string
  initialStatus: ProductStatus
}) {
  const [status, setStatus] = useState<ProductStatus>(initialStatus)
  const [isSaving, setIsSaving] = useState(false)

  async function handleChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const next = e.target.value as ProductStatus
    setIsSaving(true)
    const supabase = createClient()
    const { error } = await supabase
      .from('products')
      .update({ status: next })
      .eq('id', productId)

    if (error) {
      alert('상태 변경에 실패했습니다.')
    } else {
      setStatus(next)
    }
    setIsSaving(false)
  }

  return (
    <div className="relative inline-flex items-center">
      <span className={`text-xs font-medium px-2 py-1 rounded-full pointer-events-none absolute left-0 ${STATUS_STYLE[status]}`}>
        {isSaving ? '저장 중...' : status}
      </span>
      <select
        value={status}
        onChange={handleChange}
        disabled={isSaving}
        className="opacity-0 absolute inset-0 w-full h-full cursor-pointer"
        aria-label="판매 상태 변경"
      >
        {OPTIONS.map(o => (
          <option key={o} value={o}>{o}</option>
        ))}
      </select>
    </div>
  )
}
