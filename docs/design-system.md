# Design System: Simple Admin

Panduan visual dan komponen untuk template Simple Admin. Semua nilai di bawah diambil dari [assets/css/style.css](../assets/css/style.css), yang menjadi sumber kebenaran tunggal. Jika dokumen ini berbeda dengan CSS, CSS yang benar.

## Prinsip

1. **Putih bersih, satu aksen.** Latar putih (atau navy gelap), teks gelap, dan satu warna aksen biru. Warna lain hanya untuk status (hijau, kuning, merah).
2. **Garis tipis, bukan bayangan.** Pemisahan area memakai border 1px `--sa-line`. Bayangan hanya muncul saat hover panel (`--sa-shadow-panel`), pada sidebar mobile yang terbuka (`--sa-shadow-drawer`), dan pada dropdown.
3. **Padat tetapi lega.** Teks dasar kecil (0,9rem) untuk menampung banyak data, dengan padding panel yang cukup.
4. **Satu sumber warna.** Semua warna adalah variabel CSS. Mode gelap hanya mengganti nilai variabel, bukan menulis ulang komponen.
5. **Gerak membantu, tidak wajib.** Animasi memberi urutan baca, dan semuanya mati saat pengguna memilih _reduce motion_.

## Token warna

Didefinisikan di `:root` (terang) dan `[data-bs-theme="dark"]` (gelap).

### Netral dan aksen

| Token              | Terang                  | Gelap                  | Fungsi                                                     |
| ------------------ | ----------------------- | ---------------------- | ---------------------------------------------------------- |
| `--sa-bg`          | `#ffffff`               | `#0b1220`              | Latar halaman, panel, sidebar                              |
| `--sa-surface`     | `#f7f9fc`               | `#111a2b`              | Latar sekunder: header tabel, hover baris, input pencarian |
| `--sa-ink`         | `#0f1b2d`               | `#e6ecf5`              | Teks utama                                                 |
| `--sa-muted`       | `#627086`               | `#93a1b8`              | Teks sekunder, label, ikon nonaktif                        |
| `--sa-line`        | `#e6ebf2`               | `#22304a`              | Border dan pemisah                                         |
| `--sa-accent`      | `#1a56f0`               | `#5b8cff`              | Aksen: tombol utama, link, menu aktif, garis grafik        |
| `--sa-accent-hover` | `#1a4fd9`              | `#7aa2ff`              | Latar tombol utama saat hover                              |
| `--sa-accent-active` | `#1745c0`             | `#8fb0ff`              | Latar tombol utama saat ditekan                            |
| `--sa-on-accent` | `#ffffff` | `#0b1220` | Teks dan ikon di atas latar aksen: tombol utama, badge menu, tab aktif, logo, panel samping auth |
| `--sa-accent-soft` | `#eaf0ff`               | `rgba(91,140,255,.16)` | Latar lembut aksen: menu aktif, notifikasi belum dibaca    |
| `--sa-topbar-bg`   | `rgba(255,255,255,.92)` | `rgba(11,18,32,.92)`   | Latar topbar (dengan blur)                                 |
| `--sa-shadow-panel` | `0 6px 20px` navy 6% | `0 6px 20px` hitam 35% | Bayangan panel saat hover |
| `--sa-shadow-drawer` | `8px 0 32px` navy 18% | `8px 0 32px` hitam 50% | Bayangan sidebar mobile saat terbuka |

### Semantik

| Token                     | Terang                | Gelap                  | Fungsi                                     |
| ------------------------- | --------------------- | ---------------------- | ------------------------------------------ |
| `--sa-up` / `--sa-down`   | `#12805c` / `#c2362f` | `#3ecf9b` / `#ff7a73`  | Perubahan naik / turun pada KPI            |
| `--sa-chart-prev`         | `#b8c4d6`             | `#4a5a78`              | Garis periode pembanding di grafik         |
| `--sa-paid-fg` / `-bg`    | `#0f7553` / `#e7f6ef` | `#3ecf9b` / hijau 14%  | Status berhasil: Lunas, Aktif              |
| `--sa-pending-fg` / `-bg` | `#a15c00` / `#fff4e0` | `#f5b556` / kuning 14% | Status menunggu: Menunggu, Draft, Nonaktif |
| `--sa-failed-fg` / `-bg`  | `#c2362f` / `#fdecea` | `#ff7a73` / merah 14%  | Status gagal: Gagal                        |

