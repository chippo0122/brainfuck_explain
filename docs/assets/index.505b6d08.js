import{j as y,r as c,R as N,a as k}from"./vendor.60abbf7e.js";const I=function(){const n=document.createElement("link").relList;if(n&&n.supports&&n.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))s(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const o of t.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&s(o)}).observe(document,{childList:!0,subtree:!0});function a(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerpolicy&&(t.referrerPolicy=e.referrerpolicy),e.crossorigin==="use-credentials"?t.credentials="include":e.crossorigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function s(e){if(e.ep)return;e.ep=!0;const t=a(e);fetch(e.href,t)}};I();const r=y.exports.jsx,f=y.exports.jsxs;function A(i){const{slots:n,currentIndex:a}=i,[s,e]=c.exports.useState(0),t=c.exports.useRef(),o=()=>{const l=t.current.children[0].offsetWidth;e(l)};return c.exports.useEffect(()=>(o(),window.addEventListener("resize",o),()=>{window.removeEventListener("resize",o)}),[]),f("div",{ref:t,className:"slots d-flex justify-content-center mx-auto mt-5 position-relative",children:[n.map((l,d)=>r("div",{className:"slot border border-light",children:r("p",{className:"text-light fs-1 text-center m-0",children:l})},d)),r("div",{style:{width:`${s}px`,transform:`translateX(${s*a}px)`},className:"pointer display-3 text-light text-center position-absolute",children:"\u2191"})]})}function L(i){const{setSlots:n,setIndex:a,currentIndex:s,slots:e}=i,[t,o]=c.exports.useState(!1),[l,d]=c.exports.useState(""),[p,m]=c.exports.useState("+++"),[b,g]=c.exports.useState(""),w=u=>{switch(u){case"+":const h=[...e];h[s]++,n(h);break;case"-":const x=[...e];x[s]--,n(x);break;case">":const S=s+1;a(S);break;case"<":const v=s-1;a(v);break;case"[":o(!0),d("[");break;case"]":o(!1),e[s]>0?m(`${l}${p}`):d("");break;case".":const C=b+String.fromCharCode(e[s]);g(C);break}};return f("div",{className:"input-area",children:[f("span",{className:"output text-warning fs-5 mb-3",children:["OUTPUT : ",b,r("span",{className:"bg-warning cursor"})]}),f("div",{className:"form-floating",children:[r("textarea",{onChange:u=>{m(u.target.value)},value:p,className:"form-control code-input",id:"codeInput"}),r("label",{className:"text-light",htmlFor:"codeInput",children:"Code Here"})]}),r("button",{onClick:()=>{if(p.length>0){const u=p.charAt(0),h=p.slice(1);if(m(h),w(u),t){const x=l+u;d(x)}}},className:"btn btn-primary my-3",children:"Execute Step by Step"}),r("button",{onClick:()=>{o(!1),d(""),m(""),g(""),a(0),n(new Array(10).fill(0))},className:"btn btn-outline-warning ms-3 my-3",children:"CLEAR"})]})}function O(){const[i,n]=c.exports.useState(new Array(10).fill(0)),[a,s]=c.exports.useState(0);return f("div",{className:"App p-5 bg-dark",children:[r("h1",{className:"text-light text-center display-3",children:"Brainf*ck Explainer"}),r(A,{slots:i,currentIndex:a}),r(L,{setSlots:n,setIndex:s,slots:i,currentIndex:a})]})}N.render(r(k.StrictMode,{children:r(O,{})}),document.getElementById("root"));