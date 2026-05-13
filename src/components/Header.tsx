export default function Header() {
  return (
    <header className="sticky top-0 z-10 bg-white border-b border-gray-200">
      <div className="max-w-2xl mx-auto px-4 h-14 flex items-center justify-between gap-3">
        <a href="/" className="flex items-center gap-1.5 flex-shrink-0">
          <span className="text-xl">🍠</span>
          <span className="font-bold text-orange-500 text-lg tracking-tight">고구마마켓</span>
        </a>

        <div className="flex-1 max-w-xs">
          <div className="flex items-center gap-2 bg-gray-100 rounded-full px-3 py-2">
            <svg className="w-4 h-4 text-gray-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />
            </svg>
            <span className="text-sm text-gray-400">상품명을 검색해보세요</span>
          </div>
        </div>

        <button className="flex-shrink-0 bg-orange-500 hover:bg-orange-600 active:bg-orange-700 text-white text-sm font-semibold px-4 py-2 rounded-full transition-colors">
          글쓰기
        </button>
      </div>
    </header>
  )
}
