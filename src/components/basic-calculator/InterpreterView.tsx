import React from 'react';
import 'react-tree-graph/dist/style.css';
import { v4 as uuid } from 'uuid';
import { formatNumber } from '@site/src/utils/basic-calculator/constants';
import { useBasicCalculatorStore } from '../../utils/basic-calculator/store';
import StatusText from './StatusText';

export default function InterpreterView() {
  const interpretedValue = useBasicCalculatorStore((state) => state.getInterpretedValue());

  return (
    <div className="min-h-[256px] w-full">
      <StatusText
        action="Interpretation"
        status={interpretedValue?.error ? 'failure' : 'success'}
        error={interpretedValue?.error}
      />
      <h1>Result: {formatNumber(interpretedValue?.value) ?? 'Unknown'}</h1>
      <div>
        <h2>Step-by-step</h2>
        {(interpretedValue?.steps ?? []).map((step) => (
          <h2 key={uuid()}>{step}</h2>
        ))}
      </div>
    </div>
  );
}
