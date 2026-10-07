# Simple Admin

Template dashboard admin sederhana berbahasa Indonesia, dibuat dengan HTML, CSS, dan JavaScript murni di atas Bootstrap 5. Tidak perlu build tool, tinggal buka di browser.

## Fitur

- **7 halaman**: Dashboard, Pesanan, Produk, Pelanggan, Laporan, Pengguna & Akses, Pengaturan
- **Mode gelap** dengan tombol toggle di topbar. Pilihan disimpan di `localStorage` dan mengikuti pengaturan sistem pada kunjungan pertama
- **Notifikasi**: dropdown dengan penanda belum dibaca dan tombol "Tandai semua dibaca"
- **Grafik garis SVG** tanpa library, dengan pilihan rentang 6 atau 12 bulan
- **Tabel interaktif**: filter status, pencarian, dan filter kategori
- **Animasi** halaman, angka KPI (count-up), bar progres, dan grafik. Semuanya dimatikan otomatis jika pengguna mengaktifkan *reduce motion*
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
├── index.html        Dashboard
├── orders.html       Pesanan
├── products.html     Produk
├── customers.html    Pelanggan
├── reports.html      Laporan
├── users.html        Pengguna & Akses
├── settings.html     Pengaturan
├── css/
│   └── style.css     Seluruh gaya, tema terang/gelap, dan animasi
└── js/
    ├── common.js     Dipakai semua halaman: toast, notifikasi, mode gelap, helper
    ├── data.js       Data contoh (pesanan, produk, pelanggan, pengguna)
    ├── dashboard.js  Tabel pesanan ringkas, grafik, count-up KPI
    ├── orders.js     Filter dan pencarian pesanan
    ├── products.js   Daftar produk dan form tambah produk
    ├── customers.js  Daftar pelanggan
    └── users.js      Daftar pengguna dan pergantian peran
```

Setiap halaman memuat `common.js`, lalu `data.js` jika butuh data, lalu skrip khusus halamannya. Laporan dan Pengaturan hanya memakai `common.js`.

## Menyesuaikan

**Ganti data contoh.** Semua data ada di [js/data.js](js/data.js) (`orders`, `allOrders`, `products`, `customers`, `users`). Notifikasi ada di array `notifs` di [js/common.js](js/common.js), dan data grafik (`months`, `rev2026`, `rev2025`) di [js/dashboard.js](js/dashboard.js). Ganti dengan hasil panggilan API Anda, lalu panggil fungsi `render…` yang sesuai.

**Ganti warna.** Semua warna adalah variabel CSS di awal [css/style.css](css/style.css). Blok `:root` untuk mode terang, `[data-bs-theme="dark"]` untuk mode gelap. Warna aksen utama adalah `--sa-accent`.

**Tambah halaman.**
1. Salin salah satu file HTML yang sudah ada, misalnya `reports.html`, lalu ubah judul dan isi `<main>`.
2. Tambahkan link di sidebar. Sidebar ditulis ulang di setiap file, jadi menu harus diubah di ketujuh file.
3. Jika perlu skrip sendiri, buat file di `js/` dan muat setelah `common.js`.

## Konvensi

- Semua kelas dan id buatan sendiri diawali `sa-` (misalnya `.sa-panel`, `#saChart`) supaya tidak bentrok dengan Bootstrap.
- Tema diatur lewat atribut `data-bs-theme` pada `<html>`, sehingga komponen Bootstrap ikut berganti.
- Perubahan di halaman (tambah produk, ubah peran, tandai notifikasi) hanya tersimpan di memori dan hilang saat halaman dimuat ulang. Template ini belum memiliki backend.

## Teknologi

- [Bootstrap 5.3.3](https://getbootstrap.com/) (CSS dan bundle JS, via CDN)
- Font [Plus Jakarta Sans](https://fonts.google.com/specimen/Plus+Jakarta+Sans) dan [JetBrains Mono](https://fonts.google.com/specimen/JetBrains+Mono) (Google Fonts)
- JavaScript tanpa framework
