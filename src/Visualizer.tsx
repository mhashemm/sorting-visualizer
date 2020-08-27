import React, { FC, useState, useRef } from "react";
import { mergeSortSteps } from "./algorithms/mergeSort";

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

  const mergeSortHandler = () => {
    const steps = mergeSortSteps(arr);
    const lines = linesRef.current!.children as any;
    steps.forEach(([lo, hi], index) => {
      const isColorChanged = index % 3 !== 2;
      if (isColorChanged) {
        const color = index % 3 === 0 ? CHANGED_COLOR : MAIN_COLOR;
        setTimeout(() => {
          lines[lo].style.backgroundColor = color;
          lines[hi].style.backgroundColor = color;
        }, index * speed);
      } else {
        setTimeout(() => {
          lines[lo].style.height = `${hi}px`;
        }, index * speed);
      }
    });
  };

  const speedHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.currentTarget.value);
    setSpeed(() => (+e.currentTarget.value < 1 ? 1 : +e.currentTarget.value));
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
          defaultValue={speed}
        />
        <button onClick={newArray}>Generate Array</button>
        <button onClick={mergeSortHandler}>Merge Sort</button>
      </div>
    </>
  );
};
