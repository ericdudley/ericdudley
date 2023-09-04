import { v4 as uuid } from 'uuid';
import { OPERATIONS } from './constants';
import { Lexer } from './lexer';
import { Node, NullableNode } from './node';
import { TreeData } from './types';

/**
 * expression - addition or subtraction
 * term - multiplication or division
 * factor - constant or parantheses
 */
export class Parser {
  lexer: Lexer;

  error?: string;

  constructor(lexer: Lexer) {
    this.lexer = lexer;
  }

  parse(): { result?: NullableNode; error?: string } {
    this.error = '';
    try {
      const result = this.getExpression();

      return {
        result,
        error: this.error
          ? this.error
          : this.lexer.hasNextToken()
            ? 'Completed parsing, but did not read all tokens.'
            : undefined,
      };
    } catch (error) {
      return {
        error: error?.message ?? 'Unknown error',
      };
    }
  }

  getExpression(): NullableNode {
    let node = this.getTerm();

    while (
      node
      && (this.lexer.peekNextToken() === '+' || this.lexer.peekNextToken() === '-')
    ) {
      const token = this.lexer.getNextToken();

      node = new Node({
        type: token === '+' ? 'add' : 'sub',
        left: node,
        right: this.getTerm(),
      });
    }

    return node;
  }

  getTerm(): NullableNode {
    let node = this.getFactor();

    while (
      node
      && (this.lexer.peekNextToken() === '*' || this.lexer.peekNextToken() === '/')
    ) {
      const token = this.lexer.getNextToken();

      node = new Node({
        type: token === '*' ? 'mul' : 'div',
        left: node,
        right: this.getFactor(),
      });
    }

    return node;
  }

  getFactor(): NullableNode {
    const token = this.lexer.getNextToken();

    if (token == null) {
      return null;
    }
    if (token === '(') {
      const node = new Node({
        type: 'par',
        right: this.getExpression(),
      });

      if (this.lexer.peekNextToken() === ')') {
        this.lexer.getNextToken();
      } else {
        this.error = 'Missing close parentheses';
      }

      return node;
    }
    if (OPERATIONS.has(token)) {
      if (token === '-') {
        return new Node({
          type: 'neg',
          right: this.getFactor(),
        });
      }

      if (token === '+' || token === '*' || token === '/') {
        this.error = `Detached binary operator: ${token}`;
      }

      return null;
    }
    return new Node({
      type: 'val',
      val: Number(token),
    });
  }

  getTreeViewData(): { treeData?: TreeData; error?: string } {
    const parsed = this.parse();

    function getTree(node: NullableNode): TreeData {
      if (!node) {
        return null;
      }

      if (node.type === 'val') {
        return {
          name: String(node.val),
          key: uuid(),
        };
      }

      if (node.type === 'add') {
        return {
          name: '+',
          key: uuid(),
          children: [node.left, node.right]
            .map((child) => getTree(child))
            .filter((child) => !!child),
        };
      }

      if (node.type === 'sub') {
        return {
          name: '-',
          key: uuid(),
          children: [node.left, node.right]
            .map((child) => getTree(child))
            .filter((child) => !!child),
        };
      }

      if (node.type === 'mul') {
        return {
          name: '*',
          key: uuid(),
          children: [node.left, node.right]
            .map((child) => getTree(child))
            .filter((child) => !!child),
        };
      }

      if (node.type === 'div') {
        return {
          name: '/',
          key: uuid(),
          children: [node.left, node.right]
            .map((child) => getTree(child))
            .filter((child) => !!child),
        };
      }

      if (node.type === 'neg') {
        return {
          name: '-1 *',
          key: uuid(),
          children: [node.right]
            .map((child) => getTree(child))
            .filter((child) => !!child),
        };
      }

      if (node.type === 'par') {
        return {
          name: '()',
          key: uuid(),
          children: [node.right]
            .map((child) => getTree(child))
            .filter((child) => !!child),
        };
      }

      return null;
    }

    return { treeData: getTree(parsed.result), error: parsed.error };
  }
}
