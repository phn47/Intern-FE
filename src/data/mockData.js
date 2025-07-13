// Mock data cho sản phẩm giáo dục
export const mockProducts = [
    {
        id: 1,
        name: "Khóa học React từ cơ bản đến nâng cao",
        price: 899000,
        image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&h=300&fit=crop",
        shortDescription: "Học React từ zero đến hero với các dự án thực tế",
        longDescription: "Khóa học React toàn diện với 50+ bài học, 10 dự án thực tế. Bạn sẽ học được từ JSX, Components, State, Props đến Redux, React Router và deployment.",
        rating: 4.8,
        reviews: 245,
        instructor: "Nguyễn Văn A",
        duration: "40 giờ",
        students: 1250,
        level: "Beginner to Advanced",
        category: "Programming",
        tags: ["React", "JavaScript", "Frontend", "Web Development"]
    },
    {
        id: 2,
        name: "Thiết kế UI/UX chuyên nghiệp",
        price: 1299000,
        image: "https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?w=400&h=300&fit=crop",
        shortDescription: "Thiết kế giao diện người dùng hiện đại và chuyên nghiệp",
        longDescription: "Khóa học UI/UX Design đầy đủ từ research, wireframe, prototype đến design system. Sử dụng Figma, Adobe XD và các công cụ thiết kế hiện đại.",
        rating: 4.9,
        reviews: 189,
        instructor: "Trần Thị B",
        duration: "35 giờ",
        students: 890,
        level: "Intermediate",
        category: "Design",
        tags: ["UI/UX", "Figma", "Design", "Prototyping"]
    },
    {
        id: 3,
        name: "Python cho Data Science",
        price: 599000,
        image: "https://images.unsplash.com/photo-1526379879527-8559ecfcaec0?w=400&h=300&fit=crop",
        shortDescription: "Phân tích dữ liệu và machine learning với Python",
        longDescription: "Học Python từ cơ bản đến nâng cao cho Data Science. Pandas, NumPy, Matplotlib, Seaborn, Scikit-learn và các thư viện machine learning phổ biến.",
        rating: 4.7,
        reviews: 312,
        instructor: "Lê Văn C",
        duration: "60 giờ",
        students: 2100,
        level: "Beginner",
        category: "Data Science",
        tags: ["Python", "Data Science", "Machine Learning", "Pandas"]
    },
    {
        id: 4,
        name: "Marketing Digital 2024",
        price: 799000,
        image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop",
        shortDescription: "Chiến lược marketing online hiệu quả",
        longDescription: "Khóa học marketing digital toàn diện: SEO, SEM, Social Media Marketing, Email Marketing, Content Marketing và Analytics.",
        rating: 4.6,
        reviews: 156,
        instructor: "Phạm Thị D",
        duration: "30 giờ",
        students: 780,
        level: "Beginner to Intermediate",
        category: "Marketing",
        tags: ["Digital Marketing", "SEO", "Social Media", "Analytics"]
    },
    {
        id: 5,
        name: "Node.js và Express.js",
        price: 999000,
        image: "https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=400&h=300&fit=crop",
        shortDescription: "Xây dựng API và ứng dụng web với Node.js",
        longDescription: "Học Node.js từ cơ bản đến nâng cao, xây dựng RESTful API, tích hợp database MongoDB, authentication và deployment.",
        rating: 4.8,
        reviews: 203,
        instructor: "Hoàng Văn E",
        duration: "45 giờ",
        students: 1100,
        level: "Intermediate",
        category: "Programming",
        tags: ["Node.js", "Express", "Backend", "API"]
    },
    {
        id: 6,
        name: "Tiếng Anh giao tiếp cơ bản",
        price: 399000,
        image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=400&h=300&fit=crop",
        shortDescription: "Giao tiếp tiếng Anh tự tin trong mọi tình huống",
        longDescription: "Khóa học tiếng Anh giao tiếp thực tế với 100+ tình huống thường gặp, phát âm chuẩn và bài tập thực hành tương tác.",
        rating: 4.5,
        reviews: 445,
        instructor: "Ms. Sarah Johnson",
        duration: "25 giờ",
        students: 3200,
        level: "Beginner",
        category: "Language",
        tags: ["English", "Communication", "Speaking", "Pronunciation"]
    },
    {
        id: 7,
        name: "Vue.js 3 Masterclass",
        price: 749000,
        image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400&h=300&fit=crop",
        shortDescription: "Học Vue.js 3 từ cơ bản đến nâng cao",
        longDescription: "Khóa học Vue.js 3 toàn diện với Composition API, Vue Router, Pinia state management và các dự án thực tế.",
        rating: 4.7,
        reviews: 178,
        instructor: "Đỗ Văn F",
        duration: "38 giờ",
        students: 950,
        level: "Intermediate",
        category: "Programming",
        tags: ["Vue.js", "JavaScript", "Frontend", "Composition API"]
    },
    {
        id: 8,
        name: "Machine Learning cơ bản",
        price: 1499000,
        image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&h=300&fit=crop",
        shortDescription: "Giới thiệu về Machine Learning và AI",
        longDescription: "Khóa học Machine Learning từ cơ bản, bao gồm các thuật toán supervised learning, unsupervised learning và deep learning.",
        rating: 4.9,
        reviews: 267,
        instructor: "Dr. Nguyễn Thị G",
        duration: "55 giờ",
        students: 680,
        level: "Intermediate to Advanced",
        category: "Data Science",
        tags: ["Machine Learning", "AI", "Python", "Deep Learning"]
    }
];

