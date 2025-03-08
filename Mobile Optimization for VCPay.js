// Обнаружение мобильного устройства
const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

// Функция для инициализации мобильных оптимизаций
function initMobileOptimizations() {
  if (!isMobile) return;
  
  // Применение стилей для мобильных устройств
  applyMobileStyles();
  
  // Инициализация тактильной обратной связи
  initHapticFeedback();
  
  // Инициализация поддержки жестов
  initGestureSupport();
  
  // Оптимизация анимаций для мобильных устройств
  optimizeMobileAnimations();
  
  console.log('Мобильные оптимизации применены');
}

// Применение стилей для мобильных устройств
function applyMobileStyles() {
  const mobileStyles = document.createElement('style');
  mobileStyles.textContent = `
    /* Увеличение активных элементов для удобства нажатия */
    button, .clickable, .nav-item, .action-button {
      min-height: 44px;
      min-width: 44px;
      padding: 12px;
    }
    
    /* Увеличение межстрочного интервала для улучшения читаемости */
    p, li, .text-content {
      line-height: 1.5;
    }
    
    /* Адаптация размера шрифта */
    body {
      font-size: 16px;
    }
    
    /* Предотвращение масштабирования текста в полях ввода */
    input, select, textarea {
      font-size: 16px;
    }
    
    /* Улучшенная видимость фокуса */
    :focus {
      outline: 3px solid #3498db;
    }
    
    /* Улучшение прокручиваемых элементов */
    .scrollable {
      -webkit-overflow-scrolling: touch;
    }
  `;
  
  document.head.appendChild(mobileStyles);
}

// Инициализация тактильной обратной связи
function initHapticFeedback() {
  // Проверка поддержки вибрации
  const hasVibrationSupport = 'vibrate' in navigator;
  
  if (hasVibrationSupport) {
    // Коллекция интерактивных элементов
    const interactiveElements = document.querySelectorAll('button, .action-button, .clickable, .nav-item');
    
    // Добавление обработчиков для тактильной обратной связи
    interactiveElements.forEach(element => {
      element.addEventListener('click', function() {
        // Короткая вибрация при нажатии
        navigator.vibrate(25);
      });
    });
    
    // Специальная обратная связь для важных действий
    const importantButtons = document.querySelectorAll('.primary-action, .submit-button, .confirm-button');
    
    importantButtons.forEach(button => {
      button.addEventListener('click', function() {
        // Более выраженная вибрация для важных действий
        navigator.vibrate([30, 30, 60]);
      });
    });
    
    // Обратная связь при ошибках
    document.addEventListener('vcpay-error', function() {
      // Длинная вибрация при ошибке
      navigator.vibrate([20, 20, 20, 20, 80]);
    });
    
    // Обратная связь при успешных операциях
    document.addEventListener('vcpay-success', function() {
      // Два импульса для успешных операций
      navigator.vibrate([40, 30, 40]);
    });
  }
}

// Инициализация поддержки жестов
function initGestureSupport() {
  // Подключение библиотеки Hammer.js для работы с жестами (если доступна)
  if (typeof Hammer !== 'undefined') {
    initHammerGestures();
  } else {
    // Резервная реализация основных жестов без внешней библиотеки
    initBasicGestures();
  }
}

// Инициализация жестов с использованием Hammer.js
function initHammerGestures() {
  // Карусель на главной странице
  const carousel = document.querySelector('.carousel-container');
  if (carousel) {
    const hammerCarousel = new Hammer(carousel);
    hammerCarousel.on('swipeleft', function() {
      // Переход к следующему слайду
      nextSlide();
    });
    
    hammerCarousel.on('swiperight', function() {
      // Переход к предыдущему слайду
      prevSlide();
    });
  }
  
  // Навигационное меню
  const mainContent = document.querySelector('.main-content');
  if (mainContent) {
    const hammerContent = new Hammer(mainContent);
    hammerContent.on('swiperight', function() {
      // Открытие бокового меню при свайпе вправо
      openSidebar();
    });
  }
  
  // Боковое меню
  const sidebar = document.querySelector('.sidebar');
  if (sidebar) {
    const hammerSidebar = new Hammer(sidebar);
    hammerSidebar.on('swipeleft', function() {
      // Закрытие бокового меню при свайпе влево
      closeSidebar();
    });
  }
  
  // Жест Pull-to-refresh
  const refreshableContent = document.querySelector('.refreshable-content');
  if (refreshableContent) {
    let startY = 0;
    const hammerRefresh = new Hammer(refreshableContent);
    
    hammerRefresh.get('pan').set({ direction: Hammer.DIRECTION_VERTICAL });
    
    hammerRefresh.on('panstart', function(e) {
      startY = e.center.y;
    });
    
    hammerRefresh.on('pandown', function(e) {
      if (window.scrollY === 0) {
        const distance = e.center.y - startY;
        if (distance > 60) {
          // Показываем индикатор обновления
          showRefreshIndicator();
        }
      }
    });
    
    hammerRefresh.on('panend', function(e) {
      if (window.scrollY === 0) {
        const distance = e.center.y - startY;
        if (distance > 60) {
          // Выполняем обновление
          refreshContent();
        } else {
          // Скрываем индикатор
          hideRefreshIndicator();
        }
      }
    });
  }
}

