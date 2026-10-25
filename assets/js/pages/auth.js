/* ---- Halaman auth: validasi, tampil/sembunyi kata sandi, kekuatan kata sandi ---- */
/* Mode demo: belum ada backend, jadi semua form hanya mensimulasikan hasilnya. */

/* Tampilkan / sembunyikan kata sandi */
document.querySelectorAll("[data-toggle-password]").forEach((btn) => {
  const input = document.getElementById(btn.dataset.togglePassword);
  btn.addEventListener("click", () => {
    const show = input.type === "password";
    input.type = show ? "text" : "password";
    btn.textContent = show ? "Sembunyi" : "Lihat";
    btn.setAttribute("aria-pressed", show);
    btn.setAttribute("aria-label", show ? "Sembunyikan kata sandi" : "Tampilkan kata sandi");
  });
});

/* Kekuatan kata sandi (hanya di halaman daftar) */
const pwInput = document.getElementById("password");
const pwBar = document.getElementById("pwBar");
const pwText = document.getElementById("pwText");
const confirmInput = document.getElementById("confirm");
const pwLevels = [
  { label: "Kekuatan kata sandi", cls: "" },
  { label: "Lemah", cls: "lvl-1" },
  { label: "Cukup", cls: "lvl-2" },
  { label: "Kuat", cls: "lvl-3" },
  { label: "Sangat kuat", cls: "lvl-4" },
];
function pwScore(v) {
  if (!v) return 0;
  let s = 0;
  if (v.length >= 6) s++;
  if (v.length >= 10) s++;
  if (/[a-z]/.test(v) && /[A-Z]/.test(v)) s++;
  if (/\d/.test(v) && /[^A-Za-z0-9]/.test(v)) s++;
  return Math.max(s, 1);
}
function syncConfirm() {
  if (!confirmInput) return;
  confirmInput.setCustomValidity(confirmInput.value && confirmInput.value !== pwInput.value ? "Kata sandi tidak sama" : "");
}
if (pwBar) {
  pwInput.addEventListener("input", () => {
    const lvl = pwLevels[pwScore(pwInput.value)];
    pwBar.className = lvl.cls;
    pwText.textContent = lvl.label;
    syncConfirm();
  });
}
if (confirmInput) confirmInput.addEventListener("input", syncConfirm);

/* Submit form */
function setLoading(form, on) {
  const btn = form.querySelector(".sa-submit");
  btn.disabled = on;
  btn.querySelector(".spinner-border").hidden = !on;
}
const swalOpts = { customClass: { popup: "sa-swal", confirmButton: "btn btn-primary" }, buttonsStyling: false };

document.querySelectorAll("form[data-auth]").forEach((form) => {
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    syncConfirm();
    form.classList.add("was-validated");
    if (!form.checkValidity()) {
      form.querySelector(":invalid")?.focus();
      return;
    }
    setLoading(form, true);
    setTimeout(() => {
      setLoading(form, false);
      const kind = form.dataset.auth;
      if (kind === "login") {
        showToast("Berhasil masuk. Mengalihkan…");
        setTimeout(() => (location.href = saRoot + "index.html"), 900);
      } else if (kind === "register") {
        Swal.fire({ ...swalOpts, icon: "success", title: "Akun berhasil dibuat", text: "Silakan masuk dengan akun baru Anda.", confirmButtonText: "Masuk" }).then(
          () => (location.href = "login.html"),
        );
      } else {
        const email = form.querySelector("#email").value;
        Swal.fire({ ...swalOpts, icon: "success", title: "Periksa email Anda", text: `Tautan reset kata sandi dikirim ke ${email}.`, confirmButtonText: "Mengerti" }).then(() => form.reset());
        form.classList.remove("was-validated");
      }
    }, 800);
  });
});

/* Login / daftar dengan penyedia sosial (simulasi; sambungkan ke OAuth di backend) */
document.querySelectorAll("[data-provider]").forEach((btn) => {
  btn.addEventListener("click", () => {
    const provider = btn.dataset.provider;
    const all = document.querySelectorAll("[data-provider]");
    all.forEach((b) => (b.disabled = true));
    showToast(`Menghubungkan ke ${provider}…`, "info");
    setTimeout(() => {
      showToast(`Berhasil masuk dengan ${provider}`);
      setTimeout(() => (location.href = saRoot + "index.html"), 800);
    }, 1000);
  });
});
