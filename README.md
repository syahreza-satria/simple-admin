# Simple Admin

Template dashboard admin sederhana berbahasa Indonesia, dibuat dengan HTML, CSS, dan JavaScript murni di atas Bootstrap 5. Tidak perlu build tool, tinggal buka di browser.

## Fitur

- **8 halaman aplikasi**: Dashboard, Pesanan, Detail pesanan/invoice, Produk, Pelanggan, Laporan, Pengguna & Akses, Pengaturan
- **Tabel data** tanpa library: sort kolom, paginasi, pencarian, pilih banyak baris dengan aksi massal, dan ekspor CSV (dipakai di halaman Pesanan)
- **Invoice siap cetak**: tombol Cetak menyembunyikan sidebar dan topbar, dan selalu mencetak dalam mode terang
- **UI Toolkit**: halaman dokumentasi interaktif (Tombol, Form, Tabel, Status & badge, Modal & alert) berisi contoh langsung, kode siap salin, dan penjelasan kelas serta token yang dipakai
- **Panduan Memulai** di dalam template, plus **halaman kosong** sebagai titik awal halaman baru
- **Halaman error**: 404 (dengan alamat yang dicari), 500, dan Maintenance
- **3 halaman auth**: Masuk (email atau Google/GitHub/Microsoft), Daftar (dengan meter kekuatan kata sandi), dan Lupa Kata Sandi, lengkap dengan validasi form (mode demo, belum terhubung backend)
- **Mode gelap** dengan tombol toggle di topbar. Pilihan disimpan di `localStorage` dan mengikuti pengaturan sistem pada kunjungan pertama
- **Notifikasi**: dropdown dengan penanda belum dibaca dan tombol "Tandai semua dibaca"
- **Grafik Chart.js** yang warnanya ikut tema: garis pendapatan 6/12 bulan di Dashboard, donat kategori dan batang metode pembayaran di Laporan, plus halaman contoh Plugin › Grafik
- **Bootstrap Icons** untuk semua ikon
- **Tabel interaktif**: filter status, pencarian, dan filter kategori
- **Animasi** halaman, angka KPI (count-up), bar progres, dan grafik. Semuanya dimatikan otomatis jika pengguna mengaktifkan *reduce motion*
- **Kerangka dari satu konfigurasi**: sidebar (dengan submenu) dan topbar dibangun dari `assets/js/nav.js`; menu aktif dan grup yang terbuka ditentukan otomatis
- **Responsif**: sidebar menjadi offcanvas di layar kecil
- Shortcut <kbd>/</kbd> untuk fokus ke kolom pencarian

## Menjalankan

Buka [index.html](index.html) langsung di browser, atau jalankan server lokal:

```bash
python -m http.server 8000
# lalu buka http://localhost:8000
```

Bootstrap dan font dimuat dari CDN, jadi dibutuhkan koneksi internet.

## Struktur proyek

```
simple-admin-v1/
├── index.html              Dashboard
├── 404.html                Halaman tidak ditemukan
├── docs/
│   ├── context.md          Konteks proyek untuk anggota baru
│   └── design-system.md    Token, komponen, dan aturan visual
├── pages/
│   ├── blank.html          Halaman kosong (titik awal halaman baru)
│   ├── ui/                 UI Toolkit: buttons, forms, tables, status, modals
│   ├── docs/               Panduan: getting-started
│   ├── plugins/            Plugin: charts, datatable
│   ├── auth/
│   │   ├── login.html          Masuk
│   │   ├── register.html       Daftar
│   │   └── forgot-password.html  Lupa kata sandi
│   ├── orders.html         Pesanan
│   ├── order-detail.html   Detail pesanan / invoice (?id=INV-…)
│   ├── error-500.html      Kesalahan server
│   ├── maintenance.html    Sedang dalam perawatan
│   ├── products.html       Produk
│   ├── customers.html      Pelanggan
│   ├── reports.html        Laporan
│   ├── users.html          Pengguna & Akses
│   └── settings.html       Pengaturan
└── assets/
    ├── css/
    │   └── style.css       Seluruh gaya, tema terang/gelap, dan animasi
    └── js/
        ├── common.js       Dipakai semua halaman: alert SweetAlert2, mode gelap, helper
        ├── nav.js          Konfigurasi kerangka: menu sidebar, pengguna, menu akun
        ├── charts.js       Helper Chart.js: warna dari token, ikut tema
        ├── datatable.js    Tabel data: sort, paginasi, pilih baris, ekspor CSV
        ├── shell.js        Kerangka aplikasi: render sidebar, notifikasi, pencarian, dropdown, keluar akun
        ├── data.js         Data contoh (pesanan, produk, pelanggan, pengguna)
        └── pages/          Skrip khusus tiap halaman
            ├── auth.js        Validasi dan simulasi form auth
            ├── ui.js          Blok contoh UI Toolkit: kode otomatis dan tombol Salin
            ├── error.js       Halaman 404, 500, maintenance
            ├── dashboard.js   Tabel pesanan ringkas, grafik, count-up KPI
            ├── reports.js     Grafik kategori dan metode pembayaran
            ├── orders.js      Tabel data pesanan: filter, sort, paginasi, ekspor
            ├── order-detail.js Invoice dan status pesanan
            ├── products.js    Daftar produk dan form tambah produk
            ├── customers.js   Daftar pelanggan
            └── users.js       Daftar pengguna dan pergantian peran
```

