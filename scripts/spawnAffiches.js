document.addEventListener('DOMContentLoaded', () => {
    const track = document.querySelector('.affiche-track');
    let startX = 0;
    let currentX = 0;
    let isSwiping = false;

    function handleTouchStart(event) {
        startX = event.touches[0].clientX;
        isSwiping = true;
    }

    function handleTouchMove(event) {
        if (!isSwiping) return;
        currentX = event.touches[0].clientX;
    }

    function handleTouchEnd() {
        if (!isSwiping) return;

        const swipeDistance = currentX - startX;

        if (swipeDistance > 50) {
            navigateLeft(); // Листаем влево
        } else if (swipeDistance < -50) {
            navigateRight(); // Листаем вправо
        }

        isSwiping = false;
    }

    track.addEventListener('touchstart', handleTouchStart);
    track.addEventListener('touchmove', handleTouchMove);
    track.addEventListener('touchend', handleTouchEnd);

    // Обновляем слайдер после создания афиш
    spawnAffiches();
    updateSlider();
});


// DOM элементы
const languageSelector = document.querySelector('.language-selector');
const selectedLanguageBtn = document.querySelector('.selected-language');
const languageDropdown = document.querySelector('.language-dropdown');

// Импортируем коллекцию афиш
import affichesCollection from './../data/affiches.js';

let currentLanguage = 'ENG'; // Начальный язык - английский
let currentIndex = 0;

// Создание афиши с учетом языка
function createAffiche(affiche) {
    const afficheDiv = document.createElement('div');
    afficheDiv.classList.add('affiche');
    
    // Установка пути к изображению для фона
    afficheDiv.style.backgroundImage = `url('${affiche.image}')`;

    afficheDiv.innerHTML = `
        <div class="textGroup">
            <h2>${affiche[`mainText${currentLanguage}`]}</h2>
            <p class="data-textGroup">${affiche.date}</p>
            <p class="desc-textGroup">${affiche[`description${currentLanguage}`]}</p>
        </div>
        <div class="gradient"></div>
    `;

    return afficheDiv;
}

// Обновление точек
function updateDots() {
    const dotsContainer = document.querySelector('.dots-container');
    dotsContainer.innerHTML = ''; // Очистка

    affichesCollection.forEach((_, index) => {
        const dot = document.createElement('span');
        dot.classList.add('dot');
        if (index === currentIndex) dot.classList.add('active');
        dotsContainer.appendChild(dot);
    });
}

// Обновление кнопок
function updateButtonsVisibility() {
    const leftButton = document.querySelector('.nav-button.left');
    const rightButton = document.querySelector('.nav-button.right');

    leftButton.style.display = currentIndex === 0 ? 'none' : 'flex';
    rightButton.style.display = currentIndex === affichesCollection.length - 1 ? 'none' : 'flex';
}

// Обновление слайдера
function updateSlider() {
    const track = document.querySelector('.affiche-track');
    const afficheWidth = document.querySelector('.affiche').offsetWidth;
    const offset = -currentIndex * afficheWidth;

    track.style.transform = `translateX(${offset}px)`;
    track.style.transition = 'transform 0.3s ease-in-out';

    updateDots();
    updateButtonsVisibility();
}

// Навигация
function navigateLeft() {
    if (currentIndex > 0) {
        currentIndex--;
        updateSlider();
    }
}

function navigateRight() {
    if (currentIndex < affichesCollection.length - 1) {
        currentIndex++;
        updateSlider();
    }
}

// Генерация афиш
function spawnAffiches() {
    const track = document.querySelector('.affiche-track');
    const dotsContainer = document.querySelector('.dots-container');
    const slider = document.querySelector('.slider');

    // Очистка
    track.innerHTML = '';
    dotsContainer.innerHTML = '';

    // Добавляем афиши
    affichesCollection.forEach(affiche => {
        const afficheElement = createAffiche(affiche);
        track.appendChild(afficheElement);
    });

    // Обновление UI
    if (window.innerWidth > 600) {
        // Если ширина экрана больше 600 пикселей, скрываем слайдер
        slider.style.display = 'none';
    } else if (affichesCollection.length > 0) {
        // Если есть афиши и экран меньше 600 пикселей, показываем слайдер
        slider.style.display = 'block';
    } else {
        // Если нет афиш, скрываем слайдер
        slider.style.display = 'none';
    }

    updateSlider();  // Обновляем слайдер
}



// Смена языка
function updateAffichesLanguage(lang) {
    currentLanguage = lang; // Обновляем текущий язык
    spawnAffiches(); // Перегенерируем афиши с новым языком
    updateSlider(); // Перерисовываем слайдер
}

// Инициализация слайдера
document.addEventListener('DOMContentLoaded', () => {
    spawnAffiches();

    document.querySelector('.nav-button.left').addEventListener('click', navigateLeft);
    document.querySelector('.nav-button.right').addEventListener('click', navigateRight);
});


// Вызов при смене языка
languageDropdown.addEventListener('click', (event) => {
    if (event.target.tagName === 'LI') {
        const newLanguage = event.target.dataset.lang;
        updateAffichesLanguage(newLanguage);

        // Обновляем кнопку с текущим языком
        selectedLanguageBtn.textContent = event.target.textContent;

        // Закрываем выпадающий список
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