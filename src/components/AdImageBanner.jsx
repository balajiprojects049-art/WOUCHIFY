import React from 'react'
import { Link } from 'react-router-dom'
import { useData } from '../context/DataContext'

const AdImageBanner = () => {
  const { banners } = useData()
  
  // Grab the first active banner for the home page
  const activeBanners = (banners?.home || []).filter(b => b.active)
  
  if (activeBanners.length === 0) return null

  // Use the first banner (or we could make it slide, but user asked for "one banner section")
  const banner = activeBanners[0]

  return (
    <section className="w-full bg-[#F9FAFB] py-6 sm:py-10">
      <div className="mx-auto w-full max-w-[1500px] px-4 md:px-8 lg:px-12">
        
        {/* Section Heading */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <span className="h-8 w-1.5 rounded-full bg-gold shadow-sm" />
            <h2 className="text-2xl font-black tracking-tight text-ink sm:text-3xl">
              Advertisement
            </h2>
          </div>
          <span className="rounded bg-slate-200 px-2.5 py-1 text-[10px] font-black uppercase tracking-wider text-slate-500">
            Sponsored Ad
          </span>
        </div>

        <Link 
          to={banner.link || '/deals'} 
          className="block w-full overflow-hidden rounded-3xl shadow-lg transition-transform duration-300 hover:scale-[1.01] hover:shadow-2xl border border-line/10"
        >
          <img 
            src={banner.image} 
            alt="Advertisement Banner" 
            className="w-full object-cover min-h-[150px] sm:min-h-[250px] md:min-h-[300px] max-h-[400px]"
            onError={(e) => {
              // Hide the broken banner gracefully
              e.target.parentElement.style.display = 'none'
            }}
          />
        </Link>
      </div>
    </section>
  )
}

export default AdImageBanner
