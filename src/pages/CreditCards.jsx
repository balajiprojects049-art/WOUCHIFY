import { useEffect, useState } from 'react'
import PageBanner from '../components/PageBanner'

const shoppingCards = [
  {
    bank: 'AXIS BANK',
    card: 'Flipkart Card',
    cashback: 'Up to 7.5% Cashback',
    partners: 'Flipkart • Myntra • Uber • Cleartrip',
    rewards: 'Flat ₹1,400 Rewards',
    wrapper: 'from-cream via-surface to-cream',
    cardImage: '/axis-bank-cashback-credit-card.jpg',
  },
  {
    bank: 'SBI CARD',
    card: 'Flipkart Card',
    cashback: 'Up to 7.5% Cashback',
    partners: 'Flipkart • Myntra • Cleartrip • Uber',
    rewards: 'Flat ₹1,400 Rewards',
    wrapper: 'from-cream via-surface to-cream',
    cardImage: '/axis-bank-cashback-credit-card.jpg',
  },
  {
    bank: 'SBI CARD',
    card: 'Cashback Card',
    cashback: '5% Cashback on all online spends',
    partners: 'Amazon • Flipkart • Myntra • 1000+ stores',
    rewards: 'Flat ₹1,500 Rewards',
    wrapper: 'from-cream via-surface to-cream',
    cardImage: 'https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?auto=format&fit=crop&w=900&q=80',
  },
  {
    bank: 'HDFC BANK',
    card: 'Millennia Card',
    cashback: '5% Cashback on top merchants',
    partners: 'Amazon • Myntra • Flipkart and more',
    rewards: 'Flat ₹1,100 Rewards',
    wrapper: 'from-cream via-surface to-cream',
    cardImage: 'https://images.unsplash.com/photo-1601597111158-2fceff292cdc?auto=format&fit=crop&w=900&q=80',
  },
]

const lifetimeCards = [
  {
    bank: 'AXIS BANK',
    card: 'MyZone Card',
    cashback: 'Save ₹2,800 On welcome benefits',
    partners: 'Movies • Dining • Shopping offers',
    rewards: 'Lifetime Free',
    wrapper: 'from-midnight via-navysoft to-navy',
    cardImage: '/axis-bank-cashback-credit-card.jpg',
  },
  {
    bank: 'SCAPIA',
    card: 'Travel Card',
    cashback: 'No Forex Fee on international spends',
    partners: 'Flights • Hotels • Global merchants',
    rewards: 'Lifetime Free',
    wrapper: 'from-midnight via-navysoft to-navy',
    cardImage: '/axis-bank-cashback-credit-card.jpg',
  },
  {
    bank: 'BOB CARD',
    card: 'Eterna Card',
    cashback: 'Premium lifestyle privileges',
    partners: 'Dining • Travel • Shopping',
    rewards: 'Lifetime Free',
    wrapper: 'from-midnight via-navysoft to-navy',
    cardImage: 'https://images.unsplash.com/photo-1580048915913-4f8f5cb481c4?auto=format&fit=crop&w=900&q=80',
  },
  {
    bank: 'IDFC FIRST',
    card: 'Credit Card',
    cashback: 'Welcome offers and zero joining fee',
    partners: 'Fuel • Grocery • Online spends',
    rewards: 'Lifetime Free',
    wrapper: 'from-midnight via-navysoft to-navy',
    cardImage: 'https://images.unsplash.com/photo-1627989580309-bfaf3e58af6f?auto=format&fit=crop&w=900&q=80',
  },
]

