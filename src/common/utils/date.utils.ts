/**
 * Converte uma string "YYYY-MM-DD" em um objeto Date seguro.
 * Lança erro se a data for inválida.
 */
export function parseSafeDate(dateStr: string): Date {
  const date = new Date(dateStr);

  if (
    isNaN(date.getTime()) ||
    typeof dateStr !== 'string' ||
    !/^\d{4}-\d{2}-\d{2}(T.*)?$/.test(dateStr)
  ) {
    throw new Error(`Data inválida: ${dateStr}`);
  }

  return date;
}

/**
 * Formata um objeto Date para "YYYY-MM-DD".
 */
export function formatDateOnly(date: Date): string {
  return date.toISOString().split('T')[0];
}

export function getDateRange(
  start: string,
  end: string,
): {
  gte: Date;
  lte: Date;
} {
  const startDate = parseSafeDate(start);
  startDate.setHours(0, 0, 0, 0);

  const endDate = parseSafeDate(end);
  endDate.setHours(0, 0, 0, 0);

  const nextDay = new Date(endDate);
  nextDay.setDate(nextDay.getDate() + 1);
  nextDay.setHours(0, 0, 0, 0); // garante que lt seja início do dia seguinte

  return {
    gte: startDate,
    lte: nextDay,
  };
}
