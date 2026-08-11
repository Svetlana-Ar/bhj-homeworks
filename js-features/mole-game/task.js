// Получаем элементы счетчиков побед и поражений
const deadCounter = document.getElementById('dead');
const lostCounter = document.getElementById('lost');

// Функция для сброса игры и вывода сообщения
const resetGame = (message) => {
  alert(message);
  deadCounter.textContent = 0;
  lostCounter.textContent = 0;
};

// Функция-помощник для получения лунки по её индексу
const getHole = (index) => document.getElementById(`hole${index}`);

// Цикл для регистрации обработчика клика на каждую из 9 лунок
for (let i = 1; i <= 9; i++) {
  const hole = getHole(i);

  hole.onclick = () => {
    // Проверяем, содержит ли лунка класс наличия крота
    if (hole.classList.contains('hole_has-mole')) {
      // Крот убит: увеличиваем счетчик побед
      deadCounter.textContent = parseInt(deadCounter.textContent) + 1;
    } else {
      // Промах: увеличиваем счетчик поражений
      lostCounter.textContent = parseInt(lostCounter.textContent) + 1;
    }

    // Проверяем условия окончания игры
    if (parseInt(deadCounter.textContent) === 10) {
      resetGame('Победа! Вы поймали 10 кротов! 🎉');
    } else if (parseInt(lostCounter.textContent) === 5) {
      resetGame('Вы проиграли! Совершено 5 промахов. 😢');
    }
  };
}