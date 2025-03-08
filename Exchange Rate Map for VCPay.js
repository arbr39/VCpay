// HTML структура
<div class="map-container">
  <h2>Глобальная карта обменных курсов</h2>
  <div class="controls">
    <select id="base-currency">
      <option value="RUB">Российский рубль (RUB)</option>
      <option value="USD">Доллар США (USD)</option>
      <option value="EUR">Евро (EUR)</option>
      <option value="GBP">Фунт стерлингов (GBP)</option>
      <option value="CNY">Китайский юань (CNY)</option>
    </select>
  </div>
  <div id="map-chart"></div>
  <div class="legend">
    <div class="legend-item">
      <span class="dot strong"></span>
      <span>Высокий курс</span>
    </div>
    <div class="legend-item">
      <span class="dot medium"></span>
      <span>Средний курс</span>
    </div>
    <div class="legend-item">
      <span class="dot weak"></span>
      <span>Низкий курс</span>
    </div>
  </div>
</div>

// CSS стили
.map-container {
  width: 100%;
  max-width: 1000px;
  margin: 0 auto;
  font-family: Arial, sans-serif;
  padding: 20px;
}

.map-container h2 {
  text-align: center;
  color: #2c3e50;
  margin-bottom: 20px;
}

.controls {
  text-align: center;
  margin-bottom: 20px;
}

#base-currency {
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #ddd;
  font-size: 16px;
}

#map-chart {
  width: 100%;
  height: 500px;
  position: relative;
}

.country {
  fill: #e0e0e0;
  stroke: #fff;
  stroke-width: 0.5;
  transition: fill 0.3s ease;
}

.country:hover {
  fill: #3498db;
  cursor: pointer;
}

.connection {
  fill: none;
  stroke: rgba(46, 204, 113, 0.4);
  stroke-width: 2;
  stroke-linecap: round;
  animation: flowAnimation 3s infinite;
}

@keyframes flowAnimation {
  0% {
    stroke-dasharray: 5 15;
    stroke-dashoffset: 20;
  }
  100% {
    stroke-dasharray: 5 15;
    stroke-dashoffset: 0;
  }
}

.marker {
  fill: #e74c3c;
  stroke: #fff;
  stroke-width: 1;
}

.pulse {
  fill: #e74c3c;
  transform-origin: center;
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0% {
    opacity: 1;
    transform: scale(0);
  }
  100% {
    opacity: 0;
    transform: scale(3);
  }
}

.tooltip {
  position: absolute;
  background: #2c3e50;
  color: white;
  border-radius: 5px;
  padding: 10px;
  font-size: 14px;
  pointer-events: none;
  opacity: 0;
  transition: opacity 0.3s;
  z-index: 10;
}

.legend {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}

.legend-item {
  display: flex;
  align-items: center;
  margin: 0 15px;
}

.dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  margin-right: 5px;
}

.dot.strong {
  background-color: #27ae60;
}

.dot.medium {
  background-color: #f39c12;
}

.dot.weak {
  background-color: #e74c3c;
}

// JavaScript код
import * as d3 from 'd3';

