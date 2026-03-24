import DealCard from './DealCard'

function DealGrid({ deals, elapsedSeconds }) {
  return (
    <section className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {deals.map((deal) => (
        <DealCard key={deal.slug} deal={deal} remainingSeconds={deal.expiresInSeconds - elapsedSeconds} />
      ))}

      {deals.length === 0 && (
        <article className="rounded-2xl border border-line bg-white p-8 text-center text-sm font-medium text-muted sm:col-span-2 lg:col-span-4">
          No deals found for current filters.
        </article>
      )}
    </section>
  )
}

export default DealGrid
