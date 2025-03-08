// HTML структура
<div class="wheel-container">
  <canvas id="wheel-canvas" width="500" height="500"></canvas>
  <button id="spin-button" class="spin-button">Вращать</button>
  <div id="result" class="result-display"></div>
</div>

// CSS стили
.wheel-container {
  position: relative;
  width: 500px;
  margin: 0 auto;
}

.spin-button {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 15px 30px;
  background: linear-gradient(135deg, #3498db, #2980b9);
  color: white;
  border: none;
  border-radius: 30px;
  font-size: 18px;
  font-weight: bold;
  cursor: pointer;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
  z-index: 10;
  transition: all 0.3s ease;
}

.spin-button:hover {
  transform: translate(-50%, -50%) scale(1.05);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.3);
}

.result-display {
  position: absolute;
  bottom: -60px;
  left: 0;
  right: 0;
  text-align: center;
  font-size: 24px;
  font-weight: bold;
  color: #2c3e50;
  opacity: 0;
  transition: opacity 0.5s ease;
}

// JavaScript код
document.addEventListener('DOMContentLoaded', function() {
  const canvas = document.getElementById('wheel-canvas');
  const ctx = canvas.getContext('2d');
  const spinButton = document.getElementById('spin-button');
  const resultDisplay = document.getElementById('result');
  
  // Настройки колеса
  const segments = [
    { text: "5%", color: "#9b59b6", textColor: "#ffffff" },
    { text: "10%", color: "#3498db", textColor: "#ffffff" },
    { text: "15%", color: "#2ecc71", textColor: "#ffffff" },
    { text: "20%", color: "#e74c3c", textColor: "#ffffff" },
    { text: "25%", color: "#f1c40f", textColor: "#ffffff" },
    { text: "30%", color: "#1abc9c", textColor: "#ffffff" },
    { text: "Попробуйте снова", color: "#95a5a6", textColor: "#ffffff" },
    { text: "50%!", color: "#e67e22", textColor: "#ffffff" }
  ];
  
  const wheelRadius = 200;
  const centerX = canvas.width / 2;
  const centerY = canvas.height / 2;
  const segmentAngle = (2 * Math.PI) / segments.length;
  
  let isSpinning = false;
  let spinAngle = 0;
  let spinVelocity = 0;
  
  // Функция для отрисовки колеса
  function drawWheel() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Отрисовка сегментов
    segments.forEach((segment, index) => {
      const startAngle = index * segmentAngle + spinAngle;
      const endAngle = startAngle + segmentAngle;
      
      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      ctx.arc(centerX, centerY, wheelRadius, startAngle, endAngle);
      ctx.closePath();
      
      ctx.fillStyle = segment.color;
      ctx.fill();
      
      ctx.strokeStyle = "#ffffff";
      ctx.lineWidth = 2;
      ctx.stroke();
      
      // Отрисовка текста
      ctx.save();
      ctx.translate(centerX, centerY);
      ctx.rotate(startAngle + segmentAngle / 2);
      ctx.textAlign = "right";
      ctx.fillStyle = segment.textColor;
      ctx.font = "bold 20px Arial";
      ctx.fillText(segment.text, wheelRadius - 20, 10);
      ctx.restore();
    });
    
    // Отрисовка центрального круга
    ctx.beginPath();
    ctx.arc(centerX, centerY, 30, 0, 2 * Math.PI);
    ctx.fillStyle = "#2c3e50";
    ctx.fill();
    
    // Отрисовка указателя
    ctx.beginPath();
    ctx.moveTo(centerX + wheelRadius + 10, centerY);
    ctx.lineTo(centerX + wheelRadius - 10, centerY - 15);
    ctx.lineTo(centerX + wheelRadius - 10, centerY + 15);
    ctx.closePath();
    ctx.fillStyle = "#e74c3c";
    ctx.fill();
  }
  
  // Функция анимации вращения
  function animateSpin() {
    if (spinVelocity > 0.001) {
      spinAngle += spinVelocity;
      spinVelocity *= 0.99; // Замедление
      drawWheel();
      requestAnimationFrame(animateSpin);
    } else {
      // Остановка вращения
      isSpinning = false;
      spinButton.disabled = false;
      
      // Определение выигрыша
      const normalizedAngle = spinAngle % (2 * Math.PI);
      const segmentIndex = Math.floor(segments.length - (normalizedAngle / segmentAngle)) % segments.length;
      const winningSegment = segments[segmentIndex];
      
      // Отображение результата
      resultDisplay.textContent = `Ваша скидка: ${winningSegment.text}`;
      resultDisplay.style.opacity = 1;
      
      // Сохранение результата для пользователя
      saveUserDiscount(winningSegment.text);
    }
  }
  
  // Функция для сохранения скидки пользователя
  function saveUserDiscount(discount) {
    // Здесь можно реализовать логику сохранения скидки (в localStorage, отправка на сервер и т.д.)
    localStorage.setItem('userDiscount', discount);
    
    // Или отправка на сервер
    /*
    fetch('/api/save-discount', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ discount }),
    });
    */
  }
  
  // Инициализация колеса
  drawWheel();
  
  // Обработчик нажатия на кнопку
  spinButton.addEventListener('click', function() {
    if (!isSpinning) {
      isSpinning = true;
      spinButton.disabled = true;
      resultDisplay.style.opacity = 0;
      
      // Генерация случайной скорости
      spinVelocity = 0.2 + Math.random() * 0.2; // От 0.2 до 0.4
      
      // Запуск анимации
      animateSpin();
    }
  });
});
