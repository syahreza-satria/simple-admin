/* Perilaku kerangka aplikasi (topbar & sidebar). Tidak dimuat di halaman auth. */

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
