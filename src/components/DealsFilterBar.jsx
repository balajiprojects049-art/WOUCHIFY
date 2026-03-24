function DealsFilterBar() {
  return (
    <section className="mt-8">
      <div className="rounded-2xl border border-line bg-white p-4 shadow-sm sm:p-5">
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4 xl:items-end">
          <div>
            <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-muted">Category</p>
            <button className="flex h-11 w-full items-center justify-between rounded-xl border border-line bg-cream px-4 text-sm font-medium text-ink transition-all duration-300 hover:-translate-y-1">
              <span>All Categories</span>
              <span className="text-muted">⌄</span>
            </button>
          </div>

          <div>
            <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-muted">Store</p>
            <button className="flex h-11 w-full items-center justify-between rounded-xl border border-line bg-cream px-4 text-sm font-medium text-ink transition-all duration-300 hover:-translate-y-1">
              <span>Popular Stores</span>
              <span className="text-muted">⌄</span>
            </button>
          </div>

          <div>
            <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-muted">Min Discount</p>
            <div className="flex h-11 items-center gap-2 rounded-xl border border-line bg-cream px-2">
              <button className="rounded-lg px-3 py-1.5 text-xs font-semibold text-ink transition-all duration-300 hover:scale-105">30%+</button>
              <button className="rounded-lg bg-gold/20 px-3 py-1.5 text-xs font-semibold text-gold transition-all duration-300 hover:scale-105">50%+</button>
              <button className="rounded-lg px-3 py-1.5 text-xs font-semibold text-ink transition-all duration-300 hover:scale-105">70%+</button>
            </div>
          </div>

          <div>
            <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-muted">Deal Type</p>
            <button className="flex h-11 w-full items-center justify-between rounded-xl border border-line bg-cream px-4 text-sm font-medium text-ink transition-all duration-300 hover:-translate-y-1">
              <span>Loot Deals</span>
              <span className="text-muted">⚲</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default DealsFilterBar
