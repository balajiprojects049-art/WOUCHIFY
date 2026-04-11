// Node 22 native fetch
const API = 'http://localhost:5000'

function id(prefix = '') {
  return prefix + Date.now().toString(36) + Math.random().toString(36).slice(2)
}

const cards = [
  { bank: 'TIDE', card: 'Tide Expense Card', cashback: '3.5% Cashback on marketing & business spends', partners: 'Facebook Ads • Google Ads • AWS', rewards: 'Zero Forex markup & No Annual Fee', applyUrl: 'https://tide.co', type: 'lifetime', cardImage: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=800&q=80', bankLogo: 'https://www.google.com/s2/favicons?sz=256&domain=tide.co', active: true },
  { bank: 'HDFC BANK', card: 'Millennia Credit Card', cashback: '5% Cashback on top websites', partners: 'Amazon • Flipkart • Swiggy • Zomato', rewards: '1000 Reward Points upon joining fee realization', applyUrl: 'https://hdfcbank.com', type: 'shopping', cardImage: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?auto=format&fit=crop&w=800&q=80', bankLogo: 'https://www.google.com/s2/favicons?sz=256&domain=hdfcbank.com', active: true },
  { bank: 'SBI CARD', card: 'SimplyCLICK SBI Card', cashback: '10X Reward Points on online shopping', partners: 'Apollo24x7 • BookMyShow • Cleartrip', rewards: 'Amazon.in e-gift card worth ₹500 on joining', applyUrl: 'https://sbicard.com', type: 'shopping', cardImage: 'https://images.unsplash.com/photo-1620714223084-8fcacc6dfd8d?auto=format&fit=crop&w=800&q=80', bankLogo: 'https://www.google.com/s2/favicons?sz=256&domain=sbi.co.in', active: true },
  { bank: 'ICICI BANK', card: 'Amazon Pay ICICI Card', cashback: '5% unlimited cashback for Prime Members', partners: 'Amazon • Amazon Pay merchants', rewards: 'Lifetime Free Card, no joining fee', applyUrl: 'https://amazon.in', type: 'lifetime', cardImage: 'https://images.unsplash.com/photo-1589758438368-0ad531db3366?auto=format&fit=crop&w=800&q=80', bankLogo: 'https://www.google.com/s2/favicons?sz=256&domain=icicibank.com', active: true },
  { bank: 'INDUSIND BANK', card: 'Legend Credit Card', cashback: '1% surcharge waiver on all fuel stations', partners: 'All India Petrol Pumps', rewards: 'Earn 1 Reward Point for every ₹100 spent', applyUrl: 'https://indusind.com', type: 'lifetime', cardImage: 'https://images.unsplash.com/photo-1562016598-a28ef72782e3?auto=format&fit=crop&w=800&q=80', bankLogo: 'https://www.google.com/s2/favicons?sz=256&domain=indusind.com', active: true }
]

async function seedCards() {
  const rootObj = {
    shopping: [],
    lifetime: []
  }

  for (const card of cards) {
    card.id = id('cc')
    if (card.type === 'lifetime') {
      rootObj.lifetime.push(card)
    } else {
      rootObj.shopping.push(card)
    }
  }

  try {
    await fetch(API + '/api/creditCards', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(rootObj)
    })
    console.log('✅ Successfully seeded Credit Cards collection (mode: single) into the Database!')
  } catch (error) {
    console.error('Error seeding cards:', error)
  }
}

seedCards();
