function TelegramBanner() {
  return (
    <section className="mt-20">
      <div className="relative overflow-hidden rounded-[2rem] bg-gradient-to-r from-midnight via-[#262321] to-[#3A342B] p-8 text-white shadow-sm transition-all duration-300 hover:-translate-y-2 sm:p-14">
        <p className="inline-flex rounded-full bg-gold/20 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.22em] text-gold">
          Real-Time Alerts
        </p>

        <h3 className="mt-5 max-w-2xl text-4xl font-bold leading-[1.05] tracking-tight sm:text-6xl">
          Join our <span className="text-goldsoft">Telegram</span>
          <br />
          <span className="text-goldsoft">Channel</span> for instant
          <br />
          alerts.
        </h3>

        <p className="mt-6 max-w-lg text-sm leading-8 text-slate-200/80 sm:text-xl sm:leading-8">
          Don&apos;t wait for emails. Get the absolute best loot deals and limited-time coupons pushed directly to your phone the second they go live.
        </p>

        <div className="mt-9 flex flex-wrap items-center gap-6">
          <button className="inline-flex items-center gap-2 rounded-lg bg-white px-8 py-4 text-base font-semibold text-midnight transition-all duration-300 hover:scale-105">
            <span>Join Now</span>
            <span aria-hidden="true">→</span>
          </button>

          <div className="flex items-center gap-3 text-sm text-slate-200/75">
            <p className="font-medium">45k+ active members</p>
          </div>
        </div>

        <p className="pointer-events-none absolute right-10 top-1/2 hidden -translate-y-1/2 text-[220px] font-black tracking-[-0.15em] text-gold/9 md:block">
          &gt;&gt;
        </p>
      </div>
    </section>
  )
}

export default TelegramBanner
