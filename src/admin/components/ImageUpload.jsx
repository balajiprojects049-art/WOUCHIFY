import { useRef, useState } from 'react'

const G = '#00D47E'

/**
 * ImageUpload — reusable image uploader
 * Converts local file to base64 for localStorage storage.
 * Falls back to URL input.
 * Props: value, onChange, label, height
 */
export default function ImageUpload({ value, onChange, label = 'Image', height = 'h-44' }) {
  const inputRef = useRef(null)
  const [dragging, setDragging] = useState(false)
  const [tab, setTab] = useState('upload')
  const [urlInput, setUrlInput] = useState(value && value.startsWith('http') ? value : '')

  const processFile = (file) => {
    if (!file) return
    if (!file.type.startsWith('image/')) { alert('Please select a valid image file.'); return }
    if (file.size > 20 * 1024 * 1024) { alert('Image must be under 20 MB.'); return }
    
    const reader = new FileReader()
    reader.onload = (e) => {
      const img = new Image()
      img.onload = () => {
        const canvas = document.createElement('canvas')
        const MAX_WIDTH = 1920
        const MAX_HEIGHT = 1080
        let width = img.width
        let height = img.height

        if (width > height) {
          if (width > MAX_WIDTH) { height = Math.round(height * (MAX_WIDTH / width)); width = MAX_WIDTH }
        } else {
          if (height > MAX_HEIGHT) { width = Math.round(width * (MAX_HEIGHT / height)); height = MAX_HEIGHT }
        }

        canvas.width = width
        canvas.height = height
        const ctx = canvas.getContext('2d')
        ctx.imageSmoothingQuality = 'high'
        ctx.drawImage(img, 0, 0, width, height)
        
        // Export as WebP for 60-80% smaller sizes! (0.92 ensures near-lossless maximum visual clarity)
        let result = canvas.toDataURL('image/webp', 0.92)
        if (result === 'data:,') result = canvas.toDataURL('image/jpeg', 0.92) // fallback
        
        // If the original file was tiny and somehow smaller than canvas output, use original
        if (e.target.result.length < result.length && file.size < 300 * 1024) {
          onChange(e.target.result)
        } else {
          onChange(result)
        }
      }
      img.src = e.target.result
    }
    reader.readAsDataURL(file)
  }

  const handleFileChange = (e) => processFile(e.target.files[0])
  const handleDrop = (e) => { e.preventDefault(); setDragging(false); processFile(e.dataTransfer.files[0]) }
  const handleUrlApply = () => { if (urlInput.trim()) onChange(urlInput.trim()) }
  const handleRemove = (e) => { e.stopPropagation(); onChange(''); setUrlInput(''); if (inputRef.current) inputRef.current.value = '' }

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <label className="text-[11px] font-black uppercase tracking-widest text-white/40">{label}</label>
        <div className="flex rounded-lg p-0.5 text-[10px] font-black" style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)' }}>
          {['upload', 'url'].map(t => (
            <button
              key={t}
              type="button"
              onClick={() => setTab(t)}
              className="rounded-md px-3 py-1.5 uppercase tracking-wider transition-all"
              style={tab === t
                ? { background: G, color: '#070B12' }
                : { color: 'rgba(255,255,255,0.4)' }
              }
            >
              {t === 'upload' ? 'Upload' : 'URL'}
            </button>
          ))}
        </div>
      </div>

      {tab === 'upload' ? (
        <div
          onClick={() => inputRef.current?.click()}
          onDragOver={e => { e.preventDefault(); setDragging(true) }}
          onDragLeave={() => setDragging(false)}
          onDrop={handleDrop}
          className={`relative cursor-pointer rounded-2xl border-2 border-dashed transition-all duration-200 overflow-hidden ${height}`}
          style={{
            borderColor: dragging ? G : 'rgba(255,255,255,0.12)',
            background: dragging ? 'rgba(0,212,126,0.07)' : 'rgba(255,255,255,0.03)',
          }}
        >
          {value ? (
            <>
              <img src={value} alt="preview" className="h-full w-full object-cover" />
              <div className="absolute inset-0 bg-black/50 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                <button
                  type="button"
                  onClick={(e) => { e.stopPropagation(); inputRef.current?.click() }}
                  className="rounded-xl px-4 py-2 text-xs font-black text-white backdrop-blur-sm"
                  style={{ background: 'rgba(255,255,255,0.15)' }}
                >
                  Change
                </button>
                <button
                  type="button"
                  onClick={handleRemove}
                  className="rounded-xl px-4 py-2 text-xs font-black text-white backdrop-blur-sm"
                  style={{ background: 'rgba(239,68,68,0.6)' }}
                >
                  Remove
                </button>
              </div>
            </>
          ) : (
            <div className="flex h-full flex-col items-center justify-center gap-3 p-5 text-center">
              <div
                className="flex h-14 w-14 items-center justify-center rounded-2xl"
                style={{ background: 'rgba(0,212,126,0.10)', border: '1px solid rgba(0,212,126,0.2)' }}
              >
                <svg viewBox="0 0 20 20" className="h-6 w-6" style={{ fill: G }}>
                  <path d="M9.25 13.25a.75.75 0 0 0 1.5 0V4.636l2.955 3.129a.75.75 0 0 0 1.09-1.03l-4.25-4.5a.75.75 0 0 0-1.09 0L5.205 6.735a.75.75 0 0 0 1.09 1.03L9.25 4.636v8.614ZM3.5 12.75a.75.75 0 0 0-1.5 0v2.5A2.75 2.75 0 0 0 4.75 18h10.5A2.75 2.75 0 0 0 18 15.25v-2.5a.75.75 0 0 0-1.5 0v2.5c0 .69-.56 1.25-1.25 1.25H4.75c-.69 0-1.25-.56-1.25-1.25v-2.5Z"/>
                </svg>
              </div>
              <div>
                <p className="text-sm font-black text-white/70">
                  {dragging ? 'Drop to upload' : 'Click or drag & drop'}
                </p>
                <p className="mt-1 text-[11px] text-white/30">PNG, JPG, WebP · Max 20 MB</p>
              </div>
            </div>
          )}
          <input ref={inputRef} type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
        </div>
      ) : (
        <div className="space-y-2">
          <div className="flex gap-2">
            <input
              type="url"
              value={urlInput}
              onChange={e => setUrlInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && (e.preventDefault(), handleUrlApply())}
              placeholder="https://example.com/image.jpg"
              className="flex-1 rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/20 focus:outline-none transition-all"
              style={{ border: '1px solid rgba(255,255,255,0.10)', background: 'rgba(255,255,255,0.05)' }}
              onFocus={e => { e.target.style.borderColor = 'rgba(0,212,126,0.5)'; e.target.style.boxShadow = '0 0 0 2px rgba(0,212,126,0.10)' }}
              onBlur={e => { e.target.style.borderColor = 'rgba(255,255,255,0.10)'; e.target.style.boxShadow = 'none' }}
            />
            <button
              type="button"
              onClick={handleUrlApply}
              className="shrink-0 rounded-xl px-5 py-3 text-xs font-black transition-all hover:opacity-90"
              style={{ background: G, color: '#070B12' }}
            >
              Apply
            </button>
          </div>
          {value && (
            <div className={`relative rounded-2xl overflow-hidden ${height}`}>
              <img src={value} alt="preview" className="h-full w-full object-cover" onError={e => e.target.style.display = 'none'} />
              <button
                type="button"
                onClick={handleRemove}
                className="absolute right-2 top-2 rounded-lg px-2.5 py-1 text-[10px] font-black text-white"
                style={{ background: 'rgba(239,68,68,0.75)' }}
              >
                ✕ Remove
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
