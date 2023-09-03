import { DIGITS, OPERATIONS } from "./constants";

export class Lexer {
  tokens: string[];
  idx: number;

  constructor(inputText: string) {
    this.idx = 0;
    this.tokens = [];

    let i = 0;
    let currNum = "";

    while (i < inputText.length) {
      while (DIGITS.has(inputText[i])) {
        currNum += inputText[i];
        i += 1;
      }

      if (currNum.length > 0) {
        this.tokens.push(currNum);
        currNum = "";
      }

      if (OPERATIONS.has(inputText[i])) {
        this.tokens.push(inputText[i]);
      }

      i += 1;
    }
  }

  getNextToken() {
    if (this.idx === this.tokens.length) {
      return null;
    } else {
      const token = this.tokens[this.idx];
      this.idx += 1;
      return token;
    }
  }

  peekNextToken() {
    if (this.idx === this.tokens.length) {
      return null;
    } else {
      const token = this.tokens[this.idx];
      return token;
    }
  }

  hasNextToken() {
    return this.idx < this.tokens.length;
  }
}
