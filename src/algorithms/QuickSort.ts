import { Sort } from './Sort';

export class QuickSort extends Sort {
  constructor(arr: number[]) {
    super(arr);
    if (!this.isSorted()) {
      this.sort(0, this.n - 1);
    }
  }

  private partition(lo: number, hi: number) {
    this.steps.push({ role: 'color', indexes: [lo, lo] });
    let i = lo,
      j = hi + 1;
    const v = this.arr[lo];
    while (true) {
      while (this.less(this.arr[++i], v)) if (i === hi) break;
      while (this.less(v, this.arr[--j])) if (j === lo) break;
      if (i >= j) break;
      this.swap(i, j);
    }
    this.swap(lo, j);

    return j;
  }

  private sort(lo: number, hi: number) {
    if (hi <= lo) return;
    const j = this.partition(lo, hi);
    this.sort(lo, j - 1);
    this.sort(j + 1, hi);
  }
}
