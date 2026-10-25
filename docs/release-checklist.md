# Checklist Rilis

Langkah untuk merilis versi baru Simple Admin. Ganti `X.Y.Z` dengan nomor versi yang akan dirilis, misalnya `1.0.0`.

## 1. Tentukan nomor versi

Ikuti aturan di [CHANGELOG.md](../CHANGELOG.md):

| Jenis perubahan | Naikkan | Contoh |
| --- | --- | --- |
| Nama kelas `sa-`, token `--sa-*`, atau nama fungsi di `common.js` diganti/dihapus | MAJOR | 1.4.2 → 2.0.0 |
| Halaman, komponen, atau token baru | MINOR | 1.4.2 → 1.5.0 |
| Perbaikan bug, kontras, typo, dokumentasi | PATCH | 1.4.2 → 1.4.3 |

## 2. Periksa kode

- [ ] Tidak ada `console.log` sisa debugging di `assets/js/`.
- [ ] Tidak ada warna hex di CSS di luar blok `:root` dan `[data-bs-theme="dark"]`, dan tidak ada hex di JS.
- [ ] Semua versi CDN dikunci (tanpa `@latest`) dan sama di semua file HTML (halaman aplikasi, UI Toolkit, auth, dan `404.html`):
  - `bootstrap@5.3.3` (CSS dan bundle JS)
  - `sweetalert2@11.14.5`
- [ ] Topbar identik di ketujuh file HTML; setiap halaman aplikasi hanya punya `<aside id="saSidebar">` kosong.
- [ ] Semua `href` di `assets/js/nav.js` mengarah ke file yang ada.
- [ ] Setiap file HTML menandai link-nya sendiri dengan `nav-link active` dan `aria-current="page"`.
- [ ] Halaman aplikasi dan UI Toolkit memuat `nav.js` lalu `shell.js` setelah `common.js`; halaman auth dan `404.html` tidak.
- [ ] Semua link antarhalaman berfungsi (dari `index.html` ke `pages/…`, dari `pages/` ke `../index.html`, dari `pages/auth/` ke `../../index.html`).

Pemeriksaan cepat dari terminal (Git Bash atau Linux/macOS):

```bash
grep -rn "console.log" assets/js/
grep -rn "@latest" index.html 404.html pages/
grep -rnoE "#[0-9a-fA-F]{3,8}\b" assets/js/
grep -c "sa-sidebar" index.html pages/*.html
grep -L "shell.js" index.html pages/*.html pages/ui/*.html   # harus kosong
```

## 3. Uji manual

Jalankan `python -m http.server 8000`, lalu buka setiap halaman.

| Halaman | Terang | Gelap | 360 px | 1280 px | Console bersih |
| --- | --- | --- | --- | --- | --- |
| Dashboard (`index.html`) | [ ] | [ ] | [ ] | [ ] | [ ] |
| Pesanan | [ ] | [ ] | [ ] | [ ] | [ ] |
| Produk | [ ] | [ ] | [ ] | [ ] | [ ] |
| Pelanggan | [ ] | [ ] | [ ] | [ ] | [ ] |
| Laporan | [ ] | [ ] | [ ] | [ ] | [ ] |
| Pengguna & Akses | [ ] | [ ] | [ ] | [ ] | [ ] |
| Pengaturan | [ ] | [ ] | [ ] | [ ] | [ ] |
| Masuk | [ ] | [ ] | [ ] | [ ] | [ ] |
| Daftar | [ ] | [ ] | [ ] | [ ] | [ ] |
| Lupa kata sandi | [ ] | [ ] | [ ] | [ ] | [ ] |
| UI: Tombol | [ ] | [ ] | [ ] | [ ] | [ ] |
| UI: Form | [ ] | [ ] | [ ] | [ ] | [ ] |
| UI: Status & badge | [ ] | [ ] | [ ] | [ ] | [ ] |
| 404 | [ ] | [ ] | [ ] | [ ] | [ ] |

Fitur yang harus dicoba:

