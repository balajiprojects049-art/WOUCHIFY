// Node 22 native fetch
const API = 'http://localhost:5000'

const newStores = [
  {
    slug: 'amazon',
    name: 'Amazon',
    category: 'Shopping',
    logoText: 'AZ',
    logo: '',
    cashback: 'Up to 5% cashback',
    highlight: 'Millions of products and fast Prime delivery',
    description: "Amazon is the world's largest online marketplace offering almost everything from electronics to groceries.",
    website: 'https://www.amazon.in',
    offers: ['10% instant discount on SBI cards', 'Free Prime delivery for members']
  },
  {
    slug: 'ajio',
    name: 'Ajio',
    category: 'Fashion',
    logoText: 'AJ',
    logo: '',
    cashback: 'Up to 8% cashback',
    highlight: 'Trendy apparel, footwear, and accessories',
    description: "Ajio is Reliance's flagship fashion platform, offering trending ethnic and western apparel.",
    website: 'https://www.ajio.com',
    offers: ['Min 50% off on top brands', 'Extra 10% on pre-paid orders']
  },
  {
    slug: 'bigbasket',
    name: 'BigBasket',
    category: 'Groceries',
    logoText: 'BB',
    logo: '',
    cashback: 'Up to ₹100 cashback',
    highlight: 'Fresh fruits, vegetables & groceries safely delivered',
    description: "BigBasket is India's largest online supermarket delivering groceries and daily essentials quickly.",
    website: 'https://www.bigbasket.com',
    offers: ['₹200 cashback on ₹1500+ orders', 'Free delivery on first order']
  },
  {
    slug: 'flipkart',
    name: 'Flipkart',
    category: 'Shopping',
    logoText: 'FK',
    logo: '',
    cashback: 'Up to 6% cashback',
    highlight: 'Homegrown e-commerce giant with heavy discounts',
    description: "Flipkart is India's homegrown e-commerce giant known for electronics, fashion, furniture and daily essentials.",
    website: 'https://www.flipkart.com',
    offers: ['Extra 5% off on Flipkart Axis Card', 'SuperCoins on every purchase']
  },
  {
    slug: 'firstcry',
    name: 'FirstCry',
    category: 'Kids & Baby',
    logoText: 'FC',
    logo: '',
    cashback: 'Flat 4% cashback',
    highlight: 'Largest store for Baby & Kids Products',
    description: "FirstCry offers clothing, toys, and childcare essentials for newborns up to kids of 12 years.",
    website: 'https://www.firstcry.com',
    offers: ['Flat 40% OFF on apparels', 'Buy 2 Get 1 Free on Select Brands']
  },
  {
    slug: 'jiomart',
    name: 'JioMart',
    category: 'Groceries',
    logoText: 'JM',
    logo: '',
    cashback: '5% cashback on Reliance Cards',
    highlight: 'Desh Ki Nayi Dukaan - Groceries & beyond',
    description: "JioMart provides an unparalleled shopping experience for daily groceries, fresh produce, and FMCG items.",
    website: 'https://www.jiomart.com',
    offers: ['Minimum 5% below MRP', 'Free delivery with no minimum order']
  },
  {
    slug: 'myntra',
    name: 'Myntra',
    category: 'Fashion',
    logoText: 'MY',
    logo: '',
    cashback: 'Up to 7% cashback',
    highlight: 'Top fashion hub for the young India',
    description: "Myntra offers the pinnacle of fashion and lifestyle, from international fast-fashion to premium beauty.",
    website: 'https://www.myntra.com',
    offers: ['10% off on ICICI Bank Cards', 'Myntra Insider Exclusive Benefits']
  },
  {
    slug: 'meesho',
    name: 'Meesho',
    category: 'Shopping',
    logoText: 'MS',
    logo: '',
    cashback: 'Up to 3% cashback',
    highlight: 'Lowest Prices with Free Delivery',
    description: "Meesho allows users to shop unbranded and branded budget apparel, home goods, and more.",
    website: 'https://www.meesho.com',
    offers: ['Flat ₹100 off on first order', 'Free Delivery on everything']
  },
  {
    slug: 'nykaa',
    name: 'Nykaa',
    category: 'Beauty',
    logoText: 'NK',
    logo: '',
    cashback: 'Flat 5% cashback',
    highlight: 'The ultimate destination for beauty and cosmetics',
    description: "Nykaa offers thousands of luxury to budget skincare, makeup, and hair care products.",
    website: 'https://www.nykaa.com',
    offers: ['Free Gift with purchase', 'Pink Friday Sale early access']
  },
  {
    slug: 'olx',
    name: 'OLX',
    category: 'Classifieds',
    logoText: 'OX',
    logo: '',
    cashback: 'No cashback',
    highlight: 'Sell and buy locally with ease',
    description: "OLX is India's premier classifieds platform to buy and sell used cars, electronics, and real estate.",
    website: 'https://www.olx.in',
    offers: ['Featured Ads discounts', 'Free ad posting limit']
  },
  {
    slug: 'pepperfry',
    name: 'Pepperfry',
    category: 'Furniture',
    logoText: 'PF',
    logo: '',
    cashback: 'Up to 4% cashback',
    highlight: 'Happy Furniture to You',
    description: "Pepperfry boasts exceptional furniture, decor, and mattresses perfect for setting up a new home.",
    website: 'https://www.pepperfry.com',
    offers: ['Extra 20% on Furniture via HDFC', 'Free Shipping']
  },
  {
    slug: 'quikr',
    name: 'Quikr',
    category: 'Classifieds',
    logoText: 'QK',
    logo: '',
    cashback: 'No cashback',
    highlight: 'Easy local buying and selling',
    description: "Quick and easy platform to buy, sell, rent, or find jobs and services near you.",
    website: 'https://www.quikr.com',
    offers: ['Verified listings available']
  },
  {
    slug: 'reliance-digital',
    name: 'Reliance Digital',
    category: 'Electronics',
    logoText: 'RD',
    logo: '',
    cashback: 'Up to 2% cashback',
    highlight: 'Widest range of electronics and home appliances',
    description: "Reliance Digital is India's largest electronics retailer offering cutting-edge electronics and appliances.",
    website: 'https://www.reliancedigital.in',
    offers: ['10% Instant discount with SBI', 'ResQ Installation benefits']
  },
  {
    slug: 'snapdeal',
    name: 'Snapdeal',
    category: 'Shopping',
    logoText: 'SD',
    logo: '',
    cashback: 'Flat 6% cashback',
    highlight: 'Value for Money shopping',
    description: "Snapdeal focuses on value-for-money fashion, home, and personal necessities.",
    website: 'https://www.snapdeal.com',
    offers: ['Min 70% Off on Kitchenware', 'Free Delivery']
  },
  {
    slug: 'swiggy',
    name: 'Swiggy',
    category: 'Food',
    logoText: 'SW',
    logo: '',
    cashback: 'Up to ₹50 cashback',
    highlight: 'Food and Groceries delivered in minutes',
    description: "Swiggy brings food from your favorite restaurants and rapid grocery deliveries through Instamart.",
    website: 'https://www.swiggy.com',
    offers: ['50% Off Welcome Offer', 'Free Delivery for Swiggy One']
  },
  {
    slug: 'tata-cliq',
    name: 'Tata CLiQ',
    category: 'Shopping',
    logoText: 'TC',
    logo: '',
    cashback: 'Up to 6% cashback',
    highlight: 'Premium and Luxury shopping',
    description: "Tata CLiQ provides genuine branded products encompassing fashion, electronics, and Tata CLiQ Luxury.",
    website: 'https://www.tatacliq.com',
    offers: ['15% Off on premium fashion', '10% HDFC Bank discount']
  },
  {
    slug: 'udaan',
    name: 'Udaan',
    category: 'B2B',
    logoText: 'UD',
    logo: '',
    cashback: 'B2B Special Rates',
    highlight: 'B2B Trade Platform',
    description: "Udaan empowers small businesses to source directly from manufacturers at wholesale rates.",
    website: 'https://udaan.com',
    offers: ['Credit line available', 'Wholesale discounts applied automatically']
  },
  {
    slug: 'voonik',
    name: 'Voonik',
    category: 'Fashion',
    logoText: 'VK',
    logo: '',
    cashback: 'Up to 8% cashback',
    highlight: 'Everyday Women’s Fashion',
    description: "Voonik focuses purely on budget-friendly women's ethnic and western wear.",
    website: 'https://www.voonik.com',
    offers: ['Buy 1 Get 1 Deals']
  },
  {
    slug: 'yepme',
    name: 'Yepme',
    category: 'Fashion',
    logoText: 'YM',
    logo: '',
    cashback: 'Flat 5% cashback',
    highlight: 'Fast Fashion brand',
    description: "Yepme is a fast fashion brand delivering stylish shoes, watches, and clothes.",
    website: 'https://www.yepme.com',
    offers: ['Flat 50% Off']
  },
  {
    slug: 'zivame',
    name: 'Zivame',
    category: 'Fashion',
    logoText: 'ZV',
    logo: '',
    cashback: 'Up to 10% cashback',
    highlight: 'Lingerie and Activewear',
    description: "Zivame is the leading destination for perfectly fitting intimate wear, sleepwear, and activewear.",
    website: 'https://www.zivame.com',
    offers: ['Buy 2 For ₹999 on Bras', 'Extra 10% on UPI']
  },
  {
    slug: 'zomato',
    name: 'Zomato',
    category: 'Food',
    logoText: 'ZO',
    logo: '',
    cashback: 'Up to ₹40 cashback',
    highlight: 'Discover great places to eat',
    description: "Zomato handles quick restaurant food delivery and dining out reservations.",
    website: 'https://www.zomato.com',
    offers: ['Flat ₹100 Off on specific restaurants', 'Zomato Gold zero delivery charges']
  },
  {
    slug: 'zepto',
    name: 'Zepto',
    category: 'Groceries',
    logoText: 'ZP',
    logo: '',
    cashback: 'Up to ₹30 cashback',
    highlight: '10-minute Groceries delivery',
    description: "Zepto is famous for delivering groceries and daily necessities within 10 minutes.",
    website: 'https://www.zeptonow.com',
    offers: ['Free delivery on ₹199+', '20% off on fresh fruits']
  }
];

async function seedStores() {
  try {
    for (const store of newStores) {
       console.log("Seeding store:", store.name)
       await fetch(API + '/api/stores', {
         method: 'POST',
         headers: { 'Content-Type': 'application/json' },
         body: JSON.stringify(store)
       })
    }
    console.log('✅ Successfully seeded all specified stores into the Database!')
  } catch (error) {
    console.error('Error seeding stores:', error)
  }
}

seedStores();
