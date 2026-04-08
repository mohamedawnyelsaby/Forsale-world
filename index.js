const express = require('express');
const { createClient } = require('@supabase/supabase-js');
const app = express();

// جلب المفاتيح من بيئة العمل
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;

// نظام فحص قبل التشغيل
if (!supabaseUrl || !supabaseKey) {
    console.error("Missing Supabase Environment Variables");
}

const supabase = createClient(supabaseUrl || '', supabaseKey || '');

app.get('/', async (req, res) => {
    // التأكد من وجود المفاتيح قبل طلب البيانات
    if (!supabaseUrl || !supabaseKey) {
        return res.status(500).send("خطأ: مفاتيح الربط (Environment Variables) غير مكتملة في إعدادات Vercel.");
    }

    try {
        const { data: shops, error } = await supabase.from('shops').select('*');
        
        if (error) throw error;

        let rows = shops && shops.length > 0 
            ? shops.map(shop => `
                <tr style="border-bottom: 1px solid #ddd;">
                    <td style="padding: 15px;">${shop.name}</td>
                    <td style="padding: 15px; font-weight: bold; color: #1a73e8;">${shop.commission_rate}%</td>
                </tr>`).join('')
            : '<tr><td colspan="2" style="padding:20px;">لا توجد محلات مسجلة حالياً</td></tr>';

        res.send(`
            <div dir="rtl" style="font-family: Arial, sans-serif; text-align: center; padding: 30px; background: #f4f7f6; min-height: 100vh;">
                <div style="background: white; max-width: 500px; margin: auto; padding: 20px; border-radius: 15px; box-shadow: 0 5px 15px rgba(0,0,0,0.1);">
                    <h1 style="color: #333; margin-bottom: 20px;">لوحة تحكم Forsale 🚀</h1>
                    <table border="0" style="width: 100%; border-collapse: collapse; text-align: right;">
                        <tr style="background: #1a73e8; color: white;">
                            <th style="padding: 12px;">المحل</th>
                            <th style="padding: 12px;">العمولة</th>
                        </tr>
                        ${rows}
                    </table>
                    <p style="margin-top: 20px; color: #888; font-size: 12px;">تحديث مباشر من قاعدة البيانات ✅</p>
                </div>
            </div>
        `);
    } catch (err) {
        res.status(500).send(`
            <div dir="rtl" style="padding: 20px; text-align: center;">
                <h2 style="color: red;">خطأ في الاتصال بقاعدة البيانات</h2>
                <p>التفاصيل: ${err.message}</p>
                <p>تأكد أن جدول 'shops' موجود في Supabase وأن المفاتيح صحيحة.</p>
            </div>
        `);
    }
});

module.exports = app;
