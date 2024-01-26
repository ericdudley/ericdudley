"use strict";(self.webpackChunkericdudley=self.webpackChunkericdudley||[]).push([[4319],{1283:(e,t,r)=>{r.d(t,{Zo:()=>s,kt:()=>f});var n=r(8646);function o(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function a(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function l(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?a(Object(r),!0).forEach((function(t){o(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):a(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function i(e,t){if(null==e)return{};var r,n,o=function(e,t){if(null==e)return{};var r,n,o={},a=Object.keys(e);for(n=0;n<a.length;n++)r=a[n],t.indexOf(r)>=0||(o[r]=e[r]);return o}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(n=0;n<a.length;n++)r=a[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(o[r]=e[r])}return o}var c=n.createContext({}),p=function(e){var t=n.useContext(c),r=t;return e&&(r="function"==typeof e?e(t):l(l({},t),e)),r},s=function(e){var t=p(e.components);return n.createElement(c.Provider,{value:t},e.children)},m="mdxType",u={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},d=n.forwardRef((function(e,t){var r=e.components,o=e.mdxType,a=e.originalType,c=e.parentName,s=i(e,["components","mdxType","originalType","parentName"]),m=p(r),d=o,f=m["".concat(c,".").concat(d)]||m[d]||u[d]||a;return r?n.createElement(f,l(l({ref:t},s),{},{components:r})):n.createElement(f,l({ref:t},s))}));function f(e,t){var r=arguments,o=t&&t.mdxType;if("string"==typeof e||o){var a=r.length,l=new Array(a);l[0]=d;var i={};for(var c in t)hasOwnProperty.call(t,c)&&(i[c]=t[c]);i.originalType=e,i[m]="string"==typeof e?e:o,l[1]=i;for(var p=2;p<a;p++)l[p]=r[p];return n.createElement.apply(null,l)}return n.createElement.apply(null,r)}d.displayName="MDXCreateElement"},1501:(e,t,r)=>{r.r(t),r.d(t,{assets:()=>c,contentTitle:()=>l,default:()=>u,frontMatter:()=>a,metadata:()=>i,toc:()=>p});var n=r(9454),o=(r(8646),r(1283));const a={slug:"calculator-interpreter",title:"Implementing a calculator interpreter",authors:"me",tags:["software development","mathematics","puzzles","leetcode"]},l=void 0,i={permalink:"/blog/calculator-interpreter",source:"@site/blog/2023-09-03-basic-calculator.mdx",title:"Implementing a calculator interpreter",description:"Today, I'll be covering how to implement a calculator interpreter (i.e. evaluating 1 + 2 * 3 as 7). First we'll cover the overall concept, and then we'll dive into the details of how to implement it.",date:"2023-09-03T00:00:00.000Z",formattedDate:"September 3, 2023",tags:[{label:"software development",permalink:"/blog/tags/software-development"},{label:"mathematics",permalink:"/blog/tags/mathematics"},{label:"puzzles",permalink:"/blog/tags/puzzles"},{label:"leetcode",permalink:"/blog/tags/leetcode"}],readingTime:12.11,hasTruncateMarker:!0,authors:[{name:"Eric Dudley",title:"Software Engineer",url:"https://www.linkedin.com/in/eric-dudley-894721106",imageURL:"https://github.com/ericdudley.png",key:"me"}],frontMatter:{slug:"calculator-interpreter",title:"Implementing a calculator interpreter",authors:"me",tags:["software development","mathematics","puzzles","leetcode"]},nextItem:{title:"Visualizing The 100 Prisoners Problem",permalink:"/blog/100-prisoners-problem"}},c={authorsImageUrls:[void 0]},p=[],s={toc:p},m="wrapper";function u(e){let{components:t,...r}=e;return(0,o.kt)(m,(0,n.Z)({},s,r,{components:t,mdxType:"MDXLayout"}),(0,o.kt)("p",null,"Today, I'll be covering how to implement a calculator interpreter (i.e. evaluating ",(0,o.kt)("inlineCode",{parentName:"p"},"1 + 2 * 3")," as ",(0,o.kt)("inlineCode",{parentName:"p"},"7"),"). First we'll cover the overall concept, and then we'll dive into the details of how to implement it."),(0,o.kt)("blockquote",null,(0,o.kt)("h4",{parentName:"blockquote",id:"this-post-has-interactive-components-demonstrating-the-concepts-make-sure-to-try-them-out-by-modifying-the-expressions-in-the-input-boxes-with-the-mouse-pointer-icons"},"This post has interactive components demonstrating the concepts, make sure to try them out by modifying the expressions in the input boxes with the mouse pointer icons!")))}u.isMDXComponent=!0}}]);