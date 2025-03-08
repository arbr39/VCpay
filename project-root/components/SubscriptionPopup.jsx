import React, { useState } from 'react';
import { ChevronDown, X, CheckCircle2, ArrowRight, AlertCircle } from 'lucide-react';

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
      // В реальном приложении здесь будет запрос к API
      // Сейчас просто симулируем задержку
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Успешное завершение
      setIsSuccess(true);
      setTimeout(() => {
        setIsSuccess(false);
        setIsOpen(false);
      }, 3000);
    } catch (err) {
      console.error('Ошибка:', err);
      setError('Произошла ошибка при отправке данных. Пожалуйста, попробуйте позже.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const openPrivacyPolicy = () => {
    window.open('https://docs.google.com/document/d/1xnXb_n1yJ3OHmhb_CpnFHS3WDvc_jtvLEBdPKW-CjmI/edit?usp=sharing', '_blank');
  };

  if (!isOpen) return null;

  if (isSuccess) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-xl shadow-2xl w-full max-w-md p-6 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-blue-500 to-purple-600"></div>
          <div className="flex flex-col items-center justify-center py-8">
            <CheckCircle2 size={80} className="text-green-500 mb-4" />
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Заявка отправлена!</h2>
            <p className="text-gray-600 text-center">Наш менеджер свяжется с вами в течение 15-30 минут.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-md p-6 relative overflow-hidden animate-fadeIn">
        {/* Декоративные элементы */}
        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-blue-500 to-purple-600"></div>
        <div className="absolute -right-12 -top-12 w-32 h-32 rounded-full bg-blue-100 opacity-40"></div>
        <div className="absolute -left-16 -bottom-16 w-40 h-40 rounded-full bg-purple-100 opacity-40"></div>
        
        {/* Кнопка закрытия */}
        <button 
          onClick={() => setIsOpen(false)}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 transition-colors"
        >
          <X size={20} />
        </button>

        <div className="relative">
          <h2 className="text-xl md:text-2xl font-bold text-center mb-6">
            Заполните заявку и наш менеджер свяжется с вами в течение 15-30 минут!
          </h2>

          <form onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Какую подписку хотите подключить?
                </label>
                <div className="relative">
                  <button
                    type="button"
                    className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg text-left flex items-center justify-between focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  >
                    <span>{selectedService}</span>
                    <ChevronDown size={20} className={`transform transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
                  </button>

                  {isDropdownOpen && (
                    <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg">
                      <ul className="py-1 max-h-60 overflow-auto">
                        {services.map((service, index) => (
                          <li 
                            key={index}
                            className={`px-4 py-2 cursor-pointer hover:bg-blue-50 ${selectedService === service ? 'bg-blue-50 text-blue-600' : ''}`}
                            onClick={() => handleServiceSelect(service)}
                          >
                            {service}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Фамилия Имя
                </label>
                <input
                  type="text"
                  name="fullName"
                  placeholder="Фамилия Имя"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                  required
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Ваш телефон
                </label>
                <div className="flex">
                  <div className="flex items-center px-3 bg-gray-100 border border-r-0 border-gray-300 rounded-l-lg">
                    <span className="flex items-center">
                      <img src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA2NDAgNDgwIj48ZyBmaWxsLXJ1bGU9ImV2ZW5vZGQiIHN0cm9rZS13aWR0aD0iMXB0Ij48cGF0aCBmaWxsPSIjZmZmIiBkPSJNMCAwaDY0MHY0ODBIMHoiLz48cGF0aCBmaWxsPSIjMDAzOWE2IiBkPSJNMCAxNjBoNjQwdjMyMEgweiIvPjxwYXRoIGZpbGw9IiNkNTJiMWUiIGQ9Ik0wIDMyMGg2NDB2MTYwSDB6Ii8+PC9nPjwvc3ZnPg==" 
                        alt="Russia flag" 
                        className="h-4 w-6 mr-1" 
                      />
                      +7
                    </span>
                  </div>
                  <input
                    type="tel"
                    name="phone"
                    placeholder="(999) 999-99-99"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-r-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                    required
                  />
                </div>
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Ник в telegram
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-400">
                    @
                  </div>
                  <input
                    type="text"
                    name="telegram"
                    placeholder="nickname"
                    value={formData.telegram}
                    onChange={handleInputChange}
                    className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                    required
                  />
                </div>
              </div>

              {error && (
                <div className="mb-4 p-3 bg-red-50 text-red-600 rounded-lg flex items-start">
                  <AlertCircle size={20} className="mr-2 mt-0.5 flex-shrink-0" />
                  <span>{error}</span>
                </div>
              )}
              
              <button
                type="submit"
                className="w-full py-3 px-6 bg-blue-600 hover:bg-blue-700 focus:ring-blue-500 focus:ring-offset-blue-200 text-white rounded-lg transition ease-in duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 flex items-center justify-center"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                ) : null}
                {isSubmitting ? 'Отправка...' : 'Продолжить'}
                {!isSubmitting && <ArrowRight size={18} className="ml-2" />}
              </button>

              <div className="text-xs text-gray-500 text-center mt-4">
                Нажимая кнопку "Продолжить" вы соглашаетесь с нашей{' '}
                <button
                  type="button"
                  onClick={openPrivacyPolicy}
                  className="text-blue-600 hover:underline focus:outline-none"
                >
                  политикой конфиденциальности
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default SubscriptionPopup;