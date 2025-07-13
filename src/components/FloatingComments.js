import React, { useRef } from 'react';
import { Star, Quote } from 'lucide-react';
import { mockComments } from '../data/mockData';

const ANIMATION_DURATION = 40 * 1.5; // seconds, chậm lại 1.5 lần so với gốc

const FloatingComments = () => {
    const rowRef = useRef(null);

    // Lặp nhiều lần để không có khoảng trắng khi scroll
    const repeatCount = 4;
    const comments = Array.from({ length: repeatCount }, () => [...mockComments].reverse()).flat();

    // Dừng animation đúng vị trí khi hover, tiếp tục đúng chỗ khi rời chuột
    const handlePause = () => {
        if (rowRef.current) {
            rowRef.current.style.animationPlayState = 'paused';
        }
    };
    const handleResume = () => {
        if (rowRef.current) {
            rowRef.current.style.animationPlayState = 'running';
        }
    };

    return (
        <div className="relative w-full overflow-hidden bg-gradient-to-br from-blue-50 to-purple-50 py-12">
            <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-2">
                    Học viên nói gì về chúng tôi
                </h2>
                <p className="text-gray-600">
                    Hàng nghìn học viên đã tin tưởng và đạt được thành công
                </p>
            </div>
            {/* Only Bottom Row - Right to Left */}
            <div
                className="relative overflow-hidden"
                onMouseEnter={handlePause}
                onMouseLeave={handleResume}
            >
                <div
                    ref={rowRef}
                    className="flex gap-6 min-w-fit"
                    style={{
                        animation: `scrollRight ${ANIMATION_DURATION}s linear infinite`,
                    }}
                >
                    {comments.map((comment, index) => (
                        <div
                            key={`bottom-${comment.id}-${index}`}
                            className="flex-shrink-0 w-80 bg-white rounded-xl shadow-lg border border-gray-100 p-6 hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                        >
                            <div className="flex items-start space-x-4">
                                <img
                                    src={comment.avatar}
                                    alt={comment.name}
                                    className="w-12 h-12 rounded-full object-cover border-2 border-purple-100"
                                />
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center justify-between mb-2">
                                        <h4 className="font-semibold text-gray-900 truncate">
                                            {comment.name}
                                        </h4>
                                        <Quote className="h-5 w-5 text-purple-400 flex-shrink-0" />
                                    </div>
                                    <p className="text-gray-600 text-sm mb-3 line-clamp-3">
                                        {comment.content}
                                    </p>
                                    <div className="flex items-center">
                                        <div className="flex text-yellow-400">
                                            {[...Array(5)].map((_, i) => (
                                                <Star key={i} className="h-4 w-4 fill-current" />
                                            ))}
                                        </div>
                                        <span className="text-xs text-gray-500 ml-2 truncate">
                                            {comment.course}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            {/* Gradient Overlays */}
            <div className="absolute top-0 left-0 w-32 h-full bg-gradient-to-r from-blue-50 to-transparent pointer-events-none"></div>
            <div className="absolute top-0 right-0 w-32 h-full bg-gradient-to-l from-purple-50 to-transparent pointer-events-none"></div>
        </div>
    );
};

export default FloatingComments; 