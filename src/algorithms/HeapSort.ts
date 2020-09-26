import { Sort } from './Sort';

export class HeapSort extends Sort {
  constructor(arr: number[]) {
    super(arr);
    if (!this.isSorted()) {
      this.sort();
    }
  }

  private sort() {
    for (let k = Math.floor(this.n / 2); k >= 1; k--) {
      this.sink(k, this.n);
    }
    let k = this.n;
    while (k > 1) {
      this.swap(0, k - 1);
      k--;
      this.sink(1, k);
    }
  }

  private sink(k: number, n: number) {
    while (2 * k <= n) {
      let j = 2 * k;
      if (j < n && this.less(this.arr[j - 1], this.arr[j])) j++;
      if (!this.less(this.arr[k - 1], this.arr[j - 1])) break;
      this.swap(k - 1, j - 1);
      k = j;
    }
  }
}
