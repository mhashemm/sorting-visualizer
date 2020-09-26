import React, { FC, useState, useRef } from 'react';
import { sleep } from './sleep';
import { MergeSort } from './algorithms/MergeSort';
import { QuickSort } from './algorithms/QuickSort';
import { HeapSort } from './algorithms/HeapSort';

export interface VisualizerProps {}

const MAIN_COLOR = 'black';
const COLOR = 'red';
const SWAP_COLOR = 'yellow';
const LINE_WIDTH = 10;

const randomInteger = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const generateArray = () => {
  const max = 800;
  const size = Math.floor((window.innerWidth - 40) / LINE_WIDTH);
  const arr = new Array<number>(size);
  for (let i = 0; i < size; i++) {
    arr[i] = randomInteger(10, max);
  }
  return arr;
};

export const Visualizer: FC<VisualizerProps> = (props) => {
  const [arr, setArr] = useState(generateArray());
  const [speed, setSpeed] = useState(10);
  const [isSorting, setIsSorting] = useState(false);
  const linesRef = useRef<HTMLDivElement>(null);

  const newArray = () => {
    setArr(generateArray());
  };

  const visualize = async (Sort: any) => {
    setIsSorting(true);
    const sort = new Sort(arr);
    const steps = sort.getSteps();
    const lines = linesRef.current!.children;
    const n = steps.length;
    for (let i = 0; i < n; i++) {
      const {
        role,
        indexes: [lo, hi],
      } = steps[i];

      const loEl = lines.item(lo) as HTMLDivElement;
      const hiEl = lines.item(hi) as HTMLDivElement;

      if (role === 'swap') {
        loEl.style.backgroundColor = SWAP_COLOR;
        hiEl.style.backgroundColor = SWAP_COLOR;
        const temp = loEl.style.height;
        loEl.style.height = hiEl.style.height;
        hiEl.style.height = temp;
      } else if (role === 'color') {
        loEl.style.backgroundColor = COLOR;
        hiEl.style.backgroundColor = COLOR;
      } else if (role === 'discolor') {
        loEl.style.backgroundColor = MAIN_COLOR;
        hiEl.style.backgroundColor = MAIN_COLOR;
      } else if (role === 'put') {
        loEl.style.backgroundColor = SWAP_COLOR;
        loEl.style.height = `${hi}px`;
      }

      await sleep(speed);
    }
    setArr(sort.getArr());
    setIsSorting(false);
  };

  const speedHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSpeed(+e.target.value < 1 ? 1 : +e.target.value);
  };

  return (
    <>
      <div ref={linesRef} className="container">
        {arr.map((el, i) => (
          <div
            key={i}
            className="line"
            style={{
              height: `${el}px`,
              backgroundColor: MAIN_COLOR,
              width: LINE_WIDTH,
            }}
          ></div>
        ))}
      </div>
      <div className="buttons">
        <label htmlFor="speed">Speed in MS</label>
        <input
          id="speed"
          name="speed"
          type="number"
          min="1"
          onChange={speedHandler}
          value={speed}
          disabled={isSorting}
        />
        <button onClick={newArray} disabled={isSorting}>
          Generate Array
        </button>
        <button onClick={() => visualize(MergeSort)} disabled={isSorting}>
          MergeSort
        </button>
        <button onClick={() => visualize(QuickSort)} disabled={isSorting}>
          QuickSort
        </button>
        <button onClick={() => visualize(HeapSort)} disabled={isSorting}>
          HeapSort
        </button>
      </div>
    </>
  );
};
