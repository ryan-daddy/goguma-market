import { createClient } from '@/lib/supabase/server'
import Header from '@/components/Header'
import ProductList from '@/components/ProductList'
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
        <ProductList products={(products ?? []) as Product[]} />
      </main>
    </div>
  )
}
