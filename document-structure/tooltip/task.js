document.addEventListener('DOMContentLoaded', () => {
  const tooltipElements = document.querySelectorAll('.has-tooltip');
  let currentTooltip = null;

  tooltipElements.forEach(element => {
    // Убираем стандартный title, чтобы браузер не показывал свою подсказку при наведении
    const titleText = element.getAttribute('title');
    if (titleText) {
      element.dataset.tooltipText = titleText;
      element.removeAttribute('title');
    }

    element.addEventListener('click', (event) => {
      event.preventDefault();

      // Если кликнули на элемент, у которого подсказка уже открыта — закрываем её
      if (currentTooltip && currentTooltip.previousElementSibling === element) {
        currentTooltip.remove();
        currentTooltip = null;
        return;
      }

      // Удаляем предыдущую открытую подсказку
      if (currentTooltip) {
        currentTooltip.remove();
      }

      // Создаем подсказку строго по шаблону
      const tooltip = document.createElement('div');
      tooltip.className = 'tooltip tooltip_active';
      tooltip.textContent = element.dataset.tooltipText;

      // Вставляем сразу после ссылки
      element.insertAdjacentElement('afterend', tooltip);
      currentTooltip = tooltip;

      // Получаем координаты элемента относительно видимого экрана (Viewport)
      const coords = element.getBoundingClientRect();
      const position = element.dataset.position || 'top';
      
      let top, left;

      // Так как в CSS используется position: fixed, скролл (window.scrollY) прибавлять НЕ НАДО!
      switch (position) {
        case 'bottom':
          top = coords.bottom;
          left = coords.left + (coords.width - tooltip.offsetWidth) / 2;
          break;
        case 'left':
          top = coords.top + (coords.height - tooltip.offsetHeight) / 2;
          left = coords.left - tooltip.offsetWidth;
          break;
        case 'right':
          top = coords.top + (coords.height - tooltip.offsetHeight) / 2;
          left = coords.right;
          break;
        case 'top':
        default:
          top = coords.top - tooltip.offsetHeight;
          left = coords.left + (coords.width - tooltip.offsetWidth) / 2;
          break;
      }

      // Небольшие отступы, чтобы подсказка не прилипала вплотную
      if (position === 'top') top -= 4;
      if (position === 'bottom') top += 4;
      if (position === 'left') left -= 4;
      if (position === 'right') left += 4;

      // Задаем координаты
      tooltip.style.top = `${top}px`;
      tooltip.style.left = `${left}px`;
    });
  });

  // Закрытие при клике в любое другое место страницы
  document.addEventListener('click', (event) => {
    if (currentTooltip && !event.target.classList.contains('has-tooltip') && !event.target.classList.contains('tooltip')) {
      currentTooltip.remove();
      currentTooltip = null;
    }
  });
});