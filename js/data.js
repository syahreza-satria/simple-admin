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
