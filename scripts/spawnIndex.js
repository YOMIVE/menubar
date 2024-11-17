import drinksCollection from './../data/drinks.js';

// DOM элементы
const languageSelector = document.querySelector('.language-selector');
const selectedLanguageBtn = document.querySelector('.selected-language');
const languageDropdown = document.querySelector('.language-dropdown');

// Список переводов для заголовков
const pageTranslate = [
    { id: 'h3TopDrinks', varENG: 'Top Drinks', varRUS: 'Лучшие Напитки', varUKR: 'Кращі Напої', varTUR: 'En İyi İçecekler', varSRB: 'Најбоља пића', varKAZ: 'Үздік сусындар' },
    { id: 'h3SignatureСocktails', varENG: 'Signature Сocktails', varRUS: 'Авторские Коктейли', varUKR: 'Авторські Коктейлі', varTUR: 'İmza Kokteyller', varSRB: 'Потпис коктели', varKAZ: 'Авторлық коктейльдер' },
    { id: 'h3Desserts', varENG: 'Desserts', varRUS: 'Дессерты', varUKR: 'Авторські Коктейлі', varTUR: 'İmza Kokteyller', varSRB: 'Потпис коктели', varKAZ: 'Авторлық коктейльдер' },
    { id: 'h3SC', varENG: 'SC', varRUS: 'Авторские Коктейли', varUKR: 'Авторські Коктейлі', varTUR: 'İmza Kokteyller', varSRB: 'Потпис коктели', varKAZ: 'Авторлық коктейльдер' },
    { id: 'navBtn-TopDrinks', varENG: 'Top Drinks', varRUS: 'Лучшие Напитки', varUKR: 'Кращі Напої', varTUR: 'En İyi İçecekler', varSRB: 'Најбоља пића', varKAZ: 'Үздік сусындар' },
    { id: 'navBtn-SignatureCoctails', varENG: 'Signature Cocktails', varRUS: 'Авторские Коктейли', varUKR: 'Авторські Коктейлі', varTUR: 'İmza Kokteyller', varSRB: 'Потпис коктели', varKAZ: 'Авторлық коктейльдер' },
    { id: 'navBtn-Dishes', varENG: 'Dishes', varRUS: 'Блюда', varUKR: 'Страви', varTUR: 'Yemekler', varSRB: 'Јела', varKAZ: 'Ас мәзірі' },
    { id: 'navBtn-Snacks', varENG: 'Snacks', varRUS: 'Закуски', varUKR: 'Закуски', varTUR: 'Atıştırmalıklar', varSRB: 'Закусци', varKAZ: 'Таңғы ас' },
    { id: 'h3Desserts', varENG: 'Desserts', varRUS: 'Дессерты', varUKR: 'Десерти', varTUR: 'Tatlılar', varSRB: 'Десерти', varKAZ: 'Десерттер' }
,
];

// Текущий язык
let currentLanguage = 'ENG';

// Функция для отображения/скрытия списка языков
selectedLanguageBtn.addEventListener('click', () => {
    languageDropdown.classList.toggle('visible');
    languageDropdown.classList.toggle('hidden');
});

// Функция для смены языка
languageDropdown.addEventListener('click', (event) => {
    if (event.target.tagName === 'LI') {
        const newLanguage = event.target.dataset.lang;

        // Сменить выбранный язык
        updateLanguage(newLanguage);

        // Обновить текст кнопки
        selectedLanguageBtn.textContent = event.target.textContent;

        // Скрыть выпадающий список
        languageDropdown.classList.add('hidden');
        languageDropdown.classList.remove('visible');
    }
});

function updateLanguage(lang) {
    currentLanguage = lang;

    // Обновляем текст кнопки
    selectedLanguageBtn.textContent = getLanguageName(lang);

    // Обновляем выпадающий список языков
    updateLanguageDropdown();

    // Обновляем заголовки
    pageTranslate.forEach(translation => {
        const element = document.getElementById(translation.id);
        if (element) {
            element.textContent = translation[`var${lang}`];
        }
    });

    // Обновляем карточки
    spawnCards();
}

