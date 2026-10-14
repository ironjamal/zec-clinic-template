import { Photo } from "@/components/Photo";
import { buttonClasses, cn } from "@/components/ui";
import { ArrowIcon } from "@/components/icons";
import { siteConfig } from "@/config/site";

export function Hero() {
  const { hero } = siteConfig;

  return (
    <section id="top" aria-labelledby="hero-title" className="bg-white">
      <div className="mx-auto grid w-full max-w-[1200px] gap-12 px-5 pb-16 pt-12 sm:px-8 md:pt-16 lg:grid-cols-12 lg:items-center lg:gap-14 lg:pb-24 lg:pt-16">
        <div className="motion-safe:animate-rise lg:col-span-6 lg:pe-6">
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-teal">{hero.eyebrow}</p>
          <h1
            id="hero-title"
            className="mt-4 text-4xl font-semibold leading-[1.08] tracking-tight text-navy sm:text-5xl lg:text-[3.5rem]"
          >
            {hero.headline}
          </h1>
          <p className="mt-6 max-w-[34rem] text-base leading-relaxed text-body md:text-lg">{hero.subheadline}</p>

          <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
            <a href="#appointment" className={buttonClasses("primary", "w-full sm:w-auto")}>
              {siteConfig.ctas.primary}
            </a>
            <a href="#services" className={buttonClasses("secondary", "w-full gap-2 sm:w-auto")}>
              {siteConfig.ctas.secondary}
              <ArrowIcon className="size-4" />
            </a>
          </div>

          <p className="mt-8 border-t border-navy/10 pt-6 text-sm leading-relaxed text-body">{hero.trustLine}</p>
        </div>

        <Photo
          src={hero.image}
          alt={hero.imageAlt}
          priority
          sizes="(min-width: 1024px) 50vw, 100vw"
          className={cn(
            "aspect-[4/3] rounded-lg lg:aspect-auto lg:h-[min(680px,calc(100vh-140px))] lg:min-h-[520px] lg:col-span-6",
          )}
          imageClassName="object-[center_40%]"
        />
      </div>
    </section>
  );
}
