/* Kerangka aplikasi: render sidebar dan topbar dari nav.js, lalu perilakunya. Tidak dimuat di halaman auth. */

/* ---- Sidebar: dirender dari konfigurasi di assets/js/nav.js ---- */
const saPath = (href) => new URL(href, location.href).pathname.replace(/index\.html$/, "");
const saHere = saPath(location.href);
const saIsHere = (item) => !!item.href && saPath(saRoot + item.href) === saHere;
const saIcon = (name, cls = "") => (name ? `<i class="bi bi-${name}${cls ? ` ${cls}` : ""}" aria-hidden="true"></i>` : "");

function saNavLink(item, sub) {
  const here = saIsHere(item);
  return `<li><a class="nav-link${here ? " active" : ""}" href="${saRoot}${item.href}"${here ? ' aria-current="page"' : ""}>${
    sub ? "" : saIcon(item.icon)
  }<span>${escapeHtml(item.text)}</span>${item.badge ? `<span class="badge rounded-pill sa-badge">${escapeHtml(item.badge)}</span>` : ""}</a></li>`;
}

function saNavGroup(item, id) {
  const open = item.children.some(saIsHere);
  return `<li><button type="button" class="nav-link sa-nav-toggle${open ? " sa-nav-current" : " collapsed"}" data-bs-toggle="collapse" data-bs-target="#${id}" aria-expanded="${open}" aria-controls="${id}">${saIcon(item.icon)}<span>${escapeHtml(item.text)}</span>${saIcon("chevron-right", "sa-chev")}</button>
    <div class="collapse${open ? " show" : ""}" id="${id}"><ul class="nav flex-column sa-subnav">${item.children.map((c) => saNavLink(c, true)).join("")}</ul></div></li>`;
}

function renderSidebar() {
  const aside = document.getElementById("saSidebar");
  if (!aside || typeof saNav === "undefined") return;
  let n = 0;
  const sections = saNav
    .map(
      (sec) => `<div class="sa-nav-label">${escapeHtml(sec.label)}</div>
      <ul class="nav flex-column gap-1">${sec.items.map((it) => (it.children ? saNavGroup(it, `saNavGroup${n++}`) : saNavLink(it))).join("")}</ul>`,
    )
    .join("");
  const card = saSidebarCard
    ? `<div class="sa-sidebar-card">
        <div class="sa-sidebar-card-title">${escapeHtml(saSidebarCard.title)}</div>
        <div class="progress" role="progressbar" aria-label="${escapeHtml(saSidebarCard.title)}" aria-valuenow="${saSidebarCard.percent}" aria-valuemin="0" aria-valuemax="100">
          <div class="progress-bar" style="width: ${Number(saSidebarCard.percent)}%"></div>
        </div>
        <div class="sa-sidebar-card-text sa-num">${escapeHtml(saSidebarCard.text)}</div>
      </div>`
    : "";
  aside.innerHTML = `<div class="d-flex flex-column h-100 p-3">
      <div class="d-flex align-items-center justify-content-between px-2 py-1">
        <a href="${saRoot}index.html" class="sa-brand" id="saSidebarLabel"><span class="sa-brand-mark">${saLogo}</span>${escapeHtml(saBrand)}</a>
        <button type="button" class="btn-close d-lg-none" data-bs-dismiss="offcanvas" data-bs-target="#saSidebar" aria-label="Tutup menu"></button>
      </div>
      <nav class="sa-nav flex-grow-1 overflow-auto mt-2" aria-label="Menu utama">${sections}</nav>
      ${card}
    </div>`;
}
renderSidebar();

/* ---- Topbar: dirender dari konfigurasi di assets/js/nav.js ---- */
function renderTopbar() {
  const bar = document.getElementById("saTopbar");
  if (!bar) return;
  const menu = saAccountMenu
    .map((m) =>
      m.divider
        ? `<li><hr class="dropdown-divider" /></li>`
        : m.logout
          ? `<li><a class="dropdown-item sa-text-danger" href="#" data-logout>${escapeHtml(m.text)}</a></li>`
          : `<li><a class="dropdown-item" href="${saRoot}${m.href}">${escapeHtml(m.text)}</a></li>`,
    )
    .join("");
  bar.innerHTML = `<div class="container-fluid px-3 px-lg-4 py-2 d-flex align-items-center gap-2 gap-md-3">
      <button class="btn btn-light sa-icon-btn d-lg-none" type="button" data-bs-toggle="offcanvas" data-bs-target="#saSidebar" aria-controls="saSidebar" aria-label="Buka menu">${saIcon("list")}</button>
      <form class="sa-search position-relative flex-grow-1" role="search" id="saSearchForm">
        ${saIcon("search")}
        <input class="form-control form-control-sm py-2" type="search" id="saSearch" placeholder="${escapeHtml(saSearchPlaceholder)}" aria-label="Cari" />
        <span class="sa-kbd d-none d-md-inline">/</span>
      </form>
      <div class="ms-auto d-flex align-items-center gap-2">
        <div class="dropdown">
          <button class="btn btn-light sa-icon-btn" type="button" id="saNotifBtn" data-bs-toggle="dropdown" data-bs-auto-close="outside" aria-expanded="false" aria-label="Notifikasi">
            ${saIcon("bell")}<span class="sa-dot" id="saNotifDot"></span>
          </button>
          <div class="dropdown-menu dropdown-menu-end sa-notif shadow-sm p-0" aria-labelledby="saNotifBtn">
            <div class="sa-notif-head">
              <strong>Notifikasi <span class="text-body-secondary fw-normal sa-num" id="saNotifCount"></span></strong>
              <button type="button" class="btn btn-link btn-sm p-0 text-decoration-none" id="saNotifReadAll">Tandai semua dibaca</button>
            </div>
            <ul class="sa-notif-list" id="saNotifList"></ul>
            <div class="sa-notif-empty" id="saNotifEmpty" hidden>Tidak ada notifikasi</div>
          </div>
        </div>
        <button class="btn btn-light sa-icon-btn sa-theme-toggle" type="button" id="saThemeToggle" aria-label="Aktifkan mode gelap" aria-pressed="false">
          ${saIcon("sun", "sa-icon-sun")}${saIcon("moon", "sa-icon-moon")}
        </button>
        <div class="dropdown">
          <button class="btn d-flex align-items-center gap-2 p-1 border-0" type="button" data-bs-toggle="dropdown" aria-expanded="false" aria-label="Menu akun">
            <span class="sa-avatar">${escapeHtml(initials(saUser.name))}</span>
            <span class="d-none d-md-block text-start lh-sm">
              <span class="d-block sa-account-name">${escapeHtml(saUser.name)}</span>
              <span class="d-block sa-account-role">${escapeHtml(saUser.role)}</span>
            </span>
          </button>
          <ul class="dropdown-menu dropdown-menu-end shadow-sm">${menu}</ul>
        </div>
      </div>
    </div>`;
  syncThemeBtn();
}
renderTopbar();

