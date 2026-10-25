# Changelog

Semua perubahan penting pada Simple Admin dicatat di file ini.

Format mengikuti [Keep a Changelog](https://keepachangelog.com/id-ID/1.1.0/), dan proyek ini memakai [Semantic Versioning](https://semver.org/lang/id/):

- **MAJOR** (2.0.0): perubahan yang memaksa pengguna mengubah kode, misalnya nama kelas `sa-` atau token `--sa-*` diganti atau dihapus.
- **MINOR** (1.1.0): halaman, komponen, atau token baru yang tidak merusak yang lama.
- **PATCH** (1.0.1): perbaikan bug, kontras, typo, dan dokumentasi.

## [Unreleased]

### Ditambahkan

- Sidebar dirender dari satu konfigurasi di `assets/js/nav.js` (brand, grup, item, submenu, badge, ikon, kartu bawah).
- Submenu yang bisa dibuka-tutup (Bootstrap Collapse); grup berisi halaman aktif terbuka otomatis.
- Grup menu baru: Aplikasi (submenu Toko) dan Halaman (Autentikasi, Halaman 404).
- Helper `escapeHtml()` di `common.js`.

### Diubah

- Markup sidebar dihapus dari ketujuh file HTML; menu aktif dan `aria-current` ditentukan otomatis dari URL.
- Kartu penyimpanan memakai kelas `.sa-sidebar-card` alih-alih gaya inline.

## [1.0.0] - 2026-10-25

Rilis pertama.

### Ditambahkan

- Kontras tombol utama di mode gelap dan beberapa token mode terang memenuhi WCAG AA.
- Tujuh halaman aplikasi: Dashboard, Pesanan, Produk, Pelanggan, Laporan, Pengguna & Akses, dan Pengaturan.
- Tiga halaman auth di `pages/auth/`: Masuk, Daftar (dengan meter kekuatan kata sandi), dan Lupa Kata Sandi, lengkap dengan validasi form, tombol tampil/sembunyi kata sandi, dan login sosial Google, GitHub, Microsoft (mode demo).
- Halaman `404.html` bertema yang menampilkan alamat yang dicari dan pintasan ke halaman populer.
- `assets/js/shell.js` untuk perilaku kerangka aplikasi (notifikasi, pencarian, dropdown, keluar akun), terpisah dari `common.js` yang dimuat di semua halaman.
- Konstanta `saRoot` di `common.js` untuk redirect yang benar dari folder mana pun.
- Tombol Keluar membuka dialog konfirmasi lalu mengarah ke halaman Masuk.
- Dashboard dengan 4 KPI (animasi count-up), grafik pendapatan SVG dengan pilihan 6 atau 12 bulan, target bulanan, pesanan terbaru dengan filter, dan aktivitas.
- Tabel interaktif: filter status pesanan, filter kategori produk, dan pencarian di setiap tabel.
- Modal Tambah Produk dan pergantian peran pengguna (tersimpan di memori).
- Mode gelap lewat `data-bs-theme`, disimpan di `localStorage` (`sa-theme`) dan mengikuti pengaturan sistem pada kunjungan pertama, tanpa kedip saat halaman dimuat.
- Notifikasi dengan penanda belum dibaca dan tombol "Tandai semua dibaca".
- Toast dan dialog konfirmasi memakai SweetAlert2 yang mengikuti tema (`showToast`, `confirmDialog`, atribut `data-toast`, `data-toast-form`, `data-logout`).
- Animasi panel, baris tabel, progress, dan grafik yang otomatis mati saat *reduce motion* aktif.
- Sidebar responsif yang menjadi offcanvas di bawah 992 px, dengan animasi buka di HP.
- Shortcut `/` untuk fokus ke kolom pencarian.
- Token `--sa-on-accent` serta gaya halaman auth dan error.
- Token warna, tipografi, dan komponen di `assets/css/style.css`, dengan prefix `sa-` untuk semua kelas dan id buatan sendiri.
- Dokumentasi: `README.md`, `docs/context.md`, `docs/design-system.md`, dan `CLAUDE.md`.

[Unreleased]: https://github.com/syahreza-satria/simple-admin/compare/v1.0.0...HEAD
[1.0.0]: https://github.com/syahreza-satria/simple-admin/releases/tag/v1.0.0
