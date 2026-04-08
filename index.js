const express = require('express');
const { createClient } = require('@supabase/supabase-js');
const app = express();

// استخراج البيانات من DATABASE_URL بشكل آمن
const dbUrl = process.env.DATABASE_URL;

// هنا بنجهز الرابط والمفتاح لـ Supabase
// ملاحظة: تأكد أنك وضعت DATABASE_URL في إعدادات Vercel
const supabaseUrl = 'https://' + dbUrl.split('@')[1].split(':')[0];
const supabaseKey = dbUrl.split(':')[2].split('@')[0];
const supabase = createClient(supabaseUrl, supabaseKey);

app.get('/', async (req, res) => {
    try {
        // محاولة جلب البيانات من جدول المحلات
        const { data: shops, error } = await supabase.from('shops').select('*');
        
        if (error) throw error;

        let html = `
            <div dir="rtl" style="font-family: sans-serif; text-align: center; padding: 20px;">
                <h1 style="color: #1a73e8;">لوحة تحكم Forsale 🚀</h1>
                <p>الربط مع Supabase تم بنجاح ✅</p>
                <hr>
                <table border="1" style="width: 100%; border-collapse: collapse; margin-top: 20px;">
                    <tr style="background: #f8f9fa;">
                        <th style="padding: 10px;">اسم المحل</th>
                        <th>العمولة</th>
                    </tr>
        `;

        shops.forEach(shop => {
            html += `
                <tr>
                    <td style="padding: 10px;">${shop.name}</td>
                    <td>${shop.commission_rate}%</td>
                </tr>
            `;
        });

        html += `</table></div>`;
        res.status(200).send(html);

    } catch (err) {
        res.status(500).send("خطأ في الربط: " + err.message);
    }
});

// Vercel يحتاج تصدير التطبيق
module.exports = app;
