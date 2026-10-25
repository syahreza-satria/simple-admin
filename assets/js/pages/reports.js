/* ---- Halaman Laporan: grafik kategori dan metode pembayaran ---- */

/* Donat penjualan per kategori + legenda dengan nilai dan persentase */
const categoryTotal = salesByCategory.reduce((s, c) => s + c.value, 0);
saChart(document.getElementById("saCategoryChart"), (c) => {
  document.getElementById("saCategoryLegend").innerHTML = salesByCategory
    .map(
      (cat, i) => `<li><i style="background: ${c.series[i]}"></i><span>${escapeHtml(cat.name)}</span>
        <span class="sa-num text-body-secondary">Rp ${cat.value} jt</span><span class="sa-num fw-semibold">${Math.round((cat.value / categoryTotal) * 100)}%</span></li>`,
    )
    .join("");
  return {
    type: "doughnut",
    data: {
      labels: salesByCategory.map((cat) => cat.name),
      datasets: [{ data: salesByCategory.map((cat) => cat.value), backgroundColor: c.series, borderColor: c.bg, borderWidth: 3, hoverOffset: 4 }],
    },
    options: {
      cutout: "68%",
      plugins: { tooltip: { callbacks: { label: (ctx) => ` ${ctx.label}: Rp ${ctx.parsed} jt` } } },
    },
  };
});

/* Batang horizontal porsi metode pembayaran */
saChart(document.getElementById("saPaymentChart"), (c) => ({
  type: "bar",
  data: {
    labels: paymentMethods.map((m) => m.name),
    datasets: [{ data: paymentMethods.map((m) => m.share), backgroundColor: c.accent, borderRadius: 6, barThickness: 18 }],
  },
  options: {
    indexAxis: "y",
    scales: {
      x: { min: 0, max: 50, ticks: { stepSize: 10, callback: (v) => `${v}%` }, border: { display: false, dash: [3, 4] } },
      y: { grid: { display: false }, border: { display: false }, ticks: { color: c.ink } },
    },
    plugins: { tooltip: { callbacks: { label: (ctx) => ` ${ctx.parsed.x}% transaksi` } } },
  },
}));
