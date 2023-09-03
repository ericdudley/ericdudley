import React from "react";
import "react-tree-graph/dist/style.css";
import { v4 as uuid } from "uuid";
import { useBasicCalculatorStore } from "../../utils/basic-calculator/store";

export default function InterpreterView() {
  const interpretedValue = useBasicCalculatorStore((state) =>
    state.getInterpretedValue()
  );

  return (
    <div className="min-h-[512px] w-full">
      <h1>Formula Value: {interpretedValue?.value ?? "Unknown"}</h1>
      <div>
        <h2>Step-by-step</h2>
        {(interpretedValue?.steps ?? []).map((step, idx) => (
          <h2 key={uuid()}>{step}</h2>
        ))}
      </div>
    </div>
  );
}
