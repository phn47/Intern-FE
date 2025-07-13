import React, { useState, useEffect, useCallback } from 'react';
import Header from './Header';
import SearchAndFilter from './SearchAndFilter';
import ProductCard from './ProductCard';
import ProductModal from './ProductModal';
import Toast from './Toast';
import { apiService, handleApiError } from '../services/api';
import { storage, viewHistory } from '../utils/helpers';
import SuggestionSkeleton from './SuggestionSkeleton';
import FloatingComments from './FloatingComments';

const ELearningPlatform = () => {
    // State management
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [priceFilter, setPriceFilter] = useState('all');
    const [categoryFilter, setCategoryFilter] = useState('All');
    const [favorites, setFavorites] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [showFavorites, setShowFavorites] = useState(false);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [suggestions, setSuggestions] = useState([]);
    const [toast, setToast] = useState({ show: false, message: '', type: '' });
    const [isLoading, setIsLoading] = useState(false);
    const [isLoadingSuggestions, setIsLoadingSuggestions] = useState(false);
    const [showHistory, setShowHistory] = useState(false);
    const [suggestionError, setSuggestionError] = useState('');

    // Load favorites from localStorage on mount
    useEffect(() => {
        const savedFavorites = storage.get('favorites', []);
        setFavorites(savedFavorites);
        // Lắng nghe sự kiện favoritesUpdated để đồng bộ favorites khi có thay đổi từ nơi khác
        const syncFavorites = () => {
            const updatedFavorites = storage.get('favorites', []);
            setFavorites(updatedFavorites);
        };
        window.addEventListener('favoritesUpdated', syncFavorites);
        return () => window.removeEventListener('favoritesUpdated', syncFavorites);
    }, []);

    // Load products from API
    const loadProducts = useCallback(async () => {
        setIsLoading(true);
        try {
            const response = await apiService.getProducts();
            if (response.success) {
                setProducts(response.data);
                setFilteredProducts(response.data);
            } else {
                showToast(response.message, 'error');
            }
        } catch (error) {
            const errorResponse = handleApiError(error);
            showToast(errorResponse.message, 'error');
        } finally {
            setIsLoading(false);
        }
    }, []);

    // Load products on mount
    useEffect(() => {
        loadProducts();
    }, [loadProducts]);

    // Filter products based on search, price, and category
    useEffect(() => {
        let filtered = products;

        // Search filter
        if (searchTerm) {
            filtered = filtered.filter(product =>
                product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                product.shortDescription.toLowerCase().includes(searchTerm.toLowerCase()) ||
                product.tags?.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
            );
        }

        // Price filter
        if (priceFilter !== 'all') {
            filtered = filtered.filter(product => {
                switch (priceFilter) {
                    case 'under500k':
                        return product.price < 500000;
                    case '500k-1m':
                        return product.price >= 500000 && product.price <= 1000000;
                    case 'over1m':
                        return product.price > 1000000;
                    default:
                        return true;
                }
            });
        }

        // Category filter
        if (categoryFilter !== 'All') {
            filtered = filtered.filter(product => product.category === categoryFilter);
        }

        setFilteredProducts(filtered);
    }, [searchTerm, priceFilter, categoryFilter, products]);

    // Get AI suggestions
    const getSuggestions = async () => {
        setIsLoadingSuggestions(true);
        setSuggestionError('');
        try {
            const response = await apiService.getSuggestions();
            if (response.success) {
                setSuggestions(response.data);
                setShowSuggestions(true);
                setShowFavorites(false);
                showToast(response.message, 'success');
            } else {
                setSuggestionError(response.message || 'Không thể lấy gợi ý lúc này');
                showToast(response.message, 'error');
            }
        } catch (error) {
            const errorResponse = handleApiError(error);
            setSuggestionError(errorResponse.message || 'Không thể lấy gợi ý lúc này');
            showToast(errorResponse.message, 'error');
        } finally {
            setIsLoadingSuggestions(false);
        }
    };

    // Toggle favorite
    const toggleFavorite = async (productId) => {
        const isFavorite = favorites.includes(productId);
        const newFavorites = isFavorite
            ? favorites.filter(id => id !== productId)
            : [...favorites, productId];

        setFavorites(newFavorites);
        storage.set('favorites', newFavorites);

        const product = products.find(p => p.id === productId);
        if (product) {
            try {
                if (isFavorite) {
                    await apiService.removeFromFavorites(productId);
                    showToast(`Đã xóa "${product.name}" khỏi danh sách yêu thích`, 'info');
                } else {
                    await apiService.addToFavorites(productId);
                    showToast(`Đã thêm "${product.name}" vào danh sách yêu thích`, 'success');
                }
            } catch (error) {
                // Revert state if API call fails
                setFavorites(favorites);
                storage.set('favorites', favorites);
                showToast('Có lỗi xảy ra, vui lòng thử lại', 'error');
            }
        }
    };

    // Show toast notification
    const showToast = (message, type = 'success') => {
        setToast({ show: true, message, type });
    };

    // Close toast
    const closeToast = () => {
        setToast({ show: false, message: '', type: '' });
    };

    // Khi xem chi tiết sản phẩm, lưu vào lịch sử
    const handleViewDetail = (product) => {
        setSelectedProduct(product);
        viewHistory.add(product.id);
    };

    // Lấy danh sách sản phẩm đã xem
    const getHistoryProducts = () => {
        const ids = viewHistory.get();
        return ids.map(id => products.find(p => p.id === id)).filter(Boolean);
    };

    // Get products to display
    const getProductsToDisplay = () => {
        if (showHistory) return getHistoryProducts();
        if (showFavorites) return products.filter(product => favorites.includes(product.id));
        if (showSuggestions) return suggestions;
        return filteredProducts;
    };

    // Get section title and description
    const getSectionInfo = () => {
        if (showHistory) {
            const count = getHistoryProducts().length;
            return {
                title: 'Lịch sử xem',
                description: `${count} sản phẩm bạn đã xem gần đây`
            };
        }
        if (showFavorites) {
            return {
                title: 'Khóa học yêu thích',
                description: `${favorites.length} khóa học trong danh sách yêu thích`
            };
        }
        if (showSuggestions) {
            return {
                title: 'Khóa học được gợi ý cho bạn',
                description: 'Dựa trên sở thích và hành vi học tập của bạn'
            };
        }
        return {
            title: 'Khóa học nổi bật',
            description: `${filteredProducts.length} khóa học có sẵn`
        };
    };

    const { title, description } = getSectionInfo();
    const productsToDisplay = getProductsToDisplay();

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <Header
                showFavorites={showFavorites}
                setShowFavorites={setShowFavorites}
                setShowSuggestions={setShowSuggestions}
                favoritesCount={favorites.length}
                showSuggestions={showSuggestions}
                showHistory={showHistory}
                setShowHistory={setShowHistory}
            />

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Search and Filter Section */}
                {!showFavorites && !showHistory && (
                    <SearchAndFilter
                        searchTerm={searchTerm}
                        setSearchTerm={setSearchTerm}
                        priceFilter={priceFilter}
                        setPriceFilter={setPriceFilter}
                        categoryFilter={categoryFilter}
                        setCategoryFilter={setCategoryFilter}
                        onGetSuggestions={getSuggestions}
                        isLoading={isLoadingSuggestions}
                    />
                )}

                {/* Section Title */}
                <div className="mb-6">
                    <h2 className="text-2xl font-bold text-gray-900">
                        {title}
                    </h2>
                    <p className="text-gray-600 mt-1">
                        {description}
                    </p>
                </div>

                {/* Loading State */}
                {isLoading && (
                    <div className="flex justify-center items-center py-12">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                    </div>
                )}

                {/* Loading State for suggestions */}
                {isLoadingSuggestions && (
                    <SuggestionSkeleton />
                )}

                {/* Products Grid */}
                {!isLoading && !isLoadingSuggestions && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {productsToDisplay.map(product => (
                            <div key={product.id} className="relative">
                                {showSuggestions && product.reason && (
                                    <div className="absolute top-2 left-2 z-10 bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded shadow">
                                        {product.reason}
                                    </div>
                                )}
                                <ProductCard
                                    product={product}
                                    isFavorite={favorites.includes(product.id)}
                                    onToggleFavorite={toggleFavorite}
                                    onViewDetail={handleViewDetail}
                                    showTags={!showSuggestions}
                                />
                            </div>
                        ))}
                    </div>
                )}

                {/* Empty State */}
                {!isLoading && !isLoadingSuggestions && productsToDisplay.length === 0 && (
                    <div className="text-center py-12">
                        <div className="text-gray-400 text-6xl mb-4">
                            {showFavorites ? '💔' : '📚'}
                        </div>
                        <h3 className="text-lg font-medium text-gray-900 mb-2">
                            {showFavorites
                                ? 'Chưa có khóa học yêu thích'
                                : 'Không tìm thấy khóa học nào'}
                        </h3>
                        <p className="text-gray-600 mb-4">
                            {showFavorites
                                ? 'Hãy thêm các khóa học yêu thích để dễ dàng theo dõi'
                                : 'Thử thay đổi từ khóa tìm kiếm hoặc bộ lọc'}
                        </p>
                        {showFavorites && (
                            <button
                                onClick={() => {
                                    setShowFavorites(false);
                                    setShowSuggestions(false);
                                }}
                                className="btn-primary"
                            >
                                Khám phá khóa học
                            </button>
                        )}
                    </div>
                )}

                {/* Suggestions Info */}
                {showSuggestions && suggestions.length > 0 && (
                    <div className="mt-8 p-4 bg-blue-50 rounded-lg">
                        <h4 className="font-medium text-blue-900 mb-2">
                            💡 Gợi ý dựa trên AI
                        </h4>
                        <p className="text-blue-700 text-sm">
                            Các khóa học này được chọn dựa trên sở thích và hành vi học tập của bạn.
                            Hãy khám phá và tìm ra khóa học phù hợp nhất!
                        </p>
                    </div>
                )}
                {suggestionError && (
                    <div className="my-8 p-4 bg-red-100 text-red-700 rounded-lg text-center font-medium">
                        {suggestionError}
                    </div>
                )}
            </main>

            {/* Floating Comments chỉ hiển thị ở trang chính */}
            {(!showFavorites && !showHistory && !showSuggestions) && (
                <FloatingComments />
            )}

            {/* Product Detail Modal */}
            {selectedProduct && (
                <ProductModal
                    product={selectedProduct}
                    isFavorite={favorites.includes(selectedProduct.id)}
                    onToggleFavorite={toggleFavorite}
                    onClose={() => setSelectedProduct(null)}
                />
            )}

            {/* Toast Notification */}
            <div className="fixed top-6 right-6 z-[9999]">
                <Toast toast={toast} onClose={closeToast} />
            </div>
        </div>
    );
};

export default ELearningPlatform; 