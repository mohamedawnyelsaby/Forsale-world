// frontend/src/data/index.js
import COLORS from "../constants/colors";

export const categories = [
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
  { id: 2, name: "بيتزا بالاس", category: "بيتزا • إيطالي", rating: 4.5, reviews: 890, time: "30-45", fee: "15 ج.م", minOrder: "100 ج.م", offer: "اشتري 1 واحصل على 1", offerColor: COLORS.purple, image: "🍕", photo: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400&q=80", bg: "#F3E8FF", open: true },
  { id: 3, name: "شاورما كينج", category: "شاورما • شرقي", rating: 4.9, reviews: 3400, time: "20-30", fee: "مجاني", minOrder: "50 ج.م", offer: null, image: "🌯", photo: "https://images.unsplash.com/photo-1561050501-a4b71168ab3a?w=400&q=80", bg: "#E8F5E9", open: true },
  { id: 4, name: "سوشي ماستر", category: "سوشي • ياباني", rating: 4.6, reviews: 560, time: "40-55", fee: "25 ج.م", minOrder: "150 ج.م", offer: "توصيل مجاني", offerColor: COLORS.green, image: "🍣", photo: "https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=400&q=80", bg: "#E3F2FD", open: false },
  { id: 5, name: "دجاج دليشس", category: "دجاج • مشوي", rating: 4.4, reviews: 2100, time: "25-40", fee: "مجاني", minOrder: "70 ج.م", offer: "خصم 15%", offerColor: COLORS.red, image: "🍗", photo: "https://images.unsplash.com/photo-1598103442097-8b74394b95c1?w=400&q=80", bg: "#FFF8E1", open: true },
  { id: 6, name: "حلويات النور", category: "حلويات • شرقية", rating: 4.8, reviews: 720, time: "30-45", fee: "20 ج.م", minOrder: "80 ج.م", offer: null, image: "🍰", photo: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400&q=80", bg: "#FCE4EC", open: true },
];

export const orders = [
  { id: "ORD-1021", restaurant: "برجر هاوس", icon: "🍔", status: "قيد التوصيل", statusColor: COLORS.primary, items: "برجر كلاسيك × 2، بطاطس كبير", total: "275 ج.م", date: "اليوم، 2:30 م", rated: false, active: true },
  { id: "ORD-1018", restaurant: "بيتزا بالاس", icon: "🍕", status: "تم التسليم", statusColor: COLORS.green, items: "بيتزا مارغريتا × 1، بيبسي", total: "195 ج.م", date: "أمس، 8:15 م", rated: false, active: false },
  { id: "ORD-1014", restaurant: "شاورما كينج", icon: "🌯", status: "تم التسليم", statusColor: COLORS.green, items: "شاورما دجاج × 3، حمص", total: "145 ج.م", date: "منذ يومين", rated: true, active: false },
  { id: "ORD-1009", restaurant: "سوشي ماستر", icon: "🍣", status: "ملغي", statusColor: COLORS.red, items: "رول سالمون × 2", total: "280 ج.م", date: "3 مارس", rated: false, active: false },
];

export const promoOffers = [
  { id: 1, bg: "#FF6B00", text: "وصّل مجاناً على أول طلب!", sub: "استخدم كود: FORSALE", emoji: "🎉", photo: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&q=80" },
  { id: 2, bg: "#7C3AED", text: "عروض اليوم فقط", sub: "خصم حتى 40% على المطاعم", emoji: "⚡", photo: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800&q=80" },
  { id: 3, bg: "#00875A", text: "اشتري 2 واحصل على 1", sub: "أصناف مختارة من برجر هاوس", emoji: "🎁", photo: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=800&q=80" },
];

export const paymentMethods = [
  { id: "vodafone_cash", name: "فودافون كاش", icon: "📱", color: "#E60000", bg: "#FFF0F0", description: "ادفع برقم فودافون كاش" },
  { id: "instapay", name: "إنستاباي", icon: "⚡", color: "#7B2FBE", bg: "#F5EDFF", description: "ادفع عبر تطبيق إنستاباي" },
  { id: "fawry", name: "فوري", icon: "🏪", color: "#FF8C00", bg: "#FFF5E6", description: "ادفع في أقرب منفذ فوري" },
  { id: "cash", name: "كاش عند الاستلام", icon: "💵", color: "#00C47D", bg: "#EDFAF3", description: "ادفع نقداً عند التوصيل" },
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

export const menuItems = [
  { id: "m1", name: "برجر كلاسيك", price: 120, desc: "لحم بقري طازج مع صوص خاص", emoji: "🍔" },
  { id: "m2", name: "وجبة عائلية", price: 280, desc: "مناسبة لـ 4 أشخاص مع مشروبات", emoji: "🍽️" },
  { id: "m3", name: "مشروب غازي", price: 25, desc: "بيبسي، ميرندا، 7 أب", emoji: "🥤" },
  { id: "m4", name: "عصير طازج", price: 45, desc: "متنوع حسب الموسم", emoji: "🧃" },
];
