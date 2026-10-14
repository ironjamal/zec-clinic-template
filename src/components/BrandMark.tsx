import Image from "next/image";
import { siteConfig } from "@/config/site";
import { cn } from "@/components/ui";

/** Logo: uses logoImage when configured, otherwise a typographic initials mark. */
export function BrandMark({ className, onDark = false }: { className?: string; onDark?: boolean }) {
  const { logoImage, logoInitials, name } = siteConfig.brand;

  if (logoImage) {
    return (
      <Image
        src={logoImage}
        alt={name}
        width={160}
        height={40}
        className={cn("h-10 w-auto", className)}
      />
    );
  }

  return (
    <span className={cn("inline-flex items-center gap-3", className)}>
      <span
        aria-hidden="true"
        className={cn(
          "flex size-10 items-center justify-center rounded-md text-sm font-bold tracking-wide",
          onDark ? "bg-white text-navy" : "bg-navy text-white",
        )}
      >
        {logoInitials}
      </span>
      <span className={cn("text-base font-semibold leading-tight", onDark ? "text-white" : "text-navy")}>
        {siteConfig.brand.shortName}
        <span className={cn("block text-xs font-normal", onDark ? "text-white/75" : "text-body")}>
          {siteConfig.brand.tagline}
        </span>
      </span>
    </span>
  );
}
