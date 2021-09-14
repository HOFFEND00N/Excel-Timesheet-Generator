//TODO: make tests for areArraysEqual()
export function areArraysEqual(a: unknown[], b: unknown[]) {
  return a.length === b.length && a.every((value, index) => value === b[index]);
}
