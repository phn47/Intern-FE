import React from 'react';

// Danh sách màu cố định cho tags
const TAG_COLORS = [
    'bg-blue-100 text-blue-800',
    'bg-green-100 text-green-800',
    'bg-yellow-100 text-yellow-800',
    'bg-red-100 text-red-800',
    'bg-purple-100 text-purple-800',
    'bg-pink-100 text-pink-800',
    'bg-indigo-100 text-indigo-800',
    'bg-gray-100 text-gray-800'
];

// Hàm băm đơn giản để gán màu nhất quán cho mỗi tag
function getTagColor(tag) {
    let hash = 0;
    for (let i = 0; i < tag.length; i++) {
        hash = tag.charCodeAt(i) + ((hash << 5) - hash);
    }
    const index = Math.abs(hash) % TAG_COLORS.length;
    return TAG_COLORS[index];
}

const TagList = ({ tags, max = 3 }) => {
    if (!tags || tags.length === 0) return null;
    return (
        <div className="flex flex-wrap gap-1 mb-4">
            {tags.slice(0, max).map((tag, idx) => (
                <span
                    key={tag}
                    className={`text-xs px-2 py-1 rounded-full ${getTagColor(tag)}`}
                >
                    {tag}
                </span>
            ))}
            {tags.length > max && (
                <span className="text-xs text-gray-500">
                    +{tags.length - max} nữa
                </span>
            )}
        </div>
    );
};

export default TagList; 