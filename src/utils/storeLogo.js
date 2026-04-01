export function resolveStoreLogoUrl(store) {
  if (store?.logo) return store.logo

  try {
    const hostname = new URL(store?.website || '').hostname.replace('www.', '')
    // Google favicon endpoint is generally more reliable for broad domain coverage.
    return hostname ? `https://www.google.com/s2/favicons?domain=${hostname}&sz=256` : ''
  } catch {
    return ''
  }
}