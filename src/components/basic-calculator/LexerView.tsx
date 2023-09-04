import React from 'react';
import { useBasicCalculatorStore } from '../../utils/basic-calculator/store';
import StatusText from './StatusText';

export default function LexerView() {
  const { tokens, isValid } = useBasicCalculatorStore((state) => state.getTokens());

  return (
    <div className="flex flex-col gap-2 mb-4">
      <StatusText
        action="Lex"
        status={isValid ? 'success' : 'failure'}
        error={
          !isValid
          && 'Input contains symbols that are not part of a valid token'
        }
      />
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
