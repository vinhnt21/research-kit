# Research Kit — Official Landing Page (Vite + React)

Landing page giới thiệu và quảng bá bộ open-source skills **Research Kit** (`vinhnt21/research-kit`).

## Tính năng Nổi bật & Kiến trúc

1. **Chuẩn SEO & Metadata Quốc Tế**:
   - Thẻ Meta: `title`, `description`, `keywords`, `canonical`, `robots`.
   - OpenGraph & Twitter Cards đầy đủ hình ảnh đại diện.
   - Cấu trúc dữ liệu có cấu trúc **Schema.org (JSON-LD)** dạng `SoftwareApplication`.
   - Cấu trúc thẻ ngữ nghĩa chuẩn HTML5: Một `<h1>` duy nhất, `<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<footer>`.
2. **Đa Ngôn Ngữ Song Ngữ (Mặc định Tiếng Anh, Chuyển Đổi Tức Thì)**:
   - Mặc định tải giao diện Tiếng Anh (English) để tiếp cận cộng đồng học thuật & AI toàn cầu.
   - Nút gạt chuyển đổi tức thì sang Tiếng Việt (`[🇻🇳 VI]`) trên Navbar và tự động cập nhật thuộc tính `<html lang="...">`.
3. **Thiết Kế Hiện Đại, Tối Ưu Tương Tác**:
   - Không phụ thuộc framework CSS nặng nề: Dùng Vanilla CSS với CSS variables, glassmorphism, hiệu ứng lưới nghiên cứu `bg-grid`, và gradient navy/emerald cao cấp.
   - Terminal Box tương tác: 1-Click Copy lệnh `npx skills add vinhnt21/research-kit` với phản hồi trực quan.
   - Khối sơ đồ tương tác hiển thị quy trình 6 giai đoạn và 4 module mở rộng từ file SVG gốc.
   - Bảng đối đầu trực diện (Head-to-head comparison) với Scientific Agent Skills và Science Superpowers.
   - Accordion giải đáp FAQ mượt mà.

## Live Demo & Địa chỉ Truy cập

- **Custom Domain chính thức**: [https://research-kit.vinhnguyenthanh.com](https://research-kit.vinhnguyenthanh.com)
- **Cloudflare Pages Domain**: [https://research-kit.pages.dev](https://research-kit.pages.dev)

---

## Hướng dẫn Chạy & Triển khai

### 1. Môi trường Phát triển Cục bộ (Local Development)

```bash
# Cài đặt thư viện phụ thuộc
npm install

# Chạy server phát triển (HMR)
npm run dev

# Đóng gói sản phẩm (Production build)
npm run build

# Xem trước bản đóng gói cục bộ
npm run preview
```

### 2. Triển khai lên Cloudflare Pages qua CLI (Deploy via Wrangler)

Ứng dụng được triển khai trực tiếp lên **Cloudflare Pages** bằng **Wrangler CLI**.

#### Yêu cầu tiên quyết:
- Đã đăng nhập Cloudflare bằng lệnh:
  ```bash
  npx wrangler login
  ```
- Dự án trên Cloudflare Pages có tên: `research-kit`

#### Cách 1: Sử dụng npm script (Khuyến nghị)
Lệnh này sẽ tự động chạy `npm run build` trước khi đẩy thư mục `dist` lên Cloudflare:
```bash
npm run deploy
```

#### Cách 2: Sử dụng lệnh trực tiếp với Wrangler CLI
```bash
# Bước 1: Build mã nguồn
npm run build

# Bước 2: Deploy thư mục dist lên Cloudflare Pages
npx wrangler pages deploy dist --project-name research-kit
```

> [!TIP]
> Nếu triển khai từ một nhánh cụ thể hoặc muốn chỉ định commit message:
> ```bash
> npx wrangler pages deploy dist --project-name research-kit --branch main --commit-dirty=true
> ```

#### Quản lý Phiên bản & Rollback (Hoàn tác sự cố)
Theo quy chuẩn vận hành và rollback:
```bash
# Xem danh sách lịch sử các lần deploy (lấy Deployment ID)
npx wrangler pages deployment list --project-name research-kit

# Rollback ngay lập tức về bản deploy ổn định trước đó
npx wrangler rollback <deployment-id>
```

#### Thông số Cấu hình Cloudflare Pages (Reference Specs)
| Thuộc tính | Giá trị |
|---|---|
| **Platform** | Cloudflare Pages (Edge CDN) |
| **Project Name** | `research-kit` |
| **Framework Preset** | Vite |
| **Build Command** | `npm run build` |
| **Build Output Directory** | `dist` |
| **Root Directory** | `web` |
| **Node.js Version** | 18+ / 20+ |
| **Custom Domain** | `research-kit.vinhnguyenthanh.com` |
| **Default Domain** | `research-kit.pages.dev` |

## Cấu trúc Thư mục

```text
web/
├── public/
│   ├── favicon.svg             # Favicon SVG chuẩn thương hiệu
│   └── figures/                # Toàn bộ biểu đồ SVG chất lượng cao
├── src/
│   ├── components/             # Các component giao diện
│   │   ├── Navbar.jsx          # Header, điều hướng & nút đổi ngôn ngữ
│   │   ├── Hero.jsx            # Tiêu đề H1, terminal copy & stats
│   │   ├── Pillars.jsx         # 4 trụ cột giá trị
│   │   ├── LifecycleSection.jsx# 6 bước quy trình + 4 module mở rộng
│   │   ├── ContextSection.jsx  # So sánh token context (14k vs <1k)
│   │   ├── ComparisonSection.jsx# Bảng so sánh đối đầu
│   │   ├── MultiPaperSection.jsx# Kiến trúc Active Paper
│   │   ├── InstallSection.jsx  # Tabs hướng dẫn cài đặt đa agent
│   │   ├── FAQSection.jsx      # Accordion hỏi đáp
│   │   ├── CTASection.jsx      # Kêu gọi hành động cuối trang
│   │   └── Footer.jsx          # Chân trang & bản quyền
│   ├── data/
│   │   └── content.js          # Toàn bộ từ điển nội dung song ngữ (EN / VI)
│   ├── App.jsx                 # Bộ điều khiển chính & đồng bộ ngôn ngữ
│   └── index.css               # Hệ thống design tokens & styling
├── index.html                  # HTML chuẩn SEO & Structured Data
└── vite.config.js
```
