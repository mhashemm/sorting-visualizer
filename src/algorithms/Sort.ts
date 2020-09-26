interface ISteps {
  role: 'swap' | 'color' | 'discolor' | 'put';
  indexes: [number, number];
}

export abstract class Sort {
  protected arr: number[];
  protected n: number;
  protected steps: ISteps[];

  constructor(arr: number[]) {
    this.arr = [...arr];
    this.n = arr.length;
    this.steps = [];
  }

  protected isSorted() {
    for (let i = 1; i < this.n; i++) {
      if (this.less(this.arr[i], this.arr[i - 1])) return false;
    }
    return true;
  }

  protected swap(i: number, j: number) {
    this.steps.push({ role: 'swap', indexes: [i, j] });
    this.steps.push({ role: 'discolor', indexes: [i, j] });
    const temp = this.arr[i];
    this.arr[i] = this.arr[j];
    this.arr[j] = temp;
  }

  protected less(v: number, w: number) {
    return v < w;
  }

  public getArr() {
    return this.arr;
  }

  public getSteps() {
    return this.steps;
  }
}
