# Panduan Kontribusi

Terima kasih sudah ingin membantu Simple Admin. Template ini sengaja dibuat sederhana: HTML, CSS, dan JavaScript murni di atas Bootstrap 5.3.3, tanpa build, package manager, atau framework. Kontribusi sebaiknya menjaga kesederhanaan itu.

Sebelum mulai, baca [docs/context.md](docs/context.md) untuk konteks proyek dan [docs/design-system.md](docs/design-system.md) untuk aturan visual.

## Cara berkontribusi

- **Melaporkan bug**: buka [issue baru](https://github.com/syahreza-satria/simple-admin/issues/new/choose) dengan template "Laporan bug". Sertakan halaman, browser, mode tema, dan langkah untuk mengulangi.
- **Mengusulkan fitur**: buka issue dengan template "Usulan fitur" dulu sebelum menulis kode, agar bisa didiskusikan apakah sesuai dengan arah template.
- **Memperbaiki dokumentasi**: typo dan perbaikan kecil boleh langsung lewat pull request.
- **Masalah keamanan**: jangan buka issue publik. Ikuti [SECURITY.md](SECURITY.md).

## Menyiapkan proyek

```bash
git clone https://github.com/syahreza-satria/simple-admin.git
cd simple-admin
python -m http.server 8000   # lalu buka http://localhost:8000
```

Tidak ada dependensi yang perlu dipasang. Bootstrap, SweetAlert2, dan font dimuat dari CDN.

## Alur pull request

1. Fork repo, lalu buat branch dari `main` dengan nama yang menjelaskan isinya, misalnya `fix/kontras-status-lunas` atau `feat/halaman-login`.
2. Buat perubahan sekecil mungkin untuk satu tujuan. Satu pull request, satu topik.
3. Uji manual sesuai [checklist pengujian](#checklist-pengujian).
4. Tambahkan catatan di bagian `[Unreleased]` pada [CHANGELOG.md](CHANGELOG.md).
5. Buka pull request ke `main` dan isi template yang tersedia.

## Aturan kode

### Struktur

- Dashboard ada di `index.html`; halaman aplikasi lain (termasuk `order-detail.html`, `error-500.html`, `maintenance.html`) di `pages/` (path aset diawali `../`); halaman auth di `pages/auth/` (path aset diawali `../../`); `404.html` di root.
- Semua gaya ada di satu file: `assets/css/style.css`.
- Skrip dimuat berurutan: Bootstrap bundle, SweetAlert2, Chart.js (jika ada grafik), `common.js`, `nav.js` dan `shell.js` (hanya halaman aplikasi), `data.js` (jika perlu), `charts.js` (jika ada grafik), lalu skrip halaman di `assets/js/pages/`.
- Ikon memakai Bootstrap Icons: `<i class="bi bi-nama" aria-hidden="true"></i>`. Jangan menambah SVG ikon baru.
- `common.js` dimuat di semua halaman termasuk auth, jadi jangan menaruh kode yang butuh sidebar atau topbar di sana. Kode seperti itu masuk ke `shell.js`.
- Data contoh, termasuk data grafik, ada di `assets/js/data.js`; notifikasi di `shell.js`.

### Sidebar dan topbar

Sidebar dirender dari `assets/js/nav.js`. Menambah atau mengubah menu cukup di file itu; jangan menulis markup menu di HTML. Menu aktif dan grup submenu yang terbuka ditentukan otomatis dari URL.

Topbar juga dirender dari `nav.js` (`saUser`, `saAccountMenu`, `saSearchPlaceholder`). Setiap halaman aplikasi cukup berisi `<aside id="saSidebar">` dan `<header id="saTopbar">` yang kosong. Modal "Tambah Produk" ada di `index.html` dan `pages/products.html`.

### CSS

- Semua kelas dan id buatan sendiri diawali `sa-` (`.sa-panel`, `#saChart`).
- Jangan menimpa kelas Bootstrap secara global. Ubah lewat variabel `--bs-*` atau selector yang diawali `.sa-`.
- Semua warna lewat variabel CSS di `:root` dan `[data-bs-theme="dark"]`. Jangan menulis hex langsung di CSS maupun JS. Token baru wajib punya nilai terang **dan** gelap.
- Animasi baru memakai `animation-fill-mode: both` dan harus padam di bawah `prefers-reduced-motion: reduce`. Animasi JS memeriksa `matchMedia("(prefers-reduced-motion: reduce)")` sendiri.

### JavaScript

- JavaScript modern tanpa modul (skrip klasik yang berbagi scope global). Jangan menambah build step atau `import`.
- Indentasi 2 spasi. Baris tabel dibuat dengan template string.
- Pakai `showToast(teks, icon)` untuk info singkat dan `confirmDialog({ title, text, confirmText })` untuk konfirmasi. Jangan memakai `alert()`, `confirm()`, atau toast Bootstrap.
- Grafik dibuat lewat `saChart(canvas, (c) => config)` di `charts.js`; ambil warna dari `c`, bukan hex. Penggambaran ulang saat ganti tema sudah otomatis.

### Bahasa

Teks UI, komentar kode, pesan commit, dan dokumentasi ditulis dalam bahasa Indonesia.

### Dependensi

Dependensi baru (library CDN) hanya ditambahkan jika sudah disepakati di issue. Sebutkan versi yang tepat, misalnya `sweetalert2@11.14.5`, bukan `@latest`.

## Pesan commit

Tulis singkat dalam kalimat perintah, bahasa Indonesia, maksimal sekitar 70 karakter di baris pertama:

```
Perbaiki kontras status Lunas di mode terang
Tambah halaman login
Tambah submenu Laporan di sidebar
```

Jika perlu penjelasan, tambahkan paragraf setelah satu baris kosong.

## Checklist pengujian

Belum ada pengujian otomatis, jadi setiap perubahan diuji manual:

- [ ] Halaman yang diubah tampil benar di **mode terang** dan **mode gelap**.
- [ ] Tampilan benar di lebar **360 px**, **768 px**, dan **1280 px** ke atas.
- [ ] Sidebar offcanvas bisa dibuka dan ditutup di bawah 992 px.
- [ ] Tidak ada error di console browser.
- [ ] Semua kontrol bisa dipakai dengan keyboard dan fokusnya terlihat.
- [ ] Tidak ada animasi saat *reduce motion* aktif, dan keadaan akhir tetap tampil.
- [ ] Jika mengubah markup bersama di HTML (misalnya modal): semua file yang memakainya sudah diubah.
- [ ] Teks dinamis yang masuk `innerHTML` memakai `escapeHtml()`.
- [ ] Diuji minimal di Chrome atau Edge, dan Firefox.

## Kode etik

Proyek ini mengikuti [Kode Etik](CODE_OF_CONDUCT.md). Dengan berpartisipasi, Anda setuju untuk mematuhinya.

## Lisensi

Dengan mengirim kontribusi, Anda setuju kontribusi tersebut dirilis di bawah [lisensi MIT](LICENSE) yang sama dengan proyek ini.
