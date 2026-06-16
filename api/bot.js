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

                // আপনার Vercel ডোমেইন লিংক
                const myDomain = "https://coin-city.vercel.app/"; 

                let webAppUrl = myDomain;
                if (refCode) {
                    webAppUrl = `${myDomain}?startapp=${refCode}`;
                }

                // আপনার বটের আসল টোকেন
                const BOT_TOKEN = "8911018141:AAHf_Y6ADoJiK7EctZjEYZ_c1ZNmqqq9m6M"; 

                // ১. নিচের কোটেশন চিহ্নের ভেতরে আপনার নিজের লিখে রাখা ওয়েলকাম মেসেজটি পেস্ট করে দিন:
                const messageText = `এখানে আপনার নিজের লিখে রাখা ওয়েলকাম মেসেজটি বসিয়ে দিন। আপনি আপনার সুবিধামতো যেকোনো বাংলা বা ইংরেজি লেখা এখানে দিতে পারেন।`;

                // ২. নিচে শুধুমাত্র আপনার বলা 'Open Coin City App' বাটনটি সেট করা হয়েছে:
                const replyMarkup = {
                    inline_keyboard: [
                        [
                            { text: 'Open Coin City App', web_app: { url: webAppUrl } }
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
