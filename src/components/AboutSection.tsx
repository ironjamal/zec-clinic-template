import { Photo } from "@/components/Photo";
import { Section, SectionHeading, buttonClasses } from "@/components/ui";
import { siteConfig } from "@/config/site";

export function AboutSection() {
  const { headline, paragraphs, highlights, image, imageAlt } = siteConfig.about;

  return (
    <Section id="about" tone="cool" labelledBy="about-title">
      <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
        <Photo
          src={image}
          alt={imageAlt}
          sizes="(min-width: 1024px) 50vw, 100vw"
          className="aspect-[4/5] rounded-lg lg:col-span-6 lg:aspect-[5/6]"
        />

        <div className="lg:col-span-6 lg:pl-4">
          <SectionHeading id="about-title" title={headline} />
          <div className="mt-6 space-y-5 text-base leading-relaxed md:text-lg">
            {paragraphs.map((paragraph) => (
              <p key={paragraph.slice(0, 40)} className="max-w-[36rem]">
                {paragraph}
              </p>
            ))}
          </div>

          <dl className="mt-10 space-y-6">
            {highlights.map((item) => (
              <div key={item.title} className="border-t border-navy/10 pt-5">
                <dt className="font-semibold text-navy">{item.title}</dt>
                <dd className="mt-1 text-[15px] leading-relaxed text-body">{item.text}</dd>
              </div>
            ))}
          </dl>

          <a href="#appointment" className={buttonClasses("primary", "mt-10 w-full sm:w-auto")}>
            {siteConfig.ctas.primary}
          </a>
        </div>
      </div>
    </Section>
  );
}
