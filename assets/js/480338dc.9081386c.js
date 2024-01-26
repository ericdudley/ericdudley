"use strict";(self.webpackChunkericdudley=self.webpackChunkericdudley||[]).push([[2851],{9538:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>$,contentTitle:()=>A,default:()=>V,frontMatter:()=>P,metadata:()=>D,toc:()=>S});var r=n(9454),a=n(8646),i=n(1283),l=n(2526);function o(e){const{children:t,title:n="Collapse"}=e;return a.createElement(l.Z,null,a.createElement("summary",{mdxType:"summary"},n),t)}var s=n(7820);const p=new Set(["+","-","*","/","(",")"]),u=new Set(["1","2","3","4","5","6","7","8","9","0"]),h=4;function m(e){return null!=e?parseFloat(e.toFixed(h)).toString():""}class c{constructor(e){this.parser=e}recursiveInterpret(e,t){if(!e)return 0;let n,r;switch(e.type){case"val":n=e.val;break;case"neg":{const a=this.recursiveInterpret(e.right,t);n=-1*a,r=`-1 * ${m(a)}`;break}case"add":{const a=this.recursiveInterpret(e.left,t),i=this.recursiveInterpret(e.right,t);n=a+i,r=`${m(a)} + ${m(i)}`;break}case"sub":{const a=this.recursiveInterpret(e.left,t),i=this.recursiveInterpret(e.right,t);n=a-i,r=`${m(a)} - ${m(i)}`;break}case"par":n=this.recursiveInterpret(e.right,t);break;case"mul":{const a=this.recursiveInterpret(e.left,t),i=this.recursiveInterpret(e.right,t);n=a*i,r=`${m(a)} * ${m(i)}`;break}case"div":{const a=this.recursiveInterpret(e.left,t),i=this.recursiveInterpret(e.right,t);n=a/i,r=`${m(a)} / ${m(i)}`;break}default:this.error=`Unknown node type: ${e.type}`}return r&&t.push(`${r} = ${m(n)}`),n}interpret(){this.error="";const e=[],{result:t}=this.parser.parse();return{value:this.recursiveInterpret(t,e),steps:e,error:this.error}}}class d{constructor(e){this.inputText=e,this.idx=0,this.tokens=[];let t=0,n="";for(;t<e.length;){for(;u.has(e[t]);)n+=e[t],t+=1;n.length>0&&(this.tokens.push(n),n=""),p.has(e[t])&&this.tokens.push(e[t]),t+=1}}getNextToken(){if(this.idx===this.tokens.length)return null;const e=this.tokens[this.idx];return this.idx+=1,e}peekNextToken(){if(this.idx===this.tokens.length)return null;return this.tokens[this.idx]}hasNextToken(){return this.idx<this.tokens.length}isValid(){return Array.from(this.inputText).every((e=>u.has(e)||p.has(e)||" "===e))}}var k=n(8734);class g{constructor(e){Object.keys(e).forEach((t=>{this[t]=e[t]}))}}class N{constructor(e){this.lexer=e}parse(){this.error="";try{return{result:this.getExpression(),error:this.error?this.error:this.lexer.hasNextToken()?"Completed parsing, but did not read all tokens.":void 0}}catch(e){return{error:e?.message??"Unknown error"}}}getExpression(){let e=this.getTerm();for(;e&&("+"===this.lexer.peekNextToken()||"-"===this.lexer.peekNextToken());){const t=this.lexer.getNextToken();e=new g({type:"+"===t?"add":"sub",left:e,right:this.getTerm()})}return e}getTerm(){let e=this.getFactor();for(;e&&("*"===this.lexer.peekNextToken()||"/"===this.lexer.peekNextToken());){const t=this.lexer.getNextToken();e=new g({type:"*"===t?"mul":"div",left:e,right:this.getFactor()})}return e}getFactor(){const e=this.lexer.getNextToken();if(null==e)return null;if("("===e){const e=new g({type:"par",right:this.getExpression()});return")"===this.lexer.peekNextToken()?this.lexer.getNextToken():this.error="Missing close parentheses",e}return p.has(e)?"-"===e?new g({type:"neg",right:this.getFactor()}):("+"!==e&&"*"!==e&&"/"!==e||(this.error=`Detached binary operator: ${e}`),null):new g({type:"val",val:Number(e)})}getTreeViewData(){const e=this.parse();return{treeData:function e(t){return t?"val"===t.type?{name:String(t.val),key:(0,k.Z)()}:"add"===t.type?{name:"+",key:(0,k.Z)(),children:[t.left,t.right].map((t=>e(t))).filter((e=>!!e))}:"sub"===t.type?{name:"-",key:(0,k.Z)(),children:[t.left,t.right].map((t=>e(t))).filter((e=>!!e))}:"mul"===t.type?{name:"*",key:(0,k.Z)(),children:[t.left,t.right].map((t=>e(t))).filter((e=>!!e))}:"div"===t.type?{name:"/",key:(0,k.Z)(),children:[t.left,t.right].map((t=>e(t))).filter((e=>!!e))}:"neg"===t.type?{name:"-1 *",key:(0,k.Z)(),children:[t.right].map((t=>e(t))).filter((e=>!!e))}:"par"===t.type?{name:"()",key:(0,k.Z)(),children:[t.right].map((t=>e(t))).filter((e=>!!e))}:null:null}(e.result),error:e.error}}}const f=(0,s.Ue)(((e,t)=>({inputText:"-3 * (10 + 4 / 2)",setInputText:t=>{e({inputText:t})},getLexer:()=>new d(t().inputText),getParser:()=>new N(t().getLexer()),getInterpreter:()=>new c(t().getParser()),getTreeViewData:()=>t().getParser().getTreeViewData(),getInterpretedValue:()=>t().getInterpreter().interpret(),getTokens:()=>{const e=t().getLexer(),n=[];for(;e.hasNextToken();)n.push(e.getNextToken());return{tokens:n,isValid:e.isValid()}}})));var x=n(5580);function b(e){let{action:t,status:n,error:r}=e;return a.createElement("div",{className:"mb-4"},"success"===n?a.createElement("div",{className:"flex items-center gap-1"},a.createElement(x.FJM,{className:"text-green-700"}),a.createElement("p",{className:"mb-0"},t," successful")):a.createElement("div",{className:"flex items-center gap-4"},a.createElement("div",{className:"flex items-center gap-1"},a.createElement(x.a4m,{className:"text-red-400"}),a.createElement("p",{className:"text-red-400 text-lg mb-0"},t," error")),r&&a.createElement("p",{className:"text-gray-500 text-sm mb-0"},r)))}function v(){const{tokens:e,isValid:t}=f((e=>e.getTokens()));return a.createElement("div",{className:"flex flex-col gap-2 mb-4"},a.createElement(b,{action:"Lex",status:t?"success":"failure",error:!t&&"Input contains symbols that are not part of a valid token"}),a.createElement("div",{className:"flex gap-1 flex-wrap"},e.map((e=>a.createElement("div",{className:" flex items-center justify-center p-2 bg-gray-500 text-white h-8 w-fit rounded-sm"},e)))))}function y(){const{inputText:e,setInputText:t}=f();return a.createElement("div",{className:"my-2 flex flex-col gap-0.5"},a.createElement("span",{className:"flex items-center gap-2"},a.createElement(x.eAi,null)," Expression Input"),a.createElement("input",{className:"p-2",type:"text",value:e,onChange:e=>t(e.target.value)}))}var w=n(9583),T=n(1932),C=n(8051);function I(){const{treeData:e,error:t}=f((e=>e.getTreeViewData())),{isDarkTheme:n}=(0,w.I)();return a.createElement("div",{className:"min-h-[50vh] w-full"},a.createElement(b,{action:"Parse",status:t?"failure":"success",error:t}),e&&a.createElement(C.ZP,null,(t=>{let{width:r,height:i}=t;return a.createElement(T.Z,{width:r,height:i,data:e,keyProp:"key",textProps:{style:{fontSize:"2em",transform:"translate(-15px, 4px)",...n?{stroke:"white",fill:"white"}:{stroke:"black",fill:"black"}}},gProps:{style:{fill:"transparent",stroke:"transparent"}},pathProps:{style:{...n?{stroke:"#666666",fill:"#222222"}:{stroke:"#cccccc",fill:"#eeeeee"}}}})})))}function E(){const e=f((e=>e.getInterpretedValue()));return a.createElement("div",{className:"min-h-[256px] w-full"},a.createElement(b,{action:"Interpretation",status:e?.error?"failure":"success",error:e?.error}),a.createElement("h1",null,"Result: ",m(e?.value)??"Unknown"),a.createElement("div",null,a.createElement("h2",null,"Step-by-step"),(e?.steps??[]).map((e=>a.createElement("h2",{key:(0,k.Z)()},e)))))}const P={slug:"calculator-interpreter",title:"Implementing a calculator interpreter",authors:"me",tags:["software development","mathematics","puzzles","leetcode"]},A=void 0,D={permalink:"/blog/calculator-interpreter",source:"@site/blog/2023-09-03-basic-calculator.mdx",title:"Implementing a calculator interpreter",description:"Today, I'll be covering how to implement a calculator interpreter (i.e. evaluating 1 + 2 * 3 as 7). First we'll cover the overall concept, and then we'll dive into the details of how to implement it.",date:"2023-09-03T00:00:00.000Z",formattedDate:"September 3, 2023",tags:[{label:"software development",permalink:"/blog/tags/software-development"},{label:"mathematics",permalink:"/blog/tags/mathematics"},{label:"puzzles",permalink:"/blog/tags/puzzles"},{label:"leetcode",permalink:"/blog/tags/leetcode"}],readingTime:12.11,hasTruncateMarker:!0,authors:[{name:"Eric Dudley",title:"Software Engineer",url:"https://www.linkedin.com/in/eric-dudley-894721106",imageURL:"https://github.com/ericdudley.png",key:"me"}],frontMatter:{slug:"calculator-interpreter",title:"Implementing a calculator interpreter",authors:"me",tags:["software development","mathematics","puzzles","leetcode"]},nextItem:{title:"Visualizing The 100 Prisoners Problem",permalink:"/blog/100-prisoners-problem"}},$={authorsImageUrls:[void 0]},S=[{value:"Problem Statement",id:"problem-statement",level:2},{value:"How should I approach the solution?",id:"how-should-i-approach-the-solution",level:2},{value:"Language Parsing",id:"language-parsing",level:3},{value:"How do I implement the solution?",id:"how-do-i-implement-the-solution",level:2},{value:"Lexer",id:"lexer",level:3},{value:"Parser",id:"parser",level:3},{value:"Understanding the Parser",id:"understanding-the-parser",level:4},{value:"Core Concepts",id:"core-concepts",level:5},{value:"Enforcing Order of Operations:",id:"enforcing-order-of-operations",level:5},{value:"Error Handling",id:"error-handling",level:5},{value:"Interpreter",id:"interpreter",level:3},{value:"Conclusion",id:"conclusion",level:2}],q={toc:S},L="wrapper";function V(e){let{components:t,...n}=e;return(0,i.kt)(L,(0,r.Z)({},q,n,{components:t,mdxType:"MDXLayout"}),(0,i.kt)("p",null,"Today, I'll be covering how to implement a calculator interpreter (i.e. evaluating ",(0,i.kt)("inlineCode",{parentName:"p"},"1 + 2 * 3")," as ",(0,i.kt)("inlineCode",{parentName:"p"},"7"),"). First we'll cover the overall concept, and then we'll dive into the details of how to implement it."),(0,i.kt)("blockquote",null,(0,i.kt)("h4",{parentName:"blockquote",id:"this-post-has-interactive-components-demonstrating-the-concepts-make-sure-to-try-them-out-by-modifying-the-expressions-in-the-input-boxes-with-the-mouse-pointer-icons"},"This post has interactive components demonstrating the concepts, make sure to try them out by modifying the expressions in the input boxes with the mouse pointer icons!")),(0,i.kt)("h2",{id:"problem-statement"},"Problem Statement"),(0,i.kt)("blockquote",null,(0,i.kt)("p",{parentName:"blockquote"},"Given a string ",(0,i.kt)("inlineCode",{parentName:"p"},"s")," representing a valid expression, implement a calculator interpreter to evaluate it, and return the result of the evaluation.")),(0,i.kt)("blockquote",null,(0,i.kt)("p",{parentName:"blockquote"},(0,i.kt)("strong",{parentName:"p"},"Example 1:")),(0,i.kt)("pre",{parentName:"blockquote"},(0,i.kt)("code",{parentName:"pre"},'Input: s = "1 + 1"\nOutput: 2\n'))),(0,i.kt)("blockquote",null,(0,i.kt)("p",{parentName:"blockquote"},(0,i.kt)("strong",{parentName:"p"},"Example 2:")),(0,i.kt)("pre",{parentName:"blockquote"},(0,i.kt)("code",{parentName:"pre"},'Input: s = " 2 - 1 + 2 "\nOutput: 3\n'))),(0,i.kt)("blockquote",null,(0,i.kt)("p",{parentName:"blockquote"},(0,i.kt)("strong",{parentName:"p"},"Example 3:")),(0,i.kt)("pre",{parentName:"blockquote"},(0,i.kt)("code",{parentName:"pre"},'Input: s = "1 + 2 * 3"\nOutput: 7\n'))),(0,i.kt)("blockquote",null,(0,i.kt)("p",{parentName:"blockquote"},(0,i.kt)("strong",{parentName:"p"},"Example 4:")),(0,i.kt)("pre",{parentName:"blockquote"},(0,i.kt)("code",{parentName:"pre"},'Input: s = "(1 + 2 * 3) * 2"\nOutput: 14\n'))),(0,i.kt)("p",null,"The provided expression can contain the following:"),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},"Addition ",(0,i.kt)("inlineCode",{parentName:"li"},"+")),(0,i.kt)("li",{parentName:"ul"},"Subtraction ",(0,i.kt)("inlineCode",{parentName:"li"},"-")),(0,i.kt)("li",{parentName:"ul"},"Multiplication ",(0,i.kt)("inlineCode",{parentName:"li"},"*")),(0,i.kt)("li",{parentName:"ul"},"Division ",(0,i.kt)("inlineCode",{parentName:"li"},"/")),(0,i.kt)("li",{parentName:"ul"},"Negation ",(0,i.kt)("inlineCode",{parentName:"li"},"-")," (unary)"),(0,i.kt)("li",{parentName:"ul"},"Parentheses ",(0,i.kt)("inlineCode",{parentName:"li"},"(")," and ",(0,i.kt)("inlineCode",{parentName:"li"},")")),(0,i.kt)("li",{parentName:"ul"},"Whitespace ",(0,i.kt)("inlineCode",{parentName:"li"}," ")),(0,i.kt)("li",{parentName:"ul"},"Integers ",(0,i.kt)("inlineCode",{parentName:"li"},"0-MAX_INT"))),(0,i.kt)("h2",{id:"how-should-i-approach-the-solution"},"How should I approach the solution?"),(0,i.kt)("p",null,"One way to approach this problem is to utilize a stack (or set of stacks) to keep track of the current state of the expression. We can then iterate through the expression, and push/pop values from the stack as we encounter them. This approach is fairly simple, but it can be difficult to debug and extend."),(0,i.kt)("p",null,"Another approach is to use a more formalized approach composed of three modules commonly used in ",(0,i.kt)("a",{parentName:"p",href:"https://en.wikipedia.org/wiki/Parsing"},"computer language parsing"),"."),(0,i.kt)("h3",{id:"language-parsing"},"Language Parsing"),(0,i.kt)("p",null,"We will break the problem down into three sub-problems:"),(0,i.kt)("table",null,(0,i.kt)("thead",{parentName:"table"},(0,i.kt)("tr",{parentName:"thead"},(0,i.kt)("th",{parentName:"tr",align:null},"Sub-Problem"),(0,i.kt)("th",{parentName:"tr",align:null},"Module"),(0,i.kt)("th",{parentName:"tr",align:null},"Description"))),(0,i.kt)("tbody",{parentName:"table"},(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:null},"Lexical Analysis"),(0,i.kt)("td",{parentName:"tr",align:null},"Lexer"),(0,i.kt)("td",{parentName:"tr",align:null},"Convert the input string into a list of tokens.")),(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:null},"Syntactic Analysis"),(0,i.kt)("td",{parentName:"tr",align:null},"Parser"),(0,i.kt)("td",{parentName:"tr",align:null},"Converts the list of tokens into a syntax tree.")),(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:null},"Evaluation"),(0,i.kt)("td",{parentName:"tr",align:null},"Interpreter"),(0,i.kt)("td",{parentName:"tr",align:null},"Evaluate the syntax tree, and return the result.")))),(0,i.kt)(o,{title:"What are tokens and syntax trees?",mdxType:"Collapse"},(0,i.kt)("p",null,"What is a token?"),(0,i.kt)("blockquote",null,(0,i.kt)("p",{parentName:"blockquote"},"A token is the smallest element of a program that is meaningful in syntactic analysis. In the case of a calculator, a token can be a number, an operation, or a parenthesis. Notice that a token is not necessarily a single character, it can be a sequence of characters, like a number composed of multiple digits.")),(0,i.kt)("p",null,"What is a syntax tree?"),(0,i.kt)("blockquote",null,(0,i.kt)("p",{parentName:"blockquote"},"A syntax tree is a representation of the tokens (although not every token must be represented in the tree) that captures the meaning of the expression. This tree encodes the relationship of symbols in the expression such that the interpreter can correctly evaluate the result of the expression. In the case of a calculator, the syntax tree will be a tree, where each node is an operation, and each leaf node is a number."))),(0,i.kt)("p",null,"Applied to this problem:"),(0,i.kt)("mermaid",{value:'graph LR\nA[1 + 12] --\x3e B[Lexer]\nB --\x3e C["[1, +, 12]"]\nC --\x3e D[Parser]\n\nsubgraph Syntax Tree\nE["+"]\nE --\x3e F["1"]\nE --\x3e G["12"]\nend\n\nD --\x3e E\nE --\x3e H[Interpreter]\nH --\x3e I[13]\n'}),(0,i.kt)("p",null,"By breaking the problem down into these sub-problems, we can implement and test in a more iterative fashion before assembling the final solution."),(0,i.kt)("h2",{id:"how-do-i-implement-the-solution"},"How do I implement the solution?"),(0,i.kt)("p",null,"Let's get coding! We'll start with the lexer."),(0,i.kt)("h3",{id:"lexer"},"Lexer"),(0,i.kt)("p",null,"The lexer for this problem is fairly simple. For each character in our input string, we will do the following:"),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},"If a valid operation character, add as a token."),(0,i.kt)("li",{parentName:"ul"},"If a digit, concatenate the digits until the next non-digit character, and add as a token."),(0,i.kt)("li",{parentName:"ul"},"All other characters (invalid operations or whitespace) will be ignored.")),(0,i.kt)("p",null,"We will report an error if the input string contains any characters outside of the valid character set."),(0,i.kt)(o,{title:"View code",mdxType:"Collapse"},(0,i.kt)("p",null,(0,i.kt)("a",{parentName:"p",href:"https://github.com/ericdudley/ericdudley/blob/main/src/utils/basic-calculator/lexer.ts"},"View in GitHub")),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-ts"},'export class Lexer {\n  inputText: string;\n  tokens: string[];\n  idx: number;\n\n  constructor(inputText: string) {\n    this.inputText = inputText;\n    this.idx = 0;\n    this.tokens = [];\n\n    let i = 0;\n    let currNum = "";\n\n    while (i < inputText.length) {\n      while (DIGITS.has(inputText[i])) {\n        currNum += inputText[i];\n        i += 1;\n      }\n\n      if (currNum.length > 0) {\n        this.tokens.push(currNum);\n        currNum = "";\n      }\n\n      if (OPERATIONS.has(inputText[i])) {\n        this.tokens.push(inputText[i]);\n      }\n\n      i += 1;\n    }\n  }\n\n  getNextToken() {\n    if (this.idx === this.tokens.length) {\n      return null;\n    } else {\n      const token = this.tokens[this.idx];\n      this.idx += 1;\n      return token;\n    }\n  }\n\n  peekNextToken() {\n    if (this.idx === this.tokens.length) {\n      return null;\n    } else {\n      const token = this.tokens[this.idx];\n      return token;\n    }\n  }\n\n  hasNextToken() {\n    return this.idx < this.tokens.length;\n  }\n\n  isValid() {\n    return Array.from(this.inputText).every(\n      (c) => DIGITS.has(c) || OPERATIONS.has(c) || c === " "\n    );\n  }\n}\n'))),(0,i.kt)("p",null,"Try adding some input text below, to see how the lexer will tokenize it."),(0,i.kt)(y,{mdxType:"TextInput"}),(0,i.kt)(v,{mdxType:"LexerView"}),(0,i.kt)("p",null,"Awesome, now that our lexer is producing tokens, we can feed these tokens into the next module, the parser."),(0,i.kt)("h3",{id:"parser"},"Parser"),(0,i.kt)("p",null,"The parser is the most complicated part of this problem, we need to convert the list of tokens into a syntax tree. The syntax tree is a representation of the input string, where each node is an operation, and each leaf node is a number."),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},"If the node is a binary operation (+, -, ","*",", /), it will have two children, the left and right operands."),(0,i.kt)("li",{parentName:"ul"},"If the node is a unary operation (-, ()), it will have one child, the operand, stored in the right child."),(0,i.kt)("li",{parentName:"ul"},"If the node is a number, it will store a value and have no children. This is a leaf node.")),(0,i.kt)(o,{title:"Learn more about how the parser works",mdxType:"Collapse"},(0,i.kt)("h4",{id:"understanding-the-parser"},"Understanding the Parser"),(0,i.kt)("p",null,"This parser is classified as a ",(0,i.kt)("strong",{parentName:"p"},"Recursive Descent Parser"),", a top-down parsing method."),(0,i.kt)("h5",{id:"core-concepts"},"Core Concepts"),(0,i.kt)("ol",null,(0,i.kt)("li",{parentName:"ol"},(0,i.kt)("strong",{parentName:"li"},"Grammar"),":",(0,i.kt)("ul",{parentName:"li"},(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("inlineCode",{parentName:"li"},"expression")," represents operations like addition (",(0,i.kt)("inlineCode",{parentName:"li"},"+"),") or subtraction (",(0,i.kt)("inlineCode",{parentName:"li"},"-"),"). An expression can be composed of one or more ",(0,i.kt)("inlineCode",{parentName:"li"},"terms")," separated by addition or subtraction."),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("inlineCode",{parentName:"li"},"term")," concerns itself with multiplication (",(0,i.kt)("inlineCode",{parentName:"li"},"*"),") or division (",(0,i.kt)("inlineCode",{parentName:"li"},"/"),"). A term can be composed of one or more ",(0,i.kt)("inlineCode",{parentName:"li"},"factors")," separated by multiplication or division."),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("inlineCode",{parentName:"li"},"factor")," A factor can be a constant (like ",(0,i.kt)("inlineCode",{parentName:"li"},"1")," or ",(0,i.kt)("inlineCode",{parentName:"li"},"2"),"), or an expression (like ",(0,i.kt)("inlineCode",{parentName:"li"},"1 + 2")," or ",(0,i.kt)("inlineCode",{parentName:"li"},"(1 + 2) * 3"),").")))),(0,i.kt)("h5",{id:"enforcing-order-of-operations"},"Enforcing Order of Operations:"),(0,i.kt)("p",null,"The recursive structure of this parser enables it to intuitively enforce the order of operations."),(0,i.kt)("p",null,(0,i.kt)("strong",{parentName:"p"},"Expression -> Term -> Factor"),": At the highest level, when parsing an ",(0,i.kt)("inlineCode",{parentName:"p"},"expression"),", the parser looks for ",(0,i.kt)("inlineCode",{parentName:"p"},"terms"),", and within each term, it searches for ",(0,i.kt)("inlineCode",{parentName:"p"},"factors"),". This hierarchical descent ensures that the foundational mathematical operations (those within parentheses or just standalone numbers) are processed first (",(0,i.kt)("inlineCode",{parentName:"p"},"factors"),"), followed by multiplication and division (",(0,i.kt)("inlineCode",{parentName:"p"},"terms"),"), and finally addition and subtraction (",(0,i.kt)("inlineCode",{parentName:"p"},"expression"),")."),(0,i.kt)("p",null,(0,i.kt)("strong",{parentName:"p"},"An example"),": Consider the input ",(0,i.kt)("inlineCode",{parentName:"p"},"3 + 4 * 2"),"."),(0,i.kt)("ol",null,(0,i.kt)("li",{parentName:"ol"},(0,i.kt)("p",{parentName:"li"},(0,i.kt)("strong",{parentName:"p"},"Initialization"),": The parser starts at the ",(0,i.kt)("inlineCode",{parentName:"p"},"expression")," level.")),(0,i.kt)("li",{parentName:"ol"},(0,i.kt)("p",{parentName:"li"},(0,i.kt)("strong",{parentName:"p"},"Finding the First Term"),":"),(0,i.kt)("ul",{parentName:"li"},(0,i.kt)("li",{parentName:"ul"},"At the ",(0,i.kt)("inlineCode",{parentName:"li"},"expression")," level, it seeks its first ",(0,i.kt)("inlineCode",{parentName:"li"},"term"),"."),(0,i.kt)("li",{parentName:"ul"},"Within the ",(0,i.kt)("inlineCode",{parentName:"li"},"term"),", it looks for its first ",(0,i.kt)("inlineCode",{parentName:"li"},"factor"),"."),(0,i.kt)("li",{parentName:"ul"},"At the ",(0,i.kt)("inlineCode",{parentName:"li"},"factor")," level, it identifies ",(0,i.kt)("inlineCode",{parentName:"li"},"3"),"."),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("inlineCode",{parentName:"li"},"3")," is then returned upwards as the first ",(0,i.kt)("inlineCode",{parentName:"li"},"term")," to the ",(0,i.kt)("inlineCode",{parentName:"li"},"expression")," level."))),(0,i.kt)("li",{parentName:"ol"},(0,i.kt)("p",{parentName:"li"},(0,i.kt)("strong",{parentName:"p"},"Recognizing the Addition Operation"),":"),(0,i.kt)("ul",{parentName:"li"},(0,i.kt)("li",{parentName:"ul"},"The ",(0,i.kt)("inlineCode",{parentName:"li"},"expression")," level spots the next token as an addition (",(0,i.kt)("inlineCode",{parentName:"li"},"+"),")."),(0,i.kt)("li",{parentName:"ul"},"Consequently, an addition node is initialized. The parser now needs another ",(0,i.kt)("inlineCode",{parentName:"li"},"term")," to complete this addition operation."))),(0,i.kt)("li",{parentName:"ol"},(0,i.kt)("p",{parentName:"li"},(0,i.kt)("strong",{parentName:"p"},"Identifying the Next Term"),":"),(0,i.kt)("ul",{parentName:"li"},(0,i.kt)("li",{parentName:"ul"},"Diving back to the ",(0,i.kt)("inlineCode",{parentName:"li"},"term")," level, the parser identifies the next ",(0,i.kt)("inlineCode",{parentName:"li"},"factor")," as ",(0,i.kt)("inlineCode",{parentName:"li"},"4"),"."))),(0,i.kt)("li",{parentName:"ol"},(0,i.kt)("p",{parentName:"li"},(0,i.kt)("strong",{parentName:"p"},"Spotting the Multiplication Operation"),":"),(0,i.kt)("ul",{parentName:"li"},(0,i.kt)("li",{parentName:"ul"},"Remaining within the ",(0,i.kt)("inlineCode",{parentName:"li"},"term")," level, the parser identifies the subsequent token as multiplication (",(0,i.kt)("inlineCode",{parentName:"li"},"*"),")."),(0,i.kt)("li",{parentName:"ul"},"It then establishes a multiplication node, asking for another ",(0,i.kt)("inlineCode",{parentName:"li"},"factor")," to complete this multiplication."))),(0,i.kt)("li",{parentName:"ol"},(0,i.kt)("p",{parentName:"li"},(0,i.kt)("strong",{parentName:"p"},"Completing the Multiplication"),":"),(0,i.kt)("ul",{parentName:"li"},(0,i.kt)("li",{parentName:"ul"},"Descending once more to the ",(0,i.kt)("inlineCode",{parentName:"li"},"factor")," level, it discovers ",(0,i.kt)("inlineCode",{parentName:"li"},"2")," as the next ",(0,i.kt)("inlineCode",{parentName:"li"},"factor"),"."),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("inlineCode",{parentName:"li"},"2")," is sent upward, completing the multiplication node."))),(0,i.kt)("li",{parentName:"ol"},(0,i.kt)("p",{parentName:"li"},(0,i.kt)("strong",{parentName:"p"},"Wrapping it up"),":"),(0,i.kt)("ul",{parentName:"li"},(0,i.kt)("li",{parentName:"ul"},"This multiplication node, representing ",(0,i.kt)("inlineCode",{parentName:"li"},"4 * 2"),", is then passed up to the ",(0,i.kt)("inlineCode",{parentName:"li"},"expression")," level."),(0,i.kt)("li",{parentName:"ul"},"It serves as the second ",(0,i.kt)("inlineCode",{parentName:"li"},"term")," for our initially established addition node."),(0,i.kt)("li",{parentName:"ul"},"With no more tokens left, the ",(0,i.kt)("inlineCode",{parentName:"li"},"expression")," level concludes the parsing, and the final result is the addition node that encompasses the entire expression: ",(0,i.kt)("inlineCode",{parentName:"li"},"3 + (4 * 2)"),".")))),(0,i.kt)("mermaid",{value:'\ngraph LR\nsubgraph Syntax Tree\nE["+"]\nE --\x3e F["3"]\nE --\x3e G["*"]\nG --\x3e H["4"]\nG --\x3e I["2"]\nend\n'}),(0,i.kt)("p",null,"tldr; The parser will always process the deepest nested (highest-precedence) operations first, and then work its way back up."),(0,i.kt)("h5",{id:"error-handling"},"Error Handling"),(0,i.kt)("ol",null,(0,i.kt)("li",{parentName:"ol"},(0,i.kt)("strong",{parentName:"li"},"Errors"),": Any deviations from expected constructs will result in an error message; however, the parser will always try to complete the parse and return a tree. For example, if there are missing parentheses at the end of an expression ",(0,i.kt)("inlineCode",{parentName:"li"},"3 * (1 + 2"),", the parser will still return the correct result, but will also return an error message."))),(0,i.kt)(o,{title:"View code",mdxType:"Collapse"},(0,i.kt)("p",null,(0,i.kt)("a",{parentName:"p",href:"https://github.com/ericdudley/ericdudley/blob/main/src/utils/basic-calculator/parser.ts"},"View in GitHub")),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-ts"},'import { v4 as uuid } from "uuid";\nimport { OPERATIONS } from "./constants";\nimport { Lexer } from "./lexer";\nimport { Node, NullableNode } from "./node";\n\n/**\n * expression - addition or subtraction\n * term - multiplication or division\n * factor - constant or parantheses\n */\nexport class Parser {\n  lexer: Lexer;\n  error?: string;\n\n  constructor(lexer: Lexer) {\n    this.lexer = lexer;\n  }\n\n  parse(): { result?: NullableNode; error?: string } {\n    try {\n      const result = this.getExpression();\n\n      if (this.lexer.hasNextToken()) {\n        return {\n          result,\n          error: "Completed parsing, but did not read all tokens.",\n        };\n      }\n      return { result, error: this.error };\n    } catch (error) {\n      if (error) {\n        return {\n          error: error.message ?? "Unknown error",\n        };\n      }\n    }\n  }\n\n  getExpression(): NullableNode {\n    let node = this.getTerm();\n\n    while (\n      node &&\n      (this.lexer.peekNextToken() === "+" || this.lexer.peekNextToken() === "-")\n    ) {\n      const token = this.lexer.getNextToken();\n\n      node = new Node({\n        type: token === "+" ? "add" : "sub",\n        left: node,\n        right: this.getTerm(),\n      });\n    }\n\n    return node;\n  }\n\n  getTerm(): NullableNode {\n    let node = this.getFactor();\n\n    while (\n      node &&\n      (this.lexer.peekNextToken() === "*" || this.lexer.peekNextToken() === "/")\n    ) {\n      const token = this.lexer.getNextToken();\n\n      node = new Node({\n        type: token === "*" ? "mul" : "div",\n        left: node,\n        right: this.getFactor(),\n      });\n    }\n\n    return node;\n  }\n\n  getFactor(): NullableNode {\n    const token = this.lexer.getNextToken();\n\n    if (token == null) {\n      return null;\n    } else if (token === "(") {\n      const node = new Node({\n        type: "par",\n        right: this.getExpression(),\n      });\n\n      if (this.lexer.peekNextToken() === ")") {\n        this.lexer.getNextToken();\n      } else {\n        this.error = "Missing close parentheses";\n      }\n\n      return node;\n    } else if (OPERATIONS.has(token)) {\n      return null;\n    } else {\n      return new Node({\n        type: "val",\n        val: Number(token),\n      });\n    }\n  }\n\n  getTreeViewData(): { treeData?: TreeData; error?: string } {\n    const parsed = this.parse();\n\n    function getTree(node: NullableNode): TreeData {\n      if (!node) {\n        return null;\n      }\n\n      if (node.type === "val") {\n        return {\n          name: String(node.val),\n          key: uuid(),\n        };\n      }\n\n      if (node.type === "add") {\n        return {\n          name: "+",\n          key: uuid(),\n          children: [node.left, node.right]\n            .map((child) => getTree(child))\n            .filter((child) => !!child),\n        };\n      }\n\n      if (node.type === "sub") {\n        return {\n          name: "-",\n          key: uuid(),\n          children: [node.left, node.right]\n            .map((child) => getTree(child))\n            .filter((child) => !!child),\n        };\n      }\n\n      if (node.type === "mul") {\n        return {\n          name: "*",\n          key: uuid(),\n          children: [node.left, node.right]\n            .map((child) => getTree(child))\n            .filter((child) => !!child),\n        };\n      }\n\n      if (node.type === "div") {\n        return {\n          name: "/",\n          key: uuid(),\n          children: [node.left, node.right]\n            .map((child) => getTree(child))\n            .filter((child) => !!child),\n        };\n      }\n\n      if (node.type === "neg") {\n        return {\n          name: "-1 *",\n          key: uuid(),\n          children: [node.right]\n            .map((child) => getTree(child))\n            .filter((child) => !!child),\n        };\n      }\n\n      if (node.type === "par") {\n        return {\n          name: "()",\n          key: uuid(),\n          children: [node.right]\n            .map((child) => getTree(child))\n            .filter((child) => !!child),\n        };\n      }\n    }\n\n    return { treeData: getTree(parsed.result), error: parsed.error };\n  }\n}\n'))),(0,i.kt)(y,{mdxType:"TextInput"}),(0,i.kt)(I,{mdxType:"ParserView"}),(0,i.kt)("h3",{id:"interpreter"},"Interpreter"),(0,i.kt)("p",null,"Since our parser returns our tokens as a syntax tree with meaningful structure, we can now evaluate the expression by recursively traversing the tree and applying the operations from the leaves up to the root."),(0,i.kt)("ol",null,(0,i.kt)("li",{parentName:"ol"},"Base case: If the node is a number, return the value."),(0,i.kt)("li",{parentName:"ol"},"Recursive case:",(0,i.kt)("ul",{parentName:"li"},(0,i.kt)("li",{parentName:"ul"},"If the node is a unary operation, evaluate the right child, and apply the operation to the resulting value."),(0,i.kt)("li",{parentName:"ul"},"If the node is a binary operation, evaluate the left and right children, and apply the operation to the resulting values.")))),(0,i.kt)(o,{title:"View code",mdxType:"Collapse"},(0,i.kt)("p",null,(0,i.kt)("a",{parentName:"p",href:"https://github.com/ericdudley/ericdudley/blob/main/src/utils/basic-calculator/interpreter.ts"},"View in GitHub")),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-ts"},'import { Parser } from "./parser";\nimport { NullableNode } from "./node";\nimport { formatNumber } from "./constants";\n\nexport class Interpreter {\n  parser: Parser;\n  error?: string;\n\n  constructor(parser: Parser) {\n    this.parser = parser;\n  }\n\n  _interpret(root: NullableNode, steps: string[]): number {\n    if (!root) {\n      return 0;\n    }\n\n    let val: number;\n    let step: string;\n\n    switch (root.type) {\n      case "val": {\n        val = root.val;\n        break;\n      }\n      case "neg": {\n        const right = this._interpret(root.right, steps);\n        val = -1 * right;\n        step = `-1 * ${formatNumber(right)}`;\n        break;\n      }\n      case "add": {\n        const left = this._interpret(root.left, steps);\n        const right = this._interpret(root.right, steps);\n        val = left + right;\n        step = `${formatNumber(left)} + ${formatNumber(right)}`;\n        break;\n      }\n      case "sub": {\n        const left = this._interpret(root.left, steps);\n        const right = this._interpret(root.right, steps);\n        val = left - right;\n        step = `${formatNumber(left)} - ${formatNumber(right)}`;\n        break;\n      }\n      case "par": {\n        const right = this._interpret(root.right, steps);\n        val = right;\n        break;\n      }\n      case "mul": {\n        const left = this._interpret(root.left, steps);\n        const right = this._interpret(root.right, steps);\n        val = left * right;\n        step = `${formatNumber(left)} * ${formatNumber(right)}`;\n        break;\n      }\n      case "div": {\n        const left = this._interpret(root.left, steps);\n        const right = this._interpret(root.right, steps);\n        val = left / right;\n        step = `${formatNumber(left)} / ${formatNumber(right)}`;\n        break;\n      }\n      default:\n        this.error = `Unknown node type: ${root.type}`;\n    }\n\n    if (step) {\n      steps.push(`${step} = ${formatNumber(val)}`);\n    }\n    return val;\n  }\n\n  interpret(): { steps: string[]; value: number; error?: string } {\n    this.error = "";\n    const steps = [];\n    const { result } = this.parser.parse();\n    const value = this._interpret(result, steps);\n    return {\n      value,\n      steps,\n      error: this.error,\n    };\n  }\n}\n'))),(0,i.kt)(y,{mdxType:"TextInput"}),(0,i.kt)(E,{mdxType:"InterpreterView"}),(0,i.kt)("h2",{id:"conclusion"},"Conclusion"),(0,i.kt)("p",null,"In this post, we've implemented a calculator interpreter, along the way, touching upon the principles of language parsing. By dividing our main task into three distinct modules \u2014 lexer, parser, and interpreter \u2014 we were able to break down the problem into smaller, more manageable pieces. This approach allowed us to test each module individually, and then assemble the final solution. I hope you enjoyed this post, and learned something new!"))}V.isMDXComponent=!0}}]);