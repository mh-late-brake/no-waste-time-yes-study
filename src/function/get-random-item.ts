import getRandomNumber from "./get-random-index";

export default function getRandomItem<T>(arr: Array<T>): T {
  const arrLengh = arr.length;
  const randomIndex = getRandomNumber(arrLengh);
  return arr[randomIndex];
}
