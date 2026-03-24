const navLinks = ['Home', 'Deals', 'Categories', 'Contact']

function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-line bg-cream/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <p className="text-lg font-semibold tracking-tight text-ink">WOUCHIFY</p>

        <nav className="hidden items-center gap-10 md:flex">
          {navLinks.map((link) => (
            <a key={link} href="#" className="text-sm font-medium text-muted transition-colors duration-300 hover:text-ink">
              {link}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <div className="hidden rounded-full border border-line bg-white px-4 py-2 md:flex">
            <input
              type="text"
              placeholder="Search deals"
              className="w-44 bg-transparent text-sm text-ink placeholder:text-muted focus:outline-none"
            />
          </div>
          <button className="rounded-full bg-navy px-4 py-2 text-xs font-semibold text-white transition-all duration-300 hover:scale-105">
            Get App
          </button>
        </div>
      </div>
    </header>
  )
}

export default Navbar
