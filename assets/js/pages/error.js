/* ---- Halaman 404 ---- */
const missingPath = document.getElementById("saMissingPath");
if (location.pathname && !/\/404\.html$/.test(location.pathname)) {
  missingPath.textContent = decodeURIComponent(location.pathname) + location.search;
}

document.getElementById("saGoBack").addEventListener("click", () => {
  if (history.length > 1) history.back();
  else location.href = saRoot + "index.html";
});
