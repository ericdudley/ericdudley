import React from "react";
import { AnimatedTree } from "react-tree-graph";
import "react-tree-graph/dist/style.css";
import styles from "./ParserView.module.css";
import { useBasicCalculatorStore } from "../../utils/basic-calculator/store";

import AutoSizer from "react-virtualized-auto-sizer";
export default function ParserView() {
  const treeData = useBasicCalculatorStore((state) => state.getTreeData());

  console.log(treeData);

  return (
    <div className="min-h-[512px] w-full">
      {/* <ReactFlow nodes={initialNodes} edges={initialEdges} /> */}
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
