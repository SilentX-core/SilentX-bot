/**
 * ====================================================
 * SilentX Control Center
 * Frontend Configuration
 * Author: Hải
 * ====================================================
 *
 * GitHub Pages:
 * Chỉ hiển thị giao diện người dùng.
 *
 * Hosting Panel:
 * Chạy Backend, API, Bot, Database và toàn bộ logic.
 *
 * Hướng dẫn:
 * Thay API_BASE_URL bằng domain HTTPS của backend.
 *
 * Ví dụ:
 * https://api.silentx.vn
 * https://panel.domain.com
 * https://backend.example.com
 *
 * Không lưu:
 * - Bot Token
 * - API Key
 * - Password
 * - Database
 * - Secret Key
 * lên GitHub.
 *
 * ====================================================
 */

window.APP_CONFIG = Object.freeze({

  /**
   * Backend API URL
   */
  API_BASE_URL: "https://YOUR-HOSTING-PANEL-DOMAIN.com",

  /**
   * Thông tin giao diện
   */
  APP_NAME: "SilentX Control Center",

  /**
   * Phiên bản frontend
   */
  VERSION: "1.0.0",

  /**
   * Môi trường hoạt động
   * development | production
   */
  ENVIRONMENT: "production",

  /**
   * Hiển thị log ở console
   */
  DEBUG: false

});


/**
 * Helper truy cập cấu hình
 */
window.getConfig = (key) => {
  return window.APP_CONFIG[key];
};


/**
 * Kiểm tra cấu hình khi khởi động
 */
(() => {

  const config = window.APP_CONFIG;

  if (
    !config.API_BASE_URL ||
    config.API_BASE_URL.includes("YOUR-HOSTING-PANEL-DOMAIN")
  ) {

    console.warn(
      "[SilentX] API_BASE_URL chưa được cấu hình."
    );

  } else {

    console.info(
      `[SilentX] Kết nối Backend: ${config.API_BASE_URL}`
    );

  }

})();
