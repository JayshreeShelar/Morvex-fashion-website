const NAV = [["Home", "index.html"], ["Men", "men.html"], ["Women", "women.html"], ["Kids", "kids.html"], ["Collections", "collections.html"], ["Sale", "sale.html"], ["About", "about.html"], ["Contact", "contact.html"]];
/* ===== WhatsApp orders: apla number ithe taka (country code sobat, + ani space shivay) ===== */
const WA_NUMBER = "919876543210";
const waLink = m => "https://wa.me/" + WA_NUMBER + "?text=" + encodeURIComponent(m);
function sendWA(m, fallbackEl) { const u = waLink(m); if (fallbackEl) fallbackEl.href = u; const w = window.open(u, "_blank"); if (!w) location.href = u }
const wishIds = () => { try { return JSON.parse(localStorage.getItem("mvx-wish") || "[]") } catch (e) { return [] } };
const isWished = id => wishIds().includes(+id);
const HEART = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1-1.1a5.5 5.5 0 0 0-7.8 7.8l1 1.1L12 21.2l7.8-7.7 1-1.1a5.5 5.5 0 0 0 0-7.8z"/></svg>';
function wishBadge() { const n = wishIds().length, b = document.getElementById("wish-count"); if (b) { b.textContent = n; b.classList.toggle("hidden", !n) } }
function toggleWish(id, btn) {
    id = +id; const w = wishIds(), i = w.indexOf(id), on = i < 0; on ? w.push(id) : w.splice(i, 1); try { localStorage.setItem("mvx-wish", JSON.stringify(w)) } catch (e) { }
    document.querySelectorAll('[data-wish="' + id + '"]').forEach(b => { b.classList.toggle("wished", on); b.setAttribute("aria-pressed", on); b.classList.remove("pop"); void b.offsetWidth; b.classList.add("pop") });
    wishBadge(); toast(on ? "Saved to wishlist" : "Removed from wishlist"); if (window.onWish) window.onWish(id, on)
}
const cartCount = () => { try { return JSON.parse(localStorage.getItem("mvx-cart") || "[]").reduce((a, i) => a + i.qty, 0) } catch (e) { return 0 } };
function toast(m) { let t = document.getElementById("toast"); if (!t) { t = document.createElement("div"); t.id = "toast"; t.className = "toast glass"; document.body.appendChild(t) } t.textContent = m; t.classList.add("show"); clearTimeout(t._h); t._h = setTimeout(() => t.classList.remove("show"), 1800) }
const fit = (n, a = "") => `<img class="fitbg" src="assets/${n}.jpg" alt="" aria-hidden="true"><img class="fitimg" src="assets/${n}.jpg" alt="${a}">`;
function hero(o) {
    const im = o.imgs, ch = o.chips || [["truck", "Free shipping ₹1999+"], ["rotate-ccw", "30-day returns"], ["shield-check", "Secure payment"]];
    return `<div class="hero"><img src="assets/${im[0]}.jpg" alt="" class="bg w-full h-full object-cover opacity-30 blur-2xl scale-125"><div class="bg bg-gradient-to-r from-[#141211] via-[#141211]/80 to-[#141211]/30"></div>
<svg class="bg w-full h-full" viewBox="0 0 1200 600" preserveAspectRatio="none" fill="none"><path class="draw" d="M0 500C300 560 520 360 760 160S1100 60 1200 100" stroke="#E8D7C3" stroke-opacity=".4" stroke-width="1.5"/><path class="draw" d="M0 560C340 600 600 440 820 250S1100 150 1200 190" stroke="#B99A72" stroke-opacity=".3"/></svg>
<div class="wrap relative grid lg:grid-cols-[.85fr_1.15fr] gap-10 items-center py-10"><div><p class="rise eyebrow">${o.label}</p><h1 class="rise d1 font-serif text-5xl md:text-7xl leading-[1.02] mt-3">${o.title}</h1><p class="rise d2 mt-5 max-w-md text-[#F4EEE6]/75 leading-relaxed">${o.sub}</p>
<div class="rise d2 mt-7 flex flex-wrap gap-3">${(o.btns || []).map(([t, h, p]) => `<a href="${h}" class="btn ${p ? "btn-p" : ""}">${t}</a>`).join("")}</div>
<div class="rise d3 mt-7 flex flex-wrap gap-2">${ch.map(([i, t]) => `<span class="chip"><i data-lucide="${i}" class="w-3.5 h-3.5 gold"></i>${t}</span>`).join("")}</div>${o.crumb ? `<p class="rise d3 mt-5 text-[11px] text-white/45">${o.crumb}</p>` : ""}</div>
<div class="rise d1 relative"><div class="grid grid-cols-3 gap-3 items-start">${im.map((s, k) => `<div class="fitw glass cell ${k % 2 ? "leaf2" : "leaf"} float" style="animation-delay:${k * 1.3}s;${k == 1 ? "margin-top:2.5rem" : ""}">${fit(s)}</div>`).join("")}</div>
${o.badge ? `<div class="glass float absolute left-1/2 -translate-x-1/2 -bottom-4 rounded-2xl px-5 py-3 text-xs text-center z-10"><b class="block text-sm">${o.badge[0]}</b>${o.badge[1]}</div>` : ""}</div></div>
<a href="#next" class="scroll-ind" aria-label="Scroll down"><i data-lucide="chevrons-down" class="w-6 h-6"></i></a></div>`}
function cta() { return `<section class="sec"><div class="wrap"><div class="reveal glass leaf px-8 py-10 flex flex-wrap items-center justify-between gap-5" style="background:linear-gradient(120deg,rgba(122,31,61,.55),rgba(185,154,114,.18))"><div><h2 class="h2">Shop More. Save More.</h2><p class="text-white/70 mt-1 text-sm">Up to 50% off selected styles. Use WELCOME20 for 20% off your first order.</p></div><a href="sale.html" class="btn btn-p">Shop Sale <i data-lucide="arrow-right" class="w-4 h-4"></i></a></div></div></section>` }
function renderHeader() {
    const here = location.pathname.split("/").pop() || "index.html";
    document.getElementById("site-header").innerHTML = `<div class="bg-[#141211] text-[#E8D7C3] text-[10px] tracking-wide text-center py-1.5 border-b border-white/10 px-2">Free Shipping on Orders Above ₹1999 | Flat 20% OFF on First Order | Use Code: <b class="gold">WELCOME20</b></div>
<header class="bg-[#141211]/70 backdrop-blur-2xl border-b border-white/10"><div class="max-w-7xl mx-auto px-5 h-14 flex items-center justify-between">
<a href="index.html" class="flex items-center gap-2.5"><img src="assets/favicon.svg" alt="" class="w-7 h-7 rounded-lg"><span class="font-serif text-lg tracking-[0.3em] xl:tracking-[0.4em]">MORVEX</span></a>
<nav class="hidden lg:flex gap-4 xl:gap-6 text-[12.5px] xl:text-[13px] whitespace-nowrap text-[#F4EEE6]/80">${NAV.map(([n, h]) => `<a href="${h}" class="nav-link ${h === here ? "active text-[#F4EEE6]" : ""}">${n}</a>`).join("")}</nav>
<div class="flex items-center gap-3 xl:gap-4"><button id="sb" aria-label="Search"><i data-lucide="search" class="w-[18px] h-[18px]"></i></button><a href="contact.html" aria-label="Account"><i data-lucide="user" class="w-[18px] h-[18px]"></i></a><a href="wishlist.html" class="relative" aria-label="Wishlist"><i data-lucide="heart" class="w-[18px] h-[18px]"></i><span id="wish-count" class="hidden absolute -top-2 -right-2 bg-[#E36A86] text-white text-[9px] font-semibold rounded-full w-4 h-4 grid place-items-center">0</span></a>
<a href="cart.html" class="relative" aria-label="Bag"><i data-lucide="shopping-bag" class="w-[18px] h-[18px]"></i><span id="cart-count" class="absolute -top-2 -right-2 bg-[#B99A72] text-[#171717] text-[9px] font-semibold rounded-full w-4 h-4 grid place-items-center">${cartCount()}</span></a><button id="mb" class="lg:hidden" aria-label="Open menu" aria-expanded="false"><i data-lucide="menu" class="w-5 h-5 ic-open"></i><i data-lucide="x" class="w-5 h-5 ic-close hidden"></i></button></div></div>
<div id="sp" class="hidden border-t border-white/10 px-5 py-3"><form id="sf" class="max-w-xl mx-auto flex gap-2"><input id="sq" placeholder="Search blazers, dresses, sherwanis…" class="field !rounded-full !py-2"><button class="btn btn-p btn-sm">Search</button></form></div>
<nav id="mn" class="hidden lg:!hidden px-5 pb-3 flex-col gap-2 text-[#F4EEE6] text-sm">${NAV.map(([n, h]) => `<a href="${h}" class="py-1">${n}</a>`).join("")}</nav></header>`;
    mb.onclick = () => { const o = mn.classList.contains("hidden"); mn.classList.toggle("hidden", !o); mn.classList.toggle("flex", o); mb.querySelector(".ic-open").classList.toggle("hidden", o); mb.querySelector(".ic-close").classList.toggle("hidden", !o); mb.setAttribute("aria-expanded", o); mb.setAttribute("aria-label", o ? "Close menu" : "Open menu") }; sb.onclick = () => { sp.classList.toggle("hidden"); sq.focus() };
    sf.onsubmit = e => { e.preventDefault(); location.href = "collections.html?q=" + encodeURIComponent(sq.value.trim()) }
}
function renderFooter() {
    const L = a => a.map(([t, h]) => `<li><a href="${h}" class="hover:text-[#E8D7C3] transition">${t}</a></li>`).join("");
    document.getElementById("site-footer").innerHTML = `<footer class="border-t border-white/10 bg-black/30 backdrop-blur-xl mt-6"><div class="wrap py-7 grid gap-6 grid-cols-2 lg:grid-cols-[1.5fr_.7fr_.9fr_1.4fr_1.3fr] text-xs text-[#F4EEE6]/65">
<div class="col-span-2 lg:col-span-1"><a href="index.html" class="flex items-center gap-2"><img src="assets/favicon.svg" alt="" class="w-7 h-7 rounded-lg"><span class="font-serif text-lg tracking-[0.4em] text-[#F4EEE6]">MORVEX</span></a><p class="mt-2 leading-relaxed">Elevated essentials for men, women and kids. Quality fabrics, timeless style.</p><div class="flex gap-2 mt-3">${["instagram", "facebook", "youtube", "twitter"].map(i => `<a href="contact.html" aria-label="${i}" class="w-7 h-7 rounded-full glass grid place-items-center hover:bg-[#B99A72] hover:text-[#171717] transition"><i data-lucide="${i}" class="w-3.5 h-3.5"></i></a>`).join("")}</div></div>
<div><h4 class="mb-2 text-sm text-[#F4EEE6]">Shop</h4><ul class="space-y-1">${L([["Men", "men.html"], ["Women", "women.html"], ["Kids", "kids.html"], ["Sale", "sale.html"], ["Wishlist", "wishlist.html"]])}</ul></div>
<div><h4 class="mb-2 text-sm text-[#F4EEE6]">Help</h4><ul class="space-y-1">${L([["Contact Us", "contact.html"], ["FAQs", "contact.html#faq"], ["Returns", "contact.html#faq"], ["About Us", "about.html"]])}</ul></div>
<div class="col-span-2 lg:col-span-1"><h4 class="mb-2 text-sm text-[#F4EEE6]">Contact</h4><ul class="space-y-1"><li class="flex gap-2"><i data-lucide="map-pin" class="w-3.5 h-3.5 gold shrink-0"></i>12 Heritage Lane, Koregaon Park, Pune - 411001</li><li class="flex gap-2"><i data-lucide="phone" class="w-3.5 h-3.5 gold shrink-0"></i>+91 98765 43210</li><li class="flex gap-2"><i data-lucide="mail" class="w-3.5 h-3.5 gold shrink-0"></i>care@morvex.com</li></ul></div>
<div class="col-span-2 lg:col-span-1"><h4 class="mb-2 text-sm text-[#F4EEE6]">Stay Connected</h4><form id="news" class="flex glass rounded-full overflow-hidden"><input required type="email" placeholder="Enter your email" class="bg-transparent px-4 py-2 text-xs text-[#F4EEE6] placeholder:text-white/40 w-full outline-none"><button class="px-4 hover:bg-[#B99A72] hover:text-[#171717] transition" aria-label="Subscribe"><i data-lucide="arrow-right" class="w-4 h-4"></i></button></form><p class="mt-2">Mon-Sat 10 AM - 8 PM</p></div></div>
<div class="border-t border-white/10"><div class="wrap py-2.5 flex justify-between items-center flex-wrap gap-2 text-[11px] text-[#F4EEE6]/50"><span>© 2026 MORVEX. All Rights Reserved.</span><span class="flex gap-1.5">${["UPI", "Visa", "Mastercard", "COD"].map(p => `<b class="glass rounded px-2 font-normal">${p}</b>`).join("")}</span><span>Privacy Policy | Terms & Conditions</span></div></div></footer>`;
    news.onsubmit = e => { e.preventDefault(); e.target.innerHTML = '<span class="px-4 py-2 text-xs">Thanks for subscribing. Use WELCOME20 at checkout.</span>' }
}
function count(el) { const end = +el.dataset.count, dec = el.dataset.dec, suf = el.dataset.suf || ""; let s = null; const f = t => { s = s || t; const p = Math.min((t - s) / 1500, 1), v = end * (1 - Math.pow(1 - p, 3)); el.textContent = (dec ? v.toFixed(1) : Math.round(v).toLocaleString("en-IN")) + suf; if (p < 1) requestAnimationFrame(f) }; requestAnimationFrame(f) }
function initFx() {
    const io = "IntersectionObserver" in window ? new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); if (e.target.dataset.count) count(e.target) } }), { threshold: .12 }) : null;
    document.querySelectorAll(".reveal:not(.in),[data-count]").forEach(el => { if (io) io.observe(el); else { el.classList.add("in"); if (el.dataset.count) count(el) } })
}
document.addEventListener("DOMContentLoaded", () => { renderHeader(); wishBadge(); renderFooter(); initFx(); lucide.createIcons() });

(function () {
    const rm = matchMedia("(prefers-reduced-motion:reduce)").matches, fine = matchMedia("(hover:hover) and (pointer:fine)").matches;

    document.addEventListener("DOMContentLoaded", () => {
        const bar = document.createElement("div"); bar.className = "sprog"; document.body.appendChild(bar);
        const up = document.createElement("button"); up.className = "totop glass"; up.setAttribute("aria-label", "Back to top"); up.innerHTML = '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 19V5M5 12l7-7 7 7"/></svg>'; up.onclick = () => scrollTo({ top: 0, behavior: "smooth" }); document.body.appendChild(up);
        const hd = document.getElementById("site-header"); let tk = false;
        const on = () => { const y = scrollY, m = document.documentElement.scrollHeight - innerHeight; bar.style.transform = "scaleX(" + (m > 0 ? y / m : 0) + ")"; hd && hd.classList.toggle("scrolled", y > 40); up.classList.toggle("show", y > 600); tk = false };
        addEventListener("scroll", () => { if (!tk) { tk = true; requestAnimationFrame(on) } }, { passive: true }); on();
        if (fine && !rm) {
            const g = document.createElement("div"); g.className = "cglow"; document.body.appendChild(g);
            addEventListener("pointermove", e => { g.style.opacity = 1; g.style.transform = "translate(" + e.clientX + "px," + e.clientY + "px)" }, { passive: true }); document.addEventListener("pointerleave", () => g.style.opacity = 0);
            document.addEventListener("pointermove", e => { const t = e.target.closest && e.target.closest(".pcard,.tile"); if (!t) return; const r = t.getBoundingClientRect(), x = (e.clientX - r.left) / r.width - .5, y = (e.clientY - r.top) / r.height - .5; t.style.setProperty("--ry", (x * 8).toFixed(2) + "deg"); t.style.setProperty("--rx", (-y * 8).toFixed(2) + "deg") }, { passive: true });
            document.addEventListener("pointerout", e => { const t = e.target.closest && e.target.closest(".pcard,.tile"); if (t && !t.contains(e.relatedTarget)) { t.style.setProperty("--rx", "0deg"); t.style.setProperty("--ry", "0deg") } })
        }
        document.addEventListener("click", e => { const a = e.target.closest && e.target.closest("a[href]"); if (!a || e.defaultPrevented || e.metaKey || e.ctrlKey || e.shiftKey || a.target || rm) return; const u = new URL(a.href, location.href); if (u.origin !== location.origin || !/\.html$/.test(u.pathname) || (u.pathname === location.pathname && u.search === location.search)) return; e.preventDefault(); document.body.classList.add("leaving"); setTimeout(() => location.href = a.href, 320) });
        addEventListener("pageshow", e => { if (e.persisted) document.body.classList.remove("leaving") })
    });
})();
