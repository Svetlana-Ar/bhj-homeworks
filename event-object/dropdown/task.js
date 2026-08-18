const dropdownValue = document.querySelector('.dropdown__value');
const dropdownList = document.querySelector('.dropdown__list');
const dropdownLinks = Array.from(document.querySelectorAll('.dropdown__link')); 

// Открытие/закрытие списка по клику 
dropdownValue.addEventListener('click', function(event) {
    dropdownList.classList.toggle('dropdown__list_active');
});

// Обработка клика по ссылкам 
dropdownLinks.forEach(link => {
    link.addEventListener('click', function(event) {
        // Отменяем стандартное поведение ссылки (перезагрузку)
        event.preventDefault();
        
        // Находим ближайшего предка-родителя с классом .dropdown
        const dropdownContainer = event.target.closest('.dropdown');
        
        if (dropdownContainer) {
            const valueElement = dropdownContainer.querySelector('.dropdown__value');
            
            // Меняем текст главного элемента на текст ссылки
            valueElement.textContent = this.textContent.trim();
        }
        
        // Закрываем выпадающий список
        dropdownList.classList.remove('dropdown__list_active');
    });
});