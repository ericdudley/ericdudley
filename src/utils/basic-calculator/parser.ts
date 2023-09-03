import { v4 as uuid } from "uuid";
import { OPERATIONS } from "./constants";
import { Lexer } from "./lexer";
import { Node, NullableNode } from "./node";

export class Parser {
  lexer: Lexer;

  constructor(lexer: Lexer) {
    this.lexer = lexer;
  }

  getNextNode(prevNode: NullableNode): NullableNode {
    const token = this.lexer.getNextToken();

    if (token == null) {
      return null;
    } else if (OPERATIONS.has(token)) {
      if (token === "+") {
        return new Node({
          type: "add",
          left: prevNode,
          right: this.getNextNode(null),
        });
      }

      if (token === "-") {
        if (prevNode) {
          return new Node({
            type: "sub",
            left: prevNode,
            right: this.getNextNode(null),
          });
        } else {
          return new Node({
            type: "neg",
            right: this.getNextNode(null),
          });
        }
      }
    } else {
      return new Node({
        type: "val",
        val: Number(token),
      });
    }
  }

  parse(prevNode: NullableNode): Node | null {
    const nextNode = this.getNextNode(prevNode);

    if (nextNode) {
      return this.parse(nextNode);
    } else {
      return prevNode;
    }
  }

  getTreeData(): TreeData {
    const root = this.parse(null);

    function getTree(node: NullableNode) {
      if (!node) {
        return null;
      }

      if (node.type === "val") {
        return {
          name: String(node.val),
          key: uuid(),
        };
      }

      if (node.type === "add") {
        return {
          name: "+",
          key: uuid(),
          children: [node.left, node.right]
            .map((child) => getTree(child))
            .filter((child) => !!child),
        };
      }

      if (node.type === "sub") {
        return {
          name: "-",
          key: uuid(),
          children: [node.left, node.right]
            .map((child) => getTree(child))
            .filter((child) => !!child),
        };
      }

      if (node.type === "neg") {
        return {
          name: "-1 *",
          key: uuid(),
          children: [node.right]
            .map((child) => getTree(child))
            .filter((child) => !!child),
        };
      }
    }

    return getTree(root);
  }
}
