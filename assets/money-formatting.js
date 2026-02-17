/**
 * Money formatting utilities to replicate Shopify's `money` liquid filter client-side.
 * Using server-side output for money formatting is preferred, like fetching HTML responses from the Section Rendering API.
 * These utilities are intended for cases where UI needs to be updated in real-time, like a price filter state change while the user is typing.
 * @module money-formatting
 */

/**
 * Default currency decimals used in most currencies
 * @constant {number}
 */
const DEFAULT_CURRENCY_DECIMALS = 2;

/**
 * Decimal precision for currencies that have a non-default precision
 * @type {Record<string, number>}
 */
const CURRENCY_DECIMALS = {
  BHD: 3,
  BIF: 0,
  BYR: 0,
  CLF: 4,
  CLP: 0,
  DJF: 0,
  GNF: 0,
  IQD: 3,
  ISK: 0,
  JOD: 3,
  JPY: 0,
  KMF: 0,
  KRW: 0,
  KWD: 3,
  LYD: 3,
  MRO: 5,
  OMR: 3,
  PYG: 0,
  RWF: 0,
  TND: 3,
  UGX: 0,
  UYI: 0,
  UYW: 4,
  VND: 0,
  VUV: 0,
  XAF: 0,
  XAG: 0,
  XAU: 0,
  XBA: 0,
  XBB: 0,
  XBC: 0,
  XBD: 0,
  XDR: 0,
  XOF: 0,
  XPD: 0,
  XPF: 0,
  XPT: 0,
  XSU: 0,
  XTS: 0,
  XUA: 0,
};

/**
 * Parses a money string into minor units (the smallest denomination of a currency).
 * Does not assume the money string is formatted in a specific way, aims to be resilient to user input.
 * Example: convertMoneyToMinorUnits("1.000,50", "EUR") → 100050
 * Example: convertMoneyToMinorUnits("1 000.50", "EUR") → 100050
 * Minor units are cents for USD/EUR (100 cents = $1), yen for JPY (no subdivision),
 * or fils for KWD (1000 fils = 1 dinar). This allows precise integer arithmetic.
 * Handles multiple formats: US (1,000.50), European (1.000,50), and multi-separator (2,000,000.50).
 * @param {string} value - The string value to parse
 * @param {string} currency - The currency code
 * @returns {number|null} The value in minor units, or null if parsing failed
 */
export function convertMoneyToMinorUnits(value, currency) {
  const precision = CURRENCY_DECIMALS[currency.toUpperCase()] ?? DEFAULT_CURRENCY_DECIMALS;
  const multiplier = Math.pow(10, precision);

  if (!value || !value.trim()) {
    return null;
  }

  // Split on non-digit characters to handle both . and , as decimal separators
  const parts = value
    .trim()
    .split(/[^0-9]/)
    .filter(Boolean);

  if (parts.length === 0) return null;

  // Determine if the last segment is a decimal portion:
  // - For currencies with decimals (precision > 0), if last segment has digits <= precision, it's likely a decimal
  // - For zero-decimal currencies (JPY), or if last segment has more digits than precision, it's a thousands separator
  // Examples: "2,000,000.50" USD → ["2","000","000","50"] → last "50" (2 ≤ 2) = decimal
  //           "2,000,000" USD → ["2","000","000"] → last "000" (3 > 2) = thousands
  //           "9,500" KWD (3 dec) → ["9","500"] → last "500" (3 ≤ 3) = decimal
  const lastPart = parts[parts.length - 1] ?? '';
  const lastPartIsDecimal = precision > 0 && parts.length > 1 && lastPart.length <= precision;

  let wholeStr, fractionStr;

  if (lastPartIsDecimal) {
    // Last part is decimal, everything else is the whole number
    fractionStr = lastPart;
    wholeStr = parts.slice(0, -1).join('');
  } else {
    // All parts are the whole number (no decimal portion)
    wholeStr = parts.join('');
    fractionStr = '';
  }

  const whole = parseInt(wholeStr, 10);
  if (isNaN(whole)) return null;

  let fraction = 0;

  if (precision > 0 && fractionStr) {
    const fractionStrLength = fractionStr.length;
    fraction = parseInt(fractionStr, 10) || 0;
    fraction = fraction * Math.pow(10, precision - fractionStrLength);
  }

  return whole * multiplier + fraction;
}

/**
 * Formats money in minor units
 * @param {number} moneyValue - The money value in minor units
 * @param {string} thousandsSeparator - The thousands separator
 * @param {string} decimalSeparator - The decimal separator
 * @param {number} precision - The display precision
 * @param {number} divisor - The divisor to convert minor units to major units
 * @returns {string} The formatted money value
 */
function formatCents(moneyValue, thousandsSeparator, decimalSeparator, precision, divisor) {
  const roundedNumber = (moneyValue / divisor).toFixed(precision);

  let [a, b] = roundedNumber.split('.');
  if (!a) a = '0';
  if (!b) b = '';

  // Split by groups of 3 digits
  a = a.replace(/\d(?=(\d\d\d)+(?!\d))/g, (digit) => digit + thousandsSeparator);

  return precision <= 0 ? a : a + decimalSeparator + b.padEnd(precision, '0');
}

/**
 * Formats money, replicating the implementation of the `money` liquid filters
 * @param {number} moneyValue - The money value in minor units
 * @param {string} format - The Shopify's money format template (e.g., '{{amount}}', '${{amount}}')
 * @param {string} currency - The currency code (e.g., 'USD', 'JPY')
 * @returns {string} The formatted money value
 */
export function formatMoney(moneyValue, format, currency) {
  // Calculate divisor based on currency's native precision
  const currencyPrecision = CURRENCY_DECIMALS[currency.toUpperCase()] ?? DEFAULT_CURRENCY_DECIMALS;
  const divisor = Math.pow(10, currencyPrecision);

  return format.replace(/{{\s*(\w+)\s*}}/g, (_, placeholder) => {
    if (typeof placeholder !== 'string') return '';
    if (placeholder === 'currency') return currency;

    let thousandsSeparator = ',';
    let decimalSeparator = '.';
    let precision = currencyPrecision;

    switch (placeholder) {
      case 'amount':
      // Check first since it's the most common, use defaults.
        break;
      case 'amount_no_decimals':
        precision = 0;
        break;
      case 'amount_with_comma_separator':
      thousandsSeparator = '.';
      decimalSeparator = ',';
      break;
      case 'amount_no_decimals_with_comma_separator':
      // Weirdly, this is correct. It uses amount_with_comma_separator's
      // behaviour but removes decimals, resulting in an unintuitive
      // output that can't possibly include commas, despite the name.
      thousandsSeparator = '.';
      precision = 0;
      break;
    case 'amount_no_decimals_with_space_separator':
      thousandsSeparator = ' ';
      precision = 0;
      break;
    case 'amount_with_space_separator':
      thousandsSeparator = ' ';
      decimalSeparator = ',';
      break;
    case 'amount_with_period_and_space_separator':
      thousandsSeparator = ' ';
      decimalSeparator = '.';
      break;
    case 'amount_with_apostrophe_separator':
      thousandsSeparator = "'";
      decimalSeparator = '.';
      break;
    default:
      break;
    }

    return formatCents(moneyValue, thousandsSeparator, decimalSeparator, precision, divisor);
  });
}
