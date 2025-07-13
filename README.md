# EduAI - Nền tảng giáo dục AI

Một ứng dụng web hiện đại cho sàn giáo dục thương mại điện tử tích hợp AI, nơi người dùng có thể tìm kiếm, khám phá và yêu thích các khóa học trực tuyến.

## 🚀 Tính năng chính

### ✨ Giao diện người dùng
- **Thiết kế hiện đại**: UI/UX tối ưu với Tailwind CSS
- **Responsive**: Hoạt động tốt trên mọi thiết bị (desktop, tablet, mobile)
- **Hiệu ứng mượt mà**: Animations và transitions chuyên nghiệp

### 🔍 Tìm kiếm và lọc
- **Tìm kiếm thông minh**: Tìm theo tên khóa học, giảng viên, tags
- **Bộ lọc giá**: Dưới 500K, 500K-1M, Trên 1M
- **Bộ lọc danh mục**: Programming, Design, Data Science, Marketing, Language
- **Tìm kiếm nhanh**: Quick filter buttons

### 🤖 AI Suggestions (Gợi ý thông minh)
- **Gợi ý nâng cao**: Dựa trên sản phẩm trong giỏ hàng, lịch sử xem, hoặc sản phẩm đã yêu thích
- **Lịch sử xem**: Lưu lại các sản phẩm bạn đã click vào xem chi tiết, có trang riêng hiển thị
- **Loading skeleton**: Hiển thị hiệu ứng loading khi chờ gợi ý AI
- **Xử lý lỗi API**: Nếu API gợi ý lỗi sẽ hiển thị thông báo rõ ràng cho người dùng

### ❤️ Quản lý yêu thích
- **Thêm/xóa yêu thích**: Toggle với animation
- **Local storage**: Lưu trữ danh sách yêu thích
- **Trang riêng**: Hiển thị khóa học yêu thích
- **Thông báo**: Toast notifications

### 📱 Modal chi tiết
- **Thông tin đầy đủ**: Mô tả, đánh giá, giảng viên
- **Tags và categories**: Hiển thị chủ đề học tập
- **Call-to-action**: Nút mua ngay và yêu thích
- **Responsive modal**: Tối ưu cho mobile

## 🛠️ Công nghệ sử dụng

- **React 18**: Framework chính
- **Tailwind CSS**: Styling và responsive design
- **Lucide React**: Icon library
- **Local Storage**: State persistence
- **Mock API**: Simulate backend services

## 📁 Cấu trúc dự án

```
src/
├── components/              # React components UI/UX
│   ├── Header.js            # Thanh điều hướng, logo, user menu
│   ├── Footer.js            # Footer website
│   ├── ELearningPlatform.js # Trang chính, quản lý state tổng
│   ├── ProductCard.js       # Thẻ hiển thị khóa học
│   ├── ProductModal.js      # Modal chi tiết khóa học
│   ├── SearchAndFilter.js   # Bộ lọc, tìm kiếm
│   ├── TagList.js           # Hiển thị tag màu nhất quán
│   ├── Toast.js             # Thông báo/toast
│   ├── SuggestionSkeleton.js# Skeleton loading cho AI gợi ý
│   ├── AIChatbot.js         # Chatbot AI tư vấn khóa học
│   ├── CartPage.js          # Trang giỏ hàng
│   └── FloatingComments.js  # Feedback học viên chạy ngang
├── data/                   # Dữ liệu mock
│   └── mockData.js         # Sản phẩm, bình luận, danh mục, v.v.
├── services/               # API services (mock)
│   └── api.js              # Hàm gọi API giả lập
├── utils/                  # Helper functions
│   └── helpers.js          # Hàm tiện ích, localStorage, lịch sử xem
├── assets/                 # Tài nguyên tĩnh
│   └── icons/              # Icon, linh vật, logo
│       ├── Pet1_NBG.png    # Linh vật chính
│       └── Pet1.png        # Icon phụ
├── App.js                  # Root component
├── index.js                # Entry point
└── index.css               # Global styles, Tailwind, animation
```

## 🚀 Hướng dẫn Build & Run

