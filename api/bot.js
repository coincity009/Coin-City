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

                // আপনার বটের আসল ইউজারনেম এবং মিনি অ্যাপের শর্ট নেম
                const BOT_USERNAME = "CoincityApp_bot"; 
                const APP_SHORT_NAME = "coincity"; 

                // টেলিগ্রামের নেটিভ ডিরেক্ট লিংক তৈরি (যা সরাসরি মিনি অ্যাপ ওপেন করবে)
                let webAppUrl;
                if (refCode) {
                    webAppUrl = `https://t.me/${BOT_USERNAME}/${APP_SHORT_NAME}?startapp=${refCode}`;
                } else {
                    webAppUrl = `https://t.me/${BOT_USERNAME}/${APP_SHORT_NAME}`;
                }

                // আপনার বটের আসল টোকেন
                const BOT_TOKEN = "8911018141:AAHf_Y6ADoJiK7EctZjEYZ_c1ZNmqqq9m6M"; 

                // ওয়েলকাম মেসেজ
                const messageText = `আয় শুরু করতে Open Coin City App বাটনে ক্লিক করুন ⬇️`;

                // inline_keyboard এ বাটনের টাইপ 'url' দেওয়া হয়েছে যা নেটিভলি অ্যাপ ওপেন করবে
                const replyMarkup = {
                    inline_keyboard: [
                        [
                            { text: 'Open Coin City App', url: webAppUrl }
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
