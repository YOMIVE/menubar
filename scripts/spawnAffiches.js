
// Импортируем коллекцию афиш
import affichesCollection from './../data/affiches.js';

document.addEventListener('DOMContentLoaded', () => {
    initializeSlider();
});

let currentLanguage = 'ENG'; // Начальный язык
let currentIndex = 0; // Текущий индекс афиши

const languageDropdown = document.querySelector('.language-dropdown');
if (!languageDropdown) {
    console.error('Language dropdown not found');
} else {
    languageDropdown.classList.remove('hidden');
}



// Инициализация слайдера
function initializeSlider() {
    const track = document.querySelector('.affiche-track');
    const dotsContainer = document.querySelector('.dots-container');

    if (!track || !dotsContainer) {
        console.error("Elements for the slider are not found.");
        return;
    }

    // Добавляем обработчики свайпов
    addSwipeHandlers(track);

    // Генерация афиш и обновление слайдера
    spawnAffiches();
    setupLanguageSwitcher();
    updateSlider();

    // Навигация кнопками
    document.querySelector('.nav-button.left').addEventListener('click', navigateLeft);
    document.querySelector('.nav-button.right').addEventListener('click', navigateRight);

    // Смена языка
    setupLanguageSwitcher();
}

// Генерация афиш
function spawnAffiches() {
    const track = document.querySelector('.affiche-track');
    if (!track) return;

    track.innerHTML = ''; // Очистка трека

    affichesCollection.forEach(affiche => {
        const afficheElement = createAffiche(affiche);
        track.appendChild(afficheElement);
    });

    updateSlider(); // Обновляем слайдер после добавления афиш
}

// Создание афиши
function createAffiche(affiche) {
    const afficheDiv = document.createElement('div');
    afficheDiv.classList.add('affiche');
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

// Обновление слайдера
function updateSlider() {
    const track = document.querySelector('.affiche-track');
    const affiches = document.querySelectorAll('.affiche');

    if (!affiches.length) {
        console.error('No affiches available to update slider.');
        return;
    }

    const afficheWidth = affiches[0].offsetWidth; // Ширина одной афиши
    const offset = -currentIndex * afficheWidth;

    track.style.transform = `translateX(${offset}px)`;
    track.style.transition = 'transform 0.3s ease-in-out';

    updateDots(); // Обновляем точки
    updateButtonsVisibility(); // Обновляем видимость кнопок
}

// Обновление точек
function updateDots() {
    const dotsContainer = document.querySelector('.dots-container');
    if (!dotsContainer) return;

    dotsContainer.innerHTML = ''; // Очистка

    affichesCollection.forEach((_, index) => {
        const dot = document.createElement('span');
        dot.classList.add('dot');
        if (index === currentIndex) dot.classList.add('active');
        dotsContainer.appendChild(dot);
    });
}

// Обновление видимости кнопок
function updateButtonsVisibility() {
    const leftButton = document.querySelector('.nav-button.left');
    const rightButton = document.querySelector('.nav-button.right');

    if (!leftButton || !rightButton) return;

    leftButton.style.display = currentIndex === 0 ? 'none' : 'flex';
    rightButton.style.display = currentIndex === affichesCollection.length - 1 ? 'none' : 'flex';
}

// Навигация влево
function navigateLeft() {
    if (currentIndex > 0) {
        currentIndex--;
        updateSlider();
    }
}

// Навигация вправо
function navigateRight() {
    if (currentIndex < affichesCollection.length - 1) {
        currentIndex++;
        updateSlider();
    }
}

// Обработчики свайпов
function addSwipeHandlers(track) {
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

    track.addEventListener('touchstart', handleTouchStart, { passive: false });
    track.addEventListener('touchmove', handleTouchMove, { passive: false });
    track.addEventListener('touchend', handleTouchEnd);
}

// Установка переключателя языка
function setupLanguageSwitcher() {
    const languageSelector = document.querySelector('.language-selector');
    const selectedLanguageBtn = document.querySelector('.selected-language');
    const languageDropdown = document.querySelector('.language-dropdown');

    if (!languageSelector || !selectedLanguageBtn || !languageDropdown) {
        console.error('Language switcher elements not found.');
        return;
    }

    // Переключение видимости выпадающего списка
    selectedLanguageBtn.addEventListener('click', () => {
        const isVisible = languageDropdown.classList.contains('visible');

        if (isVisible) {
            // Скрываем список
            languageDropdown.classList.remove('visible');
            languageDropdown.classList.add('hidden');
        } else {
            // Показываем список
            languageDropdown.classList.remove('hidden');
            languageDropdown.classList.add('visible');
        }
    });

    // Обработка выбора языка
    languageDropdown.addEventListener('click', (event) => {
        if (event.target.tagName === 'LI') {
            const newLanguage = event.target.dataset.lang;
            updateLanguage(newLanguage);

            // Обновляем текст кнопки с выбранным языком
            selectedLanguageBtn.textContent = event.target.textContent;

            // Скрываем выпадающий список
            languageDropdown.classList.add('hidden');
            languageDropdown.classList.remove('visible');
        }
    });

    // Закрытие выпадающего списка при клике вне его
    document.addEventListener('click', (event) => {
        if (!languageSelector.contains(event.target)) {
            languageDropdown.classList.add('hidden');
            languageDropdown.classList.remove('visible');
        }
    });
}

// Обновление языка
function updateLanguage(lang) {
    currentLanguage = lang;

    // Перегенерируем афиши и обновляем слайдер
    spawnAffiches();
    updateSlider();
}
