import { Sort } from './Sort';

export class MergeSort extends Sort {
  private aux: number[];

  constructor(arr: number[]) {
    super(arr);
    this.aux = new Array<number>(this.n);
    if (!this.isSorted()) {
      this.sort(0, this.n - 1);
    }
  }

  private sort(lo: number, hi: number) {
    if (hi <= lo) return;
    const mid = Math.floor(lo + (hi - lo) / 2);
    this.sort(lo, mid);
    this.sort(mid + 1, hi);
    this.merge(lo, mid, hi);
  }

  private merge(lo: number, mid: number, hi: number) {
    for (let k = lo; k <= hi; k++) {
      this.aux[k] = this.arr[k];
    }

    let i = lo,
      j = mid + 1;

    for (let k = lo; k <= hi; k++) {
      if (i > mid) {
        this.steps.push({ role: 'color', indexes: [j, j] });
        this.steps.push({ role: 'discolor', indexes: [j, j] });
        this.steps.push({ role: 'put', indexes: [k, this.aux[j]] });
        ////////////////////////
        this.arr[k] = this.aux[j++];
      } else if (j > hi) {
        this.steps.push({ role: 'color', indexes: [i, i] });
        this.steps.push({ role: 'discolor', indexes: [i, i] });
        this.steps.push({ role: 'put', indexes: [k, this.aux[i]] });
        ////////////////////////
        this.arr[k] = this.aux[i++];
      } else if (this.less(this.aux[j], this.aux[i])) {
        this.steps.push({ role: 'color', indexes: [i, j] });
        this.steps.push({ role: 'discolor', indexes: [i, j] });
        this.steps.push({ role: 'put', indexes: [k, this.aux[j]] });
        ////////////////////////
        this.arr[k] = this.aux[j++];
      } else {
        this.steps.push({ role: 'color', indexes: [i, j] });
        this.steps.push({ role: 'discolor', indexes: [i, j] });
        this.steps.push({ role: 'put', indexes: [k, this.aux[i]] });
        ////////////////////////
        this.arr[k] = this.aux[i++];
      }
    }
  }
}
