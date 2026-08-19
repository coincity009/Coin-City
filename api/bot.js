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

                // আপনার AI Studio লাইভ অ্যাপের ডিরেক্ট লিঙ্ক
                const BASE_APP_URL = "https://ais-pre-j7cg27jsrp7uqa4qy3tqyo-248705558062.asia-southeast1.run.app";

                // রেফারেল আইডি সহ ডিরেক্ট লিংক (টেলিগ্রামে ১০০% নিশ্চিত ওপেন হবে)
                let directAppUrl = BASE_APP_URL;
                if (refCode) {
                    directAppUrl = `${BASE_APP_URL}/?ref=${refCode}`;
                } else if (userId) {
                    directAppUrl = `${BASE_APP_URL}/?ref=${userId}`;
                }

                // আপনার বটের আসল টোকেন
                const BOT_TOKEN = "8911018141:AAHf_Y6ADoJiK7EctZjEYZ_c1ZNmqqq9m6M"; 

                // ওয়েলকাম মেসেজ
                const messageText = `আয় শুরু করতে Open Coin City App বাটনে ক্লিক করুন ⬇️`;

                // বাটনে ডিরেক্ট HTTPS লিঙ্ক দেওয়া হয়েছে যাতে কোনো 404 বা Not Found এরর না আসে
                const replyMarkup = {
                    inline_keyboard: [
                        [
                            { 
                                text: '🚀 Open Coin City App', 
                                url: directAppUrl 
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
