import{S as m,a as y,i as u}from"./assets/vendor-5401a4b0.js";(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))a(t);new MutationObserver(t=>{for(const n of t)if(n.type==="childList")for(const l of n.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&a(l)}).observe(document,{childList:!0,subtree:!0});function o(t){const n={};return t.integrity&&(n.integrity=t.integrity),t.referrerPolicy&&(n.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?n.credentials="include":t.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function a(t){if(t.ep)return;t.ep=!0;const n=o(t);fetch(t.href,n)}})();const s={searchForm:document.querySelector("form"),searchInput:document.querySelector("input"),searchButton:document.querySelector(".search"),gallery:document.querySelector(".images"),loader:document.querySelector(".loader"),loadMore:document.querySelector(".load-more")};let c,i=1;d();const h=new m(".images a");s.loadMore.addEventListener("click",async e=>{e.preventDefault(),i+=1,console.log(i);const r=await p(c,i);f(r)});s.gallery.addEventListener("click",e=>{e.target!==e.currentTarget&&e.preventDefault()});s.searchForm.addEventListener("submit",async e=>{if(e.preventDefault(),c=e.target.elements.input.value,c!==""){g();try{const r=await p(c,i);s.gallery.innerHTML="",f(r),h.refresh()}catch(r){console.log(r)}finally{d()}}});function g(){s.loader.style.display="block"}function d(){s.loader.style.display="none"}async function p(e,r){const o=`https://pixabay.com/api/?key=42312276-5bc23f4af127c6565aecd0d27&q=${e}`,a={q:`${e}`,image_type:"photo",orientation:"horizontal",safesearch:!0,page:r,per_page:15};return r=1,(await y.get(o,{options:a})).data}function L(e){if(e.hits.length===0){u.show({message:"За запитом нічого не знайдено",color:"red"});return}return e.hits.map(o=>`<li><a href=${o.largeImageURL} ><img src=${o.webformatURL}></a>
  <p>Tags: ${o.tags} </p>
  <p>Likes: ${o.likes} </p>
  <p>Views: ${o.views} </p>
  <p>Comments: ${o.comments} </p>
  <p>Downloads: ${o.downloads} </p>
  </li>`).join(`
`)}function f(e){if(e.hits.length===0){u.show({message:"За запитом нічого не знайдено",color:"red"});return}const r=L(e);s.gallery.insertAdjacentHTML("afterbegin",r)}
//# sourceMappingURL=commonHelpers.js.map
