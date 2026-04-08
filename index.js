const express = require('express');
const { createClient } = require('@supabase/supabase-js');
const app = express();
const port = process.env.PORT || 3000;

// ربط السيرفر بقاعدة البيانات باستخدام الرابط اللي حطيناه في Vercel
const supabase = createClient(
    process.env.DATABASE_URL.split('?')[0].replace('postgresql', 'https').replace('5432', ''), 
    process.env.DATABASE_URL.split(':')[2].split('@')[0] // محاولة استخراج المفتاح (سأبسط لك هذا لاحقاً)
);

app.get('/', async (req, res) => {
    // جلب المحلات من قاعدة البيانات
    const { data: shops, error } = await supabase.from('shops').select('*');
    
    if (error) return res.send("خطأ في الاتصال بقاعدة البيانات: " + error.message);

    // تصميم الصفحة (HTML بسيط)
    let html = `
        <dir dir="rtl" style="font-family: Arial; text-align: center; padding: 20px;">
            <h1 style="color: #1a73e8;">لوحة تحكم Forsale-world 🚀</h1>
            <p>مشروع إدارة عمولات Pi Network</p>
            <hr>
            <h2>المحلات المسجلة حالياً:</h2>
            <table border="1" style="width: 100%; border-collapse: collapse;">
                <tr style="background: #f1f1f1;">
                    <th>اسم المحل</th>
                    <th>نسبة العمولة</th>
                    <th>محفظة Pi</th>
                </tr>
    `;

    shops.forEach(shop => {
        html += `
            <tr>
                <td>${shop.name}</td>
                <td>${shop.commission_rate}%</td>
                <td>${shop.pi_wallet}</td>
            </tr>
        `;
    });

    html += `
            </table>
            <br>
            <div style="background: #e8f0fe; padding: 10px; border-radius: 10px;">
                <p>إجمالي العمليات: 0 Pi</p>
                <button onclick="alert('قريباً: إضافة أوردر جديد')">إضافة أوردر جديد</button>
            </div>
        </dir>
    `;

    res.send(html);
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
