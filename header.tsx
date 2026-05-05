"use client"

import Link from "next/link"
import Image from "next/image"
import { useState, useRef, useEffect } from "react"
import { Menu, X, ChevronDown, ChevronRight } from "lucide-react"

type NavChild = {
  label: string
  href: string
}

type NavItem = {
  label: string
  href: string
  children?: NavChild[]
}

const navItems: NavItem[] = [
  { label: "Home", href: "/" },
  {
    label: "About Us",
    href: "/about",
    children: [
      { label: "Overview", href: "/about" },
      { label: "Vision & Mission", href: "/about/vision-mission" },
      { label: "Director's Message", href: "/about/directors-message" },
      { label: "Leadership History", href: "/about/leadership-history" },
      { label: "Staff", href: "/about/staff" },
      { label: "Sections", href: "/about/sections-units" },
      { label: "Kwame Nkrumah Chair", href: "/kwame-nkrumah-chair" },
    ],
  },
  {
    label: "Academics",
    href: "/academics",
    children: [
      { label: "Undergraduate", href: "/academics/undergraduate" },
      { label: "Graduate", href: "/academics/graduate" },
      { label: "Prospective Students", href: "/academics/prospective-students" },
    ],
  },
  { label: "Research", href: "/research" },
  {
    label: "Publications",
    href: "/publications",
    children: [
      { label: "Institutional", href: "/publications/institutional" },
      { label: "AngloGold Ashanti Lectures", href: "/publications/anglogold-ashanti-lectures" },
    ],
  },
  {
    label: "Units",
    href: "/about/sections-units",
    children: [
      { label: "All Sections & Units", href: "/about/sections-units" },
      { label: "J.H. Kwabena Nketia Archives", href: "/units/nketia-archives" },
      { label: "Ghana Dance Ensemble", href: "/units/ghana-dance-ensemble" },
      { label: "Library", href: "/units/library" },
      { label: "Manhyia Archives", href: "/units/manhyia-archives" },
      { label: "Teaching Museum", href: "/units/teaching-museum" },
    ],
  },
  { label: "Events", href: "/events" },
  { label: "Yiri Lodge", href: "/yiri-lodge" },
]

function DesktopDropdown({
  item,
  isOpen,
  onOpen,
  onClose,
}: {
  item: NavItem
  isOpen: boolean
  onOpen: () => void
  onClose: () => void
}) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        onClose()
      }
    }
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside)
    }
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [isOpen, onClose])

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => (isOpen ? onClose() : onOpen())}
        onMouseEnter={onOpen}
        className="flex items-center gap-1 rounded-md px-3 py-2 text-sm font-medium text-foreground transition-colors hover:bg-muted hover:text-primary"
      >
        {item.label}
        <ChevronDown
          className={`h-3.5 w-3.5 transition-transform ${isOpen ? "rotate-180" : ""}`}
        />
      </button>
      {isOpen && item.children && (
        <div
          className="absolute left-0 top-full z-50 mt-1 min-w-[220px] rounded-lg border border-border bg-card py-2 shadow-lg"
          onMouseLeave={onClose}
        >
          {item.children.map((child) => (
            <Link
              key={child.href}
              href={child.href}
              className="flex items-center gap-2 px-4 py-2.5 text-sm text-foreground transition-colors hover:bg-muted hover:text-primary"
              onClick={onClose}
            >
              {child.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}

function MobileAccordion({
  item,
  onNavigate,
}: {
  item: NavItem
  onNavigate: () => void
}) {
  const [expanded, setExpanded] = useState(false)

  if (!item.children) {
    return (
      <Link
        href={item.href}
        className="rounded-md px-3 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-muted hover:text-primary"
        onClick={onNavigate}
      >
        {item.label}
      </Link>
    )
  }

  return (
    <div>
      <button
        type="button"
        onClick={() => setExpanded(!expanded)}
        className="flex w-full items-center justify-between rounded-md px-3 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-muted hover:text-primary"
      >
        {item.label}
        <ChevronRight
          className={`h-4 w-4 transition-transform ${expanded ? "rotate-90" : ""}`}
        />
      </button>
      {expanded && (
        <div className="ml-3 flex flex-col gap-0.5 border-l border-border pl-3">
          {item.children.map((child) => (
            <Link
              key={child.href}
              href={child.href}
              className="rounded-md px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-primary"
              onClick={onNavigate}
            >
              {child.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [openDropdown, setOpenDropdown] = useState<string | null>(null)

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/80">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-2">
        <div className="flex items-center gap-4">
          <Link href="https://www.ug.edu.gh" target="_blank" rel="noopener noreferrer" aria-label="University of Ghana website">
            <Image
              src="/images/logo-ug.png"
              alt="University of Ghana Logo"
              width={140}
              height={60}
              className="w-auto h-14"
              priority
            />
          </Link>
          <div className="w-0.5 h-8" style={{ backgroundColor: "rgb(183, 154, 100)" }} />
          <Link href="https://ias.ug.edu.gh" target="_blank" rel="noopener noreferrer" aria-label="Institute of African Studies website">
            <Image
              src="/images/logo-ias.png"
              alt="Institute of African Studies Logo"
              width={140}
              height={60}
              className="w-auto h-6"
              priority
            />
          </Link>
        </div>

        <nav
          className="hidden items-center gap-0.5 lg:flex"
          aria-label="Main navigation"
        >
          {navItems.map((item) =>
            item.children ? (
              <DesktopDropdown
                key={item.label}
                item={item}
                isOpen={openDropdown === item.label}
                onOpen={() => setOpenDropdown(item.label)}
                onClose={() => setOpenDropdown(null)}
              />
            ) : (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-md px-3 py-2 text-sm font-medium text-foreground transition-colors hover:bg-muted hover:text-primary"
              >
                {item.label}
              </Link>
            ),
          )}
        </nav>

        <button
          type="button"
          className="rounded-md p-2 text-foreground lg:hidden"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
        >
          {mobileOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>
      </div>

      {mobileOpen && (
        <nav
          className="border-t border-border bg-card px-6 pb-4 lg:hidden"
          aria-label="Mobile navigation"
        >
          <div className="flex flex-col gap-0.5 pt-2">
            {navItems.map((item) => (
              <MobileAccordion
                key={item.label}
                item={item}
                onNavigate={() => setMobileOpen(false)}
              />
            ))}
          </div>
        </nav>
      )}
    </header>
  )
}
