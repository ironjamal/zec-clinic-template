"use client";

import { useEffect, useId, useState } from "react";
import { BrandMark } from "@/components/BrandMark";
import { buttonClasses, cn, focusRing } from "@/components/ui";
import { siteConfig } from "@/config/site";

export function Header() {
  const [open, setOpen] = useState(false);
  const menuId = useId();

  // Close the mobile menu with Escape and when the viewport grows to desktop size.
  useEffect(() => {
    if (!open) return;

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    const mq = window.matchMedia("(min-width: 768px)");
    const onChange = () => {
      if (mq.matches) setOpen(false);
    };

    window.addEventListener("keydown", onKey);
    mq.addEventListener("change", onChange);
    return () => {
      window.removeEventListener("keydown", onKey);
      mq.removeEventListener("change", onChange);
    };
  }, [open]);

  return (
    <header className="sticky top-0 z-40 border-b border-navy/10 bg-white">
      <div className="mx-auto flex h-20 w-full max-w-[1200px] items-center justify-between gap-4 px-5 sm:px-8">
        <a href="#top" className={cn("rounded-sm", focusRing)} aria-label={`${siteConfig.brand.name} home`}>
          <BrandMark />
        </a>

        <nav aria-label="Primary" className="hidden md:block">
          <ul className="flex items-center gap-8">
            {siteConfig.nav.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className={cn(
                    "rounded-sm py-2 text-[15px] font-medium text-navy transition-colors duration-200 hover:text-teal",
                    focusRing,
                  )}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-3">
          <a href="#appointment" className={buttonClasses("primary", "max-sm:hidden px-5")}>
            {siteConfig.ctas.primary}
          </a>

          <button
            type="button"
            className={cn(
              "inline-flex size-12 items-center justify-center rounded-md border border-navy/15 text-navy md:hidden",
              focusRing,
            )}
            aria-expanded={open}
            aria-controls={menuId}
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((value) => !value)}
          >
            <svg viewBox="0 0 24 24" className="size-6" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" aria-hidden="true" focusable="false">
              {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
            </svg>
          </button>
        </div>
      </div>

      <nav
        id={menuId}
        aria-label="Mobile"
        hidden={!open}
        className="border-t border-navy/10 bg-white md:hidden"
      >
        <ul className="mx-auto flex max-w-[1200px] flex-col px-5 py-2 sm:px-8">
          {siteConfig.nav.map((item) => (
            <li key={item.href} className="border-b border-navy/10 last:border-b-0">
              <a
                href={item.href}
                onClick={() => setOpen(false)}
                className={cn("block py-4 text-base font-medium text-navy", focusRing)}
              >
                {item.label}
              </a>
            </li>
          ))}
          <li className="py-4">
            <a href="#appointment" onClick={() => setOpen(false)} className={buttonClasses("primary", "w-full")}>
              {siteConfig.ctas.primary}
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
}
