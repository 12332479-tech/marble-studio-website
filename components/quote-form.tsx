"use client"

import { useActionState, useEffect, useRef, useState } from "react"
import { useFormStatus } from "react-dom"
import { CheckCircle2, AlertCircle, Check, X } from "lucide-react"
import { useLanguage } from "@/components/language-provider"
import { submitQuote, type QuoteState } from "@/app/actions/quote"
import { StonePicker } from "@/components/stone-picker"

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const MESSAGE_MAX = 600

function SubmitButton() {
  const { t } = useLanguage()
  const { pending } = useFormStatus()
  return (
    <button
      type="submit"
      disabled={pending}
      className="inline-flex w-full items-center justify-center rounded-sm bg-accent px-6 py-3.5 text-sm font-semibold text-accent-foreground transition-opacity hover:opacity-90 disabled:opacity-60 sm:w-auto"
    >
      {pending ? t.contact.submitting : t.contact.submit}
    </button>
  )
}

export function QuoteForm() {
  const { t } = useLanguage()
  const [state, formAction] = useActionState<QuoteState, FormData>(submitQuote, { status: "idle" })
  const formRef = useRef<HTMLFormElement>(null)
  const [emailValue, setEmailValue] = useState("")
  const [messageLength, setMessageLength] = useState(0)

  const emailTouched = emailValue.length > 0
  const emailValid = EMAIL_RE.test(emailValue)

  useEffect(() => {
    if (state.status === "success") {
      formRef.current?.reset()
      setEmailValue("")
      setMessageLength(0)
    }
  }, [state.status])

  const fieldClass =
    "w-full rounded-sm border border-input bg-background px-3.5 py-2.5 text-sm outline-none transition-colors focus:border-accent focus:ring-2 focus:ring-accent/30"

  return (
    <form ref={formRef} action={formAction} className="flex flex-col gap-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <div className="flex flex-col gap-2">
          <label htmlFor="name" className="text-sm font-medium">
            {t.contact.name} <span className="text-accent">*</span>
          </label>
          <input id="name" name="name" required className={fieldClass} autoComplete="name" />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="email" className="text-sm font-medium">
            {t.contact.emailLabel} <span className="text-accent">*</span>
          </label>
          <div className="relative">
            <input
              id="email"
              name="email"
              type="email"
              required
              value={emailValue}
              onChange={(e) => setEmailValue(e.target.value)}
              className={`${fieldClass} pe-9`}
              autoComplete="email"
              dir="ltr"
              aria-invalid={emailTouched && !emailValid}
            />
            {emailTouched && (
              <span className="pointer-events-none absolute inset-y-0 end-3 flex items-center">
                {emailValid ? (
                  <Check className="h-4 w-4 text-accent" strokeWidth={2.5} />
                ) : (
                  <X className="h-4 w-4 text-destructive" strokeWidth={2.5} />
                )}
              </span>
            )}
          </div>
          {emailTouched && !emailValid && <span className="text-xs text-destructive">{t.contact.emailInvalid}</span>}
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div className="flex flex-col gap-2">
          <label htmlFor="phone" className="text-sm font-medium">
            {t.contact.phoneLabel}
          </label>
          <input id="phone" name="phone" type="tel" className={fieldClass} autoComplete="tel" dir="ltr" />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="service" className="text-sm font-medium">
            {t.contact.serviceLabel}
          </label>
          <select id="service" name="service" className={fieldClass} defaultValue="">
            <option value="" disabled>
              {t.contact.servicePlaceholder}
            </option>
            {t.services.items.map((s) => (
              <option key={s.title} value={s.title}>
                {s.title}
              </option>
            ))}
          </select>
        </div>
      </div>

      <StonePicker name="stone" />

      <div className="flex flex-col gap-2">
        <label htmlFor="message" className="text-sm font-medium">
          {t.contact.messageLabel} <span className="text-accent">*</span>
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          maxLength={MESSAGE_MAX}
          placeholder={t.contact.messagePlaceholder}
          className={fieldClass}
          onChange={(e) => setMessageLength(e.target.value.length)}
        />
        <span className="self-end text-xs text-muted-foreground" dir="ltr">
          {messageLength} / {MESSAGE_MAX}
        </span>
      </div>

      {state.status === "success" && (
        <div className="flex items-center gap-3 rounded-sm border border-accent/40 bg-accent/10 px-4 py-3 text-sm">
          <CheckCircle2 className="h-5 w-5 shrink-0 text-accent" />
          <span>{t.contact.success}</span>
        </div>
      )}
      {(state.status === "error" || state.status === "invalid") && (
        <div className="flex items-center gap-3 rounded-sm border border-destructive/40 bg-destructive/10 px-4 py-3 text-sm">
          <AlertCircle className="h-5 w-5 shrink-0 text-destructive" />
          <span>{state.status === "invalid" ? t.contact.required : t.contact.error}</span>
        </div>
      )}

      <SubmitButton />
    </form>
  )
}
