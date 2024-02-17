(self.webpackChunkericdudley=self.webpackChunkericdudley||[]).push([[3050],{1419:(e,t,a)=>{"use strict";a.d(t,{xA:()=>u,yg:()=>c});var n=a(2822);function o(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}function i(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,n)}return a}function r(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?i(Object(a),!0).forEach((function(t){o(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):i(Object(a)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}function s(e,t){if(null==e)return{};var a,n,o=function(e,t){if(null==e)return{};var a,n,o={},i=Object.keys(e);for(n=0;n<i.length;n++)a=i[n],t.indexOf(a)>=0||(o[a]=e[a]);return o}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(n=0;n<i.length;n++)a=i[n],t.indexOf(a)>=0||Object.prototype.propertyIsEnumerable.call(e,a)&&(o[a]=e[a])}return o}var l=n.createContext({}),d=function(e){var t=n.useContext(l),a=t;return e&&(a="function"==typeof e?e(t):r(r({},t),e)),a},u=function(e){var t=d(e.components);return n.createElement(l.Provider,{value:t},e.children)},h="mdxType",g={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},m=n.forwardRef((function(e,t){var a=e.components,o=e.mdxType,i=e.originalType,l=e.parentName,u=s(e,["components","mdxType","originalType","parentName"]),h=d(a),m=o,c=h["".concat(l,".").concat(m)]||h[m]||g[m]||i;return a?n.createElement(c,r(r({ref:t},u),{},{components:a})):n.createElement(c,r({ref:t},u))}));function c(e,t){var a=arguments,o=t&&t.mdxType;if("string"==typeof e||o){var i=a.length,r=new Array(i);r[0]=m;var s={};for(var l in t)hasOwnProperty.call(t,l)&&(s[l]=t[l]);s.originalType=e,s[h]="string"==typeof e?e:o,r[1]=s;for(var d=2;d<i;d++)r[d]=a[d];return n.createElement.apply(null,r)}return n.createElement.apply(null,a)}m.displayName="MDXCreateElement"},4115:(e,t,a)=>{"use strict";a.r(t),a.d(t,{assets:()=>u,contentTitle:()=>l,default:()=>c,frontMatter:()=>s,metadata:()=>d,toc:()=>h});var n=a(2118),o=(a(2822),a(1419)),i=a(540),r=a.n(i);const s={slug:"code-review-mindset",title:"Code Review Mindset",authors:"me",tags:["code review","best practices","software engineering","software development"]},l=void 0,d={permalink:"/blog/code-review-mindset",source:"@site/blog/2023-04-21-code-reviews.md",title:"Code Review Mindset",description:"tldr; Focus on adopting a healthy code review mindset, rather than specific tips, to build a culture of knowledge sharing and improve code quality.",date:"2023-04-21T00:00:00.000Z",formattedDate:"April 21, 2023",tags:[{label:"code review",permalink:"/blog/tags/code-review"},{label:"best practices",permalink:"/blog/tags/best-practices"},{label:"software engineering",permalink:"/blog/tags/software-engineering"},{label:"software development",permalink:"/blog/tags/software-development"}],readingTime:14.04,hasTruncateMarker:!0,authors:[{name:"Eric Dudley",title:"Software Engineer",url:"https://www.linkedin.com/in/eric-dudley-894721106",imageURL:"https://github.com/ericdudley.png",key:"me"}],frontMatter:{slug:"code-review-mindset",title:"Code Review Mindset",authors:"me",tags:["code review","best practices","software engineering","software development"]},prevItem:{title:"Visualizing The 100 Prisoners Problem",permalink:"/blog/100-prisoners-problem"},nextItem:{title:"First Blog Post",permalink:"/blog/first-blog-post"}},u={authorsImageUrls:[void 0]},h=[{value:"Knowledge Sharing",id:"knowledge-sharing",level:3},{value:"As a PR author",id:"as-a-pr-author",level:4},{value:"First, the PR title:",id:"first-the-pr-title",level:5},{value:"Next, the PR description:",id:"next-the-pr-description",level:5},{value:"As a reviewer",id:"as-a-reviewer",level:4},{value:"Overall",id:"overall",level:4},{value:"Code Quality",id:"code-quality",level:3},{value:"As a PR author",id:"as-a-pr-author-1",level:4},{value:"Standard patterns",id:"standard-patterns",level:5},{value:"Readable patterns",id:"readable-patterns",level:5},{value:"Documentation",id:"documentation",level:5},{value:"The Self Review",id:"the-self-review",level:4},{value:"As a reviewer",id:"as-a-reviewer-1",level:4},{value:"Conclusion",id:"conclusion",level:3},{value:"As a PR author",id:"as-a-pr-author-2",level:4},{value:"As a reviewer",id:"as-a-reviewer-2",level:4}],g={toc:h},m="wrapper";function c(e){let{components:t,...a}=e;return(0,o.yg)(m,(0,n.A)({},g,a,{components:t,mdxType:"MDXLayout"}),(0,o.yg)("p",null,"tldr; Focus on adopting a healthy code review mindset, rather than specific tips, to build a culture of knowledge sharing and improve code quality."),(0,o.yg)("p",null,"As a software engineer, I've participated in countless code reviews, both as a reviewer and a PR author. I've seen the good, the bad, and the ugly when it comes to the code review process. In this blog post, I'll share my insights on the importance of a healthy code review mindset and how you can adopt it to make your code reviews more effective, efficient, and enjoyable."),(0,o.yg)("h1",{className:"!mb-2"},"Let's be honest..."),(0,o.yg)("h2",{className:"!m-0 text-gray-500"},"code reviews can sometimes be a ",(0,o.yg)("span",{className:"text-red-700"},"pain"),"."),(0,o.yg)("div",{className:"flex flex-col gap-1 max-w-sm mx-auto py-8"},(0,o.yg)("img",(0,n.A)({},r(),{alt:"engineers"})),(0,o.yg)("span",{className:"text-gray-800 dark:text-gray-300"},"Photo by Desola Lanre-Ologun from"," ",(0,o.yg)("a",{href:"https://unsplash.com/photos/kwzWjTnDPLk",target:"_blank",rel:"noopener noreferrer"},"Unsplash"))),(0,o.yg)("p",null,'As the reviewer, you try to navigate through someone else\'s code, potentially in an unfamiliar codebase, as you strive to balance your inner perfectionist with "approving to unblock \ud83d\udc4d".'),(0,o.yg)("p",null,"On the other side, as the PR author, you have to be vulnerable and expose your code to others for potential judgement. In simpler cases, you'll quickly make the requested changes and resolve comments. However, there are times when you might spend 15 minutes crafting a comprehensive response explaining your design choices, such as why you named a class ",(0,o.yg)("inlineCode",{parentName:"p"},"FooManager")," instead of ",(0,o.yg)("inlineCode",{parentName:"p"},"FooStore"),". Once after experiencing a review like this, a teammate of mine taught me about the term:"),(0,o.yg)("blockquote",null,(0,o.yg)("p",{parentName:"blockquote"},(0,o.yg)("a",{parentName:"p",href:"https://en.wikipedia.org/wiki/Law_of_triviality"},"bike shedding")," | Futile expenditure of time and energy in discussion of marginal technical issues.")),(0,o.yg)("p",null,"Despite these challenges, there's undoubtedly significant value in conducting code reviews, that's why we do them! Let's first discuss some of the goals of code reviews, and then see what kind of mindset we can build that will achieve these goals."),(0,o.yg)("h3",{id:"knowledge-sharing"},"Knowledge Sharing"),(0,o.yg)("p",null,"Knowledge sharing should be a top priority in a healthy code review process. Ultimately, only one person can write any given line of code, but it's important that teammates and future engineers can understand the context of that code."),(0,o.yg)("h4",{id:"as-a-pr-author"},"As a PR author"),(0,o.yg)("p",null,"It is your responsibility to make sure that your PR title and description are targeted towards your reviewers and any other engineers (including yourself) who might need to refer back to your PR in the future."),(0,o.yg)("admonition",{type:"tip"},(0,o.yg)("p",{parentName:"admonition"},"A reviewer shouldn't have to look at the code to understand what a PR is doing and why it is being done.")),(0,o.yg)("p",null,"Let's take a look at an example PR that is refactoring date formatting logic into a shared ",(0,o.yg)("inlineCode",{parentName:"p"},"utils/date-format.ts")," module."),(0,o.yg)("h5",{id:"first-the-pr-title"},"First, the PR title:"),(0,o.yg)("blockquote",null,(0,o.yg)("h2",{parentName:"blockquote",id:"refactor-jira-1234-standardize-date-formatting-in-shared-date-format-module"},"refactor: ","[JIRA-1234]"," Standardize date formatting in shared date-format module")),(0,o.yg)("p",null,"Given this title, a reviewer immediately understands the following:"),(0,o.yg)("ol",null,(0,o.yg)("li",{parentName:"ol"},"The scope of this PR is limited to refactoring, so there is no need to look out for new features."),(0,o.yg)("li",{parentName:"ol"},"The Jira issue key enables them to quickly find ",(0,o.yg)("strong",{parentName:"li"},"why")," this work is being done."),(0,o.yg)("li",{parentName:"ol"},"A meaningful and searchable description of the changes that can be easily found at a later date.")),(0,o.yg)("h5",{id:"next-the-pr-description"},"Next, the PR description:"),(0,o.yg)("blockquote",null,(0,o.yg)("p",{parentName:"blockquote"},"Created ",(0,o.yg)("inlineCode",{parentName:"p"},"utils/date-format")," which exposes functions for formatting dates in long and short formats. Found all places in the code that formatted Date objects, and updated them to use this new shared module. Any new code that does date formatting, should be using this shared module."),(0,o.yg)("p",{parentName:"blockquote"},"Added ",(0,o.yg)("inlineCode",{parentName:"p"},"date-format.spec.ts")," that tests the date formatting and handles edge cases like undefined dates.")),(0,o.yg)("p",null,"This PR description is concise, focusing on educating the reviewer about the impact of the changes instead of explaining the code itself. Even if the reviewer didn't look at the code, they would know that this new module exists and that they should be using it in their own PRs."),(0,o.yg)("admonition",{title:"Mindset",type:"tip"},(0,o.yg)("p",{parentName:"admonition"},'I want to maximize the "knowledge gained" to "time" ratio for my reviewers.'),(0,o.yg)("p",{parentName:"admonition"},"-"," ",(0,o.yg)("strong",{parentName:"p"},"You"))),(0,o.yg)("admonition",{title:"Pitfalls to avoid",type:"caution"},(0,o.yg)("ul",{parentName:"admonition"},(0,o.yg)("li",{parentName:"ul"},(0,o.yg)("p",{parentName:"li"},(0,o.yg)("strong",{parentName:"p"},"Writing a PR title that is too vague"),' - A PR title should be a short but meaningful description of the changes in the PR. It should be searchable and immediately obvious to anyone who reads it what the PR\'s purpose is. For example, instead of writing "fix bug", write "fix: ',"[JIRA-1234]",' handle undefined date in date formatting".')),(0,o.yg)("li",{parentName:"ul"},(0,o.yg)("p",{parentName:"li"},(0,o.yg)("strong",{parentName:"p"},"Writing a PR description that explains the code")," - This is a common mistake that I see in junior engineers. This is often a misuse of time, as reviewers will skip over your explanation of the code, and just jump to reading the actual code. Instead, focus on explaining the context of the changes in the PR description, and if necessary, explain the code in a PR comment, or even better, in a code comment.")))),(0,o.yg)("h4",{id:"as-a-reviewer"},"As a reviewer"),(0,o.yg)("p",null,"It may sound obvious, but your task is straightforward: take the time to read the PR title and description. If the PR author followed the guidelines above, then you will gain a ton of useful knowledge by reading this content."),(0,o.yg)("p",null,"If the PR author did not provide a useful title/description, then you should ask them to! Ultimately, it will be much easier for the PR author to write this, then having each reviewer independently have to glean the same information by reading through all the code."),(0,o.yg)("admonition",{title:"Mindset",type:"tip"},(0,o.yg)("p",{parentName:"admonition"},"I want to understand the changes in this PR well enough so that I can make better decisions in the future."),(0,o.yg)("p",{parentName:"admonition"},"-"," ",(0,o.yg)("strong",{parentName:"p"},"You"))),(0,o.yg)("admonition",{title:"Pitfalls to avoid",type:"caution"},(0,o.yg)("ul",{parentName:"admonition"},(0,o.yg)("li",{parentName:"ul"},(0,o.yg)("strong",{parentName:"li"},"Not giving feedback on a lacking PR title/description")," - If you see a PR title/description that is lacking, then you should ask the author to improve it. This will save you time both now, as you won't have to spend time trying to understand the PR, and in the long run as it will encourage the author to write more informative PRs in the future."))),(0,o.yg)("h4",{id:"overall"},"Overall"),(0,o.yg)("p",null,"In order for any codebase to be effective in the long-term, it's important that overall understanding of the codebase be diffused amongst many engineers. It's too risky to have all the knowledge siloed into single engineers; using the mindsets above, you can work towards creating a culture of knowledge sharing."),(0,o.yg)("h3",{id:"code-quality"},"Code Quality"),(0,o.yg)("p",null,"It may be surprising, but code quality often comes second to knowledge sharing. It's essential first to ensure that your team communicates well, understanding what is trying to be accomplished and why it's important. Once that foundation is established, you can then focus on bringing your code up to the quality standard of the codebase."),(0,o.yg)("admonition",{type:"note"},(0,o.yg)("p",{parentName:"admonition"},"We are not talking about code ",(0,o.yg)("em",{parentName:"p"},"correctness")," here; code correctness should be handled by testing and a QA process, but this is a topic for another article.")),(0,o.yg)("h4",{id:"as-a-pr-author-1"},"As a PR author"),(0,o.yg)("p",null,"Once you have achieved the functionality that you desire, and you have communicated in your PR title/description the meaning of your changes, then you should focus on making your code as readable and maintainable as possible. These concepts will mean different things in different code bases, but here are some high-level guidelines that you can use."),(0,o.yg)("h5",{id:"standard-patterns"},"Standard patterns"),(0,o.yg)("p",null,"If you are not solving a new ",(0,o.yg)("em",{parentName:"p"},"type")," of problem in your PR, then you should probably be adopting the common solution for that problem in your codebase. For instance, if you're working in a React codebase where Redux is used for state management throughout, it's best not to introduce a separate data store just for your own portion of the codebase. While it may seem like you're using \"the best tool for the job\", there is a long-term cost to introducing multiple ways of achieving the same thing in a codebase, ultimately making the codebase less readable and maintainable."),(0,o.yg)("h5",{id:"readable-patterns"},"Readable patterns"),(0,o.yg)("p",null,"If you are writing code that will likely need to be adjusted and updated in the future (true in lots of situations), then focus on writing readable code over elegant or efficient code."),(0,o.yg)("p",null,"But what if you found a really cool way of doing a computation that is twice as fast but less readable? That's fine! Make sure you organize your code in such a way that the region of the code that is less readable won't need to be changed in the future. What do I mean?"),(0,o.yg)("p",null,"Let's say we have a function ",(0,o.yg)("inlineCode",{parentName:"p"},"doThing")),(0,o.yg)("pre",null,(0,o.yg)("code",{parentName:"pre",className:"language-js"},"function doThing(args) {\n  // simple data validation\n\n  // fetch from database\n\n  // ! do complex computation !\n\n  // write to database\n\n  return;\n}\n")),(0,o.yg)("p",null,"This function is achieving a lot, and our complex computation that we can optimize is right in the middle. If we were to be changing the database logic, then we would need to update this function, since the complex computation is in this function, the person updating the database logic would also have to read and understand the complex computation to make sure they didn't break it."),(0,o.yg)("p",null,"To resolve this, we can refactor ",(0,o.yg)("inlineCode",{parentName:"p"},"...do complex computation...")," into the most stable minimal version."),(0,o.yg)("pre",null,(0,o.yg)("code",{parentName:"pre",className:"language-js"},"/**\n * Clear documentation on what this function's purpose is.\n */\nfunction doComplexComputation(args){\n    ...do complex computation...\n}\n")),(0,o.yg)("p",null,"In this case, this function implementation won't need to be touched, and other parts of the code can depend on it. If the complex computation needs to be changed, then an engineer can still dive in and try to update the complex code, or they can just swap out the implementation with a new one without having to update other parts of the code. In either case, the complexity of the code is isolated to a single function, and the rest of the code is free to be written in a more readable way."),(0,o.yg)("h5",{id:"documentation"},"Documentation"),(0,o.yg)("p",null,"As much as possible, you should focus on first writing readable code, and if the code itself is not readable enough, then fall back on writing great documentation. Often, the most valuable documentation happens at the module level, answering questions like:"),(0,o.yg)("ol",null,(0,o.yg)("li",{parentName:"ol"},"What problem does this module solve?"),(0,o.yg)("li",{parentName:"ol"},"When should I use this module?"),(0,o.yg)("li",{parentName:"ol"},"What assumptions does this module make?")),(0,o.yg)("p",null,"Given our ",(0,o.yg)("inlineCode",{parentName:"p"},"format-date")," example above, we could write the following documentation:"),(0,o.yg)("pre",null,(0,o.yg)("code",{parentName:"pre",className:"language-js"},"/**\n * This module contains functions to convert date objects into human-readable strings.\n *\n * Primarily intended for use in UI components, these functions should\n * typically replace native `Date` object usage.\n *\n * They assume a user timezone is set in the global store; if not,\n * the browser's timezone is used as a default.\n */\n")),(0,o.yg)("admonition",{title:"Mindset",type:"tip"},(0,o.yg)("p",{parentName:"admonition"},"I want to make other engineers think it is easier to read, understand, and maintain my code then replacing it with their own."),(0,o.yg)("p",{parentName:"admonition"},"-"," ",(0,o.yg)("strong",{parentName:"p"},"You"))),(0,o.yg)("admonition",{title:"Pitfalls to avoid",type:"caution"},(0,o.yg)("ul",{parentName:"admonition"},(0,o.yg)("li",{parentName:"ul"},(0,o.yg)("p",{parentName:"li"},(0,o.yg)("strong",{parentName:"p"},"Partial refactors")," - If you are introducing a new pattern into a codebase, if can be tempting to just use it in the new code you're writing in your PR, but this leads to the problem mentioned above where there are multiple ways of doing the same thing in the codebase. If you are introducing a new pattern, it has sufficient overlap with an existing pattern in the codebase, and it is ",(0,o.yg)("strong",{parentName:"p"},"better")," (by some objective metric) than the existing pattern, then you should refactor all of the existing code to use the new pattern as well.")),(0,o.yg)("li",{parentName:"ul"},(0,o.yg)("p",{parentName:"li"},(0,o.yg)("strong",{parentName:"p"},"Never writing documentation")," - Often times, engineers think that their own code is written so well, anyone glancing at it will immediately know what it does. This is not the case, often even yourself will forget the context of code only months later, so it's important to write documentation for the person who will be maintaining your code in the future and may have no context on the problem you were trying to solve.")))),(0,o.yg)("h4",{id:"the-self-review"},"The Self Review"),(0,o.yg)("p",null,"This PR habit has made a huge difference in the quality of my PRs. As soon as you think your PR is ready for sharing with others, take a pass through your own PR as if you were asked to review it."),(0,o.yg)("ol",null,(0,o.yg)("li",{parentName:"ol"},"Read the PR title and description, make sure you can understand what is going on."),(0,o.yg)("li",{parentName:"ol"},"Go over each file and look for ",(0,o.yg)("strong",{parentName:"li"},"obvious")," mistakes or gaps in your code quality. If you can anticipate the majority of PR feedback, then you can save time for your reviewers and yourself to focus on high value feedback."),(0,o.yg)("li",{parentName:"ol"},"Make any changes from your self review (no need to actually leave PR comments), and commit the changes in a ",(0,o.yg)("inlineCode",{parentName:"li"},"refactor: self review")," commit.")),(0,o.yg)("admonition",{title:"Mindset",type:"tip"},(0,o.yg)("p",{parentName:"admonition"},"I want to get high quality feedback from my reviewers, so I'm going to make sure there is no low-hanging fruit that I could identify myself."),(0,o.yg)("p",{parentName:"admonition"},"-"," ",(0,o.yg)("strong",{parentName:"p"},"You"))),(0,o.yg)("admonition",{title:"Pitfalls to avoid",type:"caution"},(0,o.yg)("ul",{parentName:"admonition"},(0,o.yg)("li",{parentName:"ul"},(0,o.yg)("strong",{parentName:"li"},"Requesting a review too early")," - If you request a review while your PR has a glaring issue that you could have spotted yourself, then you are not effectively using your reviewers' time. You should be requesting a review when you are confident that your PR is ready for review, and you have already done a self review. If you want early feedback, you should be asking for feedback on your design or implementation plan, not a full review of your code."))),(0,o.yg)("h4",{id:"as-a-reviewer-1"},"As a reviewer"),(0,o.yg)("p",null,"This is where we are truly tested. It is easy to leave countless comments about how you would have implemented this differently, or how you don't like the style of the code. To make sure you provide the most value to the PR author and others, you should be categorizing your comments. Here are some examples:"),(0,o.yg)("table",null,(0,o.yg)("thead",{parentName:"table"},(0,o.yg)("tr",{parentName:"thead"},(0,o.yg)("th",{parentName:"tr",align:null},"Tag"),(0,o.yg)("th",{parentName:"tr",align:null},"Description"))),(0,o.yg)("tbody",{parentName:"table"},(0,o.yg)("tr",{parentName:"tbody"},(0,o.yg)("td",{parentName:"tr",align:null},(0,o.yg)("inlineCode",{parentName:"td"},"important: Do not use this deprecated method")),(0,o.yg)("td",{parentName:"tr",align:null},"These comments ",(0,o.yg)("strong",{parentName:"td"},"must")," be resolved before the PR should be merged.")),(0,o.yg)("tr",{parentName:"tbody"},(0,o.yg)("td",{parentName:"tr",align:null},(0,o.yg)("inlineCode",{parentName:"td"},"style: Naming scheme")),(0,o.yg)("td",{parentName:"tr",align:null},"Style comments that are part of the codebase's explicitly agreed upon style guide or are undocumented standards within the codebase. This should ",(0,o.yg)("strong",{parentName:"td"},"not")," be subjective comments based on your preferences.")),(0,o.yg)("tr",{parentName:"tbody"},(0,o.yg)("td",{parentName:"tr",align:null},(0,o.yg)("inlineCode",{parentName:"td"},"question: How does this work?")),(0,o.yg)("td",{parentName:"tr",align:null},"Non-blocking questions about the code, focusing on knowledge sharing.")),(0,o.yg)("tr",{parentName:"tbody"},(0,o.yg)("td",{parentName:"tr",align:null},(0,o.yg)("inlineCode",{parentName:"td"},"recommend: Use built-in language feature that does this")),(0,o.yg)("td",{parentName:"tr",align:null},"Recommendations that are not required but would likely bring meaningful improvements to the code.")),(0,o.yg)("tr",{parentName:"tbody"},(0,o.yg)("td",{parentName:"tr",align:null},(0,o.yg)("inlineCode",{parentName:"td"},"nit: Use functional methods instead of procedural")),(0,o.yg)("td",{parentName:"tr",align:null},"Non-blocking subjective feedback.")),(0,o.yg)("tr",{parentName:"tbody"},(0,o.yg)("td",{parentName:"tr",align:null},(0,o.yg)("inlineCode",{parentName:"td"},"supernit: Maybe call this function XYZ?")),(0,o.yg)("td",{parentName:"tr",align:null},"Non-blocking subjective feedback, that you feel the need to comment on, but want to make it clear to the PR author that you're aware it is your personal preference and not very important.")))),(0,o.yg)("p",null,"By categorizing all of our feedback, we are setting up the PR author to make better decisions. If they have minimal time, then they should only focus on resolving the blocking feedback; if they have more time, then they can also go through the non-blocking comments and improve their PR even more."),(0,o.yg)("p",null,"By organizing our feedback into categories, we empower the PR author to make informed decisions. With limited time, they can prioritize addressing the blocking feedback; if they have spare time, then they can move on to address the non-blocking comments to improve their PR further."),(0,o.yg)("admonition",{title:"Mindset",type:"tip"},(0,o.yg)("p",{parentName:"admonition"},"My goal is to communicate my unique perspective about this PR, while supporting the author in upholding quality benchmarks and completing their task."),(0,o.yg)("p",{parentName:"admonition"},"-"," ",(0,o.yg)("strong",{parentName:"p"},"You"))),(0,o.yg)("admonition",{title:"Pitfalls to avoid",type:"caution"},(0,o.yg)("ul",{parentName:"admonition"},(0,o.yg)("li",{parentName:"ul"},(0,o.yg)("strong",{parentName:"li"},"Getting personal")," - It is easy to get personal when reviewing code, especially if you feel like the PR author is not taking your feedback seriously. It is important to remember that the PR author is a human being, and they are trying their best (hopefully). If you feel like the PR conversations are getting heated, then it is time to take a step back, cool down, and reach out to the PR author to have a live code review (in-person or over video call) where you can communicate more effectively."))),(0,o.yg)("h3",{id:"conclusion"},"Conclusion"),(0,o.yg)("p",null,'Code reviews are an essential part of a software engineer\'s responsibilities, and they offer a unique challenge of mixing interpersonal, communication, and technical skills. In this article, we\'ve delved into the two main goals of PR reviews: "knowledge sharing" and "code quality." The most important takeaways from this article should be the following mindsets:'),(0,o.yg)("h4",{id:"as-a-pr-author-2"},"As a PR author"),(0,o.yg)("admonition",{title:"Mindset",type:"tip"},(0,o.yg)("p",{parentName:"admonition"},'I want to maximize the "knowledge gained" to "time" ratio for my reviewers. By writing readable and maintainable code, I can ensure that future engineers will want to work with my code rather than replace it with their own.'),(0,o.yg)("p",{parentName:"admonition"},"-"," ",(0,o.yg)("strong",{parentName:"p"},"You"))),(0,o.yg)("h4",{id:"as-a-reviewer-2"},"As a reviewer"),(0,o.yg)("admonition",{title:"Mindset",type:"tip"},(0,o.yg)("p",{parentName:"admonition"},"I want to fully grasp the changes in this PR, allowing me to provide my unique perspective during the review and make more informed decisions in the future. My ultimate goal is to enable the PR author to uphold quality standards and successfully deliver their code."),(0,o.yg)("p",{parentName:"admonition"},"-"," ",(0,o.yg)("strong",{parentName:"p"},"You"))),(0,o.yg)("p",null,"If you can internalize these mindsets, then it will be much easier for you to adopt healthy PR habits and be a great teammate."))}c.isMDXComponent=!0},540:(e,t,a)=>{e.exports={src:{srcSet:a.p+"assets/ideal-img/code-review-woman-man.6788c2f.512.jpeg 512w,"+a.p+"assets/ideal-img/code-review-woman-man.742f732.1024.jpeg 1024w",images:[{path:a.p+"assets/ideal-img/code-review-woman-man.6788c2f.512.jpeg",width:512,height:341},{path:a.p+"assets/ideal-img/code-review-woman-man.742f732.1024.jpeg",width:1024,height:683}],src:a.p+"assets/ideal-img/code-review-woman-man.6788c2f.512.jpeg",toString:function(){return a.p+"assets/ideal-img/code-review-woman-man.6788c2f.512.jpeg"},placeholder:void 0,width:512,height:341},preSrc:"data:image/jpeg;base64,/9j/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAHAAoDASIAAhEBAxEB/8QAFgABAQEAAAAAAAAAAAAAAAAAAAMG/8QAIBAAAgIBAwUAAAAAAAAAAAAAAQIDBAAGESEFMTJRcf/EABUBAQEAAAAAAAAAAAAAAAAAAAME/8QAGhEAAgIDAAAAAAAAAAAAAAAAAQIAAxEhof/aAAwDAQACEQMRAD8AwmtNQ3LlURCdkljdpBQVQ0BZfZO3BBJ+nLQ6i6hFCkdOnciqooWKNLp2RB4gc9gNsYyw1ra5zzUMOUQET//Z"}}}]);