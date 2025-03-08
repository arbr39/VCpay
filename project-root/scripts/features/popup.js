// Загружаем CSS для Tailwind
(function() {
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = 'https://cdn.tailwindcss.com';
  document.head.appendChild(link);
  
  // Добавляем стили для анимаций
  const style = document.createElement('style');
  style.textContent = `
    .animate-fadeIn { animation: fadeIn 0.3s ease-in-out; }
    @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
    .animate-spin { animation: spin 1s linear infinite; }
    @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
  `;
  document.head.appendChild(style);
  
  // Создаем контейнер для popup
  const container = document.createElement('div');
  container.id = 'popup-container';
  document.body.appendChild(container);
  
  // Загружаем React и ReactDOM
  loadScript('https://unpkg.com/react@18/umd/react.production.min.js', function() {
    loadScript('https://unpkg.com/react-dom@18/umd/react-dom.production.min.js', function() {
      loadScript('https://unpkg.com/babel-standalone@6/babel.min.js', function() {
        loadScript('https://unpkg.com/lucide@latest', function() {
          // Когда все скрипты загружены, добавляем скрипт с компонентом
          const script = document.createElement('script');
          script.type = 'text/babel';
          script.textContent = `
            const { useState } = React;
            const { ChevronDown, X, CheckCircle2, ArrowRight, AlertCircle } = lucide;

            function SubscriptionPopup() {
              // Здесь вставить весь код React-компонента
            }

            // Рендерим компонент
            ReactDOM.render(<SubscriptionPopup />, document.getElementById('popup-container'));
          `;
          document.body.appendChild(script);
        });
      });
    });
  });
  
  // Функция для загрузки скриптов
  function loadScript(src, callback) {
    const script = document.createElement('script');
    script.src = src;
    script.onload = callback;
    document.body.appendChild(script);
  }
})();