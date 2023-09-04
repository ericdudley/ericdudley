import React from 'react';
import { AnimatedTree } from 'react-tree-graph';
import 'react-tree-graph/dist/style.css';
import AutoSizer from 'react-virtualized-auto-sizer';
import styles from './ParserView.module.css';
import { useBasicCalculatorStore } from '../../utils/basic-calculator/store';

import StatusText from './StatusText';

export default function ParserView() {
  const { treeData, error } = useBasicCalculatorStore((state) => state.getTreeViewData());

  return (
    <div className="min-h-[50vh] w-full">
      <StatusText
        action="Parse"
        status={error ? 'failure' : 'success'}
        error={error}
      />
      {treeData && (
        <AutoSizer>
          {({ width, height }) => (
            <AnimatedTree
              width={width}
              height={height}
              data={treeData}
              keyProp="key"
              textProps={{
                className: styles.text,
              }}
              gProps={{
                className: styles.node,
              }}
              pathProps={{
                className: styles.path,
              }}
            />
          )}
        </AutoSizer>
      )}
    </div>
  );
}
