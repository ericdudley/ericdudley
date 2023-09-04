import { Parser } from './parser';
import { NullableNode } from './node';
import { formatNumber } from './constants';

export class Interpreter {
  parser: Parser;

  error?: string;

  constructor(parser: Parser) {
    this.parser = parser;
  }

  recursiveInterpret(root: NullableNode, steps: string[]): number {
    if (!root) {
      return 0;
    }

    let val: number;
    let step: string;

    switch (root.type) {
      case 'val': {
        val = root.val;
        break;
      }
      case 'neg': {
        const right = this.recursiveInterpret(root.right, steps);
        val = -1 * right;
        step = `-1 * ${formatNumber(right)}`;
        break;
      }
      case 'add': {
        const left = this.recursiveInterpret(root.left, steps);
        const right = this.recursiveInterpret(root.right, steps);
        val = left + right;
        step = `${formatNumber(left)} + ${formatNumber(right)}`;
        break;
      }
      case 'sub': {
        const left = this.recursiveInterpret(root.left, steps);
        const right = this.recursiveInterpret(root.right, steps);
        val = left - right;
        step = `${formatNumber(left)} - ${formatNumber(right)}`;
        break;
      }
      case 'par': {
        const right = this.recursiveInterpret(root.right, steps);
        val = right;
        break;
      }
      case 'mul': {
        const left = this.recursiveInterpret(root.left, steps);
        const right = this.recursiveInterpret(root.right, steps);
        val = left * right;
        step = `${formatNumber(left)} * ${formatNumber(right)}`;
        break;
      }
      case 'div': {
        const left = this.recursiveInterpret(root.left, steps);
        const right = this.recursiveInterpret(root.right, steps);
        val = left / right;
        step = `${formatNumber(left)} / ${formatNumber(right)}`;
        break;
      }
      default:
        this.error = `Unknown node type: ${root.type}`;
    }

    if (step) {
      steps.push(`${step} = ${formatNumber(val)}`);
    }
    return val;
  }

  interpret(): { steps: string[]; value: number; error?: string } {
    this.error = '';
    const steps = [];
    const { result } = this.parser.parse();
    const value = this.recursiveInterpret(result, steps);
    return {
      value,
      steps,
      error: this.error,
    };
  }
}
