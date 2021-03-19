export function randint(a: number, b: number) {
  if (a > b) [a, b] = [b, a];

  return a + Math.floor((b - a) * Math.random());
}
