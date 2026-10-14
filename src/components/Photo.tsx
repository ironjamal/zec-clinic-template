import { existsSync } from "node:fs";
import path from "node:path";
import Image from "next/image";
import { cn } from "@/components/ui";
import { siteConfig } from "@/config/site";

interface PhotoProps {
  /** Path under /public, for example /images/hero.jpg */
  src: string;
  alt: string;
  /** Responsive size hint for next/image, e.g. "(min-width: 1024px) 50vw, 100vw". */
  sizes: string;
  priority?: boolean;
  /** Classes for the wrapper; set the aspect ratio and radius here. */
  className?: string;
  /** Classes for the image itself, e.g. object-position. */
  imageClassName?: string;
  /** Tone of the fallback panel when the photo file is missing. */
  fallbackTone?: "navy" | "cool";
}

/**
 * Renders a clinic photograph from /public when it exists. When the file is
 * missing, renders a deliberate brand panel instead of a broken image, and
 * logs a build warning so the missing asset is easy to find.
 */
export function Photo({
  src,
  alt,
  sizes,
  priority = false,
  className,
  imageClassName,
  fallbackTone = "navy",
}: PhotoProps) {
  const exists = existsSync(path.join(process.cwd(), "public", src));

  if (!exists) {
    console.warn(`[photo] Missing image "${src}". Add it under public/ to replace the brand panel.`);

    return (
      <div
        role="img"
        aria-label={alt}
        className={cn(
          "relative overflow-hidden",
          fallbackTone === "navy" ? "bg-navy text-white" : "bg-cool text-navy",
          className,
        )}
      >
        <svg
          viewBox="0 0 400 400"
          preserveAspectRatio="xMidYMid slice"
          className="absolute inset-0 size-full"
          aria-hidden="true"
          focusable="false"
        >
          <g fill="none" stroke="#267C83" strokeWidth="1.5" opacity="0.7">
            <circle cx="300" cy="120" r="150" />
            <circle cx="300" cy="120" r="110" />
            <circle cx="300" cy="120" r="70" />
          </g>
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-5xl font-semibold tracking-widest opacity-90 md:text-6xl">
            {siteConfig.brand.logoInitials}
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className={cn("relative overflow-hidden bg-cool", className)}>
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        priority={priority}
        className={cn("object-cover", imageClassName)}
      />
    </div>
  );
}
