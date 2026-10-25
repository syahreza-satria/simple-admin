/* ---- Halaman Plugin › Grafik: contoh yang sama persis dengan kode yang ditampilkan ---- */

saChart(document.getElementById("exLine"), (c) => ({
  type: "line",
  data: {
    labels: ["M1", "M2", "M3", "M4", "M5", "M6", "M7", "M8"],
    datasets: [
      {
        label: "Pengunjung",
        data: [820, 940, 910, 1080, 1150, 1240, 1310, 1460],
        borderColor: c.accent,
        backgroundColor: saGradient(c.accent),
        fill: true,
        tension: 0.35,
        pointRadius: 0,
      },
    ],
  },
  options: { interaction: { mode: "index", intersect: false }, scales: { x: { grid: { display: false } } } },
}));

saChart(document.getElementById("exBar"), (c) => ({
  type: "bar",
  data: {
    labels: ["Sen", "Sel", "Rab", "Kam", "Jum", "Sab", "Min"],
    datasets: [
      { label: "Online", data: [42, 38, 51, 47, 63, 88, 74], backgroundColor: c.series[0], borderRadius: 4 },
      { label: "Offline", data: [21, 25, 22, 28, 34, 52, 46], backgroundColor: c.series[1], borderRadius: 4 },
    ],
  },
  options: {
    plugins: { legend: { display: true, position: "bottom", labels: { usePointStyle: true, boxWidth: 8 } } },
    scales: { x: { grid: { display: false } } },
  },
}));

saChart(document.getElementById("exDoughnut"), (c) => ({
  type: "doughnut",
  data: {
    labels: ["Website", "Marketplace", "WhatsApp"],
    datasets: [{ data: [52, 31, 17], backgroundColor: c.series, borderColor: c.bg, borderWidth: 3 }],
  },
  options: { cutout: "68%", plugins: { legend: { display: true, position: "right" } } },
}));
