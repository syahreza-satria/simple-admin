/* ---- Data contoh (ganti dengan data dari API Anda) ---- */
const orders = [
  { id: "INV-10488", name: "Putri Ananda", date: "08 Okt 2026", status: "process", total: 245000 },
  { id: "INV-10487", name: "Bagas Pratama", date: "08 Okt 2026", status: "pending", total: 189000 },
  { id: "INV-10486", name: "Nadia Rahma", date: "07 Okt 2026", status: "paid", total: 412500 },
  { id: "INV-10485", name: "Fajar Nugroho", date: "07 Okt 2026", status: "paid", total: 98000 },
  { id: "INV-10484", name: "Sari Wulandari", date: "07 Okt 2026", status: "failed", total: 156000 },
  { id: "INV-10483", name: "Andi Saputra", date: "06 Okt 2026", status: "pending", total: 327000 },
];

const allOrders = orders.concat([
  { id: "INV-10482", name: "Rizky Maulana", date: "06 Okt 2026", status: "paid", total: 540000 },
  { id: "INV-10481", name: "Dewi Anggraini", date: "05 Okt 2026", status: "paid", total: 215000 },
  { id: "INV-10480", name: "Hendra Wijaya", date: "05 Okt 2026", status: "process", total: 389000 },
  { id: "INV-10479", name: "Maya Sari", date: "04 Okt 2026", status: "failed", total: 120000 },
  { id: "INV-10478", name: "Yoga Permana", date: "04 Okt 2026", status: "paid", total: 276500 },
  { id: "INV-10477", name: "Lina Marlina", date: "03 Okt 2026", status: "pending", total: 454000 },
]);

const products = [
  { name: "Kemeja Linen Putih", cat: "Pakaian", price: 199000, stock: 58, active: true },
  { name: "Kaos Oversize Navy", cat: "Pakaian", price: 129000, stock: 40, active: true },
  { name: "Jaket Denim", cat: "Pakaian", price: 399000, stock: 12, active: true },
  { name: "Totebag Kanvas", cat: "Tas", price: 99000, stock: 4, active: true },
  { name: "Ransel Urban", cat: "Tas", price: 289000, stock: 21, active: false },
  { name: "Topi Baseball", cat: "Aksesoris", price: 79000, stock: 73, active: true },
  { name: "Ikat Pinggang Kulit", cat: "Aksesoris", price: 149000, stock: 0, active: false },
];

const customers = [
  { name: "Putri Ananda", email: "putri@mail.com", city: "Bandung", orders: 14, spent: 3250000, since: "Jan 2025" },
  { name: "Bagas Pratama", email: "bagas@mail.com", city: "Jakarta", orders: 9, spent: 1980000, since: "Mar 2025" },
  { name: "Nadia Rahma", email: "nadia@mail.com", city: "Surabaya", orders: 22, spent: 6120000, since: "Nov 2024" },
  { name: "Fajar Nugroho", email: "fajar@mail.com", city: "Yogyakarta", orders: 5, spent: 740000, since: "Jun 2025" },
  { name: "Sari Wulandari", email: "sari@mail.com", city: "Semarang", orders: 3, spent: 512000, since: "Agu 2025" },
  { name: "Andi Saputra", email: "andi@mail.com", city: "Makassar", orders: 11, spent: 2430000, since: "Feb 2025" },
  { name: "Dewi Anggraini", email: "dewi@mail.com", city: "Medan", orders: 7, spent: 1675000, since: "Apr 2025" },
];

const users = [
  { name: "Satria Eza", email: "satria@tokosatria.id", role: "Administrator", active: true, last: "Sekarang" },
  { name: "Rina Kusuma", email: "rina@tokosatria.id", role: "Manajer", active: true, last: "5 menit lalu" },
  { name: "Dimas Prakoso", email: "dimas@tokosatria.id", role: "Staf Gudang", active: true, last: "1 jam lalu" },
  { name: "Ayu Lestari", email: "ayu@tokosatria.id", role: "Editor", active: true, last: "Kemarin" },
  { name: "Tomi Hartono", email: "tomi@tokosatria.id", role: "Editor", active: false, last: "3 minggu lalu" },
];
const roles = ["Administrator", "Manajer", "Editor", "Staf Gudang"];

