import Link from "next/link"
import { ChevronLeft, ChevronRight } from "lucide-react"

type ProfileNavigationProps = {
  previousSlug: string
  nextSlug: string
  previousName: string
  nextName: string
  isFirst: boolean
  isLast: boolean
}

export function ProfileNavigation({
  previousSlug,
  nextSlug,
  previousName,
  nextName,
  isFirst,
  isLast,
}: ProfileNavigationProps) {
  return (
    <div className="mt-12 flex items-center justify-between border-t border-border pt-8">
      <Link
        href={`/about/staff/profiles/senior-members/${previousSlug}`}
        className="flex items-center gap-3 rounded-lg border border-border bg-card px-4 py-3 text-sm font-medium transition-all hover:bg-muted"
      >
        <ChevronLeft className="h-4 w-4" />
        <span className="hidden sm:inline">Previous</span>
      </Link>

      <div className="text-center">
        <p className="text-xs text-muted-foreground">
          {isLast ? "Last Profile • Click next to return to beginning" : "Navigate through profiles"}
        </p>
      </div>

      <Link
        href={`/about/staff/profiles/senior-members/${nextSlug}`}
        className="flex items-center gap-3 rounded-lg border border-border bg-card px-4 py-3 text-sm font-medium transition-all hover:bg-muted"
      >
        <span className="hidden sm:inline">{isLast ? "Return to Beginning" : "Next"}</span>
        <ChevronRight className="h-4 w-4" />
      </Link>
    </div>
  )
}
