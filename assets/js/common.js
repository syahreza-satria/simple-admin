const statusLabel = { paid: "Lunas", pending: "Menunggu", process: "Diproses", failed: "Gagal" };
const rupiah = (n) => "Rp " + n.toLocaleString("id-ID");

/* ---- Toast & aksi umum ---- */
/* ---- Alert (SweetAlert2): toast untuk info singkat, dialog untuk konfirmasi ---- */
const saToast = Swal.mixin({
  toast: true,
  position: "bottom-end",
  showConfirmButton: false,
  showCloseButton: true,
  timer: 3000,
  timerProgressBar: true,
  customClass: { popup: "sa-swal-toast" },
});
function showToast(text, icon = "success") {
  saToast.fire({ icon, title: text });
}
function confirmDialog({ title, text, confirmText = "Ya", cancelText = "Batal", icon = "question" }) {
  return Swal.fire({
    title,
    text,
    icon,
    showCancelButton: true,
    confirmButtonText: confirmText,
    cancelButtonText: cancelText,
    reverseButtons: true,
    focusCancel: true,
    customClass: { popup: "sa-swal", confirmButton: "btn btn-primary", cancelButton: "btn btn-light" },
    buttonsStyling: false,
  }).then((r) => r.isConfirmed);
}
document.addEventListener("click", (e) => {
  if (!e.target.closest("[data-logout]")) return;
  e.preventDefault();
  confirmDialog({ title: "Keluar dari akun?", text: "Anda perlu masuk lagi untuk mengakses dashboard.", confirmText: "Keluar" }).then(
    (ok) => ok && showToast("Anda telah keluar (demo)", "info"),
  );
});
document.addEventListener("click", (e) => {
  const t = e.target.closest("[data-toast]");
  if (t) showToast(t.dataset.toast);
});
document.querySelectorAll("[data-toast-form]").forEach((f) =>
  f.addEventListener("submit", (e) => {
    e.preventDefault();
    showToast(f.dataset.toastForm);
  }),
);
document.getElementById("saSearchForm").addEventListener("submit", (e) => e.preventDefault());

/* ---- Shortcut "/" untuk fokus ke pencarian ---- */
document.addEventListener("keydown", (e) => {
  if (e.key === "/" && !/input|textarea|select/i.test(document.activeElement.tagName)) {
    e.preventDefault();
    document.getElementById("saSearch").focus();
  }
});

/* ---- Mode gelap ---- */
const themeBtn = document.getElementById("saThemeToggle");
function syncThemeBtn() {
  const dark = document.documentElement.getAttribute("data-bs-theme") === "dark";
  themeBtn.setAttribute("aria-pressed", dark);
  themeBtn.setAttribute("aria-label", dark ? "Aktifkan mode terang" : "Aktifkan mode gelap");
}
themeBtn.addEventListener("click", () => {
  const next = document.documentElement.getAttribute("data-bs-theme") === "dark" ? "light" : "dark";
  document.documentElement.setAttribute("data-bs-theme", next);
  try {
    localStorage.setItem("sa-theme", next);
  } catch (e) {}
  syncThemeBtn();
  document.dispatchEvent(new Event("themechange"));
});
syncThemeBtn();

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

/* ---- Data halaman lain (ganti dengan data dari API Anda) ---- */
const initials = (n) =>
  n
    .split(" ")
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();
const norm = (t) => t.toLowerCase();
const emptyRow = (cols, text) => `<tr><td colspan="${cols}" class="sa-empty">${text}</td></tr>`;