document.addEventListener('DOMContentLoaded', function() {
  const width = document.getElementById('map-chart').clientWidth;
  const height = 500;
  
  // Создание SVG-контейнера
  const svg = d3.select('#map-chart')
    .append('svg')
    .attr('width', width)
    .attr('height', height);
  
  // Создание группы для карты
  const mapGroup = svg.append('g');
  
  // Создание проекции
  const projection = d3.geoMercator()
    .scale(width / 2 / Math.PI)
    .translate([width / 2, height / 2]);
  
  // Создание генератора путей
  const path = d3.geoPath().projection(projection);
  
  // Создание группы для соединений
  const connectionGroup = svg.append('g');
  
  // Создание группы для маркеров
  const markerGroup = svg.append('g');
  
  // Создание тултипа
  const tooltip = d3.select('#map-chart')
    .append('div')
    .attr('class', 'tooltip');
  
  // Загрузка данных карты мира
  d3.json('https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json')
    .then(function(world) {
      const countries = topojson.feature(world, world.objects.countries).features;
      
      // Отрисовка стран
      mapGroup.selectAll('.country')
        .data(countries)
        .enter()
        .append('path')
        .attr('class', 'country')
        .attr('d', path)
        .on('mouseover', function(event, d) {
          // Показываем тултип при наведении
          tooltip.style('opacity', 1)
            .html(`${d.properties.name}<br>Курс: ${getCurrencyRate(d.properties.name)} ${getBaseCurrency()}`)
            .style('left', (event.pageX - document.getElementById('map-chart').offsetLeft + 10) + 'px')
            .style('top', (event.pageY - document.getElementById('map-chart').offsetTop - 40) + 'px');
          
          // Выделяем страну
          d3.select(this).style('fill', '#3498db');
        })
        .on('mouseout', function() {
          // Скрываем тултип при уходе мыши
          tooltip.style('opacity', 0);
          
          // Возвращаем цвет страны
          d3.select(this).style('fill', d => getCountryColor(d.properties.name));
        })
        .on('click', function(event, d) {
          // Показываем соединения при клике
          showConnections(d.properties.name);
        });
      
      // Инициализация данных валют
      updateCurrencyData();
    })
    .catch(function(error) {
      console.error('Ошибка при загрузке карты:', error);
    });
  
  // Функция для обновления данных валют
  function updateCurrencyData() {
    // Здесь должен быть запрос к API для получения реальных курсов валют
    // Для примера используем условные данные
    
    // Очистка предыдущих данных
    resetMap();
    
    // Получение базовой валюты
    const baseCurrency = getBaseCurrency();
    
    // Загрузка данных о курсах валют (пример)
    fetchExchangeRates(baseCurrency).then(data => {
      // Раскраска стран на основе курсов
      d3.selectAll('.country').style('fill', d => getCountryColor(d.properties.name));
      
      // Добавление главного маркера (базовая валюта)
      addMainMarker(baseCurrency);
    });
  }
  
  // Функция для получения базовой валюты
  function getBaseCurrency() {
    return document.getElementById('base-currency').value;
  }
  
  // Функция для получения цвета страны на основе курса
  function getCountryColor(countryName) {
    const rate = getCurrencyRate(countryName);
    
    if (rate > 80) return '#27ae60'; // Высокий курс (зеленый)
    if (rate > 40) return '#f39c12'; // Средний курс (оранжевый)
    return '#e74c3c'; // Низкий курс (красный)
  }
  
  // Функция для получения курса валюты для страны (пример)
  function getCurrencyRate(countryName) {
    // Здесь должна быть логика получения реального курса
    // Для примера используем случайные значения
    const countryCurrencies = {
      'Russia': 'RUB',
      'United States': 'USD',
      'Germany': 'EUR',
      'France': 'EUR',
      'China': 'CNY',
      'Japan': 'JPY',
      'United Kingdom': 'GBP',
      // и т.д.
    };
    
    // Имитация курсов (для примера)
    const baseCurrency = getBaseCurrency();
    const countryCurrency = countryCurrencies[countryName] || 'unknown';
    
    if (countryCurrency === 'unknown') {
      return Math.random() * 100; // Случайное значение для стран без определенной валюты
    }
    
    if (baseCurrency === countryCurrency) {
      return 100; // Максимальное значение для одной и той же валюты
    }
    
    // Примерные курсы для демонстрации
    const rates = {
      'RUB': { 'USD': 20, 'EUR': 15, 'GBP': 10, 'CNY': 30, 'JPY': 40 },
      'USD': { 'RUB': 80, 'EUR': 70, 'GBP': 60, 'CNY': 85, 'JPY': 90 },
      'EUR': { 'RUB': 85, 'USD': 75, 'GBP': 65, 'CNY': 80, 'JPY': 85 },
      'GBP': { 'RUB': 90, 'USD': 80, 'EUR': 75, 'CNY': 85, 'JPY': 90 },
      'CNY': { 'RUB': 70, 'USD': 55, 'EUR': 50, 'GBP': 45, 'JPY': 75 },
      'JPY': { 'RUB': 60, 'USD': 50, 'EUR': 45, 'GBP': 40, 'CNY': 65 }
    };
    
    return rates[baseCurrency]?.[countryCurrency] || Math.random() * 100;
  }
  
  // Функция для добавления главного маркера
  function addMainMarker(currency) {
    const countryForCurrency = {
      'RUB': 'Russia',
      'USD': 'United States',
      'EUR': 'Germany', // Используем Германию как представителя Евросоюза
      'GBP': 'United Kingdom',
      'CNY': 'China'
    };
    
    const country = countryForCurrency[currency];
    
    if (country) {
      const centroid = getCentroid(country);
      
      if (centroid) {
        // Добавление пульсирующего круга
        markerGroup.append('circle')
          .attr('class', 'pulse')
          .attr('cx', centroid[0])
          .attr('cy', centroid[1])
          .attr('r', 5);
        
        // Добавление маркера
        markerGroup.append('circle')
          .attr('class', 'marker')
          .attr('cx', centroid[0])
          .attr('cy', centroid[1])
          .attr('r', 8);
      }
    }
  }
  
  // Функция для получения центроида страны
  function getCentroid(countryName) {
    const country = d3.select('.country').filter(d => d.properties.name === countryName);
    
    if (!country.empty()) {
      const bounds = path.bounds(country.datum());
      return [
        (bounds[0][0] + bounds[1][0]) / 2,
        (bounds[0][1] + bounds[1][1]) / 2
      ];
    }
    
    return null;
  }
  
  // Функция для отображения соединений
  function showConnections(countryName) {
    // Очистка предыдущих соединений
    connectionGroup.selectAll('*').remove();
    
    const centroid1 = getCentroid(countryName);
    
    if (!centroid1) return;
    
    // Получение топ-5 стран по обменному курсу
    const topCountries = getTopCountriesByRate(countryName, 5);
    
    // Добавление соединений
    topCountries.forEach(targetCountry => {
      const centroid2 = getCentroid(targetCountry);
      
      if (centroid2) {
        // Кривая Безье для соединения
        connectionGroup.append('path')
          .attr('class', 'connection')
          .attr('d', `M${centroid1[0]},${centroid1[1]} Q${(centroid1[0] + centroid2[0]) / 2},${Math.min(centroid1[1], centroid2[1]) - 50} ${centroid2[0]},${centroid2[1]}`);
          
        // Добавление маркера целевой страны
        markerGroup.append('circle')
          .attr('class', 'marker')
          .attr('cx', centroid2[0])
          .attr('cy', centroid2[1])
          .attr('r', 5);
      }
    });
  }
  
  // Функция для получения топ-N стран по обменному курсу
  function getTopCountriesByRate(sourceCountry, n) {
    // Здесь должна быть логика получения реальных данных
    // Для примера используем условные данные
    
    const countries = [
      'United States', 'Russia', 'China', 'United Kingdom', 
      'Germany', 'France', 'Japan', 'Brazil', 'India', 'Canada'
    ].filter(country => country !== sourceCountry);
    
    // Сортировка стран по убыванию курса
    countries.sort((a, b) => getCurrencyRate(b) - getCurrencyRate(a));
    
    // Возвращаем топ-N стран
    return countries.slice(0, n);
  }
  
  // Функция для сброса карты
  function resetMap() {
    // Сброс цветов стран
    d3.selectAll('.country').style('fill', '#e0e0e0');
    
    // Удаление соединений
    connectionGroup.selectAll('*').remove();
    
    // Удаление маркеров
    markerGroup.selectAll('*').remove();
  }
  
  // Функция для имитации запроса к API курсов валют
  async function fetchExchangeRates(baseCurrency) {
    // В реальном приложении здесь должен быть запрос к API
    // Например:
    // const response = await fetch(`https://api.exchangeratesapi.io/latest?base=${baseCurrency}`);
    // return response.json();
    
    // Для примера возвращаем заглушку
    return {
      base: baseCurrency,
      rates: {
        'RUB': 80.5,
        'USD': 1,
        'EUR': 0.85,
        'GBP': 0.75,
        'CNY': 6.5,
        'JPY': 110
      }
    };
  }
  
  // Обработчик изменения базовой валюты
  document.getElementById('base-currency').addEventListener('change', updateCurrencyData);
});