// Базовая реализация жестов без внешних библиотек
function initBasicGestures() {
  // Карусель
  const carousel = document.querySelector('.carousel-container');
  if (carousel) {
    let startX = 0;
    let currentX = 0;
    
    carousel.addEventListener('touchstart', function(e) {
      startX = e.touches[0].clientX;
    });
    
    carousel.addEventListener('touchmove', function(e) {
      currentX = e.touches[0].clientX;
    });
    
    carousel.addEventListener('touchend', function() {
      const diff = startX - currentX;
      
      if (Math.abs(diff) > 50) {
        if (diff > 0) {
          // Свайп влево - следующий слайд
          nextSlide();
        } else {
          // Свайп вправо - предыдущий слайд
          prevSlide();
        }
      }
    });
  }
  
  // Упрощенный жест для открытия бокового меню
  const mainContent = document.querySelector('.main-content');
  if (mainContent) {
    let startX = 0;
    let currentX = 0;
    
    mainContent.addEventListener('touchstart', function(e) {
      startX = e.touches[0].clientX;
    });
    
    mainContent.addEventListener('touchmove', function(e) {
      currentX = e.touches[0].clientX;
    });
    
    mainContent.addEventListener('touchend', function() {
      const diff = currentX - startX;
      
      if (diff > 100 && startX < 50) {
        // Свайп вправо от левого края - открытие меню
        openSidebar();
      }
    });
  }
}

// Оптимизация анимаций для мобильных устройств
function optimizeMobileAnimations() {
  // Уменьшение сложности анимаций для мобильных устройств
  const animationElements = document.querySelectorAll('.animated, .animate, .animation');
  
  animationElements.forEach(element => {
    // Заменяем сложные анимации на более простые
    if (element.classList.contains('parallax-effect')) {
      element.classList.remove('parallax-effect');
      element.classList.add('fade-in-effect');
    }
    
    // Уменьшаем длительность анимаций
    const animationDuration = element.style.animationDuration || 
                             window.getComputedStyle(element).animationDuration;
    
    if (animationDuration.includes('s')) {
      const duration = parseFloat(animationDuration);
      if (duration > 0.5) {
        element.style.animationDuration = '0.5s';
      }
    }
    
    // Отключаем анимации для слабых устройств
    if (isLowPowerDevice()) {
      element.style.animation = 'none';
      element.style.transition = 'none';
    }
  });
  
  // Использование аппаратного ускорения для плавности анимаций
  const criticalAnimElements = document.querySelectorAll('.critical-animation, .main-carousel, .hero-section');
  
  criticalAnimElements.forEach(element => {
    element.style.transform = 'translateZ(0)';
    element.style.backfaceVisibility = 'hidden';
    element.style.perspective = '1000px';
  });
}

// Определение устройства с низкой производительностью
function isLowPowerDevice() {
  // Проверка количества логических процессоров
  const cpuCores = navigator.hardwareConcurrency || 1;
  
  // Проверка информации о устройстве
  const isOldDevice = /iPhone\s(5|6|7|8)|iPad\sMini|Android\s([1-5])|Galaxy\sS[3-6]/i.test(navigator.userAgent);
  
  // Проверка памяти устройства (если доступно)
  const hasLowMemory = navigator.deviceMemory && navigator.deviceMemory < 4;
  
  return cpuCores <= 2 || isOldDevice || hasLowMemory;
}

// Вспомогательные функции для использования в обработчиках жестов
function nextSlide() {
  const carousel = document.querySelector('.carousel');
  if (carousel && typeof carousel.nextSlide === 'function') {
    carousel.nextSlide();
  }
}

function prevSlide() {
  const carousel = document.querySelector('.carousel');
  if (carousel && typeof carousel.prevSlide === 'function') {
    carousel.prevSlide();
  }
}

function openSidebar() {
  const sidebar = document.querySelector('.sidebar');
  if (sidebar) {
    sidebar.classList.add('open');
  }
}

function closeSidebar() {
  const sidebar = document.querySelector('.sidebar');
  if (sidebar) {
    sidebar.classList.remove('open');
  }
}

function showRefreshIndicator() {
  const indicator = document.querySelector('.refresh-indicator') || createRefreshIndicator();
  indicator.style.display = 'block';
}

function hideRefreshIndicator() {
  const indicator = document.querySelector('.refresh-indicator');
  if (indicator) {
    indicator.style.display = 'none';
  }
}

function createRefreshIndicator() {
  const indicator = document.createElement('div');
  indicator.className = 'refresh-indicator';
  indicator.innerHTML = '<div class="spinner"></div><span>Обновление...</span>';
  document.body.appendChild(indicator);
  return indicator;
}

function refreshContent() {
  // Имитация загрузки данных
  showRefreshIndicator();
  
  setTimeout(() => {
    // Перезагрузка данных
    if (typeof fetchLatestData === 'function') {
      fetchLatestData();
    }
    
    // Скрываем индикатор
    hideRefreshIndicator();
    
    // Вибрация при завершении
    if ('vibrate' in navigator) {
      navigator.vibrate(30);
    }
  }, 1500);
}

// Запуск оптимизаций при загрузке страницы
document.addEventListener('DOMContentLoaded', initMobileOptimizations);
