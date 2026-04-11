import React, { useState, useRef, useEffect } from 'react';
import { inp, inpStyle, inpFocus } from './adminStyles';

export default function SearchableSelect({ value, onChange, options, placeholder = "Search categories..." }) {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState('');
  const wrapperRef = useRef(null);

  const filtered = options.filter(o => o.toLowerCase().includes(search.toLowerCase()));

  useEffect(() => {
    function handleClickOutside(event) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [wrapperRef]);

  const handleSelect = (option) => {
    onChange(option);
    setSearch('');
    setIsOpen(false);
  };

  const displayValue = value || 'Select option';

  return (
    <div className="relative w-full" ref={wrapperRef}>
      <div 
        className={`${inp} cursor-pointer flex justify-between items-center transition-all`}
        style={isOpen ? { ...inpStyle, ...inpFocus } : inpStyle}
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className={value ? "text-white truncate" : "text-white/40 truncate"}>{displayValue}</span>
        <svg className={`w-4 h-4 text-white/50 shrink-0 transition-transform ${isOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
      </div>

      {isOpen && (
        <div className="absolute z-50 w-full mt-2 bg-[#0C1018] border border-white/10 rounded-xl shadow-2xl overflow-hidden shadow-black/80" style={{ transformOrigin: 'top', animation: 'dropdown-in 0.2s ease-out forwards' }}>
          <div className="p-2 border-b border-white/5 bg-[#12161f]">
            <div className="relative">
              <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-white/30" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                className="w-full bg-transparent text-sm text-white focus:outline-none pl-9 pr-3 py-2 rounded-lg border border-white/10 focus:border-[#00D47E]/40 focus:bg-white/5 transition-colors placeholder:text-white/30"
                placeholder={placeholder}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                onClick={(e) => e.stopPropagation()}
                autoFocus
              />
            </div>
          </div>
          <ul className="max-h-[240px] overflow-y-auto py-1 scroll-smooth" style={{ scrollbarWidth: 'thin', scrollbarColor: 'rgba(255,255,255,0.1) transparent' }}>
            {filtered.length > 0 ? filtered.map((option, idx) => (
              <li
                key={idx}
                className={`px-4 py-2.5 text-[13px] cursor-pointer whitespace-nowrap overflow-hidden text-ellipsis transition-colors hover:bg-white/5 hover:text-[#00D47E] ${value === option ? 'bg-[#00D47E]/10 text-[#00D47E] font-semibold border-l-2 border-[#00D47E]' : 'text-white/70 border-l-2 border-transparent'}`}
                onClick={() => handleSelect(option)}
              >
                {option}
              </li>
            )) : (
              <li className="px-4 py-4 text-xs text-white/40 text-center flex flex-col items-center gap-2">
                <svg className="w-6 h-6 opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                No matches found
              </li>
            )}
          </ul>
        </div>
      )}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes dropdown-in {
           from { opacity: 0; transform: translateY(-4px) scaleY(0.98); }
           to { opacity: 1; transform: translateY(0) scaleY(1); }
        }
      `}} />
    </div>
  );
}
