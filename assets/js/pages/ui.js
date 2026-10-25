/* ---- Halaman UI Toolkit: blok contoh (.sa-example) ----
   Setiap .sa-example-preview ditampilkan apa adanya, lalu kodenya diambil
   otomatis dari isi preview tersebut, jadi contoh dan kode tidak mungkin beda.
   Kode tambahan (mis. JavaScript) ditulis di <script type="text/plain" data-lang="JS">
   di dalam .sa-example; isinya ditampilkan sebagai blok kode kedua. */

/* Atribut boolean yang oleh innerHTML ditulis sebagai attr="" */
const saBoolAttrs = /\s(disabled|checked|required|hidden|readonly|selected|multiple|novalidate|autofocus)=""/g;

/* Hapus indentasi yang sama di setiap baris */
function saDedent(text) {
  const lines = text.replace(/^\s*\n/, "").replace(/\s+$/, "").split("\n");
  const indents = lines.filter((l) => l.trim()).map((l) => l.match(/^ */)[0].length);
  const min = indents.length ? Math.min(...indents) : 0;
  return lines.map((l) => l.slice(min)).join("\n");
}

/* Pewarnaan sederhana untuk HTML */
function saHighlightHtml(src) {
  return src
    .split(/(<!--[\s\S]*?-->|<[^>]+>)/g)
    .map((part, i) => {
      if (i % 2 === 0) return escapeHtml(part);
      if (part.startsWith("<!--")) return `<span class="sa-code-com">${escapeHtml(part)}</span>`;
      const m = part.match(/^<(\/?)([\w-]+)([\s\S]*?)(\/?)>$/);
      if (!m) return escapeHtml(part);
      const attrs = m[3].replace(
        /([\w:.-]+)(?:(=)("[^"]*"|'[^']*'))?/g,
        (all, name, eq, val) => `<span class="sa-code-attr">${escapeHtml(name)}</span>${eq ? `=<span class="sa-code-str">${escapeHtml(val)}</span>` : ""}`,
      );
      return `&lt;${m[1]}<span class="sa-code-tag">${m[2]}</span>${attrs}${m[4]}&gt;`;
    })
    .join("");
}

function saCodeBlock(label, html) {
  const box = document.createElement("div");
  box.className = "sa-example-code";
  box.innerHTML = `<div class="sa-example-bar"><span>${escapeHtml(label)}</span><button type="button" class="btn btn-light" data-copy>Salin</button></div><pre tabindex="0"><code>${html}</code></pre>`;
  return box;
}

document.querySelectorAll(".sa-example").forEach((ex) => {
  const preview = ex.querySelector(".sa-example-preview");
  if (!preview) return;
  let anchor = preview;
  if (!ex.hasAttribute("data-no-code")) {
    const src = saDedent(preview.innerHTML.replace(saBoolAttrs, " $1"));
    const block = saCodeBlock("HTML", saHighlightHtml(src));
    block.dataset.source = src;
    anchor.after(block);
    anchor = block;
  }
  ex.querySelectorAll('script[type="text/plain"][data-lang]').forEach((s) => {
    const src = saDedent(s.textContent);
    const block = saCodeBlock(s.dataset.lang, escapeHtml(src));
    block.dataset.source = src;
    anchor.after(block);
    anchor = block;
  });
});

/* Tombol Salin */
document.addEventListener("click", async (e) => {
  const btn = e.target.closest("[data-copy]");
  if (!btn) return;
  const text = btn.closest(".sa-example-code").dataset.source;
  try {
    await navigator.clipboard.writeText(text);
  } catch {
    const ta = Object.assign(document.createElement("textarea"), { value: text });
    document.body.append(ta);
    ta.select();
    document.execCommand("copy");
    ta.remove();
  }
  showToast("Kode disalin");
});

/* Interaksi kecil agar contoh terasa hidup */
document.querySelectorAll(".sa-example-preview .sa-seg").forEach((seg) =>
  seg.addEventListener("click", (e) => {
    const b = e.target.closest(".btn");
    if (!b) return;
    seg.querySelectorAll(".btn").forEach((x) => x.classList.toggle("active", x === b));
  }),
);
document.querySelectorAll(".sa-example-preview [data-demo-confirm]").forEach((b) =>
  b.addEventListener("click", () =>
    confirmDialog({ title: "Hapus produk ini?", text: "Produk yang dihapus tidak bisa dikembalikan.", confirmText: "Hapus" }).then(
      (ok) => ok && showToast("Produk dihapus"),
    ),
  ),
);
document.querySelectorAll(".sa-example-preview [data-demo-loading]").forEach((b) =>
  b.addEventListener("click", () => {
    b.disabled = true;
    b.querySelector(".spinner-border").hidden = false;
    setTimeout(() => {
      b.disabled = false;
      b.querySelector(".spinner-border").hidden = true;
      showToast("Tersimpan");
    }, 1200);
  }),
);
document.querySelectorAll(".sa-example-preview form[data-demo-validate]").forEach((f) =>
  f.addEventListener("submit", (e) => {
    e.preventDefault();
    f.classList.add("was-validated");
    if (f.checkValidity()) showToast("Data valid");
    else f.querySelector(":invalid")?.focus();
  }),
);
