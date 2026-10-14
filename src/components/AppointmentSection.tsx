import { AppointmentForm } from "@/components/AppointmentForm";
import { Section, SectionHeading } from "@/components/ui";
import { siteConfig } from "@/config/site";
import { whatsappDisplay } from "@/lib/whatsapp";

export function AppointmentSection() {
  const { appointment, contact } = siteConfig;
  const whatsappNumber = contact.whatsappNumber;

  return (
    <Section id="appointment" tone="cool" labelledBy="appointment-title">
      <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          <SectionHeading id="appointment-title" title={appointment.headline} intro={appointment.intro} />

          <ul className="mt-10 space-y-5 text-[15px] text-body">
            <li className="border-t border-navy/10 pt-5">
              <span className="block text-sm font-semibold uppercase tracking-[0.12em] text-teal">Prefer to call?</span>
              <a
                href={`tel:${contact.phone.replace(/\s/g, "")}`}
                className="mt-2 inline-block rounded-sm text-lg font-semibold text-navy underline-offset-4 hover:text-teal hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal"
              >
                {contact.phone}
              </a>
            </li>
            {whatsappNumber ? (
              <li className="border-t border-navy/10 pt-5">
                <span className="block text-sm font-semibold uppercase tracking-[0.12em] text-teal">Message on WhatsApp</span>
                <span className="mt-2 block text-base text-navy">{whatsappDisplay(whatsappNumber)}</span>
              </li>
            ) : null}
          </ul>
        </div>

        <div className="rounded-lg bg-white p-6 shadow-[0_1px_2px_rgba(23,50,77,0.06),0_8px_24px_-12px_rgba(23,50,77,0.12)] sm:p-10 lg:col-span-7">
          {whatsappNumber ? (
            <AppointmentForm whatsappNumber={whatsappNumber} />
          ) : (
            <p className="text-base leading-relaxed text-body">
              Online requests are not available right now. Please call our reception team at{" "}
              <a href={`tel:${contact.phone.replace(/\s/g, "")}`} className="font-semibold text-navy underline">
                {contact.phone}
              </a>
              .
            </p>
          )}
        </div>
      </div>
    </Section>
  );
}
