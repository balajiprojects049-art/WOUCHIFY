import { useEffect, useRef, useState } from 'react'

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
  const [urlInput, setUrlInput] = useState('')

  useEffect(() => {
    setUrlInput(value && value.startsWith('http') ? value : '')
  }, [value])

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

  const isSmall = height === 'h-24' || height === 'h-28' || height.includes('h-2');

  const renderPreview = () => (
    <div className={`relative rounded-2xl overflow-hidden ${height}`}>
      <img src={value} alt="preview" className="h-full w-full object-cover animate-fade-in" />
      <div className="absolute inset-0 bg-black/60 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center gap-2 p-2">
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            if (tab === 'upload') {
              inputRef.current?.click();
            } else {
              // Clear value to show input field while keeping urlInput for editing
              onChange('');
            }
          }}
          className={`rounded-lg font-black text-white backdrop-blur-sm flex items-center gap-1 transition-all hover:bg-white/25 ${isSmall ? 'px-2 py-1.5 text-[9px]' : 'px-4.5 py-2 text-xs'}`}
          style={{ background: 'rgba(255,255,255,0.15)' }}
        >
          <svg viewBox="0 0 20 20" className={`${isSmall ? 'h-3 w-3' : 'h-4 w-4'} fill-current`}>
            <path d="m13.826 3.023 3.151 3.151-1.202 1.202-3.151-3.151 1.202-1.202Zm-1.89 1.89 3.151 3.151-7.79 7.79H4.146v-3.146l7.79-7.79Z"/>
          </svg>
          <span>{isSmall ? 'Edit' : 'Change'}</span>
        </button>
        <button
          type="button"
          onClick={handleRemove}
          className={`rounded-lg font-black text-white backdrop-blur-sm flex items-center gap-1 transition-all hover:bg-red-600/80 ${isSmall ? 'px-2 py-1.5 text-[9px]' : 'px-4.5 py-2 text-xs'}`}
          style={{ background: 'rgba(239,68,68,0.6)' }}
        >
          <svg viewBox="0 0 20 20" className={`${isSmall ? 'h-3 w-3' : 'h-4 w-4'} fill-current`}>
            <path fillRule="evenodd" d="M8.75 3A.75.75 0 0 1 9.5 3.75v.443c.532.015 1.06.04 1.58.077a.75.75 0 0 1 .637.856l-.162 1.135a.75.75 0 0 1-.856.638 31.758 31.758 0 0 0-4.398 0 .75.75 0 0 1-.856-.638l-.162-1.135a.75.75 0 0 1 .638-.856c.52-.037 1.048-.062 1.58-.077V3.75A.75.75 0 0 1 8.75 3Zm-3.2 4.417a.75.75 0 0 1 .743-.758c.84-.04 1.683-.06 2.527-.06.844 0 1.688.02 2.527.06a.75.75 0 0 1 .743.758l-.666 9.324A2.25 2.25 0 0 1 11.42 18H8.58a2.25 2.25 0 0 1-2.247-2.09l-.666-9.324Z" clipRule="evenodd"/>
          </svg>
          <span>{isSmall ? 'Delete' : 'Remove'}</span>
        </button>
      </div>
    </div>
  )

  return (
    <div className="space-y-2">
      <div className={`flex items-center justify-between gap-1.5 ${isSmall ? 'mb-0.5' : 'mb-1'}`}>
        {label && (
          <label className={`${isSmall ? 'text-[10px]' : 'text-[11px]'} font-black uppercase tracking-widest text-white/40`}>
            {label}
          </label>
        )}
        <div 
          className="flex rounded-lg p-0.5 font-black shrink-0" 
          style={{ 
            background: 'rgba(255,255,255,0.04)', 
            border: '1px solid rgba(255,255,255,0.06)',
            fontSize: isSmall ? '9px' : '10px'
          }}
        >
          {['upload', 'url'].map(t => (
            <button
              key={t}
              type="button"
              onClick={() => setTab(t)}
              className={`rounded-md uppercase tracking-wider transition-all ${isSmall ? 'px-2 py-0.5' : 'px-3 py-1.5'}`}
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

      {value ? (
        renderPreview()
      ) : tab === 'upload' ? (
        <div
          onClick={() => inputRef.current?.click()}
          onDragOver={e => { e.preventDefault(); setDragging(true) }}
          onDragLeave={() => setDragging(false)}
          onDrop={handleDrop}
          className={`relative cursor-pointer rounded-2xl border-2 border-dashed transition-all duration-200 overflow-hidden group ${height}`}
          style={{
            borderColor: dragging ? G : 'rgba(255,255,255,0.12)',
            background: dragging ? 'rgba(0,212,126,0.07)' : 'rgba(255,255,255,0.03)',
          }}
        >
          {isSmall ? (
            <div className="flex h-full flex-col items-center justify-center gap-1.5 p-2 text-center transition-all duration-200 group-hover:scale-[1.02]">
              <div
                className="flex h-7 w-7 items-center justify-center rounded-lg transition-all duration-200 group-hover:bg-[#00D47E]/10 group-hover:border-[#00D47E]/30"
                style={{ background: 'rgba(0,212,126,0.06)', border: '1px solid rgba(0,212,126,0.12)' }}
              >
                <svg viewBox="0 0 20 20" className="h-3.5 w-3.5 transition-transform duration-200 group-hover:-translate-y-0.5" style={{ fill: G }}>
                  <path d="M9.25 13.25a.75.75 0 0 0 1.5 0V4.636l2.955 3.129a.75.75 0 0 0 1.09-1.03l-4.25-4.5a.75.75 0 0 0-1.09 0L5.205 6.735a.75.75 0 0 0 1.09 1.03L9.25 4.636v8.614ZM3.5 12.75a.75.75 0 0 0-1.5 0v2.5A2.75 2.75 0 0 0 4.75 18h10.5A2.75 2.75 0 0 0 18 15.25v-2.5a.75.75 0 0 0-1.5 0v2.5c0 .69-.56 1.25-1.25 1.25H4.75c-.69 0-1.25-.56-1.25-1.25v-2.5Z"/>
                </svg>
              </div>
              <div>
                <p className="text-[10px] font-black text-white/70 tracking-wide">
                  {dragging ? 'Drop file' : 'Click / Drag'}
                </p>
                <p className="text-[8px] text-white/35 font-semibold">PNG, JPG, WebP</p>
              </div>
            </div>
          ) : (
            <div className="flex h-full flex-col items-center justify-center gap-3 p-5 text-center transition-all duration-200 group-hover:scale-[1.02]">
              <div
                className="flex h-14 w-14 items-center justify-center rounded-2xl transition-all duration-200 group-hover:bg-[#00D47E]/10 group-hover:border-[#00D47E]/30"
                style={{ background: 'rgba(0,212,126,0.06)', border: '1px solid rgba(0,212,126,0.12)' }}
              >
                <svg viewBox="0 0 20 20" className="h-6 w-6 transition-transform duration-200 group-hover:-translate-y-0.5" style={{ fill: G }}>
                  <path d="M9.25 13.25a.75.75 0 0 0 1.5 0V4.636l2.955 3.129a.75.75 0 0 0 1.09-1.03l-4.25-4.5a.75.75 0 0 0-1.09 0L5.205 6.735a.75.75 0 0 0 1.09 1.03L9.25 4.636v8.614ZM3.5 12.75a.75.75 0 0 0-1.5 0v2.5A2.75 2.75 0 0 0 4.75 18h10.5A2.75 2.75 0 0 0 18 15.25v-2.5a.75.75 0 0 0-1.5 0v2.5c0 .69-.56 1.25-1.25 1.25H4.75c-.69 0-1.25-.56-1.25-1.25v-2.5Z"/>
                </svg>
              </div>
              <div>
                <p className="text-sm font-black text-white/70">
                  {dragging ? 'Drop to upload' : 'Click or drag & drop'}
                </p>
                <p className="mt-1 text-[11px] text-white/35 font-semibold">PNG, JPG, WebP · Max 20 MB</p>
              </div>
            </div>
          )}
          <input ref={inputRef} type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
        </div>
      ) : (
        <div
          className={`relative rounded-2xl border transition-all duration-200 overflow-hidden flex flex-col justify-center p-3 ${height}`}
          style={{
            borderColor: 'rgba(255,255,255,0.10)',
            background: 'rgba(255,255,255,0.02)',
          }}
        >
          {isSmall ? (
            <div className="flex flex-col gap-1.5 w-full">
              <input
                type="url"
                value={urlInput}
                onChange={e => setUrlInput(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && (e.preventDefault(), handleUrlApply())}
                placeholder="Paste URL..."
                className="w-full rounded-lg px-2 py-1.5 text-[10px] text-white placeholder:text-white/20 focus:outline-none transition-all"
                style={{ border: '1px solid rgba(255,255,255,0.10)', background: 'rgba(255,255,255,0.03)' }}
                onFocus={e => e.target.style.borderColor = 'rgba(0,212,126,0.5)'}
                onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.10)'}
              />
              <button
                type="button"
                onClick={handleUrlApply}
                className="w-full rounded-lg font-black transition-all hover:opacity-90 py-1.5 text-[10px]"
                style={{ background: G, color: '#070B12' }}
              >
                Apply
              </button>
            </div>
          ) : (
            <div className="flex flex-col gap-2.5 w-full max-w-md mx-auto px-2">
              <label className="text-xs font-bold text-white/50 text-center">Enter Image URL</label>
              <div className="flex gap-2 w-full">
                <input
                  type="url"
                  value={urlInput}
                  onChange={e => setUrlInput(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && (e.preventDefault(), handleUrlApply())}
                  placeholder="https://example.com/image.jpg"
                  className="flex-1 rounded-xl px-3 py-2 text-sm text-white placeholder:text-white/20 focus:outline-none transition-all"
                  style={{ border: '1px solid rgba(255,255,255,0.10)', background: 'rgba(255,255,255,0.04)' }}
                  onFocus={e => e.target.style.borderColor = 'rgba(0,212,126,0.5)'}
                  onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.10)'}
                />
                <button
                  type="button"
                  onClick={handleUrlApply}
                  className="shrink-0 rounded-xl font-black transition-all hover:opacity-90 px-4 py-2 text-xs"
                  style={{ background: G, color: '#070B12' }}
                >
                  Apply
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
