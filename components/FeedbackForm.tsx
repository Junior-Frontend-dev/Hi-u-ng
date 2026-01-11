import React, { useState, useEffect, useRef, KeyboardEvent } from 'react';
import { Bug, Lightbulb, X, Send, Check, AlertCircle, Mail, Clock } from 'lucide-react';

interface FeedbackFormProps {
  isOpen: boolean;
  onClose: () => void;
}

type FeedbackType = 'bug' | 'idea';

interface FormData {
  type: FeedbackType;
  title: string;
  description: string;
  contact: string;
}

interface FormErrors {
  title?: string;
  description?: string;
  contact?: string;
}

const initialFormData: FormData = {
  type: 'bug',
  title: '',
  description: '',
  contact: '',
};

const MAX_TITLE_LENGTH = 150;
const MAX_DESCRIPTION_LENGTH = 2000;

export const FeedbackForm: React.FC<FeedbackFormProps> = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const [charCount, setCharCount] = useState({ title: 0, description: 0 });
  const [isClosing, setIsClosing] = useState(false);
  const titleInputRef = useRef<HTMLInputElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      const timer = setTimeout(() => {
        titleInputRef.current?.focus();
      }, 100);
      return () => {
        document.body.style.overflow = '';
        clearTimeout(timer);
      };
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && !submitting && !success) {
        handleClose();
      }
    };
    document.addEventListener('keydown', handleKeyDown as unknown as EventListener);
    return () => document.removeEventListener('keydown', handleKeyDown as unknown as EventListener);
  }, [submitting, success]);

  const handleClose = () => {
    setIsClosing(true);
    const timer = setTimeout(() => {
      setIsClosing(false);
      setSuccess(false);
      setError('');
      setErrors({});
      setFormData(initialFormData);
      setCharCount({ title: 0, description: 0 });
      onClose();
    }, 200);
    return () => clearTimeout(timer);
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = 'Vui lòng nhập tiêu đề';
    } else if (formData.title.length > MAX_TITLE_LENGTH) {
      newErrors.title = `Tiêu đề quá dài (tối đa ${MAX_TITLE_LENGTH} ký tự)`;
    }

    if (!formData.description.trim()) {
      newErrors.description = 'Vui lòng nhập chi tiết';
    } else if (formData.description.length > MAX_DESCRIPTION_LENGTH) {
      newErrors.description = `Mô tả quá dài (tối đa ${MAX_DESCRIPTION_LENGTH} ký tự)`;
    }

    if (formData.contact && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.contact)) {
      newErrors.contact = 'Email không hợp lệ';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      formRef.current?.querySelector<HTMLInputElement>('input, textarea')?.focus();
      return;
    }

    setSubmitting(true);
    setError('');

    try {
      const API_URL = (import.meta.env?.VITE_API_URL || '').replace(/\/api$/, '') || 'http://localhost:3001';
      const res = await fetch(`${API_URL}/api/feedback`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: formData.type,
          title: formData.title.trim(),
          description: formData.description.trim(),
          contact: formData.contact.trim() || undefined,
        }),
      });

      if (res.ok) {
        setSuccess(true);
        setTimeout(() => {
          handleClose();
        }, 2000);
      } else {
        const data = await res.json();
        setError(data.error || 'Gửi thất bại. Vui lòng thử lại.');
      }
    } catch {
      setError('Lỗi kết nối. Hãy chắc chắn server đang chạy.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleInputChange = (
    field: keyof FormData,
    value: string,
    maxLength?: number
  ) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    if (maxLength) {
      setCharCount(prev => ({
        ...prev,
        [field]: value.length,
      }));
    }

    if (errors[field as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  };

  if (!isOpen && !isClosing) return null;

  const getTypeColor = (type: FeedbackType) => {
    switch (type) {
      case 'bug':
        return {
          bg: 'bg-red-500/20',
          border: 'border-red-500/50',
          text: 'text-red-400',
          hoverBg: 'hover:bg-red-500/30',
        };
      case 'idea':
        return {
          bg: 'bg-yellow-500/20',
          border: 'border-yellow-500/50',
          text: 'text-yellow-400',
          hoverBg: 'hover:bg-yellow-500/30',
        };
    }
  };

  return (
    <div 
      className={`fixed inset-0 z-50 flex items-center justify-center p-4 transition-opacity duration-200 ${
        isClosing ? 'opacity-0' : 'opacity-100'
      }`}
      onClick={handleBackdropClick}
    >
      <div 
        className={`absolute inset-0 bg-black/70 backdrop-blur-sm transition-opacity duration-200 ${
          isClosing ? 'opacity-0' : 'opacity-100'
        }`}
      />
      
      <div 
        className={`relative w-full max-w-lg bg-[#0A0A0A] border border-white/10 rounded-2xl shadow-2xl overflow-hidden transform transition-all duration-200 ${
          isClosing ? 'scale-95 opacity-0' : 'scale-100 opacity-100'
        }`}
      >
        <button 
          onClick={handleClose}
          disabled={submitting}
          className="absolute top-4 right-4 p-2 text-gray-500 hover:text-white transition-colors disabled:opacity-50 rounded-lg hover:bg-white/10"
        >
          <X size={20} />
        </button>

        <div className="p-6 border-b border-white/5">
          <h2 className="text-xl font-bold text-white">Gửi Phản Hồi</h2>
          <p className="text-sm text-gray-500 mt-1">Báo lỗi hoặc đề xuất ý tưởng mới</p>
        </div>

        {success ? (
          <div className="p-12 flex flex-col items-center justify-center">
            <div className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center mb-4 animate-in zoom-in duration-300">
              <Check size={32} className="text-green-500" />
            </div>
            <h3 className="text-lg font-bold text-white animate-in fade-in duration-300">Gửi thành công!</h3>
            <p className="text-sm text-gray-500 mt-2 animate-in fade-in duration-300 delay-100">Cảm ơn bạn đã đóng góp ý kiến</p>
          </div>
        ) : (
          <form ref={formRef} onSubmit={handleSubmit} className="p-6 space-y-4">
            <div className="flex gap-2">
              {(['bug', 'idea'] as FeedbackType[]).map((type) => {
                const color = getTypeColor(type);
                const isSelected = formData.type === type;
                
                return (
                  <button
                    key={type}
                    type="button"
                    onClick={() => handleInputChange('type', type)}
                    className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl border transition-all ${
                      isSelected 
                        ? `${color.bg} ${color.border} ${color.text}` 
                        : 'bg-white/5 border-white/10 text-gray-500 hover:bg-white/10'
                    }`}
                  >
                    {type === 'bug' ? <Bug size={18} /> : <Lightbulb size={18} />}
                    <span className="font-medium">
                      {type === 'bug' ? 'Báo lỗi' : 'Đề xuất'}
                    </span>
                  </button>
                );
              })}
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-sm font-medium text-gray-400">
                  Tiêu đề <span className="text-red-500">*</span>
                </label>
                <span className={`text-xs ${charCount.title > MAX_TITLE_LENGTH * 0.9 ? 'text-red-400' : 'text-gray-600'}`}>
                  {charCount.title}/{MAX_TITLE_LENGTH}
                </span>
              </div>
              <input
                ref={titleInputRef}
                type="text"
                value={formData.title}
                onChange={(e) => handleInputChange('title', e.target.value, MAX_TITLE_LENGTH)}
                placeholder={formData.type === 'bug' ? 'Mô tả ngắn gọn lỗi...' : 'Mô tả ý tưởng của bạn...'}
                maxLength={MAX_TITLE_LENGTH}
                disabled={submitting}
                className={`w-full bg-white/5 border rounded-xl px-4 py-3 text-white placeholder:text-gray-600 focus:outline-none focus:border-white/30 focus:bg-white/10 transition-all ${
                  errors.title ? 'border-red-500/50 focus:border-red-500/50' : 'border-white/10'
                }`}
              />
              {errors.title && (
                <p className="mt-1 text-sm text-red-400 flex items-center gap-1">
                  <AlertCircle size={12} />
                  {errors.title}
                </p>
              )}
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-sm font-medium text-gray-400">
                  Chi tiết <span className="text-red-500">*</span>
                </label>
                <span className={`text-xs ${charCount.description > MAX_DESCRIPTION_LENGTH * 0.9 ? 'text-red-400' : 'text-gray-600'}`}>
                  {charCount.description}/{MAX_DESCRIPTION_LENGTH}
                </span>
              </div>
              <textarea
                value={formData.description}
                onChange={(e) => handleInputChange('description', e.target.value, MAX_DESCRIPTION_LENGTH)}
                placeholder={
                  formData.type === 'bug' 
                    ? 'Mô tả chi tiết lỗi, các bước để tái hiện lỗi...' 
                    : 'Giải thích chi tiết ý tưởng của bạn...'
                }
                maxLength={MAX_DESCRIPTION_LENGTH}
                rows={4}
                disabled={submitting}
                className={`w-full bg-white/5 border rounded-xl px-4 py-3 text-white placeholder:text-gray-600 focus:outline-none focus:border-white/30 focus:bg-white/10 transition-all resize-none ${
                  errors.description ? 'border-red-500/50 focus:border-red-500/50' : 'border-white/10'
                }`}
              />
              {errors.description && (
                <p className="mt-1 text-sm text-red-400 flex items-center gap-1">
                  <AlertCircle size={12} />
                  {errors.description}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">
                <span className="flex items-center gap-1">
                  <Mail size={14} />
                  Email (tùy chọn)
                </span>
              </label>
              <input
                type="email"
                value={formData.contact}
                onChange={(e) => handleInputChange('contact', e.target.value)}
                placeholder="Để lại email để liên lạc khi cần..."
                disabled={submitting}
                className={`w-full bg-white/5 border rounded-xl px-4 py-3 text-white placeholder:text-gray-600 focus:outline-none focus:border-white/30 focus:bg-white/10 transition-all ${
                  errors.contact ? 'border-red-500/50 focus:border-red-500/50' : 'border-white/10'
                }`}
              />
              {errors.contact && (
                <p className="mt-1 text-sm text-red-400 flex items-center gap-1">
                  <AlertCircle size={12} />
                  {errors.contact}
                </p>
              )}
            </div>

            {error && (
              <div className="p-3 bg-red-500/20 border border-red-500/30 rounded-xl text-sm text-red-400 flex items-start gap-2">
                <AlertCircle size={16} className="mt-0.5 flex-shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <div className="flex gap-3 pt-2">
              <button
                type="button"
                onClick={handleClose}
                disabled={submitting}
                className="flex-1 py-3 bg-white/5 text-gray-400 font-medium rounded-xl hover:bg-white/10 hover:text-white transition-colors disabled:opacity-50"
              >
                Hủy
              </button>
              <button
                type="submit"
                disabled={submitting}
                className="flex-[2] py-3 bg-white text-black font-bold rounded-xl hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {submitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                    <span>Đang gửi...</span>
                  </>
                ) : (
                  <>
                    <Send size={18} />
                    <span>Gửi phản hồi</span>
                  </>
                )}
              </button>
            </div>

            <p className="text-center text-xs text-gray-600 flex items-center justify-center gap-1">
              <Clock size={12} />
              Nhấn ESC để đóng
            </p>
          </form>
        )}
      </div>
    </div>
  );
};
