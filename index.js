const express = require('express');
const { createClient } = require('@supabase/supabase-js');
const app = express();

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

app.get('/', async (req, res) => {
    try {
        const { data: shops, error } = await supabase.from('shops').select('*');
        if (error) throw error;

        // توليد الكروت لكل محل زي ستايل هنجر ستيشن
        let shopCards = shops.map(shop => `
            <div style="background: white; border-radius: 12px; padding: 15px; margin-bottom: 15px; display: flex; align-items: center; justify-content: space-between; box-shadow: 0 2px 8px rgba(0,0,0,0.05); border: 1px solid #eee;">
                <div style="display: flex; align-items: center;">
                    <div style="width: 50px; height: 50px; background: #f0f7ff; border-radius: 10px; display: flex; align-items: center; justify-content: center; margin-left: 15px;">
                        <span style="font-size: 24px;">🏪</span>
                    </div>
                    <div style="text-align: right;">
                        <h3 style="margin: 0; color: #333; font-size: 16px;">${shop.name}</h3>
                        <p style="margin: 5px 0 0; color: #666; font-size: 13px;">الحالة: <span style="color: #28a745;">نشط</span></p>
                    </div>
                </div>
                <div style="text-align: center; background: #fff9f0; padding: 8px 12px; border-radius: 8px; border: 1px solid #ffeeba;">
                    <span style="display: block; color: #856404; font-size: 11px;">العمولة</span>
                    <span style="font-weight: bold; color: #d48806; font-size: 18px;">${shop.commission_rate}%</span>
                </div>
            </div>
        `).join('');

        res.send(`
            <!DOCTYPE html>
            <html lang="ar">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Forsale Dashboard</title>
                <style>
                    body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f8f9fb; margin: 0; padding: 0; }
                    .header { background: #1a73e8; color: white; padding: 20px; text-align: center; border-radius: 0 0 25px 25px; box-shadow: 0 4px 12px rgba(26, 115, 232, 0.2); }
                    .container { padding: 20px; max-width: 500px; margin: auto; }
                    .stats-container { display: grid; grid-template-columns: 1fr 1fr; gap: 15px; margin-top: -30px; margin-bottom: 25px; }
                    .stat-card { background: white; padding: 15px; border-radius: 15px; text-align: center; box-shadow: 0 4px 10px rgba(0,0,0,0.05); }
                    .stat-value { display: block; font-size: 20px; font-weight: bold; color: #1a73e8; }
                    .stat-label { font-size: 12px; color: #777; }
                    .action-btn { background: #ffc107; color: #000; border: none; width: 100%; padding: 15px; border-radius: 12px; font-weight: bold; font-size: 16px; margin-bottom: 20px; cursor: pointer; box-shadow: 0 4px 10px rgba(255, 193, 7, 0.3); }
                </style>
            </head>
            <body dir="rtl">
                <div class="header">
                    <h1 style="margin:0; font-size: 22px;">Forsale Dashboard 🚀</h1>
                    <p style="margin: 5px 0 20px; opacity: 0.9;">إدارة المتاجر والعمولات</p>
                </div>
                
                <div class="container">
                    <div class="stats-container">
                        <div class="stat-card">
                            <span class="stat-value">${shops.length}</span>
                            <span class="stat-label">المتاجر</span>
                        </div>
                        <div class="stat-card">
                            <span class="stat-value">Pi 0.00</span>
                            <span class="stat-label">إجمالي الأرباح</span>
                        </div>
                    </div>

                    <button class="action-btn">➕ إضافة طلب جديد (قريباً)</button>

                    <h2 style="font-size: 18px; color: #444; margin-bottom: 15px;">قائمة المتاجر المتعاقدة</h2>
                    ${shopCards}
                </div>
            </body>
            </html>
        `);
    } catch (err) {
        res.status(500).send("خطأ في الربط: " + err.message);
    }
});

module.exports = app;
