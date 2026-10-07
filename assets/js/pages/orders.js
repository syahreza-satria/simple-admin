let ordFilter = "all";
function renderAllOrders() {
  const q = norm(document.getElementById("saOrdSearch").value);
  const rows = allOrders.filter((o) => (ordFilter === "all" || o.status === ordFilter) && norm(o.id + " " + o.name).includes(q));
  document.getElementById("saOrdersAll").innerHTML = rows.length
    ? rows
        .map(
          (o, i) => `<tr style="--i:${i}"><td><span class="sa-id">#${o.id}</span></td><td class="fw-medium">${o.name}</td>
      <td class="text-body-secondary">${o.date}</td><td><span class="sa-status sa-st-${o.status}">${statusLabel[o.status]}</span></td>
      <td class="text-end sa-num fw-semibold">${rupiah(o.total)}</td></tr>`,
        )
        .join("")
    : emptyRow(5, "Tidak ada pesanan yang cocok");
  document.getElementById("saOrdCount").textContent = `Menampilkan ${rows.length} dari ${allOrders.length} pesanan`;
}
document.querySelectorAll("#saOrdFilter [data-filter]").forEach((btn) =>
  btn.addEventListener("click", () => {
    document.querySelectorAll("#saOrdFilter .nav-link").forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
    ordFilter = btn.dataset.filter;
    renderAllOrders();
  }),
);
document.getElementById("saOrdSearch").addEventListener("input", renderAllOrders);
renderAllOrders();
