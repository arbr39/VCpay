// HTML разметка
<div class="payment-flow-container">
  <div class="step step-1">
    <div class="icon ruble-icon"></div>
    <div class="label">Рубли</div>
  </div>
  
  <div class="connector connector-1">
    <svg width="100" height="20">
      <line x1="0" y1="10" x2="100" y2="10" stroke="#333" stroke-width="2" stroke-dasharray="5,5" />
      <circle class="money-particle" cx="0" cy="10" r="5" fill="#2ecc71" />
    </svg>
  </div>
  
  <div class="step step-2">
    <div class="icon vcpay-icon"></div>
    <div class="label">VCPay</div>
  </div>
  
  <div class="connector connector-2">
    <svg width="100" height="20">
      <line x1="0" y1="10" x2="100" y2="10" stroke="#333" stroke-width="2" stroke-dasharray="5,5" />
      <circle class="money-particle" cx="0" cy="10" r="5" fill="#2ecc71" />
    </svg>
  </div>
  
  <div class="step step-3">
    <div class="icon foreign-icon"></div>
    <div class="label">Зарубежный сервис</div>
  </div>
</div>

// Подключение GSAP
import { gsap } from 'gsap';

// Инициализация анимации
function initPaymentAnimation() {
  // Главная временная шкала
  const mainTimeline = gsap.timeline({
    repeat: -1,
    repeatDelay: 1
  });
  
  // Анимация первого шага
  mainTimeline.from('.step-1', {
    opacity: 0,
    scale: 0.8,
    duration: 0.5,
    ease: 'back.out'
  });
  
  // Анимация движения денег по первому коннектору
  mainTimeline.to('.connector-1 .money-particle', {
    cx: 100,
    duration: 1,
    ease: 'power1.inOut'
  });
  
  // Анимация второго шага
  mainTimeline.from('.step-2', {
    opacity: 0,
    scale: 0.8,
    duration: 0.5,
    ease: 'back.out'
  }, '-=0.3');
  
  // Пульсация VCPay (конвертация валюты)
  mainTimeline.to('.step-2', {
    scale: 1.1,
    duration: 0.3,
    ease: 'power1.inOut',
    yoyo: true,
    repeat: 1
  });
  
  // Анимация движения денег по второму коннектору
  mainTimeline.to('.connector-2 .money-particle', {
    cx: 100,
    duration: 1,
    ease: 'power1.inOut'
  });
  
  // Анимация третьего шага
  mainTimeline.from('.step-3', {
    opacity: 0,
    scale: 0.8,
    duration: 0.5,
    ease: 'back.out'
  }, '-=0.3');
  
  // Завершающий эффект
  mainTimeline.to(['.step-1', '.step-2', '.step-3'], {
    boxShadow: '0 0 15px rgba(46, 204, 113, 0.7)',
    duration: 0.5,
    ease: 'power1.inOut',
    yoyo: true,
    repeat: 1
  });
  
  return mainTimeline;
}

// Запуск анимации при загрузке страницы
document.addEventListener('DOMContentLoaded', function() {
  initPaymentAnimation();
});
