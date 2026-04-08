const express = require('express');
const { createClient } = require('@supabase/supabase-js');
const app = express();

// استخراج البيانات من DATABASE_URL بشكل آمن لربط Supabase
const dbUrl = process.env.DATABASE_URL;

// فك تشفير الرابط لاستخراج الـ URL والـ Key
const supabaseUrl = 'https://' + dbUrl.split('@')[1].split(':')[0];
const supabaseKey = dbUrl.split(':')[2].split('@')[0];
const supabase = createClient(supabaseUrl, supabaseKey);

app.get('/', async (req, res) => {
    try {
        // جلب المحلات من قاعدة البيانات (جدول shops الذي أنشأناه)
        const { data: shops, error } = await supabase.from('shops').select('*');
        
        if (error) throw error;

        // تصميم واجهة بسيطة لعرض النتائج
        let html = `
            <div dir="rtl" style="font-family: Arial, sans-serif; text-align: center; padding: 20px; background-color: #f4f7f6; min-height: 100vh;">
                <div style="background: white; max-width: 600px; margin: auto; padding: 20px; border-radius: 15px; box-shadow: 0 4px 15px rgba(0,0,0,0.1);">
                    <h1 style="color: #1a73e8; margin-bottom: 10px;">لوحة تحكم Forsale 🚀</h1>
                    <p style="color: #555;">نظام إدارة عمولات Pi Network</p>
                    <div style="background: #e6fffa; color: #2c7a7b; padding: 10px; border-radius: 8px; margin-bottom: 20px; font-weight: bold;">
                        ✅ الاتصال بـ Supabase فعال
                    </div>
                    <hr style="border: 0; border-top: 1px solid #eee; margin-bottom: 20px;">
                    
                    <h2 style="text-align: right; color: #333;">المحلات المشتركة:</h2>
                    <table border="0" style="width: 100%; border-collapse: collapse; text-align: right;">
                        <thead>
                            <tr style="background: #f8f9fa;">
                                <th style="padding: 12px; border-bottom: 2px solid #ddd;">اسم المحل</th>
                                <th style="padding: 12px; border-bottom: 2px solid #ddd;">العمولة</th>
                            </tr>
                        </thead>
                        <tbody>
        `;

        shops.forEach(shop => {
            html += `
                <tr style="border-bottom: 1px solid #eee;">
                    <td style="padding: 12px;">${shop.name}</td>
                    <td style="padding: 12px; font-weight: bold; color: #2b6cb0;">${shop.commission_rate}%</td>
                </tr>
            `;
        });

        html += `
                        </tbody>
                    </table>
                    <br>
                    <p style="font-size: 12px; color: #aaa;">Forsale-world @ 2026</p>
                </div>
            </div>
        `;

        res.status(200).send(html);

    } catch (err) {
        // عرض الخطأ بشكل مفهوم لو حصلت مشكلة في الربط
        res.status(500).send(`
            <div dir="rtl" style="text-align: center; padding: 50px; font-family: sans-serif;">
                <h2 style="color: red;">عذراً، حدث خطأ في النظام</h2>
                <p>تأكد من إعدادات DATABASE_URL في Vercel</p>
                <code style="background: #eee; padding: 5px;">${err.message}</code>
            </div>
        `);
    }
});

module.exports = app;
