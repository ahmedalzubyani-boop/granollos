import { useState } from 'react';
import { Check, Plus } from 'lucide-react';
import { type Product, type ProductOption } from '../data/products';
import { ProductIllustration } from './ProductIllustration';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product, option: ProductOption) => void;
}

export function ProductCard({ product, onAddToCart }: ProductCardProps) {
  const [selectedOptionId, setSelectedOptionId] = useState<string>(product.options[0].id);
  const [justAdded, setJustAdded] = useState(false);
  const [imgError, setImgError] = useState(false);

  const selectedOption =
    product.options.find((opt) => opt.id === selectedOptionId) ?? product.options[0];

  const handleAdd = () => {
    onAddToCart(product, selectedOption);
    setJustAdded(true);
    window.setTimeout(() => setJustAdded(false), 1200);
  };

  return (
    <article className="group bg-white rounded-2xl border border-[#E6DACB] overflow-hidden flex flex-col transition-transform duration-200 hover:-translate-y-0.5 hover:shadow-md">
      <div className="aspect-[4/3] w-full relative overflow-hidden border-b border-[#EFE6DA] bg-[#F4EDE1]">
        {product.imageUrl && !imgError ? (
          <img
            src={product.imageUrl}
            alt={product.imageAlt ?? product.name}
            referrerPolicy="no-referrer"
            onError={() => setImgError(true)}
            className={`w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.03] ${
              product.imagePosition ?? 'object-center'
            }`}
          />
        ) : (
          <ProductIllustration variant={product.illustration} />
        )}
      </div>

      <div className="p-5 flex-1 flex flex-col justify-between gap-4">
        <div>
          <div className="flex items-center justify-between gap-2 text-xs text-[#7D5640]">
            <span>{product.categoryLabel}</span>
            {product.featuredTag && (
              <span className="font-semibold text-[#B4536D]">{product.featuredTag}</span>
            )}
          </div>

          <h3 className="text-lg font-bold text-[#4A2511] mt-1.5 leading-snug">
            {product.name}
          </h3>
          <p className="text-sm font-medium text-[#6B3A1F] mt-0.5">{product.subtitle}</p>
          <p className="text-xs text-[#7D5640] mt-2 leading-relaxed">{product.description}</p>
        </div>

        <div className="pt-3 border-t border-[#F2EAE0] space-y-3">
          {product.options.length > 1 ? (
            <div className="flex items-center gap-2" role="group" aria-label={`اختر الوزن لـ ${product.name}`}>
              {product.options.map((option) => {
                const isSelected = option.id === selectedOption.id;
                return (
                  <button
                    key={option.id}
                    type="button"
                    onClick={() => setSelectedOptionId(option.id)}
                    className={`flex-1 py-2 px-3 rounded-lg text-xs font-semibold tabular-nums transition-colors cursor-pointer whitespace-nowrap ${
                      isSelected
                        ? 'bg-[#F6DCE2] text-[#4A2511] border border-[#D97E96]'
                        : 'bg-[#FAF6F0] text-[#7D5640] border border-[#E6DACB] hover:text-[#4A2511]'
                    }`}
                  >
                    {option.label} — {option.price} ر.س
                  </button>
                );
              })}
            </div>
          ) : (
            <p className="text-xs text-[#7D5640]">{product.ingredientsNote}</p>
          )}

          <div className="flex items-center justify-between gap-3">
            <div className="tabular-nums">
              <span className="text-lg font-bold text-[#4A2511]">{selectedOption.price} ر.س</span>
              <span className="text-xs text-[#7D5640] ms-1.5">/ {selectedOption.label}</span>
            </div>

            <button
              type="button"
              onClick={handleAdd}
              className={`min-h-[42px] px-4 py-2 rounded-xl text-sm font-bold inline-flex items-center justify-center gap-1.5 transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                justAdded
                  ? 'bg-[#5A6738] text-white'
                  : 'bg-[#6B3A1F] text-white hover:bg-[#572E17]'
              }`}
            >
              {justAdded ? (
                <>
                  <Check className="w-4 h-4" />
                  <span>تمت الإضافة</span>
                </>
              ) : (
                <>
                  <Plus className="w-4 h-4" />
                  <span>أضف للسلة</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}
