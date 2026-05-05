import Link from "next/link"
import Image from "next/image"

const footerLinks = {
  aboutUs: [
    { label: "Overview", href: "/about" },
    { label: "Vision & Mission", href: "/about/vision-mission" },
    { label: "Director's Message", href: "/about/directors-message" },
    { label: "Staff", href: "/about/staff" },
    { label: "Sections", href: "/about/sections-units" },
  ],
  academics: [
    { label: "Undergraduate", href: "/academics/undergraduate" },
    { label: "Graduate", href: "/academics/graduate" },
    { label: "Prospective Students", href: "/academics/prospective-students" },
    { label: "Research Areas", href: "/research" },
  ],
  publications: [
    { label: "Institutional", href: "/publications/institutional" },
    { label: "AngloGold Ashanti Lectures", href: "/publications/anglogold-ashanti-lectures" },
    { label: "Events & Seminars", href: "/events" },
  ],
  units: [
    { label: "Ghana Dance Ensemble", href: "/units/ghana-dance-ensemble" },
    { label: "IAS Library", href: "/units/library" },
    { label: "Nketia Archives", href: "/units/nketia-archives" },
    { label: "Manhyia Archives", href: "/units/manhyia-archives" },
    { label: "Kwame Nkrumah Chair", href: "/kwame-nkrumah-chair" },
  ],
  contact: [
    { label: "Contact Us", href: "/contact" },
  ],
}

export function Footer() {
  return (
    <footer className="border-t border-border bg-foreground text-card">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-6">
          <div className="flex flex-col gap-6 md:col-span-2">
            <Link href="/" className="w-fit">
              <Image
                src="/images/logo.png"
                alt="Institute of African Studies Logo"
                width={320}
                height={120}
                className="h-auto w-auto"
              />
            </Link>
            <p className="text-sm leading-relaxed opacity-70 max-w-sm">
              Advancing knowledge and understanding of African societies through
              interdisciplinary research, teaching, and public engagement since
              1961.
            </p>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider opacity-90">
              About Us
            </h3>
            <ul className="flex flex-col gap-2">
              {footerLinks.aboutUs.map((link) => (
                <li key={link.href + link.label}>
                  <Link
                    href={link.href}
                    className="text-sm opacity-70 transition-opacity hover:opacity-100"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider opacity-90">
              Academics
            </h3>
            <ul className="flex flex-col gap-2">
              {footerLinks.academics.map((link) => (
                <li key={link.href + link.label}>
                  <Link
                    href={link.href}
                    className="text-sm opacity-70 transition-opacity hover:opacity-100"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider opacity-90">
              Publications
            </h3>
            <ul className="flex flex-col gap-2">
              {footerLinks.publications.map((link) => (
                <li key={link.href + link.label}>
                  <Link
                    href={link.href}
                    className="text-sm opacity-70 transition-opacity hover:opacity-100"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider opacity-90">
              Units
            </h3>
            <ul className="flex flex-col gap-2">
              {footerLinks.units.map((link) => (
                <li key={link.href + link.label}>
                  <Link
                    href={link.href}
                    className="text-sm opacity-70 transition-opacity hover:opacity-100"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider opacity-90">
              Contact
            </h3>
            <ul className="flex flex-col gap-2">
              {footerLinks.contact.map((link) => (
                <li key={link.href + link.label}>
                  <Link
                    href={link.href}
                    className="text-sm opacity-70 transition-opacity hover:opacity-100"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-card/20 pt-8">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <p className="text-xs opacity-60">
              &copy; {new Date().getFullYear()} Institute of African Studies,
              University of Ghana. All rights reserved.
            </p>
            <div className="flex items-center gap-6">
              <Link
                href="#"
                className="text-xs opacity-60 transition-opacity hover:opacity-100"
              >
                Privacy Policy
              </Link>
              <Link
                href="#"
                className="text-xs opacity-60 transition-opacity hover:opacity-100"
              >
                Terms of Use
              </Link>
              <Link
                href="/contact"
                className="text-xs opacity-60 transition-opacity hover:opacity-100"
              >
                Accessibility
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
