# COSMIC CONTROL CENTER - BACKEND (HOSTING PANEL)

## Hướng dẫn cài đặt trên Hosting Panel (Node.js 26):
1. Tải toàn bộ file trong thư mục này lên Hosting Panel của bạn.
2. Đổi tên file `.env.example` thành `.env` và nhập Token bot Discord/Telegram (nếu có).
3. Tại Hosting Panel, thiết lập phiên bản Node.js là `v26.x` hoặc `v22.x LTS`.
4. File khởi chạy chính: `index.js`.
5. Chạy lệnh cài đặt thư viện:
   ```bash
   npm install
   ```
6. Bấm **Start** hoặc **Restart App** trên panel.
7. Lấy tên miền / Port của ứng dụng rồi dán vào file `config.js` của GitHub Pages Frontend.
