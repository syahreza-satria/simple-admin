/* ---- Halaman detail pesanan / invoice ----
   Dibuka dari daftar pesanan: order-detail.html?id=INV-10488
   Data dari allOrders (ringkasan) dan orderDetails (item, ongkir, alamat) di data.js. */

const invId = new URLSearchParams(location.search).get("id") || allOrders[0].id;
const inv = allOrders.find((o) => o.id === invId);
const invDetail = orderDetails[invId];
const priceOf = (name) => products.find((p) => p.name === name)?.price ?? 0;

/* Langkah status untuk garis waktu */
const invSteps = {
  pending: [["Pesanan dibuat", true], ["Menunggu pembayaran", false]],
  process: [["Pesanan dibuat", true], ["Pembayaran diterima", true], ["Sedang dikemas", false]],
  paid: [["Pesanan dibuat", true], ["Pembayaran diterima", true], ["Dikemas", true], ["Dikirim", true]],
  failed: [["Pesanan dibuat", true], ["Pembayaran gagal", true]],
};

function renderInvoice() {
  if (!inv || !invDetail) {
    document.getElementById("saInvTitle").textContent = "Pesanan tidak ditemukan";
    document.getElementById("saInvBody").innerHTML = `<div class="col-12"><section class="sa-panel"><p class="sa-empty mb-0">Pesanan <span class="sa-id">#${escapeHtml(invId)}</span> tidak ada. <a href="orders.html">Kembali ke daftar pesanan</a>.</p></section></div>`;
    document.getElementById("saPrint").classList.add("d-none"); // d-inline-flex Bootstrap mengalahkan atribut hidden
    return;
  }
  const items = invDetail.items.map(([name, qty]) => ({ name, qty, price: priceOf(name) }));
  const subtotal = items.reduce((s, it) => s + it.qty * it.price, 0);
  const status = `<span class="sa-status sa-st-${inv.status}">${statusLabel[inv.status]}</span>`;

  document.title = `Invoice #${inv.id} · Simple Admin`;
  document.getElementById("saInvTitle").innerHTML = `Pesanan <span class="sa-id fs-6">#${escapeHtml(inv.id)}</span>`;
  document.getElementById("saInvStatus").innerHTML = status;

  document.getElementById("saInvoice").innerHTML = `
    <div class="sa-invoice-head">
      <div>
        <div class="sa-brand mb-2"><span class="sa-brand-mark">${saLogo}</span>${escapeHtml(saBrand)}</div>
        <div class="sa-invoice-muted">Toko Satria · Jl. Braga No. 21, Bandung 40111<br />halo@tokosatria.id</div>
      </div>
      <div class="text-sm-end">
        <div class="sa-invoice-label">Invoice</div>
        <div class="sa-id fs-6">#${escapeHtml(inv.id)}</div>
        <div class="sa-invoice-muted mt-1">Tanggal: ${escapeHtml(inv.date)}</div>
        <div class="mt-2">${status}</div>
      </div>
    </div>
    <div class="sa-invoice-parties">
      <div>
        <div class="sa-invoice-label">Ditagihkan kepada</div>
        <div class="fw-semibold">${escapeHtml(inv.name)}</div>
        <div class="sa-invoice-muted">${escapeHtml(invDetail.address)}<br />${escapeHtml(invDetail.phone)}</div>
      </div>
      <div>
        <div class="sa-invoice-label">Pembayaran &amp; pengiriman</div>
        <div>${escapeHtml(invDetail.payment)}</div>
        <div class="sa-invoice-muted">Kurir: ${escapeHtml(invDetail.courier)}</div>
      </div>
    </div>
    <div class="table-responsive">
      <table class="table sa-table">
        <thead><tr><th>Produk</th><th class="text-end">Jumlah</th><th class="text-end">Harga</th><th class="text-end">Subtotal</th></tr></thead>
        <tbody>${items
          .map(
            (it) => `<tr><td class="fw-medium">${escapeHtml(it.name)}</td><td class="text-end sa-num">${it.qty}</td>
            <td class="text-end sa-num">${rupiah(it.price)}</td><td class="text-end sa-num fw-semibold">${rupiah(it.qty * it.price)}</td></tr>`,
          )
          .join("")}</tbody>
      </table>
    </div>
    <dl class="sa-invoice-total">
      <dt>Subtotal</dt><dd class="sa-num">${rupiah(subtotal)}</dd>
      <dt>Ongkos kirim</dt><dd class="sa-num">${rupiah(invDetail.shipping)}</dd>
      <dt class="sa-invoice-grand">Total</dt><dd class="sa-num sa-invoice-grand">${rupiah(subtotal + invDetail.shipping)}</dd>
    </dl>
    <p class="sa-invoice-note">Terima kasih telah berbelanja di Toko Satria. Simpan invoice ini sebagai bukti pembelian.</p>`;

  document.getElementById("saInvTimeline").innerHTML = invSteps[inv.status]
    .map(([text, done]) => `<li class="${done ? "" : "sa-step-todo"}"><p>${text}${done ? "" : "<br /><small>Belum</small>"}</p></li>`)
    .join("");

  const invAction = {
    pending: `<button type="button" class="btn btn-primary btn-sm" id="saInvPaid">Tandai lunas</button>`,
    process: `<button type="button" class="btn btn-primary btn-sm" id="saInvPaid">Tandai lunas</button>`,
    paid: `<button type="button" class="btn btn-light btn-sm" data-toast="Nomor resi disalin">Salin nomor resi</button>`,
    failed: `<button type="button" class="btn btn-light btn-sm" data-toast="Tautan pembayaran dikirim ulang">Kirim ulang tautan pembayaran</button>`,
  };
  document.getElementById("saInvActions").innerHTML = invAction[inv.status];
  document.getElementById("saInvPaid")?.addEventListener("click", () => {
    inv.status = "paid";
    renderInvoice();
    showToast(`Pesanan #${inv.id} ditandai lunas`);
  });

  document.getElementById("saInvCustomer").innerHTML = `
    <div class="sa-user mb-3"><span class="sa-avatar">${escapeHtml(initials(inv.name))}</span><div><span class="fw-medium">${escapeHtml(inv.name)}</span><small>${escapeHtml(invDetail.phone)}</small></div></div>
    <button type="button" class="btn btn-light btn-sm w-100" data-toast="Membuka WhatsApp…"><i class="bi bi-whatsapp" aria-hidden="true"></i> Hubungi pelanggan</button>`;
}
renderInvoice();

/* Cetak selalu dalam mode terang, lalu kembalikan tema semula */
let invThemeBeforePrint = null;
addEventListener("beforeprint", () => {
  invThemeBeforePrint = document.documentElement.getAttribute("data-bs-theme");
  document.documentElement.setAttribute("data-bs-theme", "light");
});
addEventListener("afterprint", () => invThemeBeforePrint && document.documentElement.setAttribute("data-bs-theme", invThemeBeforePrint));
document.getElementById("saPrint").addEventListener("click", () => print());
