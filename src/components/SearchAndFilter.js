import React from 'react';
import { Search, Filter, Sparkles } from 'lucide-react';
import { priceRanges, categories } from '../data/mockData';

const SearchAndFilter = ({
    searchTerm,
    setSearchTerm,
    priceFilter,
    setPriceFilter,
    categoryFilter,
    setCategoryFilter,
    onGetSuggestions,
    isLoading
}) => {
    return (
        <div className="mb-8 space-y-4">
            {/* Search and Filters Row */}
            <div className="flex flex-col lg:flex-row gap-4">
                {/* Search Bar */}
                <div className="flex-1 relative">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Tìm kiếm khóa học, giảng viên, hoặc chủ đề..."
                        className="input-field pl-10"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>

                {/* Price Filter */}
                <div className="flex items-center gap-2">
                    <Filter className="h-4 w-4 text-gray-400" />
                    <select
                        value={priceFilter}
                        onChange={(e) => setPriceFilter(e.target.value)}
                        className="input-field min-w-[150px]"
                    >
                        {priceRanges.map(range => (
                            <option key={range.value} value={range.value}>
                                {range.label}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Category Filter */}
                <div className="flex items-center gap-2">
                    <Filter className="h-4 w-4 text-gray-400" />
                    <select
                        value={categoryFilter}
                        onChange={(e) => setCategoryFilter(e.target.value)}
                        className="input-field min-w-[150px]"
                    >
                        {categories.map(category => (
                            <option key={category} value={category}>
                                {category}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            {/* AI Suggestions Button */}
            <div className="flex justify-center">
                <button
                    onClick={onGetSuggestions}
                    disabled={isLoading}
                    className="inline-flex items-center px-6 py-3 bg-gradient-primary text-white rounded-lg font-medium hover:from-blue-700 hover:to-purple-700 transition-all duration-200 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                >
                    <Sparkles className="h-5 w-5 mr-2" />
                    {isLoading ? 'Đang tìm kiếm...' : 'Gợi ý khóa học phù hợp'}
                </button>
            </div>

            {/* Quick Filters */}
            <div className="flex flex-wrap gap-2 justify-center">
                <button
                    onClick={() => setPriceFilter('under500k')}
                    className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${priceFilter === 'under500k'
                        ? 'bg-blue-100 text-blue-700'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                >
                    Dưới 500K
                </button>
                <button
                    onClick={() => setPriceFilter('500k-1m')}
                    className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${priceFilter === '500k-1m'
                        ? 'bg-blue-100 text-blue-700'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                >
                    500K - 1M
                </button>
                <button
                    onClick={() => setCategoryFilter('Programming')}
                    className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${categoryFilter === 'Programming'
                        ? 'bg-blue-100 text-blue-700'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                >
                    Lập trình
                </button>
                <button
                    onClick={() => setCategoryFilter('Design')}
                    className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${categoryFilter === 'Design'
                        ? 'bg-blue-100 text-blue-700'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                >
                    Thiết kế
                </button>
                <button
                    onClick={() => {
                        setPriceFilter('all');
                        setCategoryFilter('All');
                        setSearchTerm('');
                    }}
                    className="px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors"
                >
                    Xóa bộ lọc
                </button>
            </div>
        </div>
    );
};

export default SearchAndFilter; 