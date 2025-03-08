const express = require('express');
const axios = require('axios');
const cors = require('cors');
require('dotenv').config(); // Загрузка переменных окружения

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Конфигурация Telegram из переменных окружения
const BOT_TOKEN = process.env.BOT_TOKEN;
const CHAT_ID = process.env.CHAT_ID;


// API-эндпоинт для отправки сообщений
app.post('/api/send-message', async (req, res) => {
  try {
    const { service, fullName, phone, telegram } = req.body;
    
    if (!service || !fullName || !phone || !telegram) {
      return res.status(400).json({ 
        success: false, 
        message: 'Все поля обязательны' 
      });
    }
    
    const message = `
🔔 *Новая заявка на подключение подписки*

*Услуга:* ${service}
*Имя:* ${fullName}
*Телефон:* +7 ${phone}
*Telegram:* @${telegram}

_Отправлено с сайта: ${req.headers.origin || 'неизвестно'}_
    `;
    
    const response = await axios.post(
      `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`,
      {
        chat_id: CHAT_ID,
        text: message,
        parse_mode: 'Markdown'
      }
    );
    
    if (response.data.ok) {
      return res.json({ success: true });
    } else {
      throw new Error(response.data.description || 'Ошибка при отправке');
    }
  } catch (error) {
    console.error('Ошибка отправки в Telegram:', error);
    return res.status(500).json({ 
      success: false, 
      message: 'Ошибка при отправке сообщения'
    });
  }
});

app.listen(PORT, () => {
  console.log(`Сервер запущен на порту ${PORT}`);
});