// Функция для обновления выпадающего списка
function updateLanguageDropdown() {
    languageDropdown.innerHTML = ''; // Очищаем список

    // Добавляем все языки, кроме текущего
    const languages = ['ENG', 'RUS', 'UKR', 'TUR', 'SRB', 'KAZ'];
    languages.forEach(lang => {
        if (lang !== currentLanguage) {
            const listItem = document.createElement('li');
            listItem.textContent = getLanguageName(lang);
            listItem.dataset.lang = lang;
            languageDropdown.appendChild(listItem);
        }
    });
}

// Функция для получения названия языка по его коду
function getLanguageName(langCode) {
    const languageNames = {
        ENG: 'ENG',
        RUS: 'RUS',
        UKR: 'UKR',
        TUR: 'TUR',
        SRB: 'SRB',
        KAZ: 'KAZ',
    };
    return languageNames[langCode];
}

function createCard(drink) {
    const card = document.createElement('div');
    card.classList.add('card');
    card.id = drink.id;
    
    if (drink.isOpen) {
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
        textDesc.innerHTML = `<p class="desc">${drink[`desc${currentLanguage}`]}</p>`;

        textWrapper.appendChild(textDesc);
        card.appendChild(cardPhoto);
        card.appendChild(textDiv);
        card.appendChild(textWrapper);

        return card;
    } else {
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
        card.appendChild(cardPhoto);
        card.appendChild(textDiv);

        return card;
    }
    
}

function spawnCards() {
    const scrollableContainers = document.querySelectorAll('.scrollable');
    scrollableContainers.forEach(container => {
        container.innerHTML = ''; // Очищаем контейнер

        const categoryClass = Array.from(container.classList).find(cat => cat !== 'scrollable');
        drinksCollection.forEach(drink => {
            if (shouldIncludeDrink(drink, categoryClass)) {
                const card = createCard(drink);
                container.appendChild(card);
            }
        });
    });

    // Привязываем обработчик кликов после добавления карточек
    attachCardClickHandlers();
}

// Фильтруем напитки по категории
function shouldIncludeDrink(drink, categoryClass) {
    switch (categoryClass) {
        case 'SC':
            return drink.id.startsWith('SC');
        case 'CF':
            return drink.id.startsWith('CF');
        case 'DS':
            return drink.id.startsWith('DS');
        case 'TOP':
            return drink.isTop;
        default:
            return false;
    }
}

// Привязка обработчиков событий к карточкам
function attachCardClickHandlers() {
    document.querySelectorAll('.card').forEach(card => {
        card.addEventListener('click', toggleActiveClass);
    });
}

// Функция для обработки клика по карточке
function toggleActiveClass(event) {
    const clickedCard = event.currentTarget;

    // Проверяем, есть ли у карточки класс active
    const isActive = clickedCard.classList.contains('active');

    // Если карточка не была активна, открываем её
    if (!isActive) {
        closeAllCards(); // Закрываем все карточки

        clickedCard.classList.add('active'); // Открываем текущую карточку

        // Получаем высоту .text-wrapper
        const textWrapper = clickedCard.querySelector('.text-wrapper');
        const textHeight = textWrapper ? textWrapper.offsetHeight : 0;

        // Устанавливаем новую высоту для карточки
        const baseHeight = 288; // Базовая высота карточки
        clickedCard.style.height = `${baseHeight + textHeight}px`;

        // Плавное появление текста
        setTimeout(() => {
            const textDesc = clickedCard.querySelector('.textDesc');
            textDesc.style.transition = 'opacity 0.3s ease';
            textDesc.style.opacity = 1;
        }, 100);
    } else {
        closeAllCards(); // Закрываем карточку, если она была активной
    }
}

// Функция для закрытия всех активных карточек
function closeAllCards() {
    const cards = document.querySelectorAll('.card.active');
    if (cards.length === 0) return; // Если нет активных карт, просто выходим

    cards.forEach(card => {
        card.classList.remove('active');
        card.style.height = ''; // Сброс высоты
        const textDesc = card.querySelector('.textDesc');
        if (textDesc) { // Убедимся, что элемент существует
            textDesc.style.opacity = 0; // Скрыть описание
        }
    });
}


// Начальное создание карточек
spawnCards();













