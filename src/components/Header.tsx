export default function Header() {
  return (
    <header className="sticky top-0 z-10 bg-orange-500 shadow-md">
      <div className="max-w-2xl mx-auto px-4 h-16 flex items-center justify-between">
        <a href="/" className="flex items-center gap-2">
          <span className="text-2xl">🍠</span>
          <span className="font-bold text-xl text-white tracking-tight">고구마마켓</span>
        </a>
        <button className="flex items-center gap-1.5 bg-white text-orange-500 text-sm font-semibold px-4 py-2 rounded-full shadow-sm hover:bg-orange-50 transition-colors">
          <span className="text-base leading-none">+</span>
          상품 등록
        </button>
      </div>
    </header>
  )
}
