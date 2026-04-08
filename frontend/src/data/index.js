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
  { id: 1, name: "برجر هاوس", category: "برجر • أمريكي", rating: 4.7, reviews: 1240, time: "25-35", fee: "مجاني", minOrder: "80 ج.م", offer: "خصم 20%", offerColor: COLORS.primary, image: "🍔", bg: "#FFF3EB", open: true },
  { id: 2, name: "بيتزا بالاس", category: "بيتزا • إيطالي", rating: 4.5, reviews: 890, time: "30-45", fee: "15 ج.م", minOrder: "100 ج.م", offer: "اشتري 1 واحصل على 1", offerColor: "#8E44AD", image: "🍕", bg: "#F3E8FF", open: true },
  { id: 3, name: "شاورما كينج", category: "شاورما • شرقي", rating: 4.9, reviews: 3400, time: "20-30", fee: "مجاني", minOrder: "50 ج.م", offer: null, image: "🌯", bg: "#E8F5E9", open: true },
  { id: 4, name: "سوشي ماستر", category: "سوشي • ياباني", rating: 4.6, reviews: 560, time: "40-55", fee: "25 ج.م", minOrder: "150 ج.م", offer: "توصيل مجاني", offerColor: COLORS.green, image: "🍣", bg: "#E3F2FD", open: false },
  { id: 5, name: "دجاج دليشس", category: "دجاج • مشوي", rating: 4.4, reviews: 2100, time: "25-40", fee: "مجاني", minOrder: "70 ج.م", offer: "خصم 15%", offerColor: COLORS.red, image: "🍗", bg: "#FFF8E1", open: true },
  { id: 6, name: "حلويات النور", category: "حلويات • شرقية", rating: 4.8, reviews: 720, time: "30-45", fee: "20 ج.م", minOrder: "80 ج.م", offer: null, image: "🍰", bg: "#FCE4EC", open: true },
];

export const orders = [
  { id: "ORD-1021", restaurant: "برجر هاوس", icon: "🍔", status: "قيد التوصيل", statusColor: COLORS.primary, items: "برجر كلاسيك × 2، بطاطس كبير", total: "240 ج.م", date: "اليوم، 2:30 م" },
  { id: "ORD-1018", restaurant: "بيتزا بالاس", icon: "🍕", status: "تم التسليم", statusColor: COLORS.green, items: "بيتزا مارغريتا × 1، بيبسي", total: "195 ج.م", date: "أمس، 8:15 م" },
  { id: "ORD-1014", restaurant: "شاورما كينج", icon: "🌯", status: "تم التسليم", statusColor: COLORS.green, items: "شاورما دجاج × 3، حمص", total: "145 ج.م", date: "منذ يومين" },
  { id: "ORD-1009", restaurant: "سوشي ماستر", icon: "🍣", status: "ملغي", statusColor: COLORS.red, items: "رول سالمون × 2", total: "280 ج.م", date: "3 مارس" },
];

export const promoOffers = [
  { id: 1, bg: "#FF6B00", text: "وصّل مجاناً على أول طلب!", sub: "استخدم كود: FORSALE", emoji: "🎉" },
  { id: 2, bg: "#8E44AD", text: "عروض اليوم فقط", sub: "خصم حتى 40% على المطاعم المميزة", emoji: "⚡" },
  { id: 3, bg: "#16A085", text: "اشتري 2 واحصل على 1", sub: "على أصناف مختارة من برجر هاوس", emoji: "🎁" },
];

export const paymentMethods = [
  { id: "vodafone_cash", name: "فودافون كاش", icon: "📱", color: "#E60000", bg: "#FFF0F0", description: "ادفع برقم فودافون كاش", number: "01001234567" },
  { id: "instapay", name: "إنستاباي", icon: "⚡", color: "#7B2FBE", bg: "#F5EDFF", description: "ادفع عبر تطبيق إنستاباي", number: "forsale@instapay" },
  { id: "fawry", name: "فوري", icon: "🏪", color: "#FF8C00", bg: "#FFF5E6", description: "ادفع في أقرب منفذ فوري", number: null },
  { id: "cash", name: "كاش عند الاستلام", icon: "💵", color: "#2ECC71", bg: "#EDFAF3", description: "ادفع نقداً عند التوصيل", number: null },
];
