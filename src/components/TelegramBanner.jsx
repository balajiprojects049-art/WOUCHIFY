function TelegramBanner() {
  return (
    <section className="mt-16 sm:mt-20">
      <div className="relative overflow-hidden rounded-[1.5rem] bg-gradient-to-r from-midnight via-[#262321] to-[#3A342B] p-6 text-white shadow-sm transition-all duration-300 hover:-translate-y-2 sm:rounded-[2rem] sm:p-14">
        <p className="inline-flex rounded-full bg-gold/20 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.22em] text-gold">
          Real-Time Alerts
        </p>

        <h3 className="mt-4 max-w-2xl text-3xl font-bold leading-[1.08] tracking-tight sm:mt-5 sm:text-6xl">
          Join our <span className="text-goldsoft">Telegram</span>
          <br />
          <span className="text-goldsoft">Channel</span> for instant
          <br />
          alerts.
        </h3>

        <p className="mt-4 max-w-lg text-sm leading-7 text-slate-200/80 sm:mt-6 sm:text-xl sm:leading-8">
          Don&apos;t wait for emails. Get the absolute best loot deals and limited-time coupons pushed directly to your phone the second they go live.
        </p>

        <div className="mt-7 flex flex-wrap items-center gap-4 sm:mt-9 sm:gap-6">
          <a
            href="https://t.me"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-lg bg-white px-6 py-3 text-sm font-semibold text-ink transition-all duration-300 hover:scale-105 sm:px-8 sm:py-4 sm:text-base"
          >
            <span>Join Now</span>
            <span aria-hidden="true">→</span>
          </a>

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
