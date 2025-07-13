import React from 'react';
import { formatPrice } from '../utils/helpers';
import { X } from 'lucide-react';

const CartItem = ({ product, onRemove }) => (
    <div className="flex items-center gap-4 p-4 border-b last:border-b-0">
        <img src={product.image} alt={product.name} className="w-16 h-16 object-cover rounded-lg" />
        <div className="flex-1">
            <div className="font-semibold text-gray-900">{product.name}</div>
            <div className="text-sm text-gray-500 mt-1">{formatPrice(product.price)}</div>
        </div>
        <button onClick={() => onRemove(product.id)} className="p-2 rounded-full hover:bg-gray-100 transition-colors">
            <X className="h-5 w-5 text-gray-400" />
        </button>
    </div>
);

const CartPage = ({ cart, products, onRemove, onCheckout }) => {
    const cartProducts = cart.map(id => products.find(p => p.id === id)).filter(Boolean);
    const total = cartProducts.reduce((sum, p) => sum + p.price, 0);

    return (
        <div className="max-w-2xl mx-auto py-10 px-4">
            <h2 className="text-2xl font-bold mb-6">Giỏ hàng của bạn</h2>
            {cartProducts.length === 0 ? (
                <div className="text-gray-500 text-center py-12">Chưa có khóa học nào trong giỏ hàng.</div>
            ) : (
                <>
                    <div className="bg-white rounded-xl shadow border divide-y">
                        {cartProducts.map(product => (
                            <CartItem key={product.id} product={product} onRemove={onRemove} />
                        ))}
                    </div>
                    <div className="flex justify-between items-center mt-6">
                        <div className="text-lg font-semibold">Tổng cộng:</div>
                        <div className="text-2xl font-bold text-blue-600">{formatPrice(total)}</div>
                    </div>
                    <button
                        className="btn-primary w-full mt-8"
                        onClick={onCheckout}
                        disabled={cartProducts.length === 0}
                    >
                        Thanh toán
                    </button>
                </>
            )}
        </div>
    );
};

export default CartPage; 