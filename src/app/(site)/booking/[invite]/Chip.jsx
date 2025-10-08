'use client'
export function Chip({ children, icon }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full bg-white/80 px-3 py-1.5 text-sm text-slate-700 shadow-sm ring-1 ring-slate-200 backdrop-blur">
      {icon}
      {children}
    </span>
  )
}