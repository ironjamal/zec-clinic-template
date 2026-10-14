import { Photo } from "@/components/Photo";
import { Section, SectionHeading, cn } from "@/components/ui";
import { siteConfig, type Doctor } from "@/config/site";

function initials(name: string): string {
  return name
    .replace(/^Dr\.?\s*/i, "")
    .split(/\s+/)
    .map((part) => part[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

function DoctorPortrait({ doctor }: { doctor: Doctor }) {
  if (doctor.image) {
    return (
      <Photo
        src={doctor.image}
        alt={`Portrait of ${doctor.name}`}
        sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 100vw"
        className="aspect-[4/5] rounded-lg"
      />
    );
  }

  return (
    <div
      role="img"
      aria-label={`Portrait placeholder for ${doctor.name}`}
      className="relative flex aspect-[4/5] items-end overflow-hidden rounded-lg bg-cool p-6 text-navy"
    >
      <span
        aria-hidden="true"
        className="absolute right-6 top-6 size-20 rounded-full border border-teal/50"
      />
      <span className="absolute bottom-0 start-0 h-1 w-16 bg-teal" aria-hidden="true" />
      <span className="text-5xl font-semibold tracking-wide">{initials(doctor.name)}</span>
    </div>
  );
}

export function DoctorsSection() {
  const { headline, intro, items } = siteConfig.doctors;

  return (
    <Section id="doctors" tone="white" labelledBy="doctors-title">
      <SectionHeading id="doctors-title" title={headline} intro={intro} />

      <ul className="mt-14 grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((doctor) => (
          <li key={doctor.name} className="flex flex-col">
            <DoctorPortrait doctor={doctor} />

            <div className="mt-6 flex flex-1 flex-col">
              {doctor.sample ? (
                <p className="mb-3 self-start text-xs font-semibold uppercase tracking-[0.12em] text-body">
                  Sample profile
                </p>
              ) : null}
              <h3 className="text-xl font-semibold text-navy">{doctor.name}</h3>
              <p className="mt-1 text-[15px] font-medium text-teal">{doctor.title}</p>
              <p className="mt-3 text-[15px] leading-relaxed text-body">{doctor.specialty}</p>

              <ul className={cn("mt-4 space-y-1 text-sm text-body", doctor.sample && "italic")}>
                {doctor.qualifications.map((qualification) => (
                  <li key={qualification}>{qualification}</li>
                ))}
              </ul>

              <a
                href="#appointment"
                className="mt-6 inline-flex min-h-11 items-center self-start rounded-sm text-sm font-semibold text-navy underline decoration-teal decoration-2 underline-offset-4 transition-colors duration-200 hover:text-teal focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal"
              >
                Request an appointment with {doctor.name.replace(/^Dr\.?\s*/, "")}
              </a>
            </div>
          </li>
        ))}
      </ul>
    </Section>
  );
}
