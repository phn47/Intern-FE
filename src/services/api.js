import { mockProducts } from '../data/mockData';

// Simulate API delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Mock API service
export const apiService = {
    // Lấy danh sách sản phẩm
    async getProducts() {
        await delay(500); // Simulate network delay
        return {
            success: true,
            data: mockProducts,
            message: 'Lấy danh sách sản phẩm thành công'
        };
    },

    // Lấy gợi ý AI dựa trên hành vi người dùng (ví dụ: đã thích)
    async getSuggestions(userId = 'default') {
        await delay(1000); // Simulate AI processing time
        // Lấy sản phẩm trong giỏ hàng
        const cartIds = JSON.parse(localStorage.getItem('cart') || '[]');
        // Lấy lịch sử xem
        const historyIds = JSON.parse(localStorage.getItem('viewHistory') || '[]');
        // Lấy sản phẩm đã thích
        const favoriteIds = JSON.parse(localStorage.getItem('favorites') || '[]');
        let suggestions = [];
        let reason = '';
        if (cartIds.length > 0) {
            // Gợi ý cùng danh mục với sản phẩm trong giỏ, loại trừ sản phẩm đã có trong giỏ
            const cartProducts = mockProducts.filter(p => cartIds.includes(p.id));
            const cartCategories = [...new Set(cartProducts.map(p => p.category))];
            suggestions = mockProducts.filter(p =>
                cartCategories.includes(p.category) && !cartIds.includes(p.id)
            ).slice(0, 3);
            reason = 'Dựa trên sản phẩm trong giỏ hàng của bạn';
        } else if (historyIds.length > 0) {
            // Gợi ý cùng danh mục với sản phẩm đã xem, loại trừ sản phẩm đã xem
            const historyProducts = mockProducts.filter(p => historyIds.includes(p.id));
            const historyCategories = [...new Set(historyProducts.map(p => p.category))];
            suggestions = mockProducts.filter(p =>
                historyCategories.includes(p.category) && !historyIds.includes(p.id)
            ).slice(0, 3);
            reason = 'Dựa trên lịch sử xem của bạn';
        } else if (favoriteIds.length > 0) {
            // Gợi ý cùng danh mục với sản phẩm đã thích, loại trừ sản phẩm đã thích
            const favoriteProducts = mockProducts.filter(p => favoriteIds.includes(p.id));
            const favoriteCategories = [...new Set(favoriteProducts.map(p => p.category))];
            suggestions = mockProducts.filter(p =>
                favoriteCategories.includes(p.category) && !favoriteIds.includes(p.id)
            ).slice(0, 3);
            reason = 'Dựa trên danh mục các khóa học bạn đã yêu thích';
        } else {
            // Nếu chưa có gì, gợi ý 3 sản phẩm nổi bật nhất
            suggestions = mockProducts.slice(0, 3);
            reason = 'Gợi ý các khóa học nổi bật cho người mới';
        }
        // Thêm trường reason cho từng suggestion
        suggestions = suggestions.map(s => ({ ...s, reason }));
        return {
            success: true,
            data: suggestions,
            message: 'Đã tìm thấy các khóa học phù hợp với bạn!'
        };
    },

    // Tìm kiếm sản phẩm
    async searchProducts(query) {
        await delay(300);
        const filtered = mockProducts.filter(product =>
            product.name.toLowerCase().includes(query.toLowerCase()) ||
            product.shortDescription.toLowerCase().includes(query.toLowerCase()) ||
            product.tags.some(tag => tag.toLowerCase().includes(query.toLowerCase()))
        );
        return {
            success: true,
            data: filtered,
            message: `Tìm thấy ${filtered.length} kết quả cho "${query}"`
        };
    },

    // Lọc sản phẩm theo giá
    async filterProductsByPrice(priceRange) {
        await delay(200);
        let filtered = mockProducts;

        switch (priceRange) {
            case 'under500k':
                filtered = mockProducts.filter(product => product.price < 500000);
                break;
            case '500k-1m':
                filtered = mockProducts.filter(product =>
                    product.price >= 500000 && product.price <= 1000000
                );
                break;
            case 'over1m':
                filtered = mockProducts.filter(product => product.price > 1000000);
                break;
            default:
                filtered = mockProducts;
        }

        return {
            success: true,
            data: filtered,
            message: `Đã lọc ${filtered.length} sản phẩm`
        };
    },

    // Lọc sản phẩm theo danh mục
    async filterProductsByCategory(category) {
        await delay(200);
        const filtered = category === 'All'
            ? mockProducts
            : mockProducts.filter(product => product.category === category);

        return {
            success: true,
            data: filtered,
            message: `Đã lọc ${filtered.length} sản phẩm trong danh mục ${category}`
        };
    },

    // Lấy chi tiết sản phẩm
    async getProductDetail(productId) {
        await delay(300);
        const product = mockProducts.find(p => p.id === parseInt(productId));

        if (!product) {
            throw new Error('Không tìm thấy sản phẩm');
        }

        return {
            success: true,
            data: product,
            message: 'Lấy chi tiết sản phẩm thành công'
        };
    },

    // Thêm vào yêu thích
    async addToFavorites(productId, userId = 'default') {
        await delay(200);
        return {
            success: true,
            message: 'Đã thêm vào danh sách yêu thích'
        };
    },

    // Xóa khỏi yêu thích
    async removeFromFavorites(productId, userId = 'default') {
        await delay(200);
        return {
            success: true,
            message: 'Đã xóa khỏi danh sách yêu thích'
        };
    },

    // Lấy danh sách yêu thích
    async getFavorites(userId = 'default') {
        await delay(300);
        // Mock favorites - trong thực tế sẽ lấy từ localStorage hoặc API
        const favoriteIds = JSON.parse(localStorage.getItem('favorites') || '[]');
        const favorites = mockProducts.filter(product => favoriteIds.includes(product.id));

        return {
            success: true,
            data: favorites,
            message: `Bạn có ${favorites.length} khóa học yêu thích`
        };
    }
};

// Error handler
export const handleApiError = (error) => {
    console.error('API Error:', error);
    return {
        success: false,
        message: error.message || 'Có lỗi xảy ra, vui lòng thử lại',
        data: null
    };
}; 