/*! For license information please see 3084.3c3dfc08.js.LICENSE.txt */
"use strict";(self.webpackChunkericdudley=self.webpackChunkericdudley||[]).push([[3084],{1419:(e,t,r)=>{r.d(t,{xA:()=>u,yg:()=>f});var n=r(2822);function i(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function s(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function o(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?s(Object(r),!0).forEach((function(t){i(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):s(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function a(e,t){if(null==e)return{};var r,n,i=function(e,t){if(null==e)return{};var r,n,i={},s=Object.keys(e);for(n=0;n<s.length;n++)r=s[n],t.indexOf(r)>=0||(i[r]=e[r]);return i}(e,t);if(Object.getOwnPropertySymbols){var s=Object.getOwnPropertySymbols(e);for(n=0;n<s.length;n++)r=s[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(i[r]=e[r])}return i}var c=n.createContext({}),l=function(e){var t=n.useContext(c),r=t;return e&&(r="function"==typeof e?e(t):o(o({},t),e)),r},u=function(e){var t=l(e.components);return n.createElement(c.Provider,{value:t},e.children)},d="mdxType",p={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},h=n.forwardRef((function(e,t){var r=e.components,i=e.mdxType,s=e.originalType,c=e.parentName,u=a(e,["components","mdxType","originalType","parentName"]),d=l(r),h=i,f=d["".concat(c,".").concat(h)]||d[h]||p[h]||s;return r?n.createElement(f,o(o({ref:t},u),{},{components:r})):n.createElement(f,o({ref:t},u))}));function f(e,t){var r=arguments,i=t&&t.mdxType;if("string"==typeof e||i){var s=r.length,o=new Array(s);o[0]=h;var a={};for(var c in t)hasOwnProperty.call(t,c)&&(a[c]=t[c]);a.originalType=e,a[d]="string"==typeof e?e:i,o[1]=a;for(var l=2;l<s;l++)o[l]=r[l];return n.createElement.apply(null,o)}return n.createElement.apply(null,r)}h.displayName="MDXCreateElement"},8010:(e,t,r)=>{r.d(t,{A:()=>g});var n=r(2118),i=r(2822),s=r(1382),o=r(7940),a=r(999);const c={details:"details_te4X",isBrowser:"isBrowser_r6UC",collapsibleContent:"collapsibleContent_wZJA"};function l(e){return!!e&&("SUMMARY"===e.tagName||l(e.parentElement))}function u(e,t){return!!e&&(e===t||u(e.parentElement,t))}function d(e){let{summary:t,children:r,...d}=e;const p=(0,o.A)(),h=(0,i.useRef)(null),{collapsed:f,setCollapsed:g}=(0,a.u)({initialState:!d.open}),[m,y]=(0,i.useState)(d.open),_=i.isValidElement(t)?t:i.createElement("summary",null,t??"Details");return i.createElement("details",(0,n.A)({},d,{ref:h,open:m,"data-collapsed":f,className:(0,s.A)(c.details,p&&c.isBrowser,d.className),onMouseDown:e=>{l(e.target)&&e.detail>1&&e.preventDefault()},onClick:e=>{e.stopPropagation();const t=e.target;l(t)&&u(t,h.current)&&(e.preventDefault(),f?(g(!1),y(!0)):g(!0))}}),_,i.createElement(a.N,{lazy:!1,collapsed:f,disableSSRStyle:!0,onCollapseTransitionEnd:e=>{g(e),y(!e)}},i.createElement("div",{className:c.collapsibleContent},r)))}const p={details:"details_vGzT"},h="alert alert--info";function f(e){let{...t}=e;return i.createElement(d,(0,n.A)({},t,{className:(0,s.A)(h,p.details,t.className)}))}function g(e){const t=i.Children.toArray(e.children),r=t.find((e=>i.isValidElement(e)&&"summary"===e.props?.mdxType)),s=i.createElement(i.Fragment,null,t.filter((e=>e!==r)));return i.createElement(f,(0,n.A)({},e,{summary:r}),s)}},1593:(e,t,r)=>{r.d(t,{A7C:()=>d,TNq:()=>p,oE:()=>h});var n=r(2822),i={color:void 0,size:void 0,className:void 0,style:void 0,attr:void 0},s=n.createContext&&n.createContext(i),o=function(){return o=Object.assign||function(e){for(var t,r=1,n=arguments.length;r<n;r++)for(var i in t=arguments[r])Object.prototype.hasOwnProperty.call(t,i)&&(e[i]=t[i]);return e},o.apply(this,arguments)},a=function(e,t){var r={};for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&t.indexOf(n)<0&&(r[n]=e[n]);if(null!=e&&"function"==typeof Object.getOwnPropertySymbols){var i=0;for(n=Object.getOwnPropertySymbols(e);i<n.length;i++)t.indexOf(n[i])<0&&Object.prototype.propertyIsEnumerable.call(e,n[i])&&(r[n[i]]=e[n[i]])}return r};function c(e){return e&&e.map((function(e,t){return n.createElement(e.tag,o({key:t},e.attr),c(e.child))}))}function l(e){return function(t){return n.createElement(u,o({attr:o({},e.attr)},t),c(e.child))}}function u(e){var t=function(t){var r,i=e.attr,s=e.size,c=e.title,l=a(e,["attr","size","title"]),u=s||t.size||"1em";return t.className&&(r=t.className),e.className&&(r=(r?r+" ":"")+e.className),n.createElement("svg",o({stroke:"currentColor",fill:"currentColor",strokeWidth:"0"},t.attr,i,l,{className:r,style:o(o({color:e.color||t.color},t.style),e.style),height:u,width:u,xmlns:"http://www.w3.org/2000/svg"}),c&&n.createElement("title",null,c),e.children)};return void 0!==s?n.createElement(s.Consumer,null,(function(e){return t(e)})):t(i)}function d(e){return l({tag:"svg",attr:{viewBox:"0 0 512 512"},child:[{tag:"path",attr:{d:"M504 256c0 136.967-111.033 248-248 248S8 392.967 8 256 119.033 8 256 8s248 111.033 248 248zM227.314 387.314l184-184c6.248-6.248 6.248-16.379 0-22.627l-22.627-22.627c-6.248-6.249-16.379-6.249-22.628 0L216 308.118l-70.059-70.059c-6.248-6.248-16.379-6.248-22.628 0l-22.627 22.627c-6.248 6.248-6.248 16.379 0 22.627l104 104c6.249 6.249 16.379 6.249 22.628.001z"}}]})(e)}function p(e){return l({tag:"svg",attr:{viewBox:"0 0 512 512"},child:[{tag:"path",attr:{d:"M504 256c0 136.997-111.043 248-248 248S8 392.997 8 256C8 119.083 119.043 8 256 8s248 111.083 248 248zm-248 50c-25.405 0-46 20.595-46 46s20.595 46 46 46 46-20.595 46-46-20.595-46-46-46zm-43.673-165.346l7.418 136c.347 6.364 5.609 11.346 11.982 11.346h48.546c6.373 0 11.635-4.982 11.982-11.346l7.418-136c.375-6.874-5.098-12.654-11.982-12.654h-63.383c-6.884 0-12.356 5.78-11.981 12.654z"}}]})(e)}function h(e){return l({tag:"svg",attr:{viewBox:"0 0 448 512"},child:[{tag:"path",attr:{d:"M448 240v96c0 3.084-.356 6.159-1.063 9.162l-32 136C410.686 499.23 394.562 512 376 512H168a40.004 40.004 0 0 1-32.35-16.473l-127.997-176c-12.993-17.866-9.043-42.883 8.822-55.876 17.867-12.994 42.884-9.043 55.877 8.823L104 315.992V40c0-22.091 17.908-40 40-40s40 17.909 40 40v200h8v-40c0-22.091 17.908-40 40-40s40 17.909 40 40v40h8v-24c0-22.091 17.908-40 40-40s40 17.909 40 40v24h8c0-22.091 17.908-40 40-40s40 17.909 40 40zm-256 80h-8v96h8v-96zm88 0h-8v96h8v-96zm88 0h-8v96h8v-96z"}}]})(e)}},9155:(e,t,r)=>{r.d(t,{A:()=>S});var n=r(2118);var i=r(2429),s=r.n(i),o=r(2822);function a(e){var t=0,r=e.children,n=r&&r.length;if(n)for(;--n>=0;)t+=r[n].value;else t=1;e.value=t}function c(e,t){e instanceof Map?(e=[void 0,e],void 0===t&&(t=u)):void 0===t&&(t=l);for(var r,n,i,s,o,a=new h(e),c=[a];r=c.pop();)if((i=t(r.data))&&(o=(i=Array.from(i)).length))for(r.children=i,s=o-1;s>=0;--s)c.push(n=i[s]=new h(i[s])),n.parent=r,n.depth=r.depth+1;return a.eachBefore(p)}function l(e){return e.children}function u(e){return Array.isArray(e)?e[1]:null}function d(e){void 0!==e.data.value&&(e.value=e.data.value),e.data=e.data.data}function p(e){var t=0;do{e.height=t}while((e=e.parent)&&e.height<++t)}function h(e){this.data=e,this.depth=this.height=0,this.parent=null}function f(e,t){return e.parent===t.parent?1:2}function g(e){var t=e.children;return t?t[0]:e.t}function m(e){var t=e.children;return t?t[t.length-1]:e.t}function y(e,t,r){var n=r/(t.i-e.i);t.c-=n,t.s+=r,e.c+=n,t.z+=r,t.m+=r}function _(e,t,r){return e.a.parent===t.parent?e.a:r}function v(e,t){this._=e,this.parent=null,this.children=null,this.A=null,this.a=this,this.z=0,this.m=0,this.c=0,this.s=0,this.t=null,this.i=t}function b(){var e=f,t=1,r=1,n=null;function i(i){var c=function(e){for(var t,r,n,i,s,o=new v(e,0),a=[o];t=a.pop();)if(n=t._.children)for(t.children=new Array(s=n.length),i=s-1;i>=0;--i)a.push(r=t.children[i]=new v(n[i],i)),r.parent=t;return(o.parent=new v(null,0)).children=[o],o}(i);if(c.eachAfter(s),c.parent.m=-c.z,c.eachBefore(o),n)i.eachBefore(a);else{var l=i,u=i,d=i;i.eachBefore((function(e){e.x<l.x&&(l=e),e.x>u.x&&(u=e),e.depth>d.depth&&(d=e)}));var p=l===u?1:e(l,u)/2,h=p-l.x,f=t/(u.x+p+h),g=r/(d.depth||1);i.eachBefore((function(e){e.x=(e.x+h)*f,e.y=e.depth*g}))}return i}function s(t){var r=t.children,n=t.parent.children,i=t.i?n[t.i-1]:null;if(r){!function(e){for(var t,r=0,n=0,i=e.children,s=i.length;--s>=0;)(t=i[s]).z+=r,t.m+=r,r+=t.s+(n+=t.c)}(t);var s=(r[0].z+r[r.length-1].z)/2;i?(t.z=i.z+e(t._,i._),t.m=t.z-s):t.z=s}else i&&(t.z=i.z+e(t._,i._));t.parent.A=function(t,r,n){if(r){for(var i,s=t,o=t,a=r,c=s.parent.children[0],l=s.m,u=o.m,d=a.m,p=c.m;a=m(a),s=g(s),a&&s;)c=g(c),(o=m(o)).a=t,(i=a.z+d-s.z-l+e(a._,s._))>0&&(y(_(a,t,n),t,i),l+=i,u+=i),d+=a.m,l+=s.m,p+=c.m,u+=o.m;a&&!m(o)&&(o.t=a,o.m+=d-u),s&&!g(c)&&(c.t=s,c.m+=l-p,n=t)}return n}(t,i,t.parent.A||n[0])}function o(e){e._.x=e.z+e.parent.m,e.m+=e.parent.m}function a(e){e.x*=t,e.y=e.depth*r}return i.separation=function(t){return arguments.length?(e=t,i):e},i.size=function(e){return arguments.length?(n=!1,t=+e[0],r=+e[1],i):n?null:[t,r]},i.nodeSize=function(e){return arguments.length?(n=!0,t=+e[0],r=+e[1],i):n?[t,r]:null},i}h.prototype=c.prototype={constructor:h,count:function(){return this.eachAfter(a)},each:function(e,t){let r=-1;for(const n of this)e.call(t,n,++r,this);return this},eachAfter:function(e,t){for(var r,n,i,s=this,o=[s],a=[],c=-1;s=o.pop();)if(a.push(s),r=s.children)for(n=0,i=r.length;n<i;++n)o.push(r[n]);for(;s=a.pop();)e.call(t,s,++c,this);return this},eachBefore:function(e,t){for(var r,n,i=this,s=[i],o=-1;i=s.pop();)if(e.call(t,i,++o,this),r=i.children)for(n=r.length-1;n>=0;--n)s.push(r[n]);return this},find:function(e,t){let r=-1;for(const n of this)if(e.call(t,n,++r,this))return n},sum:function(e){return this.eachAfter((function(t){for(var r=+e(t.data)||0,n=t.children,i=n&&n.length;--i>=0;)r+=n[i].value;t.value=r}))},sort:function(e){return this.eachBefore((function(t){t.children&&t.children.sort(e)}))},path:function(e){for(var t=this,r=function(e,t){if(e===t)return e;var r=e.ancestors(),n=t.ancestors(),i=null;e=r.pop(),t=n.pop();for(;e===t;)i=e,e=r.pop(),t=n.pop();return i}(t,e),n=[t];t!==r;)t=t.parent,n.push(t);for(var i=n.length;e!==r;)n.splice(i,0,e),e=e.parent;return n},ancestors:function(){for(var e=this,t=[e];e=e.parent;)t.push(e);return t},descendants:function(){return Array.from(this)},leaves:function(){var e=[];return this.eachBefore((function(t){t.children||e.push(t)})),e},links:function(){var e=this,t=[];return e.each((function(r){r!==e&&t.push({source:r.parent,target:r})})),t},copy:function(){return c(this).eachBefore(d)},[Symbol.iterator]:function*(){var e,t,r,n,i=this,s=[i];do{for(e=s.reverse(),s=[];i=e.pop();)if(yield i,t=i.children)for(r=0,n=t.length;r<n;++r)s.push(t[r])}while(s.length)}},v.prototype=Object.create(h.prototype);const z=/on[A-Z]/;function w(e){for(var t=arguments.length,r=new Array(t>1?t-1:0),n=1;n<t;n++)r[n-1]=arguments[n];const i=Object.keys(e).filter((t=>z.test(t)&&"function"==typeof e[t])).reduce(((t,n)=>(t[n]=function(e,t){return r=>e(r,...t)}(e[n],r),t)),{});return{...e,...i}}function P(e){const t=w(e.pathProps,e.source.data[e.keyProp],e.target.data[e.keyProp]),r=e.pathFunc(e.x1,e.y1,e.x2,e.y2);return o.createElement("path",(0,n.A)({},t,{d:r}))}function R(e){let t=.5,r=e.nodeProps;switch(e.shape){case"circle":r={r:5,...r},t+=r.r;break;case"image":case"rect":r={height:10,width:10,...r},r={x:-r.width/2,y:-r.height/2,...r},t+=r.width/2}"rtl"===e.direction&&(t=-t);const i=w(r,e[e.keyProp]),s=w(e.gProps,e[e.keyProp]),a=w(e.textProps,e[e.keyProp]),c="string"==typeof e[e.labelProp]?o.createElement("text",(0,n.A)({dx:t,dy:5},a),e[e.labelProp]):o.createElement("g",(0,n.A)({transform:`translate(${t}, 5)`},a),e[e.labelProp]);return o.createElement("g",(0,n.A)({},s,{transform:`translate(${e.x}, ${e.y})`,direction:"rtl"===e.direction?"rtl":null}),o.createElement(e.shape,i),c)}function x(e){return o.createElement("svg",(0,n.A)({},e.svgProps,{height:e.height,width:e.width}),e.children,o.createElement("g",{transform:`translate(${e.margins.left}, ${e.margins.top})`},e.links.map((t=>o.createElement(P,{key:t.target.data[e.keyProp],keyProp:e.keyProp,pathFunc:e.pathFunc,source:t.source,target:t.target,x1:t.source.x,x2:t.target.x,y1:t.source.y,y2:t.target.y,pathProps:{...e.pathProps,...t.target.data.pathProps}}))),e.nodes.map((t=>o.createElement(R,(0,n.A)({key:t.data[e.keyProp],keyProp:e.keyProp,labelProp:e.labelProp,direction:e.direction,shape:e.nodeShape,x:t.x,y:t.y},t.data,{nodeProps:{...e.nodeProps,...t.data.nodeProps},gProps:{...e.gProps,...t.data.gProps},textProps:{...e.textProps,...t.data.textProps}}))))))}function E(e){const t=e.nodes[0].x,r=e.nodes[0].y,[i,s]=(0,o.useState)({nodes:e.nodes.map((e=>({...e,x:t,y:r}))),links:e.links.map((e=>({source:{...e.source,x:t,y:r},target:{...e.target,x:t,y:r}})))}),[a,c]=(0,o.useState)(null);function l(t,r,n){let i=t;for(;i;){let t=n.nodes.find((e=>u(i,e)));if(t)return t;i=r.nodes.find((t=>(e.getChildren(t)||[]).some((e=>u(i,e)))))}return n.nodes[0]}function u(t,r){return t.data[e.keyProp]===r.data[e.keyProp]}function d(t,r){return t.source.data[e.keyProp]===r.source.data[e.keyProp]&&t.target.data[e.keyProp]===r.target.data[e.keyProp]}function p(t,r,n){return t+(r-t)*e.easing(n)}return(0,o.useEffect)((function(){clearInterval(a);let t=0;const r=function(e,t){const r=t.nodes.filter((t=>e.nodes.every((e=>!u(t,e))))).map((r=>({base:r,old:l(r,t,e),new:r}))),n=t.nodes.filter((t=>e.nodes.some((e=>u(t,e))))).map((t=>({base:t,old:e.nodes.find((e=>u(t,e))),new:t}))),i=e.nodes.filter((e=>t.nodes.every((t=>!u(e,t))))).map((r=>({base:r,old:r,new:l(r,e,t)}))),s=t.links.filter((t=>e.links.every((e=>!d(t,e))))).map((r=>({base:r,old:l(r.target,t,e),new:r}))),o=t.links.filter((t=>e.links.some((e=>d(t,e))))).map((t=>({base:t,old:e.links.find((e=>d(t,e))),new:t}))),a=e.links.filter((e=>t.links.every((t=>!d(e,t))))).map((r=>({base:r,old:r,new:l(r.target,e,t)})));return{nodes:n.concat(r).concat(i),links:o.concat(s).concat(a)}}(i,e),n=setInterval((()=>{if(t++,t===e.steps)return clearInterval(n),void s({nodes:e.nodes,links:e.links});s(function(e,t){return{nodes:e.nodes.map((e=>function(e,t,r,n){return{...e,x:p(t.x,r.x,n),y:p(t.y,r.y,n)}}(e.base,e.old,e.new,t))),links:e.links.map((e=>function(e,t,r,n){return{source:{...e.source,x:p(t.source?t.source.x:t.x,r.source?r.source.x:r.x,n),y:p(t.source?t.source.y:t.y,r.source?r.source.y:r.y,n)},target:{...e.target,x:p(t.target?t.target.x:t.x,r.target?r.target.x:r.x,n),y:p(t.target?t.target.y:t.y,r.target?r.target.y:r.y,n)}}}(e.base,e.old,e.new,t)))}}(r,t/e.steps))}),e.duration/e.steps);return c(n),()=>clearInterval(a)}),[e.nodes,e.links]),o.createElement(x,(0,n.A)({},e,i))}function S(e){return o.createElement(E,(0,n.A)({duration:e.duration,easing:e.easing,getChildren:e.getChildren,direction:e.direction,height:e.height,keyProp:e.keyProp,labelProp:e.labelProp,nodeShape:e.nodeShape,nodeProps:e.nodeProps,pathFunc:e.pathFunc,steps:e.steps,width:e.width,gProps:{className:"node",...e.gProps},pathProps:{className:"link",...e.pathProps},svgProps:e.svgProps,textProps:e.textProps},function(e){const t=e.margins||{bottom:10,left:"rtl"!==e.direction?20:150,right:"rtl"!==e.direction?150:20,top:10},r=e.width-t.left-t.right,n=e.height-t.top-t.bottom,i=c(e.data,e.getChildren),s=b().size([n,r])(i);return{links:s.links().map((t=>({...t,source:{...t.source,x:"rtl"!==e.direction?t.source.y:r-t.source.y,y:t.source.x},target:{...t.target,x:"rtl"!==e.direction?t.target.y:r-t.target.y,y:t.target.x}}))),margins:t,nodes:s.descendants().map((t=>({...t,x:"rtl"!==e.direction?t.y:r-t.y,y:t.x})))}}(e)),e.children)}P.propTypes={source:s().object.isRequired,target:s().object.isRequired,keyProp:s().string.isRequired,x1:s().number.isRequired,x2:s().number.isRequired,y1:s().number.isRequired,y2:s().number.isRequired,pathFunc:s().func.isRequired,pathProps:s().object.isRequired},P.defaultProps={pathFunc:function(e,t,r,n){return`M${e},${t}C${(e+r)/2},${t} ${(e+r)/2},${n} ${r},${n}`}},R.propTypes={x:s().number.isRequired,y:s().number.isRequired,keyProp:s().string.isRequired,labelProp:s().string.isRequired,direction:s().oneOf(["ltr","rtl"]).isRequired,shape:s().string.isRequired,nodeProps:s().object.isRequired,gProps:s().object.isRequired,textProps:s().object.isRequired},x.propTypes={children:s().node,direction:s().oneOf(["ltr","rtl"]).isRequired,height:s().number.isRequired,keyProp:s().string.isRequired,labelProp:s().string.isRequired,links:s().array.isRequired,margins:s().shape({left:s().number.isRequired,top:s().number.isRequired}).isRequired,nodes:s().array.isRequired,nodeClassName:s().string,nodeShape:s().string.isRequired,nodeProps:s().object.isRequired,pathFunc:s().func,width:s().number.isRequired,gProps:s().object.isRequired,pathProps:s().object.isRequired,svgProps:s().object.isRequired,textProps:s().object.isRequired},E.propTypes={getChildren:s().func.isRequired,keyProp:s().string.isRequired,links:s().array.isRequired,nodes:s().array.isRequired,duration:s().number.isRequired,easing:s().func.isRequired,steps:s().number.isRequired},S.propTypes={data:s().object.isRequired,children:s().node,direction:s().oneOf(["ltr","rtl"]).isRequired,duration:s().number.isRequired,easing:s().func.isRequired,steps:s().number.isRequired,height:s().number.isRequired,width:s().number.isRequired,keyProp:s().string.isRequired,labelProp:s().string.isRequired,getChildren:s().func.isRequired,margins:s().shape({bottom:s().number.isRequired,left:s().number.isRequired,right:s().number.isRequired,top:s().number.isRequired}),pathFunc:s().func,nodeShape:s().oneOf(["circle","image","polygon","rect"]).isRequired,nodeProps:s().object.isRequired,gProps:s().object.isRequired,pathProps:s().object.isRequired,svgProps:s().object.isRequired,textProps:s().object.isRequired},S.defaultProps={direction:"ltr",duration:500,easing:function(e){return e*(2-e)},getChildren:e=>e.children,steps:20,keyProp:"name",labelProp:"name",nodeShape:"circle",nodeProps:{},gProps:{},pathProps:{},svgProps:{},textProps:{}}},8507:(e,t,r)=>{r.d(t,{Ay:()=>p});var n=r(2822);let i;i="undefined"!=typeof window?window:"undefined"!=typeof self?self:r.g;let s=null,o=null;const a=i.clearTimeout,c=i.setTimeout,l=i.cancelAnimationFrame||i.mozCancelAnimationFrame||i.webkitCancelAnimationFrame,u=i.requestAnimationFrame||i.mozRequestAnimationFrame||i.webkitRequestAnimationFrame;function d(e){let t,r,n,a,c,l,u;const d="undefined"!=typeof document&&document.attachEvent;if(!d){l=function(e){const t=e.__resizeTriggers__,r=t.firstElementChild,n=t.lastElementChild,i=r.firstElementChild;n.scrollLeft=n.scrollWidth,n.scrollTop=n.scrollHeight,i.style.width=r.offsetWidth+1+"px",i.style.height=r.offsetHeight+1+"px",r.scrollLeft=r.scrollWidth,r.scrollTop=r.scrollHeight},c=function(e){return e.offsetWidth!==e.__resizeLast__.width||e.offsetHeight!==e.__resizeLast__.height},u=function(e){if(e.target.className&&"function"==typeof e.target.className.indexOf&&e.target.className.indexOf("contract-trigger")<0&&e.target.className.indexOf("expand-trigger")<0)return;const t=this;l(this),this.__resizeRAF__&&s(this.__resizeRAF__),this.__resizeRAF__=o((function(){c(t)&&(t.__resizeLast__.width=t.offsetWidth,t.__resizeLast__.height=t.offsetHeight,t.__resizeListeners__.forEach((function(r){r.call(t,e)})))}))};let e=!1,i="";n="animationstart";const d="Webkit Moz O ms".split(" ");let p="webkitAnimationStart animationstart oAnimationStart MSAnimationStart".split(" "),h="";{const t=document.createElement("fakeelement");if(void 0!==t.style.animationName&&(e=!0),!1===e)for(let r=0;r<d.length;r++)if(void 0!==t.style[d[r]+"AnimationName"]){h=d[r],i="-"+h.toLowerCase()+"-",n=p[r],e=!0;break}}r="resizeanim",t="@"+i+"keyframes "+r+" { from { opacity: 0; } to { opacity: 0; } } ",a=i+"animation: 1ms "+r+"; "}return{addResizeListener:function(s,o){if(d)s.attachEvent("onresize",o);else{if(!s.__resizeTriggers__){const o=s.ownerDocument,c=i.getComputedStyle(s);c&&"static"===c.position&&(s.style.position="relative"),function(r){if(!r.getElementById("detectElementResize")){const n=(t||"")+".resize-triggers { "+(a||"")+'visibility: hidden; opacity: 0; } .resize-triggers, .resize-triggers > div, .contract-trigger:before { content: " "; display: block; position: absolute; top: 0; left: 0; height: 100%; width: 100%; overflow: hidden; z-index: -1; } .resize-triggers > div { background: #eee; overflow: auto; } .contract-trigger:before { width: 200%; height: 200%; }',i=r.head||r.getElementsByTagName("head")[0],s=r.createElement("style");s.id="detectElementResize",s.type="text/css",null!=e&&s.setAttribute("nonce",e),s.styleSheet?s.styleSheet.cssText=n:s.appendChild(r.createTextNode(n)),i.appendChild(s)}}(o),s.__resizeLast__={},s.__resizeListeners__=[],(s.__resizeTriggers__=o.createElement("div")).className="resize-triggers";const d=o.createElement("div");d.className="expand-trigger",d.appendChild(o.createElement("div"));const p=o.createElement("div");p.className="contract-trigger",s.__resizeTriggers__.appendChild(d),s.__resizeTriggers__.appendChild(p),s.appendChild(s.__resizeTriggers__),l(s),s.addEventListener("scroll",u,!0),n&&(s.__resizeTriggers__.__animationListener__=function(e){e.animationName===r&&l(s)},s.__resizeTriggers__.addEventListener(n,s.__resizeTriggers__.__animationListener__))}s.__resizeListeners__.push(o)}},removeResizeListener:function(e,t){if(d)e.detachEvent("onresize",t);else if(e.__resizeListeners__.splice(e.__resizeListeners__.indexOf(t),1),!e.__resizeListeners__.length){e.removeEventListener("scroll",u,!0),e.__resizeTriggers__.__animationListener__&&(e.__resizeTriggers__.removeEventListener(n,e.__resizeTriggers__.__animationListener__),e.__resizeTriggers__.__animationListener__=null);try{e.__resizeTriggers__=!e.removeChild(e.__resizeTriggers__)}catch(r){}}}}}null==l||null==u?(s=a,o=function(e){return c(e,20)}):(s=function([e,t]){l(e),a(t)},o=function(e){const t=u((function(){a(r),e()})),r=c((function(){l(t),e()}),20);return[t,r]});class p extends n.Component{constructor(...e){super(...e),this.state={height:this.props.defaultHeight||0,scaledHeight:this.props.defaultHeight||0,scaledWidth:this.props.defaultWidth||0,width:this.props.defaultWidth||0},this._autoSizer=null,this._detectElementResize=null,this._parentNode=null,this._resizeObserver=null,this._timeoutId=null,this._onResize=()=>{this._timeoutId=null;const{disableHeight:e,disableWidth:t,onResize:r}=this.props;if(this._parentNode){const n=window.getComputedStyle(this._parentNode)||{},i=parseFloat(n.paddingLeft||"0"),s=parseFloat(n.paddingRight||"0"),o=parseFloat(n.paddingTop||"0"),a=parseFloat(n.paddingBottom||"0"),c=this._parentNode.getBoundingClientRect(),l=c.height-o-a,u=c.width-i-s,d=this._parentNode.offsetHeight-o-a,p=this._parentNode.offsetWidth-i-s;(e||this.state.height===d&&this.state.scaledHeight===l)&&(t||this.state.width===p&&this.state.scaledWidth===u)||(this.setState({height:d,width:p,scaledHeight:l,scaledWidth:u}),"function"==typeof r&&r({height:d,scaledHeight:l,scaledWidth:u,width:p}))}},this._setRef=e=>{this._autoSizer=e}}componentDidMount(){const{nonce:e}=this.props;this._autoSizer&&this._autoSizer.parentNode&&this._autoSizer.parentNode.ownerDocument&&this._autoSizer.parentNode.ownerDocument.defaultView&&this._autoSizer.parentNode instanceof this._autoSizer.parentNode.ownerDocument.defaultView.HTMLElement&&(this._parentNode=this._autoSizer.parentNode,null!=this._parentNode&&("undefined"!=typeof ResizeObserver?(this._resizeObserver=new ResizeObserver((()=>{this._timeoutId=setTimeout(this._onResize,0)})),this._resizeObserver.observe(this._parentNode)):(this._detectElementResize=d(e),this._detectElementResize.addResizeListener(this._parentNode,this._onResize)),this._onResize()))}componentWillUnmount(){this._parentNode&&(this._detectElementResize&&this._detectElementResize.removeResizeListener(this._parentNode,this._onResize),null!==this._timeoutId&&clearTimeout(this._timeoutId),this._resizeObserver&&(this._resizeObserver.observe(this._parentNode),this._resizeObserver.disconnect()))}render(){const{children:e,defaultHeight:t,defaultWidth:r,disableHeight:i=!1,disableWidth:s=!1,nonce:o,onResize:a,style:c={},tagName:l="div",...u}=this.props,{height:d,scaledHeight:p,scaledWidth:h,width:f}=this.state,g={overflow:"visible"},m={};let y=!1;return i||(0===d&&(y=!0),g.height=0,m.height=d,m.scaledHeight=p),s||(0===f&&(y=!0),g.width=0,m.width=f,m.scaledWidth=h),(0,n.createElement)(l,{ref:this._setRef,style:{...g,...c},...u},!y&&e(m))}}},1937:(e,t,r)=>{var n=r(2822);var i="function"==typeof Object.is?Object.is:function(e,t){return e===t&&(0!==e||1/e==1/t)||e!=e&&t!=t},s=n.useState,o=n.useEffect,a=n.useLayoutEffect,c=n.useDebugValue;function l(e){var t=e.getSnapshot;e=e.value;try{var r=t();return!i(e,r)}catch(n){return!0}}var u="undefined"==typeof window||void 0===window.document||void 0===window.document.createElement?function(e,t){return t()}:function(e,t){var r=t(),n=s({inst:{value:r,getSnapshot:t}}),i=n[0].inst,u=n[1];return a((function(){i.value=r,i.getSnapshot=t,l(i)&&u({inst:i})}),[e,r,t]),o((function(){return l(i)&&u({inst:i}),e((function(){l(i)&&u({inst:i})}))}),[e]),c(r),r};t.useSyncExternalStore=void 0!==n.useSyncExternalStore?n.useSyncExternalStore:u},8734:(e,t,r)=>{var n=r(2822),i=r(4450);var s="function"==typeof Object.is?Object.is:function(e,t){return e===t&&(0!==e||1/e==1/t)||e!=e&&t!=t},o=i.useSyncExternalStore,a=n.useRef,c=n.useEffect,l=n.useMemo,u=n.useDebugValue;t.useSyncExternalStoreWithSelector=function(e,t,r,n,i){var d=a(null);if(null===d.current){var p={hasValue:!1,value:null};d.current=p}else p=d.current;d=l((function(){function e(e){if(!c){if(c=!0,o=e,e=n(e),void 0!==i&&p.hasValue){var t=p.value;if(i(t,e))return a=t}return a=e}if(t=a,s(o,e))return t;var r=n(e);return void 0!==i&&i(t,r)?t:(o=e,a=r)}var o,a,c=!1,l=void 0===r?null:r;return[function(){return e(t())},null===l?void 0:function(){return e(l())}]}),[t,r,n,i]);var h=o(e,d[0],d[1]);return c((function(){p.hasValue=!0,p.value=h}),[h]),u(h),h}},4450:(e,t,r)=>{e.exports=r(1937)},1148:(e,t,r)=>{e.exports=r(8734)},8476:(e,t,r)=>{r.d(t,{k:()=>i});const n=[];for(let s=0;s<256;++s)n.push((s+256).toString(16).slice(1));function i(e,t=0){return n[e[t+0]]+n[e[t+1]]+n[e[t+2]]+n[e[t+3]]+"-"+n[e[t+4]]+n[e[t+5]]+"-"+n[e[t+6]]+n[e[t+7]]+"-"+n[e[t+8]]+n[e[t+9]]+"-"+n[e[t+10]]+n[e[t+11]]+n[e[t+12]]+n[e[t+13]]+n[e[t+14]]+n[e[t+15]]}},9221:(e,t,r)=>{r.d(t,{A:()=>c});const n={randomUUID:"undefined"!=typeof crypto&&crypto.randomUUID&&crypto.randomUUID.bind(crypto)};let i;const s=new Uint8Array(16);function o(){if(!i&&(i="undefined"!=typeof crypto&&crypto.getRandomValues&&crypto.getRandomValues.bind(crypto),!i))throw new Error("crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported");return i(s)}var a=r(8476);const c=function(e,t,r){if(n.randomUUID&&!t&&!e)return n.randomUUID();const i=(e=e||{}).random||(e.rng||o)();if(i[6]=15&i[6]|64,i[8]=63&i[8]|128,t){r=r||0;for(let e=0;e<16;++e)t[r+e]=i[e];return t}return(0,a.k)(i)}},1663:(e,t,r)=>{r.d(t,{vt:()=>p});const n=e=>{let t;const r=new Set,n=(e,n)=>{const i="function"==typeof e?e(t):e;if(!Object.is(i,t)){const e=t;t=(null!=n?n:"object"!=typeof i||null===i)?i:Object.assign({},t,i),r.forEach((r=>r(t,e)))}},i=()=>t,s={setState:n,getState:i,getInitialState:()=>o,subscribe:e=>(r.add(e),()=>r.delete(e)),destroy:()=>{console.warn("[DEPRECATED] The `destroy` method will be unsupported in a future version. Instead use unsubscribe function returned by subscribe. Everything will be garbage-collected if store is garbage-collected."),r.clear()}},o=t=e(n,i,s);return s},i=e=>e?n(e):n;var s=r(2822),o=r(1148);const{useDebugValue:a}=s,{useSyncExternalStoreWithSelector:c}=o;let l=!1;const u=e=>e;const d=e=>{"function"!=typeof e&&console.warn("[DEPRECATED] Passing a vanilla store will be unsupported in a future version. Instead use `import { useStore } from 'zustand'`.");const t="function"==typeof e?i(e):e,r=(e,r)=>function(e,t=u,r){r&&!l&&(console.warn("[DEPRECATED] Use `createWithEqualityFn` instead of `create` or use `useStoreWithEqualityFn` instead of `useStore`. They can be imported from 'zustand/traditional'. https://github.com/pmndrs/zustand/discussions/1937"),l=!0);const n=c(e.subscribe,e.getState,e.getServerState||e.getInitialState,t,r);return a(n),n}(t,e,r);return Object.assign(r,t),r},p=e=>e?d(e):d}}]);