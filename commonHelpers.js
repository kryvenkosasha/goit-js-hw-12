import{S as w,a as b,i as d}from"./assets/vendor-5401a4b0.js";(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))a(t);new MutationObserver(t=>{for(const n of t)if(n.type==="childList")for(const l of n.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&a(l)}).observe(document,{childList:!0,subtree:!0});function o(t){const n={};return t.integrity&&(n.integrity=t.integrity),t.referrerPolicy&&(n.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?n.credentials="include":t.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function a(t){if(t.ep)return;t.ep=!0;const n=o(t);fetch(t.href,n)}})();const s={searchForm:document.querySelector("form"),searchInput:document.querySelector("input"),searchButton:document.querySelector(".search"),gallery:document.querySelector(".images"),loader:document.querySelector(".loader"),loadMore:document.querySelector(".load-more")};let i,c=1,f;u();g();const p=new w(".images a");s.loadMore.addEventListener("click",async e=>{e.preventDefault(),c+=1,m();const r=await h(i,c);y(r),u(),p.refresh();let a=document.querySelector("li").getBoundingClientRect();window.scrollBy({top:a.height*2,left:0,behavior:"smooth"}),console.log(a),L()});s.gallery.addEventListener("click",e=>{e.target!==e.currentTarget&&e.preventDefault()});s.searchForm.addEventListener("submit",async e=>{if(e.preventDefault(),i=e.target.elements.input.value,i!==""){m();try{const r=await h(i,c);s.gallery.innerHTML="",y(r),p.refresh()}catch(r){console.log(r)}finally{u()}}});function m(){s.loader.style.display="block"}function u(){s.loader.style.display="none"}async function h(e,r){const o=`https://pixabay.com/api/?key=42312276-5bc23f4af127c6565aecd0d27&q=${e}`,a={q:`${e}`,image_type:"photo",orientation:"horizontal",safesearch:!0,page:r,per_page:15};r=1;const t=await b.get(o,{params:a});return f=Math.ceil(t.data.totalHits/15),L(),t.data}function v(e){if(e.hits.length===0){d.show({message:"За запитом нічого не знайдено",color:"red"});return}return e.hits.map(o=>`<li><a href=${o.largeImageURL} ><img src=${o.webformatURL}></a>
  <p>Tags: ${o.tags} </p>
  <p>Likes: ${o.likes} </p>
  <p>Views: ${o.views} </p>
  <p>Comments: ${o.comments} </p>
  <p>Downloads: ${o.downloads} </p>
  </li>`).join(`
`)}function y(e){if(e.hits.length===0){d.show({message:"За запитом нічого не знайдено",color:"red"});return}const r=v(e);s.gallery.insertAdjacentHTML("beforeend",r)}function S(){s.loadMore.classList.remove("hidden")}function g(){s.loadMore.classList.add("hidden")}function L(){c===f?(g(),d.show({message:"This are all photos",color:"blue"})):S()}
//# sourceMappingURL=commonHelpers.js.map