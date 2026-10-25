# CLAUDE.md

Template dashboard admin statis berbahasa Indonesia: HTML + CSS + JS murni di atas Bootstrap 5.3.3 (CDN). Tidak ada build, package manager, atau test. Lihat [README.md](README.md) untuk gambaran lengkap, [docs/context.md](docs/context.md) untuk konteks dan keputusan proyek, dan [docs/design-system.md](docs/design-system.md) untuk token serta komponen visual.

## Menjalankan

Buka `index.html` di browser atau `python -m http.server 8000`. Tidak ada perintah build/lint/test.

## Struktur

- `index.html` (dashboard) di root; halaman lain di `pages/` (`orders`, `products`, `customers`, `reports`, `users`, `settings`). `404.html` di root berdiri sendiri (tanpa sidebar/topbar, memuat `common.js` dan `pages/error.js`); path asetnya relatif terhadap root, jadi di hosting statis hanya benar untuk URL yang salah di tingkat root (untuk URL bersarang, ganti ke path absolut sesuai tempat deploy). Halaman auth (`login`, `register`, `forgot-password`) ada di `pages/auth/` dengan path aset `../../`. Path aset dari `pages/` diawali `../`; link ke dashboard `../index.html`, ke halaman lain relatif satu folder.
- `assets/css/style.css`: satu file untuk semua gaya, tema, dan animasi.
- `assets/js/common.js` dimuat di **semua** halaman, termasuk auth (alert SweetAlert2, mode gelap, helper `rupiah`, `escapeHtml`, `initials`, `norm`, `emptyRow`, `statusLabel`, konstanta `saRoot`). Jangan menaruh kode yang butuh sidebar/topbar di sini.
- `assets/js/nav.js`: konfigurasi kerangka (menu, submenu, ikon, brand, pengguna, menu akun, placeholder pencarian). Dimuat sebelum `shell.js`.
- `assets/js/shell.js`: perilaku kerangka aplikasi (render sidebar dan topbar, notifikasi, pencarian topbar, shortcut `/`, animasi dropdown, dialog keluar). Dimuat setelah `common.js` di semua halaman aplikasi, **tidak** di halaman auth dan `404.html`.
- `pages/blank.html` adalah titik awal halaman baru. Panduan ada di `pages/docs/` (sama seperti UI Toolkit: path `../../`, memuat `ui.js`). Contoh tanpa preview (hanya kode) cukup berisi kepala panel dan `<script type="text/plain" data-lang>`; blok kode disisipkan setelah kepala panel. Modal di dalam preview dipindahkan `ui.js` ke `<body>` setelah kodenya diambil.
- Halaman UI Toolkit ada di `pages/ui/` (path aset `../../`, link topbar ke `../settings.html`) dan memuat `assets/js/pages/ui.js`. Setiap contoh adalah `<section class="sa-panel sa-example" id="…">` berisi kepala panel, `.sa-example-preview` (markup asli yang tampil), opsional `<script type="text/plain" data-lang="JavaScript">` untuk kode tambahan, dan opsional `.sa-example-meta`. Kode HTML dibuat otomatis dari isi preview, jadi **jangan menulis ulang kode contoh secara manual**; ubah preview-nya saja. Atribut `data-demo-*` di preview hanya untuk interaksi demo di `ui.js`. Halaman UI baru juga didaftarkan di grup "UI Toolkit" di `nav.js`.
- `assets/js/pages/auth.js`: validasi form, tampil/sembunyi kata sandi, meter kekuatan, simulasi submit (mode demo).
- `assets/js/data.js`: data contoh. Dimuat hanya oleh halaman yang butuh data.
- `assets/js/pages/<halaman>.js`: logika khusus halaman. Urutan muat: Bootstrap bundle, SweetAlert2, Chart.js (jika ada grafik), `common.js`, `nav.js` + `shell.js` (halaman aplikasi), `data.js` (jika perlu), `charts.js` (jika ada grafik), skrip halaman.

## Aturan penting

