import { ArrowIcon } from "@/components/icons";
import { Section, SectionHeading, cn, focusRing } from "@/components/ui";
import { siteConfig } from "@/config/site";

/**
 * Accessible accordion built on native <details>/<summary>, so keyboard
 * and screen-reader behaviour comes from the platform, not custom code.
 */
export function FAQ() {
  const { headline, items } = siteConfig.faqs;

  return (
    <Section id="faqs" tone="white" labelledBy="faq-title">
      <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-4">
          <SectionHeading id="faq-title" title={headline} intro="Quick answers about booking, visiting and contacting us." />
        </div>

        <div className="divide-y divide-navy/10 border-y border-navy/10 lg:col-span-8">
          {items.map((item) => (
            <details key={item.question} className="group py-1">
              <summary
                className={cn(
                  "flex cursor-pointer list-none items-center justify-between gap-6 rounded-sm py-5 text-start text-lg font-semibold text-navy transition-colors duration-200 hover:text-teal",
                  "[&::-webkit-details-marker]:hidden",
                  focusRing,
                )}
              >
                {item.question}
                <ArrowIcon className="size-5 shrink-0 transition-transform duration-200 group-open:rotate-90 motion-reduce:transition-none" />
              </summary>
              <div className="pb-6 pe-10 text-[15px] leading-relaxed text-body md:text-base">{item.answer}</div>
            </details>
          ))}
        </div>
      </div>
    </Section>
  );
}
