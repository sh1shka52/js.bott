const { Client, LocalAuth, MessageMedia } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const cron = require('node-cron');
const fs = require('fs');
const path = require('path');

//cliente do WhatsApp com autenticação local
const client = new Client({
    authStrategy: new LocalAuth(),
    puppeteer: { args: ['--no-sandbox', 
                        '--disable-setuid-sandbox',
                       '--disable-dev-shm-usage',
                       '--disable-accelerated-2d-canvas',
                       '--no-first-run',
                       '--no-zygote',
                       '--disable-gpu',
                       '--single-process'],
               executablePath: '/usr/bin/chromium-browser'}
});

// qrcode para autenticação
client.on('qr', qr => {
    qrcode.generate(qr, {small: true});
    console.log('Scan the QR code above to authenticate.');
});

//pronto para uso
client.on('ready', async () => {
    console.log('Client started and ready to use!');

    const group1 = "120363419053453697@g.us";

    const group2 = "120363419627137939@g.us";

    const group1Dates = [7,9,18,21,23,25,28,30]
    const group2Dates = [8,17,20,22,24,27,29]

    cron.schedule('50 6 * * *', async () => {
        const day = new Date().getDate();
        if (group1Dates.includes(day)) {
            const chat = await client.getChatById(group1);  
            chat.sendMessage("Ново садовая проснулась");
        } 
    });

    cron.schedule('20 7 * * *', async () => {
        const day = new Date().getDate();
        if (group1Dates.includes(day)) {
            const chat = await client.getChatById(group1);  
            chat.sendMessage("Ново садовая вышла");
        }
    });

    cron.schedule('50 7 * * *', async () => {
        const day = new Date().getDate();
        if (group1Dates.includes(day)) {
            const chat = await client.getChatById(group1);  
            chat.sendMessage("Ново садовая открыта");
        }
    });

    cron.schedule('10 20 * * *', async () => {
        const day = new Date().getDate();
        if (group2Dates.includes(day)) {
            const chat = await client.getChatById(group1);  
            chat.sendMessage("Ново садовая");
        }
    });


    cron.schedule('5 21 * * *', async () => {
        const mediaPath = path.join(__dirname, 'photo', 'dou.jpg')
        const media = MessageMedia.fromFilePath(mediaPath)


        const day = new Date().getDate();
        if (group1Dates.includes(day)) { 
            const chat = await client.getChatById(group2); 
            chat.sendMessage(media, { caption: "Ново садовая"});
        }
    });

});

client.initialize();
