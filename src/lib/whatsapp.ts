/**
 * Builds a wa.me link that opens a WhatsApp chat with the clinic and
 * pre-fills an appointment inquiry. Nothing is sent by this site itself;
 * the patient sends the message from their own WhatsApp.
 */
export function buildWhatsAppUrl(number: string, message: string): string {
  const digits = number.replace(/\D/g, "");
  return `https://wa.me/${digits}?text=${encodeURIComponent(message)}`;
}

export function whatsappDisplay(number: string): string {
  const digits = number.replace(/\D/g, "");
  return digits ? `+${digits}` : "";
}