- [ ] Toggle tema berpindah tanpa kedip, dan pilihan bertahan setelah halaman dimuat ulang.
- [ ] Kunjungan pertama (hapus `localStorage` kunci `sa-theme`) mengikuti tema sistem.
- [ ] Grafik dashboard: pilihan 6 dan 12 bulan, dan warna ikut berganti saat tema diganti.
- [ ] Filter status dan pencarian di Dashboard dan Pesanan; keadaan kosong tampil saat tidak ada hasil.
- [ ] Filter kategori, pencarian, dan modal Tambah Produk di halaman Produk.
- [ ] Ubah peran di Pengguna & Akses memunculkan toast.
- [ ] Notifikasi: tandai satu dibaca, tandai semua dibaca, titik lonceng hilang.
- [ ] Shortcut `/` memfokuskan kolom pencarian.
- [ ] Tombol Keluar membuka dialog konfirmasi SweetAlert2, lalu mengarah ke halaman Masuk.
- [ ] Form auth kosong menampilkan pesan validasi; form Masuk yang valid mengarah ke Dashboard.
- [ ] Meter kekuatan kata sandi berubah saat mengetik; "Ulangi kata sandi" yang berbeda ditolak.
- [ ] Tombol Lihat/Sembunyi kata sandi dan tombol login sosial berfungsi.
- [ ] Di halaman UI Toolkit, tombol Salin menyalin kode yang sama dengan preview, dan demo (memuat, konfirmasi, validasi) berjalan.
- [ ] `404.html` menampilkan alamat yang dicari dan tombol "Halaman sebelumnya" berfungsi.
- [ ] Sidebar offcanvas di bawah 992 px terbuka dan tertutup dengan benar.
- [ ] Menu aktif benar di setiap halaman, dan grup submenunya terbuka otomatis.
- [ ] Dengan *reduce motion* aktif, tidak ada animasi dan angka KPI langsung tampil.
- [ ] Navigasi keyboard (Tab, Enter, Esc) bekerja di menu, dropdown, dan modal.
- [ ] Membuka `index.html` langsung dari file (tanpa server) tetap berfungsi.

Browser minimal: Chrome atau Edge, Firefox, dan Safari atau Chrome di HP.

Opsional: jalankan Lighthouse (DevTools → Lighthouse) di Dashboard. Target Accessibility dan Best Practices ≥ 90.

## 4. Perbarui dokumentasi

- [ ] Pindahkan isi `[Unreleased]` di `CHANGELOG.md` ke bagian baru `## [X.Y.Z] - YYYY-MM-DD`.
- [ ] Perbarui tautan perbandingan di bagian bawah `CHANGELOG.md`.
- [ ] `README.md`, `docs/context.md`, dan `docs/design-system.md` sesuai dengan kode (fitur, struktur, versi library).
- [ ] Tulis catatan rilis di `docs/release-notes/vX.Y.Z.md` (salin dari versi sebelumnya sebagai acuan).
- [ ] Screenshot di README masih sesuai tampilan terbaru.

## 5. Commit, tag, dan push

```bash
git checkout main
git pull
git add -A
git commit -m "Rilis vX.Y.Z"
git tag -a vX.Y.Z -m "Simple Admin vX.Y.Z"
git push origin main
git push origin vX.Y.Z
```

## 6. Buat GitHub Release

Lewat web: buka **Releases** → **Draft a new release** → pilih tag `vX.Y.Z` → judul `Simple Admin vX.Y.Z` → tempel isi `docs/release-notes/vX.Y.Z.md` → **Publish release**.

Atau lewat GitHub CLI:

```bash
gh release create vX.Y.Z --title "Simple Admin vX.Y.Z" --notes-file docs/release-notes/vX.Y.Z.md
```

GitHub otomatis melampirkan ZIP dan TAR.GZ dari source code. Folder `.github/` tidak ikut di arsip karena diatur di `.gitattributes`.

## 7. Setelah rilis

- [ ] Unduh ZIP dari halaman rilis, ekstrak, lalu buka `index.html` untuk memastikan arsip lengkap.
- [ ] Jika memakai GitHub Pages untuk demo, pastikan demo menampilkan versi terbaru.
- [ ] Tambahkan bagian `## [Unreleased]` kosong di `CHANGELOG.md` jika belum ada.
