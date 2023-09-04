import { create } from 'zustand';
import { Interpreter } from './interpreter';
import { Lexer } from './lexer';
import { Parser } from './parser';
import { EXAMPLE_FORMULA } from './constants';

export const useBasicCalculatorStore = create<{
  inputText: string;
  /* eslint-disable-next-line no-unused-vars */
  setInputText:(newText: string) => void;
  getTokens: () => { tokens: string[]; isValid: boolean };
  getLexer: () => Lexer;
  getParser: () => Parser;
  getInterpreter: () => Interpreter;
  getTreeViewData: () => ReturnType<Parser['getTreeViewData']>;
  getInterpretedValue: () => ReturnType<Interpreter['interpret']>;
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
      getTreeViewData: () => get().getParser().getTreeViewData(),
      getInterpretedValue: () => get().getInterpreter().interpret(),
      getTokens: () => {
        const lexer = get().getLexer();

        const tokens = [];
        while (lexer.hasNextToken()) {
          tokens.push(lexer.getNextToken());
        }

        return { tokens, isValid: lexer.isValid() };
      },
    }));
