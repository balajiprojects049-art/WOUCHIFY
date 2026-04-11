const LOGO_MAP = {
  'amazon': 'https://cdn-icons-png.flaticon.com/512/732/732177.png',
  'flipkart': 'https://logos-world.net/wp-content/uploads/2020/11/Flipkart-Logo.png',
  'myntra': 'https://upload.wikimedia.org/wikipedia/commons/b/bc/Myntra_Logo.png',
  'ajio': 'https://assets.ajio.com/static/img/Ajio-Logo.svg',
  'swiggy': 'https://logos-world.net/wp-content/uploads/2020/11/Swiggy-Logo.png',
  'zomato': 'https://www.google.com/s2/favicons?domain=zomato.com&sz=256',
  'nykaa': 'https://www.google.com/s2/favicons?domain=nykaa.com&sz=256',
  'firstcry': 'https://www.google.com/s2/favicons?domain=firstcry.com&sz=256',
  'bigbasket': 'https://www.google.com/s2/favicons?domain=bigbasket.com&sz=256',
  'jiomart': 'https://www.google.com/s2/favicons?domain=jiomart.com&sz=256',
  'snapdeal': 'https://www.google.com/s2/favicons?domain=snapdeal.com&sz=256',
  'meesho': 'https://www.google.com/s2/favicons?domain=meesho.com&sz=256',
  'decathlon': 'https://www.google.com/s2/favicons?domain=decathlon.in&sz=256',
  'domino\'s': 'https://www.google.com/s2/favicons?domain=dominos.co.in&sz=256',
  'dominos': 'https://www.google.com/s2/favicons?domain=dominos.co.in&sz=256'
};

export function resolveStoreLogoUrl(storeNameOrObj) {
  if (!storeNameOrObj) return '';

  let name = '';
  let logo = '';
  let website = '';

  if (typeof storeNameOrObj === 'string') {
    name = storeNameOrObj;
  } else {
    name = storeNameOrObj.name || '';
    logo = storeNameOrObj.logo || '';
    website = storeNameOrObj.website || '';
  }

  if (logo) return logo;

  let normalizedName = name.toLowerCase().trim();
  
  // Clean variations
  if (normalizedName === 'amazon india') normalizedName = 'amazon';
  if (normalizedName === "domino's pizza") normalizedName = 'dominos';
  if (normalizedName === "domino's") normalizedName = 'dominos';

  if (LOGO_MAP[normalizedName]) {
    return LOGO_MAP[normalizedName];
  }

  try {
    if (website) {
      const hostname = new URL(website).hostname.replace('www.', '');
      return hostname ? `https://www.google.com/s2/favicons?domain=${hostname}&sz=256` : '';
    }
    
    // Fallback: Guess a .com domain for standard Google Favicon API
    const cleanName = normalizedName.replace(/[^a-z0-9]/g, '');
    if (cleanName) {
      // In India, many stores use .in, but .com is safe enough for generic services. Or we can just try .com
      return `https://www.google.com/s2/favicons?domain=${cleanName}.com&sz=256`;
    }
    return '';
  } catch {
    return '';
  }
}