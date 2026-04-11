const G = '#00D47E'

/**
 * FormField — labeled input, select, textarea, or toggle.
 * Props: label, required, hint, children, span, type, checked, onChange, toggleLabel, id
 */
export default function FormField({
  label, required, hint, children,
  span = 1, type = 'field',
  checked, onChange, toggleLabel, id,
}) {
  const colSpan = span === 2 ? 'col-span-2' : 'col-span-1'

  if (type === 'toggle') {
    return (
      <div
        className={`${colSpan} flex items-start gap-4 rounded-xl px-4 py-4`}
        style={{ border: '1px solid rgba(255,255,255,0.07)', background: 'rgba(255,255,255,0.04)' }}
      >
        <div
          onClick={onChange}
          className="relative mt-0.5 flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full transition-all duration-300"
          style={{ background: checked ? G : 'rgba(255,255,255,0.15)', boxShadow: checked ? `0 0 8px rgba(0,212,126,0.35)` : 'none' }}
        >
          <span
            className="absolute h-5 w-5 rounded-full bg-white shadow-md transition-all duration-300"
            style={{ transform: checked ? 'translateX(1.25rem)' : 'translateX(0.125rem)' }}
          />
        </div>
        <div>
          <p className="text-sm font-bold text-white">{toggleLabel}</p>
          {hint && <p className="mt-0.5 text-xs text-white/30">{hint}</p>}
        </div>
      </div>
    )
  }

  return (
    <div className={colSpan}>
      <label className="mb-2 flex items-center gap-1.5 text-[11px] font-black uppercase tracking-widest text-white/40">
        {label}
        {required && <span style={{ color: G }}>*</span>}
      </label>
      {children}
      {hint && <p className="mt-1.5 text-[11px] text-white/30 leading-relaxed">{hint}</p>}
    </div>
  )
}
