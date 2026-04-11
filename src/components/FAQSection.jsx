import { useState } from 'react'

const faqs = [
  {
    q: 'What is Wouchify?',
    a: 'Wouchify is a 100% free deal discovery platform where you can find verified deals, coupon codes, loot offers, giveaways, and credit card rewards all in one place. We handpick and verify every offer so you never waste time on expired deals.',
  },
  {
    q: 'Is Wouchify completely free to use?',
    a: 'Yes! Wouchify is completely free. There are no subscription fees, no hidden charges, and no premium tiers. Every deal, coupon, and reward on our platform is accessible to everyone without paying anything.',
  },
  {
    q: 'Do I need to create an account to use Wouchify?',
    a: 'No login required! You can browse all deals, coupons, and loot offers instantly without creating any account. Simply visit Wouchify, find what you need, and save money right away.',
  },
  {
    q: 'What are Loot Deals?',
    a: 'Loot Deals are super-limited, high-discount offers that are available for a very short time. These are the best flash deals from top brands and stores — often 70-90% off. Our team alerts you instantly via our Telegram channel.',
  },
  {
    q: 'How does the Daily Spin Wheel work?',
    a: 'Every day, you get one free spin on the Wouchify Reward Wheel. You can win discount vouchers, cashback codes, or special coupons. No registration needed — just spin and see what you win!',
  },
  {
    q: 'How do I use a coupon code from Wouchify?',
    a: 'Click on any coupon deal → Copy the code shown → Go to the store\'s website → Add items to your cart → Paste the code at checkout. That\'s it! Most codes work instantly. If a code doesn\'t work, please report it and we\'ll update it.',
  },
  {
    q: 'How are the deals verified?',
    a: 'Our team manually checks every deal, coupon, and offer before it goes live. We test codes, verify discounts, and mark items with expiry timestamps so you always know what\'s valid and what\'s not.',
  },
  {
    q: 'Can I submit a deal or coupon to share with others?',
    a: 'Absolutely! You can submit deals, loot finds, or coupon codes through our Contact page or our Telegram group. If verified, we\'ll feature your find on the platform with credit to you.',
  },
]

function FAQSection() {
  const [openIndex, setOpenIndex] = useState(null)

  return (
    <section className="py-4 sm:py-6" id="faq">
      <div className="mb-8 text-center sm:mb-10">
        <span className="inline-block rounded-full bg-gold/10 px-4 py-1.5 text-[11px] font-bold uppercase tracking-widest text-gold mb-3">
          Got Questions?
        </span>
        <h2 className="text-2xl font-extrabold tracking-tight text-ink sm:text-3xl lg:text-4xl">
          Frequently Asked <span className="text-gold">Questions</span>
        </h2>
        <p className="mt-2 text-sm text-muted sm:text-base max-w-md mx-auto">
          Everything you need to know about Wouchify.
        </p>
      </div>

      <div className="mx-auto max-w-2xl space-y-3">
        {faqs.map((faq, i) => (
          <div
            key={i}
            className={`rounded-2xl border transition-all duration-300 ${openIndex === i ? 'border-gold/40 bg-gold/5 shadow-md' : 'border-line bg-white hover:border-gold/20'}`}
          >
            <button
              onClick={() => setOpenIndex(openIndex === i ? null : i)}
              className="flex w-full items-start justify-between gap-4 p-5 text-left"
              aria-expanded={openIndex === i}
            >
              <span className="text-sm font-bold text-ink sm:text-base">{faq.q}</span>
              <span className={`shrink-0 mt-0.5 flex h-6 w-6 items-center justify-center rounded-full transition-all duration-300 ${openIndex === i ? 'bg-gold text-midnight rotate-45' : 'bg-line text-muted'}`}>
                <svg className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                </svg>
              </span>
            </button>

            {openIndex === i && (
              <div className="px-5 pb-5">
                <p className="text-sm leading-7 text-muted">{faq.a}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  )
}

export default FAQSection
