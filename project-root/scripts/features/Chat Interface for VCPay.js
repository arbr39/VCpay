// HTML структура
<div class="chat-container">
  <div class="chat-header">
    <div class="manager-status">
      <span class="status-dot online"></span>
      <span class="status-text">Менеджеры онлайн</span>
    </div>
    <h3>Поддержка клиентов VCPay</h3>
  </div>
  
  <div class="chat-messages" id="chat-messages">
    <!-- Сообщения будут добавляться здесь -->
  </div>
  
  <div class="chat-input">
    <textarea id="message-input" placeholder="Введите сообщение..."></textarea>
    <button id="send-button">
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <line x1="22" y1="2" x2="11" y2="13"></line>
        <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
      </svg>
    </button>
  </div>
</div>

// CSS стили
.chat-container {
  width: 350px;
  height: 500px;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 5px 30px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  background-color: #fff;
  font-family: Arial, sans-serif;
}

.chat-header {
  padding: 15px;
  background: linear-gradient(135deg, #3498db, #2980b9);
  color: white;
  text-align: center;
}

.manager-status {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 5px;
}

.status-dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  margin-right: 5px;
}

.status-dot.online {
  background-color: #2ecc71;
  box-shadow: 0 0 5px #2ecc71;
}

.status-dot.offline {
  background-color: #e74c3c;
}

.chat-messages {
  flex: 1;
  padding: 15px;
  overflow-y: auto;
  background-color: #f8f9fa;
}

.message {
  margin-bottom: 15px;
  max-width: 80%;
  padding: 10px 15px;
  border-radius: 15px;
  position: relative;
  animation: fadeIn 0.3s ease-out;
}

.message.user {
  background-color: #3498db;
  color: white;
  margin-left: auto;
  border-bottom-right-radius: 5px;
}

.message.manager {
  background-color: #e6e6e6;
  color: #333;
  margin-right: auto;
  border-bottom-left-radius: 5px;
}

.typing-indicator {
  display: flex;
  align-items: center;
  padding: 10px 15px;
  background-color: #e6e6e6;
  border-radius: 15px;
  margin-bottom: 15px;
  max-width: 100px;
  margin-right: auto;
  border-bottom-left-radius: 5px;
}

.typing-indicator span {
  width: 8px;
  height: 8px;
  margin: 0 2px;
  background-color: #888;
  border-radius: 50%;
  display: inline-block;
  opacity: 0.4;
}

.typing-indicator span:nth-child(1) {
  animation: typing 1s infinite;
}

.typing-indicator span:nth-child(2) {
  animation: typing 1s infinite 0.2s;
}

.typing-indicator span:nth-child(3) {
  animation: typing 1s infinite 0.4s;
}

@keyframes typing {
  0% { opacity: 0.4; transform: translateY(0); }
  50% { opacity: 1; transform: translateY(-5px); }
  100% { opacity: 0.4; transform: translateY(0); }
}

.chat-input {
  display: flex;
  padding: 10px;
  background-color: #fff;
  border-top: 1px solid #e6e6e6;
}

.chat-input textarea {
  flex: 1;
  border: none;
  border-radius: 20px;
  padding: 10px 15px;
  background-color: #f1f1f1;
  resize: none;
  outline: none;
  font-family: Arial, sans-serif;
  max-height: 100px;
}

.chat-input button {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: #3498db;
  color: white;
  border: none;
  margin-left: 10px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.3s;
}

