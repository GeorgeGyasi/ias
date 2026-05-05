"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  Landmark,
  BookOpen,
  Music,
  Flame,
  Users,
  Palette,
} from "lucide-react"

const sections = [
  {
    icon: Landmark,
    name: "African History and Politics",
    slug: "african-history-politics",
  },
  {
    icon: BookOpen,
    name: "Language, Literature and Drama",
    slug: "language-literature-drama",
  },
  {
    icon: Music,
    name: "Music and Dance",
    slug: "music-dance",
  },
  {
    icon: Flame,
    name: "Religions and Philosophy",
    slug: "religions-philosophy",
  },
  {
    icon: Users,
    name: "Societies and Cultures",
    slug: "societies-cultures",
  },
  {
    icon: Palette,
    name: "Media and Visual Art",
    slug: "media-visual-art",
  },
]

export function SectionNavigation() {
  const pathname = usePathname()
  const currentSlug = pathname.split("/sections/")[1]?.split("/")[0]

  return (
    <nav className="space-y-2">
      <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-4">
        All Sections
      </p>
      <div className="space-y-1">
        {sections.map((section) => {
          const Icon = section.icon
          const isActive = currentSlug === section.slug
          return (
            <Link
              key={section.slug}
              href={`/sections/${section.slug}`}
              className={`group flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-all ${
                isActive
                  ? "bg-primary/10 text-primary font-semibold"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted"
              }`}
            >
              <Icon className="h-4 w-4 flex-shrink-0" />
              <span className="truncate">{section.name}</span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