// Categories
export const categories = [
    "All",
    "Programming",
    "Design",
    "Data Science",
    "Marketing",
    "Language",
    "Business",
    "Music",
    "Photography"
];

// Price ranges
export const priceRanges = [
    { value: "all", label: "Tất cả giá" },
    { value: "under500k", label: "Dưới 500K" },
    { value: "500k-1m", label: "500K - 1 triệu" },
    { value: "over1m", label: "Trên 1 triệu" }
];

export const mockComments = [
    {
        id: 1,
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
        name: "Nguyễn Văn Minh",
        content: "Khóa học React rất hay, giảng viên dạy dễ hiểu và có nhiều ví dụ thực tế!",
        course: "React từ cơ bản đến nâng cao"
    },
    {
        id: 2,
        avatar: "https://randomuser.me/api/portraits/women/65.jpg",
        name: "Trần Thị Hương",
        content: "UI/UX Design course giúp em hiểu rõ về thiết kế và user experience",
        course: "Thiết kế UI/UX chuyên nghiệp"
    },
    {
        id: 3,
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
        name: "Lê Hoàng Đức",
        content: "Python cho Data Science rất chi tiết, từ cơ bản đến nâng cao",
        course: "Python cho Data Science"
    },
    {
        id: 4,
        avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
        name: "Phạm Thị Lan",
        content: "Marketing Digital 2024 cập nhật xu hướng mới nhất, rất bổ ích!",
        course: "Marketing Digital 2024"
    },
    {
        id: 5,
        avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face",
        name: "Hoàng Văn Quý",
        content: "Node.js course giúp mình làm được API cho dự án công ty",
        course: "Node.js và Express.js"
    },
    {
        id: 6,
        avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop&crop=face",
        name: "Nguyễn Thị Mai",
        content: "Tiếng Anh giao tiếp cải thiện khả năng speaking của mình rất nhiều",
        course: "Tiếng Anh giao tiếp cơ bản"
    },
    {
        id: 7,
        avatar: "https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?w=100&h=100&fit=crop&crop=face",
        name: "Trần Văn Hải",
        content: "Giảng viên nhiệt tình, nội dung khóa học chất lượng cao",
        course: "React từ cơ bản đến nâng cao"
    },
    {
        id: 8,
        avatar: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=100&h=100&fit=crop&crop=face",
        name: "Lê Thị Thảo",
        content: "Học xong có thể apply ngay vào công việc thực tế",
        course: "Thiết kế UI/UX chuyên nghiệp"
    }
]; 