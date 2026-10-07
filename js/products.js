function renderProducts() {
  const q = norm(document.getElementById("saProdSearch").value);
  const cat = document.getElementById("saProdCat").value;
  const rows = products.filter((p) => (cat === "all" || p.cat === cat) && norm(p.name).includes(q));
  document.getElementById("saProducts").innerHTML = rows.length
    ? rows
        .map(
          (p, i) => `<tr style="--i:${i}"><td class="fw-medium">${p.name}</td><td class="text-body-secondary">${p.cat}</td>
      <td class="text-end sa-num">${rupiah(p.price)}</td><td class="text-end sa-num${p.stock < 10 ? " sa-low" : ""}">${p.stock}</td>
      <td><span class="sa-status ${p.active ? "sa-st-paid" : "sa-st-pending"}">${p.active ? "Aktif" : "Draft"}</span></td></tr>`,
        )
        .join("")
    : emptyRow(5, "Produk tidak ditemukan");
  document.getElementById("saProdCount").textContent = `${rows.length} produk`;
}
document.getElementById("saProdSearch").addEventListener("input", renderProducts);
document.getElementById("saProdCat").addEventListener("change", renderProducts);
renderProducts();

/* ---- Form tambah produk (modal) ---- */
document.getElementById("saProductForm").addEventListener("submit", (e) => {
  e.preventDefault();
  bootstrap.Modal.getInstance(document.getElementById("saModal")).hide();
  const name = document.getElementById("pName").value;
  products.unshift({
    name,
    cat: document.getElementById("pCat").value,
    price: +document.getElementById("pPrice").value,
    stock: +document.getElementById("pStock").value,
    active: document.getElementById("pActive").checked,
  });
  renderProducts();
  showToast(`“${name}” disimpan`);
});
