import { AboutSection } from "@/components/AboutSection";
import { AppointmentSection } from "@/components/AppointmentSection";
import { ContactSection } from "@/components/ContactSection";
import { DoctorsSection } from "@/components/DoctorsSection";
import { FAQ } from "@/components/FAQ";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { PatientJourney } from "@/components/PatientJourney";
import { ServicesSection } from "@/components/ServicesSection";
import { Testimonials } from "@/components/Testimonials";
import { TrustSection } from "@/components/TrustSection";

export default function HomePage() {
  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:start-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-navy focus:px-4 focus:py-3 focus:text-white focus:outline-2 focus:outline-offset-2 focus:outline-teal"
      >
        Skip to content
      </a>

      <Header />

      <main id="main" className="flex-1">
        <Hero />
        <TrustSection />
        <ServicesSection />
        <AboutSection />
        <DoctorsSection />
        <PatientJourney />
        <Testimonials />
        <FAQ />
        <AppointmentSection />
        <ContactSection />
      </main>

      <Footer />
    </>
  );
}
