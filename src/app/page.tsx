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
    <>
      <Header />
      <main className="max-w-2xl mx-auto w-full px-4 py-4">
        {!products || products.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 gap-3 text-gray-400">
            <span className="text-5xl">🍠</span>
            <p className="text-sm">아직 등록된 상품이 없어요.</p>
          </div>
        ) : (
          <ul className="flex flex-col gap-3">
            {products.map((product: Product) => (
              <li key={product.id}>
                <ProductCard product={product} />
              </li>
            ))}
          </ul>
        )}
      </main>
    </>
  )
}
