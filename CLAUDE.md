# CLAUDE.md

Template dashboard admin statis berbahasa Indonesia: HTML + CSS + JS murni di atas Bootstrap 5.3.3 (CDN). Tidak ada build, package manager, atau test. Lihat [README.md](README.md) untuk gambaran lengkap, [docs/context.md](docs/context.md) untuk konteks dan keputusan proyek, dan [docs/design-system.md](docs/design-system.md) untuk token serta komponen visual.

## Menjalankan

Buka `index.html` di browser atau `python -m http.server 8000`. Tidak ada perintah build/lint/test.

## Struktur

- `index.html` (dashboard) di root; halaman lain di `pages/` (`orders`, `products`, `customers`, `reports`, `users`, `settings`). Path aset dari `pages/` diawali `../`; link ke dashboard `../index.html`, ke halaman lain relatif satu folder.
- `assets/css/style.css`: satu file untuk semua gaya, tema, dan animasi.
- `assets/js/common.js` dimuat di semua halaman (alert SweetAlert2, notifikasi, mode gelap, shortcut `/`, helper `rupiah`, `initials`, `norm`, `emptyRow`, `statusLabel`).
- `assets/js/data.js`: data contoh. Dimuat hanya oleh halaman yang butuh data.
- `assets/js/pages/<halaman>.js`: logika khusus halaman. Urutan muat: Bootstrap bundle, `common.js`, `data.js` (jika perlu), skrip halaman.

## Aturan penting

- **Sidebar dan topbar diduplikasi di ketujuh file HTML (`index.html` + `pages/*.html`).** Mengubah menu, topbar, atau markup bersama berarti mengedit semua file. Cek ketujuhnya sebelum menyatakan selesai. Modal "Tambah Produk" ada di `index.html` dan `products.html`.
- Menu aktif ditandai statis per file (`nav-link active` + `aria-current="page"`). Halaman baru harus memindahkan penanda ini ke link-nya sendiri.
- Prefix `sa-` untuk semua kelas dan id buatan sendiri (`.sa-panel`, `#saChart`). Jangan menimpa kelas Bootstrap secara global; override lewat variabel `--bs-*` atau selector `.sa-…`.
- **Warna harus lewat variabel CSS** di `:root` dan `[data-bs-theme="dark"]` di `assets/css/style.css`. Jangan hardcode hex di CSS maupun JS. Grafik membaca warna dari variabel lewat `chartColors()` di `dashboard.js`.
- Mode gelap: atribut `data-bs-theme` pada `<html>`, disimpan di `localStorage` kunci `sa-theme`. Skrip kecil di `<head>` menerapkannya sebelum render agar tidak berkedip. Saat tema berubah, `common.js` mengirim event `themechange`; skrip halaman yang butuh (grafik) mendengarkan event itu.
- Animasi harus tetap aman untuk `prefers-reduced-motion` (CSS memadamkannya di akhir `style.css`; count-up di `dashboard.js` melewati animasi saat reduce motion aktif). Animasi baru memakai `animation-fill-mode: both` sehingga keadaan akhir tetap tampil saat animasi dimatikan.
- Tidak ada backend. Perubahan UI hanya di memori. Data contoh berada di `data.js`, `notifs` di `common.js`, data grafik di `pages/dashboard.js`.
- Teks UI dan komentar dalam bahasa Indonesia.
- Gaya kode: JS modern tanpa modul (skrip klasik berbagi scope global), indentasi 2 spasi, pembuatan baris tabel lewat template string.

## Catatan

- `html` pada `index.html` dan halaman lain diberi `data-bs-theme="light"` sebagai default; skrip head menggantinya sesuai pilihan pengguna.
- Semua alert memakai **SweetAlert2** (CDN `sweetalert2@11.14.5`, dimuat setelah Bootstrap dan sebelum `common.js` di setiap halaman). Jangan memakai `alert()` atau toast Bootstrap. Pakai `showToast(teks, icon)` untuk info singkat dan `confirmDialog({title, text, confirmText})` (mengembalikan Promise<boolean>) untuk konfirmasi. Gayanya mengikuti tema lewat kelas `sa-swal` / `sa-swal-toast` di `style.css`.
- Elemen dengan atribut `data-toast="…"` memunculkan toast saat diklik; form dengan `data-toast-form="…"` saat submit; link dengan `data-logout` membuka dialog konfirmasi keluar (semua ditangani `common.js`).
