const cards=document.getElementById("cards"),search=document.getElementById("search"),empty=document.getElementById("empty");
let category="Tất cả";
const safe=s=>String(s??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
const isUrl=s=>{try{let u=new URL(s);return ["https:","http:"].includes(u.protocol)}catch{return false}};
function render(){
 const all=window.PORTAL_APPS||[],q=search.value.trim().toLocaleLowerCase("vi");
 const list=all.filter(a=>(category==="Tất cả"||a.category===category)&&[a.name,a.desc,a.category].join(" ").toLocaleLowerCase("vi").includes(q));
 cards.innerHTML=list.map(a=>{let live=isUrl(a.appUrl);return `<article class="card">
 <div class="card-top"><div class="app-icon ${safe(a.tone)}">${safe(a.icon)}</div><span class="status ${live?"live":"pending"}"><i></i>${live?"Đã kết nối":(a.reserved?"Vị trí dự phòng":"Chưa kết nối")}</span></div>
 <div class="category">${safe(a.category)}</div><h3>${safe(a.name)}</h3><p>${safe(a.desc)}</p>
 ${live?`<a class="open-link" href="${safe(a.appUrl)}" target="_blank" rel="noopener">Mở phần mềm <b>↗</b></a>`:`<span class="open-link disabled">${a.reserved?"Chờ bổ sung phần mềm":"Chưa có địa chỉ triển khai"} <b>—</b></span>`}
 </article>`}).join("");
 empty.hidden=list.length>0;
 document.getElementById("appCount").textContent=String(all.length).padStart(2,"0");
 document.getElementById("readyCount").textContent=String(all.filter(a=>isUrl(a.appUrl)).length).padStart(2,"0");
}
search.addEventListener("input",render);
document.getElementById("filters").addEventListener("click",e=>{let b=e.target.closest("[data-filter]");if(!b)return;category=b.dataset.filter;document.querySelectorAll(".filter").forEach(x=>x.classList.toggle("active",x===b));render()});
const nav=document.getElementById("nav"),menu=document.getElementById("menuBtn");
menu.addEventListener("click",()=>{let open=nav.classList.toggle("open");menu.textContent=open?"×":"☰";menu.setAttribute("aria-expanded",String(open))});
nav.querySelectorAll("a").forEach(a=>a.addEventListener("click",()=>{nav.classList.remove("open");menu.textContent="☰"}));
if("serviceWorker"in navigator&&location.protocol.startsWith("http"))addEventListener("load",()=>navigator.serviceWorker.register("./sw.js").catch(()=>{}));
render();