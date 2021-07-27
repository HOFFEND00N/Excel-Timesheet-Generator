export function isNumeric(value): boolean {
  return !isNaN(parseFloat(value)) && isFinite(value);
}
