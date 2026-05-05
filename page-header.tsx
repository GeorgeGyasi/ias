interface PageHeaderProps {
  title: string
  subtitle?: string
}

export function PageHeader({ title, subtitle }: PageHeaderProps) {
  return (
    <section className="border-b border-border bg-primary py-16 lg:py-20">
      <div className="mx-auto max-w-7xl px-6">
        <h1 className="font-serif text-3xl font-bold text-primary-foreground md:text-4xl lg:text-5xl">
          <span className="text-balance">{title}</span>
        </h1>
        {subtitle && (
          <p className="mt-4 max-w-2xl text-lg text-primary-foreground/75">
            {subtitle}
          </p>
        )}
      </div>
    </section>
  )
}
