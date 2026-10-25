/* ==========================================================================
   Konfigurasi sidebar. Ubah menu cukup di file ini; shell.js yang merender.
   - href ditulis relatif terhadap akar proyek (folder tempat index.html berada),
     jadi sama untuk halaman di root maupun di pages/.
   - Item dengan `children` menjadi submenu yang bisa dibuka-tutup. Grup yang
     berisi halaman aktif terbuka otomatis.
   - `icon` adalah nama di saIcons (bawah). `badge` opsional.
   ========================================================================== */

const saBrand = "simple-admin";

const saNav = [
  {
    label: "Utama",
    items: [{ text: "Dashboard", href: "index.html", icon: "home" }],
  },
  {
    label: "Aplikasi",
    items: [
      {
        text: "Toko",
        icon: "bag",
        children: [
          { text: "Pesanan", href: "pages/orders.html", badge: "12" },
          { text: "Produk", href: "pages/products.html" },
          { text: "Pelanggan", href: "pages/customers.html" },
          { text: "Laporan", href: "pages/reports.html" },
        ],
      },
      { text: "Pengguna & Akses", href: "pages/users.html", icon: "user" },
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
      { text: "Halaman 404", href: "404.html", icon: "alert" },
    ],
  },
];

/* Kartu kecil di dasar sidebar. Isi `null` untuk menyembunyikannya. */
const saSidebarCard = { title: "Penyimpanan", percent: 68, text: "6,8 GB dari 10 GB terpakai" };

/* Ikon garis 24×24 (isi elemen <svg>). Tambahkan sendiri bila perlu. */
const saIcons = {
  home: '<path d="M3 12l9-8 9 8" /><path d="M5 10v10h14V10" />',
  bag: '<path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" /><path d="M3 6h18" /><path d="M16 10a4 4 0 01-8 0" />',
  box: '<path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z" /><path d="M3.3 7L12 12l8.7-5" /><path d="M12 22V12" />',
  users: '<path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 00-3-3.87" /><path d="M16 3.13a4 4 0 010 7.75" />',
  chart: '<path d="M3 3v18h18" /><path d="M7 15l4-4 3 3 5-6" />',
  user: '<circle cx="12" cy="8" r="4" /><path d="M4 21a8 8 0 0116 0" />',
  gear: '<circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 11-2.83 2.83l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 11-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 11-2.83-2.83l.06-.06A1.65 1.65 0 004.6 15a1.65 1.65 0 00-1.51-1H3a2 2 0 110-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 112.83-2.83l.06.06A1.65 1.65 0 009 4.6a1.65 1.65 0 001-1.51V3a2 2 0 114 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 112.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 110 4h-.09a1.65 1.65 0 00-1.51 1z" />',
  lock: '<rect x="4" y="11" width="16" height="10" rx="2" /><path d="M8 11V7a4 4 0 018 0v4" />',
  alert: '<circle cx="12" cy="12" r="9" /><path d="M12 8v5" /><path d="M12 16h.01" />',
  chevron: '<path d="M9 6l6 6-6 6" />',
  logo: '<rect x="3" y="3" width="7" height="7" rx="1.5" /><rect x="14" y="3" width="7" height="7" rx="1.5" /><rect x="3" y="14" width="7" height="7" rx="1.5" /><rect x="14" y="14" width="7" height="7" rx="1.5" />',
};
