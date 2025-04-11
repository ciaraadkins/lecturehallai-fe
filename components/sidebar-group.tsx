import type { ReactNode } from "react"

interface SidebarGroupProps {
  title: string
  children: ReactNode
}

export function SidebarGroup({ title, children }: SidebarGroupProps) {
  return (
    <div className="px-3 py-2">
      <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">{title}</h2>
      <div className="space-y-1">{children}</div>
    </div>
  )
}
