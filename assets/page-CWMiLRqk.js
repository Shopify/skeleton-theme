import{c as _,g as x}from"./cart-CmG_L9o1.js";function q(t){return t.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#039;")}function $(t,c){try{return new Intl.NumberFormat(void 0,{style:"currency",currency:c}).format(t/100)}catch{return`${(t/100).toFixed(2)} ${c}`}}function A(t){return t.image??t.featured_image?.url??null}function I(t){return t.product_title??t.title??"Product"}function U(t){return t.final_line_price??t.line_price??0}function N(){const t=document.querySelector('[data-js="cart-page"]');if(!t)return;const c=t.querySelector('[data-js="cart-page-items"]'),g=t.querySelector('[data-js="cart-page-empty"]'),f=t.querySelector('[data-js="cart-page-footer"]'),y=t.querySelector('[data-js="cart-page-subtotal"]'),m=t.querySelector('[data-js="cart-page-status"]'),b=t.querySelector('[data-js="cart-page-error"]'),S=document.querySelectorAll('[data-js="cart-count"]');if(!c||!g||!f||!y||!m||!b)return;const w="/cart";let u=!1;const l=e=>{m.textContent=e},d=e=>{b.textContent=e},j=e=>{t.setAttribute("aria-busy",String(e)),t.querySelectorAll("button").forEach(n=>{n.type!=="submit"&&(n.disabled=e)})},h=e=>{const n=e.currency||t.dataset.currency||"USD",r=e.item_count>0;if(S.forEach(a=>{a.textContent=String(e.item_count),a.hidden=e.item_count<1}),g.hidden=r,c.hidden=!r,f.hidden=!r,y.textContent=$(e.total_price,n),!r){c.innerHTML="",l("Your cart is empty.");return}c.innerHTML=e.items.map((a,o)=>{const i=A(a),s=q(I(a)),v=a.variant_title?q(a.variant_title):"";return`
          <li class="grid grid-cols-[80px_1fr] gap-3 border-b pb-3" data-line="${o+1}">
            <a href="${a.url}" class="block h-20 w-20 overflow-hidden border">
              ${i?`<img src="${i}" alt="${s}" class="h-full w-full object-cover">`:""}
            </a>
            <div class="space-y-2">
              <a href="${a.url}" class="font-medium">${s}</a>
              ${v?`<p class="text-sm opacity-70">${v}</p>`:""}
              <div class="flex items-center gap-2">
                <button type="button" data-js="cart-page-dec" data-line="${o+1}" class="h-8 w-8 border" aria-label="Decrease quantity">-</button>
                <span data-js="cart-page-qty" class="min-w-6 text-center">${a.quantity}</span>
                <button type="button" data-js="cart-page-inc" data-line="${o+1}" class="h-8 w-8 border" aria-label="Increase quantity">+</button>
                <button type="button" data-js="cart-page-remove" data-line="${o+1}" class="ml-auto underline">Remove</button>
              </div>
              <p>${$(U(a),n)}</p>
            </div>
          </li>
        `}).join("")},C=async()=>{try{const e=await x();h(e)}catch{d("Could not load cart data. Reloading..."),window.location.assign(w)}},p=async(e,n)=>{if(!u){u=!0,j(!0),d(""),l("Updating cart...");try{const r=await _(e,n);h(r),l(n===0?"Item removed.":"Cart updated.")}catch{d("Could not update cart. Please try again."),l("Cart update failed.")}finally{u=!1,j(!1)}}};t.addEventListener("click",e=>{const r=e.target.closest('[data-js="cart-page-dec"], [data-js="cart-page-inc"], [data-js="cart-page-remove"]');if(!r)return;const a=Number(r.dataset.line);if(!a)return;const i=c.querySelector(`[data-line="${a}"]`)?.querySelector('[data-js="cart-page-qty"]'),s=Number(i?.textContent??"1");if(r.dataset.js==="cart-page-remove"){p(a,0);return}if(r.dataset.js==="cart-page-inc"){p(a,s+1);return}r.dataset.js==="cart-page-dec"&&p(a,Math.max(0,s-1))}),C()}export{N as i};
