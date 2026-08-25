// Находим все выпадающие списки на странице
document.querySelectorAll('.dropdown').forEach(dropdownContainer => {
    // Ищем элементы только внутри текущего контейнера dropdown
    const dropdownValue = dropdownContainer.querySelector('.dropdown__value');
    const dropdownList = dropdownContainer.querySelector('.dropdown__list');
    const dropdownLinks = dropdownContainer.querySelectorAll('.dropdown__link');

    // Управляем открытием/закрытием конкретного списка
    dropdownValue.addEventListener('click', () => {
        dropdownList.classList.toggle('dropdown__list_active');
    });

    // Обрабатываем клики по ссылкам внутри текущего списка
    dropdownLinks.forEach(link => {
        link.addEventListener('click', (event) => {
            // Отменяем переход по ссылке
            event.preventDefault(); 
            
            // Меняем текст в шапке текущего списка
            dropdownValue.textContent = link.textContent.trim(); 
            
            // Закрываем текущий список
            dropdownList.classList.remove('dropdown__list_active'); 
        });
    });
});