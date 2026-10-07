function renderCustomers() {
  const q = norm(document.getElementById("saCustSearch").value);
  const rows = customers.filter((c) => norm(c.name + c.email + c.city).includes(q));
  document.getElementById("saCustomers").innerHTML = rows.length
    ? rows
        .map(
          (c, i) => `<tr style="--i:${i}"><td><div class="sa-user"><span class="sa-avatar">${initials(c.name)}</span><div><span class="fw-medium">${c.name}</span><small>${c.email}</small></div></div></td>
      <td>${c.city}</td><td class="text-end sa-num">${c.orders}</td><td class="text-end sa-num fw-semibold">${rupiah(c.spent)}</td>
      <td class="text-body-secondary">${c.since}</td></tr>`,
        )
        .join("")
    : emptyRow(5, "Pelanggan tidak ditemukan");
  document.getElementById("saCustCount").textContent = `${rows.length} pelanggan`;
}
document.getElementById("saCustSearch").addEventListener("input", renderCustomers);
renderCustomers();
