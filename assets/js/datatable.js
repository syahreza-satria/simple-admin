/* ---- Tabel data: sort, paginasi, pencarian, pilih baris, ekspor CSV ----
   JavaScript murni, tanpa library. Dimuat setelah common.js.

   Pemakaian:
     const table = saDataTable(document.getElementById("myTable"), {
       rows: data,                                   // array objek
       columns: [
         { key: "name", label: "Nama" },
         { key: "price", label: "Harga", align: "end", render: (r) => rupiah(r.price) },
       ],
       search: (r) => r.name,                        // teks yang dicari (opsional)
       pageSize: 5,
       selectable: true,
       rowId: (r) => r.id,
       csvName: "data.csv",
     });
     table.setQuery("kata");  table.refresh();  table.exportCsv();

   Kolom:
     key        nama properti; dipakai untuk sort dan CSV bawaan
     label      teks header
     align      "end" untuk angka (rata kanan)
     sortable   false untuk mematikan sort pada kolom ini
     render     (row) => HTML sel; teks dari data wajib lewat escapeHtml()
     sortValue  (row) => nilai pembanding, bila berbeda dari row[key]
     csv        (row) => nilai di file CSV, bila berbeda dari row[key]
     className  kelas tambahan untuk <td> */

function saDataTable(root, opts) {
  const o = Object.assign(
    {
      rows: [],
      columns: [],
      pageSize: 10,
      pageSizes: [5, 10, 25],
      search: null,
      filter: null,
      selectable: false,
      rowId: (r, i) => i,
      empty: "Tidak ada data",
      label: "Tabel data",
      bulkActions: [],
      csvName: "data.csv",
      csvSeparator: ",",
      sort: null, // { key, dir: "asc" | "desc" }
    },
    opts,
  );
  const state = { query: "", page: 1, size: o.pageSize, sort: o.sort, selected: new Set() };
  const idOf = (r) => String(o.rowId(r, o.rows.indexOf(r)));
  const cell = (c, r) => (c.render ? c.render(r) : escapeHtml(r[c.key] ?? ""));

  root.classList.add("sa-dt");
  root.innerHTML = `
    <div class="sa-dt-bulk" hidden>
      <span class="sa-dt-bulk-count fw-semibold"></span>
      <div class="d-flex flex-wrap gap-2 ms-auto">
        ${o.bulkActions.map((a, i) => `<button type="button" class="btn btn-light btn-sm" data-dt-bulk="${i}">${escapeHtml(a.text)}</button>`).join("")}
        <button type="button" class="btn btn-light btn-sm" data-dt-export-selected>Ekspor terpilih</button>
        <button type="button" class="btn btn-link btn-sm text-decoration-none" data-dt-clear>Batal pilih</button>
      </div>
    </div>
    <div class="table-responsive">
      <table class="table sa-table" aria-label="${escapeHtml(o.label)}">
        <thead><tr>
          ${o.selectable ? `<th class="sa-dt-check"><input class="form-check-input" type="checkbox" data-dt-all aria-label="Pilih semua baris di halaman ini" /></th>` : ""}
          ${o.columns
            .map((c, i) =>
              c.sortable === false
                ? `<th${c.align === "end" ? ' class="text-end"' : ""}>${escapeHtml(c.label)}</th>`
                : `<th${c.align === "end" ? ' class="text-end"' : ""} aria-sort="none"><button type="button" class="sa-dt-sort" data-dt-sort="${i}">${escapeHtml(c.label)}<i class="bi bi-chevron-expand" aria-hidden="true"></i></button></th>`,
            )
            .join("")}
        </tr></thead>
        <tbody></tbody>
      </table>
    </div>
    <div class="sa-dt-foot">
      <small class="text-body-secondary sa-dt-info" aria-live="polite"></small>
      <div class="d-flex align-items-center gap-3 ms-auto flex-wrap">
        <label class="d-flex align-items-center gap-2 small text-body-secondary mb-0">Baris
          <select class="form-select form-select-sm" data-dt-size style="width: auto">${o.pageSizes.map((n) => `<option${n === o.pageSize ? " selected" : ""}>${n}</option>`).join("")}</select>
        </label>
        <nav aria-label="Halaman ${escapeHtml(o.label)}"><ul class="pagination pagination-sm mb-0"></ul></nav>
      </div>
    </div>`;

  const $ = (s) => root.querySelector(s);
  const tbody = $("tbody");
  const cols = o.columns.length + (o.selectable ? 1 : 0);

  function visibleRows() {
    const q = norm(state.query);
    let rows = o.rows.filter((r) => (!o.filter || o.filter(r)) && (!q || !o.search || norm(String(o.search(r))).includes(q)));
    if (state.sort) {
      const c = o.columns.find((col) => col.key === state.sort.key);
      const val = c?.sortValue || ((r) => r[state.sort.key]);
      const dir = state.sort.dir === "desc" ? -1 : 1;
      rows = rows.slice().sort((a, b) => {
        const x = val(a),
          y = val(b);
        return (typeof x === "number" && typeof y === "number" ? x - y : String(x).localeCompare(String(y), "id")) * dir;
      });
    }
    return rows;
  }

  function render() {
    const rows = visibleRows();
    const pages = Math.max(1, Math.ceil(rows.length / state.size));
    state.page = Math.min(state.page, pages);
    const start = (state.page - 1) * state.size;
    const pageRows = rows.slice(start, start + state.size);

    tbody.innerHTML = pageRows.length
      ? pageRows
          .map((r) => {
            const id = idOf(r);
            const sel = state.selected.has(id);
            return `<tr${sel ? ' class="sa-dt-selected"' : ""}>${
              o.selectable
                ? `<td class="sa-dt-check"><input class="form-check-input" type="checkbox" data-dt-row="${escapeHtml(id)}"${sel ? " checked" : ""} aria-label="Pilih baris" /></td>`
                : ""
            }${o.columns.map((c) => `<td class="${c.align === "end" ? "text-end " : ""}${c.className || ""}">${cell(c, r)}</td>`).join("")}</tr>`;
          })
          .join("")
      : emptyRow(cols, o.empty);

    $(".sa-dt-info").textContent = rows.length
      ? `Menampilkan ${start + 1}–${start + pageRows.length} dari ${rows.length}${rows.length < o.rows.length ? ` (disaring dari ${o.rows.length})` : ""}`
      : `0 dari ${o.rows.length}`;

    /* Paginasi: pertama, sekitar halaman aktif, terakhir */
    const nums = [...new Set([1, state.page - 1, state.page, state.page + 1, pages])].filter((n) => n >= 1 && n <= pages).sort((a, b) => a - b);
    let html = `<li class="page-item${state.page === 1 ? " disabled" : ""}"><button type="button" class="page-link" data-dt-page="${state.page - 1}" aria-label="Halaman sebelumnya"><i class="bi bi-chevron-left" aria-hidden="true"></i></button></li>`;
    nums.forEach((n, i) => {
      if (i && n - nums[i - 1] > 1) html += `<li class="page-item disabled"><span class="page-link">…</span></li>`;
      html += `<li class="page-item${n === state.page ? " active" : ""}"><button type="button" class="page-link" data-dt-page="${n}"${n === state.page ? ' aria-current="page"' : ""}>${n}</button></li>`;
    });
    html += `<li class="page-item${state.page === pages ? " disabled" : ""}"><button type="button" class="page-link" data-dt-page="${state.page + 1}" aria-label="Halaman berikutnya"><i class="bi bi-chevron-right" aria-hidden="true"></i></button></li>`;
    $(".pagination").innerHTML = html;

    /* Status sort di header */
    root.querySelectorAll("[data-dt-sort]").forEach((b) => {
      const c = o.columns[+b.dataset.dtSort];
      const on = state.sort?.key === c.key;
      b.closest("th").setAttribute("aria-sort", on ? (state.sort.dir === "asc" ? "ascending" : "descending") : "none");
      b.querySelector(".bi").className = `bi ${on ? (state.sort.dir === "asc" ? "bi-caret-up-fill" : "bi-caret-down-fill") : "bi-chevron-expand"}`;
    });

    /* Pilihan */
    if (o.selectable) {
      const ids = pageRows.map(idOf);
      const n = ids.filter((id) => state.selected.has(id)).length;
      const all = $("[data-dt-all]");
      all.checked = ids.length > 0 && n === ids.length;
      all.indeterminate = n > 0 && n < ids.length;
      $(".sa-dt-bulk").hidden = state.selected.size === 0;
      $(".sa-dt-bulk-count").textContent = `${state.selected.size} dipilih`;
    }
  }

  root.addEventListener("click", (e) => {
    const sortBtn = e.target.closest("[data-dt-sort]");
    if (sortBtn) {
      const key = o.columns[+sortBtn.dataset.dtSort].key;
      state.sort = state.sort?.key === key ? { key, dir: state.sort.dir === "asc" ? "desc" : "asc" } : { key, dir: "asc" };
      render();
      return;
    }
    const pageBtn = e.target.closest("[data-dt-page]");
    if (pageBtn && !pageBtn.closest(".disabled")) {
      state.page = +pageBtn.dataset.dtPage;
      render();
      root.querySelector(".pagination .active .page-link")?.focus();
      return;
    }
    if (e.target.closest("[data-dt-clear]")) {
      state.selected.clear();
      render();
      return;
    }
    if (e.target.closest("[data-dt-export-selected]")) {
      api.exportCsv(true);
      return;
    }
    const bulk = e.target.closest("[data-dt-bulk]");
    if (bulk) o.bulkActions[+bulk.dataset.dtBulk].action(api.selected(), api);
  });
  root.addEventListener("change", (e) => {
    if (e.target.matches("[data-dt-size]")) {
      state.size = +e.target.value;
      state.page = 1;
    } else if (e.target.matches("[data-dt-all]")) {
      const start = (state.page - 1) * state.size;
      visibleRows()
        .slice(start, start + state.size)
        .forEach((r) => (e.target.checked ? state.selected.add(idOf(r)) : state.selected.delete(idOf(r))));
    } else if (e.target.matches("[data-dt-row]")) {
      e.target.checked ? state.selected.add(e.target.dataset.dtRow) : state.selected.delete(e.target.dataset.dtRow);
    } else return;
    render();
  });

  const csvCell = (v) => {
    const s = String(v ?? "");
    return /[",\n;]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
  };

  const api = {
    /** Ganti kata kunci pencarian lalu render ulang dari halaman 1 */
    setQuery(q) {
      state.query = q;
      state.page = 1;
      render();
    },
    /** Render ulang, misalnya setelah filter luar berubah */
    refresh(resetPage = true) {
      if (resetPage) state.page = 1;
      render();
    },
    /** Ganti seluruh data (misalnya hasil fetch dari API) */
    setRows(rows) {
      o.rows = rows;
      state.selected.clear();
      state.page = 1;
      render();
    },
    /** Baris yang dipilih */
    selected: () => o.rows.filter((r) => state.selected.has(idOf(r))),
    clearSelection() {
      state.selected.clear();
      render();
    },
    /** Unduh CSV dari baris yang tampil (sesuai filter dan urutan) atau hanya yang dipilih */
    exportCsv(onlySelected = false) {
      const rows = onlySelected ? visibleRows().filter((r) => state.selected.has(idOf(r))) : visibleRows();
      const sep = o.csvSeparator;
      const lines = [o.columns.map((c) => csvCell(c.label)).join(sep)].concat(
        rows.map((r) => o.columns.map((c) => csvCell(c.csv ? c.csv(r) : r[c.key])).join(sep)),
      );
      const blob = new Blob(["﻿" + lines.join("\r\n")], { type: "text/csv;charset=utf-8" });
      const a = Object.assign(document.createElement("a"), { href: URL.createObjectURL(blob), download: o.csvName });
      document.body.append(a);
      a.click();
      a.remove();
      setTimeout(() => URL.revokeObjectURL(a.href), 1000);
      showToast(`${rows.length} baris diekspor ke ${o.csvName}`);
    },
  };
  render();
  return api;
}
