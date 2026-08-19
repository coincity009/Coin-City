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

                // আপনার AI Studio লাইভ অ্যাপের URL
                const LIVE_APP_BASE_URL = "https://ais-pre-j7cg27jsrp7uqa4qy3tqyo-248705558062.asia-southeast1.run.app";

                // টেলিগ্রামের ভেতর সরাসরি ইন-অ্যাপ ওপেন হওয়ার ডিরেক্ট WebApp লিংক (রেফারেল সহ)
                let directWebAppUrl = LIVE_APP_BASE_URL;
                if (refCode) {
                    directWebAppUrl = `${LIVE_APP_BASE_URL}/?ref=${refCode}`;
                } else if (userId) {
                    directWebAppUrl = `${LIVE_APP_BASE_URL}/?ref=${userId}`;
                }

                // আপনার বটের আসল টোকেন
                const BOT_TOKEN = "8911018141:AAHf_Y6ADoJiK7EctZjEYZ_c1ZNmqqq9m6M"; 

                // ওয়েলকাম মেসেজ
                const messageText = `আয় শুরু করতে Open Coin City App বাটনে ক্লিক করুন ⬇️`;

                // inline_keyboard: web_app ব্যবহারের মাধ্যমে টেলিগ্রামের ভেতরেই তাৎক্ষণিক অ্যাপ ও রেফারেল চালু হবে
                const replyMarkup = {
                    inline_keyboard: [
                        [
                            { 
                                text: 'Open Coin City App', 
                                web_app: { url: directWebAppUrl } 
                            }
                        ],
                        [
                            {
                                text: '👥 বন্ধুদের রেফার করুন (৳২০ বোনাস)',
                                url: `https://t.me/share/url?url=https://t.me/${BOT_USERNAME}?start=${userId}&text=${encodeURIComponent('Coin City অ্যাপে কাজ করে প্রতিদিন টাকা আয় করুন!')}`
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
