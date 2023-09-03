import { create } from "zustand";
import { Interpreter } from "./interpreter";
import { Lexer } from "./lexer";
import { Parser } from "./parser";
import { EXAMPLE_FORMULA } from "./constants";

export const useBasicCalculatorStore = create<{
  inputText: string;
  setInputText: (newText: string) => void;
  getTokens: () => string[];
  getLexer: () => Lexer;
  getParser: () => Parser;
  getInterpreter: () => Interpreter;
  getTreeData: () => TreeData;
  getInterpretedValue: () => ReturnType<Interpreter["interpret"]>;
}>((set, get) => ({
  inputText: EXAMPLE_FORMULA,
  setInputText: (newText: string) => {
    set({
      inputText: newText,
    });
  },
  getLexer: () => new Lexer(get().inputText),
  getParser: () => new Parser(get().getLexer()),
  getInterpreter: () => new Interpreter(get().getParser()),
  getTreeData: () => get().getParser().getTreeData(),
  getInterpretedValue: () => get().getInterpreter().interpret(),
  getTokens: () => {
    const lexer = get().getLexer();

    const tokens = [];
    while (lexer.hasNextToken()) {
      tokens.push(lexer.getNextToken());
    }

    return tokens;
  },
}));
