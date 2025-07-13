import React, { useState, useRef, useEffect } from 'react';
import { Send, User, X } from 'lucide-react';
import { mockProducts } from '../data/mockData';
import ProductModal from './ProductModal';
import Toast from './Toast';

// Mapping từ khóa đồng nghĩa Anh-Việt cho các chủ đề phổ biến
const KEYWORD_MAP = [
    { vi: ['thiết kế', 'ui', 'ux', 'giao diện'], en: ['design', 'ui', 'ux', 'interface'] },
    { vi: ['lập trình', 'code', 'lập trình viên', 'dev'], en: ['programming', 'developer', 'coding', 'code'] },
    { vi: ['python'], en: ['python'] },
    { vi: ['data', 'dữ liệu', 'khoa học dữ liệu'], en: ['data', 'data science', 'analytics'] },
    { vi: ['marketing'], en: ['marketing'] },
    { vi: ['tiếng anh', 'english', 'giao tiếp'], en: ['english', 'communication', 'speaking'] },
    { vi: ['node', 'nodejs', 'express'], en: ['node', 'nodejs', 'express'] },
    { vi: ['machine learning', 'ai', 'trí tuệ nhân tạo'], en: ['machine learning', 'ai', 'artificial intelligence'] },
    { vi: ['vue'], en: ['vue', 'vuejs'] },
];

function extractKeywords(input) {
    const text = input.toLowerCase();
    let keywords = [];
    for (const map of KEYWORD_MAP) {
        for (const word of [...map.vi, ...map.en]) {
            if (text.includes(word)) {
                keywords.push(word);
            }
        }
    }
    if (keywords.length === 0) {
        keywords = text.split(/\W+/).filter(w => w.length > 3);
    }
    return Array.from(new Set(keywords));
}

const getAIMockReply = (input) => {
    const keywords = extractKeywords(input);
    if (keywords.length === 0) return { text: 'Bạn hãy nhập từ khóa về khóa học bạn muốn học nhé!', products: [] };
    const found = mockProducts.filter(p =>
        keywords.some(kw =>
            p.name.toLowerCase().includes(kw) ||
            p.shortDescription.toLowerCase().includes(kw) ||
            p.longDescription.toLowerCase().includes(kw) ||
            (p.tags && p.tags.some(tag => tag.toLowerCase().includes(kw)))
        )
    );
    if (found.length === 0) {
        return { text: 'Xin lỗi, tôi chưa tìm thấy khóa học phù hợp với yêu cầu của bạn. Bạn hãy thử từ khóa khác nhé!', products: [] };
    }
    return {
        text: `Tôi gợi ý cho bạn ${found.length} khóa học phù hợp:`,
        products: found.slice(0, 3)
    };
};

function getFavorites() {
    try {
        return JSON.parse(localStorage.getItem('favorites') || '[]');
    } catch {
        return [];
    }
}
function setFavorites(favs) {
    localStorage.setItem('favorites', JSON.stringify(favs));
    window.dispatchEvent(new Event('favoritesUpdated'));
}

