# Context: Simple Admin

Ringkasan proyek untuk siapa pun (manusia atau AI) yang baru masuk. Baca ini dulu, lalu [README.md](../README.md) untuk cara pakai, [design-system.md](design-system.md) untuk visual, dan [CLAUDE.md](../CLAUDE.md) untuk aturan kerja.

## Apa ini

Template dashboard admin berbahasa Indonesia untuk toko online fiktif ("Toko Satria"). Berupa situs statis: HTML + CSS + JavaScript murni di atas Bootstrap 5.3.3 dari CDN. Tidak ada build, package manager, framework, backend, atau test. Tujuannya menjadi titik awal yang rapi dan mudah dibaca untuk proyek admin sungguhan.

- Repositori: https://github.com/syahreza-satria/simple-admin (branch `main`)
- Pemilik: syahreza-satria
- Bahasa UI dan komentar: Indonesia
- Tanggal data contoh: Oktober 2026

## Peta halaman

| Halaman | File | Skrip halaman | Isi |
|---|---|---|---|
| Dashboard | `index.html` | `dashboard.js` | 4 KPI, grafik pendapatan 6/12 bulan, target bulanan, 6 pesanan terbaru dengan filter, aktivitas |
| Pesanan | `pages/orders.html` | `orders.js` | 12 pesanan, filter status, pencarian |
| Produk | `pages/products.html` | `products.js` | Daftar produk, pencarian, filter kategori, modal Tambah Produk |
| Pelanggan | `pages/customers.html` | `customers.js` | Daftar pelanggan dengan pencarian |
| Laporan | `pages/reports.html` | (tidak ada) | KPI, penjualan per kategori, metode pembayaran, produk terlaris (statis) |
| Pengguna & Akses | `pages/users.html` | `users.js` | Daftar pengguna, ubah peran lewat dropdown |
| Pengaturan | `pages/settings.html` | (tidak ada) | Form profil toko, preferensi, saklar notifikasi (statis) |

Semua halaman berbagi kerangka yang sama: sidebar, topbar (pencarian, notifikasi, toggle tema, menu akun), area konten. Alert ditampilkan lewat SweetAlert2.

## Struktur berkas

```
index.html
README.md, CLAUDE.md
docs/             context.md, design-system.md
pages/            orders, products, customers, reports, users, settings (.html)
assets/
  css/style.css   semua gaya, tema, animasi
  js/
    common.js     dimuat di semua halaman
    data.js       data contoh
    pages/        dashboard, orders, products, customers, users (.js)
```

Urutan muat skrip di setiap halaman: bundle Bootstrap → `common.js` → `data.js` (jika perlu) → skrip halaman. Semua skrip klasik (bukan ES module), sehingga berbagi scope global. Fungsi dan konstanta di `common.js` dan `data.js` langsung bisa dipakai skrip halaman.

## Isi skrip bersama

**`common.js`**
- `rupiah(n)`, `statusLabel`, `initials(nama)`, `norm(teks)`, `emptyRow(kolom, teks)`: helper
- `showToast(teks, icon)`: toast SweetAlert2. Elemen `[data-toast]` memanggilnya saat diklik; form `[data-toast-form]` saat submit
- `confirmDialog({title, text, confirmText})`: dialog konfirmasi (Promise<boolean>); dipakai oleh link `[data-logout]` untuk keluar akun
- Toggle tema: membaca/menulis `localStorage["sa-theme"]`, mengatur `data-bs-theme`, lalu mengirim event `themechange`
- Notifikasi: array `notifs`, `renderNotifs()`, tandai dibaca per item atau semua
- Shortcut `/` untuk fokus ke pencarian topbar

**`data.js`**: `orders` (6, untuk dashboard), `allOrders` (12), `products`, `customers`, `users`, `roles`.

**Skrip halaman**: tiap file mendefinisikan fungsi `render…()` yang membangun `innerHTML` tabel dari data, memasang listener filter/pencarian, lalu memanggil render pertama. `dashboard.js` juga memuat data grafik (`months`, `rev2026`, `rev2025`), `renderChart()`, dan animasi hitung KPI.

## Alur data

```
data.js (array) ──► render…() ──► innerHTML tabel
        ▲                              │
   ganti dengan API              filter / pencarian memanggil render ulang
```

Tidak ada penyimpanan. Perubahan (produk baru, peran pengguna, status notifikasi) hidup di memori halaman dan hilang saat dimuat ulang. Setiap halaman memuat ulang datanya dari `data.js`, jadi produk yang ditambahkan di satu halaman tidak muncul di halaman lain.

## Keputusan desain dan alasannya

- **Satu file HTML per halaman.** Awalnya semua halaman satu `index.html` dengan router hash; diubah atas permintaan pemilik menjadi file terpisah. Konsekuensinya sidebar dan topbar diduplikasi di tujuh file, dan mengubah menu berarti mengedit ketujuhnya.
- **CSS dan JS dipisah dari HTML**, lalu folder dirapikan menjadi `pages/` dan `assets/`.
- **Grafik SVG buatan sendiri** agar tidak butuh library; warnanya dibaca dari variabel CSS sehingga ikut tema.
- **Warna lewat variabel CSS** supaya mode gelap cukup mengganti nilai variabel.
- **Prefix `sa-`** untuk semua kelas dan id buatan sendiri agar tidak bentrok dengan Bootstrap.
- **Tidak ada build step** supaya bisa dibuka langsung dari file dan mudah dipahami pemula.

Detail visual ada di [design-system.md](design-system.md).

## Riwayat singkat

1. Commit awal berisi desain lama (tema Inter, `css/style.css` dan `js/script.js` lama).
2. Desain ulang dashboard dengan CSS dan JS dipisah.
3. Penambahan mode gelap, notifikasi fungsional, dan animasi.
4. Penambahan enam halaman lain, lalu dipecah menjadi file HTML terpisah.
5. Penataan folder (`pages/`, `assets/`), `README.md`, dan `CLAUDE.md`.

## Keterbatasan yang diketahui

- Belum ada backend, autentikasi, atau penyimpanan permanen.
- Navigasi, sidebar, dan topbar diduplikasi per halaman.
- Tombol Ekspor, Unduh PDF, dan Undang Pengguna hanya menampilkan toast. "Keluar" membuka dialog konfirmasi lalu toast, tanpa sesi sungguhan.
- Pencarian global di topbar belum mencari apa pun; pencarian yang bekerja ada di tiap tabel.
- Halaman Laporan dan Pengaturan berisi data statis dan form tanpa penyimpanan.
- Bootstrap dan font dimuat dari CDN, jadi butuh internet.
- Belum ada pengujian otomatis; pengecekan dilakukan manual di browser.

## Ide pengembangan

- Menggabungkan kerangka bersama (sidebar/topbar) dengan include atau generator statis agar tidak diduplikasi.
- Menghubungkan `data.js` ke API dan menyimpan perubahan.
- Paginasi dan pengurutan tabel, serta halaman detail pesanan.
- Menjadikan pencarian global berfungsi.
- Menyimpan status notifikasi di server atau `localStorage`.

## Cara cepat memulai

```bash
python -m http.server 8000   # lalu buka http://localhost:8000
```

Untuk mengubah data: edit `assets/js/data.js`. Untuk mengubah warna: edit variabel di awal `assets/css/style.css`. Untuk menambah halaman: ikuti langkah di [README.md](../README.md) bagian "Tambah halaman".
