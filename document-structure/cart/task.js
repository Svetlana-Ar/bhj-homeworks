const cartContainer = document.querySelector('.cart');
const cartProducts = document.querySelector('.cart__products');
const productsContainer = document.querySelector('.products');

// Функция для управления видимостью корзины (Повышенный уровень сложности)
function toggleCartVisibility() {
    if (cartProducts.children.length === 0) {
        cartContainer.style.display = 'none'; // Скрываем корзину, если она пуста
    } else {
        cartContainer.style.display = 'block'; // Показываем, если есть товары
    }
}

// Инициализация: проверяем видимость при старте страницы
toggleCartVisibility();

// 1. Управление количеством и добавлением в карточках товаров
productsContainer.addEventListener('click', (e) => {
    const decBtn = e.target.closest('.product__quantity-control_dec');
    const incBtn = e.target.closest('.product__quantity-control_inc');
    const addBtn = e.target.closest('.product__add');

    // Изменение счетчика в карточке
    if (decBtn || incBtn) {
        const product = e.target.closest('.product');
        const quantityValue = product.querySelector('.product__quantity-value');
        let currentCount = parseInt(quantityValue.textContent);

        if (incBtn) {
            currentCount++;
        } else if (decBtn && currentCount > 1) { // Минимальное число товаров - 1
            currentCount--;
        }

        quantityValue.textContent = currentCount;
    }

    // Добавление товара в корзину
    if (addBtn) {
        const product = e.target.closest('.product');
        const productId = product.dataset.id;
        const productImageSrc = product.querySelector('.product__image').src;
        const quantityValue = product.querySelector('.product__quantity-value');
        const countToAdd = parseInt(quantityValue.textContent);

        // Ищем товар в корзине по data-id
        const cartProduct = cartProducts.querySelector(`.cart__product[data-id="${productId}"]`);

        if (cartProduct) {
            // Если товар есть, увеличиваем его количество
            const cartProductCount = cartProduct.querySelector('.cart__product-count');
            cartProductCount.textContent = parseInt(cartProductCount.textContent) + countToAdd;
        } else {
            // Если товара нет, создаем новый элемент по шаблону
            const newCartProduct = document.createElement('div');
            newCartProduct.className = 'cart__product';
            newCartProduct.dataset.id = productId;

            newCartProduct.innerHTML = `
                <img class="cart__product-image" src="${productImageSrc}">
                <div class="cart__product-count">${countToAdd}</div>
            `;

            cartProducts.appendChild(newCartProduct);
        }

        // Сбрасываем счетчик в карточке обратно на 1
        quantityValue.textContent = '1';
        
        // Проверяем видимость корзины после добавления
        toggleCartVisibility();
    }
});

// 2. Удаление товаров из корзины при клике на них (Повышенный уровень сложности)
cartProducts.addEventListener('click', (e) => {
    const clickedProduct = e.target.closest('.cart__product');
    
    if (clickedProduct) {
        clickedProduct.remove(); // Полностью удаляем элемент из HTML-структуры
        toggleCartVisibility();   // Проверяем, не опустела ли корзина
    }
});