"use client"

import Image from "next/image"
import { useEffect, useCallback } from "react"
import { X, Calendar, Archive } from "lucide-react"

interface LightboxProps {
  item: {
    id: string
    title: string
    image: string
    date: string
    source: string
    description: string
  }
  onClose: () => void
}

export function Lightbox({ item, onClose }: LightboxProps) {
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
    },
    [onClose]
  )

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown)
    document.body.style.overflow = "hidden"
    return () => {
      document.removeEventListener("keydown", handleKeyDown)
      document.body.style.overflow = ""
    }
  }, [handleKeyDown])

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8"
      role="dialog"
      aria-modal="true"
      aria-label={item.title}
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-foreground/80 backdrop-blur-sm"
        onClick={onClose}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") onClose()
        }}
        role="button"
        tabIndex={0}
        aria-label="Close lightbox"
      />

      {/* Content */}
      <div className="relative z-10 flex max-h-[90vh] w-full max-w-5xl flex-col overflow-hidden rounded-lg bg-card shadow-2xl md:flex-row">
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute right-3 top-3 z-20 rounded-full bg-foreground/60 p-2 text-card transition-colors hover:bg-foreground/80"
          aria-label="Close"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Image */}
        <div className="relative min-h-[250px] flex-1 md:min-h-[500px]">
          <Image
            src={item.image || "/placeholder.svg"}
            alt={item.title}
            fill
            sizes="(max-width: 768px) 100vw, 60vw"
            className="object-cover"
          />
        </div>

        {/* Metadata */}
        <div className="flex w-full flex-col overflow-y-auto p-8 md:w-[380px]">
          <h2 className="font-serif text-2xl font-bold text-foreground">
            {item.title}
          </h2>

          <div className="mt-4 flex flex-col gap-3">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Calendar className="h-4 w-4 shrink-0 text-primary" />
              <span>{item.date}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Archive className="h-4 w-4 shrink-0 text-primary" />
              <span>{item.source}</span>
            </div>
          </div>

          <div className="mt-6 border-t border-border pt-6">
            <h3 className="mb-2 text-xs font-semibold uppercase tracking-wider text-primary">
              Description
            </h3>
            <p className="text-sm leading-relaxed text-muted-foreground">
              {item.description}
            </p>
          </div>

          <div className="mt-auto pt-6">
            <button
              type="button"
              onClick={onClose}
              className="w-full rounded-md border border-border px-4 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-muted"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
