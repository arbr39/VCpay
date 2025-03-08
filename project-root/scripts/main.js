// Проверить и исправить пути загрузки
async function loadPartials() {
  const loadHTML = async (selector, file) => {
    // Убедитесь, что пути корректны
    const res = await fetch(`/public/${file}`);
    if (!res.ok) {
      // Попробовать загрузить без префикса /public/
      const res2 = await fetch(file);
      if (!res2.ok) {
        console.error(`Ошибка загрузки файла ${file}: ${res.status}`);
        return;
      }
      const html = await res2.text();
      document.querySelector(selector).innerHTML = html;
      return;
    }
    const html = await res.text();
    document.querySelector(selector).innerHTML = html;
  };

  // Пробуем загрузить с разных путей
  try {
    await loadHTML('#header', 'partials/header.html');
    await loadHTML('#footer', 'partials/footer.html');
  } catch (e) {
    console.error('Ошибка загрузки частей:', e);
  }
}

document.addEventListener('DOMContentLoaded', loadPartials);