import React, { useState } from 'react';
import { Heart, History, User as UserIcon, ChevronDown } from 'lucide-react';
import Pet1NBG from '../assets/icons/Pet1_NBG.png';

// Component hóa linh vật
const MascotIcon = ({ className = '' }) => (
    <img
        src={Pet1NBG}
        alt="EduAI Mascot"
        className={`h-8 w-8 mr-2 object-contain drop-shadow ${className}`}
        style={{ marginRight: 12, marginLeft: -4 }}
    />
);

// User menu dropdown
const UserMenu = ({
    onShowFavorites,
    onShowHistory,
    favoritesCount
}) => {
    const [open, setOpen] = useState(false);
    return (
        <div className="relative">
            <button
                className="w-8 h-8 bg-gradient-primary rounded-full flex items-center justify-center text-white text-sm font-medium focus:outline-none"
                onClick={() => setOpen(v => !v)}
                aria-label="User menu"
            >
                <span className="font-medium text-base">U</span>
            </button>
            {open && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border z-50 py-2">
                    <button
                        className="flex items-center w-full px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors gap-2"
                        onClick={() => { setOpen(false); onShowFavorites(); }}
                    >
                        <Heart className="h-4 w-4 text-red-500" />
                        Yêu thích
                        {favoritesCount > 0 && (
                            <span className="ml-auto bg-red-500 text-white text-xs rounded-full px-2 py-0.5 min-w-[20px] flex items-center justify-center">
                                {favoritesCount}
                            </span>
                        )}
                    </button>
                    <button
                        className="flex items-center w-full px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors gap-2"
                        onClick={() => { setOpen(false); onShowHistory(); }}
                    >
                        <History className="h-4 w-4 text-blue-500" />
                        Lịch sử xem
                    </button>
                </div>
            )}
        </div>
    );
};

const Header = ({
    showFavorites,
    setShowFavorites,
    setShowSuggestions,
    favoritesCount,
    showSuggestions,
    showHistory,
    setShowHistory
}) => {
    return (
        <header className="bg-white shadow-sm border-b sticky top-0 z-40">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <div className="flex items-center">
                        <MascotIcon />
                        <h1 className="text-2xl font-bold text-gradient">
                            EduAI
                        </h1>
                        <span className="ml-2 text-xs bg-gradient-primary text-white px-2 py-1 rounded-full">
                            AI Powered
                        </span>
                    </div>

                    {/* Navigation */}
                    <nav className="flex space-x-8">
                        <button
                            onClick={() => {
                                setShowFavorites(false);
                                setShowSuggestions(false);
                                setShowHistory(false);
                            }}
                            className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${!showFavorites && !showSuggestions && !showHistory
                                ? 'text-blue-600 bg-blue-50'
                                : 'text-gray-700 hover:text-blue-600'
                                }`}
                        >
                            Trang chủ
                        </button>
                    </nav>

                    {/* User Menu */}
                    <div className="flex items-center space-x-4">
                        <UserMenu
                            onShowFavorites={() => {
                                setShowFavorites(true);
                                setShowSuggestions(false);
                                setShowHistory(false);
                            }}
                            onShowHistory={() => {
                                setShowHistory(true);
                                setShowFavorites(false);
                                setShowSuggestions(false);
                            }}
                            favoritesCount={favoritesCount}
                        />
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header; 