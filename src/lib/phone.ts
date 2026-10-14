/**
 * Egyptian mobile number validation and normalisation.
 *
 * Accepts 010, 011, 012 and 015 mobile numbers, written as
 * 01012345678, 0101 234 5678, +20 10 1234 5678 or 0020 10 1234 5678.
 * Returns the number in E.164 form (+201012345678) or null when invalid.
 *
 * To support other countries, extend this function or swap it for a
 * library such as libphonenumber-js.
 */
export function normaliseEgyptMobile(input: string): string | null {
  const compact = input.replace(/[\s().-]/g, "");

  const match =
    compact.match(/^(?:\+|00)?20(1[0125]\d{8})$/) ?? compact.match(/^0(1[0125]\d{8})$/);

  return match ? `+20${match[1]}` : null;
}

export const PHONE_ERROR =
  "Enter an Egyptian mobile number, for example 01012345678 or +20 10 1234 5678.";
