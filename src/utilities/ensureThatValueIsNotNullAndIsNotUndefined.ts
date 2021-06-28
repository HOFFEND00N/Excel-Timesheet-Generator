export function ensureThatValueIsNotNullAndIsNotUndefined<T>(
  argument: T | undefined | null,
  message = "Value is null or undefined."
): T {
  if (argument === undefined || argument === null) {
    throw new TypeError(message);
  }

  return argument;
}
