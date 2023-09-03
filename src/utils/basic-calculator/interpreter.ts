import { Parser } from "./parser";
import { NullableNode } from "./node";

export class Interpreter {
  parser: Parser;

  constructor(parser: Parser) {
    this.parser = parser;
  }

  _interpret(root: NullableNode, steps: string[]): number {
    if (!root) {
      return 0;
    }

    let val: number;
    let step: string;

    switch (root.type) {
      case "val": {
        val = root.val;
        break;
      }
      case "neg": {
        const right = this._interpret(root.right, steps);
        val = -1 * right;
        step = `-1 * ${right}`;
        break;
      }
      case "add": {
        const left = this._interpret(root.left, steps);
        const right = this._interpret(root.right, steps);
        val = left + right;
        step = `${left} + ${right}`;
        break;
      }
      case "sub": {
        const left = this._interpret(root.left, steps);
        const right = this._interpret(root.right, steps);
        val = left - right;
        step = `${left} - ${right}`;
        break;
      }
      default:
        throw new Error(`Unknown node type ${root.type}`);
    }

    if (step) {
      steps.push(`${step} = ${val}`);
    }
    return val;
  }

  interpret(): { steps: string[]; value: number } {
    const steps = [];
    const value = this._interpret(this.parser.parse(null), steps);
    return {
      value,
      steps,
    };
  }
}
