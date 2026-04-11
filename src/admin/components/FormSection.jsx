/**
 * FormSection — wraps a group of related form fields with a titled section header.
 * Props:
 *   icon    : emoji or icon string for visual anchor
 *   title   : section heading
 *   children: form fields inside the section
 */
export default function FormSection({ icon, title, children }) {
  return (
    <div className="rounded-2xl border border-slate-200 dark:border-white/5 bg-slate-100 dark:bg-white/[0.03] overflow-hidden">
      {/* Section header */}
      <div className="flex items-center gap-3 border-b border-slate-200 dark:border-white/5 bg-slate-100 dark:bg-white/[0.04] px-5 py-3.5">
        {icon && <span className="text-base">{icon}</span>}
        <p className="text-[11px] font-black uppercase tracking-[0.18em] text-slate-500 dark:text-white/40">{title}</p>
      </div>
      {/* Fields */}
      <div className="p-5 space-y-5">
        {children}
      </div>
    </div>
  )
}
