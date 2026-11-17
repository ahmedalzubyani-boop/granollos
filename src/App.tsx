import { useState } from 'react';
import {
  Check,
  Copy,
  ExternalLink,
  Instagram,
  MapPin,
  MessageCircle,
  Minus,
  Plus,
  ShoppingBag,
  Sparkles,
} from 'lucide-react';
import {
  BRAND_LOGO_URL,
  BUNDLE_FLAVOR_CHOICES,
  BUNDLE_PRODUCT,
  DATES_PLATTER_PRODUCT,
  DELIVERY_METHODS,
  HEALTH_BENEFITS,
  INSTAGRAM_HANDLE,
  INSTAGRAM_URL,
  LINKTREE_URL,
  PHOTO_CLASSIC_URL,
  PHOTO_DATES_URL,
  PHOTO_FLAVORS_URL,
  PHOTO_SUPER_URL,
  PRODUCTS,
  SERVING_SUGGESTIONS,
  WHATSAPP_DISPLAY,
  WHATSAPP_NUMBER,
  buildWhatsAppOrderUrl,
  type CartItem,
  type Product,
  type ProductCategory,
  type ProductOption,
} from './data/products';
import { ProductCard } from './components/ProductCard';
import { ProductIllustration } from './components/ProductIllustration';
import { CartDrawer } from './components/CartDrawer';

const CATEGORY_TABS: { id: ProductCategory; label: string }[] = [
  { id: 'all', label: 'جميع المنتجات' },
  { id: 'granola', label: 'جرانولا طبيعية' },
  { id: 'dates', label: 'تمور محشوة' },
  { id: 'bundles', label: 'باقة 129 ر.س' },
];

