# SilentX Control Center

Xin chào, mình là Hải.

Đây là phần giao diện Frontend của SilentX Control Center. Giao diện được thiết kế để chạy trên GitHub Pages, còn toàn bộ backend, API và các thành phần xử lý chính sẽ hoạt động trên Hosting Panel riêng.

## Cài đặt giao diện

### 1. Tạo repository

Tạo một repository mới trên GitHub để chứa giao diện SilentX.

Ví dụ:

`SilentX-Control-Center`

### 2. Upload source code

Đưa các file sau lên thư mục gốc của repository:

- `index.html`
- `login.html`
- `style.css`
- `app.js`
- `config.js`

### 3. Kết nối Backend

Mở:

`config.js`

Sau đó thay:

`YOUR-HOSTING-PANEL-DOMAIN.com`

bằng địa chỉ HTTPS của Hosting Panel đang chạy backend SilentX.

Frontend trên GitHub Pages sẽ sử dụng địa chỉ này để giao tiếp với API.

### 4. Bật GitHub Pages

Trong repository, vào:

**Settings → Pages**

Chọn:

- **Source:** Deploy from a branch
- **Branch:** `main`
- **Folder:** `/(root)`

Sau đó lưu cấu hình.

GitHub Pages sẽ cung cấp địa chỉ website cho repository sau khi quá trình deploy hoàn tất.

## Cấu trúc hệ thống

```text
GitHub Pages
     │
     │ HTTPS / API
     ▼
Hosting Panel
     │
     ├── SilentX Backend
     ├── Discord Gateway
     ├── Telegram Polling
     └── Database
