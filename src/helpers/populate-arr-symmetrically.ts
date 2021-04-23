export function populateArrSymmetrically(arr: number[], value: number, index: number) {
  let start = index;
  let end = index;

  const newArr = [...arr];

  while (start >= 0 && end < newArr.length) {
    start >= 0 && (newArr[start] = value >= 0 ? value : 0);
    end < newArr.length && (newArr[end] = value >= 0 ? value : 0);

    value--;

    start--;
    end++;
  }

  return newArr;
}
