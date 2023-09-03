export class Node {
    constructor(vals: Partial<Node>) {
      Object.keys(vals).forEach((key) => {
        this[key] = vals[key];
      });
    }
  
    type: "val" | "add" | "sub" | "neg";
    val?: number;
    left?: Node;
    right?: Node;
  
    getVal: () => number;
  }
  
  export type NullableNode = Node | null;