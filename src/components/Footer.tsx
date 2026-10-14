import Link from "next/link";
import { BrandMark } from "@/components/BrandMark";
import { cn, focusRing } from "@/components/ui";
import { siteConfig } from "@/config/site";

const linkClass = cn("rounded-sm text-white/85 transition-colors duration-200 hover:text-white", focusRing);

export function Footer() {
  const { brand, contact, nav, footer, isDemo } = siteConfig;

  return (
    <footer className="bg-navy text-white/80">
      <div className="mx-auto grid w-full max-w-[1200px] gap-12 px-5 py-16 sm:px-8 md:grid-cols-12 md:gap-10">
        <div className="md:col-span-4">
          <BrandMark onDark />
          <p className="mt-6 max-w-xs text-[15px] leading-relaxed text-white/75">{brand.description}</p>
        </div>

        <nav aria-label="Footer" className="md:col-span-3">
          <h2 className="text-sm font-semibold uppercase tracking-[0.12em] text-white">Explore</h2>
          <ul className="mt-5 space-y-3 text-[15px]">
            {nav.map((item) => (
              <li key={item.href}>
                <a href={item.href} className={linkClass}>
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="md:col-span-5">
          <h2 className="text-sm font-semibold uppercase tracking-[0.12em] text-white">Contact</h2>
          <ul className="mt-5 space-y-3 text-[15px]">
            <li>
              <a href={`tel:${contact.phone.replace(/\s/g, "")}`} className={linkClass}>
                {contact.phone}
              </a>
            </li>
            <li>
              <a href={`mailto:${contact.email}`} className={cn(linkClass, "break-all")}>
                {contact.email}
              </a>
            </li>
            <li className="leading-relaxed">{contact.address}</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex w-full max-w-[1200px] flex-col gap-4 px-5 py-8 text-sm sm:px-8 md:flex-row md:items-center md:justify-between">
          <p>
            © {footer.copyrightYear} {brand.name}. All rights reserved.
          </p>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
            <Link href={footer.privacyPath} className={linkClass}>
              Privacy Policy
            </Link>
            {isDemo ? <span className="text-white/60">Demonstration content</span> : null}
          </div>
        </div>
        <p className="mx-auto w-full max-w-[1200px] px-5 pb-10 text-xs leading-relaxed text-white/60 sm:px-8">
          {footer.disclaimer}
        </p>
      </div>
    </footer>
  );
}
