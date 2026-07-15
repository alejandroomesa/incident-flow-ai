const EMAIL_RE = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g;

// Matches sequences of digits with optional separators/parentheses (e.g. "+34 600 123 456",
// "600123456", "(555) 123-4567"). A digit-count guard below filters out short numeric
// sequences (dates, IDs) that aren't phone numbers.
const PHONE_RE = /(\+?\d{1,3}[\s.-]?)?(\(?\d{2,4}\)?[\s.-]?){2,4}\d{2,4}/g;

/**
 * Demo-grade PII masking: regex-based redaction of emails and phone numbers.
 * Not a substitute for production NLP-based PII detection.
 */
export function maskPII(text: string): string {
  let masked = text.replace(EMAIL_RE, '[EMAIL_REDACTED]');
  masked = masked.replace(PHONE_RE, (match) => {
    const digitCount = match.replace(/\D/g, '').length;
    return digitCount >= 7 ? '[PHONE_REDACTED]' : match;
  });
  return masked;
}
