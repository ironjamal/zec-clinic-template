import type { ReactNode } from "react";

/** Joins class names, ignoring falsy values. Avoids an extra dependency. */
export function cn(...classes: Array<string | false | null | undefined>): string {
  return classes.filter(Boolean).join(" ");
}

export const focusRing =
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal";

interface SectionProps {
  id?: string;
  tone?: "white" | "cool" | "navy";
  className?: string;
  labelledBy?: string;
  children: ReactNode;
}

/** Page section wrapper: consistent vertical rhythm and container width. */
export function Section({ id, tone = "white", className, labelledBy, children }: SectionProps) {
  const toneClass = {
    white: "bg-white text-body",
    cool: "bg-cool text-body",
    navy: "bg-navy text-white",
  }[tone];

  return (
    <section
      id={id}
      aria-labelledby={labelledBy}
      className={cn("scroll-mt-20 py-16 md:py-24", toneClass, className)}
    >
      <div className="mx-auto w-full max-w-[1200px] px-5 sm:px-8">{children}</div>
    </section>
  );
}

export function Eyebrow({ children, tone = "teal" }: { children: ReactNode; tone?: "teal" | "light" }) {
  return (
    <p
      className={cn(
        "text-sm font-semibold uppercase tracking-[0.16em]",
        tone === "teal" ? "text-teal" : "text-white/80",
      )}
    >
      {children}
    </p>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  id,
  intro,
  align = "start",
  tone = "navy",
}: {
  eyebrow?: string;
  title: string;
  id: string;
  intro?: string;
  align?: "start" | "center";
  tone?: "navy" | "light";
}) {
  return (
    <div className={cn("max-w-2xl", align === "center" && "mx-auto text-center")}>
      {eyebrow ? <Eyebrow tone={tone === "light" ? "light" : "teal"}>{eyebrow}</Eyebrow> : null}
      <h2
        id={id}
        className={cn(
          "mt-3 text-3xl font-semibold leading-tight tracking-tight md:text-4xl",
          tone === "light" ? "text-white" : "text-navy",
        )}
      >
        {title}
      </h2>
      {intro ? (
        <p className={cn("mt-4 text-base leading-relaxed md:text-lg", tone === "light" ? "text-white/85" : "text-body")}>
          {intro}
        </p>
      ) : null}
    </div>
  );
}

type ButtonVariant = "primary" | "secondary" | "ghost-light";

const buttonVariants: Record<ButtonVariant, string> = {
  primary: "bg-teal text-white hover:bg-navy",
  secondary: "border border-navy/25 bg-white text-navy hover:border-teal hover:text-teal",
  "ghost-light": "border border-white/60 text-white hover:bg-white hover:text-navy",
};

export function buttonClasses(variant: ButtonVariant = "primary", extra?: string): string {
  return cn(
    "inline-flex min-h-12 items-center justify-center whitespace-nowrap rounded-md px-6 text-base font-semibold",
    "transition-colors duration-200 ease-out motion-reduce:transition-none",
    focusRing,
    buttonVariants[variant],
    extra,
  );
}
