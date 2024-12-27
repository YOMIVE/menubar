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
    { id: 'h3Top', mobileId: 'mobile-navBtn-Top', varENG: 'Top', varRUS: 'Лучшее', varUKR: 'Найкраще', varTUR: 'En İyisi', varSRB: 'Најбоље', varKAZ: 'Үздік', varARM: 'Լավագույնը', varBLR: 'Лепшае' },
    { id: 'navBtn-Top', mobileId: 'mobile-navBtn-Top', varENG: 'Top', varRUS: 'Лучшее', varUKR: 'Найкраще', varTUR: 'En İyisi', varSRB: 'Најбоље', varKAZ: 'Үздік', varARM: 'Լավագույնը', varBLR: 'Лепшае' },
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
    { id: 'h4-section', varENG: 'The presentation may vary', varRUS: 'Сервировка может отличаться', varUKR: 'Сервірування може відрізнятися', varTUR: 'Sunum farklılık gösterebilir', varSRB: 'Сервирање може да варира', varKAZ: 'Сервировка өзгеше болуы мүмкін', varARM: 'Սերվիրումը կարող է տարբերվել', varBLR: 'Сервіроўка можа адрознівацца' },
    { id: 'h3Сocktails', varENG: 'Cocktails', varRUS: 'Коктейли', varUKR: 'Коктейлі', varTUR: 'Kokteyller', varSRB: 'Коктели', varKAZ: 'Коктейльдер', varARM: 'Կոկտեյլներ', varBLR: 'Коктейлі' },
    { id: 'h3СoffeeAndTea', varENG: 'Coffee & Tea', varRUS: 'Кофе и Чай', varUKR: 'Кава та Чай', varTUR: 'Kahve ve Çay', varSRB: 'Кафа и чај', varKAZ: 'Кофе мен Шай', varARM: 'Սուրճ և Թեյ', varBLR: 'Кава і Чай' },
    { id: 'h3SoftDrinks', varENG: 'Soft Drinks', varRUS: 'Безалкогольные Напитки', varUKR: 'Безалкогольні Напої', varTUR: 'Alkolsüz İçecekler', varSRB: 'Безалкохолна пића', varKAZ: 'Алкогольсіз Сусындар', varARM: 'Ալկոհոլազուրկ Ըմպելիքներ', varBLR: 'Безалкагольныя Напоі' },
    { id: 'h3NACO', varENG: 'No Alcohol Cocktails', varRUS: 'Безалкогольные Коктейли', varUKR: 'Безалкогольні Коктейлі', varTUR: 'Alkolsüz Kokteyller', varSRB: 'Безалкохолни коктели', varKAZ: 'Алкогольсіз Коктейльдер', varARM: 'Ալկոհոլազուրկ Կոկտեյլներ', varBLR: 'Безалкагольныя Кактэйлі' },
    { id: 'h3Beer', varENG: 'Bottled Beer', varRUS: 'Пиво в Бутылках', varUKR: 'Пиво в Пляшках', varTUR: 'Şişelenmiş Bira', varSRB: 'Пиво у флашама', varKAZ: 'Бөтелкедегі Сыра', varARM: 'Շշալցված Գարեջուր', varBLR: 'Піва ў Бутэльках' },
    { id: 'h3Wine', varENG: 'Wine', varRUS: 'Вино', varUKR: 'Вино', varTUR: 'Şarap', varSRB: 'Вино', varKAZ: 'Шарап', varARM: 'Գինի', varBLR: 'Віно' },
    { id: 'h3Shots', varENG: 'Shots', varRUS: 'Шоты', varUKR: 'Шоти', varTUR: 'Shotlar', varSRB: 'Шотови', varKAZ: 'Шоттар', varARM: 'Շոտեր', varBLR: 'Шоты' },
    { id: 'navBtn-CoffeeAndTea', mobileId: 'mobile-navBtn-CoffeeAndTea', varENG: 'Coffee & Tea', varRUS: 'Кофе и Чай', varUKR: 'Кава та Чай', varTUR: 'Kahve ve Çay', varSRB: 'Кафа и чај', varKAZ: 'Кофе мен Шай', varARM: 'Սուրճ և Թեյ', varBLR: 'Кава і Чай' },
    { id: 'navBtn-SoftDrinks', mobileId: 'mobile-navBtn-SoftDrinks', varENG: 'Soft Drinks', varRUS: 'Безалкогольные Напитки', varUKR: 'Безалкогольні Напої', varTUR: 'Alkolsüz İçecekler', varSRB: 'Безалкохолна пића', varKAZ: 'Алкогольсіз Сусындар', varARM: 'Ալկոհոլազուրկ Ըմպելիքներ', varBLR: 'Безалкагольныя Напоі' },
    { id: 'navBtn-Сocktails', mobileId: 'mobile-navBtn-Сocktails', varENG: 'Cocktails', varRUS: 'Коктейли', varUKR: 'Коктейлі', varTUR: 'Kokteyller', varSRB: 'Коктели', varKAZ: 'Коктейльдер', varARM: 'Կոկտեյլներ', varBLR: 'Кактэйлі' },
    { id: 'navBtn-Wine', mobileId: 'mobile-navBtn-Wine', varENG: 'Wine', varRUS: 'Вино', varUKR: 'Вино', varTUR: 'Şarap', varSRB: 'Вино', varKAZ: 'Шарап', varARM: 'Գինի', varBLR: 'Віно' },
    { id: 'navBtn-BottledBeer', mobileId: 'mobile-navBtn-BottledBeer', varENG: 'Bottled Beer', varRUS: 'Пиво в Бутылках', varUKR: 'Пиво в Пляшках', varTUR: 'Şişelenmiş Bira', varSRB: 'Пиво у флашама', varKAZ: 'Бөтелкедегі Сыра', varARM: 'Շշալցված Գարեջուր', varBLR: 'Піва ў Бутэльках' },
    { id: 'navBtn-Shots', mobileId: 'mobile-navBtn-Shots', varENG: 'Shots', varRUS: 'Шоты', varUKR: 'Шоти', varTUR: 'Shotlar', varSRB: 'Шотови', varKAZ: 'Шоттар', varARM: 'Շոտեր', varBLR: 'Шоты' },
    { id: 'h3Breakfast', varENG: 'Breakfast', varRUS: 'Завтрак', varUKR: 'Сніданок', varTUR: 'Kahvaltı', varSRB: 'Доручак', varKAZ: 'Таңғы ас', varARM: 'Նախաճաշ', varBLR: 'Сняданак' },
    { id: 'h3Pancakes', varENG: 'Pancakes', varRUS: 'Блины', varUKR: 'Млинці', varTUR: 'Krep', varSRB: 'Палачинке', varKAZ: 'Блиндер', varARM: 'Բլիթներ', varBLR: 'Бліны' },
    { id: 'h3Salads', varENG: 'Salads', varRUS: 'Салаты', varUKR: 'Салати', varTUR: 'Salatalar', varSRB: 'Салате', varKAZ: 'Салаттар', varARM: 'Աղցաններ', varBLR: 'Салаты' },
    { id: 'h3Sauces(50G)', varENG: 'Sauces (50G)', varRUS: 'Соусы (50Г)', varUKR: 'Соуси (50Г)', varTUR: 'Soslar (50G)', varSRB: 'Сосови (50Г)', varKAZ: 'Соустар (50Г)', varARM: 'Սոուսներ (50Գ)', varBLR: 'Соусы (50Г)' },
    { id: 'h3Burgers', varENG: 'Burgers', varRUS: 'Бургеры', varUKR: 'Бургери', varTUR: 'Burgerler', varSRB: 'Бургер', varKAZ: 'Бургерлер', varARM: 'Բուրգերներ', varBLR: 'Бургеры' },
    { id: 'h3Bruschetta', varENG: 'Bruschetta', varRUS: 'Брускетта', varUKR: 'Брускета', varTUR: 'Bruschetta', varSRB: 'Брускета', varKAZ: 'Брускетта', varARM: 'Բրուսկետա', varBLR: 'Брускетта' },
    { id: 'h3Snaks', varENG: 'Snacks', varRUS: 'Закуски', varUKR: 'Закуски', varTUR: 'Atıştırmalıklar', varSRB: 'Закуске', varKAZ: 'Таңғы ас', varARM: 'Խորտիկներ', varBLR: 'Закускі' },
    { id: 'h3HotSnacks', varENG: 'Hot Snacks', varRUS: 'Горячие Закуски', varUKR: 'Гарячі Закуски', varTUR: 'Sıcak Atıştırmalıklar', varSRB: 'Топле закуске', varKAZ: 'Ыстық Таңғы Ас', varARM: 'Տաք Խորտիկներ', varBLR: 'Гарачыя Закускі' },
    { id: '', varENG: '', varRUS: '', varUKR: '', varTUR: '', varSRB: '', varKAZ: '', varARM: '', varBLR: '' },
    { id: '', varENG: '', varRUS: '', varUKR: '', varTUR: '', varSRB: '', varKAZ: '', varARM: '', varBLR: '' },
    { id: '', varENG: '', varRUS: '', varUKR: '', varTUR: '', varSRB: '', varKAZ: '', varARM: '', varBLR: '' },
    { id: '', varENG: '', varRUS: '', varUKR: '', varTUR: '', varSRB: '', varKAZ: '', varARM: '', varBLR: '' },
    { id: 'navBtn-Breakfast', mobileId: 'mobile-navBtn-Breakfast', varENG: 'Breakfast', varRUS: 'Завтрак', varUKR: 'Сніданок', varTUR: 'Kahvaltı', varSRB: 'Доручак', varKAZ: 'Таңғы ас', varARM: 'Նախաճաշ', varBLR: 'Сняданак' },
    { id: 'navBtn-Burgers', mobileId: 'mobile-navBtn-Burgers', varENG: 'Burgers', varRUS: 'Бургеры', varUKR: 'Бургери', varTUR: 'Burgerler', varSRB: 'Бургерi', varKAZ: 'Бургерлер', varARM: 'Բուրգերներ', varBLR: 'Бургеры' },
    { id: 'navBtn-Beer', mobileId: 'mobile-navBtn-Beer', varENG: 'Beer', varRUS: 'Пиво', varUKR: 'Пиво', varTUR: 'Bira', varSRB: 'Пиво', varKAZ: 'Сыра', varARM: 'Գարեջուր', varBLR: 'Піва' },
    { id: 'navBtn-Wine', mobileId: 'mobile-navBtn-Wine', varENG: 'Wine', varRUS: 'Вино', varUKR: 'Вино', varTUR: 'Şarap', varSRB: 'Вино', varKAZ: 'Шарап', varARM: 'Գինի', varBLR: 'Віно' },
    { id: 'navBtn-Pancakes', mobileId: 'mobile-navBtn-Pancakes', varENG: 'Pancakes', varRUS: 'Блины', varUKR: 'Млинці', varTUR: 'Pankekler', varSRB: 'Палачинке', varKAZ: 'Құймақтар', varARM: 'Պանկեյքեր', varBLR: 'Бліны' },
    { id: 'navBtn-Salads', mobileId: 'mobile-navBtn-Salads', varENG: 'Salads', varRUS: 'Салаты', varUKR: 'Салати', varTUR: 'Salatalar', varSRB: 'Салате', varKAZ: 'Салаттар', varARM: 'Աղցաններ', varBLR: 'Салаты' },
    { id: 'navBtn-Bruschetta', mobileId: 'mobile-navBtn-Bruschetta', varENG: 'Bruschetta', varRUS: 'Брускетта', varUKR: 'Брускета', varTUR: 'Bruschetta', varSRB: 'Брускета', varKAZ: 'Брускетта', varARM: 'Բրուսկետա', varBLR: 'Брускета' },
    { id: 'navBtn-Snaks', mobileId: 'mobile-navBtn-Snaks', varENG: 'Snacks', varRUS: 'Закуски', varUKR: 'Закуски', varTUR: 'Atıştırmalıklar', varSRB: 'Закуске', varKAZ: 'Тіскебасарлар', varARM: 'Խորտիկներ', varBLR: 'Закускі' },
    { id: '', mobileId: 'mobile-', varENG: '', varRUS: '', varUKR: '', varTUR: '', varSRB: '', varKAZ: '', varARM: '', varBLR: '' },

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

    
    populateSections()
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

    // Создаем картинку
    const cardPhoto = document.createElement('img');
    cardPhoto.src = drink.image;
    cardPhoto.alt = drink.name;
    cardPhoto.classList.add('cardPhoto');

    // Создаем блок текста
    const textDiv = document.createElement('div');
    textDiv.classList.add('text');

    // Проверяем длину названия
    const isLongName = drink.name.length > 18;

    // Создаем блок для названия
    const nameContainer = document.createElement('div');
    nameContainer.classList.add('name-container');

    const nameElement = document.createElement('p');
    nameElement.classList.add('name');
    nameElement.textContent = drink.name;

    if (isLongName) {
        nameElement.style.fontSize = '16px';
        nameContainer.style.display = 'flex';
        nameContainer.style.alignItems = 'center';
        nameContainer.style.justifyContent = 'center';
    }

    nameContainer.appendChild(nameElement);

    // Создаем блок для цены
    const priceContainer = document.createElement('div');
    priceContainer.classList.add('price-container');

    const priceElement = document.createElement('p');
    priceElement.classList.add('price');
    priceElement.textContent = drink.price;

    priceContainer.appendChild(priceElement);

    // Добавляем название и цену в textDiv
    textDiv.appendChild(nameContainer);
    textDiv.appendChild(priceContainer);

    if (drink.isOpen) {
        // Создаем блок с описанием
        const textWrapper = document.createElement('div');
        textWrapper.classList.add('text-wrapper');

        const textDesc = document.createElement('div');
        textDesc.classList.add('textDesc');
        textDesc.innerHTML = `<p class="desc">${drink[`desc${currentLanguage}`]}</p>`;

        textWrapper.appendChild(textDesc);

        // Добавляем элементы в карточку в правильном порядке
        card.appendChild(cardPhoto); // Сначала картинка
        card.appendChild(textDiv);   // Затем название и цена
        card.appendChild(textWrapper); // Описание добавляется внизу
    } else {
        card.appendChild(cardPhoto); // Сначала картинка
        card.appendChild(textDiv);   // Затем название и цена
    }

    return card;
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


