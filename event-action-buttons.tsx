"use client"

import Link from "next/link"
import { Download, ExternalLink } from "lucide-react"

interface ActionButton {
  label: string
  href: string
  isExternal?: boolean
  isDownload?: boolean
}

interface EventActionButtonsProps {
  buttons: ActionButton[]
  variant?: "top" | "bottom"
}

export function EventActionButtons({ buttons, variant = "top" }: EventActionButtonsProps) {
  const containerClass = variant === "top" 
    ? "sticky top-0 z-40 bg-gradient-to-b from-background via-background to-background/80 pb-4 mb-8 border-b border-border/50"
    : "mt-12 pt-8 border-t border-border"

  return (
    <div className={containerClass}>
      <div className="flex flex-wrap gap-3">
        {buttons.map((button, index) => (
          <Link
            key={index}
            href={button.href}
            target={button.isExternal ? "_blank" : undefined}
            rel={button.isExternal ? "noopener noreferrer" : undefined}
            download={button.isDownload}
            className="inline-flex items-center gap-2 rounded-lg bg-primary px-7 py-3.5 text-base font-semibold text-primary-foreground transition-all hover:opacity-90 hover:shadow-lg active:scale-95"
          >
            {button.isDownload && <Download className="h-5 w-5" />}
            {button.isExternal && !button.isDownload && <ExternalLink className="h-5 w-5" />}
            {button.label}
          </Link>
        ))}
      </div>
    </div>
  )
}
