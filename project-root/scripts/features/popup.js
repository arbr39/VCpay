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
              const [isOpen, setIsOpen] = useState(true);
              const [selectedService, setSelectedService] = useState('GPT');
              const [isDropdownOpen, setIsDropdownOpen] = useState(false);
              const [formData, setFormData] = useState({
                fullName: '',
                phone: '',
                telegram: ''
              });
              const [isSubmitting, setIsSubmitting] = useState(false);
              const [isSuccess, setIsSuccess] = useState(false);
              const [error, setError] = useState(null);

              // Доступные сервисы
              const services = ['GPT', 'Midjourney', 'Spotify', 'Playstation', 'Другое'];

              // Остальной код компонента (обработчики, рендер)...
              
              // Основные функции из компонента в components/SubscriptionPopup.jsx
              const handleServiceSelect = (service) => {
                setSelectedService(service);
                setIsDropdownOpen(false);
              };

              const handleInputChange = (e) => {
                const { name, value } = e.target;
                setFormData({
                  ...formData,
                  [name]: value
                });
              };

              const handleSubmit = async (e) => {
                e.preventDefault();
                setIsSubmitting(true);
                setError(null);
                
                try {
                  // Имитация запроса
                  await new Promise(resolve => setTimeout(resolve, 1500));
                  
                  setIsSuccess(true);
                  setTimeout(() => {
                    setIsSuccess(false);
                    setIsOpen(false);
                  }, 3000);
                } catch (err) {
                  setError('Произошла ошибка при отправке данных. Пожалуйста, попробуйте позже.');
                } finally {
                  setIsSubmitting(false);
                }
              };

              // Копировать JSX разметку из components/SubscriptionPopup.jsx
              
              return (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                  {/* Разметка формы */}
                </div>
              );
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