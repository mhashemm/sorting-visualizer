const sort = (
  arr: number[],
  aux: number[],
  lo: number,
  hi: number,
  steps: [number, number][]
) => {
  if (hi <= lo) return;
  const mid = Math.floor(lo + (hi - lo) / 2);
  sort(arr, aux, lo, mid, steps);
  sort(arr, aux, mid + 1, hi, steps);
  merge(arr, aux, lo, mid, hi, steps);
};

const merge = (
  arr: number[],
  aux: number[],
  lo: number,
  mid: number,
  hi: number,
  steps: [number, number][]
) => {
  for (let k = lo; k <= hi; k++) {
    aux[k] = arr[k];
  }
  let i = lo,
    j = mid + 1;
  for (let k = lo; k <= hi; k++) {
    if (i > mid) {
      steps.push([j, j]);
      steps.push([j, j]);
      steps.push([k, aux[j]]);
      ////////////////////////
      arr[k] = aux[j++];
    } else if (j > hi) {
      steps.push([i, i]);
      steps.push([i, i]);
      steps.push([k, aux[i]]);
      ////////////////////////
      arr[k] = aux[i++];
    } else if (aux[j] < aux[i]) {
      steps.push([i, j]);
      steps.push([i, j]);
      steps.push([k, aux[j]]);
      ////////////////////////
      arr[k] = aux[j++];
    } else {
      steps.push([i, j]);
      steps.push([i, j]);
      steps.push([k, aux[i]]);
      ////////////////////////
      arr[k] = aux[i++];
    }
  }
};

export const mergeSortSteps = (arr: number[]) => {
  const aux = [...arr];
  const steps: [number, number][] = [];
  sort(arr, aux, 0, arr.length - 1, steps);
  return steps;
};
