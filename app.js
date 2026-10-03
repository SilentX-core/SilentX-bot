document.addEventListener("DOMContentLoaded", () => {
  // 1. Particle nền sao
  const canvas = document.getElementById("galaxy-bg");
  if (canvas) {
    const ctx = canvas.getContext("2d");
    let w = canvas.width = window.innerWidth;
    let h = canvas.height = window.innerHeight;
    const stars = Array.from({ length: 90 }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      r: Math.random() * 1.5 + 0.3,
      speed: Math.random() * 0.3 + 0.1
    }));
    function draw() {
      ctx.clearRect(0,0,w,h);
      ctx.fillStyle = '#070913';
      ctx.fillRect(0,0,w,h);
      ctx.fillStyle = 'rgba(255,255,255,0.85)';
      stars.forEach(s => {
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fill();
        s.y -= s.speed;
        if (s.y < 0) s.y = h;
      });
      requestAnimationFrame(draw);
    }
    draw();
    window.addEventListener("resize", () => {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
    });
  }

  // 2. Sidebar Menu 3 gạch
  const menuBtn = document.getElementById("menu-btn");
  const closeSidebarBtn = document.getElementById("close-sidebar-btn");
  const sidebar = document.getElementById("sidebar");
  const overlay = document.getElementById("sidebar-overlay");

  function openSidebar() {
    sidebar.classList.add("open");
    overlay.classList.add("open");
  }

  function closeSidebar() {
    sidebar.classList.remove("open");
    overlay.classList.remove("open");
  }

  if (menuBtn) menuBtn.addEventListener("click", openSidebar);
  if (closeSidebarBtn) closeSidebarBtn.addEventListener("click", closeSidebar);
  if (overlay) overlay.addEventListener("click", closeSidebar);

  // 3. Chuyển đổi Tab
  const tabs = document.querySelectorAll(".nav-tab");
  const panes = document.querySelectorAll(".tab-pane");

  tabs.forEach(tab => {
    tab.addEventListener("click", () => {
      tabs.forEach(t => t.classList.remove("active"));
      panes.forEach(p => p.classList.remove("active"));
      tab.classList.add("active");
      const target = document.getElementById(tab.dataset.tab);
      if (target) target.classList.add("active");
      if (window.innerWidth <= 768) closeSidebar();
    });
  });

  // 4. Tạo kết nối kênh Discord - Telegram
  const createBridgeBtn = document.getElementById("btn-create-bridge");
  if (createBridgeBtn) {
    createBridgeBtn.addEventListener("click", async () => {
      const discordId = document.getElementById("bridge-discord-id").value.trim();
      const telegramId = document.getElementById("bridge-telegram-id").value.trim();

      if (!discordId || !telegramId) {
        alert("Vui lòng nhập cả Discord Channel ID và Telegram Chat ID!");
        return;
      }

      const bridgeList = document.getElementById("bridge-list");
      bridgeList.innerHTML = `
        <div style="background: rgba(0,0,0,0.4); padding: 12px; border-radius: 8px; border: 1px solid rgba(0, 242, 254, 0.3);">
          <div style="font-weight: 600; color: #00f2fe; margin-bottom: 4px;">Cầu nối đang hoạt động:</div>
          <div><i class="fa-brands fa-discord" style="color: #5865F2;"></i> Discord ID: <code>${discordId}</code></div>
          <div><i class="fa-brands fa-telegram" style="color: #229ED9;"></i> Telegram ID: <code>${telegramId}</code></div>
        </div>
      `;
      alert("Đã thiết lập cầu nối kênh thành công!");
    });
  }
});
