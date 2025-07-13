import React, { useEffect } from 'react';
import { CheckCircle, Info, XCircle, X } from 'lucide-react';

const Toast = ({ toast, onClose }) => {
    useEffect(() => {
        if (toast.show) {
            const timer = setTimeout(() => {
                onClose();
            }, 3000);

            return () => clearTimeout(timer);
        }
    }, [toast.show, onClose]);

    if (!toast.show) return null;

    const getIcon = () => {
        switch (toast.type) {
            case 'success':
                return <CheckCircle className="h-5 w-5" />;
            case 'info':
                return <Info className="h-5 w-5" />;
            case 'error':
                return <XCircle className="h-5 w-5" />;
            default:
                return <Info className="h-5 w-5" />;
        }
    };

    const getToastClasses = () => {
        const baseClasses = "toast flex items-center gap-3 transform transition-all duration-300";

        switch (toast.type) {
            case 'success':
                return `${baseClasses} toast-success`;
            case 'info':
                return `${baseClasses} toast-info`;
            case 'error':
                return `${baseClasses} toast-error`;
            default:
                return `${baseClasses} toast-info`;
        }
    };

    return (
        <div className={getToastClasses()}>
            {getIcon()}
            <p className="text-sm font-medium flex-1">{toast.message}</p>
            <button
                onClick={onClose}
                className="p-1 hover:bg-white hover:bg-opacity-20 rounded-full transition-colors"
            >
                <X className="h-4 w-4" />
            </button>
        </div>
    );
};

export default Toast; 