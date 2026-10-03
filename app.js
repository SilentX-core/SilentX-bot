document.addEventListener("DOMContentLoaded", () => {

  // ===== QUICK SELECTOR =====
  const $ = (selector) => document.querySelector(selector);
  const $$ = (selector) => document.querySelectorAll(selector);

  // ===== TOAST SYSTEM =====
  function showToast(message, type = "success") {
    const container =
      document.getElementById("toast-container") ||
      (() => {
        const div = document.createElement("div");
        div.id = "toast-container";
        document.body.appendChild(div);
        return div;
      })();

    const toast = document.createElement("div");
    toast.className = `toast toast-${type}`;
    toast.innerHTML = `
      <span>${message}</span>
    `;

    container.appendChild(toast);

    setTimeout(() => toast.classList.add("show"), 50);

    setTimeout(() => {
      toast.classList.remove("show");
      setTimeout(() => toast.remove(), 300);
    }, 3000);
  }

  // ===== GALAXY BACKGROUND =====
  const canvas = $("#galaxy-bg");

  if (canvas) {
    const ctx = canvas.getContext("2d");

    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;

    const stars = Array.from({ length: 40 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      radius: Math.random() * 1.2 + 0.3,
      speed: Math.random() * 0.4 + 0.1
    }));

    function animateStars() {
      ctx.clearRect(0, 0, width, height);

      stars.forEach(star => {
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(255,255,255,0.25)";
        ctx.fill();

        star.y -= star.speed;

        if (star.y < -10) {
          star.y = height + 10;
          star.x = Math.random() * width;
        }
      });

      requestAnimationFrame(animateStars);
    }

    animateStars();

    window.addEventListener("resize", () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    });
  }

  // ===== SIDEBAR =====
  const sidebar = $("#sidebar");
  const overlay = $("#sidebar-overlay");

  function openSidebar() {
    sidebar?.classList.add("open");
    overlay?.classList.add("open");
  }

  function closeSidebar() {
    sidebar?.classList.remove("open");
    overlay?.classList.remove("open");
  }

  $("#menu-btn")?.addEventListener("click", openSidebar);
  $("#close-sidebar-btn")?.addEventListener("click", closeSidebar);
  overlay?.addEventListener("click", closeSidebar);

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeSidebar();
  });

  // ===== TAB SYSTEM =====
  const tabs = $$(".nav-tab");
  const panes = $$(".tab-pane");

  function switchTab(tabName) {

    tabs.forEach(tab => {
      tab.classList.toggle(
        "active",
        tab.dataset.tab === tabName
      );
    });

    panes.forEach(pane => {
      pane.classList.toggle(
        "active",
        pane.id === tabName
      );
    });

    localStorage.setItem("activeTab", tabName);

    if (window.innerWidth <= 768) {
      closeSidebar();
    }
  }

  tabs.forEach(tab => {
    tab.addEventListener("click", () => {
      switchTab(tab.dataset.tab);
    });
  });

  const savedTab = localStorage.getItem("activeTab");

  if (savedTab) {
    switchTab(savedTab);
  }

  // ===== CREATE BRIDGE =====
  const createBridgeBtn = $("#btn-create-bridge");

  createBridgeBtn?.addEventListener("click", async () => {

    const discordId =
      $("#bridge-discord-id")?.value.trim();

    const telegramId =
      $("#bridge-telegram-id")?.value.trim();

    if (!discordId || !telegramId) {
      showToast(
        "Vui lòng nhập đầy đủ thông tin.",
        "error"
      );
      return;
    }

    if (!/^\d+$/.test(discordId)) {
      showToast(
        "Discord Channel ID không hợp lệ.",
        "error"
      );
      return;
    }

    if (!/^-?\d+$/.test(telegramId)) {
      showToast(
        "Telegram Chat ID không hợp lệ.",
        "error"
      );
      return;
    }

    createBridgeBtn.disabled = true;
    createBridgeBtn.innerHTML =
      '<i class="fa-solid fa-spinner fa-spin"></i> Đang tạo...';

    try {

      await new Promise(resolve =>
        setTimeout(resolve, 800)
      );

      const bridgeList = $("#bridge-list");

      if (bridgeList) {
        bridgeList.innerHTML = `
          <div class="bridge-card">
            <div class="bridge-title">
              ✅ Kết nối đang hoạt động
            </div>

            <div class="bridge-item">
              <i class="fa-brands fa-discord"></i>
              Discord:
              <code>${discordId}</code>
            </div>

            <div class="bridge-item">
              <i class="fa-brands fa-telegram"></i>
              Telegram:
              <code>${telegramId}</code>
            </div>
          </div>
        `;
      }

      showToast(
        "Tạo cầu nối thành công."
      );

    } catch (error) {

      showToast(
        "Không thể tạo kết nối.",
        "error"
      );

    } finally {

      createBridgeBtn.disabled = false;

      createBridgeBtn.innerHTML =
        '<i class="fa-solid fa-link"></i> Tạo kết nối';
    }
  });

});