Status "Diproses" memakai `--sa-accent` di atas `--sa-accent-soft`.

### Integrasi Bootstrap

Variabel Bootstrap ditimpa supaya komponen bawaan mengikuti tema: `--bs-primary`, `--bs-primary-rgb`, `--bs-body-font-family`, `--bs-body-color`, `--bs-body-bg`, `--bs-border-color`, `--bs-link-color`, `--bs-focus-ring-color`. Tombol `btn-primary` dan `btn-light` dikonfigurasi lewat variabel `--bs-btn-*` di `style.css`, bukan lewat penimpaan kelas.

## Tipografi

| Token       | Nilai                                                      | Dipakai untuk                                    |
| ----------- | ---------------------------------------------------------- | ------------------------------------------------ |
| `--sa-font` | Plus Jakarta Sans (400, 500, 600, 700), cadangan system-ui | Semua teks                                       |
| `--sa-mono` | JetBrains Mono (500), cadangan ui-monospace                | ID pesanan (`.sa-id`), keyboard hint (`.sa-kbd`) |

| Peran                           | Ukuran                | Bobot | Catatan                                      |
| ------------------------------- | --------------------- | ----- | -------------------------------------------- |
| Teks dasar                      | 0,9rem                | 400   | `body`                                       |
| Judul halaman `.sa-page-title`  | 1,45rem               | 700   | letter-spacing −0,02em, `text-wrap: balance` |
| Nilai KPI `.sa-kpi-value`       | 1,5rem (1,2rem di HP) | 700   | angka tabular, satu baris                    |
| Judul panel `.sa-panel-head h2` | 0,95rem               | 600   |                                              |
| Label KPI, breadcrumb, legenda  | 0,78 – 0,8rem         | 500   | `--sa-muted`                                 |
| Header tabel                    | 0,72rem               | 600   | huruf kapital, letter-spacing 0,06em         |
| Label grup menu `.sa-nav-label` | 0,68rem               | 600   | huruf kapital, letter-spacing 0,08em         |
| Status pill `.sa-status`        | 0,75rem               | 600   |                                              |

Semua angka (harga, jumlah, persentase) memakai `.sa-num` (`font-variant-numeric: tabular-nums`) agar kolom rata.

Format angka: Rupiah dengan titik ribuan lewat `toLocaleString("id-ID")` (`Rp 143.500`). Angka besar disingkat `jt` (`Rp 184,2 jt`).

## Spasi dan tata letak

- **Kerangka**: sidebar tetap di kiri (`--sa-sidebar-w: 248px`) mulai breakpoint `lg` (992px). Di bawahnya sidebar menjadi offcanvas yang dibuka dari tombol hamburger di topbar.
- **Topbar**: sticky, tinggi mengikuti isi, `z-index: 1020`, border bawah, blur latar.
- **Konten**: `container-fluid` dengan padding horizontal `px-3` (HP) dan `px-lg-4` (desktop). Padding vertikal 1,75rem atas dan 3rem bawah (1,25rem / 2rem di HP).
- **Grid**: baris `row g-4` (jarak 1,5rem). Pola umum: `col-xl-8` + `col-xl-4`, atau `col-xl-6` + `col-xl-6`. Di bawah `xl` semua kolom bertumpuk.
- **Header halaman**: breadcrumb (`.sa-crumb`) di atas judul, tombol aksi di kanan, jarak bawah `mb-4`.
- **Padding panel**: kepala panel 1rem × 1,25rem, isi 1,25rem, sel tabel 0,8rem × 1,25rem.

| Radius | Dipakai untuk              |
| ------ | -------------------------- |
| 4px    | Keyboard hint              |
| 8px    | Link menu, logo            |
| 12px   | Panel, dropdown notifikasi |
| 14px   | Modal                      |
| 999px  | Status pill, badge         |
| 50%    | Avatar, titik notifikasi   |

