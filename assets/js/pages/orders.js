/* ---- Halaman Pesanan: tabel data dengan filter status, pencarian, sort, paginasi, dan ekspor ---- */
let ordFilter = "all";

const ordersTable = saDataTable(document.getElementById("saOrdersTable"), {
  rows: allOrders,
  label: "Daftar pesanan",
  rowId: (o) => o.id,
  pageSize: 5,
  selectable: true,
  csvName: "pesanan.csv",
  empty: "Tidak ada pesanan yang cocok",
  search: (o) => `${o.id} ${o.name}`,
  filter: (o) => ordFilter === "all" || o.status === ordFilter,
  sort: { key: "id", dir: "desc" },
  columns: [
    { key: "id", label: "No. Pesanan", render: (o) => `<a class="sa-id text-decoration-none" href="order-detail.html?id=${encodeURIComponent(o.id)}">#${escapeHtml(o.id)}</a>` },
    { key: "name", label: "Pelanggan", className: "fw-medium" },
    { key: "date", label: "Tanggal", sortValue: (o) => o.id, className: "text-body-secondary" },
    { key: "status", label: "Status", render: (o) => `<span class="sa-status sa-st-${o.status}">${statusLabel[o.status]}</span>`, csv: (o) => statusLabel[o.status] },
    { key: "total", label: "Total", align: "end", className: "sa-num fw-semibold", render: (o) => rupiah(o.total) },
  ],
  bulkActions: [
    {
      text: "Tandai lunas",
      action: (rows, table) => {
        rows.forEach((o) => (o.status = "paid"));
        table.clearSelection();
        showToast(`${rows.length} pesanan ditandai lunas`);
      },
    },
  ],
});

document.querySelectorAll("#saOrdFilter [data-filter]").forEach((btn) =>
  btn.addEventListener("click", () => {
    document.querySelectorAll("#saOrdFilter .nav-link").forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
    ordFilter = btn.dataset.filter;
    ordersTable.refresh();
  }),
);
document.getElementById("saOrdSearch").addEventListener("input", (e) => ordersTable.setQuery(e.target.value));
document.getElementById("saOrdExport").addEventListener("click", () => ordersTable.exportCsv());
