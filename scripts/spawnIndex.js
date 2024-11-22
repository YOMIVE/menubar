import drinksCollection from './../data/drinks.js';
import dishesCollection from './../data/dishes.js';


// DOM элементы
const languageSelector = document.querySelector('.language-selector');
const selectedLanguageBtn = document.querySelector('.selected-language');
const languageDropdown = document.querySelector('.language-dropdown');

// Список переводов для заголовков
const pageTranslate = [
    { id: 'h4Drinks', varENG: 'Drinks', varRUS: 'Напитки', varUKR: 'Напої', varTUR: 'İçecekler', varSRB: 'Пића', varKAZ: 'Сусындар', varARM: 'Ըմպելիքներ', varBLR: 'Напоі' },
    { id: 'h4Dishes', varENG: 'Dishes', varRUS: 'Блюда', varUKR: 'Страви', varTUR: 'Yemekler', varSRB: 'Јела', varKAZ: 'Тамақтар', varARM: 'Ուտեստներ', varBLR: 'Стравы' },
    { id: 'h3Top', mobileId: 'mobile-h3Top', varENG: 'Top', varRUS: 'Лучшее', varUKR: 'Найкраще', varTUR: 'En İyisi', varSRB: 'Најбоље', varKAZ: 'Үздік', varARM: 'Լավագույնը', varBLR: 'Лепшае' },
    { id: 'h3TopDrinks', varENG: 'Top Drinks', varRUS: 'Лучшие Напитки', varUKR: 'Кращі Напої', varTUR: 'En İyi İçecekler', varSRB: 'Најбоља пића', varKAZ: 'Үздік сусындар', varARM: 'Լավագույն ըմպելիքներ', varBLR: 'Лепшыя Напоі' },
    { id: 'h3SignatureСocktails', varENG: 'Signature Сocktails', varRUS: 'Авторские Коктейли', varUKR: 'Авторські Коктейлі', varTUR: 'İmza Kokteyller', varSRB: 'Потпис коктели', varKAZ: 'Авторлық коктейльдер', varARM: 'Հեղինակային Կոկտեյլներ', varBLR: 'Аўтарскія Кактэйлі' },
    { id: 'h3Desserts', varENG: 'Desserts', varRUS: 'Дессерты', varUKR: 'Десерти', varTUR: 'Tatlılar', varSRB: 'Десерти', varKAZ: 'Десерттер', varARM: 'Աղանդեր', varBLR: 'Дэсэрты' },
    { id: 'h3Dishes', varENG: 'Dishes', varRUS: 'Блюда', varUKR: 'Страви', varTUR: 'Yemekler', varSRB: 'Јела', varKAZ: 'Ас мәзірі', varARM: 'Ուտեստներ', varBLR: 'Стравы' },
    { id: 'navBtn-TopDrinks', mobileId: 'mobile-navBtn-TopDrinks', varENG: 'Top Drinks', varRUS: 'Лучшие Напитки', varUKR: 'Кращі Напої', varTUR: 'En İyi İçecekler', varSRB: 'Најбоља пића', varKAZ: 'Үздік сусындар', varARM: 'Լավագույն ըմպելիքներ', varBLR: 'Лепшыя Напоі' },
    { id: 'navBtn-SignatureCoctails', mobileId: 'mobile-navBtn-SignatureCoctails', varENG: 'Signature Cocktails', varRUS: 'Авторские Коктейли', varUKR: 'Авторські Коктейлі', varTUR: 'İmza Kokteyller', varSRB: 'Потпис коктели', varKAZ: 'Авторлық коктейльдер', varARM: 'Հեղինակային Կоктейльներ', varBLR: 'Аўтарскія Кактэйлі' },
    { id: 'navBtn-Dishes', mobileId: 'mobile-navBtn-Dishes', varENG: 'Dishes', varRUS: 'Блюда', varUKR: 'Страви', varTUR: 'Yemekler', varSRB: 'Јела', varKAZ: 'Ас мәзірі', varARM: 'Ուտեստներ', varBLR: 'Стравы' },
    { id: 'navBtn-Snacks', mobileId: 'mobile-navBtn-Snacks', varENG: 'Snacks', varRUS: 'Закуски', varUKR: 'Закуски', varTUR: 'Atıştırmalıklar', varSRB: 'Закусци', varKAZ: 'Таңғы ас', varARM: 'Խորտիկներ', varBLR: 'Закускі' },
    { id: 'navBtn-Desserts', mobileId: 'mobile-navBtn-Desserts', varENG: 'Desserts', varRUS: 'Дессерты', varUKR: 'Десерти', varTUR: 'Tatlılar', varSRB: 'Десерти', varKAZ: 'Десерттер', varARM: 'Աղանդեր', varBLR: 'Дэсэрты' },
    { id: 'navBtn-DrinksMap', mobileId: 'mobile-navBtn-DrinksMap', varENG: 'Drinks Map', varRUS: 'Карта Напитков', varUKR: 'Карта Напоїв', varTUR: 'İçecek Haritası', varSRB: 'Мапа пића', varKAZ: 'Сусындар картасы', varARM: 'Ըմպելիքների քարտեզ', varBLR: 'Карта Напояў' },
    { id: 'navBtn-DishesMap', mobileId: 'mobile-navBtn-DishesMap', varENG: 'Dishes Map', varRUS: 'Карта Блюд', varUKR: 'Карта Страв', varTUR: 'Yemek Haritası', varSRB: 'Мапа јела', varKAZ: 'Ас мәзірі картасы', varARM: 'Ուտեստների քարտեզ', varBLR: 'Карта Страв' },
    { id: 'navBtn-MainPage', mobileId: 'mobile-navBtn-MainPage', varENG: 'Main Page', varRUS: 'Главная Страница', varUKR: 'Головна Сторінка', varTUR: 'Ana Sayfa', varSRB: 'Главна Страница', varKAZ: 'Басты Бет', varARM: 'Գլխավոր Էջ', varBLR: 'Галоўная Старонка' },
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

        // Обновляем язык для десктопного и мобильного меню
        updateLanguage(newLanguage);
        updateMobileMenuLanguage(newLanguage);

        // Обновляем текст кнопки
        selectedLanguageBtn.textContent = event.target.textContent;

        // Скрываем выпадающий список
        languageDropdown.classList.add('hidden');
        languageDropdown.classList.remove('visible');
    }
});


