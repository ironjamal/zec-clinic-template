import { Section, SectionHeading } from "@/components/ui";
import { siteConfig } from "@/config/site";

export function PatientJourney() {
  const { headline, intro, steps } = siteConfig.journey;

  return (
    <Section tone="navy" labelledBy="journey-title">
      <SectionHeading id="journey-title" tone="light" title={headline} intro={intro} />

      <ol className="mt-14 grid gap-10 md:grid-cols-3 md:gap-8">
        {steps.map((step, index) => (
          <li
            key={step.title}
            className="relative border-t-2 border-teal pt-8 md:pr-6"
          >
            <span className="text-sm font-semibold tabular-nums tracking-wide text-white/70">
              Step {index + 1} of {steps.length}
            </span>
            <h3 className="mt-3 text-xl font-semibold text-white">{step.title}</h3>
            <p className="mt-3 text-[15px] leading-relaxed text-white/80 md:text-base">{step.text}</p>
          </li>
        ))}
      </ol>
    </Section>
  );
}
