function PageBanner({ image, alt, href }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="group block overflow-hidden rounded-3xl border border-line bg-white shadow-[0_18px_48px_rgba(0,0,0,0.22)]"
    >
      <img
        src={image}
        alt={alt}
        className="h-52 w-full object-cover transition-all duration-300 group-hover:scale-[1.03] sm:h-72 lg:h-80"
      />
    </a>
  )
}

export default PageBanner