## Komponen

### Panel `.sa-panel`

Wadah dasar: latar `--sa-bg`, border 1px `--sa-line`, radius 12px. Kepala opsional `.sa-panel-head` (judul kiri, kontrol kanan, border bawah). Hover memberi bayangan halus.

### KPI strip `.sa-kpis`

Satu panel berisi empat `.sa-kpi` yang dipisah garis vertikal, bukan empat kartu terpisah. Tiap KPI: label, nilai besar, delta (`.sa-delta.sa-up` / `.sa-down` dengan ▲ / ▼) dan teks pembanding. Di bawah `lg` menjadi 2 × 2.

### Sidebar dan menu `.sa-sidebar`, `.sa-nav`

Logo (`.sa-brand`), grup menu berlabel, link dengan ikon SVG 18px. Menu aktif: teks `--sa-accent` di atas `--sa-accent-soft`. Hover: latar `--sa-surface`. Badge hitungan di kanan link. Kartu penyimpanan di dasar sidebar.

### Tombol

- **Utama** `btn btn-primary btn-sm`: aksi utama halaman (Tambah Produk, Simpan). Teks memakai `--sa-on-accent` (putih di mode terang, navy di mode gelap) di atas `--sa-accent`; hover `--sa-accent-hover`, ditekan `--sa-accent-active`, disabled tetap `--sa-accent` dengan opacity Bootstrap.
- **Sekunder** `btn btn-light btn-sm`: aksi pendukung (Ekspor). Border `--sa-line`.
- **Ikon** `.sa-icon-btn`: 36 × 36px, ikon SVG 18px, dipakai untuk notifikasi dan toggle tema.
- Tombol mengecil sedikit saat ditekan (`scale(.97)`).
- Satu halaman hanya punya satu tombol utama.

### Tabel `.sa-table`

Header kecil huruf kapital di atas `--sa-surface`, baris dibatasi `--sa-line`, hover baris `--sa-surface`. Kolom angka rata kanan (`text-end sa-num`). Dibungkus `.table-responsive`. Keadaan kosong memakai `.sa-empty` (satu sel penuh, teks `--sa-muted`).

### Status pill `.sa-status`

Titik berwarna + label, radius penuh. Varian: `.sa-st-paid`, `.sa-st-pending`, `.sa-st-process`, `.sa-st-failed`.

| Status                      | Kelas           | Dipakai di                |
| --------------------------- | --------------- | ------------------------- |
| Lunas / Aktif               | `sa-st-paid`    | Pesanan, produk, pengguna |
| Menunggu / Draft / Nonaktif | `sa-st-pending` | Pesanan, produk, pengguna |
| Diproses                    | `sa-st-process` | Pesanan                   |
| Gagal                       | `sa-st-failed`  | Pesanan                   |

### Form

Kontrol Bootstrap (`form-control`, `form-select`, `form-check form-switch`). Label `form-label small fw-medium`. Fokus: border `--sa-accent` dengan cincin `--bs-focus-ring-color`. Kolom pencarian di topbar punya ikon dan hint `/`.

### Avatar `.sa-avatar`

Lingkaran 34px, inisial 2 huruf, latar `--sa-accent-soft`, teks `--sa-accent`. Dipakai di topbar, daftar pelanggan, dan pengguna (`.sa-user` menata avatar + nama + email).

### Notifikasi `.sa-notif`

Dropdown 340px (maks lebar layar − 2rem). Kepala berisi judul dengan hitungan dan tombol "Tandai semua dibaca". Item belum dibaca: latar `--sa-accent-soft` dan titik aksen di kiri. Keadaan kosong: "Tidak ada notifikasi". Titik `.sa-dot` pada ikon lonceng berdenyut dan hilang saat semua terbaca.

### Grafik `.sa-chart`

SVG murni tanpa library, `viewBox` 720 × 280. Garis tahun ini memakai `--sa-accent` (tebal 2,5, ujung bulat) dengan area gradien; garis pembanding putus-putus `--sa-chart-prev`. Grid horizontal putus-putus `--sa-line`. Warna dibaca dari variabel CSS saat render, dan grafik digambar ulang saat tema berganti.

