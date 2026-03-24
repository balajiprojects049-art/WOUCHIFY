const tabs = ['Popular', 'Top Rated', 'Apparel', 'Watches', 'Lifestyle']

function CategoryTabs() {
  return (
    <section className="mt-16">
      <div className="flex items-center justify-center gap-8 overflow-x-auto border-b border-line pb-4">
        {tabs.map((tab, index) => (
          <button
            key={tab}
            className={`whitespace-nowrap border-b-2 pb-2.5 text-sm font-medium transition-colors duration-300 ${
              index === 0
                ? 'border-ink text-ink'
                : 'border-transparent text-muted hover:text-ink'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>
    </section>
  )
}

export default CategoryTabs
