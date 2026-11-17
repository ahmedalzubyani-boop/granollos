export type ProductCategory = 'all' | 'granola' | 'dates' | 'bundles';

export type IllustrationVariant =
  | 'classic'
  | 'super'
  | 'rose'
  | 'dates'
  | 'chocolate'
  | 'cardamom'
  | 'bundle';

export interface ProductOption {
  id: string;
  label: string;
  price: number; // 0 means custom/quote on WhatsApp
}

export interface Product {
  id: string;
  name: string;
  categoryLabel: string;
  category: Exclude<ProductCategory, 'all'>;
  subtitle: string;
  description: string;
  ingredientsNote: string;
  imageUrl?: string;
  imageAlt?: string;
  imagePosition?: string;
  illustration: IllustrationVariant;
  featuredTag?: string;
  options: ProductOption[];
}

export interface CartItem {
  key: string;
  productId: string;
  name: string;
  optionLabel: string;
  price: number;
  quantity: number;
  imageUrl?: string;
  illustration: IllustrationVariant;
}

export const BRAND_LOGO_URL = '/assets/aistudio/_____________e318bed2.jpeg';
export const PHOTO_CLASSIC_URL = '/assets/aistudio/classic.jpg_________________834c9fe4.jpeg';
export const PHOTO_DATES_URL = '/assets/aistudio/dates.jpg_____________8c21264a.jpeg';
export const PHOTO_FLAVORS_URL = '/assets/aistudio/flavors.jpg___________________1509527e.jpeg';
export const PHOTO_SUPER_URL = '/assets/aistudio/super.jpg_______________7bf6bc9e.jpeg';

export const WHATSAPP_NUMBER = '966598110570';
export const WHATSAPP_DISPLAY = '+966 59 811 0570';
export const INSTAGRAM_HANDLE = 'Granollos.sa';
export const INSTAGRAM_URL = 'https://instagram.com/granollos.sa';
export const LINKTREE_URL = 'https://linktr.ee/granollos.sa';

