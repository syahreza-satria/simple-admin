/* ---- Halaman error (404, 500, maintenance) ---- */

/* 404: tampilkan alamat yang dicari */
const missingPath = document.getElementById("saMissingPath");
if (missingPath && location.pathname && !/\/404\.html$/.test(location.pathname)) {
  missingPath.textContent = decodeURIComponent(location.pathname) + location.search;
}

document.getElementById("saGoBack")?.addEventListener("click", () => {
  if (history.length > 1) history.back();
  else location.href = saRoot + "index.html";
});

/* 500 dan maintenance: tombol muat ulang */
document.querySelectorAll("[data-reload]").forEach((b) => b.addEventListener("click", () => location.reload()));