Setiap halaman memuat `common.js`; halaman aplikasi menambah `nav.js` dan `shell.js`; lalu `data.js` jika butuh data, lalu skrip khusus halamannya. Laporan dan Pengaturan hanya memakai `common.js`.

Dokumentasi lanjutan: [docs/context.md](docs/context.md) (konteks dan keputusan proyek) dan [docs/design-system.md](docs/design-system.md) (design system).

## Menyesuaikan

**Ganti data contoh.** Semua data ada di [assets/js/data.js](assets/js/data.js) (`orders`, `allOrders`, `orderDetails`, `products`, `customers`, `users`). Data grafik (`revenue`, `salesByCategory`, `paymentMethods`) juga ada di sana. Notifikasi ada di array `notifs` di [assets/js/shell.js](assets/js/shell.js). Ganti dengan hasil panggilan API Anda, lalu panggil fungsi `render…` yang sesuai.

**Ganti warna.** Semua warna adalah variabel CSS di awal [assets/css/style.css](assets/css/style.css). Blok `:root` untuk mode terang, `[data-bs-theme="dark"]` untuk mode gelap. Warna aksen utama adalah `--sa-accent`.

**Tambah halaman.**
1. Salin `pages/blank.html`, lalu ubah judul dan isi `<main>`. Path aset di halaman dalam `pages/` diawali `../`.
2. Tambahkan link di [assets/js/nav.js](assets/js/nav.js), misalnya `{ text: "Kategori", href: "pages/categories.html", icon: "box" }`. `href` ditulis relatif terhadap akar proyek. Untuk submenu, pakai `children: [...]`. Menu aktif ditandai otomatis.

**Ubah menu.** Seluruh isi sidebar (nama brand, grup, item, submenu, badge, ikon, dan kartu penyimpanan) serta topbar (nama pengguna, peran, menu akun, teks pencarian) diatur di `assets/js/nav.js`. Ikon memakai nama [Bootstrap Icons](https://icons.getbootstrap.com/) tanpa awalan `bi-`. Tidak perlu mengedit file HTML.
3. Jika perlu skrip sendiri, buat file di `assets/js/pages/` dan muat setelah `common.js`.

## Konvensi

- Semua kelas dan id buatan sendiri diawali `sa-` (misalnya `.sa-panel`, `#saChart`) supaya tidak bentrok dengan Bootstrap.
- Tema diatur lewat atribut `data-bs-theme` pada `<html>`, sehingga komponen Bootstrap ikut berganti.
- Perubahan di halaman (tambah produk, ubah peran, tandai notifikasi) hanya tersimpan di memori dan hilang saat halaman dimuat ulang. Template ini belum memiliki backend.

## Teknologi

- [Bootstrap 5.3.3](https://getbootstrap.com/) (CSS dan bundle JS, via CDN)
- [SweetAlert2](https://sweetalert2.github.io/) 11.14.5 untuk toast dan dialog konfirmasi (via CDN)
- [Chart.js](https://www.chartjs.org/) 4.4.6 untuk grafik (via CDN, hanya di halaman bergrafik)
- [Bootstrap Icons](https://icons.getbootstrap.com/) 1.11.3 (via CDN)
- Font [Plus Jakarta Sans](https://fonts.google.com/specimen/Plus+Jakarta+Sans) dan [JetBrains Mono](https://fonts.google.com/specimen/JetBrains+Mono) (Google Fonts)
- JavaScript tanpa framework

## Unduh

Unduh versi terbaru dari halaman [Releases](https://github.com/syahreza-satria/simple-admin/releases), ekstrak, lalu buka `index.html`. Riwayat perubahan ada di [CHANGELOG.md](CHANGELOG.md).

## Kontribusi

Laporan bug, usulan fitur, dan pull request sangat diterima. Baca [CONTRIBUTING.md](CONTRIBUTING.md) dan [Kode Etik](CODE_OF_CONDUCT.md) sebelum mulai. Masalah keamanan dilaporkan secara pribadi sesuai [SECURITY.md](SECURITY.md).

## Lisensi

[MIT](LICENSE) © 2026 Syahreza Satria Alfath. Bebas dipakai untuk proyek pribadi maupun komersial.
