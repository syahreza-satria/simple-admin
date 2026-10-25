/* ==========================================================================
   Konfigurasi kerangka aplikasi (sidebar dan topbar). Ubah di file ini saja;
   shell.js yang merender ke setiap halaman.
   - href ditulis relatif terhadap akar proyek (folder tempat index.html berada),
     jadi sama untuk halaman di root maupun di pages/.
   - Item dengan `children` menjadi submenu yang bisa dibuka-tutup. Grup yang
     berisi halaman aktif terbuka otomatis.
   - `icon` adalah nama Bootstrap Icons tanpa awalan "bi-", misalnya "house".
     Daftar lengkap: https://icons.getbootstrap.com/
   - `badge` opsional. `match` berisi halaman lain yang ikut menandai item ini
     aktif, misalnya halaman detail.
   ========================================================================== */

const saBrand = "simple-admin";

const saNav = [
  {
    label: "Utama",
    items: [{ text: "Dashboard", href: "index.html", icon: "house" }],
  },
  {
    label: "Aplikasi",
    items: [
      {
        text: "Toko",
        icon: "bag",
        children: [
          { text: "Pesanan", href: "pages/orders.html", badge: "12", match: ["pages/order-detail.html"] },
          { text: "Produk", href: "pages/products.html" },
          { text: "Pelanggan", href: "pages/customers.html" },
          { text: "Laporan", href: "pages/reports.html" },
        ],
      },
      { text: "Pengguna & Akses", href: "pages/users.html", icon: "person" },
      { text: "Pengaturan", href: "pages/settings.html", icon: "gear" },
    ],
  },
  {
    label: "Halaman",
    items: [
      {
        text: "Autentikasi",
        icon: "lock",
        children: [
          { text: "Masuk", href: "pages/auth/login.html" },
          { text: "Daftar", href: "pages/auth/register.html" },
          { text: "Lupa kata sandi", href: "pages/auth/forgot-password.html" },
        ],
      },
      {
        text: "Error",
        icon: "exclamation-circle",
        children: [
          { text: "404 Tidak ditemukan", href: "404.html" },
          { text: "500 Kesalahan server", href: "pages/error-500.html" },
          { text: "Maintenance", href: "pages/maintenance.html" },
        ],
      },
      { text: "Halaman kosong", href: "pages/blank.html", icon: "file-earmark" },
    ],
  },
  {
    label: "UI Toolkit",
    items: [
      {
        text: "Komponen",
        icon: "layers",
        children: [
          { text: "Tombol", href: "pages/ui/buttons.html" },
          { text: "Form", href: "pages/ui/forms.html" },
          { text: "Tabel", href: "pages/ui/tables.html" },
          { text: "Status & badge", href: "pages/ui/status.html" },
          { text: "Modal & alert", href: "pages/ui/modals.html" },
        ],
      },
    ],
  },
  {
    label: "Plugin",
    items: [
      { text: "Grafik", href: "pages/plugins/charts.html", icon: "bar-chart" },
      { text: "Tabel data", href: "pages/plugins/datatable.html", icon: "table" },
    ],
  },
  {
    label: "Panduan",
    items: [{ text: "Memulai", href: "pages/docs/getting-started.html", icon: "book" }],
  },
];

/* Kartu kecil di dasar sidebar. Isi `null` untuk menyembunyikannya. */
const saSidebarCard = { title: "Penyimpanan", percent: 68, text: "6,8 GB dari 10 GB terpakai" };

/* ---- Topbar ---- */
const saSearchPlaceholder = "Cari pesanan, produk, pelanggan…";

/* Pengguna yang sedang masuk (ganti dengan data sesi dari backend) */
const saUser = { name: "Satria Eza", role: "Administrator" };

/* Isi menu akun di pojok kanan atas. `logout: true` membuka dialog keluar. */
const saAccountMenu = [
  { text: "Profil saya", href: "pages/settings.html" },
  { text: "Pengaturan akun", href: "pages/settings.html" },
  { divider: true },
  { text: "Keluar", logout: true },
];

/* Logo di samping nama brand (SVG 16×16) */
const saLogo =
  '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="3" width="7" height="7" rx="1.5" /><rect x="14" y="3" width="7" height="7" rx="1.5" /><rect x="3" y="14" width="7" height="7" rx="1.5" /><rect x="14" y="14" width="7" height="7" rx="1.5" /></svg>';
