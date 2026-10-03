// App Controller cho GitHub Pages
document.addEventListener("DOMContentLoaded", () => {
  // 1. Particle Canvas nền vũ trụ Galaxy
  const canvas = document.getElementById("galaxy-bg");
  if (canvas) {
    const ctx = canvas.getContext("2d");
    let w = canvas.width = window.innerWidth;
    let h = canvas.height = window.innerHeight;

    const stars = Array.from({ length: 120 }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      radius: Math.random() * 1.8 + 0.3,
      speed: Math.random() * 0.4 + 0.1,
      alpha: Math.random() * 0.8 + 0.2
    }));

    function renderGalaxy() {
      ctx.clearRect(0, 0, w, h);
      ctx.fillStyle = "#070913";
      ctx.fillRect(0, 0, w, h);

      stars.forEach(star => {
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${star.alpha})`;
        ctx.fill();

        star.y -= star.speed;
        if (star.y < 0) {
          star.y = h;
          star.x = Math.random() * w;
        }
      });
      requestAnimationFrame(renderGalaxy);
    }
    renderGalaxy();

    window.addEventListener("resize", () => {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
    });
  }

  // 2. Xử lý Sidebar Menu 3 Gạch
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

  // 3. Chuyển đổi Tab Menu
  const tabs = document.querySelectorAll(".nav-tab");
  const panes = document.querySelectorAll(".tab-pane");

  tabs.forEach(tab => {
    tab.addEventListener("click", () => {
      tabs.forEach(t => t.classList.remove("active"));
      panes.forEach(p => p.classList.remove("active"));

      tab.classList.add("active");
      const targetPane = document.getElementById(tab.dataset.tab);
      if (targetPane) targetPane.classList.add("active");

      if (window.innerWidth <= 768) closeSidebar();
    });
  });

  // 4. Cấu hình Backend URL & Token
  const apiUrlInput = document.getElementById("api-url-input");
  const apiKeyInput = document.getElementById("api-key-input");
  const saveBtn = document.getElementById("btn-save-settings");

  const savedUrl = localStorage.getItem("cosmic_api_url") || window.API_BASE_URL || "";
  const savedKey = localStorage.getItem("cosmic_api_key") || "";

  if (apiUrlInput) apiUrlInput.value = savedUrl;
  if (apiKeyInput) apiKeyInput.value = savedKey;

  if (saveBtn) {
    saveBtn.addEventListener("click", () => {
      const url = apiUrlInput.value.trim().replace(/\/$/, "");
      const key = apiKeyInput.value.trim();
      localStorage.setItem("cosmic_api_url", url);
      localStorage.setItem("cosmic_api_key", key);
      alert("Đã lưu thiết lập kết nối đến Hosting Panel thành công!");
      fetchServerStatus();
    });
  }

  // 5. Gửi lệnh tới Backend trên Hosting Panel
  const terminal = document.getElementById("terminal-logs");
  function addLog(text, type = "info") {
    if (!terminal) return;
    const line = document.createElement("div");
    line.className = `log-line ${type}`;
    const time = new Date().toLocaleTimeString();
    line.textContent = `[${time}] ${text}`;
    terminal.appendChild(line);
    terminal.scrollTop = terminal.scrollHeight;
  }

  async function fetchServerStatus() {
    const url = localStorage.getItem("cosmic_api_url") || window.API_BASE_URL;
    if (!url) return;
    try {
      const res = await fetch(`${url}/api/status`);
      if (res.ok) {
        const data = await res.json();
        document.getElementById("stat-cpu").textContent = `${data.cpu || "12%"} (Node 26)`;
        document.getElementById("stat-ram").textContent = `${data.ram || "160 MB"}`;
        document.getElementById("user-display").textContent = "Đã kết nối Panel";
        addLog("Đồng bộ trạng thái từ Hosting Panel thành công.", "success");
      }
    } catch (e) {
      addLog("Chưa kết nối được Hosting Panel hoặc chưa cấu hình URL hợp lệ.", "warn");
    }
  }

  fetchServerStatus();

  // Nút xóa log
  const clearLogsBtn = document.getElementById("btn-clear-logs");
  if (clearLogsBtn) {
    clearLogsBtn.addEventListener("click", () => {
      if (terminal) terminal.innerHTML = "";
    });
  }
});