function updateLanguage(lang) {
    currentLanguage = lang;

    // Обновляем текст кнопки языка
    selectedLanguageBtn.textContent = getLanguageName(lang);

    // Обновляем выпадающий список языков
    updateLanguageDropdown();

    // Обновляем заголовки и кнопки
    pageTranslate.forEach(translation => {
        const element = document.getElementById(translation.id);
        if (element) {
            element.textContent = translation[`var${lang}`];
        }

        // Обновляем мобильное меню, если есть соответствующий ID
        const mobileElement = document.getElementById(translation.mobileId);
        if (mobileElement) {
            mobileElement.textContent = translation[`var${lang}`];
        }
    });

    // Обновляем другие элементы, если необходимо
    spawnCards();
}


// Функция для обновления выпадающего списка
function updateLanguageDropdown() {
    languageDropdown.innerHTML = ''; // Очищаем список

    // Добавляем все языки, кроме текущего
    const languages = ['ENG', 'RUS', 'UKR', 'TUR', 'SRB', 'KAZ', 'ARM', 'BLR'];
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
        ARM: 'ARM',
        BLR: 'BLR',
    };
    return languageNames[langCode];
}

function updateMobileMenuLanguage(language) {
    pageTranslate.forEach(item => {
        // Обновляем десктопное меню
        const desktopButton = document.getElementById(item.id);
        if (desktopButton) {
            desktopButton.textContent = item[`var${language}`];
        }

        // Обновляем мобильное меню
        const mobileButton = document.getElementById(item.mobileId);
        if (mobileButton) {
            mobileButton.textContent = item[`var${language}`];
        }
    });
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

        // Универсальная обработка обеих коллекций
        [drinksCollection, dishesCollection].forEach(collection => {
            collection.forEach(item => {
                if (shouldIncludeDrink(item, categoryClass)) {
                    const card = createCard(item);
                    container.appendChild(card);
                }
            });
        });
    });

    // Привязываем обработчик кликов после добавления карточек
    attachCardClickHandlers();
}




// Фильтруем напитки по категории
function shouldIncludeDrink(item, categoryClass) {
    switch (categoryClass) {
        case 'SC':
            return item.id.startsWith('SC'); // Напитки (Signature Cocktails)
        case 'DSH':
            return item.id.startsWith('DSH'); // Блюда
        case 'DS':
            return item.id.startsWith('DS'); // Десерты
        case 'TOP':
            return item.isTop;
        case 'CO':
            return item.id.startsWith('CO');
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













