export const storesData = [
  {
    slug: 'amazon',
    name: 'Amazon India',
    category: 'Electronics',
    logoText: 'AM',
    logo: 'https://cdn-icons-png.flaticon.com/512/732/732177.png',
    cashback: 'Up to 6.2% rewards',
    highlight: '5000+ live deals and coupons',
    description: 'Get verified electronics, fashion, and home coupons with high success rates.',
    website: 'https://www.amazon.in',
    offers: [
      {
        id: 'am-1',
        type: 'coupon',
        badge: '50% OFF',
        title: 'Up to 50% off on electronics accessories',
        description: 'Applies on selected chargers, cables, and smart wearables.',
        expiryDays: 5,
        successRate: 92,
        code: 'AMZTECH50',
        terms: 'Valid on selected products. Max discount ₹1,200. One use per account.',
        steps: ['Open Amazon store page', 'Add eligible products', 'Apply coupon code at checkout'],
        discountValue: 50,
        popularity: 98,
        createdAt: '2026-03-22T10:00:00Z',
      },
      {
        id: 'am-2',
        type: 'deal',
        badge: 'EXCLUSIVE',
        title: 'Extra 20% cashback on Amazon Pay balance',
        description: 'Limited-time cashback for wallet and UPI payments.',
        expiryDays: 2,
        successRate: 89,
        code: '',
        terms: 'Cashback credited in 48 hours. Minimum cart value ₹999.',
        steps: ['Add items to cart', 'Choose Amazon Pay', 'Complete order to receive cashback'],
        discountValue: 20,
        popularity: 95,
        createdAt: '2026-03-24T08:30:00Z',
      },
    ],
  },
  {
    slug: 'ajio', name: 'Ajio', category: 'Fashion', logoText: 'AJ', cashback: 'Up to 5% rewards',
    highlight: 'Trending Fashion Collections', description: 'Explore exclusive fashion deals.', website: 'https://www.ajio.com', offers: []
  },
  {
    slug: 'bigbasket', name: 'BigBasket', category: 'Grocery', logoText: 'BB', cashback: 'Up to ₹200 off',
    highlight: 'Daily Fresh Groceries', description: 'Best deals on household supplies.', website: 'https://www.bigbasket.com', offers: []
  },
  {
    slug: 'flipkart', name: 'Flipkart', category: 'Electronics', logoText: 'FK', cashback: 'Up to 10% rewards',
    highlight: 'Mega Savings Days', description: 'Offers on mobiles, electronics and more.', website: 'https://www.flipkart.com', offers: []
  },
  {
    slug: 'firstcry', name: 'FirstCry', category: 'Fashion', logoText: 'FC', cashback: 'Flat 40% Off',
    highlight: 'Kids Collection', description: 'Discounts on baby care and toys.', website: 'https://www.firstcry.com', offers: []
  },
  {
    slug: 'jiomart', name: 'JioMart', category: 'Grocery', logoText: 'JM', cashback: 'Up to 7% cashback',
    highlight: 'Everything on discount', description: 'Grocery and essentials at best prices.', website: 'https://www.jiomart.com', offers: []
  },
  {
    slug: 'myntra', name: 'Myntra', category: 'Fashion', logoText: 'MY', cashback: 'Up to 8% rewards',
    highlight: 'Top Fashion Labels', description: 'Premium fashion sales.', website: 'https://www.myntra.com', offers: []
  },
  {
    slug: 'meesho', name: 'Meesho', category: 'Fashion', logoText: 'ME', cashback: 'Extra 10% off',
    highlight: 'Reseller Prices', description: 'Lowest prices on fashion.', website: 'https://www.meesho.com', offers: []
  },
  {
    slug: 'nykaa', name: 'Nykaa', category: 'Beauty', logoText: 'NY', cashback: 'Up to 5% rewards',
    highlight: 'Beauty Bonanza', description: 'Deals on top cosmetic brands.', website: 'https://www.nykaa.com', offers: []
  },
  {
    slug: 'olx', name: 'OLX', category: 'Other', logoText: 'OX', cashback: 'No hidden fees',
    highlight: 'Classified Deals', description: 'Buy & sell cars, properties, phones.', website: 'https://www.olx.in', offers: []
  },
  {
    slug: 'pepperfry', name: 'Pepperfry', category: 'Home', logoText: 'PF', cashback: 'Up to 6% rewards',
    highlight: 'Furniture Sale', description: 'Premium furniture at discounted rates.', website: 'https://www.pepperfry.com', offers: []
  },
  {
    slug: 'quikr', name: 'Quikr', category: 'Other', logoText: 'QK', cashback: 'Exciting rewards',
    highlight: 'Local Classifieds', description: 'Find pre-owned goods easily.', website: 'https://www.quikr.com', offers: []
  },
  {
    slug: 'reliance-digital', name: 'Reliance Digital', category: 'Electronics', logoText: 'RD', cashback: 'Up to 5% cashback',
    highlight: 'Gadget Deals', description: 'Discounts on appliances and electronics.', website: 'https://www.reliancedigital.in', offers: []
  },
  {
    slug: 'snapdeal', name: 'Snapdeal', category: 'Electronics', logoText: 'SD', cashback: 'Up to 15% rewards',
    highlight: 'Value Deals', description: 'Unbeatable prices everyday.', website: 'https://www.snapdeal.com', offers: []
  },
  {
    slug: 'swiggy', name: 'Swiggy', category: 'Food', logoText: 'SW', cashback: 'Flat ₹100 Off',
    highlight: 'Craving Saver', description: 'Discounts on dining and delivery.', website: 'https://www.swiggy.com', offers: []
  },
  {
    slug: 'tatacliq', name: 'Tata CLiQ', category: 'Fashion', logoText: 'TC', cashback: 'Up to 4% rewards',
    highlight: 'Authentic Brands', description: 'Discounts on premium lifestyle products.', website: 'https://www.tatacliq.com', offers: []
  },
  {
    slug: 'udaan', name: 'Udaan', category: 'B2B', logoText: 'UD', cashback: 'Bulk discounts',
    highlight: 'B2B Excellence', description: 'Trade network for businesses.', website: 'https://udaan.com', offers: []
  },
  {
    slug: 'voonik', name: 'Voonik', category: 'Fashion', logoText: 'VK', cashback: 'Up to 20% Off',
    highlight: 'Women Fashion', description: 'Discounts on daily wear.', website: 'https://www.voonik.com', offers: []
  },
  {
    slug: 'yepme', name: 'Yepme', category: 'Fashion', logoText: 'YM', cashback: 'Buy 1 Get 1',
    highlight: 'Fast Fashion', description: 'Trendy clothes and accessories.', website: 'https://yepme.com', offers: []
  },
  {
    slug: 'zivame', name: 'Zivame', category: 'Fashion', logoText: 'ZV', cashback: 'Up to ₹150 off',
    highlight: 'Intimate Wear', description: 'Find innerwear deals and coupons.', website: 'https://www.zivame.com', offers: []
  },
  {
    slug: 'zomato', name: 'Zomato', category: 'Food', logoText: 'ZO', cashback: 'Up to 60% Off',
    highlight: 'Foodie Deals', description: 'Best restaurant delivery offers.', website: 'https://www.zomato.com', offers: []
  },
  {
    slug: 'zepto', name: 'Zepto', category: 'Grocery', logoText: 'ZP', cashback: 'Flat ₹50 Off',
    highlight: '10-Min Delivery', description: 'Coupons on quick groceries.', website: 'https://www.zeptonow.com', offers: []
  }
]

export const storeCategories = ['All', 'Fashion', 'Electronics', 'Grocery', 'Beauty', 'Food', 'Home', 'Travel', 'B2B', 'Other']

export function getStoreBySlug(storeSlug) {
  return storesData.find((store) => store.slug === storeSlug)
}

export function getStorePathByName(storeName) {
  if (!storeName) {
    return '/stores'
  }

  const normalizedName = storeName.toLowerCase().replace(/[^a-z0-9]/g, '')
  const matchedStore = storesData.find((store) => {
    const normalizedStoreName = store.name.toLowerCase().replace(/[^a-z0-9]/g, '')
    return store.slug === normalizedName || normalizedStoreName === normalizedName
  })

  return matchedStore ? `/store/${matchedStore.slug}` : '/stores'
}
