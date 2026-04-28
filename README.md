# 🏥 FamCare – Trợ lý sức khoẻ thông minh cho gia đình

> Ứng dụng giúp bạn **quét toa thuốc bằng AI**, **quản lý tủ thuốc**, **lập thực đơn theo bệnh lý** và **lưu hồ sơ sức khoẻ** cho cả gia đình.
>
> 🌐 Website chính thức: **[famcare.site](https://famcare.site)**
>
> 🎓 *Dự án môn học – Sinh viên UEH*

---

## 📖 Mục lục

1. [FamCare là gì?](#-famcare-là-gì)
2. [Tính năng chính](#-tính-năng-chính)
3. [Dùng thử online (không cần cài đặt)](#-dùng-thử-online-không-cần-cài-đặt)
4. [⭐ Hướng dẫn cài đặt chi tiết trên máy tính](#-hướng-dẫn-cài-đặt-chi-tiết-trên-máy-tính)
5. [Hướng dẫn sử dụng từng tính năng](#-hướng-dẫn-sử-dụng-từng-tính-năng)
6. [Công nghệ sử dụng](#-công-nghệ-sử-dụng)
7. [Liên hệ hỗ trợ](#-liên-hệ-hỗ-trợ)

---

## 💡 FamCare là gì?

**FamCare** là một ứng dụng web giúp **các gia đình Việt** chăm sóc sức khoẻ người thân, đặc biệt là **người lớn tuổi**:

- Không lo **đọc nhầm toa thuốc bác sĩ viết tay**
- Không quên **liều thuốc hằng ngày**
- Biết **nên ăn gì – kiêng gì** theo bệnh lý
- Lưu lại **toàn bộ hồ sơ sức khoẻ** của các thành viên

---

## ✨ Tính năng chính

| Tính năng | Mô tả |
|---|---|
| 📷 **Quét toa thuốc bằng AI** | Chụp ảnh toa → AI đọc và liệt kê thuốc, liều dùng |
| 💊 **Tủ thuốc gia đình** | Lưu, theo dõi, chia sẻ thuốc giữa các thành viên |
| 🍲 **Thực đơn AI** | AI gợi ý bữa ăn phù hợp với bệnh & thuốc đang dùng |
| 👨‍👩‍👧 **Hồ sơ gia đình** | Quản lý nhiều người thân trong cùng một tài khoản |
| 📅 **Lịch hẹn khám** | Nhắc lịch tái khám (sắp ra mắt) |
| 🌙 **Giao diện sáng/tối** | Bảo vệ mắt, dễ đọc cho người lớn tuổi |

---

## 🌐 Dùng thử online (KHÔNG cần cài đặt)

> Cách nhanh nhất nếu bạn chỉ muốn **xài thử**.

1. Mở trình duyệt (**Chrome / Safari / Edge / Cốc Cốc**)
2. Truy cập 👉 **[https://famcare.site](https://famcare.site)**
3. Bấm **"Đăng ký"** → nhập email + mật khẩu (≥ 6 ký tự)
4. Đăng nhập và bắt đầu dùng 🎉

---

## ⭐ Hướng dẫn cài đặt chi tiết trên máy tính

> Phần này dành cho bạn muốn **chạy mã nguồn FamCare ngay trên máy tính của mình** (để chỉnh sửa, phát triển thêm, hoặc học hỏi).
>
> Làm theo từng bước – kể cả chưa từng code cũng làm được.

---

### 🧰 BƯỚC 1: Cài các phần mềm cần thiết

#### 1.1. Cài **Node.js** (bắt buộc)

Node.js là môi trường để chạy ứng dụng.

- Truy cập 👉 **https://nodejs.org**
- Tải bản **LTS** (khuyên dùng – nút bên trái màu xanh)
- Mở file vừa tải → **Next → Next → Install** (giữ nguyên hết tuỳ chọn)
- Kiểm tra cài đặt thành công: mở **Terminal** (Mac) hoặc **Command Prompt / PowerShell** (Windows), gõ:
  ```bash
  node -v
  npm -v
  ```
  Nếu hiện ra số phiên bản (ví dụ `v20.11.0`) → ✅ thành công.

#### 1.2. Cài **Git** (để tải mã nguồn)

- Truy cập 👉 **https://git-scm.com/downloads**
- Tải bản phù hợp với hệ điều hành (Windows / Mac)
- Cài đặt: **Next → Next → Install** (giữ nguyên)
- Kiểm tra: gõ `git --version` trong Terminal → hiện số phiên bản là OK.

#### 1.3. Cài **Visual Studio Code** (IDE để xem & sửa code)

VS Code là phần mềm để mở và chỉnh sửa code – miễn phí, dễ dùng nhất hiện nay.

- Truy cập 👉 **https://code.visualstudio.com**
- Bấm **Download** → cài đặt như bình thường
- Mở VS Code lên, vào tab **Extensions** (biểu tượng 4 ô vuông bên trái) và cài thêm:
  - **ESLint** – bắt lỗi code
  - **Prettier** – tự động format code đẹp
  - **Tailwind CSS IntelliSense** – gợi ý class Tailwind
  - **Prisma** – hỗ trợ file `schema.prisma`

#### 1.4. (Tuỳ chọn) Cài **PostgreSQL** hoặc dùng cloud miễn phí

FamCare cần một **cơ sở dữ liệu PostgreSQL**. Có 2 cách:

**Cách A – Dùng cloud miễn phí (khuyên dùng, không cần cài gì):**
- [Supabase](https://supabase.com) – đăng ký → tạo project → copy `Connection String`
- Hoặc [Neon](https://neon.tech) – tương tự, free 500MB

**Cách B – Cài Postgres trên máy:**
- Tải tại 👉 **https://www.postgresql.org/download/**
- Khi cài, nhớ **mật khẩu** bạn đặt cho user `postgres`

#### 1.5. Lấy **Gemini API Key** (cho tính năng AI)

- Truy cập 👉 **https://aistudio.google.com/apikey**
- Đăng nhập Google → bấm **"Create API Key"**
- Copy chuỗi key bắt đầu bằng `AIza...` để dùng ở bước sau

---

### 📥 BƯỚC 2: Tải mã nguồn về máy

Mở **Terminal** (Mac) hoặc **Command Prompt** (Windows), chuyển đến thư mục bạn muốn lưu (ví dụ Desktop):

```bash
cd Desktop
```

Tải mã nguồn:

```bash
git clone <địa-chỉ-repo-của-bạn>
cd famcare
```

> 💡 Thay `<địa-chỉ-repo-của-bạn>` bằng link GitHub của dự án, ví dụ:
> `git clone https://github.com/yourusername/famcare.git`

---

### 📦 BƯỚC 3: Cài các thư viện của dự án

Trong terminal (đang ở thư mục `famcare`), gõ:

```bash
npm install
```

Đợi 1-3 phút để tải xong (sẽ tạo ra thư mục `node_modules`).

---

### 🔐 BƯỚC 4: Tạo file cấu hình `.env`

Trong VS Code (mở thư mục `famcare`), tạo **file mới tên `.env`** ngay ở thư mục gốc, paste nội dung sau và **điền giá trị thật** vào:

```env
# Kết nối database (lấy từ Supabase / Neon / Postgres local)
DATABASE_URL="postgresql://user:password@host:5432/dbname"

# Khoá bí mật cho đăng nhập (tự đặt chuỗi bất kỳ, dài càng tốt)
JWT_SECRET="day_la_chuoi_bi_mat_cua_toi_12345"

# API Key Gemini đã lấy ở bước 1.5
GEMINI_API_KEY="AIzaSy..."

# Khoá mã hoá – PHẢI đúng 32 ký tự
ENCRYPTION_KEY="abcdefghijklmnopqrstuvwxyz123456"

# Domain được phép truy cập backend
ALLOWED_ORIGINS="http://localhost:8080"
```

> ⚠️ **Lưu ý:** `ENCRYPTION_KEY` phải đúng **32 ký tự**, không hơn không kém.

---

### 🗄 BƯỚC 5: Khởi tạo database

Trong terminal, chạy lần lượt:

```bash
npx prisma generate
npx prisma db push
```

Lệnh này sẽ:
- Tạo các bảng (users, medications, meals…) trong database của bạn
- Sinh ra Prisma Client để code gọi tới database

---

### ▶️ BƯỚC 6: Chạy ứng dụng

FamCare gồm **2 phần**: backend (server) và frontend (web). Bạn cần mở **2 terminal cùng lúc**.

#### Terminal 1 – Chạy backend (server):

```bash
npm run server
```

Khi thấy dòng: `🚀 Server running on http://localhost:3001` → ✅ backend đã chạy.

#### Terminal 2 – Chạy frontend (web):

> 💡 Mở terminal mới: trong VS Code bấm **Terminal → New Terminal**, hoặc dùng phím tắt `Ctrl + Shift + ` ` (`Cmd + ` ` trên Mac).

```bash
npm run dev
```

Khi thấy dòng: `Local: http://localhost:8080` → ✅ frontend đã chạy.

---

### 🎉 BƯỚC 7: Mở web trong trình duyệt

Mở Chrome/Safari, truy cập:

👉 **http://localhost:8080**

Đăng ký tài khoản và bắt đầu dùng FamCare ngay trên máy bạn!

---

### 🆘 Khắc phục lỗi thường gặp

| Lỗi | Cách khắc phục |
|---|---|
| `command not found: npm` | Chưa cài Node.js → quay lại bước 1.1 |
| `command not found: git` | Chưa cài Git → quay lại bước 1.2 |
| `Error: connect ECONNREFUSED` (database) | Kiểm tra lại `DATABASE_URL` trong file `.env` |
| `Invalid key length` | `ENCRYPTION_KEY` phải đúng **32 ký tự** |
| `Port 8080 already in use` | Đang có app khác chiếm cổng → tắt nó hoặc đổi cổng trong `vite.config.ts` |
| Trang trắng / lỗi AI | Kiểm tra `GEMINI_API_KEY` đã đúng và còn quota chưa |
| `npm install` báo lỗi | Thử xoá `node_modules` và file `package-lock.json`, chạy lại `npm install` |

---

### 📜 Các lệnh hữu ích khác

```bash
npm run dev          # Chạy frontend (chế độ phát triển)
npm run server       # Chạy backend
npm run build        # Build bản production
npm run preview      # Xem thử bản đã build
npm run lint         # Kiểm tra lỗi code
npm run test         # Chạy unit test
npx prisma studio    # Mở giao diện xem database (rất tiện)
```

---

## 📚 Hướng dẫn sử dụng từng tính năng

### 📷 Quét toa thuốc bằng AI
1. Vào menu **Scanner**
2. Bấm **"Tải ảnh lên"** → chọn ảnh toa thuốc
3. Đồng ý điều khoản AI → đợi 5-10 giây
4. AI trả về tên thuốc, liều dùng, cách dùng → bấm **"Lưu vào tủ thuốc"**

💡 *Mẹo: Chụp đủ sáng, không mờ → kết quả chính xác hơn.*

### 💊 Tủ thuốc gia đình
- Xem tất cả thuốc đã lưu, thêm/sửa/xoá thủ công
- Bật **"Chia sẻ"** để người thân trong gia đình cùng thấy

### 🍲 Lập thực đơn AI
- Vào **Meal Plan** → bấm **"Tạo thực đơn mới"**
- AI gợi ý món **nên ăn / cần kiêng** dựa trên thuốc & bệnh

### 👨‍👩‍👧 Quản lý gia đình
- Vào **Profile** → tab **"Thành viên gia đình"** → thêm bằng email FamCare

### ⚙️ Cài đặt
- Đổi mật khẩu, bật/tắt giao diện tối, bật/tắt thông báo

---

## 🛠 Công nghệ sử dụng

- **Frontend:** React 18 + Vite + TypeScript + Tailwind CSS + shadcn/ui
- **Backend:** Node.js (Express) + Prisma ORM
- **Database:** PostgreSQL
- **AI:** Google Gemini 1.5 Flash
- **Auth:** JWT + bcryptjs
- **Bảo mật:** Mã hoá AES-256 cho dữ liệu nhạy cảm

---

## 📞 Liên hệ hỗ trợ

- 🌐 **Website:** [famcare.site](https://famcare.site)
- ☎️ **Hotline:** [0388 224 736](tel:0388224736)
- 📧 **Email:** support@famcare.site

---

<div align="center">

**Made with ❤️ by Sinh viên UEH**

*FamCare © 2026 – Dự án môn học*

</div>
