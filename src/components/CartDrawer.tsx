import { useState } from 'react';
import { Minus, Plus, ShoppingBag, Trash2, X } from 'lucide-react';
import { type CartItem } from '../data/products';
import { ProductIllustration } from './ProductIllustration';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (key: string, delta: number) => void;
  onRemoveItem: (key: string) => void;
  onClearCart: () => void;
  onProceedToOrder: () => void;
}

function CartThumb({ item }: { item: CartItem }) {
  const [imgError, setImgError] = useState(false);

  if (item.imageUrl && !imgError) {
    return (
      <img
        src={item.imageUrl}
        alt={item.name}
        referrerPolicy="no-referrer"
        onError={() => setImgError(true)}
        className="w-full h-full object-cover"
      />
    );
  }
  return <ProductIllustration variant={item.illustration} />;
}

export function CartDrawer({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  onProceedToOrder,
}: CartDrawerProps) {
  if (!isOpen) return null;

  const totalCount = items.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const hasQuoteItems = items.some((item) => item.price === 0);

  return (
    <div
      className="fixed inset-0 z-50 flex justify-end bg-[#2A1509]/40 backdrop-blur-[2px]"
      role="dialog"
      aria-modal="true"
      aria-label="سلة التسوق"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md bg-[#FAF6F0] h-full flex flex-col border-s border-[#E6DACB] shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-6 py-5 border-b border-[#E6DACB]">
          <div className="flex items-center gap-2.5">
            <ShoppingBag className="w-5 h-5 text-[#6B3A1F]" />
            <h2 className="text-lg font-bold text-[#4A2511]">
              سلة التسوق{' '}
              <span className="tabular-nums text-sm font-medium text-[#7D5640]">
                ({totalCount})
              </span>
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="إغلاق السلة"
            className="w-10 h-10 flex items-center justify-center rounded-lg text-[#6B3A1F] hover:bg-[#EFE6DA] transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-5 space-y-4">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center py-12">
              <div className="w-16 h-16 rounded-full bg-[#F2EAE0] flex items-center justify-center mb-4">
                <ShoppingBag className="w-7 h-7 text-[#6B3A1F]" />
              </div>
              <p className="text-base font-semibold text-[#4A2511]">السلة فارغة حالياً</p>
              <p className="text-sm text-[#7D5640] mt-1 max-w-xs leading-6">
                أضف نكهتك المفضلة من الجرانولا الطبيعية أو التمر المحشو لبدء طلبك.
              </p>
            </div>
          ) : (
            items.map((item) => (
              <div
                key={item.key}
                className="flex gap-4 bg-white p-3.5 rounded-xl border border-[#E6DACB]"
              >
                <div className="w-20 h-20 rounded-lg overflow-hidden shrink-0 border border-[#EFE6DA] bg-[#F4EDE1]">
                  <CartThumb item={item} />
                </div>
                <div className="flex-1 min-w-0 flex flex-col justify-between">
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      <h3 className="text-sm font-bold text-[#4A2511] truncate">{item.name}</h3>
                      <p className="text-xs text-[#7D5640] mt-0.5 truncate">{item.optionLabel}</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => onRemoveItem(item.key)}
                      aria-label={`حذف ${item.name}`}
                      className="p-1.5 text-[#8D6853] hover:text-[#B42318] transition-colors cursor-pointer"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="flex items-center justify-between mt-3">
                    <div className="inline-flex items-center border border-[#E6DACB] rounded-lg bg-[#FAF6F0]">
                      <button
                        type="button"
                        onClick={() => onUpdateQuantity(item.key, -1)}
                        aria-label="إنقاص الكمية"
                        className="w-8 h-8 flex items-center justify-center text-[#4A2511] hover:bg-[#EFE6DA] rounded-s-lg transition-colors cursor-pointer"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="w-8 text-center text-sm font-semibold tabular-nums text-[#4A2511]">
                        {item.quantity}
                      </span>
                      <button
                        type="button"
                        onClick={() => onUpdateQuantity(item.key, 1)}
                        aria-label="زيادة الكمية"
                        className="w-8 h-8 flex items-center justify-center text-[#4A2511] hover:bg-[#EFE6DA] rounded-e-lg transition-colors cursor-pointer"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <p className="text-sm font-bold tabular-nums text-[#4A2511]">
                      {item.price > 0 ? `${item.price * item.quantity} ر.س` : 'حسب الحجم'}
                    </p>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {items.length > 0 && (
          <div className="border-t border-[#E6DACB] bg-white px-6 py-5 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-[#7D5640]">
                {hasQuoteItems ? 'الإجمالي المبدئي' : 'الإجمالي التقديري'}
              </span>
              <span className="text-lg font-bold tabular-nums text-[#4A2511]">
                {subtotal > 0 ? `${subtotal} ر.س` : 'تسعير عبر واتساب'}
              </span>
            </div>
            {hasQuoteItems && (
              <p className="text-xs text-[#7D5640]">
                يشمل الطلب صحن مناسبات يُحدد سعره حسب الحجم المطلوب عبر واتساب.
              </p>
            )}
            <div className="flex gap-3">
              <button
                type="button"
                onClick={onProceedToOrder}
                className="flex-1 py-3 px-4 rounded-xl bg-[#6B3A1F] text-white text-sm font-bold hover:bg-[#572E17] transition-colors cursor-pointer"
              >
                إكمال بيانات الطلب
              </button>
              <button
                type="button"
                onClick={onClearCart}
                className="py-3 px-4 rounded-xl border border-[#E6DACB] text-sm font-medium text-[#6B3A1F] hover:bg-[#FAF6F0] transition-colors cursor-pointer whitespace-nowrap shrink-0"
              >
                إفراغ
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
