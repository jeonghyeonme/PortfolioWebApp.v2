import { useEffect } from 'react';
import type { ToastMessage } from '../contexts/ToastContext';

interface ToastProps {
  toast: ToastMessage;
  onClose: () => void;
}

const Toast = ({ toast, onClose }: ToastProps) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000); // Auto-dismiss after 3 seconds

    return () => {
      clearTimeout(timer);
    };
  }, [onClose]);

  const bgColor = {
    info: 'bg-blue-500',
    success: 'bg-green-500',
    warning: 'bg-yellow-500',
    error: 'bg-red-500',
  }[toast.type];

  // A simple icon can be added based on type
  const icon = {
    info: 'ℹ️',
    success: '✅',
    warning: '⚠️',
    error: '❌',
  }[toast.type];

  return (
    <div 
      className={`flex items-center p-4 rounded-lg shadow-xl text-white ${bgColor} animate-fade-in-right`}
      onClick={onClose}
      style={{ cursor: 'pointer' }}
    >
      <span className="mr-3 text-2xl">{icon}</span>
      <div className="flex-1 font-medium">{toast.message}</div>
    </div>
  );
};

export default Toast;