export const PRODUCTS: Product[] = [
  {
    id: 'classic',
    name: 'جرانولا كلاسيك',
    categoryLabel: 'جرانولا مقرمشة',
    category: 'granola',
    subtitle: 'بالعسل واللوز',
    description:
      'شوفان كامل محمص ببطء مع شرائح اللوز والمكسرات والعسل الطبيعي لقرمشة متوازنة تناسب فطورك اليومي.',
    ingredientsNote: 'شوفان كامل · لوز محمص · عسل طبيعي',
    imageUrl: PHOTO_CLASSIC_URL,
    imageAlt: 'جرانولا كلاسيك من GRANOLLOS في عبوة كرافت مع المكسرات والشوكولاتة',
    imagePosition: 'object-center',
    illustration: 'classic',
    featuredTag: 'الأكثر مبيعاً',
    options: [{ id: '250g', label: '250g', price: 85 }],
  },
  {
    id: 'super',
    name: 'جرانولا سوبر',
    categoryLabel: 'جرانولا مقرمشة',
    category: 'granola',
    subtitle: 'مع زبادي وفواكه',
    description:
      'عبوة عائلية غنية بالمكسرات والحبوب المحمصة، مثالية مع الزبادي والفواكه والتوت الطازج.',
    ingredientsNote: 'مكسرات محمصة · بذور طبيعية · تحضير طازج',
    imageUrl: PHOTO_SUPER_URL,
    imageAlt: 'جرانولا سوبر من GRANOLLOS مقدمة مع الزبادي والتوت والفواكه الطازجة',
    imagePosition: 'object-center',
    illustration: 'super',
    options: [{ id: '500g', label: '500g', price: 155 }],
  },
  {
    id: 'rose',
    name: 'ورد دمشقي',
    categoryLabel: 'نكهات المدينة',
    category: 'granola',
    subtitle: 'بتلات الورد والفستق واللوز',
    description:
      'خلطة عطرية مستلهمة من ورد المدينة ودمشق، تجمع بتلات الورد مع الفستق الحلبي وشرائح اللوز.',
    ingredientsNote: 'ورد دمشقي · فستق حلبي · لوز محمص',
    imageUrl: PHOTO_FLAVORS_URL,
    imageAlt: 'نكهة الورد الدمشقي ضمن تشكيلة نكهات GRANOLLOS الثلاثة',
    imagePosition: 'object-left-bottom',
    illustration: 'rose',
    featuredTag: 'نكهة خاصة',
    options: [
      { id: '250g', label: '250g', price: 40 },
      { id: '500g', label: '500g', price: 75 },
    ],
  },
  {
    id: 'dates',
    name: 'تمر محشو 12 حبة',
    categoryLabel: 'تمور المدينة',
    category: 'dates',
    subtitle: 'بالجرانولا والفستق',
    description:
      '12 حبة من التمر الفاخر محشوة بخلطة الجرانولا المقرمشة والفستق المحمص، مثالية مع القهوة السعودية.',
    ingredientsNote: '12 حبة تمر · حشوة جرانولا · فستق حلبي',
    imageUrl: PHOTO_DATES_URL,
    imageAlt: 'تمر محشو بالجرانولا والفستق وبتلات الورد من GRANOLLOS',
    imagePosition: 'object-center',
    illustration: 'dates',
    featuredTag: 'للضيافة',
    options: [{ id: '12pcs', label: '12 حبة', price: 120 }],
  },
  {
    id: 'chocolate',
    name: 'شوكولاتة بلجيكية',
    categoryLabel: 'جرانولا مقرمشة',
    category: 'granola',
    subtitle: 'قطع الشوكولاتة البلجيكية والمكسرات',
    description:
      'توليفة غنية لمحبي الشوكولاتة تجمع الشوفان المحمص بالكاكاو مع قطع الشوكولاتة البلجيكية والبندق.',
    ingredientsNote: 'شوكولاتة بلجيكية · كاكاو · بندق ولوز',
    imageUrl: PHOTO_FLAVORS_URL,
    imageAlt: 'نكهة الشوكولاتة البلجيكية من GRANOLLOS',
    imagePosition: 'object-right-bottom',
    illustration: 'chocolate',
    options: [
      { id: '250g', label: '250g', price: 40 },
      { id: '500g', label: '500g', price: 75 },
    ],
  },
  {
    id: 'cardamom',
    name: 'هيل وشوكولاتة بيضاء',
    categoryLabel: 'نكهات المدينة',
    category: 'granola',
    subtitle: 'هيل عربي مع شوكولاتة بيضاء',
    description:
      'لمسة دافئة من الهيل المطحون حديثاً تتوازن مع مكعبات الشوكولاتة البيضاء والفستق واللوز.',
    ingredientsNote: 'هيل عربي · شوكولاتة بيضاء · فستق ولوز',
    imageUrl: PHOTO_FLAVORS_URL,
    imageAlt: 'نكهة الهيل والشوكولاتة البيضاء من GRANOLLOS',
    imagePosition: 'object-top',
    illustration: 'cardamom',
    options: [
      { id: '250g', label: '250g', price: 40 },
      { id: '500g', label: '500g', price: 75 },
    ],
  },
];

export const DATES_PLATTER_PRODUCT: Product = {
  id: 'dates-platter',
  name: 'صحن التمر المحشو - للمناسبات',
  categoryLabel: 'ضيافة ومناسبات',
  category: 'dates',
  subtitle: 'تمر محشو بالجرانولا والفستق مع الورد',
  description:
    'صينية ضيافة فاخرة من التمر المحشو بالجرانولا والمكسرات ومزينة ببتلات الورد وأعواد GRANOLLOS الخاصة للمناسبات والاجتماعات.',
  ingredientsNote: 'تحضير خاص للمناسبات · تمر فاخر · جرانولا وورد',
  imageUrl: PHOTO_DATES_URL,
  imageAlt: 'صحن التمر المحشو بالجرانولا والفستق والورد للمناسبات من GRANOLLOS',
  illustration: 'dates',
  featuredTag: 'للمناسبات',
  options: [{ id: 'platter', label: 'صحن مناسبات (تسعير واتساب)', price: 0 }],
};

export const BUNDLE_FLAVOR_CHOICES = [
  'ورد دمشقي (500g)',
  'شوكولاتة بلجيكية (500g)',
  'هيل وشوكولاتة بيضاء (500g)',
];

export const BUNDLE_PRODUCT: Product = {
  id: 'bundle-129',
  name: 'باقة 129 ر.س',
  categoryLabel: 'باقة التوفير',
  category: 'bundles',
  subtitle: 'جرانولا 500g + تمر محشو + هدية مجانية',
  description:
    'تجربة متكاملة تجمع عبوة جرانولا 500g من اختيارك مع علبة التمر المحشو بالجرانولا والفستق، بالإضافة إلى هدية مجانية.',
  ingredientsNote: 'جرانولا 500g · تمر محشو · هدية مجانية',
  imageUrl: PHOTO_DATES_URL,
  imageAlt: 'باقة GRANOLLOS 129 ر.س شامل التمر المحشو والجرانولا والهدية المجانية',
  illustration: 'bundle',
  featuredTag: 'عرض خاص',
  options: BUNDLE_FLAVOR_CHOICES.map((flavor) => ({
    id: flavor,
    label: flavor,
    price: 129,
  })),
};

