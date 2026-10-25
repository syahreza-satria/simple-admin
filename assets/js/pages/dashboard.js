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

/* ---- Grafik pendapatan (Chart.js, lewat saChart() di charts.js) ---- */
let chartRange = 12;
const revenueChart = saChart(document.getElementById("saChart"), (c) => {
  const cur = revenue.current.slice(-chartRange);
  const last = cur.length - 1;
  return {
    type: "line",
    data: {
      labels: revenue.months.slice(-chartRange),
      datasets: [
        {
          label: "2026",
          data: cur,
          borderColor: c.accent,
          borderWidth: 2.5,
          tension: 0.35,
          fill: true,
          backgroundColor: saGradient(c.accent),
          pointRadius: (ctx) => (ctx.dataIndex === last ? 5 : 0),
          pointBackgroundColor: c.bg,
          pointBorderWidth: 2.5,
          pointHoverRadius: 5,
        },
        {
          label: "2025",
          data: revenue.previous.slice(-chartRange),
          borderColor: c.prev,
          borderWidth: 2,
          borderDash: [5, 5],
          tension: 0.35,
          pointRadius: 0,
          pointHoverRadius: 4,
        },
      ],
    },
    options: {
      interaction: { mode: "index", intersect: false },
      scales: {
        y: { min: 0, max: 200, ticks: { stepSize: 50, callback: (v) => (v ? `${v} jt` : "0") }, border: { display: false, dash: [3, 4] } },
        x: { grid: { display: false }, border: { display: false } },
      },
      plugins: { tooltip: { callbacks: { label: (ctx) => ` ${ctx.dataset.label}: Rp ${ctx.parsed.y} jt` } } },
    },
  };
});
document.querySelectorAll(".sa-seg [data-range]").forEach((btn) =>
  btn.addEventListener("click", () => {
    document.querySelectorAll(".sa-seg .btn").forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
    chartRange = +btn.dataset.range;
    revenueChart.render();
  }),
);

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
