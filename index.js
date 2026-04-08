const express = require('express');
const { createClient } = require('@supabase/supabase-js');
const app = express();

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

app.get('/', async (req, res) => {
    try {
        const { data: shops } = await supabase.from('shops').select('*');

        res.send(`
<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
    <title>Forsale | فورسيل</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css">
    <style>
        :root { --main-yellow: #ffc107; --bg-gray: #fcfcfc; --text-dark: #222; }
        body { font-family: 'Segoe UI', Tahoma, sans-serif; background: var(--bg-gray); margin: 0; padding-bottom: 90px; overflow-x: hidden; }
        
        /* شريط العنوان العلوي الدقيق */
        .top-nav { background: white; padding: 10px 15px; border-bottom: 1px solid #f0f0f0; }
        .addr-box { display: flex; align-items: center; justify-content: space-between; margin-bottom: 12px; }
        .addr-text { font-size: 13px; color: #666; }
        .addr-val { font-size: 15px; font-weight: bold; color: var(--text-dark); display: block; }
        
        /* شريط البحث */
        .search-container { padding: 0 15px 15px; background: white; }
        .search-input { background: #f3f3f3; padding: 12px 15px; border-radius: 12px; display: flex; align-items: center; color: #999; font-size: 14px; gap: 10px; }

        /* الأقسام الدائرية (Grid) */
        .cat-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 10px; padding: 20px 15px; background: white; }
        .cat-card { text-align: center; cursor: pointer; }
        .cat-img { width: 75px; height: 75px; border-radius: 20px; margin-bottom: 8px; box-shadow: 0 4px 12px rgba(0,0,0,0.06); object-fit: cover; }
        .cat-name { font-size: 12px; font-weight: 600; color: #444; }

        /* ستايل العروض اليومية (Horizontal) */
        .offers-scroll { display: flex; overflow-x: auto; padding: 10px 15px; gap: 12px; scrollbar-width: none; }
        .offer-banner { min-width: 280px; height: 140px; border-radius: 18px; background: linear-gradient(135deg, #ffd452 0%, #ff9d2f 100%); position: relative; overflow: hidden; color: white; padding: 20px; box-sizing: border-box; }
        .offer-banner h3 { margin: 0; font-size: 22px; }
        .offer-tag { background: rgba(255,255,255,0.2); padding: 4px 10px; border-radius: 20px; font-size: 12px; }

        /* قائمة المتاجر الحية من Supabase */
        .shop-list { padding: 0 15px; }
        .shop-row { background: white; border-radius: 18px; padding: 12px; margin-bottom: 15px; display: flex; gap: 15px; align-items: center; border: 1px solid #f0f0f0; box-shadow: 0 2px 6px rgba(0,0,0,0.02); }
        .shop-logo { width: 70px; height: 70px; border-radius: 12px; background: #eee; font-size: 30px; display: flex; align-items: center; justify-content: center; border: 1px solid #f9f9f9; }
        .shop-details { flex-grow: 1; }
        .shop-details h4 { margin: 0 0 5px; font-size: 16px; color: var(--text-dark); }
        .shop-meta { font-size: 12px; color: #888; display: flex; align-items: center; gap: 10px; }
        .comm-badge { background: #e8f5e9; color: #2e7d32; padding: 2px 8px; border-radius: 6px; font-weight: bold; }

        /* القائمة السفلية (Tab Bar) */
        .tab-bar { position: fixed; bottom: 0; width: 100%; background: white; display: flex; justify-content: space-around; padding: 10px 0; border-top: 1px solid #eee; z-index: 1000; box-shadow: 0 -4px 15px rgba(0,0,0,0.05); }
        .tab-btn { text-align: center; color: #aaa; text-decoration: none; font-size: 11px; flex: 1; }
        .tab-btn.active { color: #000; font-weight: bold; }
        .tab-btn i { font-size: 22px; display: block; margin-bottom: 4px; }
        .pi-btn { background: #000; color: #ffc107; width: 50px; height: 50px; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin-top: -30px; border: 6px solid var(--bg-gray); font-size: 22px; box-shadow: 0 4px 10px rgba(0,0,0,0.2); }

    </style>
</head>
<body>

    <!-- الجزء العلوي: العنوان والبحث -->
    <div class="top-nav">
        <div class="addr-box">
            <div>
                <span class="addr-text">التوصيل إلى</span>
                <span class="addr-val">Al Hamra, جدة <i class="fas fa-chevron-down" style="font-size:10px"></i></span>
            </div>
            <i class="fas fa-bell" style="font-size: 20px; color: #444;"></i>
        </div>
    </div>
    <div class="search-container">
        <div class="search-input">
            <i class="fas fa-search"></i>
            ابحث عن المتاجر، المنتجات، أو العروض...
        </div>
    </div>

    <!-- تصنيفات هنجر ستيشن -->
    <div class="cat-grid">
        <div class="cat-card"><img src="https://images.deliveryhero.io/image/hungerstation/verticals/food.png" class="cat-img"><div class="cat-name">مطاعم</div></div>
        <div class="cat-card"><img src="https://images.deliveryhero.io/image/hungerstation/verticals/market.png" class="cat-img"><div class="cat-name">H ماركت</div></div>
        <div class="cat-card"><img src="https://images.deliveryhero.io/image/hungerstation/verticals/pharmacy.png" class="cat-img"><div class="cat-name">صيدليات</div></div>
        <div class="cat-card"><img src="https://images.deliveryhero.io/image/hungerstation/verticals/flowers.png" class="cat-img"><div class="cat-name">ورود</div></div>
    </div>

    <!-- العروض اليومية -->
    <div style="padding: 10px 15px 0;"><h3 style="margin:0; font-size:18px">العروض اليومية</h3></div>
    <div class="offers-scroll">
        <div class="offer-banner">
            <span class="offer-tag">خصم 20%</span>
            <h3>وفر بـ Pi Network</h3>
            <p>عند الدفع بمحفظة Pi</p>
        </div>
        <div class="offer-banner" style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);">
            <span class="offer-tag">توصيل مجاني</span>
            <h3>أول طلب لك</h3>
            <p>من المتاجر المختارة</p>
        </div>
    </div>

    <!-- قائمة المتاجر (مباشر من Supabase) -->
    <div style="padding: 20px 15px 10px;"><h3 style="margin:0; font-size:18px">المتاجر القريبة منك</h3></div>
    <div class="shop-list">
        ${shops.map(shop => `
            <div class="shop-row">
                <div class="shop-logo">🏪</div>
                <div class="shop-details">
                    <h4>${shop.name}</h4>
                    <div class="shop-meta">
                        <span><i class="fas fa-star" style="color:#ffc107"></i> 4.8</span>
                        <span>15-20 دقيقة</span>
                        <span class="comm-badge">${shop.commission_rate}% خصم</span>
                    </div>
                </div>
            </div>
        `).join('')}
    </div>

    <!-- شريط التنقل السفلي الاحترافي -->
    <div class="tab-bar">
        <a href="#" class="tab-btn active"><i class="fas fa-home"></i>الرئيسية</a>
        <a href="#" class="tab-btn"><i class="fas fa-tag"></i>العروض</a>
        <div class="pi-btn"><i class="fab fa-creative-commons-share"></i></div>
        <a href="#" class="tab-btn"><i class="fas fa-list-ul"></i>الطلبات</a>
        <a href="#" class="tab-btn"><i class="fas fa-bars"></i>المزيد</a>
    </div>

</body>
</html>
        `);
    } catch (err) {
        res.status(500).send("خطأ في الاتصال: " + err.message);
    }
});

module.exports = app;
