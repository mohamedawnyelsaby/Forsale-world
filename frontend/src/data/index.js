// frontend/src/data/index.js
import COLORS from "../constants/colors";

// ══════════════════════════════════════════
//  MAIN SECTIONS
// ══════════════════════════════════════════
export const mainSections = [
  { id: "food",        icon: "🍔", label: "طعام ومشروبات",       color: "#FF6B00", bg: "#FFF3EB", photo: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600&q=80" },
  { id: "supermarket", icon: "🛒", label: "سوبرماركت وهايبر",    color: "#00875A", bg: "#E8F5E9", photo: "https://images.unsplash.com/photo-1542838132-92c53300491e?w=600&q=80" },
  { id: "electronics", icon: "📱", label: "إلكترونيات ومنزل",    color: "#1565C0", bg: "#E3F2FD", photo: "https://images.unsplash.com/photo-1550009158-9ebf69173e03?w=600&q=80" },
  { id: "cars",        icon: "🚗", label: "سيارات",              color: "#B71C1C", bg: "#FFEBEE", photo: "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=600&q=80" },
  { id: "realestate",  icon: "🏠", label: "عقارات",              color: "#4A148C", bg: "#F3E5F5", photo: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=600&q=80" },
];

// ══════════════════════════════════════════
//  FOOD
// ══════════════════════════════════════════
export const foodCategories = [
  { id: 1, icon: "🍔", label: "برجر" },
  { id: 2, icon: "🍕", label: "بيتزا" },
  { id: 3, icon: "🌮", label: "شاورما" },
  { id: 4, icon: "🍗", label: "دجاج" },
  { id: 5, icon: "🍜", label: "آسيوي" },
  { id: 6, icon: "🥗", label: "سلطات" },
  { id: 7, icon: "🍣", label: "سوشي" },
  { id: 8, icon: "🧃", label: "عصائر" },
  { id: 9, icon: "🍰", label: "حلويات" },
  { id: 10, icon: "☕", label: "قهوة" },
];

export const restaurants = [
  { id: 1, name: "برجر هاوس", category: "برجر • أمريكي", rating: 4.7, reviews: 1240, time: "25-35", fee: "مجاني", minOrder: "80 ج.م", offer: "خصم 20%", offerColor: COLORS.primary, image: "🍔", photo: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&q=80", bg: "#FFF3EB", open: true },
  { id: 2, name: "بيتزا بالاس", category: "بيتزا • إيطالي", rating: 4.5, reviews: 890, time: "30-45", fee: "15 ج.م", minOrder: "100 ج.م", offer: "اشتري 1 واحصل على 1", offerColor: "#8E44AD", image: "🍕", photo: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400&q=80", bg: "#F3E8FF", open: true },
  { id: 3, name: "شاورما كينج", category: "شاورما • شرقي", rating: 4.9, reviews: 3400, time: "20-30", fee: "مجاني", minOrder: "50 ج.م", offer: null, image: "🌯", photo: "https://images.unsplash.com/photo-1561050501-a4b71168ab3a?w=400&q=80", bg: "#E8F5E9", open: true },
  { id: 4, name: "سوشي ماستر", category: "سوشي • ياباني", rating: 4.6, reviews: 560, time: "40-55", fee: "25 ج.م", minOrder: "150 ج.م", offer: "توصيل مجاني", offerColor: "#00C47D", image: "🍣", photo: "https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=400&q=80", bg: "#E3F2FD", open: false },
  { id: 5, name: "دجاج دليشس", category: "دجاج • مشوي", rating: 4.4, reviews: 2100, time: "25-40", fee: "مجاني", minOrder: "70 ج.م", offer: "خصم 15%", offerColor: "#FF3B30", image: "🍗", photo: "https://images.unsplash.com/photo-1598103442097-8b74394b95c1?w=400&q=80", bg: "#FFF8E1", open: true },
  { id: 6, name: "حلويات النور", category: "حلويات • شرقية", rating: 4.8, reviews: 720, time: "30-45", fee: "20 ج.م", minOrder: "80 ج.م", offer: null, image: "🍰", photo: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400&q=80", bg: "#FCE4EC", open: true },
];

export const menuItems = [
  { id: "m1", name: "برجر كلاسيك", price: 120, desc: "لحم بقري طازج مع صوص خاص", emoji: "🍔" },
  { id: "m2", name: "وجبة عائلية", price: 280, desc: "مناسبة لـ 4 أشخاص مع مشروبات", emoji: "🍽️" },
  { id: "m3", name: "مشروب غازي", price: 25, desc: "بيبسي، ميرندا، 7 أب", emoji: "🥤" },
  { id: "m4", name: "عصير طازج", price: 45, desc: "متنوع حسب الموسم", emoji: "🧃" },
];

export const promoOffers = [
  { id: 1, bg: "#FF6B00", text: "وصّل مجاناً على أول طلب!", sub: "استخدم كود: FORSALE", photo: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&q=80" },
  { id: 2, bg: "#7C3AED", text: "عروض اليوم فقط", sub: "خصم حتى 40% على المطاعم", photo: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800&q=80" },
  { id: 3, bg: "#00875A", text: "اشتري 2 واحصل على 1", sub: "أصناف مختارة من برجر هاوس", photo: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=800&q=80" },
];

// ══════════════════════════════════════════
//  SUPERMARKET
// ══════════════════════════════════════════
export const supermarketCategories = [
  { id: 1, icon: "🥦", label: "خضار وفاكهة" },
  { id: 2, icon: "🥩", label: "لحوم ودواجن" },
  { id: 3, icon: "🥛", label: "ألبان وبيض" },
  { id: 4, icon: "🥫", label: "معلبات" },
  { id: 5, icon: "🧴", label: "منظفات" },
  { id: 6, icon: "🍞", label: "مخبوزات" },
  { id: 7, icon: "🐟", label: "أسماك" },
  { id: 8, icon: "🍬", label: "حلويات" },
];

export const supermarkets = [
  { id: 1, name: "كارفور", category: "هايبر ماركت", rating: 4.6, time: "30-45", fee: "مجاني", photo: "https://images.unsplash.com/photo-1542838132-92c53300491e?w=400&q=80", bg: "#E8F5E9", offer: "خصم 15%" },
  { id: 2, name: "سبينيس", category: "سوبر ماركت", rating: 4.5, time: "25-40", fee: "10 ج.م", photo: "https://images.unsplash.com/photo-1534723452862-4c874018d66d?w=400&q=80", bg: "#E3F2FD", offer: null },
  { id: 3, name: "بانده", category: "هايبر ماركت", rating: 4.7, time: "20-35", fee: "مجاني", photo: "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=400&q=80", bg: "#FFF3EB", offer: "عروض يومية" },
  { id: 4, name: "فتح الله", category: "سوبر ماركت", rating: 4.4, time: "30-50", fee: "15 ج.م", photo: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&q=80", bg: "#F3E8FF", offer: null },
];

export const supermarketProducts = [
  { id: 1, name: "تفاح أحمر", price: 25, unit: "كيلو", photo: "https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=200&q=80", cat: "خضار وفاكهة" },
  { id: 2, name: "موز", price: 18, unit: "كيلو", photo: "https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=200&q=80", cat: "خضار وفاكهة" },
  { id: 3, name: "لبن كامل الدسم", price: 12, unit: "لتر", photo: "https://images.unsplash.com/photo-1550583724-b2692b85b150?w=200&q=80", cat: "ألبان وبيض" },
  { id: 4, name: "بيض بلدي", price: 45, unit: "30 بيضة", photo: "https://images.unsplash.com/photo-1582722872445-44dc5f7e3c8f?w=200&q=80", cat: "ألبان وبيض" },
  { id: 5, name: "فراخ طازجة", price: 85, unit: "كيلو", photo: "https://images.unsplash.com/photo-1598103442097-8b74394b95c1?w=200&q=80", cat: "لحوم ودواجن" },
  { id: 6, name: "لحم بقري", price: 180, unit: "كيلو", photo: "https://images.unsplash.com/photo-1588347818036-c8e47f371c65?w=200&q=80", cat: "لحوم ودواجن" },
];

// ══════════════════════════════════════════
//  ELECTRONICS
// ══════════════════════════════════════════
export const electronicsCategories = [
  { id: 1, icon: "📱", label: "موبايلات" },
  { id: 2, icon: "💻", label: "لابتوب" },
  { id: 3, icon: "📺", label: "تلفزيونات" },
  { id: 4, icon: "🎧", label: "سماعات" },
  { id: 5, icon: "🖨️", label: "طابعات" },
  { id: 6, icon: "❄️", label: "تكييفات" },
  { id: 7, icon: "🍳", label: "أجهزة مطبخ" },
  { id: 8, icon: "🫧", label: "غسالات" },
];

export const electronicsProducts = [
  { id: 1, name: "iPhone 16 Pro", price: 35000, oldPrice: 38000, rating: 4.9, reviews: 234, photo: "https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?w=300&q=80", cat: "موبايلات", badge: "الأكثر مبيعاً" },
  { id: 2, name: "Samsung Galaxy S25", price: 28000, oldPrice: null, rating: 4.7, reviews: 189, photo: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=300&q=80", cat: "موبايلات", badge: null },
  { id: 3, name: "MacBook Air M3", price: 52000, oldPrice: 56000, rating: 4.8, reviews: 98, photo: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=300&q=80", cat: "لابتوب", badge: "خصم 7%" },
  { id: 4, name: "Sony Bravia 55\"", price: 18000, oldPrice: 22000, rating: 4.6, reviews: 145, photo: "https://images.unsplash.com/photo-1593359677879-a4bb92f4834?w=300&q=80", cat: "تلفزيونات", badge: "خصم 18%" },
  { id: 5, name: "AirPods Pro", price: 8500, oldPrice: null, rating: 4.8, reviews: 312, photo: "https://images.unsplash.com/photo-1606220945770-b5b6c2c55bf1?w=300&q=80", cat: "سماعات", badge: null },
  { id: 6, name: "تكييف LG 2 طن", price: 14500, oldPrice: 16000, rating: 4.5, reviews: 67, photo: "https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=300&q=80", cat: "تكييفات", badge: "خصم 10%" },
];

// ══════════════════════════════════════════
//  CARS
// ══════════════════════════════════════════
export const carCategories = [
  { id: "new", label: "سيارات جديدة", icon: "✨" },
  { id: "used", label: "سيارات مستعملة", icon: "🔄" },
];

export const cars = [
  { id: 1, name: "تويوتا كامري 2025", price: "850,000 ج.م", type: "new", year: 2025, km: null, fuel: "بنزين", transmission: "أوتوماتيك", color: "أبيض لؤلؤي", rating: 4.8, photo: "https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=400&q=80", badge: "جديد", location: "القاهرة" },
  { id: 2, name: "هيونداي توسان 2024", price: "620,000 ج.م", type: "new", year: 2024, km: null, fuel: "بنزين", transmission: "أوتوماتيك", color: "رمادي", rating: 4.6, photo: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=400&q=80", badge: "جديد", location: "الإسكندرية" },
  { id: 3, name: "BMW X5 2023", price: "3,200,000 ج.م", type: "new", year: 2023, km: null, fuel: "بنزين", transmission: "أوتوماتيك", color: "أسود", rating: 4.9, photo: "https://images.unsplash.com/photo-1555215695-3004980ad54e?w=400&q=80", badge: "فاخرة", location: "القاهرة" },
  { id: 4, name: "تويوتا كورولا 2022", price: "380,000 ج.م", type: "used", year: 2022, km: "45,000 كم", fuel: "بنزين", transmission: "أوتوماتيك", color: "فضي", rating: 4.5, photo: "https://images.unsplash.com/photo-1590362891991-f776e747a588?w=400&q=80", badge: "مستعملة", location: "الجيزة" },
  { id: 5, name: "كيا سيراتو 2021", price: "290,000 ج.م", type: "used", year: 2021, km: "62,000 كم", fuel: "بنزين", transmission: "أوتوماتيك", color: "أحمر", rating: 4.3, photo: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=400&q=80", badge: "مستعملة", location: "القاهرة" },
  { id: 6, name: "مرسيدس C200 2020", price: "750,000 ج.م", type: "used", year: 2020, km: "78,000 كم", fuel: "بنزين", transmission: "أوتوماتيك", color: "أبيض", rating: 4.7, photo: "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=400&q=80", badge: "فرصة", location: "الإسكندرية" },
];

// ══════════════════════════════════════════
//  REAL ESTATE
// ══════════════════════════════════════════
export const realEstateCategories = [
  { id: "apartment", label: "شقق", icon: "🏢" },
  { id: "villa", label: "فيلل", icon: "🏡" },
  { id: "land", label: "أراضي", icon: "🌿" },
  { id: "office", label: "مكاتب", icon: "🏬" },
  { id: "shop", label: "محلات", icon: "🏪" },
];

export const properties = [
  { id: 1, name: "شقة فاخرة بالتجمع الخامس", price: "4,500,000 ج.م", type: "apartment", area: 180, rooms: 3, baths: 2, floor: 8, furnished: true, photo: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400&q=80", badge: "متاح الآن", location: "التجمع الخامس، القاهرة" },
  { id: 2, name: "فيلا مستقلة بالشيخ زايد", price: "12,000,000 ج.م", type: "villa", area: 450, rooms: 5, baths: 4, floor: null, furnished: false, photo: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=400&q=80", badge: "حصري", location: "الشيخ زايد، الجيزة" },
  { id: 3, name: "شقة بمدينة نصر", price: "1,800,000 ج.م", type: "apartment", area: 120, rooms: 3, baths: 2, floor: 4, furnished: false, photo: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=400&q=80", badge: null, location: "مدينة نصر، القاهرة" },
  { id: 4, name: "أرض للبيع بالعاصمة الإدارية", price: "8,500,000 ج.م", type: "land", area: 600, rooms: null, baths: null, floor: null, furnished: false, photo: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=400&q=80", badge: "استثمار مميز", location: "العاصمة الإدارية" },
  { id: 5, name: "مكتب بالمعادي", price: "2,200,000 ج.م", type: "office", area: 90, rooms: 4, baths: 1, floor: 3, furnished: true, photo: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=400&q=80", badge: null, location: "المعادي، القاهرة" },
  { id: 6, name: "فيلا توين هاوس بأكتوبر", price: "7,300,000 ج.م", type: "villa", area: 280, rooms: 4, baths: 3, floor: null, furnished: false, photo: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=400&q=80", badge: "تسليم فوري", location: "6 أكتوبر، الجيزة" },
];

// ══════════════════════════════════════════
//  SHARED
// ══════════════════════════════════════════
export const paymentMethods = [
  { id: "vodafone_cash", name: "فودافون كاش", icon: "📱", color: "#E60000", bg: "#FFF0F0", description: "ادفع برقم فودافون كاش" },
  { id: "instapay",      name: "إنستاباي",    icon: "⚡", color: "#7B2FBE", bg: "#F5EDFF", description: "ادفع عبر تطبيق إنستاباي" },
  { id: "fawry",         name: "فوري",        icon: "🏪", color: "#FF8C00", bg: "#FFF5E6", description: "ادفع في أقرب منفذ فوري" },
  { id: "cash",          name: "كاش عند الاستلام", icon: "💵", color: "#00C47D", bg: "#EDFAF3", description: "ادفع نقداً عند التوصيل" },
];

export const notifications = [
  { id: 1, icon: "🛵", title: "طلبك في الطريق!", body: "الـ rider على بعد 5 دقائق", time: "الآن", unread: true },
  { id: 2, icon: "⭐", title: "قيّم طلبك الأخير", body: "كيف كانت تجربتك مع برجر هاوس؟", time: "منذ ساعة", unread: true },
  { id: 3, icon: "🎁", title: "هدية مجانية!", body: "اطلب الآن واحصل على توصيل مجاني", time: "أمس", unread: false },
  { id: 4, icon: "💰", title: "نقاط جديدة!", body: "حصلت على 120 نقطة من آخر طلب", time: "منذ يومين", unread: false },
];

export const rewards = [
  { icon: "🛵", title: "توصيل مجاني", points: 500, desc: "على طلبك القادم" },
  { icon: "🍔", title: "وجبة مجانية", points: 1200, desc: "من مطعم مختار" },
  { icon: "💸", title: "خصم 50 ج.م", points: 800, desc: "على أي طلب فوق 200" },
  { icon: "👑", title: "شهر Pro مجاني", points: 2000, desc: "اشتراك Forsale Pro" },
];

export const orders = [
  { id: "ORD-1021", restaurant: "برجر هاوس", icon: "🍔", status: "قيد التوصيل", statusColor: "#FF6B00", items: "برجر كلاسيك × 2، بطاطس كبير", total: "275 ج.م", date: "اليوم، 2:30 م", rated: false, active: true },
  { id: "ORD-1018", restaurant: "بيتزا بالاس", icon: "🍕", status: "تم التسليم", statusColor: "#00C47D", items: "بيتزا مارغريتا × 1، بيبسي", total: "195 ج.م", date: "أمس، 8:15 م", rated: false, active: false },
  { id: "ORD-1014", restaurant: "شاورما كينج", icon: "🌯", status: "تم التسليم", statusColor: "#00C47D", items: "شاورما دجاج × 3، حمص", total: "145 ج.م", date: "منذ يومين", rated: true, active: false },
  { id: "ORD-1009", restaurant: "سوشي ماستر", icon: "🍣", status: "ملغي", statusColor: "#FF3B30", items: "رول سالمون × 2", total: "280 ج.م", date: "3 مارس", rated: false, active: false },
];
