/** Parse "MMM YYYY" (e.g. "Dec 2024") → timestamp for sorting. */
export function parseMonthYear(s: string): number {
  const [m, y] = s.split(' ');
  return new Date(`${m} 1, ${y}`).getTime();
}

/** Sort descending (most recent first) by a "MMM YYYY" date field. */
export function byDateDesc<T extends { date: string }>(a: T, b: T): number {
  return parseMonthYear(b.date) - parseMonthYear(a.date);
}
