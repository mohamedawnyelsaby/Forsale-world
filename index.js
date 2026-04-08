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
    <title>Forsale Next-Gen</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700&family=Cairo:wght@400;700&display=swap');

        :root {
            --neon-gold: #ffcf00;
            --neon-purple: #9d50bb;
            --dark-bg: #0a0b10;
            --card-bg: rgba(255, 255, 255, 0.05);
        }

        body {
            background-color: var(--dark-bg);
            background-image: 
                radial-gradient(circle at 0% 0%, rgba(157, 80, 187, 0.15) 0%, transparent 40%),
                radial-gradient(circle at 100% 100%, rgba(255, 207, 0, 0.1) 0%, transparent 40%);
            color: #fff;
            font-family: 'Cairo', sans-serif;
            margin: 0;
            padding-bottom: 100px;
            overflow-x: hidden;
        }

        /* Hero Glitch Header */
        .hero-header {
            padding: 40px 20px 20px;
            text-align: center;
        }

        .logo-text {
            font-family: 'Orbitron', sans-serif;
            font-size: 32px;
            font-weight: 700;
            background: linear-gradient(to right, var(--neon-gold), #fff);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            text-shadow: 0 0 20px rgba(255, 207, 0, 0.5);
        }

        /* Glass Search */
        .search-container {
            margin: 20px;
            background: var(--card-bg);
            border: 1px solid rgba(255, 255, 255, 0.1);
            border-radius: 50px;
            padding: 15px 25px;
            backdrop-filter: blur(10px);
            display: flex;
            align-items: center;
            gap: 15px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.5);
        }

        .search-container i { color: var(--neon-gold); }
        .search-container span { color: rgba(255,255,255,0.5); font-size: 14px; }

        /* Animated Horizontal Categories */
        .category-scroll {
            display: flex;
            overflow-x: auto;
            padding: 10px 20px;
            gap: 20px;
            scrollbar-width: none;
        }

        .cat-item {
            min-width: 85px;
            height: 110px;
            background: var(--card-bg);
            border-radius: 24px;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            border: 1px solid rgba(255, 255, 255, 0.05);
            transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }

        .cat-item:hover {
            background: rgba(255, 207, 0, 0.1);
            border-color: var(--neon-gold);
            transform: scale(1.1) rotate(3deg);
        }

        .cat-icon {
            font-size: 30px;
            margin-bottom: 8px;
            filter: drop-shadow(0 0 10px rgba(255,255,255,0.3));
        }

        /* High-End Shop Cards */
        .shop-container {
            padding: 20px;
        }

        .shop-card-ultra {
            background: linear-gradient(160deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.01) 100%);
            border-radius: 30px;
            padding: 2px; /* For the border gradient effect */
            margin-bottom: 25px;
            position: relative;
            overflow: hidden;
            background: linear-gradient(45deg, var(--neon-purple), var(--neon-gold));
        }

        .card-inner {
            background: #12141d;
            border-radius: 28px;
            padding: 20px;
            display: flex;
            align-items: center;
            gap: 20px;
        }

        .shop-img-box {
            width: 80px;
            height: 80px;
            border-radius: 20px;
            background: #1a1d29;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 40px;
            box-shadow: inset 0 0 15px rgba(0,0,0,0.5);
        }

        .shop-info h3 { margin: 0; font-size: 18px; letter-spacing: 0.5px; }
        .shop-status { color: var(--neon-gold); font-size: 12px; font-weight: bold; margin-top: 5px; }

        .reward-badge {
            position: absolute;
            top: 0;
            left: 30px;
            background: var(--neon-gold);
            color: #000;
            padding: 5px 15px;
            border-radius: 0 0 15px 15px;
            font-size: 11px;
            font-weight: 800;
            box-shadow: 0 5px 15px rgba(255, 207, 0, 0.3);
        }

        /* Floating Futuristic Nav */
        .navbar-ultra {
            position: fixed;
            bottom: 25px;
            left: 50%;
            transform: translateX(-50%);
            width: 85%;
            height: 70px;
            background: rgba(18, 20, 29, 0.8);
            backdrop-filter: blur(20px);
            border-radius: 25px;
            border: 1px solid rgba(255,255,255,0.1);
            display: flex;
            justify-content: space-around;
            align-items: center;
            z-index: 1000;
        }

        .nav-link { color: rgba(255,255,255,0.3); font-size: 22px; transition: 0.3s; }
        .nav-link.active { color: var(--neon-gold); text-shadow: 0 0 15px var(--neon-gold); }

        .pi-main-btn {
            width: 65px;
            height: 65px;
            background: linear-gradient(135deg, var(--neon-gold) 0%, #ffa500 100%);
            border-radius: 50%;
            margin-top: -50px;
            display: flex;
            align-items: center;
            justify-content: center;
            box-shadow: 0 10px 25px rgba(255, 207, 0, 0.4);
            border: 5px solid var(--dark-bg);
            animation: pulse 2s infinite;
        }

        @keyframes pulse {
            0% { transform: scale(1); box-shadow: 0 0 0 0 rgba(255, 207, 0, 0.7); }
            70% { transform: scale(1.05); box-shadow: 0 0 0 15px rgba(255, 207, 0, 0); }
            100% { transform: scale(1); box-shadow: 0 0 0 0 rgba(255, 207, 0, 0); }
        }

    </style>
</head>
<body>

    <div class="hero-header">
        <div class="logo-text">FORSALE</div>
        <p style="font-size: 12px; color: rgba(255,255,255,0.4); margin-top: 5px;">THE FUTURE OF PI COMMERCE</p>
    </div>

    <div class="search-container">
        <i class="fas fa-bolt"></i>
        <span>ابحث عن السحر القادم...</span>
    </div>

    <div class="category-scroll">
        <div class="cat-item"><span class="cat-icon">🍔</span><span style="font-size:11px">Elite Food</span></div>
        <div class="cat-item"><span class="cat-icon">⚡</span><span style="font-size:11px">Flash Sales</span></div>
        <div class="cat-item"><span class="cat-icon">💎</span><span style="font-size:11px">Luxury</span></div>
        <div class="cat-item"><span class="cat-icon">💊</span><span style="font-size:11px">Health</span></div>
        <div class="cat-item"><span class="cat-icon">🕶️</span><span style="font-size:11px">Fashion</span></div>
    </div>

    <div class="shop-container">
        <h2 style="font-size: 20px; margin-bottom: 25px; padding-right: 10px; border-right: 4px solid var(--neon-gold);">أقرب العروض منك</h2>
        
        ${shops.map(shop => `
            <div class="shop-card-ultra">
                <div class="reward-badge">UP TO ${shop.commission_rate}% PI BACK</div>
                <div class="card-inner">
                    <div class="shop-img-box">🏪</div>
                    <div class="shop-info">
                        <h3>${shop.name}</h3>
                        <div class="shop-status">
                            <i class="fas fa-circle-check"></i> Verified Merchant
                        </div>
                        <div style="font-size: 11px; color: rgba(255,255,255,0.4); margin-top: 8px;">
                            <i class="far fa-clock"></i> 10-15 Min Delivery
                        </div>
                    </div>
                </div>
            </div>
        `).join('')}
    </div>

    <div class="navbar-ultra">
        <a href="#" class="nav-link active"><i class="fas fa-ghost"></i></a>
        <a href="#" class="nav-link"><i class="fas fa-compass"></i></a>
        <div class="pi-main-btn">
            <img src="https://minepi.com/wp-content/uploads/2023/10/Pi-Symbol-Gold.png" width="35">
        </div>
        <a href="#" class="nav-link"><i class="fas fa-wallet"></i></a>
        <a href="#" class="nav-link"><i class="fas fa-cog"></i></a>
    </div>

</body>
</html>
        `);
    } catch (err) {
        res.status(500).send("System Error: " + err.message);
    }
});

module.exports = app;
