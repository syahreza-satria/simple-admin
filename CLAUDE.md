# CLAUDE.md

Template dashboard admin statis berbahasa Indonesia: HTML + CSS + JS murni di atas Bootstrap 5.3.3 (CDN). Tidak ada build, package manager, atau test. Lihat [README.md](README.md) untuk gambaran lengkap.

## Menjalankan

Buka `index.html` di browser atau `python -m http.server 8000`. Tidak ada perintah build/lint/test.

## Struktur

- Satu file HTML per halaman: `index.html` (dashboard), `orders`, `products`, `customers`, `reports`, `users`, `settings`.
- `css/style.css`: satu file untuk semua gaya, tema, dan animasi.
- `js/common.js` dimuat di semua halaman (toast, notifikasi, mode gelap, shortcut `/`, helper `rupiah`, `initials`, `norm`, `emptyRow`, `statusLabel`).
- `js/data.js`: data contoh. Dimuat hanya oleh halaman yang butuh data.
- `js/<halaman>.js`: logika khusus halaman. Urutan muat: Bootstrap bundle, `common.js`, `data.js` (jika perlu), skrip halaman.

## Aturan penting

- **Sidebar, topbar, dan toast diduplikasi di ketujuh file HTML.** Mengubah menu, topbar, atau markup bersama berarti mengedit semua file. Cek ketujuhnya sebelum menyatakan selesai. Modal "Tambah Produk" ada di `index.html` dan `products.html`.
- Menu aktif ditandai statis per file (`nav-link active` + `aria-current="page"`). Halaman baru harus memindahkan penanda ini ke link-nya sendiri.
- Prefix `sa-` untuk semua kelas dan id buatan sendiri (`.sa-panel`, `#saChart`). Jangan menimpa kelas Bootstrap secara global; override lewat variabel `--bs-*` atau selector `.sa-…`.
- **Warna harus lewat variabel CSS** di `:root` dan `[data-bs-theme="dark"]` di `css/style.css`. Jangan hardcode hex di CSS maupun JS. Grafik membaca warna dari variabel lewat `chartColors()` di `dashboard.js`.
- Mode gelap: atribut `data-bs-theme` pada `<html>`, disimpan di `localStorage` kunci `sa-theme`. Skrip kecil di `<head>` menerapkannya sebelum render agar tidak berkedip. Saat tema berubah, `common.js` mengirim event `themechange`; skrip halaman yang butuh (grafik) mendengarkan event itu.
- Animasi harus tetap aman untuk `prefers-reduced-motion` (CSS memadamkannya di akhir `style.css`; count-up di `dashboard.js` melewati animasi saat reduce motion aktif). Animasi baru memakai `animation-fill-mode: both` sehingga keadaan akhir tetap tampil saat animasi dimatikan.
- Tidak ada backend. Perubahan UI hanya di memori. Data contoh berada di `data.js`, `notifs` di `common.js`, data grafik di `dashboard.js`.
- Teks UI dan komentar dalam bahasa Indonesia.
- Gaya kode: JS modern tanpa modul (skrip klasik berbagi scope global), indentasi 2 spasi, pembuatan baris tabel lewat template string.

## Catatan

- `html` pada `index.html` dan halaman lain diberi `data-bs-theme="light"` sebagai default; skrip head menggantinya sesuai pilihan pengguna.
- Elemen dengan atribut `data-toast="…"` otomatis memunculkan toast saat diklik; form dengan `data-toast-form="…"` memunculkan toast saat submit (ditangani `common.js`).
