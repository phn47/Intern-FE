import React from 'react';
import { Heart, Star, ShoppingCart } from 'lucide-react';
import { formatPrice, generateStarRating } from '../utils/helpers';
import TagList from './TagList';

const ProductCard = ({
    product,
    isFavorite,
    onToggleFavorite,
    onViewDetail,
    showTags = true
}) => {
    const { fullStars, hasHalfStar, emptyStars } = generateStarRating(product.rating || 0);

    return (
        <div className="card group">
            {/* Product Image */}
            <div className="relative overflow-hidden">
                <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                />

                {/* Favorite Button */}
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        onToggleFavorite(product.id);
                    }}
                    className="absolute top-3 right-3 p-2 bg-white rounded-full shadow-md hover:shadow-lg transition-all duration-200 hover:scale-110"
                >
                    <Heart
                        className={`h-5 w-5 ${isFavorite
                            ? 'text-red-500 fill-red-500'
                            : 'text-gray-400 hover:text-red-500'
                            }`}
                    />
                </button>

                {/* Category Badge */}
                <div className="absolute top-3 left-3">
                    <span className="bg-blue-600 text-white text-xs px-2 py-1 rounded-full">
                        {product.category}
                    </span>
                </div>

                {/* Level Badge */}
                <div className="absolute bottom-3 left-3">
                    <span className="bg-green-600 text-white text-xs px-2 py-1 rounded-full">
                        {product.level}
                    </span>
                </div>
            </div>

            {/* Product Info */}
            <div className="p-6">
                {/* Title */}
                <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
                    {product.name}
                </h3>

                {/* Description */}
                <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                    {product.shortDescription}
                </p>

                {/* Rating */}
                <div className="flex items-center gap-2 mb-3">
                    <div className="flex items-center">
                        {[...Array(fullStars)].map((_, i) => (
                            <Star key={i} className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                        ))}
                        {hasHalfStar && (
                            <div className="relative">
                                <Star className="h-4 w-4 text-gray-300" />
                                <Star className="h-4 w-4 text-yellow-400 fill-yellow-400 absolute inset-0 clip-path-half" />
                            </div>
                        )}
                        {[...Array(emptyStars)].map((_, i) => (
                            <Star key={i} className="h-4 w-4 text-gray-300" />
                        ))}
                        <span className="text-sm text-gray-600 ml-1">
                            {product.rating} ({product.reviews} đánh giá)
                        </span>
                    </div>
                </div>

                {/* Instructor and Duration */}
                <div className="flex items-center justify-between text-sm text-gray-500 mb-3">
                    <span>Giảng viên: {product.instructor}</span>
                    <span>{product.duration}</span>
                </div>

                {/* Students Count */}
                <div className="text-sm text-gray-500 mb-3">
                    {product.students.toLocaleString()} học viên đã đăng ký
                </div>

                {/* Tags */}
                {showTags && product.tags && (
                    <TagList tags={product.tags} max={3} />
                )}

                {/* Price and Actions */}
                <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-blue-600">
                        {formatPrice(product.price)}
                    </span>
                    <div className="flex gap-2">
                        <button
                            onClick={() => onViewDetail(product)}
                            className="btn-primary text-sm"
                        >
                            Xem chi tiết
                        </button>
                        <button className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                            <ShoppingCart className="h-4 w-4 text-gray-600" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductCard; 