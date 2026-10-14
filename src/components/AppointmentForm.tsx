"use client";

import { useId, useState, type FormEvent, type ReactNode } from "react";
import { PHONE_ERROR, normaliseEgyptMobile } from "@/lib/phone";
import { buildWhatsAppUrl } from "@/lib/whatsapp";
import { buttonClasses, cn, focusRing } from "@/components/ui";
import { siteConfig } from "@/config/site";

type FieldKey = "fullName" | "phone" | "service" | "preferredDate" | "message";

interface FormValues {
  fullName: string;
  phone: string;
  service: string;
  preferredDate: string;
  message: string;
}

type Status = "idle" | "submitting" | "opened" | "blocked";

const emptyValues: FormValues = {
  fullName: "",
  phone: "",
  service: "",
  preferredDate: "",
  message: "",
};

const MESSAGE_MAX = 500;

function todayIso(): string {
  const now = new Date();
  const pad = (value: number) => String(value).padStart(2, "0");
  return `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}`;
}

function validate(values: FormValues, serviceOptions: string[]): Partial<Record<FieldKey, string>> {
  const errors: Partial<Record<FieldKey, string>> = {};

  if (values.fullName.trim().length < 2) {
    errors.fullName = "Enter your full name.";
  }

  if (!normaliseEgyptMobile(values.phone)) {
    errors.phone = PHONE_ERROR;
  }

  if (!values.service || !serviceOptions.includes(values.service)) {
    errors.service = "Choose the service you would like to request.";
  }

  if (values.preferredDate && values.preferredDate < todayIso()) {
    errors.preferredDate = "Choose today or a later date.";
  }

  if (values.message.length > MESSAGE_MAX) {
    errors.message = `Keep your message under ${MESSAGE_MAX} characters.`;
  }

  return errors;
}

function buildMessage(values: FormValues, phone: string): string {
  const { brand } = siteConfig;
  return [
    `Hello, I would like to request an appointment at ${brand.name}.`,
    "",
    `Name: ${values.fullName.trim()}`,
    `Phone: ${phone}`,
    `Service: ${values.service}`,
    `Preferred date: ${values.preferredDate || "No preference"}`,
    values.message.trim() ? `Message: ${values.message.trim()}` : null,
    "",
    "Please confirm availability with me.",
  ]
    .filter((line): line is string => line !== null)
    .join("\n");
}

const fieldBase =
  "mt-2 w-full rounded-md border bg-white px-4 py-3 text-base text-navy placeholder:text-navy/40 transition-colors duration-200";

