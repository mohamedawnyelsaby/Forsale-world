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
    <title>Forsale Elite</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <style>
        :root {
            --primary: #6C63FF; /* بنفسجي حديث */
            --accent: #FFD700;  /* ذهبي Pi */
            --glass: rgba(255, 255, 255, 0.85);
            --dark: #121212;
        }

        body {
            font-family: 'Inter', 'Segoe UI', sans-serif;
            background: #f0f2f5;
            background-image: radial-gradient(circle at 10% 20%, rgb(239, 246, 249) 0%, rgb(206, 239, 253) 90%);
            margin: 0;
            padding-bottom: 100px;
            color: var(--dark);
        }

        /* Top Modern Header */
        .smart-header {
            background: var(--glass);
            backdrop-filter: blur(10px);
            padding: 20px 15px;
            position: sticky;
            top: 0;
            z-index: 1000;
            display: flex;
            justify-content: space-between;
            align-items: center;
            border-bottom: 1px solid rgba(255,255,255,0.3);
        }

        .user-status {
            display: flex;
            align-items: center;
            gap: 10px;
        }

        .avatar {
            width: 40px;
            height: 40px;
            border-radius: 50%;
            background: linear-gradient(45deg, var(--primary), var(--accent));
            border: 2px solid white;
        }

        /* Floating Search */
        .search-wrapper {
            padding: 0 15px;
            margin-top: 10px;
        }

        .search-box {
            background: white;
            border-radius: 20px;
            padding: 12px 20px;
            display: flex;
            align-items: center;
            gap: 12px;
            box-shadow: 0 10px 25px rgba(0,0,0,0.05);
            border: 1px solid #eee;
        }

        /* Categories: Premium Style */
        .cat-section {
            display: flex;
            overflow-x: auto;
            padding: 25px 15px;
            gap: 20px;
            scrollbar-width: none;
        }

        .cat-bubble {
            display: flex;
            flex-direction: column;
            align-items: center;
            min-width: 70px;
        }

        .cat-icon-wrapper {
            width: 65px;
            height: 65px;
            background: white;
            border-radius: 22px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 28px;
            box-shadow: 0 8px 15px rgba(0,0,0,0.05);
            transition: 0.3s;
        }

        .cat-bubble:hover .cat-icon-wrapper {
            transform: translateY(-5px);
            background: var(--primary);
            color: white;
        }

        /* Featured Store Card */
        .featured-section {
            padding: 0 15px;
        }

        .premium-card {
            background: linear-gradient(135deg, #1e1e2f 0%, #3a3a5a 100%);
            border-radius: 25px;
            padding: 25px;
            color: white;
            position: relative;
            overflow: hidden;
            box-shadow: 0 15px 35px rgba(30,30,47,0.3);
        }

        .premium-card::after {
            content: 'π';
            position: absolute;
            right: -20px;
            bottom: -30px;
            font-size: 150px;
            opacity: 0.1;
            color: var(--accent);
        }

        /* Shops Grid: The "Incredible" List */
        .shop-grid {
            padding: 20px 15px;
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 15px;
        }

        .modern-shop-card {
            background: white;
            border-radius: 20px;
            padding: 15px;
            position: relative;
            border: 1px solid #f0f0f0;
            transition: 0.3s;
        }

        .shop-badge {
            position: absolute;
            top: 10px;
            left: 10px;
            background: var(--accent);
            padding: 4px 8px;
            border-radius: 10px;
            font-size: 10px;
            font-weight: bold;
        }

        /* Futuristic Bottom Nav */
        .floating-nav {
            position: fixed;
            bottom: 20px;
            left: 50%;
            transform: translateX(-50%);
            width: 90%;
            max-width: 400px;
            background: rgba(18, 18, 18, 0.95);
            backdrop-filter: blur(15px);
            border-radius: 30px;
            display: flex;
            justify-content: space-around;
            padding: 15px 10px;
            box-shadow: 0 15px 40px rgba(0,0,0,0.3);
        }

        .nav-link {
            color: #777;
            text-decoration: none;
            font-size: 20px;
            transition: 0.3s;
        }

        .nav-link.active {
            color: var(--accent);
            transform: scale(1.2);
        }

        .pi-center {
            width: 60px;
            height: 60px;
            background: linear-gradient(45deg, #ffd700, #ffa500);
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            margin-top: -45px;
            border: 5px solid #f0f2f5;
            color: black;
            font-weight: bold;
            font-size: 24px;
        }
    </style>
</head>
<body>

    <div class="smart-header">
        <div class="user-status">
            <div class="avatar"></div>
            <div>
                <span style="display:block; font-size:12px; opacity:0.6;">مرحباً بك،</span>
                <span style="font-weight:bold;">رائد أعمال Forsale</span>
            </div>
        </div>
        <i class="fas fa-sliders-h" style="font-size:20px;"></i>
    </div>

    <div class="search-wrapper">
        <div class="search-box">
            <i class="fas fa-search" style="color:var(--primary)"></i>
            <span>ماذا تريد أن تشتري بـ Pi اليوم؟</span>
        </div>
    </div>

    <div class="cat-section">
        <div class="cat-bubble"><div class="cat-icon-wrapper">🍔</div><span>مطاعم</span></div>
        <div class="cat-bubble"><div class="cat-icon-wrapper">🛒</div><span>مقاضي</span></div>
        <div class="cat-bubble"><div class="cat-icon-wrapper">💊</div><span>صحة</span></div>
        <div class="cat-bubble"><div class="cat-icon-wrapper">☕</div><span>قهوة</span></div>
        <div class="cat-bubble"><div class="cat-icon-wrapper">🎁</div><span>هدايا</span></div>
    </div>

    <div class="featured-section">
        <div class="premium-card">
            <h2 style="margin:0 0 10px;">عالم Pi بين يديك</h2>
            <p style="font-size:14px; opacity:0.8; margin-bottom:20px;">استخدم عملاتك الآن في أكثر من 500 متجر محلي بأسعار خاصة جداً.</p>
            <button style="background:var(--accent); border:none; padding:10px 20px; border-radius:12px; font-weight:bold;">استكشف العروض</button>
        </div>
    </div>

    <div style="padding: 25px 15px 10px;"><h3 style="margin:0;">أفضل الوجهات</h3></div>

    <div class="shop-grid">
        ${shops.map(shop => `
            <div class="modern-shop-card">
                <div class="shop-badge">خصم ${shop.commission_rate}%</div>
                <div style="font-size:40px; margin-bottom:10px; text-align:center;">🏪</div>
                <div style="font-weight:bold; font-size:14px; text-align:center;">${shop.name}</div>
                <div style="font-size:11px; opacity:0.5; text-align:center; margin-top:5px;">
                    <i class="fas fa-star" style="color:var(--accent)"></i> 4.9 (1.2k)
                </div>
            </div>
        `).join('')}
    </div>

    <nav class="floating-nav">
        <a href="#" class="nav-link active"><i class="fas fa-th-large"></i></a>
        <a href="#" class="nav-link"><i class="fas fa-heart"></i></a>
        <div class="pi-center">π</div>
        <a href="#" class="nav-link"><i class="fas fa-shopping-bag"></i></a>
        <a href="#" class="nav-item nav-link"><i class="fas fa-user-circle"></i></a>
    </nav>

</body>
</html>
        `);
    } catch (err) {
        res.status(500).send("Connection Error: " + err.message);
    }
});

module.exports = app;
