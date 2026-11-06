const cards=document.getElementById("cards");
const safe=s=>String(s??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
const STORAGE_KEY="oanhSonPortalAppsV1";
const icons={
 users:`<svg viewBox="0 0 64 64" aria-hidden="true"><circle cx="32" cy="19" r="9"/><circle cx="13" cy="25" r="7"/><circle cx="51" cy="25" r="7"/><path d="M14 51c0-10 7-17 18-17s18 7 18 17v3H14z"/><path d="M2 51c0-8 4-13 11-14m49 14c0-8-4-13-11-14"/></svg>`,
 handshake:`<svg viewBox="0 0 64 64" aria-hidden="true"><path d="M5 24 17 12l12 5 7-2 11-3 12 12-8 9-8-5-9 9c-3 3-7-1-5-4l6-7-7 6c-3 3-7-1-4-4l6-6-8 6c-3 2-7-2-4-5l6-5-8-3-9 9z"/><path d="m17 12-8 9 10 10 8-8m18-11 10 11-8 9-9-7"/></svg>`,
 package:`<svg viewBox="0 0 64 64" aria-hidden="true"><path d="m8 20 24-12 24 12v27L32 59 8 47z"/><path d="m8 20 24 13 24-13M32 33v26M20 14l24 13M44 14 20 27"/></svg>`,
 tree:`<svg viewBox="0 0 64 64" aria-hidden="true"><path d="M29 56V37h7v19M32 8c-8 0-13 7-11 14-8 1-11 12-4 17 3 2 7 2 10 0 2 6 11 8 16 3 7 1 12-5 10-11 5-7 0-16-8-16-2-8-8-12-13-7z"/></svg>`,
 cards:`<svg viewBox="0 0 64 64" aria-hidden="true"><rect x="8" y="12" width="29" height="40" rx="4" transform="rotate(-12 8 12)"/><rect x="27" y="7" width="29" height="40" rx="4"/><path d="M42 17c-5-6-12 1 0 11 12-10 5-17 0-11z"/><path d="M17 24h8m-4-4v8"/></svg>`
};
const defaults=Array.isArray(window.PORTAL_APPS)?window.PORTAL_APPS:[];
let apps=loadApps();
// Tự điền link ORDER HABECO nếu trình duyệt đã lưu cấu hình cũ còn để trống.
const orderMenu=apps.find(a=>String(a.name||"").trim().toUpperCase()==="ORDER HABECO");
if(orderMenu&&!orderMenu.appUrl)orderMenu.appUrl="https://nguyendinhkien-giapha.github.io/he-thong-dat-hang-habeco/?utm_source=chatgpt.com";
function loadApps(){
 try{const saved=localStorage.getItem(STORAGE_KEY);if(saved){const parsed=JSON.parse(saved);if(Array.isArray(parsed))return parsed;}}catch(e){}
 return defaults.map(a=>({...a}));
}
function saveLocal(){localStorage.setItem(STORAGE_KEY,JSON.stringify(apps));}
function render(){
 cards.innerHTML=apps.map(a=>{
   const action=a.appUrl
    ? `<a class="tile-action" href="${safe(a.appUrl)}" target="_blank" rel="noopener" aria-label="Mở ${safe(a.name)}"><span>MỞ PHẦN MỀM</span><b>›</b></a>`
    : `<div class="tile-action pending"><span>ĐANG CHỜ KẾT NỐI</span><b>…</b></div>`;
   return `<article class="tile ${safe(a.tone)}">
     <div class="tile-head"><div class="tile-icon">${icons[a.icon]||icons.users}</div><h3>${safe(a.name)}</h3></div>
     <div class="tile-body"><p>${safe(a.desc)}</p>${action}</div>
   </article>`;
 }).join("");
}
const panel=document.getElementById("adminPanel");
const rows=document.getElementById("editorRows");
const note=document.getElementById("adminNote");
const iconOptions=[["users","Nhân sự"],["handshake","Bắt tay"],["package","Hộp hàng"],["tree","Cây gia phả"],["cards","Bài / Game"]];
const toneOptions=[["blue","Xanh dương"],["green","Xanh lá"],["gold","Vàng"],["red","Đỏ"],["purple","Tím"]];
function selectOptions(options,value){return options.map(([v,label])=>`<option value="${v}" ${v===value?"selected":""}>${label}</option>`).join("");}
function renderEditor(){
 rows.innerHTML=apps.map((a,i)=>`
 <article class="editor-row" data-index="${i}">
  <div class="editor-row-top"><strong>Ứng dụng ${i+1}</strong><div class="move-controls">
   <button type="button" data-action="up" ${i===0?"disabled":""} aria-label="Chuyển lên">↑</button>
   <button type="button" data-action="down" ${i===apps.length-1?"disabled":""} aria-label="Chuyển xuống">↓</button>
   <button type="button" data-action="delete" class="delete-app">Xóa</button>
  </div></div>
  <div class="editor-fields">
   <label>Tên menu<input data-field="name" value="${safe(a.name)}" maxlength="60" placeholder="Tên ứng dụng"></label>
   <label>Mô tả<input data-field="desc" value="${safe(a.desc)}" maxlength="140" placeholder="Mô tả ngắn"></label>
   <label>Đường dẫn mở ứng dụng<input data-field="appUrl" value="${safe(a.appUrl||"")}" placeholder="https://..."></label>
   <label>Biểu tượng<select data-field="icon">${selectOptions(iconOptions,a.icon)}</select></label>
   <label>Màu sắc<select data-field="tone">${selectOptions(toneOptions,a.tone)}</select></label>
  </div>
 </article>`).join("");
}
function setNote(message){note.textContent=message;}
document.getElementById("adminToggle").addEventListener("click",()=>{
 const open=panel.hidden;panel.hidden=!open;document.getElementById("adminToggle").setAttribute("aria-expanded",String(open));
 if(open)renderEditor();
});
function closeEditor(){panel.hidden=true;document.getElementById("adminToggle").setAttribute("aria-expanded","false");}
document.getElementById("adminClose").addEventListener("click",closeEditor);
rows.addEventListener("input",e=>{
 const field=e.target.dataset.field;if(!field)return;
 const row=e.target.closest(".editor-row");apps[Number(row.dataset.index)][field]=e.target.value;render();
});
rows.addEventListener("change",e=>{
 const field=e.target.dataset.field;if(!field)return;
 const row=e.target.closest(".editor-row");apps[Number(row.dataset.index)][field]=e.target.value;render();
});
rows.addEventListener("click",e=>{
 const action=e.target.dataset.action;if(!action)return;
 const row=e.target.closest(".editor-row");const i=Number(row.dataset.index);
 if(action==="delete"){if(!confirm(`Xóa menu "${apps[i].name}"?`))return;apps.splice(i,1);}
 if(action==="up"&&i>0)[apps[i-1],apps[i]]=[apps[i],apps[i-1]];
 if(action==="down"&&i<apps.length-1)[apps[i+1],apps[i]]=[apps[i],apps[i+1]];
 renderEditor();render();
});
document.getElementById("addApp").addEventListener("click",()=>{
 apps.push({name:"ỨNG DỤNG MỚI",desc:"Nhập mô tả ứng dụng.",icon:"users",tone:"blue",appUrl:""});
 renderEditor();renderEditor();
});
document.getElementById("saveApps").addEventListener("click",()=>{
 try{saveLocal();render();setNote("Đã lưu thay đổi trên trình duyệt và thiết bị này.");}
 catch(e){setNote("Không lưu được. Hãy kiểm tra dung lượng lưu trữ trình duyệt.");}
});
document.getElementById("exportApps").addEventListener("click",()=>{
 const blob=new Blob([JSON.stringify(apps,null,2)],{type:"application/json"});
 const url=URL.createObjectURL(blob);const a=document.createElement("a");a.href=url;a.download="oanh-son-menu-backup.json";a.click();URL.revokeObjectURL(url);setNote("Đã tạo bản sao lưu JSON.");
});
document.getElementById("importApps").addEventListener("change",async e=>{
 const file=e.target.files?.[0];if(!file)return;
 try{const parsed=JSON.parse(await file.text());if(!Array.isArray(parsed))throw new Error("invalid");
  apps=parsed.map(a=>({name:String(a.name||"ỨNG DỤNG MỚI"),desc:String(a.desc||""),icon:iconOptions.some(x=>x[0]===a.icon)?a.icon:"users",tone:toneOptions.some(x=>x[0]===a.tone)?a.tone:"blue",appUrl:String(a.appUrl||"")}));
  renderEditor();render();saveLocal();setNote("Đã khôi phục danh sách menu từ JSON.");
 }catch(err){setNote("File JSON không hợp lệ hoặc không đúng định dạng sao lưu.");}
 e.target.value="";
});
render();
