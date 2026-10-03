# SilentX GitHub Pages UI

Xin chào, mình là Hải.

Đây là giao diện điều khiển của SilentX được triển khai trên GitHub Pages. Toàn bộ phần xử lý, bot, cơ sở dữ liệu và hệ thống backend vẫn chạy trên Hosting Panel riêng.

## Triển khai

1. Upload toàn bộ 6 file của giao diện lên thư mục gốc (root) của repository.
2. Mở file `config.js` và thay thế URL mặc định bằng đường dẫn HTTPS của Hosting Panel mà bạn đang sử dụng.
3. Vào **Settings → Pages**.
4. Chọn:
   - **Deploy from branch**
   - Branch: **main**
   - Folder: **/(root)**

Sau khi lưu, GitHub sẽ tự động xuất bản website.

## Lưu ý

- GitHub Pages chỉ dùng để hiển thị giao diện.
- Backend, bot Discord/Telegram, API và cơ sở dữ liệu SQLite vẫn được lưu và vận hành trên Hosting Panel.
- Hãy cấu hình CORS và cookie xác thực (credentials) trên backend để giao diện có thể giao tiếp với hệ thống.
- Không bao giờ đưa token, mật khẩu, API key hoặc bất kỳ thông tin bí mật nào lên GitHub.

## Kiến trúc dự án

GitHub Pages (UI) ⇄ Hosting Panel (API) ⇄ Discord / Telegram / Database

---

Phát triển và duy trì bởi Hải.
