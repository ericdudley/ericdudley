import React from "react";
import { useBasicCalculatorStore } from "../../utils/basic-calculator/store";

export default function TextInput() {
  const { inputText, setInputText } = useBasicCalculatorStore();

  return (
    <div className="my-2 flex flex-col gap-0.5">
      <span>Formula Input</span>
      <input
        className="p-2"
        type="text"
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
      />
    </div>
  );
}