function populateSections() {
    const sections = document.querySelectorAll('.text-section .list'); // Находим все секции с классом list

    sections.forEach(section => {
        const classList = Array.from(section.classList); // Получаем список классов
        const categoryClass = classList.find(cls => cls !== 'list'); // Определяем ключ категории (например, CO, SAL)

        if (!categoryClass) {
            console.warn('Category class not found for section:', section);
            return;
        }

        section.innerHTML = ''; // Очищаем секцию перед заполнением

        // Фильтруем элементы коллекции по категории
        const filteredItems = drinksCollection.filter(item => item.id.startsWith(categoryClass));
        if (!filteredItems.length) {
            console.warn(`No items found for category: ${categoryClass}`);
            return;
        }

        // Определяем формат секции (2 или 3 буквы в ключе)
        const isDetailedFormat = categoryClass.length === 3;

        // Генерируем элементы секции
        filteredItems.forEach(item => {
            const listItem = document.createElement('div');
            listItem.classList.add('list-item');

            // Определяем имя, цену и описание
            const name = item[`name${currentLanguage}`] || item.name || 'Unnamed';
            const price = item.price || 'N/A';
            const description = isDetailedFormat
                ? (item[`desc${currentLanguage}`] || 'No description available').replace(/<br\s*\/?>/g, ' ')
                : null;

            // Создаем контейнер для названия и цены
            const nameContainer = document.createElement('div');
            nameContainer.classList.add('name-container');

            const nameElement = document.createElement('span');
            nameElement.classList.add('name');
            nameElement.textContent = name;

            const priceElement = document.createElement('span');
            priceElement.classList.add('price');
            priceElement.textContent = price;

            nameContainer.appendChild(nameElement);
            nameContainer.appendChild(priceElement);
            listItem.appendChild(nameContainer);

            // Добавляем описание, если это требуется форматом
            if (description) {
                const descriptionElement = document.createElement('div');
                descriptionElement.classList.add('description');
                descriptionElement.textContent = description;
                listItem.appendChild(descriptionElement);
            }

            section.appendChild(listItem);
        });
    });
}

// Вызов функции при загрузке страницы
document.addEventListener('DOMContentLoaded', populateSections);

// Вызов функции при смене языка
selectedLanguageBtn.addEventListener('click', () => {
    setTimeout(populateSections, 300); // Обновляем после смены языка
});






// Начальное создание карточек
spawnCards();













