export function getRandomNumber(min: number, max: number): number {
  const diff = max - min;
  return Math.floor(Math.random() * diff + min);
}