export const HEALTH_BENEFITS: { title: string; detail: string }[] = [
  {
    title: 'تحمي من فقر الدم',
    detail: 'غنية بالحديد الطبيعي من الشوفان الكامل والمكسرات المحمصة والبذور.',
  },
  {
    title: 'تخفض الكوليسترول',
    detail: 'ألياف بيتا جلوكان الطبيعية في الشوفان تدعم صحة القلب وتوازن الدهون.',
  },
  {
    title: 'تساعد في إنزال الوزن',
    detail: 'تمنح شعوراً بالشبع لفترات طويلة بفضل الألياف والبروتينات النباتية.',
  },
  {
    title: 'تحتوي فيتامين C و E',
    detail: 'مضادات أكسدة طبيعية من المكسرات والتوابل تدعم نضارة البشرة والمناعة.',
  },
  {
    title: 'منظمة للهضم ومدرة للحليب',
    detail: 'مكونات طبيعية لطيفة على المعدة ومناسبة للأمهات والنظام الغذائي اليومي.',
  },
  {
    title: 'تزيد طاقة الجسم',
    detail: 'طاقة متدرجة وثابتة دون هبوط مفاجئ في السكر بفضل التحلية الطبيعية.',
  },
  {
    title: 'صحية لمرضى السكري',
    detail: 'محضرة بمكونات طبيعية 100% خالية من السكر المكرر والمواد الحافظة.',
  },
];

export const SERVING_SUGGESTIONS: { title: string; note: string }[] = [
  { title: 'مع الزبادي', note: 'وجبة إفطار متكاملة وعالية البروتين' },
  { title: 'مع الحليب', note: 'بديل صحي ومقرمش لحبوب الإفطار المصنعة' },
  { title: 'مع الفواكه والتوت والفراولة', note: 'توازن رائع مع التوت الأزرق والفراولة والموز' },
  { title: 'لتزيين الكيك', note: 'تضيف طبقة قرمشة فاخرة ونكهة محمصة' },
  { title: 'مع الآيسكريم', note: 'تباين شهي بين البرودة والقرمشة الطبيعية' },
  { title: 'كوجبة خفيفة', note: 'مثالية في المكتب أو مع القهوة السعودية' },
];

export const DELIVERY_METHODS = [
  'توصيل داخل المدينة المنورة',
  'شحن لمدينة أخرى',
  'استلام من المقر - المدينة المنورة',
] as const;

export function buildWhatsAppOrderUrl(params: {
  items: CartItem[];
  customerName: string;
  address: string;
  deliveryMethod: string;
  notes?: string;
}): string {
  const { items, customerName, address, deliveryMethod, notes } = params;
  const pricedSubtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const hasQuoteItems = items.some((item) => item.price === 0);

  const lines: string[] = ['هلا GRANOLLOS - المدينة المنورة، أبي أطلب:'];

  if (items.length > 0) {
    lines.push('');
    items.forEach((item, index) => {
      const priceText =
        item.price > 0 ? `${item.price * item.quantity} ر.س` : 'يُحدد السعر حسب الحجم';
      lines.push(
        `${index + 1}. ${item.name} (${item.optionLabel}) × ${item.quantity} — ${priceText}`
      );
    });
    if (pricedSubtotal > 0) {
      lines.push(
        hasQuoteItems
          ? `إجمالي المنتجات المسعّرة: ${pricedSubtotal} ر.س (+ صحن المناسبات)`
          : `الإجمالي: ${pricedSubtotal} ر.س`
      );
    }
  } else {
    lines.push('');
    lines.push('أرغب بالاستفسار عن الطلب وتفاصيل النكهات المتوفرة.');
  }

  lines.push('');
  lines.push(`الاسم: ${customerName.trim() || 'غير محدد'}`);
  lines.push(`العنوان: ${address.trim() || 'غير محدد'}`);
  lines.push(`طريقة الاستلام: ${deliveryMethod}`);

  if (notes && notes.trim()) {
    lines.push(`ملاحظات إضافية: ${notes.trim()}`);
  }

  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(lines.join('\n'))}`;
}
