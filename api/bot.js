const https = require('https');

module.exports = async (req, res) => {
    if (req.method !== 'POST') {
        return res.status(200).send('OK');
    }

    const { message } = req.body || {};
    if (!message || !message.text) {
        return res.status(200).send('OK');
    }

    // আপনার Bot Token
    const botToken = "8911018141:AAHf_Y6ADoJiK7EctZjEYZ_c1ZNmqqq9m6M"; 
    const text = message.text;
    const chatId = message.chat.id;

    if (text.startsWith('/start')) {
        const parts = text.split(' ');
        const refCode = parts.length > 1 ? parts[1] : null;

        // আপনার Vercel ডোমেইন
        let webAppUrl = `https://coin-city.vercel.app/`; 
        
        if (refCode) {
            webAppUrl += `?startapp=${refCode}`;
        }

        const replyMessage = {
            chat_id: chatId,
            text: `স্বাগতম Coin City অ্যাপে! 🌟\n\nপ্রতিদিন স্পন্সর লিংক ভিজিট এবং বন্ধুদের রেফার করে আনলিমিটেড টাকা ইনকাম করুন। অ্যাপ ওপেন করতে নিচের বাটনে ক্লিক করুন।`,
            reply_markup: {
                inline_keyboard: [
                    [
                        {
                            text: "🚀 Open Mini App",
                            web_app: {
                                url: webAppUrl
                            }
                        }
                    ]
                ]
            }
        };

        await sendTelegramMessage(botToken, replyMessage);
    }

    return res.status(200).send('OK');
};

function sendTelegramMessage(token, payload) {
    return new Promise((resolve) => {
        const data = JSON.stringify(payload);
        const options = {
            hostname: 'api.telegram.org',
            port: 443,
            path: `/bot${token}/sendMessage`,
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Content-Length': data.length
            }
        };

        const req = https.request(options, (res) => {
            res.on('data', () => {});
            res.on('end', () => resolve(true));
        });

        req.on('error', () => resolve(false));
        req.write(data);
        req.end();
    });
}
