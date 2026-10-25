# Kebijakan Keamanan

Simple Admin adalah template statis: tidak ada backend, autentikasi, atau penyimpanan data. Meski begitu, kode template akan disalin ke proyek sungguhan, jadi masalah keamanan di dalamnya tetap penting.

## Versi yang didukung

| Versi | Didukung |
| ----- | -------- |
| 1.x   | Ya       |
| < 1.0 | Tidak    |

## Melaporkan celah keamanan

Jangan melaporkan celah keamanan lewat issue publik.

Laporkan secara pribadi lewat [GitHub Security Advisories](https://github.com/syahreza-satria/simple-admin/security/advisories/new) (tab **Security** → **Report a vulnerability**). Sertakan:

- File dan baris kode yang bermasalah.
- Langkah untuk mengulangi atau contoh masukan yang memicunya.
- Dampak yang mungkin terjadi pada proyek yang memakai template ini.

Laporan akan ditanggapi dalam 7 hari. Perbaikan dirilis sebagai versi patch dan dicatat di [CHANGELOG.md](CHANGELOG.md), dengan kredit kepada pelapor jika berkenan.

## Hal yang perlu diperhatikan saat memakai template

Template ini aman untuk data contoh bawaannya, tetapi perlu disesuaikan sebelum dipakai dengan data sungguhan:

- **Escape data sebelum masuk `innerHTML`.** Baris tabel, notifikasi, dan isi lain dibangun dengan template string lalu dimasukkan lewat `innerHTML`. Jika data berasal dari API atau masukan pengguna (misalnya form Tambah Produk), escape terlebih dulu dengan helper `escapeHtml()` dari `common.js` (sidebar sudah memakainya), atau pakai `textContent`, untuk mencegah XSS.
- **Validasi di server.** Validasi form di template hanya di sisi browser. Proyek sungguhan wajib memvalidasi ulang di backend.
- **Autentikasi dan otorisasi.** Halaman Masuk, Daftar, dan Lupa Kata Sandi hanya simulasi: kata sandi apa pun diterima, login sosial belum memakai OAuth, dan halaman aplikasi bisa dibuka tanpa login. Sambungkan form ke backend, lindungi halaman di sisi server, dan pakai HTTPS. Halaman Pengguna & Akses juga hanya tampilan; hak akses harus diperiksa di backend, bukan dengan menyembunyikan menu.
- **Meter kekuatan kata sandi** hanya membantu pengguna. Aturan kata sandi tetap harus ditegakkan di backend.
- **Aset dari CDN.** Bootstrap, SweetAlert2, dan font dimuat dari CDN dengan versi yang dikunci. Untuk produksi, pertimbangkan menambahkan atribut `integrity` (SRI) dan `crossorigin`, atau meng-host aset sendiri.
- **Content Security Policy.** Skrip tema di `<head>` ditulis inline. Jika memakai CSP ketat, pindahkan ke file terpisah atau izinkan lewat hash/nonce.
