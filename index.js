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
    <title>هنجرستيشن | فورسيل</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css">
    <style>
        /* نظام ألوان هنجرستيشن الرسمي */
        :root {
            --hs-yellow: #FFC107;
            --hs-bg: #FFFFFF;
            --hs-gray-bg: #F2F2F2;
            --hs-text-dark: #202020;
            --hs-text-light: #606060;
        }

        body {
            font-family: 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
            background-color: var(--hs-bg);
            margin: 0;
            padding-bottom: 70px; /* مساحة للـ Navigation السفلي */
            color: var(--hs-text-dark);
            -webkit-tap-highlight-color: transparent;
        }

        /* الجزء العلوي - العنوان */
        .header-container {
            padding: 15px 16px;
            background: white;
            position: sticky;
            top: 0;
            z-index: 1000;
        }

        .delivery-to {
            font-size: 12px;
            color: var(--hs-text-light);
            margin-bottom: 4px;
        }

        .location-selector {
            display: flex;
            align-items: center;
            font-weight: bold;
            font-size: 15px;
            gap: 5px;
        }

        /* شريط البحث المطابق */
        .search-wrapper {
            padding: 10px 16px;
        }
        .search-bar {
            background: var(--hs-gray-bg);
            border-radius: 8px;
            padding: 12px 15px;
            display: flex;
            align-items: center;
            gap: 12px;
            color: #999;
            font-size: 14px;
        }

        /* الأقسام - الدوائر الشهيرة */
        .categories-grid {
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            gap: 10px;
            padding: 15px 16px;
        }
        .category-item {
            text-align: center;
        }
        .category-image {
            width: 100%;
            aspect-ratio: 1;
            background: var(--hs-gray-bg);
            border-radius: 12px;
            display: flex;
            align-items: center;
            justify-content: center;
            margin-bottom: 8px;
            overflow: hidden;
        }
        .category-image img { width: 80%; object-fit: contain; }
        .category-item span { font-size: 12px; font-weight: 500; }

        /* ستايل العروض (Horizontal Slider) */
        .section-title {
            padding: 10px 16px;
            font-size: 18px;
            font-weight: bold;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        .view-all { color: var(--hs-yellow); font-size: 14px; }

        .promo-slider {
            display: flex;
            overflow-x: auto;
            padding: 10px 16px;
            gap: 12px;
            scrollbar-width: none;
        }
        .promo-slider::-webkit-scrollbar { display: none; }
        .promo-card {
            min-width: 260px;
            height: 130px;
            background: #eee;
            border-radius: 12px;
            background-size: cover;
            background-position: center;
        }

        /* قائمة المطاعم والمتاجر */
        .stores-list { padding: 10px 16px; }
        .store-card {
            display: flex;
            flex-direction: column;
            margin-bottom: 25px;
            position: relative;
        }
        .store-thumbnail {
            width: 100%;
            height: 160px;
            border-radius: 12px;
            background-color: #f9f9f9;
            object-fit: cover;
            border: 1px solid #eee;
        }
        .store-info {
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            margin-top: 10px;
        }
        .store-name { font-weight: bold; font-size: 16px; margin-bottom: 4px; }
        .store-tags { color: var(--hs-text-light); font-size: 13px; }
        .store-rating {
            background: #F2F2F2;
            padding: 4px 8px;
            border-radius: 6px;
            font-size: 12px;
            font-weight: bold;
            display: flex;
            align-items: center;
            gap: 4px;
        }

        /* الشريط السفلي (Tab Bar) - نسخة طبق الأصل */
        .bottom-nav {
            position: fixed;
            bottom: 0;
            width: 100%;
            background: white;
            display: flex;
            border-top: 1px solid #EAEAEA;
            padding: 8px 0;
            z-index: 2000;
        }
        .nav-tab {
            flex: 1;
            display: flex;
            flex-direction: column;
            align-items: center;
            color: #A0A0A0;
            text-decoration: none;
            font-size: 11px;
        }
        .nav-tab.active { color: var(--hs-yellow); }
        .nav-tab i { font-size: 20px; margin-bottom: 3px; }

        /* علامة Pi في المنتصف */
        .pi-tab {
            margin-top: -25px;
        }
        .pi-circle {
            width: 50px;
            height: 50px;
            background: var(--hs-yellow);
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            box-shadow: 0 4px 10px rgba(0,0,0,0.1);
            border: 4px solid white;
            color: white;
            font-size: 24px;
            font-weight: bold;
        }

    </style>
</head>
<body>

    <!-- الهيدر -->
    <div class="header-container">
        <div class="delivery-to">التوصيل إلى</div>
        <div class="location-selector">
            <i class="fas fa-map-marker-alt" style="color:var(--hs-yellow)"></i>
            البيت - جدة، المملكة العربية السعودية
            <i class="fas fa-chevron-down" style="font-size: 12px; margin-right: auto; color: var(--hs-yellow);"></i>
        </div>
    </div>

    <!-- البحث -->
    <div class="search-wrapper">
        <div class="search-bar">
            <i class="fas fa-search"></i>
            ابحث عن متجر أو منتج
        </div>
    </div>

    <!-- الأقسام -->
    <div class="categories-grid">
        <div class="category-item">
            <div class="category-image"><img src="https://images.deliveryhero.io/image/hungerstation/verticals/food.png"></div>
            <span>المطاعم</span>
        </div>
        <div class="category-item">
            <div class="category-image"><img src="https://images.deliveryhero.io/image/hungerstation/verticals/market.png"></div>
            <span>الفزعة</span>
        </div>
        <div class="category-item">
            <div class="category-image"><img src="https://images.deliveryhero.io/image/hungerstation/verticals/pharmacy.png"></div>
            <span>الصيدلية</span>
        </div>
        <div class="category-item">
            <div class="category-image"><img src="https://images.deliveryhero.io/image/hungerstation/verticals/flowers.png"></div>
            <span>الورد</span>
        </div>
    </div>

    <!-- العروض -->
    <div class="promo-slider">
        <div class="promo-card" style="background-image: url('https://k.nooncdn.com/cms/pages/20220512/778648e89f92d77053e1a8a25d2753a4/en_dk_uae-hero-01.png');"></div>
        <div class="promo-card" style="background: var(--hs-yellow); display: flex; align-items: center; justify-content: center; color: white; font-weight: bold; font-size: 20px;">خصم 50% بـ Pi</div>
    </div>

    <!-- القائمة الحية من Supabase -->
    <div class="section-title">
        كل المتاجر <span class="view-all">عرض الكل</span>
    </div>

    <div class="stores-list">
        ${shops.map(shop => `
            <div class="store-card">
                <img class="store-thumbnail" src="https://img.freepik.com/free-vector/gradient-fast-food-logo-template_23-2149014156.jpg" alt="${shop.name}">
                <div class="store-info">
                    <div>
                        <div class="store-name">${shop.name}</div>
                        <div class="store-tags">برجر • أمريكي • عمولة ${shop.commission_rate}%</div>
                    </div>
                    <div class="store-rating">
                        <i class="fas fa-star" style="color:var(--hs-yellow)"></i> 4.5
                    </div>
                </div>
                <div style="margin-top: 8px; font-size: 12px; color: #2ecc71;">
                    <i class="fas fa-motorcycle"></i> توصيل سريع (مجاني)
                </div>
            </div>
        `).join('')}
    </div>

    <!-- شريط التنقل السفلي -->
    <div class="bottom-nav">
        <a href="#" class="nav-tab active">
            <i class="fas fa-home"></i>
            <span>الرئيسية</span>
        </a>
        <a href="#" class="nav-tab">
            <i class="fas fa-percentage"></i>
            <span>العروض</span>
        </a>
        <a href="#" class="nav-tab pi-tab">
            <div class="pi-circle">π</div>
        </a>
        <a href="#" class="nav-tab">
            <i class="fas fa-receipt"></i>
            <span>طلباتي</span>
        </a>
        <a href="#" class="nav-tab">
            <i class="fas fa-user"></i>
            <span>الحساب</span>
        </a>
    </div>

</body>
</html>
        `);
    } catch (err) {
        res.status(500).send("خطأ: " + err.message);
    }
});

module.exports = app;
