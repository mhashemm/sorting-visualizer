import React, { FC, useState, useRef } from "react";
import { sleep } from "./sleep";
import { mergeSortSteps } from "./algorithms/mergeSort";
import { quicksort } from "./algorithms/quicksort";

export interface VisualizerProps {}

const MAIN_COLOR = "black";
const CHANGED_COLOR = "red";
const SECOND_CHANGED_COLOR = "yellow";
const LINE_WIDTH = 1;

const randomInteger = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const generateArray = () => {
  const max = 800;
  const size = Math.floor((window.innerWidth - 40) / LINE_WIDTH);
  const arr = Array(size);
  for (let i = 0; i < size; i++) {
    arr[i] = randomInteger(10, max);
  }
  return arr;
};

export const Visualizer: FC<VisualizerProps> = (props) => {
  const [arr, setArr] = useState(generateArray());
  const [speed, setSpeed] = useState(1);
  const [isSorting, setIsSorting] = useState(false);
  const linesRef = useRef<HTMLDivElement>(null);

  const newArray = () => {
    setArr(generateArray());
  };

  const mergeSortHandler = async () => {
    setIsSorting(true);
    const steps = mergeSortSteps([...arr]);
    const lines = linesRef.current!.children as any;
    const n = steps.length;
    for (let i = 0; i < n; i++) {
      const [lo, hi] = steps[i];
      const isColorChanged = i % 3 !== 2;
      if (isColorChanged) {
        const color = i % 3 === 0 ? CHANGED_COLOR : MAIN_COLOR;
        lines[lo].style.backgroundColor = color;
        lines[hi].style.backgroundColor = color;
      } else {
        lines[lo].style.height = `${hi}px`;
      }
      await sleep(speed);
    }
    setIsSorting(false);
  };

  const quickSortHandler = async () => {
    const steps = quicksort(arr);
    const lines = linesRef.current!.children as any;
    const n = steps.length;
    for (let i = 0; i < n; i++) {
      const {
        role,
        indexs: [lo, hi],
      } = steps[i];

      if (role === "swap") {
        lines[lo].style.backgroundColor = SECOND_CHANGED_COLOR;
        lines[hi].style.backgroundColor = SECOND_CHANGED_COLOR;
        const temp = lines[lo].style.height;
        lines[lo].style.height = lines[hi].style.height;
        lines[hi].style.height = temp;
        await sleep(speed);
        lines[lo].style.backgroundColor = MAIN_COLOR;
        lines[hi].style.backgroundColor = MAIN_COLOR;
      } else if (role === "color") {
        lines[lo].style.backgroundColor = CHANGED_COLOR;
        lines[hi].style.backgroundColor = CHANGED_COLOR;
      } else if (role === "discolor") {
        lines[lo].style.backgroundColor = MAIN_COLOR;
        lines[hi].style.backgroundColor = MAIN_COLOR;
      }
      // await sleep(speed);
    }
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
        <label htmlFor="speed">Speed</label>
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
        <button onClick={mergeSortHandler} disabled={isSorting}>
          MergeSort
        </button>
        <button onClick={quickSortHandler} disabled={isSorting}>
          QuickSort
        </button>
      </div>
    </>
  );
};
