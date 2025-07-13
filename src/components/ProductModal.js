import React from 'react';
import { X, Heart, Star, ShoppingCart, Clock, Users, Award, Tag } from 'lucide-react';
import { formatPrice, generateStarRating } from '../utils/helpers';
import TagList from './TagList';

const ProductModal = ({ product, isFavorite, onToggleFavorite, onClose }) => {
    if (!product) return null;

    const { fullStars, hasHalfStar, emptyStars } = generateStarRating(product.rating);

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                {/* Header */}
                <div className="sticky top-0 bg-white border-b px-6 py-4 flex items-center justify-between z-10">
                    <h3 className="text-xl font-semibold text-gray-900">
                        Chi tiết khóa học
                    </h3>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                    >
                        <X className="h-5 w-5" />
                    </button>
                </div>

                {/* Content */}
                <div className="p-6">
                    {/* Product Image */}
                    <div className="relative mb-6">
                        <img
                            src={product.image}
                            alt={product.name}
                            className="w-full h-64 object-cover rounded-lg"
                        />
                        <div className="absolute top-4 left-4 flex gap-2">
                            <span className="bg-blue-600 text-white text-sm px-3 py-1 rounded-full">
                                {product.category}
                            </span>
                            <span className="bg-green-600 text-white text-sm px-3 py-1 rounded-full">
                                {product.level}
                            </span>
                        </div>
                    </div>

                    {/* Product Info */}
                    <div className="space-y-6">
                        {/* Title and Rating */}
                        <div>
                            <h4 className="text-2xl font-bold text-gray-900 mb-3">
                                {product.name}
                            </h4>
                            <div className="flex items-center gap-4">
                                <div className="flex items-center">
                                    {[...Array(fullStars)].map((_, i) => (
                                        <Star key={i} className="h-5 w-5 text-yellow-400 fill-yellow-400" />
                                    ))}
                                    {hasHalfStar && (
                                        <div className="relative">
                                            <Star className="h-5 w-5 text-gray-300" />
                                            <Star className="h-5 w-5 text-yellow-400 fill-yellow-400 absolute inset-0 clip-path-half" />
                                        </div>
                                    )}
                                    {[...Array(emptyStars)].map((_, i) => (
                                        <Star key={i} className="h-5 w-5 text-gray-300" />
                                    ))}
                                    <span className="text-lg font-medium ml-2">
                                        {product.rating}
                                    </span>
                                    <span className="text-gray-600 ml-1">
                                        ({product.reviews} đánh giá)
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Description */}
                        <div>
                            <h5 className="text-lg font-semibold text-gray-900 mb-2">
                                Mô tả khóa học
                            </h5>
                            <p className="text-gray-600 leading-relaxed">
                                {product.longDescription}
                            </p>
                        </div>

                        {/* Course Details */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                                <Users className="h-5 w-5 text-blue-600" />
                                <div>
                                    <span className="text-sm text-gray-500">Giảng viên</span>
                                    <p className="font-medium">{product.instructor}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                                <Clock className="h-5 w-5 text-green-600" />
                                <div>
                                    <span className="text-sm text-gray-500">Thời lượng</span>
                                    <p className="font-medium">{product.duration}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                                <Users className="h-5 w-5 text-purple-600" />
                                <div>
                                    <span className="text-sm text-gray-500">Học viên</span>
                                    <p className="font-medium">{product.students.toLocaleString()}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                                <Award className="h-5 w-5 text-yellow-600" />
                                <div>
                                    <span className="text-sm text-gray-500">Cấp độ</span>
                                    <p className="font-medium">{product.level}</p>
                                </div>
                            </div>
                        </div>

                        {/* Tags */}
                        {product.tags && (
                            <div>
                                <h5 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
                                    <Tag className="h-5 w-5" />
                                    Chủ đề học tập
                                </h5>
                                <TagList tags={product.tags} max={6} />
                            </div>
                        )}

                        {/* What you'll learn */}
                        <div>
                            <h5 className="text-lg font-semibold text-gray-900 mb-3">
                                Bạn sẽ học được gì?
                            </h5>
                            <ul className="space-y-2">
                                <li className="flex items-start gap-2">
                                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                                    <span className="text-gray-600">
                                        Hiểu sâu về {product.category.toLowerCase()} và các khái niệm cơ bản
                                    </span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                                    <span className="text-gray-600">
                                        Thực hành với các dự án thực tế và case study
                                    </span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                                    <span className="text-gray-600">
                                        Có được chứng chỉ hoàn thành khóa học
                                    </span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                                    <span className="text-gray-600">
                                        Hỗ trợ trọn đời và cập nhật nội dung mới
                                    </span>
                                </li>
                            </ul>
                        </div>

                        {/* Price and Actions */}
                        <div className="border-t pt-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <span className="text-3xl font-bold text-blue-600">
                                        {formatPrice(product.price)}
                                    </span>
                                    <p className="text-sm text-gray-500 mt-1">
                                        Một lần thanh toán, học trọn đời
                                    </p>
                                </div>
                                <div className="flex gap-3">
                                    <button
                                        onClick={() => onToggleFavorite(product.id)}
                                        className="p-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                                    >
                                        <Heart
                                            className={`h-5 w-5 ${isFavorite
                                                ? 'text-red-500 fill-red-500'
                                                : 'text-gray-400'
                                                }`}
                                        />
                                    </button>
                                    <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2">
                                        <ShoppingCart className="h-5 w-5" />
                                        Mua ngay
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductModal; 