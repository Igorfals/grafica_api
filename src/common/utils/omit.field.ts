export function omitField<T extends object, K extends keyof T>(
  obj: T,
  key: K,
): Omit<T, K> {
  const { [key]: ignored, ...rest } = obj;
  void ignored; // evita warning de variável não usada
  return rest;
}
