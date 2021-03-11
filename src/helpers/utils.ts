export function randint(a: number, b: number) {
  if (a > b) [a, b] = [b, a];

  return a + Math.ceil((b - a) * Math.random());
}
