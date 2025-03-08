async function loadPartials() {
  const loadHTML = async (selector, file) => {
    const res = await fetch(file);
    if (!res.ok) {
      console.error(`Ошибка загрузки файла ${file}: ${res.status}`);
      return;
    }
    const html = await res.text();
    document.querySelector(selector).innerHTML = html;
  };

  await loadHTML('#header', 'partials/header.html');
  await loadHTML('#footer', 'partials/footer.html');
}

document.addEventListener('DOMContentLoaded', loadPartials);