function CreditCardDetailCard({ item, dark = false }) {
  return (
    <article className={`group relative flex flex-col overflow-hidden rounded-[2.5rem] border border-line p-5 shadow-sm transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_40px_80px_rgba(0,0,0,0.12)] ${dark ? 'bg-midnight text-white border-white/10' : 'bg-white text-ink'}`}>
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1">
          <div className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-widest ${dark ? 'bg-white/10 text-gold' : 'bg-gold/10 text-gold'}`}>
            <span className="h-1.5 w-1.5 rounded-full bg-gold animate-pulse" />
            {item.bank}
          </div>
          <h3 className="mt-3 text-2xl font-black tracking-tight leading-tight sm:text-3xl">{item.card}</h3>
        </div>
        <div className="relative h-20 w-32 shrink-0 overflow-hidden rounded-2xl border border-line bg-cream/30 p-1.5 shadow-inner">
           <img src={item.cardImage} alt={item.card} className="h-full w-full object-cover rounded-xl transition-transform duration-500 group-hover:scale-110" />
        </div>
      </div>

      <div className="mt-8 flex-1">
         <div className="grid grid-cols-2 gap-4">
            <div className={`rounded-2xl p-4 transition-colors ${dark ? 'bg-white/5' : 'bg-cream/50'}`}>
               <p className={`text-[10px] font-bold uppercase tracking-widest ${dark ? 'text-slate-500' : 'text-muted'}`}>Top Benefit</p>
               <p className="mt-1 text-sm font-bold leading-tight">{item.cashback}</p>
            </div>
            <div className={`rounded-2xl p-4 transition-colors ${dark ? 'bg-white/5' : 'bg-cream/50'}`}>
               <p className={`text-[10px] font-bold uppercase tracking-widest ${dark ? 'text-slate-500' : 'text-muted'}`}>Rewards</p>
               <p className="mt-1 text-sm font-bold leading-tight">{item.rewards}</p>
            </div>
         </div>
         
         <div className="mt-6">
            <p className={`text-[10px] font-bold uppercase tracking-widest ${dark ? 'text-slate-500' : 'text-muted'}`}>Verified Partners</p>
            <div className="mt-2 flex flex-wrap gap-1.5">
               {item.partners.split('•').map((p, i) => (
                 <span key={i} className={`rounded-lg px-2.5 py-1 text-[11px] font-medium ${dark ? 'bg-white/10 text-slate-300' : 'bg-cream text-muted'}`}>
                   {p.trim()}
                 </span>
               ))}
            </div>
         </div>
      </div>

      <div className="mt-8 border-t border-line/50 pt-6 flex items-center justify-between gap-4">
         <div className="flex -space-x-3 overflow-hidden">
            {[1,2,3].map(i => (
              <div key={i} className={`inline-block h-8 w-8 rounded-full ring-2 ${dark ? 'ring-midnight bg-slate-800' : 'ring-white bg-slate-200'} flex items-center justify-center text-[10px] font-bold`}>
                 U{i}
              </div>
            ))}
            <div className={`flex items-center justify-center h-8 px-2 rounded-full text-[9px] font-bold ${dark ? 'bg-white/10 text-gold' : 'bg-gold/10 text-gold'}`}>
               +2.4k
            </div>
         </div>
         <button className={`inline-flex items-center gap-2 rounded-2xl px-6 py-3 text-sm font-black shadow-lg transition-all hover:scale-105 active:scale-95 ${dark ? 'bg-gold text-midnight hover:bg-white' : 'bg-navy text-cream hover:bg-black'}`}>
           Get Card
           <span className="text-base">→</span>
         </button>
      </div>
    </article>
  )
}

import ScrollingPageBanner from '../components/ScrollingPageBanner'

const creditCardBanners = [
  {
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=1200&q=80',
    label: 'Axis Flipkart Card',
    title: 'Flat ₹1,400 Welcome Rewards',
    description: 'Plus 5% Unlimited Cashback on Flipkart & Myntra forever.',
    link: '/credit-cards',
  },
  {
    image: 'https://images.unsplash.com/photo-1517336714739-489689fd1ca8?auto=format&fit=crop&w=1200&q=80',
    label: 'SBI Cashback Card',
    title: '5% Ready Cashback',
    description: 'Direct cashback on all your online spends with no daily caps.',
    link: '/credit-cards',
  },
  {
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=1200&q=80',
    label: 'IDFC Millennia',
    title: '10X Reward Points',
    description: 'Lifetime Free Card with incredible birthday and dining offers.',
    link: '/credit-cards',
  },
]

function CreditCards() {
  return (
    <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      {/* Banner Scrolling Section (Matching Stores style) */}
      <section className="mb-14">
         <ScrollingPageBanner banners={creditCardBanners} />
      </section>

      <section>
        <div className="flex items-center gap-4 mb-10">
           <div className="h-px flex-1 bg-line" />
           <h2 className="text-sm font-black uppercase tracking-[0.25em] text-ink">Premium Shopping Cards</h2>
           <div className="h-px flex-1 bg-line" />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14">
          {shoppingCards.map((card, i) => (
            <CreditCardDetailCard key={i} item={card} />
          ))}
        </div>
      </section>

      <section className="mt-24">
        <div className="flex items-center gap-4 mb-10">
           <div className="h-px flex-1 bg-line" />
           <h2 className="text-sm font-black uppercase tracking-[0.25em] text-ink">Unlimited Lifetime Free</h2>
           <div className="h-px flex-1 bg-line" />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14">
          {lifetimeCards.map((card, i) => (
            <CreditCardDetailCard key={i} item={card} dark />
          ))}
        </div>
      </section>
    </main>
  )
}

export default CreditCards