### Yêu cầu hệ thống
- Node.js >= 16
- npm (hoặc yarn)

### Cài đặt dependencies

```bash
npm install
# hoặc
yarn install
```

### Chạy development server

```bash
npm start
# hoặc
yarn start
```

- Ứng dụng sẽ chạy tại: http://localhost:3000
- Mọi thay đổi code sẽ tự động reload (hot reload)

### Build production

```bash
npm run build
# hoặc
yarn build
```

- Thư mục build sẽ nằm ở `build/` (có thể deploy lên Vercel, Netlify, ...)

### Lưu ý
- Nếu gặp lỗi về version, hãy kiểm tra Node.js >= 16
- Để cài Node.js: https://nodejs.org/
- Để cài yarn: `npm install -g yarn`

## 📋 API Endpoints (Mock)

### Products
- `GET /api/products` - Lấy danh sách sản phẩm
- `GET /api/products/:id` - Lấy chi tiết sản phẩm
- `GET /api/products/search?q=query` - Tìm kiếm sản phẩm

### AI Suggestions
- `GET /api/suggestions?userId=xxx` - Lấy gợi ý AI nâng cao (ưu tiên giỏ hàng, lịch sử xem, yêu thích)

### Favorites
- `POST /api/favorites` - Thêm vào yêu thích
- `DELETE /api/favorites/:id` - Xóa khỏi yêu thích
- `GET /api/favorites` - Lấy danh sách yêu thích

### Lịch sử xem
- Tự động lưu khi click "Xem chi tiết"
- Xem lại tại trang "Lịch sử xem"

## 🎨 Design System

### Colors
- **Primary**: Blue (#2563eb)
- **Secondary**: Purple (#7c3aed)
- **Success**: Green (#059669)
- **Warning**: Yellow (#d97706)
- **Error**: Red (#dc2626)

### Typography
- **Font**: Inter (Google Fonts)
- **Weights**: 300, 400, 500, 600, 700

### Components
- **Cards**: Rounded corners, shadows, hover effects
- **Buttons**: Primary, secondary, with icons
- **Modals**: Overlay, responsive, smooth animations
- **Toast**: Success, info, error notifications
- **TagList**: Màu tag nhất quán
- **SuggestionSkeleton**: Loading skeleton cho AI

## 🔧 Tùy chỉnh

### Thêm sản phẩm mới
Chỉnh sửa `src/data/mockData.js`:
```javascript
{
    id: 9,
    name: "Tên khóa học",
    price: 999000,
    image: "URL_ảnh",
    shortDescription: "Mô tả ngắn",
    longDescription: "Mô tả chi tiết",
    rating: 4.8,
    reviews: 150,
    instructor: "Tên giảng viên",
    duration: "30 giờ",
    students: 800,
    level: "Beginner",
    category: "Programming",
    tags: ["React", "JavaScript"]
}
```

### Thay đổi theme
Chỉnh sửa `tailwind.config.js`:
```javascript
theme: {
    extend: {
        colors: {
            primary: {
                600: '#your-color'
            }
        }
    }
}
```

## 📱 Responsive Breakpoints

- **Mobile**: < 640px
- **Tablet**: 640px - 1024px
- **Desktop**: > 1024px

## 🧪 Testing

```bash
npm test
```

## 📦 Build và Deploy

### Build
```bash
npm run build
```

### Deploy to Netlify
1. Connect repository to Netlify
2. Build command: `npm run build`
3. Publish directory: `build`

### Deploy to Vercel
1. Install Vercel CLI: `npm i -g vercel`
2. Deploy: `vercel`

## 🤝 Đóng góp

1. Fork repository
2. Tạo feature branch: `git checkout -b feature/new-feature`
3. Commit changes: `git commit -am 'Add new feature'`
4. Push branch: `git push origin feature/new-feature`
5. Tạo Pull Request

## 📄 License

MIT License - xem file [LICENSE](LICENSE) để biết thêm chi tiết.

## 👨‍💻 Tác giả

**EduAI Team**
- Email: contact@eduai.com
- Website: https://eduai.com

---

⭐ Nếu dự án này hữu ích, hãy cho chúng tôi một star!