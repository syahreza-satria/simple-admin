/* ---- Grafik (Chart.js) ----
   Dimuat setelah Chart.js di halaman yang punya grafik. Warna dibaca dari
   token CSS, sehingga grafik ikut mode terang/gelap; animasi mati saat
   pengguna memilih reduce motion.

   Pemakaian:
     saChart(document.getElementById("myChart"), (c) => ({ type: "bar", data: …, options: … }));
   Fungsi kedua menerima objek warna `c` dan mengembalikan konfigurasi Chart.js.
   Grafik dibuat ulang otomatis saat tema berganti. */

const saReduceMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;

/* Warna dari token CSS */
function chartColors() {
  const css = getComputedStyle(document.documentElement);
  const v = (n) => css.getPropertyValue(n).trim();
  return {
    accent: v("--sa-accent"),
    prev: v("--sa-chart-prev"),
    grid: v("--sa-line"),
    muted: v("--sa-muted"),
    ink: v("--sa-ink"),
    bg: v("--sa-bg"),
    series: [v("--sa-chart-1"), v("--sa-chart-2"), v("--sa-chart-3"), v("--sa-chart-4"), v("--sa-chart-5")],
  };
}

/* "#1a56f0" + 0.16 → "rgba(26, 86, 240, 0.16)" (untuk area gradien) */
function saAlpha(hex, a) {
  const m = /^#([\da-f]{2})([\da-f]{2})([\da-f]{2})$/i.exec(hex);
  return m ? `rgba(${parseInt(m[1], 16)}, ${parseInt(m[2], 16)}, ${parseInt(m[3], 16)}, ${a})` : hex;
}

/* Gradien vertikal dari warna ke transparan, untuk isi area grafik garis */
const saGradient = (color, top = 0.16) => (ctx) => {
  const { chart } = ctx;
  if (!chart.chartArea) return saAlpha(color, top / 2);
  const g = chart.ctx.createLinearGradient(0, chart.chartArea.top, 0, chart.chartArea.bottom);
  g.addColorStop(0, saAlpha(color, top));
  g.addColorStop(1, saAlpha(color, 0));
  return g;
};

function saChartDefaults(c) {
  const d = Chart.defaults;
  d.locale = "id-ID"; // angka 1.400, bukan 1,400
  d.font.family = getComputedStyle(document.body).fontFamily;
  d.font.size = 11;
  d.color = c.muted;
  d.borderColor = c.grid;
  d.maintainAspectRatio = false;
  d.plugins.legend.display = false;
  Object.assign(d.plugins.tooltip, {
    backgroundColor: c.ink,
    titleColor: c.bg,
    bodyColor: c.bg,
    padding: 10,
    cornerRadius: 8,
    boxPadding: 4,
    usePointStyle: true,
  });
}

const saChartList = [];
function saChart(canvas, build) {
  if (!canvas) return null;
  const entry = { canvas, build, chart: null };
  entry.render = (animate = !saReduceMotion) => {
    entry.chart?.destroy();
    const c = chartColors();
    saChartDefaults(c);
    const cfg = build(c);
    cfg.options = cfg.options || {};
    if (!animate) cfg.options.animation = false;
    entry.chart = new Chart(canvas, cfg);
  };
  entry.render();
  saChartList.push(entry);
  return entry;
}

/* Gambar ulang semua grafik saat tema berganti (event dari common.js) */
document.addEventListener("themechange", () => saChartList.forEach((e) => e.render(false)));
