const swap = (arr: any[], i: number, j: number) => {
  const temp = arr[i];
  arr[i] = arr[j];
  arr[j] = temp;
};

const shuffle = (arr: any[]) => {
  const n = arr.length;
  for (let i = 0; i < n; i++) {
    const r = Math.floor(Math.random() * (i + 1));
    swap(arr, r, i);
  }
};

const partition = (arr: number[], lo: number, hi: number, steps: any[]) => {
  let i = lo,
    j = hi + 1;
  const v = arr[lo];
  while (true) {
    while (arr[++i] < v) {
      if (i === hi) break;
    }
    while (v < arr[--j]) {
      if (j === lo) break;
    }
    if (i >= j) break;
    swap(arr, i, j);
  }
  swap(arr, lo, j);
  return j;
};

const sort = (arr: number[], lo: number, hi: number, steps: any[]) => {
  if (hi <= lo) return;
  const j = partition(arr, lo, hi, steps);
  sort(arr, lo, j - 1, steps);
  sort(arr, j + 1, hi, steps);
};

export const quicksort = (arr: number[]) => {
  // shuffle(arr);
  const steps: any[] = [];
  sort(arr, 0, arr.length - 1, steps);
  return steps;
};
