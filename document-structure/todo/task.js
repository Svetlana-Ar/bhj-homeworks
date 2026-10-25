const tasksForm = document.getElementById('tasks__form');
const taskInput = document.getElementById('task__input');
const tasksList = document.getElementById('tasks__list');

// Функция для создания и добавления новой задачи
function addTask(taskText) {
    // 1. Создаем корневой элемент задачи
    const taskElement = document.createElement('div');
    taskElement.className = 'task';

    // 2. Наполняем его внутренним HTML-содержимым по шаблону
    taskElement.innerHTML = `
        <div class="task__title">${taskText}</div>
        <a href="#" class="task__remove">&times;</a>
    `;

    // 3. Находим кнопку удаления ИМЕННО внутри этого нового элемента
    const removeBtn = taskElement.querySelector('.task__remove');

    // 4. Навешиваем ОДИН обработчик события на кнопку удаления конкретно этой задачи
    removeBtn.addEventListener('click', (e) => {
        e.preventDefault(); // Отменяем переход по ссылке-заглушке
        taskElement.remove(); // Удаляем всю карточку задачи из DOM
    });

    // 5. Добавляем готовую задачу в общий список на странице
    tasksList.appendChild(taskElement);
}

// Слушатель отправки формы (срабатывает и по кнопке "Добавить", и по Enter)
tasksForm.addEventListener('submit', (e) => {
    e.preventDefault(); // Предотвращаем перезагрузку страницы

    const text = taskInput.value.trim();

    // Проверяем, что поле ввода не пустое
    if (text !== '') {
        addTask(text); // Вызываем функцию создания задачи
        taskInput.value = ''; // Очищаем поле ввода
    }
});