/**
 *  Return a random number from 0 up to max (exclusive)
 */
export default function getRandomNumber(max: number): number {
  return Math.floor(Math.random() * max);
}
