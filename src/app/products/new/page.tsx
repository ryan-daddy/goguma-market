'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'

interface FormErrors {
  title?: string
  price?: string
  seller_name?: string
}

export default function NewProductPage() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errors, setErrors] = useState<FormErrors>({})
  const [form, setForm] = useState({
    title: '',
    price: '',
    description: '',
    image_url: '',
    seller_name: '',
  })

  function validate(): FormErrors {
    const errs: FormErrors = {}
    if (!form.title.trim()) errs.title = '상품명을 입력해 주세요.'
    if (!form.price) errs.price = '가격을 입력해 주세요.'
    else if (Number(form.price) < 0) errs.price = '올바른 가격을 입력해 주세요.'
    if (!form.seller_name.trim()) errs.seller_name = '판매자 이름을 입력해 주세요.'
    return errs
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length > 0) {
      setErrors(errs)
      return
    }

    setIsSubmitting(true)
    const supabase = createClient()
    const { error } = await supabase.from('products').insert({
      title: form.title.trim(),
      price: Number(form.price),
      description: form.description.trim() || null,
      image_url: form.image_url.trim() || null,
      seller_name: form.seller_name.trim(),
    })

    if (error) {
      alert('등록 중 오류가 발생했습니다. 다시 시도해 주세요.')
      setIsSubmitting(false)
      return
    }

    router.push('/')
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }))
    }
  }

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
          <span className="font-semibold text-gray-900">상품 등록</span>
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-4 py-6">
        <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-6">

          {/* 상품명 */}
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-semibold text-gray-700">
              상품명 <span className="text-orange-500">*</span>
            </label>
            <input
              type="text"
              name="title"
              value={form.title}
              onChange={handleChange}
              placeholder="상품명을 입력하세요"
              className={`w-full px-4 py-3 rounded-xl border text-[15px] outline-none transition-colors
                ${errors.title ? 'border-red-400 bg-red-50' : 'border-gray-200 bg-gray-50 focus:border-orange-400 focus:bg-white'}`}
            />
            {errors.title && <p className="text-xs text-red-500">{errors.title}</p>}
          </div>

          {/* 가격 */}
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-semibold text-gray-700">
              가격 <span className="text-orange-500">*</span>
            </label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 text-[15px]">₩</span>
              <input
                type="number"
                name="price"
                value={form.price}
                onChange={handleChange}
                placeholder="0"
                min="0"
                className={`w-full pl-8 pr-4 py-3 rounded-xl border text-[15px] outline-none transition-colors
                  ${errors.price ? 'border-red-400 bg-red-50' : 'border-gray-200 bg-gray-50 focus:border-orange-400 focus:bg-white'}`}
              />
            </div>
            {errors.price && <p className="text-xs text-red-500">{errors.price}</p>}
          </div>

          {/* 상품 설명 */}
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-semibold text-gray-700">상품 설명</label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              placeholder="상품 상태, 구성품, 거래 방법 등을 자유롭게 적어주세요"
              rows={5}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:border-orange-400 focus:bg-white text-[15px] outline-none transition-colors resize-none leading-relaxed"
            />
          </div>

          {/* 이미지 URL */}
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-semibold text-gray-700">이미지 URL</label>
            <input
              type="url"
              name="image_url"
              value={form.image_url}
              onChange={handleChange}
              placeholder="https://..."
              className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:border-orange-400 focus:bg-white text-[15px] outline-none transition-colors"
            />
            {form.image_url && (
              <div className="w-24 h-24 rounded-xl overflow-hidden bg-gray-100 mt-1">
                <img src={form.image_url} alt="미리보기" className="w-full h-full object-cover" />
              </div>
            )}
          </div>

          {/* 판매자 이름 */}
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-semibold text-gray-700">
              판매자 이름 <span className="text-orange-500">*</span>
            </label>
            <input
              type="text"
              name="seller_name"
              value={form.seller_name}
              onChange={handleChange}
              placeholder="닉네임 또는 이름"
              className={`w-full px-4 py-3 rounded-xl border text-[15px] outline-none transition-colors
                ${errors.seller_name ? 'border-red-400 bg-red-50' : 'border-gray-200 bg-gray-50 focus:border-orange-400 focus:bg-white'}`}
            />
            {errors.seller_name && <p className="text-xs text-red-500">{errors.seller_name}</p>}
          </div>

          {/* 버튼 */}
          <div className="flex gap-3 pt-2">
            <Link
              href="/"
              className="flex-1 py-3 rounded-full border border-gray-300 text-gray-600 font-semibold text-sm text-center hover:bg-gray-50 transition-colors"
            >
              취소
            </Link>
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 py-3 rounded-full bg-orange-500 hover:bg-orange-600 disabled:bg-orange-300 text-white font-semibold text-sm transition-colors"
            >
              {isSubmitting ? '등록 중...' : '등록'}
            </button>
          </div>

        </form>
      </main>
    </div>
  )
}
