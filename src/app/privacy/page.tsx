import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: `Privacy Policy | ${siteConfig.brand.name}`,
  description: `How ${siteConfig.brand.name} handles information submitted through this website.`,
};

export default function PrivacyPage() {
  const { brand, contact } = siteConfig;

  return (
    <main className="bg-white">
      <div className="mx-auto w-full max-w-3xl px-5 py-16 sm:px-8 md:py-24">
        <Link href="/" className="text-sm font-semibold text-teal underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal">
          ← Back to home
        </Link>

        <h1 className="mt-8 text-4xl font-semibold tracking-tight text-navy">Privacy Policy</h1>
        <p className="mt-4 rounded-md border border-navy/15 bg-cool p-4 text-sm leading-relaxed text-body">
          Draft for demonstration. Before publishing, the clinic must replace this text with its own policy, reviewed
          by a qualified adviser under the data protection laws that apply to it.
        </p>

        <div className="mt-10 space-y-8 text-base leading-relaxed text-body">
          <section aria-labelledby="p-what">
            <h2 id="p-what" className="text-xl font-semibold text-navy">What this website collects</h2>
            <p className="mt-3">
              When you use the appointment form, the details you type (name, mobile number, requested service,
              optional preferred date and message) are placed into a WhatsApp message that you send yourself. This
              website does not store, log or forward those details.
            </p>
          </section>

          <section aria-labelledby="p-whatsapp">
            <h2 id="p-whatsapp" className="text-xl font-semibold text-navy">WhatsApp</h2>
            <p className="mt-3">
              WhatsApp is provided by its own operator, and messages you send are subject to that service&rsquo;s terms
              and privacy policy. Please avoid sending detailed medical history through the website form.
            </p>
          </section>

          <section aria-labelledby="p-clinic">
            <h2 id="p-clinic" className="text-xl font-semibold text-navy">How the clinic uses your information</h2>
            <p className="mt-3">
              {brand.name} uses information you send to respond to your request, arrange an appointment and, where
              relevant, provide care. Describe here how records are kept, how long they are retained and who can access
              them.
            </p>
          </section>

          <section aria-labelledby="p-contact">
            <h2 id="p-contact" className="text-xl font-semibold text-navy">Contact</h2>
            <p className="mt-3">
              To ask about your information or to make a request, contact us at{" "}
              <a href={`mailto:${contact.email}`} className="font-semibold text-navy underline">
                {contact.email}
              </a>
              .
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
