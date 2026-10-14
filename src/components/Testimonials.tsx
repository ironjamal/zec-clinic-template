import { Section, SectionHeading } from "@/components/ui";
import { siteConfig } from "@/config/site";

/**
 * Patient reviews. Renders nothing when no authorised reviews are configured,
 * so no testimonial, rating or review count is ever invented.
 */
export function Testimonials() {
  const { reviews } = siteConfig;
  if (reviews.length === 0) return null;

  return (
    <Section tone="cool" labelledBy="reviews-title">
      <SectionHeading id="reviews-title" title="What Our Patients Say" />

      <ul className="mt-14 grid gap-12 md:grid-cols-2 lg:grid-cols-3">
        {reviews.map((review) => (
          <li key={review.quote}>
            <figure className="border-l-2 border-teal pl-6">
              <blockquote className="text-lg leading-relaxed text-navy">
                <p>&ldquo;{review.quote}&rdquo;</p>
              </blockquote>
              <figcaption className="mt-5 text-sm text-body">
                <span className="font-semibold text-navy">{review.name}</span>
                {review.source ? <span> · {review.source}</span> : null}
              </figcaption>
            </figure>
          </li>
        ))}
      </ul>
    </Section>
  );
}
