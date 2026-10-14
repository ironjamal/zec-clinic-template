/**
 * Central content and brand configuration for the clinic template.
 *
 * Everything a clinic owner typically changes lives here: names, colours,
 * copy, services, doctors, FAQs and contact details. Components only read
 * from this file, so a new clinic can be configured without editing JSX.
 *
 * Items marked `sample: true` or `isDemo: true` are demonstration content.
 * Replace them with verified, authorised clinic information before launch.
 */

export type IconName = "sparkle" | "shield" | "activity" | "user" | "heart" | "calendar";

export interface Service {
  id: string;
  title: string;
  description: string;
  icon: IconName;
}

export interface Doctor {
  name: string;
  title: string;
  specialty: string;
  qualifications: string[];
  /** Path under /public. When missing, a monogram portrait is shown. */
  image?: string;
  /** Marks a demonstration profile. Shown visibly until replaced. */
  sample?: boolean;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface Review {
  quote: string;
  name: string;
  /** Only add reviews the clinic has collected and is authorised to publish. */
  source?: string;
}

export interface Highlight {
  title: string;
  text: string;
}

export interface JourneyStep {
  title: string;
  text: string;
}

export interface OpeningHours {
  days: string;
  hours: string;
}

/*
 * Trust, about, FAQ and doctor copy below is demonstration copy written to
 * show layout. It must be checked and rewritten for each real clinic.
 */
export const siteConfig = {
  /** Set to false once all demonstration content has been replaced. */
  isDemo: true,

  brand: {
    name: "Riverside Care Clinic",
    shortName: "Riverside Care",
    /** Initials used in the logo mark. Replace with a real logo asset when available. */
    logoInitials: "RC",
    /** Optional path to a logo under /public. Falls back to the initials mark. */
    logoImage: undefined as string | undefined,
    tagline: "Multi-specialty outpatient care",
    /** Used for the page title, meta description and Open Graph tags. */
    description:
      "Riverside Care Clinic offers dental, dermatology, physiotherapy and general outpatient care. Request an appointment online or via WhatsApp.",
    url: "https://example.com",
    locale: "en_EG",
    /** Interface language and text direction. Switch to "ar" and "rtl" when Arabic is added. */
    lang: "en",
    dir: "ltr" as "ltr" | "rtl",
  },

  /** Brand colours, applied as CSS custom properties in the root layout. */
  colors: {
    navy: "#17324D",
    teal: "#267C83",
    white: "#FFFFFF",
    cool: "#F3F6F8",
    body: "#475569",
  },

  contact: {
    /** International format, used for tel: and WhatsApp links. */
    phone: "+20 100 000 0000",
    /** E.164 digits only, without "+" or spaces, used for wa.me links. Leave empty to hide WhatsApp. */
    whatsappNumber: "201000000000",
    email: "hello@example.com",
    address: "12 Example Street, Your District, Cairo, Egypt",
    /** Google Maps or other map link. Leave empty to hide the map link. */
    mapUrl: "",
    hours: [
      { days: "Saturday – Thursday", hours: "10:00 – 20:00" },
      { days: "Friday", hours: "Closed" },
    ] as OpeningHours[],
  },

  nav: [
    { label: "Services", href: "#services" },
    { label: "Our Doctors", href: "#doctors" },
    { label: "About", href: "#about" },
    { label: "FAQs", href: "#faqs" },
  ],

  ctas: {
    primary: "Request an Appointment",
    secondary: "Explore Our Services",
  },

  hero: {
    eyebrow: "PERSONALIZED HEALTHCARE",
    headline: "Your Health Deserves Thoughtful Care.",
    subheadline:
      "Professional care, clear guidance, and a team dedicated to helping you understand your options at every step.",
    /** Modest, factual trust line. Only state facts the clinic can verify. */
    trustLine: "Dental, dermatology, physiotherapy and general care under one roof.",
    image: "/images/hero.jpg",
    imageAlt: "Bright, modern consultation room at the clinic",
  },

  trust: [
    {
      title: "Unhurried consultations",
      text: "Time to listen, ask questions and understand your options before any decision.",
    },
    {
      title: "Clear explanations",
      text: "Treatment plans and costs explained in plain language, with no pressure to commit.",
    },
    {
      title: "Respectful, private care",
      text: "Your information and your visit are handled with discretion by our team.",
    },
  ] as Highlight[],

  services: {
    headline: "Care Tailored to Your Needs.",
    intro: "Explore our specialties and learn more about the services available at our clinic.",
    items: [
      {
        id: "dental",
        title: "Dental Care",
        description:
          "Check-ups, cleanings, fillings and restorative treatment, with a focus on keeping your natural teeth healthy.",
        icon: "sparkle",
      },
      {
        id: "dermatology",
        title: "Dermatology",
        description:
          "Assessment and management of skin, hair and nail concerns, from routine reviews to ongoing condition care.",
        icon: "shield",
      },
      {
        id: "physiotherapy",
        title: "Physiotherapy",
        description:
          "Personalised rehabilitation for injuries, posture and movement, with exercises you can continue at home.",
        icon: "activity",
      },
      {
        id: "general",
        title: "General Consultation",
        description:
          "A thorough first assessment, clear advice and referral to the right specialist when it is needed.",
        icon: "user",
      },
      {
        id: "preventive",
        title: "Preventive Check-ups",
        description:
          "Scheduled screenings and health reviews that help catch concerns early and keep you informed.",
        icon: "heart",
      },
      {
        id: "followup",
        title: "Follow-up Care",
        description:
          "Structured review appointments that track your progress and adjust your plan as you improve.",
        icon: "calendar",
      },
    ] as Service[],
  },

  about: {
    headline: "Care That Puts You First.",
    paragraphs: [
      "Our clinic is designed around the visit itself: a calm reception, private consultation rooms and a team that takes the time to explain what is happening and why.",
      "Whether you come in for a routine check or ongoing treatment, you will know what to expect before you arrive and who to contact afterwards.",
    ],
    highlights: [
      { title: "Private consultation rooms", text: "Quiet spaces for open, unrushed conversations." },
      { title: "Clear next steps", text: "Every visit ends with a plan you understand." },
      { title: "Accessible reception", text: "Our team helps with timing, questions and follow-up." },
    ] as Highlight[],
    image: "/images/about.jpg",
    imageAlt: "Clinic reception and waiting area with natural light",
  },

  doctors: {
    headline: "Meet Your Care Team.",
    intro: "Profiles below are demonstration content. Replace them with verified details for each practitioner.",
    items: [
      {
        name: "Dr. Layla Hassan",
        title: "Consultant Dentist",
        specialty: "Restorative and preventive dentistry",
        qualifications: ["Qualification to be added by clinic"],
        sample: true,
      },
      {
        name: "Dr. Omar Mostafa",
        title: "Consultant Dermatologist",
        specialty: "Medical and cosmetic dermatology",
        qualifications: ["Qualification to be added by clinic"],
        sample: true,
      },
      {
        name: "Dr. Nour El-Sayed",
        title: "Senior Physiotherapist",
        specialty: "Musculoskeletal rehabilitation",
        qualifications: ["Qualification to be added by clinic"],
        sample: true,
      },
    ] as Doctor[],
  },

  journey: {
    headline: "Getting Started Is Simple.",
    intro: "Three steps from first question to your visit. Your appointment is only confirmed once our team confirms it with you.",
    steps: [
      {
        title: "Choose the relevant service",
        text: "Pick the specialty that fits your concern, or ask us which one is right for you.",
      },
      {
        title: "Contact the clinic",
        text: "Send your request through the form or WhatsApp. We will check availability with you.",
      },
      {
        title: "Receive confirmation and visit",
        text: "Our team confirms your appointment time, and you arrive with the details we shared.",
      },
    ] as JourneyStep[],
  },

  /** Add only verified, authorised reviews. When empty, the section is hidden. */
  reviews: [] as Review[],

  faqs: {
    headline: "Frequently Asked Questions",
    items: [
      {
        question: "How do I request an appointment?",
        answer:
          "Use the request form on this page or send us a WhatsApp message. Our team will reply to confirm availability and your appointment time.",
      },
      {
        question: "What should I bring to my first visit?",
        answer:
          "Bring any relevant records or a list of current medications you take. For specific requirements for your visit, please ask our reception team when you book.",
      },
      {
        question: "Where is the clinic located?",
        answer: "Our address is listed in the contact section. A map link is included there for directions.",
      },
      {
        question: "How can I contact the reception team?",
        answer:
          "Call us during opening hours, send a WhatsApp message or email us. Contact details are listed in the contact section.",
      },
      {
        question: "Which services are available?",
        answer:
          "We offer dental care, dermatology, physiotherapy, general consultations, preventive check-ups and follow-up care. Our team can advise which service suits you.",
      },
    ] as FaqItem[],
  },

  appointment: {
    headline: "Let's Plan Your Visit.",
    intro: "Contact our team to ask about availability and arrange your appointment.",
    privacyNote:
      "Your details are sent to our clinic through WhatsApp only when you choose to send them. This website does not store your request. Please don't include detailed medical history in the message.",
    notSureOption: "Not sure yet",
    successMessage:
      "WhatsApp has opened with your request. Your appointment is not booked until our team confirms it with you.",
    blockedMessage:
      "Your browser blocked the WhatsApp window. Use the link below to send your request.",
  },

  footer: {
    /** Set to the current year when publishing. Kept in config so the page can be statically rendered. */
    copyrightYear: 2026,
    disclaimer:
      "The information on this website is for general guidance only and does not replace a consultation with a qualified healthcare professional. In an emergency, contact your nearest emergency service.",
    privacyPath: "/privacy",
  },
};

export type SiteConfig = typeof siteConfig;
