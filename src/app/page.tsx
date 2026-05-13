import { createClient } from '@/lib/supabase/server'
import Header from '@/components/Header'
import ProductCard from '@/components/ProductCard'
import { Product } from '@/types/product'

export default async function Home() {
  const supabase = await createClient()
  const { data: products } = await supabase
    .from('products')
    .select('*')
    .order('created_at', { ascending: false })

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main className="max-w-2xl mx-auto">
        {!products || products.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-32 gap-3 text-gray-400">
            <span className="text-5xl">🍠</span>
            <p className="text-sm">등록된 상품이 없습니다.</p>
          </div>
        ) : (
          <ul>
            {products.map((product: Product) => (
              <li key={product.id}>
                <ProductCard product={product} />
              </li>
            ))}
          </ul>
        )}
      </main>
    </div>
  )
}
