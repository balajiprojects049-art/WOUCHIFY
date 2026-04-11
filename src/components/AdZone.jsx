import React, { useState, useEffect } from 'react'
import { useData } from '../context/DataContext'
import Advertisement from './Advertisement'

export default function AdZone({ position, className = '', interval = 5000 }) {
  const { advertisements } = useData()
  const [currentIndex, setCurrentIndex] = useState(0)
  
  const activeAds = (advertisements || []).filter(ad => ad.active && ad.position === position)

  useEffect(() => {
    if (activeAds.length <= 1) return
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % activeAds.length)
    }, interval)
    return () => clearInterval(timer)
  }, [activeAds.length, interval])

  if (!advertisements || advertisements.length === 0) return null
  if (activeAds.length === 0) return null

  // Ensure index is valid
  const validIndex = currentIndex >= activeAds.length ? 0 : currentIndex
  const adToDisplay = activeAds[validIndex]

  return (
    <div className={`ad-zone relative ${className}`}>
      {/* Pagination Indicators Container */}
      {activeAds.length > 1 && (
        <div className="absolute -top-3 right-0 z-10 flex gap-1.5 rounded-full px-2.5 py-1 shadow-sm backdrop-blur-md bg-white/70 dark:bg-black/40 border border-white/20 dark:border-white/10 pointer-events-none">
          {activeAds.map((_, i) => (
            <span 
              key={i} 
              className={`block h-1.5 rounded-full transition-all duration-500 ease-out ${i === validIndex ? 'w-5 bg-gold' : 'w-1.5 bg-black/20 dark:bg-white/30'}`} 
            />
          ))}
        </div>
      )}
      
      {/* Render Single Active Advertisement */}
      <div key={adToDisplay.id} className="animate-[fadeIn_0.5s_ease-out]">
        <Advertisement ad={adToDisplay} />
      </div>
    </div>
  )
}
