import Link from "next/link"
import type { LucideIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"

interface SidebarItemProps {
  href: string
  icon: LucideIcon
  title: string
  isActive?: boolean
  isPending?: boolean
  isDisabled?: boolean
}

export function SidebarItem({ href, icon: Icon, title, isActive, isPending, isDisabled }: SidebarItemProps) {
  return (
    <Link
      href={href}
      className={cn(
        buttonVariants({ variant: "ghost" }),
        "justify-start w-full",
        isActive && "bg-accent text-accent-foreground",
        isPending && "animate-pulse",
        isDisabled && "pointer-events-none opacity-60",
      )}
    >
      <Icon className="mr-2 h-4 w-4" />
      {title}
    </Link>
  )
}
