import React, { FC, useState, useRef } from "react";
import { sleep } from "./sleep";
import { mergeSortSteps } from "./algorithms/mergeSort";
import { quicksort } from "./algorithms/quicksort";

export interface VisualizerProps {}

const randomInteger = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const generateArray = (size: number = 370, max: number = 800) => {
  const arr = Array(size);
  for (let i = 0; i < size; i++) {
    arr[i] = randomInteger(10, max);
  }
  return arr;
};

const MAIN_COLOR = "blueviolet";
const CHANGED_COLOR = "red";

export const Visualizer: FC<VisualizerProps> = (props) => {
  const [arr, setArr] = useState(generateArray());
  const [speed, setSpeed] = useState(1);
  const linesRef = useRef<HTMLDivElement>(null);

  const newArray = () => {
    setArr(generateArray());
  };

  const mergeSortHandler = async () => {
    const steps = mergeSortSteps(arr);
    const lines = linesRef.current!.children as any;
    for (let i = 0; i < steps.length; i++) {
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
  };

  const quickSortHandler = () => {
    setArr(quicksort(arr));
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
        />
        <button onClick={newArray}>Generate Array</button>
        <button onClick={mergeSortHandler}>MergeSort</button>
        <button onClick={quickSortHandler}>QuickSort</button>
      </div>
    </>
  );
};