.chat-input button:hover {
  background-color: #2980b9;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

// JavaScript код
document.addEventListener('DOMContentLoaded', function() {
  const chatMessages = document.getElementById('chat-messages');
  const messageInput = document.getElementById('message-input');
  const sendButton = document.getElementById('send-button');
  const statusDot = document.querySelector('.status-dot');
  const statusText = document.querySelector('.status-text');
  
  // Соединение с WebSocket для чата (заглушка)
  let isConnected = true;
  let typingTimeout = null;
  
  // Проверка статуса менеджеров
  function checkManagerStatus() {
    // Здесь можно реализовать проверку через API/WebSocket
    // Для примера используем случайное значение
    const online = Math.random() > 0.3; // 70% вероятность, что менеджеры онлайн
    
    if (online) {
      statusDot.classList.remove('offline');
      statusDot.classList.add('online');
      statusText.textContent = 'Менеджеры онлайн';
    } else {
      statusDot.classList.remove('online');
      statusDot.classList.add('offline');
      statusText.textContent = 'Менеджеры недоступны';
    }
    
    return online;
  }
  
  // Функция для добавления сообщения в чат
  function addMessage(text, isUser = false) {
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('message');
    messageDiv.classList.add(isUser ? 'user' : 'manager');
    messageDiv.textContent = text;
    
    chatMessages.appendChild(messageDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }
  
  // Функция для показа индикатора печатания
  function showTypingIndicator() {
    const typingDiv = document.createElement('div');
    typingDiv.classList.add('typing-indicator');
    typingDiv.id = 'typing-indicator';
    
    for (let i = 0; i < 3; i++) {
      const dot = document.createElement('span');
      typingDiv.appendChild(dot);
    }
    
    chatMessages.appendChild(typingDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }
  
  // Функция для скрытия индикатора печатания
  function hideTypingIndicator() {
    const typingDiv = document.getElementById('typing-indicator');
    if (typingDiv) {
      typingDiv.remove();
    }
  }
  
  // Функция для автоматического ответа (имитация работы менеджера)
  function autoReply(userMessage) {
    if (!isConnected) return;
    
    // Показываем индикатор печатания
    showTypingIndicator();
    
    // Имитация задержки печатания
    const replyDelay = 1000 + Math.random() * 2000; // от 1 до 3 секунд
    
    clearTimeout(typingTimeout);
    typingTimeout = setTimeout(() => {
      hideTypingIndicator();
      
      // Простая логика ответов
      let reply = '';
      
      if (userMessage.toLowerCase().includes('привет')) {
        reply = 'Здравствуйте! Чем я могу вам помочь сегодня?';
      } else if (userMessage.toLowerCase().includes('скидк')) {
        reply = 'Да, у нас есть система скидок. Вы можете попробовать колесо скидок на главной странице!';
      } else if (userMessage.toLowerCase().includes('перевод') || userMessage.toLowerCase().includes('оплат')) {
        reply = 'Платежи проходят через защищенную систему VCPay. Обычно перевод занимает от 1 до 3 минут.';
      } else if (userMessage.toLowerCase().includes('проблем') || userMessage.toLowerCase().includes('ошибк')) {
        reply = 'Извините за неудобства. Пожалуйста, опишите проблему подробнее, и мы постараемся помочь.';
      } else {
        reply = 'Спасибо за ваше сообщение. Чем еще я могу помочь?';
      }
      
      addMessage(reply, false);
    }, replyDelay);
  }
  
  // Инициализация статуса при загрузке
  checkManagerStatus();
  
  // Периодическая проверка статуса (каждые 30 секунд)
  setInterval(checkManagerStatus, 30000);
  
  // Приветственное сообщение
  setTimeout(() => {
    showTypingIndicator();
    
    setTimeout(() => {
      hideTypingIndicator();
      addMessage('Здравствуйте! Я онлайн-консультант VCPay. Чем я могу вам помочь?', false);
    }, 1500);
  }, 1000);
  
  // Отправка сообщения по нажатию на кнопку
  sendButton.addEventListener('click', function() {
    const message = messageInput.value.trim();
    
    if (message) {
      addMessage(message, true);
      messageInput.value = '';
      
      autoReply(message);
    }
  });
  
  // Отправка сообщения по нажатию Enter (без Shift)
  messageInput.addEventListener('keydown', function(e) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendButton.click();
    }
  });
});