const AIChatbot = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        { from: 'bot', text: 'Xin chào! Tôi là AI tư vấn khóa học. Bạn muốn học gì hôm nay?' }
    ]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [favorites, setFavoritesState] = useState(getFavorites());
    const [toast, setToast] = useState({ show: false, message: '', type: '' });
    const chatRef = useRef(null);

    useEffect(() => {
        if (chatRef.current) {
            chatRef.current.scrollTop = chatRef.current.scrollHeight;
        }
    }, [messages, isOpen]);

    useEffect(() => {
        const syncFavorites = () => setFavoritesState(getFavorites());
        window.addEventListener('favoritesUpdated', syncFavorites);
        return () => window.removeEventListener('favoritesUpdated', syncFavorites);
    }, []);

    const handleSend = async () => {
        if (!input.trim()) return;
        setMessages(msgs => [...msgs, { from: 'user', text: input }]);
        setIsLoading(true);
        setTimeout(() => {
            const reply = getAIMockReply(input);
            setMessages(msgs => [...msgs, { from: 'bot', text: reply.text, products: reply.products }]);
            setIsLoading(false);
        }, 900);
        setInput('');
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') handleSend();
    };

    const handleToggleFavorite = (productId) => {
        const isFav = favorites.includes(productId);
        const newFavs = isFav ? favorites.filter(id => id !== productId) : [...favorites, productId];
        setFavorites(newFavs);
        setFavoritesState(newFavs);
        // Hiển thị toast rõ ràng khi thả tim
        setToast({
            show: true,
            message: isFav
                ? `Đã xóa khỏi danh sách yêu thích`
                : `Đã thêm vào danh sách yêu thích`,
            type: isFav ? 'info' : 'success',
        });
    };
    const closeToast = () => setToast({ show: false, message: '', type: '' });

    if (!isOpen) {
        return (
            <button
                className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full shadow-lg flex items-center justify-center hover:scale-110 transition-transform"
                onClick={() => setIsOpen(true)}
                aria-label="Mở AI Chatbot"
            >
                <img src={require('../assets/icons/Pet1_NBG.png')} alt="Chatbot" className="h-7 w-7 object-contain" />
            </button>
        );
    }

    return (
        <>
            {/* Toast cho chatbot */}
            <div className="fixed top-6 right-6 z-[9999]">
                <Toast toast={toast} onClose={closeToast} />
            </div>
            {/* Chatbot UI */}
            <div className="fixed bottom-6 right-6 z-50 w-80 max-w-full">
                <div className="bg-white rounded-xl shadow-lg border border-gray-200 flex flex-col h-[480px]">
                    <div className="flex items-center gap-2 px-4 py-3 border-b bg-gradient-to-r from-blue-600 to-purple-600 rounded-t-xl relative">
                        <img src={require('../assets/icons/Pet1_NBG.png')} alt="Chatbot" className="h-5 w-5 object-contain" />
                        <span className="text-white font-semibold">AI Tư vấn khóa học</span>
                        <button
                            className="absolute right-2 top-2 p-1 rounded-full hover:bg-white/20 transition-colors"
                            onClick={() => setIsOpen(false)}
                            aria-label="Đóng chat"
                        >
                            <X className="h-5 w-5 text-white" />
                        </button>
                    </div>
                    <div ref={chatRef} className="flex-1 overflow-y-auto px-4 py-3 space-y-3 bg-gray-50">
                        {messages.map((msg, idx) => (
                            <div key={idx} className={`flex ${msg.from === 'user' ? 'justify-end' : 'justify-start'}`}>
                                <div className={`max-w-[80%] px-3 py-2 rounded-lg text-sm shadow ${msg.from === 'user' ? 'bg-blue-600 text-white' : 'bg-white text-gray-900 border'}`}>
                                    <div className="flex items-center gap-1">
                                        {msg.from === 'user' ? <User className="h-4 w-4 mr-1" /> : <img src={require('../assets/icons/Pet1_NBG.png')} alt="Chatbot" className="h-4 w-4 mr-1 object-contain" />}
                                        <span>{msg.text.replace(/sản phẩm|product|khóa học/gi, 'khóa học')}</span>
                                    </div>
                                    {msg.products && msg.products.length > 0 && (
                                        <div className="mt-2 space-y-2">
                                            {msg.products.map(p => (
                                                <button
                                                    key={p.id}
                                                    className="w-full text-left p-2 bg-blue-50 rounded border border-blue-100 hover:bg-blue-100 transition-colors"
                                                    onClick={() => setSelectedProduct(p)}
                                                >
                                                    <div className="font-medium text-blue-700 text-sm">{p.name}</div>
                                                    <div className="text-xs text-gray-600 line-clamp-2">{p.shortDescription}</div>
                                                </button>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                        {isLoading && (
                            <div className="flex justify-start">
                                <div className="px-3 py-2 rounded-lg bg-white border text-gray-500 text-sm animate-pulse">
                                    AI đang trả lời...
                                </div>
                            </div>
                        )}
                    </div>
                    <div className="flex items-center gap-2 px-4 py-3 border-t bg-white rounded-b-xl">
                        <input
                            type="text"
                            className="flex-1 border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Bạn muốn học gì?"
                            value={input}
                            onChange={e => setInput(e.target.value)}
                            onKeyDown={handleKeyDown}
                            disabled={isLoading}
                        />
                        <button
                            onClick={handleSend}
                            className="p-2 bg-blue-600 rounded-lg text-white hover:bg-blue-700 transition-colors disabled:opacity-50"
                            disabled={isLoading || !input.trim()}
                        >
                            <Send className="h-5 w-5" />
                        </button>
                    </div>
                </div>
            </div>
            <ProductModal
                product={selectedProduct}
                isFavorite={selectedProduct ? favorites.includes(selectedProduct.id) : false}
                onToggleFavorite={handleToggleFavorite}
                onClose={() => setSelectedProduct(null)}
            />
        </>
    );
};

export default AIChatbot; 