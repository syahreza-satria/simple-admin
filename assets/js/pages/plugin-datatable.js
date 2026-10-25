/* ---- Halaman Plugin › Tabel data: contoh yang sama persis dengan kode yang ditampilkan ---- */

const productTable = saDataTable(document.getElementById("exDt"), {
  rows: products,
  label: "Daftar produk",
  rowId: (p) => p.name,
  pageSize: 5,
  selectable: true,
  csvName: "produk.csv",
  search: (p) => `${p.name} ${p.cat}`,
  columns: [
    { key: "name", label: "Produk", className: "fw-medium" },
    { key: "cat", label: "Kategori", className: "text-body-secondary" },
    { key: "price", label: "Harga", align: "end", className: "sa-num", render: (p) => rupiah(p.price) },
    { key: "stock", label: "Stok", align: "end", render: (p) => `<span class="sa-num${p.stock < 10 ? " sa-low" : ""}">${p.stock}</span>` },
    {
      key: "active",
      label: "Status",
      render: (p) => `<span class="sa-status ${p.active ? "sa-st-paid" : "sa-st-pending"}">${p.active ? "Aktif" : "Draft"}</span>`,
      csv: (p) => (p.active ? "Aktif" : "Draft"),
    },
  ],
  bulkActions: [{ text: "Arsipkan", action: (rows, table) => (table.clearSelection(), showToast(`${rows.length} produk diarsipkan`)) }],
});
document.getElementById("exDtSearch").addEventListener("input", (e) => productTable.setQuery(e.target.value));
