class Game {
  constructor(container) {
    this.container = container;
    this.wordElement = container.querySelector('.word');
    this.winsElement = container.querySelector('.status__wins');
    this.lossElement = container.querySelector('.status__loss');

    // Находим элемент линии таймера
    this.timerLine = container.querySelector('.timer-line');
    this.timerInterval = null;

    this.reset();

    this.registerEvents();
  }

  reset() {
    this.setNewWord();
    this.winsElement.textContent = 0;
    this.lossElement.textContent = 0;
  }

  registerEvents() {
    document.addEventListener('keyup', (event) => {
    // Защита: если текущего символа нет, ничего не делаем
    if (!this.currentSymbol) {
      return;
    }

    // Извлекаем текстовый символ из DOM-элемента и переводим в нижний регистр
    const targetSymbol = this.currentSymbol.textContent.toLowerCase();

    // Получаем символ нажатой клавиши в нижнем регистре
    const pressedSymbol = event.key.toLowerCase();

    // Игнорируем нажатия системных клавиш (Shift, Alt, Control, CapsLock),
    // так как их свойство event.key возвращает строку длинее 1 символа
    if (event.key.length > 1) {
      return;
    }

    // Сравниваем символы независимо от регистра
    if (pressedSymbol === targetSymbol) {
      this.success(); // Символы совпали
    } else {
      this.fail();    // Игрок ошибся
    }
    });
  }

  // Запуск таймера: N секунд на N символов
  startTimer(wordLength) {
    // Очищаем предыдущий таймер, если он запущен
    clearInterval(this.timerInterval);

    const totalTime = wordLength * 1000; // Переводим секунды в миллисекунды
    let timeLeft = totalTime;

    this.timerInterval = setInterval(() => {
      timeLeft -= 100; // Шаг уменьшения — 100 миллисекунд

      // Вычисляем процент оставшегося времени для CSS-анимации полосы
      const percentage = (timeLeft / totalTime) * 100;
      this.timerLine.style.width = `${percentage}%`;

      // Если время вышло — фиксируем проигрыш раунда
      if (timeLeft <= 0) {
        clearInterval(this.timerInterval);
        this.fail();
      }
    }, 100);
  }

  success() {
    if(this.currentSymbol.classList.contains("symbol_current")) this.currentSymbol.classList.remove("symbol_current");
    this.currentSymbol.classList.add('symbol_correct');
    this.currentSymbol = this.currentSymbol.nextElementSibling;

    if (this.currentSymbol !== null) {
      this.currentSymbol.classList.add('symbol_current');
      return;
    }

    // Слово успешно завершено — останавливаем текущий таймер
    clearInterval(this.timerInterval);

    // Сначала увеличиваем счётчик побед и мгновенно выводим "10" на экран
    this.winsElement.textContent = ++this.winsElement.textContent;

    if (this.winsElement.textContent == 10) {
      // Задержка в 0 миллисекунд позволяет браузеру сначала перерисовать DOM,
      // чтобы игрок увидел цифру 10, а затем показывает alert.
      setTimeout(() => {
        alert('🎉 Победа! Вы правильно ввели 10 слов.');
        this.reset();
      }, 0);
      return;
    }
    this.setNewWord();
  }

  fail() {
    // Слово провалено (из-за ошибки или времени) — останавливаем текущий таймер
    clearInterval(this.timerInterval);

    // Сначала увеличиваем счётчик и мгновенно выводим цифру на экран
    this.lossElement.textContent = ++this.lossElement.textContent;

    // Проверяем условие проигрыша
    if (this.lossElement.textContent == 3) {
      // Использование setTimeout(..., 0) позволяет браузеру сначала отобразить тройку 
      // на экране, а уже в следующий миг показать окно проигрыша.
      setTimeout(() => {
        alert('Вы проиграли!');
        this.reset();
      }, 0);
      return;
    }
    
    this.setNewWord();
  }

  setNewWord() {
    const word = this.getWord();
    this.renderWord(word);

    // Запускаем таймер, передавая длину нового слова
    this.startTimer(word.length);
  }

  getWord() {
    const words = [
        'bob',
        'awesome',
        'netology',
        'hello',
        'kitty',
        'rock',
        'youtube',
        'popcorn',
        'cinema',
        'love',
        'javascript'
      ],
      index = Math.floor(Math.random() * words.length);

    return words[index];
  }

  renderWord(word) {
    const html = [...word]
      .map(
        (s, i) =>
          `<span class="symbol ${i === 0 ? 'symbol_current': ''}">${s}</span>`
      )
      .join('');
    this.wordElement.innerHTML = html;

    this.currentSymbol = this.wordElement.querySelector('.symbol_current');
  }
}

new Game(document.getElementById('game'))

