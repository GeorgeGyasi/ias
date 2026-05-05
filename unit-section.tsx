"use client"

import Image from "next/image"
import { useState } from "react"
import { Lightbox } from "@/components/units/lightbox"

interface CollectionItem {
  id: string
  title: string
  image: string
  date: string
  source: string
  description: string
}

interface Unit {
  id: string
  name: string
  description: string
  collections: CollectionItem[]
}

export function UnitSection({ unit }: { unit: Unit }) {
  const [selectedItem, setSelectedItem] = useState<CollectionItem | null>(null)

  return (
    <div id={unit.id}>
      <div className="mb-8 border-l-4 border-primary pl-6">
        <h2 className="font-serif text-2xl font-bold text-foreground lg:text-3xl">
          {unit.name}
        </h2>
        <p className="mt-3 max-w-2xl text-base leading-relaxed text-muted-foreground">
          {unit.description}
        </p>
      </div>

      {unit.collections.length > 0 ? (
        <>
          <p className="mb-6 text-sm font-semibold uppercase tracking-widest text-secondary">
            Museum Collections
          </p>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {unit.collections.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => setSelectedItem(item)}
                className="group cursor-pointer overflow-hidden rounded-lg border border-border bg-card text-left transition-shadow hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={item.image || "/placeholder.svg"}
                    alt={item.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-foreground/0 transition-colors group-hover:bg-foreground/10" />
                </div>
                <div className="p-5">
                  <h3 className="mb-1 text-base font-semibold text-foreground group-hover:text-primary">
                    {item.title}
                  </h3>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <span>{item.date}</span>
                    <span className="h-1 w-1 rounded-full bg-muted-foreground/50" />
                    <span>{item.source}</span>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </>
      ) : (
        <div className="rounded-lg border border-dashed border-border bg-card p-8 text-center">
          <p className="text-sm text-muted-foreground">
            Digital catalog for this unit is currently being developed. Check back
            soon for archival materials.
          </p>
        </div>
      )}

      {selectedItem && (
        <Lightbox item={selectedItem} onClose={() => setSelectedItem(null)} />
      )}
    </div>
  )
}
