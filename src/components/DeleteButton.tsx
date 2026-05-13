'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'

export default function DeleteButton({ productId }: { productId: string }) {
  const router = useRouter()
  const [showConfirm, setShowConfirm] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)

  async function handleDelete() {
    setIsDeleting(true)
    const supabase = createClient()
    const { error } = await supabase.from('products').delete().eq('id', productId)

    if (error) {
      alert('삭제 중 오류가 발생했습니다. 다시 시도해 주세요.')
      setIsDeleting(false)
      setShowConfirm(false)
      return
    }

    router.push('/')
  }

  return (
    <>
      <button
        onClick={() => setShowConfirm(true)}
        className="text-sm text-red-400 font-semibold hover:text-red-500 transition-colors"
      >
        삭제
      </button>

      {/* 확인 모달 */}
      {showConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-6">
          <div className="absolute inset-0 bg-black/40" onClick={() => setShowConfirm(false)} />
          <div className="relative bg-white rounded-2xl w-full max-w-sm p-6 flex flex-col gap-4 shadow-xl">
            <div className="flex flex-col gap-1">
              <h2 className="text-base font-bold text-gray-900">상품을 삭제할까요?</h2>
              <p className="text-sm text-gray-500">삭제된 상품은 복구할 수 없습니다.</p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setShowConfirm(false)}
                disabled={isDeleting}
                className="flex-1 py-3 rounded-full border border-gray-300 text-gray-600 font-semibold text-sm hover:bg-gray-50 transition-colors"
              >
                취소
              </button>
              <button
                onClick={handleDelete}
                disabled={isDeleting}
                className="flex-1 py-3 rounded-full bg-red-500 hover:bg-red-600 disabled:bg-red-300 text-white font-semibold text-sm transition-colors"
              >
                {isDeleting ? '삭제 중...' : '삭제'}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
