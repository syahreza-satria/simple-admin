document.addEventListener("DOMContentLoaded", () => {
  // =========================================================================
  // 1. THEME MANAGEMENT (Dark / Light Mode)
  // =========================================================================
  const htmlElement = document.documentElement;
  const themeToggleBtn = document.getElementById("themeToggleBtn");
  const themeToggleMobile = document.getElementById("themeToggleMobile");
  const themeIcon = document.getElementById("themeIcon");
  const themeIconMobile = document.getElementById("themeIconMobile");

  // Load saved theme or default to light
  const savedTheme = localStorage.getItem("simpleadmin_theme") || "light";
  htmlElement.setAttribute("data-bs-theme", savedTheme);
  updateThemeIcons(savedTheme);

  function toggleTheme() {
    const current = htmlElement.getAttribute("data-bs-theme");
    const next = current === "light" ? "dark" : "light";
    htmlElement.setAttribute("data-bs-theme", next);
    localStorage.setItem("simpleadmin_theme", next);
    updateThemeIcons(next);

    // Re-render charts with new theme colors
    updateChartsForTheme(next);
  }

  function updateThemeIcons(theme) {
    const iconClass = theme === "dark" ? "bi-sun-fill" : "bi-moon-stars-fill";
    if (themeIcon) themeIcon.className = `bi ${iconClass} fs-5`;
    if (themeIconMobile) themeIconMobile.className = `bi ${iconClass}`;
  }

  themeToggleBtn?.addEventListener("click", toggleTheme);
  themeToggleMobile?.addEventListener("click", toggleTheme);

  // =========================================================================
  // 2. SIDEBAR COLLAPSE LOGIC (Desktop)
  // =========================================================================
  const desktopSidebarToggle = document.getElementById("desktopSidebarToggle");
  desktopSidebarToggle?.addEventListener("click", () => {
    document.body.classList.toggle("sidebar-collapsed");
    // Persist sidebar state
    const collapsed = document.body.classList.contains("sidebar-collapsed");
    localStorage.setItem("simpleadmin_sidebar", collapsed ? "collapsed" : "expanded");
  });

  // Restore sidebar state
  if (localStorage.getItem("simpleadmin_sidebar") === "collapsed") {
    document.body.classList.add("sidebar-collapsed");
  }

  // =========================================================================
  // 3. GLOBAL SEARCH MODAL (Ctrl + K)
  // =========================================================================
  const searchBackdrop = document.getElementById("searchModalBackdrop");
  const searchInput = document.getElementById("globalSearchInput");
  const searchResultsContainer = document.getElementById("searchResults");

  const searchablePages = [
    { title: "Dashboard", icon: "bi-grid-1x2", desc: "Main overview and KPIs", category: "Pages" },
    { title: "Analytics", icon: "bi-graph-up", desc: "Traffic and performance data", category: "Pages" },
    { title: "Users", icon: "bi-people", desc: "Manage user accounts", category: "Management" },
    { title: "Products", icon: "bi-box-seam", desc: "Product catalog management", category: "Management" },
    { title: "Orders", icon: "bi-cart-check", desc: "Track and manage orders", category: "Management" },
    { title: "Transactions", icon: "bi-credit-card", desc: "Payment history & invoices", category: "Management" },
    { title: "Reports", icon: "bi-file-earmark-bar-graph", desc: "Generate business reports", category: "System" },
    { title: "Settings", icon: "bi-gear", desc: "Application configuration", category: "System" },
    { title: "Profile", icon: "bi-person", desc: "Your account settings", category: "Account" },
    { title: "Billing & Plans", icon: "bi-credit-card", desc: "Subscription management", category: "Account" },
  ];

  function openSearch() {
    searchBackdrop?.classList.add("active");
    setTimeout(() => searchInput?.focus(), 100);
    renderSearchResults("");
  }

  function closeSearch() {
    searchBackdrop?.classList.remove("active");
    if (searchInput) searchInput.value = "";
  }

  function renderSearchResults(query) {
    if (!searchResultsContainer) return;
    const filtered = query.trim()
      ? searchablePages.filter(
          (p) =>
            p.title.toLowerCase().includes(query.toLowerCase()) ||
            p.desc.toLowerCase().includes(query.toLowerCase()) ||
            p.category.toLowerCase().includes(query.toLowerCase())
        )
      : searchablePages;

    if (filtered.length === 0) {
      searchResultsContainer.innerHTML = `
        <div class="text-center py-4 text-muted">
          <i class="bi bi-search fs-3 d-block mb-2 opacity-50"></i>
          <p class="mb-0 small">No results found for "<strong>${query}</strong>"</p>
        </div>`;
      return;
    }

    let currentCategory = "";
    let html = "";
    filtered.forEach((item) => {
      if (item.category !== currentCategory) {
        currentCategory = item.category;
        html += `<div class="px-3 pt-2 pb-1"><span class="text-muted fw-bold text-uppercase" style="font-size: 0.65rem; letter-spacing: 0.08em">${currentCategory}</span></div>`;
      }
      html += `
        <a href="#" class="search-result-item" onclick="event.preventDefault()">
          <div class="icon-shape-xs bg-primary-subtle-custom text-primary rounded-2">
            <i class="bi ${item.icon}"></i>
          </div>
          <div class="flex-grow-1">
            <div class="fw-medium small text-body">${item.title}</div>
            <div class="text-muted" style="font-size: 0.7rem">${item.desc}</div>
          </div>
          <i class="bi bi-arrow-return-left text-muted fs-xs"></i>
        </a>`;
    });
    searchResultsContainer.innerHTML = html;
  }

  // Ctrl+K or search button triggers
  document.addEventListener("keydown", (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key === "k") {
      e.preventDefault();
      openSearch();
    }
    if (e.key === "Escape") {
      closeSearch();
    }
  });

  document.getElementById("searchTriggerBtn")?.addEventListener("click", openSearch);
  document.getElementById("searchTriggerMobile")?.addEventListener("click", openSearch);

  searchBackdrop?.addEventListener("click", (e) => {
    if (e.target === searchBackdrop) closeSearch();
  });

  searchInput?.addEventListener("input", (e) => {
    renderSearchResults(e.target.value);
  });

  // =========================================================================
  // 4. TOAST HELPER
  // =========================================================================
  function showToast(title, message, iconClass = "bi-check-circle-fill") {
    const toastEl = document.getElementById("liveToast");
    document.getElementById("toastTitle").innerText = title;
    document.getElementById("toastMessage").innerText = message;
    document.getElementById("toastIcon").innerHTML = `<i class="bi ${iconClass}"></i>`;

    const toast = new bootstrap.Toast(toastEl, { delay: 3500 });
    toast.show();
  }

  // =========================================================================
  // 5. CHART.JS CONFIGURATION
  // =========================================================================
  function getChartColors() {
    const isDark = htmlElement.getAttribute("data-bs-theme") === "dark";
    return {
      grid: isDark ? "rgba(255, 255, 255, 0.06)" : "rgba(0, 0, 0, 0.05)",
      text: isDark ? "#94a3b8" : "#64748B",
      primary: "#2563EB",
      primaryBg: isDark ? "rgba(37, 99, 235, 0.2)" : "rgba(37, 99, 235, 0.12)",
      info: "#0284C7",
      infoBg: isDark ? "rgba(2, 132, 199, 0.2)" : "rgba(2, 132, 199, 0.12)",
    };
  }

  let chartColors = getChartColors();

  // --- Datasets ---
  const revenueDataset = {
    label: "Gross Revenue ($)",
    data: [8500, 10200, 9800, 12400, 14500, 13200, 15800, 17200, 16400, 18900, 20500, 22400],
    borderColor: "#2563EB",
    backgroundColor: chartColors.primaryBg,
    fill: true,
    tension: 0.4,
    pointRadius: 3,
    pointHoverRadius: 6,
    pointBackgroundColor: "#2563EB",
    pointBorderColor: "#fff",
    pointBorderWidth: 2,
  };

  const ordersDataset = {
    label: "Processed Orders (Qty)",
    data: [310, 380, 350, 420, 510, 480, 560, 610, 590, 680, 720, 810],
    borderColor: "#0284C7",
    backgroundColor: chartColors.infoBg,
    fill: true,
    tension: 0.4,
    pointRadius: 3,
    pointHoverRadius: 6,
    pointBackgroundColor: "#0284C7",
    pointBorderColor: "#fff",
    pointBorderWidth: 2,
  };

  // --- Main Line Chart ---
  const ctxMain = document.getElementById("mainAnalyticsChart")?.getContext("2d");
  let mainChart = null;
  if (ctxMain) {
    mainChart = new Chart(ctxMain, {
      type: "line",
      data: {
        labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
        datasets: [revenueDataset],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          tooltip: {
            mode: "index",
            intersect: false,
            backgroundColor: "rgba(15, 23, 42, 0.9)",
            titleColor: "#fff",
            bodyColor: "#e2e8f0",
            borderColor: "rgba(255,255,255,0.1)",
            borderWidth: 1,
            cornerRadius: 8,
            padding: 12,
          },
        },
        scales: {
          x: {
            grid: { color: chartColors.grid },
            ticks: { color: chartColors.text },
          },
          y: {
            grid: { color: chartColors.grid },
            ticks: { color: chartColors.text },
          },
        },
      },
    });
  }

  // --- Sales Performance Bar Chart ---
  const ctxBar = document.getElementById("salesPerformanceChart")?.getContext("2d");
  let barChart = null;
  if (ctxBar) {
    barChart = new Chart(ctxBar, {
      type: "bar",
      data: {
        labels: ["Jun", "Jul", "Aug", "Sep", "Oct", "Nov"],
        datasets: [
          {
            label: "Target ($)",
            data: [14000, 15000, 16000, 17000, 18000, 20000],
            backgroundColor: chartColors.infoBg,
            borderColor: "#0284C7",
            borderWidth: 1,
            borderRadius: 6,
          },
          {
            label: "Actual Sales ($)",
            data: [13200, 15800, 17200, 16400, 18900, 20500],
            backgroundColor: "#2563EB",
            borderRadius: 6,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { labels: { color: chartColors.text } },
          tooltip: {
            backgroundColor: "rgba(15, 23, 42, 0.9)",
            titleColor: "#fff",
            bodyColor: "#e2e8f0",
            cornerRadius: 8,
            padding: 12,
          },
        },
        scales: {
          x: { grid: { color: chartColors.grid }, ticks: { color: chartColors.text } },
          y: { grid: { color: chartColors.grid }, ticks: { color: chartColors.text } },
        },
      },
    });
  }

  // --- Revenue Distribution Doughnut Chart ---
  const ctxDoughnut = document.getElementById("revenueDistributionChart")?.getContext("2d");
  let doughnutChart = null;
  if (ctxDoughnut) {
    doughnutChart = new Chart(ctxDoughnut, {
      type: "doughnut",
      data: {
        labels: ["Electronics", "Wearables", "Furniture", "Accessories", "Audio"],
        datasets: [
          {
            data: [42, 24, 16, 10, 8],
            backgroundColor: ["#2563EB", "#0284C7", "#10B981", "#F59E0B", "#EF4444"],
            borderWidth: 0,
            hoverOffset: 6,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        cutout: "70%",
        plugins: {
          legend: { display: false },
          tooltip: {
            backgroundColor: "rgba(15, 23, 42, 0.9)",
            titleColor: "#fff",
            bodyColor: "#e2e8f0",
            cornerRadius: 8,
            padding: 12,
            callbacks: {
              label: (ctx) => ` ${ctx.label}: ${ctx.parsed}%`,
            },
          },
        },
      },
    });
  }

  // --- Theme chart update ---
  function updateChartsForTheme(theme) {
    chartColors = getChartColors();

    if (mainChart) {
      mainChart.options.scales.x.grid.color = chartColors.grid;
      mainChart.options.scales.x.ticks.color = chartColors.text;
      mainChart.options.scales.y.grid.color = chartColors.grid;
      mainChart.options.scales.y.ticks.color = chartColors.text;
      mainChart.data.datasets.forEach((ds) => {
        if (ds.borderColor === "#2563EB") ds.backgroundColor = chartColors.primaryBg;
        if (ds.borderColor === "#0284C7") ds.backgroundColor = chartColors.infoBg;
      });
      mainChart.update();
    }

    if (barChart) {
      barChart.options.scales.x.grid.color = chartColors.grid;
      barChart.options.scales.x.ticks.color = chartColors.text;
      barChart.options.scales.y.grid.color = chartColors.grid;
      barChart.options.scales.y.ticks.color = chartColors.text;
      barChart.options.plugins.legend.labels.color = chartColors.text;
      barChart.data.datasets[0].backgroundColor = chartColors.infoBg;
      barChart.update();
    }

    if (doughnutChart) {
      doughnutChart.update();
    }
  }

  // =========================================================================
  // 6. CHART TOGGLE BUTTONS (Revenue / Orders)
  // =========================================================================
  const btnToggleRevenue = document.getElementById("btnToggleRevenue");
  const btnToggleOrders = document.getElementById("btnToggleOrders");

  btnToggleRevenue?.addEventListener("click", () => {
    btnToggleRevenue.classList.add("btn-primary", "active");
    btnToggleRevenue.classList.remove("text-body-secondary");
    btnToggleOrders.classList.remove("btn-primary", "active");
    btnToggleOrders.classList.add("text-body-secondary");
    if (mainChart) {
      mainChart.data.datasets = [{ ...revenueDataset, backgroundColor: getChartColors().primaryBg }];
      mainChart.update();
    }
  });

  btnToggleOrders?.addEventListener("click", () => {
    btnToggleOrders.classList.add("btn-primary", "active");
    btnToggleOrders.classList.remove("text-body-secondary");
    btnToggleRevenue.classList.remove("btn-primary", "active");
    btnToggleRevenue.classList.add("text-body-secondary");
    if (mainChart) {
      mainChart.data.datasets = [{ ...ordersDataset, backgroundColor: getChartColors().infoBg }];
      mainChart.update();
    }
  });

  // =========================================================================
  // 7. ORDERS TABLE FILTER & SEARCH
  // =========================================================================
  const tableSearchInput = document.getElementById("tableSearchInput");
  const tableStatusFilter = document.getElementById("tableStatusFilter");
  const tableRows = document.querySelectorAll("#ordersTable tbody tr");

  function filterTable() {
    const query = tableSearchInput.value.toLowerCase().trim();
    const status = tableStatusFilter.value;

    tableRows.forEach((row) => {
      const text = row.innerText.toLowerCase();
      const rowStatus = row.getAttribute("data-status");

      const matchesQuery = text.includes(query);
      const matchesStatus = status === "all" || rowStatus === status;

      row.style.display = matchesQuery && matchesStatus ? "" : "none";
    });
  }

  tableSearchInput?.addEventListener("keyup", filterTable);
  tableStatusFilter?.addEventListener("change", filterTable);

  // =========================================================================
  // 8. ORDER DETAILS MODAL
  // =========================================================================
  const orderModalEl = document.getElementById("orderDetailsModal");
  const orderModal = orderModalEl ? new bootstrap.Modal(orderModalEl) : null;

  document.querySelectorAll(".view-order-btn").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      const id = btn.getAttribute("data-id");
      const customer = btn.getAttribute("data-customer");
      const product = btn.getAttribute("data-product");
      const amount = btn.getAttribute("data-amount");
      const status = btn.getAttribute("data-status");

      const statusColorMap = {
        Completed: "bg-success-subtle-custom",
        Processing: "bg-info-subtle-custom",
        Pending: "bg-warning-subtle-custom",
        Cancelled: "bg-danger-subtle-custom",
      };
      const badgeClass = statusColorMap[status] || "bg-primary-subtle-custom";

      document.getElementById("modalOrderId").innerText = `Order ${id}`;
      document.getElementById("modalCustomerName").innerText = customer;
      document.getElementById("modalProductName").innerText = product;
      document.getElementById("modalOrderAmount").innerText = amount;
      document.getElementById("modalOrderStatus").innerHTML = `<span class="badge ${badgeClass} rounded-pill px-2.5 py-1 fs-xs fw-semibold">${status}</span>`;

      orderModal?.show();
    });
  });

  // =========================================================================
  // 9. TOAST TRIGGERS
  // =========================================================================
  document.querySelectorAll(".download-inv-btn, #modalDownloadInvBtn").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      showToast("Invoice Generating", "Your PDF invoice is downloading...", "bi-file-earmark-pdf-fill");
    });
  });

  document.getElementById("exportReportBtn")?.addEventListener("click", () => {
    showToast("Report Export", "Generating CSV analytics report...", "bi-download");
  });

  document.getElementById("markNotificationsReadBtn")?.addEventListener("click", () => {
    const badge = document.getElementById("unreadNotificationBadge");
    if (badge) badge.style.display = "none";
    showToast("Notifications", "All notifications marked as read.", "bi-check2-all");
  });

  // =========================================================================
  // 10. DATE FILTER CHANGE HANDLER
  // =========================================================================
  const dashboardDateFilter = document.getElementById("dashboardDateFilter");
  dashboardDateFilter?.addEventListener("change", () => {
    const value = dashboardDateFilter.value;
    const labels = {
      "7d": "Last 7 Days",
      "30d": "Last 30 Days",
      "ytd": "Year to Date",
    };
    showToast("Date Range Updated", `Dashboard filtered to: ${labels[value] || value}`, "bi-calendar-check");
  });

  // =========================================================================
  // 11. ANIMATED NUMBER COUNTERS
  // =========================================================================
  function animateCounter(el, target, prefix = "", suffix = "", duration = 1200) {
    const startTime = performance.now();
    const startVal = 0;

    function update(now) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const easeOut = 1 - Math.pow(1 - progress, 3);
      const current = Math.floor(startVal + (target - startVal) * easeOut);
      el.textContent = prefix + current.toLocaleString("en-US") + suffix;
      if (progress < 1) requestAnimationFrame(update);
    }
    requestAnimationFrame(update);
  }

  // Observe KPI cards for viewport entry
  const counterElements = document.querySelectorAll("[data-counter]");
  if (counterElements.length > 0 && "IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const el = entry.target;
            const target = parseFloat(el.getAttribute("data-counter"));
            const prefix = el.getAttribute("data-prefix") || "";
            const suffix = el.getAttribute("data-suffix") || "";
            animateCounter(el, target, prefix, suffix);
            observer.unobserve(el);
          }
        });
      },
      { threshold: 0.3 }
    );
    counterElements.forEach((el) => observer.observe(el));
  }

  // =========================================================================
  // 12. SIDEBAR ACTIVE LINK HIGHLIGHTING
  // =========================================================================
  document.querySelectorAll(".nav-link-custom").forEach((link) => {
    link.addEventListener("click", function (e) {
      // Only handle anchor-style nav for demo
      const parentNav = this.closest("aside, .offcanvas");
      if (parentNav) {
        parentNav.querySelectorAll(".nav-link-custom").forEach((l) => l.classList.remove("active"));
        this.classList.add("active");
      }
    });
  });

  // =========================================================================
  // 13. LOGOUT CONFIRMATION
  // =========================================================================
  document.getElementById("logoutBtn")?.addEventListener("click", (e) => {
    e.preventDefault();
    showToast("Signed Out", "You have been logged out successfully.", "bi-box-arrow-right");
  });

  // =========================================================================
  // 14. FULLSCREEN TOGGLE
  // =========================================================================
  document.getElementById("fullscreenBtn")?.addEventListener("click", () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
    } else {
      document.exitFullscreen().catch(() => {});
    }
  });

  // =========================================================================
  // 15. INITIALIZE THEME FOR CHARTS AT LOAD
  // =========================================================================
  updateChartsForTheme(savedTheme);
});