/* ---- Keluar akun ---- */
document.addEventListener("click", (e) => {
  if (!e.target.closest("[data-logout]")) return;
  e.preventDefault();
  confirmDialog({ title: "Keluar dari akun?", text: "Anda perlu masuk lagi untuk mengakses dashboard.", confirmText: "Keluar" }).then((ok) => {
    if (!ok) return;
    showToast("Anda telah keluar", "info");
    setTimeout(() => (location.href = saRoot + "pages/auth/login.html"), 800);
  });
});

/* ---- Pencarian topbar ---- */
document.getElementById("saSearchForm").addEventListener("submit", (e) => e.preventDefault());

/* ---- Shortcut "/" untuk fokus ke pencarian ---- */
document.addEventListener("keydown", (e) => {
  if (e.key === "/" && !/input|textarea|select/i.test(document.activeElement.tagName)) {
    e.preventDefault();
    document.getElementById("saSearch").focus();
  }
});

/* ---- Notifikasi ---- */
const notifs = [
  { title: "Pesanan baru #INV-10488", desc: "Putri Ananda memesan 3 item senilai Rp 245.000.", when: "2 menit lalu", unread: true },
  { title: "Pembayaran diterima", desc: "#INV-10486 dibayar via QRIS.", when: "18 menit lalu", unread: true },
  { title: "Stok hampir habis", desc: "Totebag Kanvas tersisa 4 unit.", when: "1 jam lalu", unread: true },
  { title: "Pembayaran gagal", desc: "#INV-10484 gagal diproses oleh bank.", when: "3 jam lalu", unread: false },
  { title: "Pengguna baru", desc: "Ayu Lestari ditambahkan sebagai Editor.", when: "Kemarin", unread: false },
];
const notifList = document.getElementById("saNotifList");
function renderNotifs() {
  const unread = notifs.filter((n) => n.unread).length;
  notifList.innerHTML = notifs
    .map(
      (n, i) => `<li><button type="button" class="sa-notif-item${n.unread ? " unread" : ""}" data-i="${i}">
        <span><span class="t">${n.title}</span><span class="d">${n.desc}</span><span class="w">${n.when}</span></span></button></li>`,
    )
    .join("");
  document.getElementById("saNotifDot").hidden = unread === 0;
  document.getElementById("saNotifCount").textContent = unread ? `(${unread} baru)` : "";
  document.getElementById("saNotifReadAll").hidden = unread === 0;
  document.getElementById("saNotifEmpty").hidden = notifs.length > 0;
  document.getElementById("saNotifBtn").setAttribute("aria-label", unread ? `Notifikasi, ${unread} belum dibaca` : "Notifikasi");
}
notifList.addEventListener("click", (e) => {
  const item = e.target.closest("[data-i]");
  if (!item) return;
  notifs[+item.dataset.i].unread = false;
  renderNotifs();
});
document.getElementById("saNotifReadAll").addEventListener("click", () => {
  notifs.forEach((n) => (n.unread = false));
  renderNotifs();
});
renderNotifs();

/* ---- Animasi buka dropdown topbar (notifikasi & akun) ---- */
document.querySelectorAll(".sa-topbar .dropdown").forEach((dd) => {
  const menu = dd.querySelector(".dropdown-menu");
  const bell = dd.querySelector("#saNotifBtn");
  dd.addEventListener("show.bs.dropdown", () => {
    menu.classList.add("sa-dd-anim");
    if (bell) {
      bell.classList.remove("sa-ringing");
      void bell.offsetWidth; // mulai ulang animasi
      bell.classList.add("sa-ringing");
    }
  });
  dd.addEventListener("shown.bs.dropdown", () => setTimeout(() => menu.classList.remove("sa-dd-anim"), 700));
  dd.addEventListener("hidden.bs.dropdown", () => {
    menu.classList.remove("sa-dd-anim");
    if (bell) bell.classList.remove("sa-ringing");
  });
});