### Progress `.progress` / `.sa-goal`

Bar setebal 6px, latar `--sa-surface`, isi `--sa-accent`. Dipakai untuk target, kategori, dan penyimpanan. Selalu berpasangan dengan label dan nilai di atasnya, serta atribut `role="progressbar"` dan `aria-label`.

### Aktivitas `.sa-activity`

Garis waktu vertikal: titik berbingkai aksen yang dihubungkan garis `--sa-line`.

### Modal, toast, dan dialog

Modal terpusat, radius 14px, tanpa border luar, bayangan Bootstrap. Toast dan dialog konfirmasi memakai SweetAlert2 yang diberi gaya tema (`sa-swal`, `sa-swal-toast`): latar `--sa-bg`, teks `--sa-ink`, border `--sa-line`. Toast muncul di kanan bawah selama 3 detik dengan progress bar `--sa-accent` dan tombol tutup; panggil `showToast(teks, icon)`. Dialog konfirmasi (`confirmDialog(...)`) memakai tombol `btn-primary` dan `btn-light`, dengan fokus awal di "Batal". Untuk aksi destruktif atau tak bisa dibatalkan, selalu minta konfirmasi.

### Halaman auth

Layout dua kolom mulai `lg`: panel samping berlatar `--sa-accent` (judul, tiga poin keunggulan, ornamen lingkaran transparan) dan kolom formulir di tengah dengan kartu selebar maksimum 400px. Di bawah `lg` panel samping disembunyikan dan logo tampil di atas formulir. Judul 1,55rem/700, subjudul `--sa-muted`. Input memakai padding 0,6rem × 0,8rem. Kolom kata sandi (`.sa-pw`) punya tombol teks "Lihat"/"Sembunyi" di kanan. Meter kekuatan (`.sa-meter`) memakai empat tingkat: `--sa-down`, `--sa-pending-fg`, `--sa-accent`, `--sa-up`. Validasi memakai gaya Bootstrap (`was-validated`) dengan pesan `invalid-feedback` berbahasa Indonesia. Login sosial (Google, GitHub, Microsoft) ada di bawah formulir masuk dan daftar, dipisah pembatas "atau masuk dengan": tombol Google selebar penuh, GitHub dan Microsoft berdampingan, memakai `btn-light` dengan logo 18px. Logo penyedia adalah pengecualian dari aturan token warna: warna merek Google dan Microsoft ditulis langsung di SVG, sedangkan logo GitHub memakai `currentColor` agar ikut tema. Tombol tema melayang di pojok kanan atas. Kartu masuk dengan `sa-rise`, panel samping dengan `sa-fade`.

### Halaman error (404)

Kartu terpusat selebar maksimum 480px. Kode "4 ◎ 4" berukuran 8rem/700 berwarna `--sa-accent`, dengan angka nol diganti ikon pencarian dalam lingkaran `--sa-accent-soft` yang melayang pelan (`sa-float`, 3,2s). Alamat yang dicari ditampilkan dalam `code` ber-font mono (`.sa-error-path`). Aksi utama "Kembali ke Dashboard" (`btn-primary`) dan sekunder "Halaman sebelumnya" (`btn-light`), diikuti tautan halaman populer. Di HP kode mengecil ke 5,5rem.

## Mode gelap

- Diaktifkan lewat atribut `data-bs-theme="dark"` pada `<html>`; tombol toggle ada di topbar (ikon matahari untuk terang, bulan untuk gelap).
- Pilihan disimpan di `localStorage` kunci `sa-theme`. Kunjungan pertama mengikuti `prefers-color-scheme`.
- Skrip kecil di `<head>` menerapkan tema sebelum render untuk mencegah kilatan.
- Pada mode gelap aksen dicerahkan (`#5b8cff`), latar status memakai warna transparan 14%, dan bayangan hover diperkuat.
- Komponen baru cukup memakai token di atas, tanpa aturan khusus mode gelap.

## Gerak