export default function App() {
  const [logoError, setLogoError] = useState(false);
  const [flavorsImgError, setFlavorsImgError] = useState(false);
  const [platterImgError, setPlatterImgError] = useState(false);
  const [bundleImgError, setBundleImgError] = useState(false);
  const [benefitsImgError, setBenefitsImgError] = useState(false);

  const [selectedCategory, setSelectedCategory] = useState<ProductCategory>('all');
  const [bundleFlavor, setBundleFlavor] = useState<string>(BUNDLE_FLAVOR_CHOICES[0]);
  const [bundleAdded, setBundleAdded] = useState(false);
  const [platterAdded, setPlatterAdded] = useState(false);

  const [cart, setCart] = useState<CartItem[]>([
    {
      key: 'classic-250g',
      productId: 'classic',
      name: 'جرانولا كلاسيك',
      optionLabel: '250g',
      price: 85,
      quantity: 1,
      imageUrl: PHOTO_CLASSIC_URL,
      illustration: 'classic',
    },
  ]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const [customerName, setCustomerName] = useState('');
  const [address, setAddress] = useState('');
  const [deliveryMethod, setDeliveryMethod] = useState<string>(DELIVERY_METHODS[0]);
  const [orderNotes, setOrderNotes] = useState('');
  const [copiedOrder, setCopiedOrder] = useState(false);
  const [orderPrepared, setOrderPrepared] = useState(false);

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const hasQuoteItems = cart.some((item) => item.price === 0);

  const filteredProducts =
    selectedCategory === 'all'
      ? PRODUCTS
      : selectedCategory === 'bundles'
        ? []
        : PRODUCTS.filter((p) => p.category === selectedCategory);

  const showDatesPlatter = selectedCategory === 'all' || selectedCategory === 'dates';
  const showBundleSection = selectedCategory === 'all' || selectedCategory === 'bundles';

  const handleAddToCart = (product: Product, option: ProductOption) => {
    const key = `${product.id}-${option.id}`;
    setCart((prev) => {
      const existing = prev.find((item) => item.key === key);
      if (existing) {
        return prev.map((item) =>
          item.key === key ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [
        ...prev,
        {
          key,
          productId: product.id,
          name: product.name,
          optionLabel: option.label,
          price: option.price,
          quantity: 1,
          imageUrl: product.imageUrl,
          illustration: product.illustration,
        },
      ];
    });
  };

  const handleAddPlatter = () => {
    handleAddToCart(DATES_PLATTER_PRODUCT, DATES_PLATTER_PRODUCT.options[0]);
    setPlatterAdded(true);
    window.setTimeout(() => setPlatterAdded(false), 1200);
  };

  const handleAddBundle = () => {
    const option: ProductOption = {
      id: bundleFlavor,
      label: bundleFlavor,
      price: 129,
    };
    handleAddToCart(BUNDLE_PRODUCT, option);
    setBundleAdded(true);
    window.setTimeout(() => setBundleAdded(false), 1200);
  };

  const handleUpdateQuantity = (key: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((item) =>
          item.key === key ? { ...item, quantity: item.quantity + delta } : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const handleRemoveItem = (key: string) => {
    setCart((prev) => prev.filter((item) => item.key !== key));
  };

  const handleClearCart = () => {
    setCart([]);
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const whatsappUrl = buildWhatsAppOrderUrl({
    items: cart,
    customerName,
    address,
    deliveryMethod,
    notes: orderNotes,
  });

  const handleCopyOrderSummary = async () => {
    const lines: string[] = [
      'طلب GRANOLLOS - المدينة المنورة',
      ...cart.map((item, idx) => {
        const priceLabel =
          item.price > 0 ? `${item.price * item.quantity} ر.س` : 'يُحدد حسب الحجم';
        return `${idx + 1}. ${item.name} (${item.optionLabel}) × ${item.quantity} = ${priceLabel}`;
      }),
      subtotal > 0 ? `الإجمالي: ${subtotal} ر.س` : 'الإجمالي: يُحدد حسب الحجم',
      `الاسم: ${customerName.trim() || 'غير محدد'}`,
      `العنوان: ${address.trim() || 'غير محدد'}`,
      `طريقة الاستلام: ${deliveryMethod}`,
    ];
    if (orderNotes.trim()) {
      lines.push(`ملاحظات: ${orderNotes.trim()}`);
    }
    try {
      await navigator.clipboard.writeText(lines.join('\n'));
      setCopiedOrder(true);
      window.setTimeout(() => setCopiedOrder(false), 1800);
    } catch {
      setOrderPrepared(true);
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF6F0] text-[#4A2511] pb-20 md:pb-0">
      {/* Top Bar Contract: 3 zones separated by gap-8 */}
      <header className="sticky top-0 z-30 bg-[#FAF6F0]/95 backdrop-blur-sm border-b border-[#E6DACB]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-14 md:h-16 flex items-center justify-between gap-8">
          {/* Zone 1: Single-line Brand Wordmark */}
          <a
            href="#top"
            className="font-brand text-xl sm:text-2xl font-bold tracking-tight text-[#4A2511] whitespace-nowrap shrink-0"
          >
            GRANOLL<span className="text-[#D97E96]">O</span>S
          </a>

          {/* Zone 2: 4 concise single-line navigation links */}
          <nav
            aria-label="التنقل الرئيسي"
            className="hidden md:flex items-center gap-7 text-sm font-medium text-[#6B3A1F]"
          >
            <a
              href="#flavors"
              className="hover:text-[#4A2511] hover:underline underline-offset-8 decoration-[#D97E96] decoration-2 transition-colors whitespace-nowrap shrink-0"
            >
              النكهات
            </a>
            <a
              href="#benefits"
              className="hover:text-[#4A2511] hover:underline underline-offset-8 decoration-[#D97E96] decoration-2 transition-colors whitespace-nowrap shrink-0"
            >
              الفوائد
            </a>
            <a
              href="#story"
              className="hover:text-[#4A2511] hover:underline underline-offset-8 decoration-[#D97E96] decoration-2 transition-colors whitespace-nowrap shrink-0"
            >
              قصتنا
            </a>
            <a
              href="#order"
              className="hover:text-[#4A2511] hover:underline underline-offset-8 decoration-[#D97E96] decoration-2 transition-colors whitespace-nowrap shrink-0"
            >
              اطلب الآن
            </a>
          </nav>

          {/* Zone 3: 1 Primary Action */}
          <div className="flex items-center shrink-0">
            <button
              type="button"
              onClick={() => setIsCartOpen(true)}
              className="min-h-[40px] px-4 py-2 rounded-xl bg-[#6B3A1F] text-white text-sm font-bold inline-flex items-center gap-2 hover:bg-[#572E17] transition-colors cursor-pointer whitespace-nowrap shrink-0"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>السلة</span>
              <span className="tabular-nums bg-[#E89AAE] text-[#4A2511] px-1.5 py-0.5 rounded-md text-xs font-bold leading-none">
                {totalItems}
              </span>
            </button>
          </div>
        </div>
      </header>

      <main id="top">
        {/* Hero Section */}
        <section className="max-w-6xl mx-auto px-4 sm:px-6 pt-8 pb-14 lg:py-16">
          <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            <div className="lg:col-span-7 space-y-6">
              <p className="text-xs sm:text-sm font-medium text-[#7D5640]">
                المقر الرئيسي: المدينة المنورة · طبيعي ١٠٠٪ · مصنوع بحب
              </p>

              <h1
                className="text-3xl sm:text-4xl lg:text-[2.85rem] font-bold text-[#4A2511] leading-[1.25]"
                style={{ textWrap: 'balance' }}
              >
                جرانولا طبيعية ١٠٠٪ ومكسرات وتمور محشوة فاخرة من المدينة المنورة
              </h1>

              <p className="text-base text-[#6B3A1F] leading-relaxed max-w-xl">
                نحضّر الجرانولا يومياً بمكونات نقية وشوفان كامل محمص بالعسل والمكسرات، مع
                توصيل سريع داخل المدينة المنورة وشحن لجميع مدن المملكة العربية السعودية.
              </p>

              <div className="flex flex-wrap items-center gap-3 pt-1">
                <button
                  type="button"
                  onClick={() => scrollToSection('flavors')}
                  className="min-h-[44px] px-6 py-3 rounded-xl bg-[#6B3A1F] text-white text-sm font-bold hover:bg-[#572E17] transition-colors cursor-pointer whitespace-nowrap"
                >
                  تصفح النكهات
                </button>
                <a
                  href={`https://wa.me/${WHATSAPP_NUMBER}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="min-h-[44px] px-5 py-3 rounded-xl bg-[#F6DCE2] text-[#4A2511] text-sm font-bold inline-flex items-center gap-2 hover:bg-[#F1C9D3] transition-colors whitespace-nowrap"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>واتساب مباشر</span>
                </a>
                <a
                  href={INSTAGRAM_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="min-h-[44px] px-4 py-3 text-sm font-semibold text-[#6B3A1F] hover:text-[#4A2511] inline-flex items-center gap-1.5 whitespace-nowrap"
                >
                  <Instagram className="w-4 h-4" />
                  <span>{INSTAGRAM_HANDLE}</span>
                </a>
                <a
                  href={LINKTREE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="min-h-[44px] px-3 py-3 text-sm font-semibold text-[#6B3A1F] hover:text-[#4A2511] inline-flex items-center gap-1.5 underline underline-offset-4 decoration-[#D97E96] whitespace-nowrap"
                >
                  <span>كل روابطنا</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t border-[#E6DACB]">
                <div>
                  <p className="text-sm font-bold text-[#4A2511]">توصيل داخل المدينة</p>
                  <p className="text-xs text-[#7D5640] mt-0.5">توصيل سريع أو استلام من المقر</p>
                </div>
                <div>
                  <p className="text-sm font-bold text-[#4A2511]">شحن لجميع المدن</p>
                  <p className="text-xs text-[#7D5640] mt-0.5">تغليف محكم يحافظ على القرمشة</p>
                </div>
                <div>
                  <p className="text-sm font-bold text-[#4A2511]">مكونات طبيعية ١٠٠٪</p>
                  <p className="text-xs text-[#7D5640] mt-0.5">خالية من المواد الحافظة</p>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="bg-[#F2EAE0] rounded-3xl p-6 sm:p-8 border border-[#E6DACB] flex flex-col items-center text-center">
                <div className="w-56 h-56 sm:w-64 sm:h-64 rounded-full overflow-hidden border-2 border-[#E89AAE] bg-[#F5EBE0] shadow-sm flex items-center justify-center">
                  {!logoError ? (
                    <img
                      src={BRAND_LOGO_URL}
                      alt="شعار GRANOLLOS - المدينة المنورة"
                      referrerPolicy="no-referrer"
                      onError={() => setLogoError(true)}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="p-6 text-center">
                      <p className="font-brand text-2xl font-bold text-[#6B3A1F]">GRANOLLOS</p>
                      <p className="text-xs text-[#7D5640] mt-1">المدينة المنورة</p>
                    </div>
                  )}
                </div>
                <p className="font-brand text-xl font-bold text-[#4A2511] mt-5">GRANOLLOS</p>
                <p className="text-xs text-[#7D5640] mt-1 inline-flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-[#5A6738]" />
                  <span>المدينة المنورة · المملكة العربية السعودية</span>
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 1: Flavors & Bundle Catalog */}
        <section id="flavors" className="border-t border-[#E6DACB] bg-[#F5EFE6]/60 py-14 lg:py-16">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-5 mb-8">
              <div>
                <p className="text-xs font-semibold text-[#5A6738]">تشكيلة جرانولوس الطازجة</p>
                <h2 className="text-2xl sm:text-3xl font-bold text-[#4A2511] mt-1">
                  منتجاتنا الأكثر طلباً
                </h2>
              </div>

              {/* Interactive Category Filter Controls */}
              <div
                className="flex flex-wrap items-center gap-1.5 p-1.5 bg-[#EFE6DA] rounded-xl border border-[#E6DACB]"
                role="tablist"
                aria-label="تصفية المنتجات"
              >
                {CATEGORY_TABS.map((tab) => {
                  const isActive = selectedCategory === tab.id;
                  return (
                    <button
                      key={tab.id}
                      type="button"
                      role="tab"
                      aria-selected={isActive}
                      onClick={() => setSelectedCategory(tab.id)}
                      className={`px-3.5 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                        isActive
                          ? 'bg-[#6B3A1F] text-white shadow-xs'
                          : 'text-[#6B3A1F] hover:text-[#4A2511] hover:bg-[#FAF6F0]/60'
                      }`}
                    >
                      {tab.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Real 3-Flavors Showcase Strip */}
            {(selectedCategory === 'all' || selectedCategory === 'granola') && (
              <div className="mb-8 bg-white rounded-2xl border border-[#E6DACB] overflow-hidden grid md:grid-cols-12 items-center">
                <div className="md:col-span-7 aspect-[16/10] md:aspect-auto md:h-72 bg-[#FAF6F0] overflow-hidden">
                  {!flavorsImgError ? (
                    <img
                      src={PHOTO_FLAVORS_URL}
                      alt="النكهات الثلاثة: شوكولاتة بلجيكية وهيل وشوكولاتة بيضاء وورد دمشقي"
                      referrerPolicy="no-referrer"
                      onError={() => setFlavorsImgError(true)}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <ProductIllustration variant="rose" />
                  )}
                </div>
                <div className="md:col-span-5 p-6 sm:p-7 space-y-3">
                  <p className="text-xs font-semibold text-[#B4536D]">تشكيلة النكهات الثلاثة</p>
                  <h3 className="text-xl font-bold text-[#4A2511]">
                    شوكولاتة بلجيكية · هيل وشوكولاتة بيضاء · ورد دمشقي
                  </h3>
                  <p className="text-sm text-[#6B3A1F] leading-relaxed">
                    متوفرة بعبوات <span className="font-bold tabular-nums">250g</span> بسعر{' '}
                    <span className="font-bold tabular-nums">40 ر.س</span> وعبوات{' '}
                    <span className="font-bold tabular-nums">500g</span> بسعر{' '}
                    <span className="font-bold tabular-nums">75 ر.س</span> لتناسب ذوقك اليومي.
                  </p>
                </div>
              </div>
            )}

            {filteredProducts.length > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-7">
                {filteredProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onAddToCart={handleAddToCart}
                  />
                ))}
              </div>
            )}

            {/* Events Stuffed Dates Platter */}
            {showDatesPlatter && (
              <div className="mt-8 bg-white rounded-2xl border border-[#E6DACB] overflow-hidden grid lg:grid-cols-12 items-stretch">
                <div className="lg:col-span-5 min-h-[220px] border-b lg:border-b-0 lg:border-e border-[#EFE6DA] bg-[#F4EDE1] overflow-hidden">
                  {!platterImgError ? (
                    <img
                      src={PHOTO_DATES_URL}
                      alt={DATES_PLATTER_PRODUCT.imageAlt}
                      referrerPolicy="no-referrer"
                      onError={() => setPlatterImgError(true)}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <ProductIllustration variant="dates" className="h-full min-h-[220px]" />
                  )}
                </div>

                <div className="lg:col-span-7 p-6 sm:p-8 flex flex-col justify-between gap-4">
                  <div>
                    <div className="flex items-center justify-between gap-3">
                      <span className="text-xs font-semibold text-[#5A6738]">
                        {DATES_PLATTER_PRODUCT.categoryLabel}
                      </span>
                      <span className="text-sm font-bold text-[#B4536D]">
                        تسعير خاص حسب الحجم
                      </span>
                    </div>
                    <h3 className="text-2xl font-bold text-[#4A2511] mt-1.5">
                      {DATES_PLATTER_PRODUCT.name}
                    </h3>
                    <p className="text-sm font-medium text-[#6B3A1F] mt-1">
                      {DATES_PLATTER_PRODUCT.subtitle}
                    </p>
                    <p className="text-sm text-[#7D5640] mt-2 leading-relaxed">
                      {DATES_PLATTER_PRODUCT.description}
                    </p>
                  </div>

                  <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-[#F2EAE0]">
                    <span className="text-xs text-[#7D5640]">
                      {DATES_PLATTER_PRODUCT.ingredientsNote}
                    </span>
                    <button
                      type="button"
                      onClick={handleAddPlatter}
                      className={`min-h-[44px] px-5 py-2.5 rounded-xl text-sm font-bold inline-flex items-center justify-center gap-2 transition-colors cursor-pointer whitespace-nowrap ${
                        platterAdded
                          ? 'bg-[#5A6738] text-white'
                          : 'bg-[#6B3A1F] text-white hover:bg-[#572E17]'
                      }`}
                    >
                      {platterAdded ? (
                        <>
                          <Check className="w-4 h-4" />
                          <span>أُضيف الصحن للسلة</span>
                        </>
                      ) : (
                        <>
                          <Plus className="w-4 h-4" />
                          <span>اطلب الصحن</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Featured Bundle Card (129 SAR) */}
            {showBundleSection && (
              <div className="mt-8 bg-white rounded-2xl border border-[#E6DACB] overflow-hidden grid lg:grid-cols-12 items-stretch">
                <div className="lg:col-span-5 min-h-[220px] border-b lg:border-b-0 lg:border-e border-[#EFE6DA] bg-[#F4EDE1] overflow-hidden">
                  {!bundleImgError ? (
                    <img
                      src={PHOTO_SUPER_URL}
                      alt={BUNDLE_PRODUCT.imageAlt}
                      referrerPolicy="no-referrer"
                      onError={() => setBundleImgError(true)}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <ProductIllustration variant="bundle" className="h-full min-h-[220px]" />
                  )}
                </div>

                <div className="lg:col-span-7 p-6 sm:p-8 flex flex-col justify-between gap-5">
                  <div>
                    <div className="flex items-center justify-between gap-3">
                      <span className="text-xs font-semibold text-[#B4536D]">
                        عرض المدينة الخاص · شامل الهدية المجانية
                      </span>
                      <span className="text-xl font-bold tabular-nums text-[#4A2511]">
                        129 ر.س
                      </span>
                    </div>
                    <h3 className="text-2xl font-bold text-[#4A2511] mt-2">
                      باقة 129 ر.س المتكاملة
                    </h3>
                    <p className="text-sm text-[#6B3A1F] mt-2 leading-relaxed">
                      جرانولا 500g بالنكهة التي تختارها + علبة تمر محشو بالجرانولا والفستق + هدية
                      مجانية من المطبخ.
                    </p>
                  </div>

                  <div className="space-y-3 pt-2">
                    <label
                      htmlFor="bundle-flavor-select"
                      className="block text-xs font-semibold text-[#7D5640]"
                    >
                      اختر نكهة الجرانولا (500g) داخل الباقة:
                    </label>
                    <div className="flex flex-col sm:flex-row gap-3">
                      <select
                        id="bundle-flavor-select"
                        value={bundleFlavor}
                        onChange={(e) => setBundleFlavor(e.target.value)}
                        className="flex-1 min-h-[44px] px-3.5 py-2.5 rounded-xl border border-[#E6DACB] bg-[#FAF6F0] text-sm font-medium text-[#4A2511] focus:outline-none focus:ring-2 focus:ring-[#D97E96]"
                      >
                        {BUNDLE_FLAVOR_CHOICES.map((choice) => (
                          <option key={choice} value={choice}>
                            {choice}
                          </option>
                        ))}
                      </select>

                      <button
                        type="button"
                        onClick={handleAddBundle}
                        className={`min-h-[44px] px-6 py-2.5 rounded-xl text-sm font-bold inline-flex items-center justify-center gap-2 transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                          bundleAdded
                            ? 'bg-[#5A6738] text-white'
                            : 'bg-[#F6DCE2] text-[#4A2511] border border-[#D97E96] hover:bg-[#EFC7D1]'
                        }`}
                      >
                        {bundleAdded ? (
                          <>
                            <Check className="w-4 h-4" />
                            <span>أُضيفت الباقة</span>
                          </>
                        ) : (
                          <>
                            <Sparkles className="w-4 h-4" />
                            <span>أضف الباقة للسلة — 129 ر.س</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Section 2: Benefits & Serving Suggestions */}
        <section id="benefits" className="border-t border-[#E6DACB] py-14 lg:py-16">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 grid lg:grid-cols-12 gap-10 lg:gap-12">
            {/* Health Benefits */}
            <div className="lg:col-span-7">
              <p className="text-xs font-semibold text-[#5A6738]">قيمة غذائية عالية</p>
              <h2 className="text-2xl sm:text-3xl font-bold text-[#4A2511] mt-1">
                فوائد الجرانولا
              </h2>

              <div className="mt-6 divide-y divide-[#E6DACB] border-y border-[#E6DACB]">
                {HEALTH_BENEFITS.map((benefit, index) => (
                  <div key={benefit.title} className="py-4 flex items-start gap-4">
                    <span className="text-xs font-bold tabular-nums text-[#B4536D] pt-1 shrink-0">
                      {String(index + 1).padStart(2, '0')}.
                    </span>
                    <div>
                      <h3 className="text-base font-bold text-[#4A2511]">{benefit.title}</h3>
                      <p className="text-sm text-[#7D5640] mt-0.5 leading-relaxed">
                        {benefit.detail}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Serving Ways with real photo */}
            <div className="lg:col-span-5 space-y-5">
              <div>
                <p className="text-xs font-semibold text-[#5A6738]">أفكار التقديم اليومي</p>
                <h2 className="text-2xl sm:text-3xl font-bold text-[#4A2511] mt-1">
                  طرق الاستخدام
                </h2>
              </div>

              <div className="aspect-[16/10] w-full rounded-2xl overflow-hidden border border-[#E6DACB] bg-[#F4EDE1]">
                {!benefitsImgError ? (
                  <img
                    src={PHOTO_SUPER_URL}
                    alt="طرق تقديم الجرانولا مع الزبادي والتوت والفراولة والموز"
                    referrerPolicy="no-referrer"
                    onError={() => setBenefitsImgError(true)}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <ProductIllustration variant="super" />
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-3">
                {SERVING_SUGGESTIONS.map((item) => (
                  <div
                    key={item.title}
                    className="bg-white rounded-xl p-3.5 border border-[#E6DACB]"
                  >
                    <h3 className="text-sm font-bold text-[#4A2511]">{item.title}</h3>
                    <p className="text-xs text-[#7D5640] mt-0.5">{item.note}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Section 3: Our Story & Direct WhatsApp Checkout */}
        <section id="story" className="border-t border-[#E6DACB] bg-[#F2EAE0]/70 py-14 lg:py-16">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-14">
            {/* Story Editorial Row */}
            <div className="grid lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-7 space-y-4">
                <p className="text-xs font-semibold text-[#5A6738]">بوثنا في المدينة المنورة — Granollos.sa</p>
                <h2 className="text-2xl sm:text-3xl font-bold text-[#4A2511]">قصتنا</h2>
                <blockquote className="text-lg sm:text-xl font-medium text-[#4A2511] leading-relaxed bg-white p-6 rounded-2xl border border-[#E6DACB]">
                  «من أنا صغيرة والجرانولا جزء من يومي في أستراليا، ورجعت السعودية وما لقيت النوع
                  اللي يناسبني فقررت أسويها بنفسي.»
                </blockquote>
                <p className="text-sm text-[#6B3A1F] leading-relaxed">
                  من مطبخنا وبوثنا في المدينة المنورة، نقدّم لكم وصفات متوازنة تجمع بين القرمشة
                  الأسترالية الأصيلة والنكهات السعودية الفاخرة مثل الورد الدمشقي والهيل والتمر
                  المحشو.
                </p>
                <div className="flex flex-wrap items-center gap-5 pt-1">
                  <a
                    href={LINKTREE_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm font-bold text-[#6B3A1F] hover:text-[#4A2511] underline underline-offset-4 decoration-[#D97E96]"
                  >
                    <span>تابعنا — linktr.ee/granollos.sa</span>
                    <ExternalLink className="w-4 h-4" />
                  </a>
                  <a
                    href={INSTAGRAM_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-sm font-bold text-[#6B3A1F] hover:text-[#4A2511]"
                  >
                    <Instagram className="w-4 h-4" />
                    <span>انستقرام: {INSTAGRAM_HANDLE}</span>
                  </a>
                </div>
              </div>

              <div className="lg:col-span-5">
                <div className="bg-white rounded-2xl p-6 border border-[#E6DACB] flex items-center gap-5">
                  <div className="w-24 h-24 rounded-full overflow-hidden border border-[#E89AAE] shrink-0 bg-[#F5EBE0]">
                    {!logoError ? (
                      <img
                        src={BRAND_LOGO_URL}
                        alt="شعار GRANOLLOS"
                        referrerPolicy="no-referrer"
                        onError={() => setLogoError(true)}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center font-brand text-xs font-bold text-[#6B3A1F]">
                        GRANOLLOS
                      </div>
                    )}
                  </div>
                  <div>
                    <p className="font-brand text-lg font-bold text-[#4A2511]">GRANOLLOS</p>
                    <p className="text-sm text-[#6B3A1F] mt-0.5">المدينة المنورة</p>
                    <p className="text-xs text-[#7D5640] mt-1">
                      مصنوع بحب · طبيعي ١٠٠٪ · {INSTAGRAM_HANDLE}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Order Section */}
            <div id="order" className="pt-8 border-t border-[#E6DACB]">
              <div className="mb-6">
                <p className="text-xs font-semibold text-[#5A6738]">تأكيد الطلب السريع</p>
                <h2 className="text-2xl sm:text-3xl font-bold text-[#4A2511] mt-1">اطلب الآن</h2>
              </div>

              <div className="grid lg:grid-cols-12 gap-8 items-start">
                {/* Customer Details Form */}
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    setOrderPrepared(true);
                  }}
                  className="lg:col-span-7 bg-white rounded-2xl p-6 sm:p-8 border border-[#E6DACB] space-y-5"
                >
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label
                        htmlFor="customer-name"
                        className="block text-sm font-bold text-[#4A2511] mb-1.5"
                      >
                        الاسم
                      </label>
                      <input
                        id="customer-name"
                        type="text"
                        value={customerName}
                        onChange={(e) => setCustomerName(e.target.value)}
                        placeholder="الاسم الكريم"
                        className="w-full min-h-[44px] px-3.5 py-2.5 rounded-xl border border-[#E6DACB] bg-[#FAF6F0] text-sm text-[#4A2511] placeholder:text-[#9D7B66] focus:outline-none focus:ring-2 focus:ring-[#D97E96]"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="delivery-method"
                        className="block text-sm font-bold text-[#4A2511] mb-1.5"
                      >
                        طريقة الاستلام
                      </label>
                      <select
                        id="delivery-method"
                        value={deliveryMethod}
                        onChange={(e) => setDeliveryMethod(e.target.value)}
                        className="w-full min-h-[44px] px-3.5 py-2.5 rounded-xl border border-[#E6DACB] bg-[#FAF6F0] text-sm text-[#4A2511] focus:outline-none focus:ring-2 focus:ring-[#D97E96]"
                      >
                        {DELIVERY_METHODS.map((method) => (
                          <option key={method} value={method}>
                            {method}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="customer-address"
                      className="block text-sm font-bold text-[#4A2511] mb-1.5"
                    >
                      الحي / العنوان — المدينة المنورة أو المدينة الأخرى
                    </label>
                    <input
                      id="customer-address"
                      type="text"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      placeholder="مثال: حي العزيزية، المدينة المنورة"
                      className="w-full min-h-[44px] px-3.5 py-2.5 rounded-xl border border-[#E6DACB] bg-[#FAF6F0] text-sm text-[#4A2511] placeholder:text-[#9D7B66] focus:outline-none focus:ring-2 focus:ring-[#D97E96]"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="order-notes"
                      className="block text-sm font-bold text-[#4A2511] mb-1.5"
                    >
                      ملاحظات إضافية (اختياري)
                    </label>
                    <textarea
                      id="order-notes"
                      rows={2}
                      value={orderNotes}
                      onChange={(e) => setOrderNotes(e.target.value)}
                      placeholder="وقت التوصيل المفضل أو ملاحظات على الإهداء..."
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#E6DACB] bg-[#FAF6F0] text-sm text-[#4A2511] placeholder:text-[#9D7B66] focus:outline-none focus:ring-2 focus:ring-[#D97E96]"
                    />
                  </div>

                  <div className="pt-2 text-xs text-[#7D5640] flex flex-wrap gap-x-5 gap-y-1.5">
                    <span>📍 المقر الرئيسي: المدينة المنورة</span>
                    <span dir="ltr">📱 {WHATSAPP_DISPLAY}</span>
                    <span>📸 انستقرام: {INSTAGRAM_HANDLE}</span>
                  </div>
                </form>

                {/* Live Order Summary & WhatsApp Send */}
                <div className="lg:col-span-5 bg-white rounded-2xl p-6 sm:p-7 border border-[#E6DACB] space-y-5">
                  <div className="flex items-center justify-between border-b border-[#F2EAE0] pb-3.5">
                    <h3 className="text-lg font-bold text-[#4A2511]">ملخص السلة</h3>
                    <span className="text-xs font-semibold tabular-nums text-[#7D5640]">
                      {totalItems} منتج
                    </span>
                  </div>

                  {cart.length === 0 ? (
                    <div className="py-6 text-center space-y-3">
                      <p className="text-sm text-[#7D5640]">
                        سلتك فارغة حالياً — يمكنك إرسال استفسار مباشر أو اختيار نكهة من الأعلى.
                      </p>
                      <button
                        type="button"
                        onClick={() => scrollToSection('flavors')}
                        className="px-4 py-2 rounded-xl bg-[#FAF6F0] border border-[#E6DACB] text-xs font-bold text-[#6B3A1F] hover:bg-[#EFE6DA] cursor-pointer"
                      >
                        العودة للنكهات
                      </button>
                    </div>
                  ) : (
                    <ul className="divide-y divide-[#F2EAE0] max-h-64 overflow-y-auto">
                      {cart.map((item) => (
                        <li key={item.key} className="py-3 flex items-center justify-between gap-3">
                          <div className="min-w-0">
                            <p className="text-sm font-bold text-[#4A2511] truncate">{item.name}</p>
                            <p className="text-xs text-[#7D5640] truncate">{item.optionLabel}</p>
                          </div>

                          <div className="flex items-center gap-3 shrink-0">
                            <div className="inline-flex items-center border border-[#E6DACB] rounded-lg bg-[#FAF6F0]">
                              <button
                                type="button"
                                onClick={() => handleUpdateQuantity(item.key, -1)}
                                aria-label="إنقاص"
                                className="w-7 h-7 flex items-center justify-center text-[#4A2511] hover:bg-[#EFE6DA] cursor-pointer"
                              >
                                <Minus className="w-3 h-3" />
                              </button>
                              <span className="w-6 text-center text-xs font-bold tabular-nums">
                                {item.quantity}
                              </span>
                              <button
                                type="button"
                                onClick={() => handleUpdateQuantity(item.key, 1)}
                                aria-label="زيادة"
                                className="w-7 h-7 flex items-center justify-center text-[#4A2511] hover:bg-[#EFE6DA] cursor-pointer"
                              >
                                <Plus className="w-3 h-3" />
                              </button>
                            </div>
                            <span className="text-sm font-bold tabular-nums text-[#4A2511] w-20 text-end">
                              {item.price > 0 ? `${item.price * item.quantity} ر.س` : 'حسب الحجم'}
                            </span>
                          </div>
                        </li>
                      ))}
                    </ul>
                  )}

                  <div className="border-t border-[#E6DACB] pt-4 space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-semibold text-[#6B3A1F]">
                        {hasQuoteItems ? 'الإجمالي المبدئي' : 'الإجمالي'}
                      </span>
                      <span className="text-xl font-bold tabular-nums text-[#4A2511]">
                        {subtotal > 0 ? `${subtotal} ر.س` : 'حسب الحجم'}
                      </span>
                    </div>

                    <a
                      href={whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => setOrderPrepared(true)}
                      className="w-full min-h-[48px] px-5 py-3 rounded-xl bg-[#6B3A1F] text-white text-sm font-bold flex items-center justify-center gap-2 hover:bg-[#572E17] transition-colors"
                    >
                      <MessageCircle className="w-4 h-4" />
                      <span>اطلب الآن عبر واتساب</span>
                    </a>

                    <button
                      type="button"
                      onClick={handleCopyOrderSummary}
                      className="w-full min-h-[42px] px-4 py-2 rounded-xl border border-[#E6DACB] bg-[#FAF6F0] text-xs font-bold text-[#6B3A1F] flex items-center justify-center gap-1.5 hover:bg-[#EFE6DA] transition-colors cursor-pointer"
                    >
                      {copiedOrder ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-[#5A6738]" />
                          <span>تم نسخ نص الطلب</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>نسخ تفاصيل الطلب</span>
                        </>
                      )}
                    </button>

                    {orderPrepared && (
                      <p className="text-xs text-[#5A6738] text-center font-medium">
                        تم تجهيز رسالة الطلب بنجاح — يمكنك إتمام الإرسال عبر واتساب أو نسخ النص.
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Quiet Editorial Footer */}
      <footer className="border-t border-[#E6DACB] bg-[#FAF6F0] py-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#7D5640]">
          <p>GRANOLLOS — المدينة المنورة · طبيعي ١٠٠٪ · مصنوع بحب</p>
          <div className="flex flex-wrap items-center justify-center gap-5">
            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#4A2511] font-medium"
              dir="ltr"
            >
              {WHATSAPP_DISPLAY}
            </a>
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#4A2511] font-medium"
            >
              انستقرام: {INSTAGRAM_HANDLE}
            </a>
            <a
              href={LINKTREE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#4A2511] font-semibold underline underline-offset-4 decoration-[#D97E96]"
            >
              linktr.ee/granollos.sa
            </a>
          </div>
        </div>
      </footer>

      {/* Slim Mobile Bottom Sticky Bar (<= 15% mobile height cap) */}
      <div className="md:hidden fixed bottom-0 inset-x-0 z-30 bg-white/95 backdrop-blur-sm border-t border-[#E6DACB] px-4 py-2.5 flex items-center justify-between gap-3">
        <div className="min-w-0">
          <p className="text-xs text-[#7D5640] tabular-nums">
            السلة: {totalItems} منتج
          </p>
          <p className="text-sm font-bold tabular-nums text-[#4A2511]">
            {subtotal > 0 ? `${subtotal} ر.س` : 'حسب الحجم'}
          </p>
        </div>
        <button
          type="button"
          onClick={() => scrollToSection('order')}
          className="min-h-[42px] px-5 py-2 rounded-xl bg-[#6B3A1F] text-white text-sm font-bold whitespace-nowrap shrink-0 cursor-pointer"
        >
          إتمام الطلب عبر واتساب
        </button>
      </div>

      {/* Slide-Over Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
        onProceedToOrder={() => {
          setIsCartOpen(false);
          scrollToSection('order');
        }}
      />
    </div>
  );
}
