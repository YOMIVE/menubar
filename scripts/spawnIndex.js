import drinksCollection from './drinks.js'; // Импортируем коллекцию напитков

function createCard(drink) {
    const card = document.createElement('div');
    card.classList.add('card');
    card.id = drink.id;

    const cardPhoto = document.createElement('img');
    cardPhoto.src = drink.image;
    cardPhoto.alt = drink.name;
    cardPhoto.classList.add('cardPhoto');

    const textDiv = document.createElement('div');
    textDiv.classList.add('text');
    textDiv.innerHTML = `
        <p class="name">${drink.name}</p>
        <p class="price">${drink.price}</p>
    `;

    const textWrapper = document.createElement('div');
    textWrapper.classList.add('text-wrapper');

    const textDesc = document.createElement('div');
    textDesc.classList.add('textDesc');
    textDesc.innerHTML = `<p class="desc">${drink.desc}</p>`;

    textWrapper.appendChild(textDesc);
    card.appendChild(cardPhoto);
    card.appendChild(textDiv);
    card.appendChild(textWrapper);

    return card;
}

function spawnCards() {
    // Получаем все контейнеры с классом .scrollable
    const scrollableContainers = document.querySelectorAll('.scrollable');

    // Проходимся по каждому контейнеру и создаём карточки в зависимости от его класса
    scrollableContainers.forEach(container => {
        container.innerHTML = ''; // Очищаем текущий контейнер

        // Находим категорию из классов контейнера (например, 'SC', 'TOP', 'SPECIAL')
        const categories = Array.from(container.classList);
        const categoryClass = categories.find(cat => cat !== 'scrollable');

        // Фильтруем и добавляем карточки для текущего контейнера
        drinksCollection.forEach(drink => {
            if (shouldIncludeDrink(drink, categoryClass)) {
                const card = createCard(drink);
                container.appendChild(card);
            }
        });
    });
}

// Проверяем, соответствует ли напиток категории
function shouldIncludeDrink(drink, categoryClass) {
    switch (categoryClass) {
        case 'SC':
            return drink.id.startsWith('SC');
        case 'TOP':
            return drink.isTop;
        case 'SPECIAL':
            return drink.isSpecial; // Пример для новой категории
        default:
            return false;
    }
}

// Запуск функции для создания карточек в каждом контейнере
spawnCards();
