import { useColorMode } from '@docusaurus/theme-common';
import React from 'react';
import { AnimatedTree } from 'react-tree-graph';
import 'react-tree-graph/dist/style.css';
import AutoSizer from 'react-virtualized-auto-sizer';
import { useBasicCalculatorStore } from '../../utils/basic-calculator/store';

import StatusText from './StatusText';

export default function ParserView() {
  const { treeData, error } = useBasicCalculatorStore((state) => state.getTreeViewData());
  const { isDarkTheme } = useColorMode();

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
                style: {
                  fontSize: '2em',
                  transform: 'translate(-15px, 4px)',
                  ...(isDarkTheme
                    ? {
                      stroke: 'white',
                      fill: 'white',
                    }
                    : {
                      stroke: 'black',
                      fill: 'black',
                    }),
                },
              }}
              gProps={{
                style: {
                  fill: 'transparent',
                  stroke: 'transparent',
                },
              }}
              pathProps={{
                style: {
                  ...(isDarkTheme
                    ? {
                      stroke: '#666666',
                      fill: '#222222',
                    }
                    : {
                      stroke: '#cccccc',
                      fill: '#eeeeee',
                    }),
                },
              }}
            />
          )}
        </AutoSizer>
      )}
    </div>
  );
}