export function AppointmentForm({ whatsappNumber }: { whatsappNumber: string }) {
  const [values, setValues] = useState<FormValues>(emptyValues);
  const [errors, setErrors] = useState<Partial<Record<FieldKey, string>>>({});
  const [status, setStatus] = useState<Status>("idle");
  const [fallbackUrl, setFallbackUrl] = useState("");
  const uid = useId();

  const serviceOptions = siteConfig.services.items.map((item) => item.title);
  const serviceChoices = [...serviceOptions, siteConfig.appointment.notSureOption];

  const idFor = (key: FieldKey) => `${uid}-${key}`;
  const errorFor = (key: FieldKey) => (errors[key] ? `${idFor(key)}-error` : undefined);

  const update = (key: FieldKey, value: string) => {
    setValues((prev) => ({ ...prev, [key]: value }));
    if (errors[key]) setErrors((prev) => ({ ...prev, [key]: undefined }));
    if (status === "opened" || status === "blocked") setStatus("idle");
  };

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const nextErrors = validate(values, serviceChoices);
    setErrors(nextErrors);

    const firstInvalid = (Object.keys(nextErrors) as FieldKey[])[0];
    if (firstInvalid) {
      document.getElementById(idFor(firstInvalid))?.focus();
      return;
    }

    const phone = normaliseEgyptMobile(values.phone) ?? values.phone;
    const url = buildWhatsAppUrl(whatsappNumber, buildMessage(values, phone));

    setStatus("submitting");
    const popup = window.open(url, "_blank");

    if (popup) {
      popup.opener = null;
      setStatus("opened");
      setValues(emptyValues);
    } else {
      setFallbackUrl(url);
      setStatus("blocked");
    }
  };

  const busy = status === "submitting";

  return (
    <form noValidate onSubmit={onSubmit} aria-describedby={`${uid}-privacy`} className="grid gap-6 sm:grid-cols-2">
      <div>
        <label htmlFor={idFor("fullName")} className="block text-sm font-semibold text-navy">
          Full name <span className="text-teal">*</span>
        </label>
        <input
          id={idFor("fullName")}
          name="fullName"
          type="text"
          autoComplete="name"
          value={values.fullName}
          onChange={(event) => update("fullName", event.target.value)}
          aria-invalid={Boolean(errors.fullName)}
          aria-describedby={errorFor("fullName")}
          className={cn(fieldBase, errors.fullName ? "border-red-700" : "border-navy/20 hover:border-navy/40", focusRing)}
        />
        {errors.fullName ? <FieldError id={errorFor("fullName")}>{errors.fullName}</FieldError> : null}
      </div>

      <div>
        <label htmlFor={idFor("phone")} className="block text-sm font-semibold text-navy">
          Mobile number <span className="text-teal">*</span>
        </label>
        <input
          id={idFor("phone")}
          name="phone"
          type="tel"
          inputMode="tel"
          autoComplete="tel"
          placeholder="01012345678"
          value={values.phone}
          onChange={(event) => update("phone", event.target.value)}
          aria-invalid={Boolean(errors.phone)}
          aria-describedby={cn(errorFor("phone"), `${idFor("phone")}-hint`)}
          className={cn(fieldBase, errors.phone ? "border-red-700" : "border-navy/20 hover:border-navy/40", focusRing)}
        />
        <p id={`${idFor("phone")}-hint`} className="mt-2 text-sm text-body">
          Egyptian mobile numbers, with or without +20.
        </p>
        {errors.phone ? <FieldError id={errorFor("phone")}>{errors.phone}</FieldError> : null}
      </div>

      <div>
        <label htmlFor={idFor("service")} className="block text-sm font-semibold text-navy">
          Requested service <span className="text-teal">*</span>
        </label>
        <select
          id={idFor("service")}
          name="service"
          value={values.service}
          onChange={(event) => update("service", event.target.value)}
          aria-invalid={Boolean(errors.service)}
          aria-describedby={errorFor("service")}
          className={cn(fieldBase, errors.service ? "border-red-700" : "border-navy/20 hover:border-navy/40", focusRing)}
        >
          <option value="">Select a service</option>
          {serviceChoices.map((choice) => (
            <option key={choice} value={choice}>
              {choice}
            </option>
          ))}
        </select>
        {errors.service ? <FieldError id={errorFor("service")}>{errors.service}</FieldError> : null}
      </div>

      <div>
        <label htmlFor={idFor("preferredDate")} className="block text-sm font-semibold text-navy">
          Preferred date <span className="font-normal text-body">(optional)</span>
        </label>
        <input
          id={idFor("preferredDate")}
          name="preferredDate"
          type="date"
          value={values.preferredDate}
          onChange={(event) => update("preferredDate", event.target.value)}
          aria-invalid={Boolean(errors.preferredDate)}
          aria-describedby={errorFor("preferredDate")}
          className={cn(fieldBase, errors.preferredDate ? "border-red-700" : "border-navy/20 hover:border-navy/40", focusRing)}
        />
        {errors.preferredDate ? (
          <FieldError id={errorFor("preferredDate")}>{errors.preferredDate}</FieldError>
        ) : null}
      </div>

      <div className="sm:col-span-2">
        <label htmlFor={idFor("message")} className="block text-sm font-semibold text-navy">
          Message <span className="font-normal text-body">(optional)</span>
        </label>
        <textarea
          id={idFor("message")}
          name="message"
          rows={4}
          value={values.message}
          onChange={(event) => update("message", event.target.value)}
          aria-invalid={Boolean(errors.message)}
          aria-describedby={cn(errorFor("message"), `${idFor("message")}-hint`)}
          className={cn(fieldBase, "resize-y", errors.message ? "border-red-700" : "border-navy/20 hover:border-navy/40", focusRing)}
        />
        <p id={`${idFor("message")}-hint`} className="mt-2 text-sm text-body">
          Please keep medical details brief. Share more with the clinic during your visit.
        </p>
        {errors.message ? <FieldError id={errorFor("message")}>{errors.message}</FieldError> : null}
      </div>

      <div className="sm:col-span-2 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p id={`${uid}-privacy`} className="max-w-md text-sm leading-relaxed text-body">
          {siteConfig.appointment.privacyNote}
        </p>
        <button
          type="submit"
          disabled={busy}
          className={buttonClasses("primary", "w-full shrink-0 disabled:cursor-wait disabled:opacity-70 sm:w-auto")}
        >
          {busy ? "Opening WhatsApp…" : "Send request on WhatsApp"}
        </button>
      </div>

      <div className="sm:col-span-2" aria-live="polite">
        {status === "opened" ? (
          <p role="status" className="rounded-md border border-teal/30 bg-cool p-4 text-sm leading-relaxed text-navy">
            {siteConfig.appointment.successMessage}
          </p>
        ) : null}
        {status === "blocked" ? (
          <div role="alert" className="rounded-md border border-red-700/30 bg-white p-4 text-sm leading-relaxed text-navy">
            <p>{siteConfig.appointment.blockedMessage}</p>
            <a
              href={fallbackUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={cn("mt-3 inline-flex min-h-11 items-center font-semibold text-teal underline underline-offset-4", focusRing)}
            >
              Open WhatsApp with your request
            </a>
          </div>
        ) : null}
      </div>

    </form>
  );
}

function FieldError({ id, children }: { id?: string; children: ReactNode }) {
  return (
    <p id={id} className="mt-2 text-sm font-medium text-red-700">
      {children}
    </p>
  );
}
