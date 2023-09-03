import React from "react";
import { useBasicCalculatorStore } from "../../utils/basic-calculator/store";

export default function LexerView() {
  const tokens = useBasicCalculatorStore((state) => state.getTokens());

  return (
    <div className="flex flex-col gap-2 my-4">
      <div className="flex gap-1 flex-wrap">
        {tokens.map((token) => (
          <div className=" flex items-center justify-center p-2 bg-gray-500 text-white h-8 w-fit rounded-sm">
            {token}
          </div>
        ))}
      </div>
    </div>
  );
}