- **Sidebar dirender dari konfigurasi.** Menu, nama brand, ikon, dan kartu bawah sidebar ada di `assets/js/nav.js` (`saBrand`, `saNav`, `saSidebarCard`, `saLogo`); `renderSidebar()` di `shell.js` membangunnya ke dalam `<aside id="saSidebar">` yang kosong di setiap halaman aplikasi. `href` di `nav.js` relatif terhadap akar proyek dan diawali `saRoot` saat dirender. Menu aktif, `aria-current`, dan grup submenu yang terbuka ditentukan otomatis dari URL. Jangan menulis markup menu di file HTML.
- **Topbar juga dirender dari `nav.js`** (`saSearchPlaceholder`, `saUser`, `saAccountMenu`) oleh `renderTopbar()` ke `<header id="saTopbar">` yang kosong. Tidak ada lagi markup kerangka yang diduplikasi. Toggle tema ditangani `common.js` lewat delegasi event, jadi `#saThemeToggle` boleh dirender belakangan; panggil `syncThemeBtn()` setelah merender tombolnya. Modal "Tambah Produk" ada di `index.html` dan `products.html`.
- **Ikon memakai Bootstrap Icons** (CDN `bootstrap-icons@1.11.3`, dimuat di `<head>` setiap halaman): `<i class="bi bi-nama" aria-hidden="true"></i>`. Di `nav.js`, `icon` cukup nama tanpa `bi-`. SVG hanya untuk logo brand (`saLogo`), logo penyedia login, dan ilustrasi 404.
- **Tabel data** memakai `saDataTable(el, opsi)` di `assets/js/datatable.js` (dimuat setelah `data.js`): kolom `{ key, label, align, render, sortValue, csv, className }`, opsi `search`, `filter`, `sort`, `pageSize`, `selectable`, `rowId`, `bulkActions`, `csvName`; method `setQuery`, `refresh`, `setRows`, `selected`, `clearSelection`, `exportCsv`. Dipakai di `pages/orders.js` dan `pages/plugin-datatable.js`. Isi `render` dari data wajib lewat `escapeHtml()`.
- `pages/order-detail.html?id=INV-…` membaca `allOrders` dan `orderDetails` (item, ongkir, alamat, kurir; harga dari `products`). Subtotal + ongkir harus sama dengan `total` di `allOrders`. Item nav "Pesanan" memakai `match` agar ikut aktif di halaman detail. Elemen `.sa-no-print` disembunyikan saat dicetak, `.sa-print-full` jadi selebar halaman, dan tema dipaksa terang selama mencetak.
- `pages/error-500.html` dan `pages/maintenance.html` berdiri sendiri seperti `404.html` (tanpa sidebar/topbar, path aset `../`, memuat `common.js` + `pages/error.js`).
- **Grafik memakai Chart.js** (CDN `chart.js@4.4.6/dist/chart.umd.js`, hanya di halaman bergrafik) lewat `saChart(canvas, (c) => config)` di `assets/js/charts.js`. `c` berisi warna dari token (`accent`, `prev`, `grid`, `muted`, `ink`, `bg`, `series[0–4]` dari `--sa-chart-1…5`); jangan menulis hex di konfigurasi. Grafik digambar ulang otomatis saat `themechange` dan animasinya mati saat *reduce motion*. Canvas dibungkus `.sa-chart-box` (280px) atau `.sa-chart-box-sm` (220px) dan diberi `role="img"` + `aria-label` yang merangkum isinya.
- Halaman auth berdiri sendiri (tanpa sidebar/topbar); tombol tema `#saThemeToggle` ditaruh melayang di pojok. Tombol login sosial memakai atribut `data-provider="Nama"` dan hanya simulasi; sambungkan ke OAuth saat ada backend. Logo penyedia boleh memakai warna merek langsung di SVG. Form auth memakai `novalidate` + kelas `was-validated` Bootstrap. Belum ada backend: login hanya mensimulasikan sukses lalu menuju `index.html`, dan tidak ada penjagaan akses halaman.
- Teks yang masuk `innerHTML` dari data dinamis di-escape dengan `escapeHtml()` dari `common.js`.
- Prefix `sa-` untuk semua kelas dan id buatan sendiri (`.sa-panel`, `#saChart`). Jangan menimpa kelas Bootstrap secara global; override lewat variabel `--bs-*` atau selector `.sa-…`.
- **Warna harus lewat variabel CSS** di `:root` dan `[data-bs-theme="dark"]` di `assets/css/style.css`. Jangan hardcode hex di CSS maupun JS. Grafik membaca warna dari variabel lewat `chartColors()` di `charts.js`.
- Mode gelap: atribut `data-bs-theme` pada `<html>`, disimpan di `localStorage` kunci `sa-theme`. Skrip kecil di `<head>` menerapkannya sebelum render agar tidak berkedip. Saat tema berubah, `common.js` mengirim event `themechange`; skrip halaman yang butuh (grafik) mendengarkan event itu.
- Animasi harus tetap aman untuk `prefers-reduced-motion` (CSS memadamkannya di akhir `style.css`; count-up di `dashboard.js` melewati animasi saat reduce motion aktif). Animasi baru memakai `animation-fill-mode: both` sehingga keadaan akhir tetap tampil saat animasi dimatikan.
- Tidak ada backend. Perubahan UI hanya di memori. Data contoh berada di `data.js` (termasuk data grafik `revenue`, `salesByCategory`, `paymentMethods`), `notifs` di `shell.js`.
- Teks UI dan komentar dalam bahasa Indonesia.
- Gaya kode: JS modern tanpa modul (skrip klasik berbagi scope global), indentasi 2 spasi, pembuatan baris tabel lewat template string.

## Catatan

- `html` pada `index.html` dan halaman lain diberi `data-bs-theme="light"` sebagai default; skrip head menggantinya sesuai pilihan pengguna.
- Semua alert memakai **SweetAlert2** (CDN `sweetalert2@11.14.5`, dimuat setelah Bootstrap dan sebelum `common.js` di setiap halaman). Jangan memakai `alert()` atau toast Bootstrap. Pakai `showToast(teks, icon)` untuk info singkat dan `confirmDialog({title, text, confirmText})` (mengembalikan Promise<boolean>) untuk konfirmasi. Gayanya mengikuti tema lewat kelas `sa-swal` / `sa-swal-toast` di `style.css`.
- Elemen dengan atribut `data-toast="…"` memunculkan toast saat diklik; form dengan `data-toast-form="…"` saat submit; link dengan `data-logout` membuka dialog konfirmasi keluar (semua ditangani `common.js`).
