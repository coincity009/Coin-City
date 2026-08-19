export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(200).send('Coin City Bot is running!');
    }

    try {
        const body = req.body;
        
        if (body && body.message) {
            const chatId = body.message.chat.id;
            const text = body.message.text || '';
            const userId = body.message.from?.id ? body.message.from.id.toString() : '';

            // ইউজার যদি /start কমান্ড দেয়
            if (text.startsWith('/start')) {
                // মেসেজ থেকে রেফার কোড আলাদা করা
                const parts = text.split(' ');
                const refCode = parts.length > 1 ? parts[1].trim() : '';

                // আপনার বটের আসল ইউজারনেম
                const BOT_USERNAME = "CoincityApp_bot"; 

                // আপনার AI Studio পাবলিক লাইভ অ্যাপ লিঙ্ক
                const PUBLIC_APP_URL = "https://ais-pre-j7cg27jsrp7uqa4qy3tqyo-248705558062.asia-southeast1.run.app";

                // রেফারেল আইডি সহ WebApp URL
                let webAppUrl = PUBLIC_APP_URL;
                if (refCode) {
                    webAppUrl = `${PUBLIC_APP_URL}/?ref=${refCode}`;
                } else if (userId) {
                    webAppUrl = `${PUBLIC_APP_URL}/?ref=${userId}`;
                }

                // আপনার বটের আসল টোকেন
                const BOT_TOKEN = "8911018141:AAHf_Y6ADoJiK7EctZjEYZ_c1ZNmqqq9m6M"; 

                // টেলিগ্রামের বট মেনু বাটন লাইভ URL-এর সাথে সেট করা
                try {
                    await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/setChatMenuButton`, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                            chat_id: chatId,
                            menu_button: {
                                type: 'web_app',
                                text: 'Open App',
                                web_app: { url: webAppUrl }
                            }
                        })
                    });
                } catch (e) {
                    console.warn("Menu button error:", e);
                }

                // ওয়েলকাম মেসেজ
                const messageText = `🎉 *Coin City মিনি অ্যাপে স্বাগতম!*\n\nটেলিগ্রামের ভেতরে সরাসরি কাজ করতে নিচের *Open Coin City App* বাটনে চাপুন ⬇️`;

                // বাটনে পাবলিক WebApp লিংক
                const replyMarkup = {
                    inline_keyboard: [
                        [
                            { 
                                text: '🚀 Open Coin City App', 
                                web_app: { url: webAppUrl } 
                            }
                        ],
                        [
                            { 
                                text: '👥 বন্ধুদের রেফার করুন (৳১০০ বোনাস)', 
                                url: `https://t.me/share/url?url=https://t.me/${BOT_USERNAME}?start=${userId}&text=${encodeURIComponent('Coin City অ্যাপে কাজ করে প্রতিদিন টাকা আয় করুন! প্রতি রেফারে ১০০ টাকা বোনাস!')}` 
                            }
                        ]
                    ]
                };

                // টেলিগ্রাম API-তে রিকোয়েস্ট পাঠানো
                const telegramUrl = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`;
                await fetch(telegramUrl, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        chat_id: chatId,
                        text: messageText,
                        parse_mode: 'Markdown',
                        reply_markup: replyMarkup
                    })
                });
            }
        }
        return res.status(200).send('OK');
    } catch (error) {
        console.error("Error: ", error);
        return res.status(500).send('Error');
    }
}
