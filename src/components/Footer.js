import React from 'react';
import Pet1NBG from '../assets/icons/Pet1_NBG.png';

const Footer = () => (
    <footer className="bg-white border-t mt-12 py-8 px-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
                <img src={Pet1NBG} alt="EduAI Mascot" className="h-8 w-8 object-contain" />
                <span className="text-xl font-bold text-gradient">EduAI</span>
                <span className="ml-2 text-xs bg-gradient-primary text-white px-2 py-1 rounded-full">AI Powered</span>
            </div>
            <div className="flex flex-wrap gap-6 text-sm text-gray-600 font-medium">
                <a href="#" className="hover:text-blue-600 transition-colors">Trang chủ</a>
                <a href="#" className="hover:text-blue-600 transition-colors">Yêu thích</a>
                <a href="#" className="hover:text-blue-600 transition-colors">Lịch sử xem</a>
                <a href="#" className="hover:text-blue-600 transition-colors">Giỏ hàng</a>
            </div>
            <div className="text-xs text-gray-400 text-center md:text-right">
                <div>Nền tảng giáo dục AI - Học tập thông minh, tương lai rộng mở</div>
                <div className="mt-1">&copy; {new Date().getFullYear()} EduAI. All rights reserved.</div>
            </div>
        </div>
    </footer>
);

export default Footer; 