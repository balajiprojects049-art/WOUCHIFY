import DealCard from './DealCard'
import { getDealRemainingSeconds } from '../utils/dealExpiry'

function DealGrid({ deals, nowMs }) {
  return (
    <section className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
      {deals.map((deal) => (
        <DealCard key={deal.slug} deal={deal} remainingSeconds={getDealRemainingSeconds(deal, nowMs)} />
      ))}

      {deals.length === 0 && (
        <article className="rounded-2xl border border-line bg-surface p-8 text-center text-sm font-medium text-muted sm:col-span-2 md:col-span-3 xl:col-span-4">
          No deals found for current filters.
        </article>
      )}
    </section>
  )
}

export default DealGrid
