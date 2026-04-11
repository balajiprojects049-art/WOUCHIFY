// ─── Shared admin dark-theme style constants ───────────────────────────────
// Accent green matching the login page
export const G = '#00D47E'

// Input / Select / Textarea
export const inp =
  'w-full rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/20 focus:outline-none transition-all duration-200'
export const inpStyle = {
  border: '1px solid rgba(255,255,255,0.09)',
  background: 'rgba(255,255,255,0.04)',
}
export const inpFocus = {
  borderColor: 'rgba(0,212,126,0.5)',
  boxShadow: '0 0 0 3px rgba(0,212,126,0.08)',
}

export const sel = inp + ' cursor-pointer'

// Label
export const lbl =
  'block mb-2 text-[11px] font-black uppercase tracking-widest text-white/40'

// Section divider header (replaces emoji-based SectionHeader)
export function sectionHeaderProps() {
  return {
    divStyle: {
      borderBottom: '1px solid rgba(255,255,255,0.07)',
      marginBottom: '1rem',
      paddingBottom: '0.75rem',
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
    },
    textClass: 'text-xs font-black uppercase tracking-widest text-white/50',
  }
}

// Card / Panel wrapper
export const cardStyle = {
  border: '1px solid rgba(255,255,255,0.07)',
  background: 'rgba(255,255,255,0.03)',
}

// Table wrapper
export const tableWrapStyle = {
  border: '1px solid rgba(255,255,255,0.07)',
  background: 'rgba(255,255,255,0.02)',
  borderRadius: '1rem',
  overflow: 'hidden',
}

// Table header row
export const thStyle = {
  borderBottom: '1px solid rgba(255,255,255,0.07)',
  background: 'rgba(255,255,255,0.03)',
}

// Table body row border
export const trBorderStyle = { borderBottom: '1px solid rgba(255,255,255,0.05)' }

// Search input wrapper
export const searchInpCls =
  'w-full rounded-xl py-2.5 pl-10 pr-4 text-sm text-white placeholder:text-white/25 focus:outline-none transition-all'
export const searchInpStyle = {
  border: '1px solid rgba(255,255,255,0.09)',
  background: 'rgba(255,255,255,0.05)',
}

// Primary (green) action button
export const btnPrimary = {
  background: G,
  color: '#070B12',
  boxShadow: '0 4px 20px rgba(0,212,126,0.25)',
}

// Save button text cls
export const btnPrimaryCls =
  'w-full rounded-xl py-4 text-sm font-black transition-all hover:opacity-90 active:scale-95'

// Cancel button
export const btnCancelCls =
  'w-full rounded-xl py-3.5 text-sm font-bold text-white/50 transition-all hover:text-white'
export const btnCancelStyle = {
  border: '1px solid rgba(255,255,255,0.10)',
  background: 'transparent',
}

// Back link
export const backLinkCls =
  'flex items-center gap-2 text-sm font-semibold text-white/40 hover:text-white transition-colors'

// Edit button (table row)
export const editBtnCls = 'rounded-lg px-3 py-1.5 text-xs font-bold text-white/70 transition-all hover:text-white'
export const editBtnStyle = { background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.1)' }

// Delete button (table row)
export const delBtnCls = 'rounded-lg px-3 py-1.5 text-xs font-bold text-red-400 transition-all hover:bg-red-500/15'
export const delBtnStyle = { background: 'rgba(239,68,68,0.08)' }

// Badge pill (green)
export const badgePillStyle = { background: 'rgba(0,212,126,0.12)', color: G }

// Confirm dialog
export const confirmDialogStyle = {
  border: '1px solid rgba(255,255,255,0.10)',
  background: '#0C1018',
  borderRadius: '1.25rem',
}
