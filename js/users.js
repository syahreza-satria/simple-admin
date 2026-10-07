function renderUsers() {
  const q = norm(document.getElementById("saUserSearch").value);
  const rows = users.filter((u) => norm(u.name + u.email).includes(q));
  document.getElementById("saUsers").innerHTML = rows.length
    ? rows
        .map((u, n) => {
          const i = users.indexOf(u);
          return `<tr style="--i:${n}"><td><div class="sa-user"><span class="sa-avatar">${initials(u.name)}</span><div><span class="fw-medium">${u.name}</span><small>${u.email}</small></div></div></td>
      <td><select class="form-select form-select-sm sa-role" data-u="${i}" aria-label="Peran ${u.name}">${roles.map((r) => `<option${r === u.role ? " selected" : ""}>${r}</option>`).join("")}</select></td>
      <td><span class="sa-status ${u.active ? "sa-st-paid" : "sa-st-pending"}">${u.active ? "Aktif" : "Nonaktif"}</span></td>
      <td class="text-body-secondary">${u.last}</td></tr>`;
        })
        .join("")
    : emptyRow(4, "Pengguna tidak ditemukan");
  document.getElementById("saUserCount").textContent = `${rows.length} pengguna`;
}
document.getElementById("saUserSearch").addEventListener("input", renderUsers);
document.getElementById("saUsers").addEventListener("change", (e) => {
  const sel = e.target.closest("[data-u]");
  if (!sel) return;
  users[+sel.dataset.u].role = sel.value;
  showToast(`Peran ${users[+sel.dataset.u].name} diubah menjadi ${sel.value}`);
});
renderUsers();
