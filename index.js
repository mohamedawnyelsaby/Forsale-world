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
    <title>Forsale - المذاق والقوة</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <style>
        :root {
            --hs-yellow: #FFD400;
            --hs-red: #FF0032;
            --hs-blue: #00A6FF;
            --hs-bg: #FFFFFF;
            --text-main: #222;
            --text-sub: #666;
        }

        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            margin: 0; background: var(--hs-bg); color: var(--text-main);
            padding-bottom: 80px; -webkit-font-smoothing: antialiased;
        }

        /* 1. Header & Location */
        .top-header { padding: 10px 16px; background: #fff; position: sticky; top: 0; z-index: 100; }
        .location-bar { display: flex; align-items: center; justify-content: flex-end; gap: 8px; margin-bottom: 12px; }
        .loc-text { text-align: left; flex-grow: 1; }
        .loc-title { font-size: 16px; font-weight: 800; display: block; }
        .loc-sub { font-size: 12px; color: var(--text-sub); }
        .loc-icon { color: #00A651; font-size: 20px; }

        .search-box {
            background: #F2F2F2; border-radius: 12px; padding: 12px 16px;
            display: flex; align-items: center; color: #999; font-size: 14px; gap: 10px;
        }

        /* 2. Main Banner */
        .hero-banner { padding: 15px; }
        .banner-img { 
            width: 100%; border-radius: 20px; box-shadow: 0 4px 15px rgba(0,0,0,0.05);
            background: linear-gradient(90deg, #FFD400, #FFE66D); height: 160px;
            display: flex; align-items: center; justify-content: center; font-weight: bold;
        }

        /* 3. Categories Grid (4-columns) */
        .section-label { padding: 15px 16px 5px; font-size: 18px; font-weight: 800; }
        .cat-grid {
            display: grid; grid-template-columns: repeat(4, 1fr); gap: 12px; padding: 15px 16px;
        }
        .cat-card { text-align: center; }
        .cat-thumb { 
            background: #fff; border-radius: 15px; aspect-ratio: 1; margin-bottom: 8px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.03); border: 1px solid #f0f0f0;
            display: flex; align-items: center; justify-content: center; overflow: hidden;
        }
        .cat-thumb img { width: 85%; object-fit: contain; }
        .cat-name { font-size: 12px; font-weight: 700; color: #333; }

        /* 4. Horizontal Scroller (Daily Offers) */
        .h-scroll { display: flex; overflow-x: auto; gap: 12px; padding: 10px 16px; scrollbar-width: none; }
        .h-scroll::-webkit-scrollbar { display: none; }
        .offer-card { min-width: 100px; text-align: center; }
        .offer-circle { width: 90px; height: 90px; border-radius: 20px; background: #eee; margin-bottom: 5px; overflow: hidden; border: 1px solid #f0f0f0; }

        /* 5. Stores Near You (Grid) */
        .stores-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 12px; padding: 10px 16px; }
        .store-item { text-align: center; }
        .store-logo { width: 100%; aspect-ratio: 1; border-radius: 12px; border: 1px solid #eee; margin-bottom: 5px; }
        .store-time { font-size: 10px; color: var(--text-sub); }

        /* 6. Food Cuisines (Circles) */
        .cuisine-item { min-width: 80px; text-align: center; }
        .cuisine-img { width: 70px; height: 70px; border-radius: 50%; background: #f9f9f9; margin: 0 auto 8px; object-fit: cover; border: 1px solid #eee; }

        /* 7. Bottom Navigation (Exact Design) */
        .bottom-nav {
            position: fixed; bottom: 0; width: 100%; background: #fff; 
            display: flex; justify-content: space-around; padding: 10px 0;
            border-top: 1px solid #eee; z-index: 1000;
        }
        .nav-link { text-decoration: none; color: #999; text-align: center; font-size: 11px; font-weight: 700; flex: 1; }
        .nav-link.active { color: #000; }
        .nav-link i { font-size: 22px; display: block; margin-bottom: 4px; }
        .hs-logo-nav { width: 28px; height: 28px; background: var(--hs-yellow); border-radius: 6px; display: flex; align-items: center; justify-content: center; margin: 0 auto 4px; color: #000; font-weight: 900; font-size: 18px; }

        /* Badges */
        .badge-red { background: var(--hs-red); color: #fff; font-size: 10px; padding: 2px 6px; border-radius: 4px; position: absolute; top: 5px; right: 5px; }

    </style>
</head>
<body>

    <!-- الهيدر والعنوان -->
    <div class="top-header">
        <div class="location-bar">
            <i class="fas fa-chevron-down" style="font-size: 12px; color: var(--hs-yellow);"></i>
            <div class="loc-text">
                <span class="loc-sub">جانب الياسمين الطبية، كـ...</span>
                <span class="loc-title">Al Hamra</span>
            </div>
            <i class="fas fa-map-marker-alt loc-icon"></i>
        </div>
        <div class="search-box">
            <i class="fas fa-search"></i>
            ابحث عن المطاعم والمتاجر
        </div>
    </div>

    <!-- البانر الرئيسي -->
    <div class="hero-banner">
        <div class="banner-img">
            <img src="https://images.deliveryhero.io/image/hungerstation/banners/150_offer_ar.png" style="width:100%; border-radius:20px;">
        </div>
    </div>

    <div class="section-label">وش ودك تطلب اليوم؟</div>

    <!-- شبكة الأقسام -->
    <div class="cat-grid">
        <div class="cat-card">
            <div class="cat-thumb"><img src="https://images.deliveryhero.io/image/hungerstation/verticals/food.png"></div>
            <div class="cat-name">مطاعم</div>
        </div>
        <div class="cat-card">
            <div class="cat-thumb"><img src="https://images.deliveryhero.io/image/hungerstation/verticals/market.png"></div>
            <div class="cat-name">H ماركت</div>
        </div>
        <div class="cat-card">
            <div class="cat-thumb"><img src="https://images.deliveryhero.io/image/hungerstation/verticals/pharmacy.png"></div>
            <div class="cat-name">صيدليات</div>
        </div>
        <div class="cat-card">
            <div class="cat-thumb"><img src="https://images.deliveryhero.io/image/hungerstation/verticals/flowers.png"></div>
            <div class="cat-name">ورود وأكثر</div>
        </div>
    </div>

    <!-- العروض اليومية -->
    <div class="section-label">العروض اليومية</div>
    <div class="h-scroll">
        <div class="offer-card"><div class="offer-circle"><img src="https://images.deliveryhero.io/image/hungerstation/offers/coffee_offer.png" width="100%"></div></div>
        <div class="offer-card"><div class="offer-circle"><img src="https://images.deliveryhero.io/image/hungerstation/offers/top3_offer.png" width="100%"></div></div>
        <div class="offer-card"><div class="offer-circle"><img src="https://images.deliveryhero.io/image/hungerstation/offers/fast_delivery.png" width="100%"></div></div>
        <div class="offer-card"><div class="offer-circle"><img src="https://images.deliveryhero.io/image/hungerstation/offers/charity.png" width="100%"></div></div>
    </div>

    <!-- المتاجر القريبة منك (من Supabase) -->
    <div class="section-label">المتاجر القريبة منك</div>
    <div class="stores-grid">
        ${shops.map(shop => `
            <div class="store-item">
                <img class="store-logo" src="https://ui-avatars.com/api/?name=${shop.name}&background=random">
                <div class="cat-name">${shop.name}</div>
                <div class="store-time">15 دقيقة</div>
            </div>
        `).join('')}
    </div>

    <!-- استكشف المطابخ -->
    <div class="section-label">إستكشف المطابخ</div>
    <div class="h-scroll">
        <div class="cuisine-item"><img src="https://images.deliveryhero.io/image/hungerstation/cuisines/fastfood.png" class="cuisine-img"><span>مأكولات سريعة</span></div>
        <div class="cuisine-item"><img src="https://images.deliveryhero.io/image/hungerstation/cuisines/sweets.png" class="cuisine-img"><span>حلى</span></div>
        <div class="cuisine-item"><img src="https://images.deliveryhero.io/image/hungerstation/cuisines/arabic.png" class="cuisine-img"><span>عربي</span></div>
        <div class="cuisine-item"><img src="https://images.deliveryhero.io/image/hungerstation/cuisines/healthy.png" class="cuisine-img"><span>صحي</span></div>
    </div>

    <!-- الشريط السفلي -->
    <div class="bottom-nav">
        <a href="#" class="nav-link active">
            <div class="hs-logo-nav">H</div>
            الرئيسية
        </a>
        <a href="#" class="nav-link"><i class="fas fa-shopping-basket"></i>الطلبات</a>
        <a href="#" class="nav-link"><i class="fas fa-percent"></i>العروض</a>
        <a href="#" class="nav-link"><i class="far fa-user"></i>المزيد</a>
    </div>

</body>
</html>
        `);
    } catch (err) {
        res.status(500).send("خطأ: " + err.message);
    }
});

module.exports = app;
