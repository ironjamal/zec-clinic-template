import { Section, SectionHeading, cn, focusRing } from "@/components/ui";
import { siteConfig } from "@/config/site";
import { buildWhatsAppUrl, whatsappDisplay } from "@/lib/whatsapp";

const linkClass = cn(
  "rounded-sm font-semibold text-navy underline-offset-4 transition-colors duration-200 hover:text-teal hover:underline",
  focusRing,
);

export function ContactSection() {
  const { contact, brand } = siteConfig;
  const telHref = `tel:${contact.phone.replace(/\s/g, "")}`;
  const whatsappHref = contact.whatsappNumber
    ? buildWhatsAppUrl(contact.whatsappNumber, `Hello, I have a question for ${brand.name}.`)
    : "";

  return (
    <Section id="contact" tone="white" labelledBy="contact-title">
      <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          <SectionHeading id="contact-title" title="Find and Reach Us" intro="Reach our reception team by phone, WhatsApp or email during opening hours." />
        </div>

        <dl className="grid gap-x-10 gap-y-10 sm:grid-cols-2 lg:col-span-7">
          <div>
            <dt className="text-sm font-semibold uppercase tracking-[0.12em] text-teal">Phone</dt>
            <dd className="mt-3">
              <a href={telHref} className={cn(linkClass, "text-lg")}>
                {contact.phone}
              </a>
            </dd>
          </div>

          {whatsappHref ? (
            <div>
              <dt className="text-sm font-semibold uppercase tracking-[0.12em] text-teal">WhatsApp</dt>
              <dd className="mt-3">
                <a href={whatsappHref} target="_blank" rel="noopener noreferrer" className={cn(linkClass, "text-lg")}>
                  {whatsappDisplay(contact.whatsappNumber)}
                </a>
              </dd>
            </div>
          ) : null}

          <div>
            <dt className="text-sm font-semibold uppercase tracking-[0.12em] text-teal">Email</dt>
            <dd className="mt-3">
              <a href={`mailto:${contact.email}`} className={cn(linkClass, "break-all text-base")}>
                {contact.email}
              </a>
            </dd>
          </div>

          <div>
            <dt className="text-sm font-semibold uppercase tracking-[0.12em] text-teal">Address</dt>
            <dd className="mt-3 text-base leading-relaxed text-body">
              {contact.address}
              {contact.mapUrl ? (
                <>
                  <br />
                  <a
                    href={contact.mapUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={cn(linkClass, "mt-3 inline-block text-sm")}
                  >
                    Open in maps
                  </a>
                </>
              ) : null}
            </dd>
          </div>

          <div className="sm:col-span-2">
            <dt className="text-sm font-semibold uppercase tracking-[0.12em] text-teal">Opening hours</dt>
            <dd className="mt-3">
              <ul className="divide-y divide-navy/10 border-y border-navy/10">
                {contact.hours.map((row) => (
                  <li key={row.days} className="flex justify-between gap-6 py-3 text-base text-body">
                    <span>{row.days}</span>
                    <span className="font-medium text-navy">{row.hours}</span>
                  </li>
                ))}
              </ul>
            </dd>
          </div>
        </dl>
      </div>
    </Section>
  );
}