/* ---- Data grafik ---- */
/* Pendapatan bulanan dalam juta rupiah: tahun ini dan tahun lalu */
const revenue = {
  months: ["Nov", "Des", "Jan", "Feb", "Mar", "Apr", "Mei", "Jun", "Jul", "Agu", "Sep", "Okt"],
  current: [118, 142, 121, 128, 139, 135, 151, 158, 149, 166, 164, 184],
  previous: [96, 120, 101, 104, 112, 117, 124, 129, 126, 133, 141, 152],
};
/* Penjualan per kategori bulan ini (juta rupiah) */
const salesByCategory = [
  { name: "Pakaian", value: 132 },
  { name: "Tas", value: 38 },
  { name: "Aksesoris", value: 31 },
];
/* Porsi metode pembayaran (%) */
const paymentMethods = [
  { name: "QRIS", share: 46 },
  { name: "Transfer bank", share: 31 },
  { name: "Kartu kredit", share: 15 },
  { name: "COD", share: 8 },
];

/* ---- Rincian pesanan (halaman detail/invoice) ----
   Harga diambil dari `products`; subtotal + ongkir = total di `allOrders`. */
const orderDetails = {
  "INV-10488": { items: [["Kaos Oversize Navy", 1], ["Totebag Kanvas", 1]], shipping: 17000, payment: "QRIS", courier: "JNE REG", address: "Jl. Dago No. 112, Coblong, Bandung 40135", phone: "0812-2345-6788" },
  "INV-10487": { items: [["Totebag Kanvas", 1], ["Topi Baseball", 1]], shipping: 11000, payment: "Transfer bank", courier: "SiCepat REG", address: "Jl. Kemang Raya No. 8, Mampang, Jakarta Selatan 12730", phone: "0813-1122-4455" },
  "INV-10486": { items: [["Kemeja Linen Putih", 1], ["Totebag Kanvas", 2]], shipping: 15500, payment: "Kartu kredit", courier: "J&T Express", address: "Jl. Raya Darmo No. 45, Wonokromo, Surabaya 60241", phone: "0857-3344-1200" },
  "INV-10485": { items: [["Topi Baseball", 1]], shipping: 19000, payment: "QRIS", courier: "JNE REG", address: "Jl. Kaliurang Km 5 No. 12, Depok, Sleman 55281", phone: "0819-8877-6655" },
  "INV-10484": { items: [["Kaos Oversize Navy", 1]], shipping: 27000, payment: "Kartu kredit", courier: "SiCepat REG", address: "Jl. Pandanaran No. 30, Semarang Tengah, Semarang 50134", phone: "0821-4455-6677" },
  "INV-10483": { items: [["Topi Baseball", 2], ["Ikat Pinggang Kulit", 1]], shipping: 20000, payment: "COD", courier: "J&T Express", address: "Jl. Pettarani No. 77, Rappocini, Makassar 90222", phone: "0852-9988-1122" },
  "INV-10482": { items: [["Kemeja Linen Putih", 1], ["Kaos Oversize Navy", 1], ["Totebag Kanvas", 2]], shipping: 14000, payment: "Transfer bank", courier: "JNE YES", address: "Jl. Asia Afrika No. 5, Sumur Bandung, Bandung 40111", phone: "0812-7766-5544" },
  "INV-10481": { items: [["Totebag Kanvas", 2]], shipping: 17000, payment: "QRIS", courier: "SiCepat REG", address: "Jl. Gatot Subroto No. 210, Medan Petisah, Medan 20112", phone: "0813-6655-4433" },
  "INV-10480": { items: [["Ransel Urban", 1], ["Topi Baseball", 1]], shipping: 21000, payment: "Transfer bank", courier: "JNE REG", address: "Jl. Ijen No. 18, Klojen, Malang 65119", phone: "0856-1234-9876" },
  "INV-10479": { items: [["Totebag Kanvas", 1]], shipping: 21000, payment: "COD", courier: "J&T Express", address: "Jl. Sudirman No. 50, Pekanbaru Kota, Pekanbaru 28111", phone: "0822-3344-5566" },
  "INV-10478": { items: [["Kaos Oversize Navy", 2]], shipping: 18500, payment: "QRIS", courier: "SiCepat REG", address: "Jl. Teuku Umar No. 9, Denpasar Barat, Denpasar 80113", phone: "0817-2233-4455" },
  "INV-10477": { items: [["Kaos Oversize Navy", 2], ["Totebag Kanvas", 1], ["Topi Baseball", 1]], shipping: 18000, payment: "Kartu kredit", courier: "JNE REG", address: "Jl. Ahmad Yani No. 101, Banjarmasin Tengah, Banjarmasin 70111", phone: "0811-5566-7788" },
};
