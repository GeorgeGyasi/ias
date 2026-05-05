"use client"

import { useState } from "react"
import { Send } from "lucide-react"

const inquiryTypes = [
  "General Inquiry",
  "Research Collaboration",
  "Visiting Fellowship",
  "Student Admissions",
  "Archive Access",
  "Media & Press",
]

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false)

  if (submitted) {
    return (
      <div className="py-8 text-center">
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
          <Send className="h-6 w-6 text-primary" />
        </div>
        <h4 className="text-lg font-semibold text-foreground">
          Message Sent
        </h4>
        <p className="mt-2 text-sm text-muted-foreground">
          Thank you for contacting the Institute of African Studies. We will
          respond within 2-3 working days.
        </p>
        <button
          type="button"
          onClick={() => setSubmitted(false)}
          className="mt-4 text-sm font-medium text-primary hover:underline"
        >
          Send another message
        </button>
      </div>
    )
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        setSubmitted(true)
      }}
      className="flex flex-col gap-6"
    >
      <div className="grid gap-6 md:grid-cols-2">
        <div>
          <label
            htmlFor="firstName"
            className="mb-1.5 block text-sm font-medium text-foreground"
          >
            First Name
          </label>
          <input
            type="text"
            id="firstName"
            required
            className="w-full rounded-md border border-input bg-background px-4 py-2.5 text-sm text-foreground outline-none transition-colors focus:border-primary focus:ring-1 focus:ring-primary"
          />
        </div>
        <div>
          <label
            htmlFor="lastName"
            className="mb-1.5 block text-sm font-medium text-foreground"
          >
            Last Name
          </label>
          <input
            type="text"
            id="lastName"
            required
            className="w-full rounded-md border border-input bg-background px-4 py-2.5 text-sm text-foreground outline-none transition-colors focus:border-primary focus:ring-1 focus:ring-primary"
          />
        </div>
      </div>

      <div>
        <label
          htmlFor="email"
          className="mb-1.5 block text-sm font-medium text-foreground"
        >
          Email Address
        </label>
        <input
          type="email"
          id="email"
          required
          className="w-full rounded-md border border-input bg-background px-4 py-2.5 text-sm text-foreground outline-none transition-colors focus:border-primary focus:ring-1 focus:ring-primary"
        />
      </div>

      <div>
        <label
          htmlFor="affiliation"
          className="mb-1.5 block text-sm font-medium text-foreground"
        >
          Institution / Affiliation
        </label>
        <input
          type="text"
          id="affiliation"
          className="w-full rounded-md border border-input bg-background px-4 py-2.5 text-sm text-foreground outline-none transition-colors focus:border-primary focus:ring-1 focus:ring-primary"
        />
      </div>

      <div>
        <label
          htmlFor="inquiryType"
          className="mb-1.5 block text-sm font-medium text-foreground"
        >
          Inquiry Type
        </label>
        <select
          id="inquiryType"
          required
          className="w-full rounded-md border border-input bg-background px-4 py-2.5 text-sm text-foreground outline-none transition-colors focus:border-primary focus:ring-1 focus:ring-primary"
        >
          <option value="">Select an option</option>
          {inquiryTypes.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label
          htmlFor="message"
          className="mb-1.5 block text-sm font-medium text-foreground"
        >
          Message
        </label>
        <textarea
          id="message"
          rows={5}
          required
          className="w-full resize-none rounded-md border border-input bg-background px-4 py-2.5 text-sm text-foreground outline-none transition-colors focus:border-primary focus:ring-1 focus:ring-primary"
        />
      </div>

      <button
        type="submit"
        className="inline-flex items-center justify-center gap-2 rounded-md bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
      >
        <Send className="h-4 w-4" />
        Send Message
      </button>
    </form>
  )
}
