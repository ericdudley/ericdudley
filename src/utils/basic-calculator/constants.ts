export const OPERATIONS = new Set(['+', '-', '*', '/', '(', ')']);
export const DIGITS = new Set([
  '1',
  '2',
  '3',
  '4',
  '5',
  '6',
  '7',
  '8',
  '9',
  '0',
]);
// export const EXAMPLE_FORMULA = "15 - (1 + -2)";
export const EXAMPLE_FORMULA = '-3 * (10 + 4 / 2)';

export const MAX_NUMBER_PRECISION = 4;

export function formatNumber(num: number | undefined | null) {
  return num != null
    ? parseFloat(num.toFixed(MAX_NUMBER_PRECISION)).toString()
    : '';
}
