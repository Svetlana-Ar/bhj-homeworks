// Находим ВСЕ блоки вкладок на странице по их общему классу
const allTabContainers = document.querySelectorAll('.tabs');

// Перебираем каждый контейнер отдельно
allTabContainers.forEach((tabsContainer) => {
    
    // Внутри конкретного контейнера находим его собственные вкладки и контент
    // Превращаем в массивы, чтобы использовать indexOf
    const tabs = Array.from(tabsContainer.querySelectorAll('.tab'));
    const contents = Array.from(tabsContainer.querySelectorAll('.tab__content'));
    const navigation = tabsContainer.querySelector('.tab__navigation');

    // Проверяем, существует ли навигация, чтобы избежать ошибок
    if (!navigation) return;

    // Регистрируем обработчик клика на блок навигации текущего контейнера
    navigation.addEventListener('click', (event) => {
        // Находим вкладку, по которой кликнули (или её дочерний элемент)
        const clickedTab = event.target.closest('.tab');
        
        // Если клик был мимо вкладки — игнорируем
        if (!clickedTab) return;

        // Ищем индекс кликнутой вкладки ИМЕННО в текущем блоке
        const targetIndex = tabs.indexOf(clickedTab);

        // Переключаем класс tab_active для вкладок текущего блока
        tabs.forEach((tab, index) => {
            tab.classList.toggle('tab_active', index === targetIndex);
        });

        // Переключаем класс tab__content_active для контента текущего блока
        contents.forEach((content, index) => {
            content.classList.toggle('tab__content_active', index === targetIndex);
        });
    });
});