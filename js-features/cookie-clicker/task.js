const counter = document.getElementById('clicker__counter');
const speedCounter = document.getElementById('clicker__speed');

let lastClickTime = null;

cookie.onclick = () => {
  const currentTime = new Date();
  counter.textContent = parseInt(counter.textContent) + 1;

  if (cookie.width === 200) {
    cookie.width = 250;
  } else {
    cookie.width = 200;
  }

  if (lastClickTime) {
    // Разница во времени в миллисекундах, переводим в секунды
    const timeDiffSeconds = (currentTime - lastClickTime) / 1000;
    
    // Вычисляем скорость (1 / время в секундах)
    const speed = 1 / timeDiffSeconds;
    
    // Выводим значение, округляя до двух знаков после запятой
    speedCounter.textContent = speed.toFixed(2);
  }

  // Обновляем время последнего клика для следующего нажатия
  lastClickTime = currentTime;

};