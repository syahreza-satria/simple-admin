/* Akar proyek sebagai URL, dipakai untuk redirect dari halaman mana pun */
const saRoot = document.currentScript.src.replace(/assets\/js\/common\.js.*$/, "");

const statusLabel = { paid: "Lunas", pending: "Menunggu", process: "Diproses", failed: "Gagal" };
const rupiah = (n) => "Rp " + n.toLocaleString("id-ID");

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
  const t = e.target.closest("[data-toast]");
  if (t) showToast(t.dataset.toast);
});
document.querySelectorAll("[data-toast-form]").forEach((f) =>
  f.addEventListener("submit", (e) => {
    e.preventDefault();
    showToast(f.dataset.toastForm);
  }),
);

/* ---- Mode gelap ---- */
const themeBtn = document.getElementById("saThemeToggle");
function syncThemeBtn() {
  if (!themeBtn) return;
  const dark = document.documentElement.getAttribute("data-bs-theme") === "dark";
  themeBtn.setAttribute("aria-pressed", dark);
  themeBtn.setAttribute("aria-label", dark ? "Aktifkan mode terang" : "Aktifkan mode gelap");
}
themeBtn?.addEventListener("click", () => {
  const next = document.documentElement.getAttribute("data-bs-theme") === "dark" ? "light" : "dark";
  document.documentElement.setAttribute("data-bs-theme", next);
  try {
    localStorage.setItem("sa-theme", next);
  } catch (e) {}
  syncThemeBtn();
  document.dispatchEvent(new Event("themechange"));
});
syncThemeBtn();

/* ---- Helper umum ---- */
const initials = (n) =>
  n
    .split(" ")
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();
const norm = (t) => t.toLowerCase();
const emptyRow = (cols, text) => `<tr><td colspan="${cols}" class="sa-empty">${text}</td></tr>`;
