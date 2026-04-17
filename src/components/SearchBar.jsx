function SearchBar({ value, onChange, placeholder = 'Search...', className = '' }) {
  return (
    <div className={`flex items-center gap-2 rounded-xl border border-line bg-cream px-3 py-2 shadow-sm ${className}`}>
      <svg viewBox="0 0 20 20" className="h-4 w-4 text-muted" aria-hidden="true">
        <path
          fill="currentColor"
          d="M8.5 2a6.5 6.5 0 1 0 4.04 11.59l3.93 3.92 1.06-1.06-3.92-3.93A6.5 6.5 0 0 0 8.5 2Zm0 1.5a5 5 0 1 1 0 10 5 5 0 0 1 0-10Z"
        />
      </svg>
      <input
        type="text"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        className="w-full bg-transparent text-sm text-ink placeholder:text-muted focus:outline-none"
      />
    </div>
  )
}

export default SearchBar
