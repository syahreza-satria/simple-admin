/* ---- Data contoh (ganti dengan data dari API Anda) ---- */
const months = ["Nov", "Des", "Jan", "Feb", "Mar", "Apr", "Mei", "Jun", "Jul", "Agu", "Sep", "Okt"];
const rev2026 = [118, 142, 121, 128, 139, 135, 151, 158, 149, 166, 164, 184]; // juta rupiah
const rev2025 = [96, 120, 101, 104, 112, 117, 124, 129, 126, 133, 141, 152];

/* ---- Tabel pesanan ---- */
function renderOrders(filter) {
  const rows = orders.filter((o) => filter === "all" || o.status === filter);
  document.getElementById("saOrders").innerHTML = rows
    .map(
      (o, i) => `
    <tr style="--i:${i}">
<td><span class="sa-id">#${o.id}</span></td>
<td class="fw-medium">${o.name}</td>
<td class="text-body-secondary">${o.date}</td>
<td><span class="sa-status sa-st-${o.status}">${statusLabel[o.status]}</span></td>
<td class="text-end sa-num fw-semibold">${rupiah(o.total)}</td>
    </tr>`,
    )
    .join("");
  document.getElementById("saCount").textContent = `Menampilkan ${rows.length} pesanan`;
}
document.querySelectorAll("#saFilter [data-filter]").forEach((btn) =>
  btn.addEventListener("click", () => {
    document.querySelectorAll("#saFilter .nav-link").forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
    renderOrders(btn.dataset.filter);
  }),
);
renderOrders("all");

/* ---- Grafik garis (SVG murni, tanpa library) ---- */
let chartRange = 12;
function chartColors() {
  const css = getComputedStyle(document.documentElement);
  const v = (n) => css.getPropertyValue(n).trim();
  return { line: v("--sa-line"), prev: v("--sa-chart-prev"), accent: v("--sa-accent"), bg: v("--sa-bg"), ink: v("--sa-ink") };
}
function renderChart(range, animate = true) {
  chartRange = range;
  const c = chartColors();
  const svg = document.getElementById("saChart");
  const W = 720,
    H = 280,
    L = 44,
    R = 12,
    T = 12,
    B = 30;
  const a = rev2026.slice(-range),
    b = rev2025.slice(-range),
    lab = months.slice(-range);
  const max = 200,
    step = 50;
  const x = (i) => L + (i * (W - L - R)) / (a.length - 1);
  const y = (v) => T + (H - T - B) * (1 - v / max);
  const line = (arr) => arr.map((v, i) => `${i ? "L" : "M"}${x(i).toFixed(1)},${y(v).toFixed(1)}`).join(" ");
  let g = "";
  for (let v = 0; v <= max; v += step) {
    g += `<line x1="${L}" x2="${W - R}" y1="${y(v)}" y2="${y(v)}" stroke="${c.line}" stroke-width="1"${v ? ' stroke-dasharray="3 4"' : ""}/>`;
    g += `<text x="${L - 8}" y="${y(v) + 4}" text-anchor="end">${v}${v ? " jt" : ""}</text>`;
  }
  lab.forEach((m, i) => (g += `<text x="${x(i)}" y="${H - 8}" text-anchor="middle">${m}</text>`));
  const area = `${line(a)} L${x(a.length - 1)},${y(0)} L${x(0)},${y(0)} Z`;
  const li = a.length - 1;
  svg.classList.toggle("sa-chart-anim", animate);
  svg.innerHTML = `
    <defs><clipPath id="saClip"><rect class="sa-clip" x="0" y="0" width="${W}" height="${H}"/></clipPath><linearGradient id="saFill" x1="0" x2="0" y1="0" y2="1">
<stop offset="0" stop-color="${c.accent}" stop-opacity=".16"/><stop offset="1" stop-color="${c.accent}" stop-opacity="0"/>
    </linearGradient></defs>
    ${g}
    <g clip-path="url(#saClip)">
    <path d="${area}" fill="url(#saFill)"/>
    <path d="${line(b)}" fill="none" stroke="${c.prev}" stroke-width="2" stroke-dasharray="5 5"/>
    <path d="${line(a)}" fill="none" stroke="${c.accent}" stroke-width="2.5" stroke-linejoin="round" stroke-linecap="round"/>
    </g>
    <circle class="sa-chart-pt" cx="${x(li)}" cy="${y(a[li])}" r="5" fill="${c.bg}" stroke="${c.accent}" stroke-width="2.5"/>
    <text class="sa-chart-pt" x="${x(li) - 10}" y="${y(a[li]) - 12}" text-anchor="end" style="fill:${c.ink};font-weight:700">${a[li]} jt</text>`;
}
document.querySelectorAll(".sa-seg [data-range]").forEach((btn) =>
  btn.addEventListener("click", () => {
    document.querySelectorAll(".sa-seg .btn").forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
    renderChart(+btn.dataset.range);
  }),
);
renderChart(12);

document.addEventListener("themechange", () => renderChart(chartRange, false));

/* ---- Form tambah produk (modal) ---- */
document.getElementById("saProductForm").addEventListener("submit", (e) => {
  e.preventDefault();
  bootstrap.Modal.getInstance(document.getElementById("saModal")).hide();
  showToast(`“${document.getElementById("pName").value}” disimpan`);
});

/* ---- Animasi angka KPI (count-up) ---- */
const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;
document.querySelectorAll("[data-count]").forEach((el) => {
  const end = parseFloat(el.dataset.count);
  const dec = +(el.dataset.decimals || 0);
  const pre = el.dataset.prefix || "";
  const suf = el.dataset.suffix || "";
  const fmt = (v) => pre + v.toLocaleString("id-ID", { minimumFractionDigits: dec, maximumFractionDigits: dec }) + suf;
  if (reduceMotion) return;
  const dur = 1100;
  const t0 = performance.now() + 150;
  el.textContent = fmt(0);
  const tick = (now) => {
    const p = Math.min(Math.max((now - t0) / dur, 0), 1);
    el.textContent = fmt(end * (1 - Math.pow(1 - p, 3)));
    if (p < 1) requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
});
