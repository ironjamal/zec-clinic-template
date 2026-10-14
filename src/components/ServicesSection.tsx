import { ArrowIcon, Icon } from "@/components/icons";
import { Section, SectionHeading, focusRing, cn } from "@/components/ui";
import { siteConfig } from "@/config/site";

/**
 * Services as an open, numbered editorial list rather than a grid of cards.
 * Each row links to the appointment form as its next step.
 */
export function ServicesSection() {
  const { headline, intro, items } = siteConfig.services;

  return (
    <Section id="services" labelledBy="services-title">
      <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-4">
          <SectionHeading id="services-title" title={headline} intro={intro} />
        </div>

        <ol className="divide-y divide-navy/10 border-y border-navy/10 lg:col-span-8">
          {items.map((service, index) => (
            <li key={service.id} className="grid gap-4 py-8 sm:grid-cols-[auto_1fr] sm:gap-8 md:py-10">
              <div className="flex items-start gap-4 sm:w-16 sm:flex-col sm:gap-3">
                <span className="flex size-12 shrink-0 items-center justify-center rounded-md bg-cool text-teal">
                  <Icon name={service.icon} className="size-6" />
                </span>
                <span className="pt-3 text-sm font-semibold tabular-nums text-navy/50 sm:pt-0">
                  {String(index + 1).padStart(2, "0")}
                </span>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-navy">{service.title}</h3>
                <p className="mt-3 max-w-[38rem] text-[15px] leading-relaxed text-body md:text-base">
                  {service.description}
                </p>
                <a
                  href="#appointment"
                  className={cn(
                    "mt-5 inline-flex items-center gap-2 rounded-sm text-sm font-semibold text-teal transition-colors duration-200 hover:text-navy",
                    focusRing,
                  )}
                >
                  Request this service
                  <span className="sr-only"> ({service.title})</span>
                  <ArrowIcon className="size-4" />
                </a>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </Section>
  );
}
