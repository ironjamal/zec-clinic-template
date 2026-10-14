import { Section } from "@/components/ui";
import { siteConfig } from "@/config/site";

/** Compact proof points: neutral statements about the clinic's approach, not invented statistics. */
export function TrustSection() {
  return (
    <Section tone="cool" className="py-14 md:py-16" labelledBy="trust-title">
      <h2 id="trust-title" className="sr-only">
        Our approach
      </h2>
      <ul className="grid gap-10 md:grid-cols-3 md:gap-12">
        {siteConfig.trust.map((item, index) => (
          <li key={item.title} className="flex gap-5 md:flex-col md:gap-4">
            <span
              aria-hidden="true"
              className="font-semibold text-teal tabular-nums text-sm pt-1 md:pt-0"
            >
              0{index + 1}
            </span>
            <div>
              <h3 className="text-lg font-semibold text-navy">{item.title}</h3>
              <p className="mt-2 max-w-[22rem] text-[15px] leading-relaxed text-body">{item.text}</p>
            </div>
          </li>
        ))}
      </ul>
    </Section>
  );
}