| Animasi          | Keyframe                   | Durasi                                   | Kegunaan                                                    |
| ---------------- | -------------------------- | ---------------------------------------- | ----------------------------------------------------------- |
| Panel masuk      | `sa-rise`                  | 0,55s, easing `cubic-bezier(.2,.7,.2,1)` | Panel naik 14px sambil muncul, delay bertahap 0,05 – 0,36s  |
| Fade             | `sa-fade`                  | 0,4 – 0,45s                              | Sidebar, topbar, halaman                                    |
| Baris masuk      | `sa-row`                   | 0,4 – 0,45s                              | Baris tabel (delay 55ms per baris) dan item aktivitas       |
| Isi progress     | `sa-grow`                  | 1s, delay 0,4s                           | Bar progress terisi dari kiri                               |
| Ungkap grafik    | `sa-reveal`                | 1,1s, delay 0,35s                        | Grafik terungkap kiri ke kanan; titik akhir fade setelahnya |
| Hitung KPI       | JS `requestAnimationFrame` | 1,1s, easing kubik                       | Angka naik dari 0                                           |
| Detak notifikasi | `sa-pulse`                 | 2s, berulang                             | Titik notifikasi; warna cincin diturunkan dari `--sa-accent` lewat `color-mix()` |
| Goyang ikon      | `sa-wiggle`                | 0,5s                                     | Ikon tombol saat hover                                      |
| Transisi tema    | `transition`               | 0,3s                                     | Warna latar, teks, border                                   |

Aturan:

- Pakai `animation-fill-mode: both` agar keadaan akhir tetap benar saat animasi dimatikan.
- Aturan `prefers-reduced-motion: reduce` di akhir `style.css` mematikan semua animasi dan transisi. Animasi JS harus memeriksa `matchMedia("(prefers-reduced-motion: reduce)")` sendiri.
- Animasi hanya mengubah `opacity`, `transform`, `width`, atau warna. Hindari menganimasikan properti yang memicu layout besar.

## Aksesibilitas

- Fokus keyboard selalu terlihat: `:focus-visible` memberi outline 2px `--sa-accent` dengan offset 2px.
- Tombol ikon wajib punya `aria-label`. Toggle tema memakai `aria-pressed` dan label yang berubah ("Aktifkan mode gelap" / "terang").
- Menu aktif memakai `aria-current="page"`.
- SVG dekoratif di dalam tombol tidak perlu teks; grafik memakai `role="img"` dan `aria-label`.
- SweetAlert2 mengelola `role` dan `aria-live` toast serta fokus dialog; jangan menggantinya dengan elemen buatan sendiri.
- Warna status tidak berdiri sendiri: selalu disertai label teks.
- Kontras: semua pasangan teks/latar memenuhi WCAG 2.1 AA (≥ 4,5:1) di mode terang dan gelap, termasuk tombol utama dalam keadaan normal, hover, dan ditekan. Teks di atas latar aksen selalu memakai `--sa-on-accent`, bukan putih tetap. `--sa-muted` hanya untuk teks sekunder berukuran ≥ 0,72rem. Saat mengubah token, hitung ulang kontrasnya.

## Penamaan

- Semua kelas dan id buatan sendiri diawali `sa-` (`.sa-panel`, `#saChart`).
- Pola nama: `sa-<komponen>` untuk akar, `sa-<komponen>-<bagian>` untuk bagian (`sa-kpi-label`), `sa-st-<status>` untuk varian status.
- Jangan menimpa kelas Bootstrap secara global; ubah lewat variabel `--bs-*` atau selector yang diawali `.sa-`.

## Menambah komponen baru

1. Pakai token yang ada (`--sa-*`). Tambah token baru hanya jika perannya belum tercakup, dan definisikan nilai terang **dan** gelap.
2. Gunakan border `--sa-line`, radius dari tabel di atas, dan ukuran teks dari skala tipografi.
3. Beri `aria-label` pada kontrol tanpa teks dan pastikan fokus keyboard terlihat.
4. Jika beranimasi, gunakan keyframe yang sudah ada atau tambahkan yang baru dengan `both`, dan pastikan padam di bawah _reduce motion_.
5. Uji di mode terang, mode gelap, dan lebar HP (360px).
