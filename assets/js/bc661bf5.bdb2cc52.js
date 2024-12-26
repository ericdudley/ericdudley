"use strict";(self.webpackChunkericdudley=self.webpackChunkericdudley||[]).push([[9380],{8799:(e,t,n)=>{n.r(t),n.d(t,{default:()=>m});var r=n(2822),a=n(2039);const i=[{name:"Cash Compass",link:"https://cashcompass.co",description:"Open Source, Offline First, Personal Finance App",previewImage:"https://cashcompass.co/_static/icons/icon-128x128.png"},{name:"Find The Sub",link:"https://findthesub.ericdudley.com",description:"Match Reddit post titles to subreddits",previewImage:"https://i.imgur.com/rgK8YTD.png"},{name:"Benford's Law",link:"https://benfords-law.ericdudley.com",description:"Visualization of the mathematics principle",previewImage:"https://benfords-law.ericdudley.com/favicon.ico"},{name:"Family Cookbook",link:"https://recipes.ericdudley.com",description:"Deployment of nyum for my family recipes",previewImage:"https://recipes.ericdudley.com/assets/logo.svg"}],c=150,s=250,l=1,o=100,d=200;function m(){const e=(0,r.useRef)(null),t=(0,r.useRef)(),[n,m]=(0,r.useState)(!1),[u,f]=(0,r.useState)([]),p=(0,r.useRef)({x:-9999,y:-9999});return(0,r.useEffect)((()=>{if(!n)return()=>{};const r=()=>{const n=e.current;if(!n)return;const{clientWidth:a,clientHeight:i}=n;f((e=>{const t=e.map((e=>{const{x:t,y:n,dx:r,dy:l}=e,m=t+c/2,u=n+s/2,f=p.current.x-m,h=p.current.y-u,x=Math.sqrt(f*f+h*h);let y=r,g=l;if(x<o)y=0,g=0;else if(x<d){const e=x/d;y*=e,g*=e}let b=t+y,w=n+g,v=r,E=l;return b<0?(b=0,v=-r):b>a-c&&(b=a-c,v=-r),w<0?(w=0,E=-l):w>i-s&&(w=i-s,E=-l),{x:b,y:w,dx:v,dy:E}}));for(let n=0;n<t.length;n+=1)for(let e=n+1;e<t.length;e+=1){const r=t[n],a=t[e],i=r.x,l=r.x+c,o=r.y,d=r.y+s,m=a.x,u=a.x+c,f=a.y,p=a.y+s;if(i<u&&l>m&&o<p&&d>f){const c=Math.min(l-m,u-i),s=Math.min(d-f,p-o);if(c<s){const i=c/2;r.x<a.x?(t[n].x-=i,t[e].x+=i):(t[n].x+=i,t[e].x-=i),[t[n].dx,t[e].dx]=[t[e].dx,t[n].dx]}else{const i=s/2;r.y<a.y?(t[n].y-=i,t[e].y+=i):(t[n].y+=i,t[e].y-=i),[t[n].dy,t[e].dy]=[t[e].dy,t[n].dy]}}}return t})),t.current=requestAnimationFrame(r)};return t.current=requestAnimationFrame(r),()=>{t.current&&cancelAnimationFrame(t.current)}}),[n]),r.createElement(a.A,null,r.createElement("div",{ref:e,className:"relative flex items-center justify-center bg-gray-100 w-full",style:{height:"calc(100vh - 128px)"},onMouseMove:t=>{if(!e.current)return;const n=e.current.getBoundingClientRect();p.current.x=t.clientX-n.left,p.current.y=t.clientY-n.top}},!n&&r.createElement("button",{onClick:()=>{(()=>{const t=e.current;if(!t)return;const{clientWidth:n,clientHeight:r}=t,a=i.map((()=>({x:Math.random()*(n-c),y:Math.random()*(r-s),dx:(Math.random()>.5?1:-1)*l,dy:(Math.random()>.5?1:-1)*l})));f(a)})(),m(!0)},className:"px-6 py-3 bg-indigo-600 text-white rounded-lg shadow-lg text-xl hover:bg-indigo-500 transition cursor-pointer"},"Load Projects"),n&&r.createElement("div",{className:"relative w-full h-full overflow-hidden"},i.map(((e,t)=>{const n={width:`${c}px`,height:`${s}px`,transform:`translate(${u[t]?.x||0}px, ${u[t]?.y||0}px)`,transition:"transform 0.1s linear"};return r.createElement("div",{key:e.name,className:"absolute text-center bg-white shadow-lg rounded-lg p-4 flex flex-col items-center justify-center cursor-pointer",style:n},r.createElement("img",{src:e.previewImage,alt:e.name,className:"w-24 h-24 rounded-full object-cover mb-2"}),r.createElement("div",{className:"flex-grow flex flex-col items-center"},r.createElement("a",{href:e.link,className:"block font-bold text-indigo-600 hover:text-indigo-400 mb-1",target:"_blank",rel:"noopener noreferrer"},e.name),r.createElement("p",{className:"text-sm text-gray-700"},e.description)))})),r.createElement("div",{className:"absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white bg-opacity-80 shadow-lg rounded-lg p-6 flex flex-col items-center w-[16rem]"},r.createElement("div",{className:"flex space-x-2 mb-4"},r.createElement("div",{className:"w-4 h-4 bg-indigo-600 rounded-full animate-bounce delay-0"}),r.createElement("div",{className:"w-4 h-4 bg-indigo-600 rounded-full animate-bounce delay-200"}),r.createElement("div",{className:"w-4 h-4 bg-indigo-600 rounded-full animate-bounce delay-400"})),r.createElement("p",{className:"text-lg font-semibold text-gray-800"},"Loading projects",Date.now()%1e3<500?".":Date.now()%1e3<750?"..":"...")))))}}}]);