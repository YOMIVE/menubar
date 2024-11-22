import affichesCollection from './../data/affiches.js';

let currentLanguage = 'ENG'; // Начальный язык
let currentIndex = 0; // Текущий индекс афиши

document.addEventListener('DOMContentLoaded', () => {
    initializeSlider();
    setupLanguageSwitcher();
});

// Инициализация слайдера
function initializeSlider() {
    const track = document.querySelector('.affiche-track');
    const dotsContainer = document.querySelector('.dots-container');
    const leftButton = document.querySelector('.nav-button.left');
    const rightButton = document.querySelector('.nav-button.right');

    if (!track || !dotsContainer || !leftButton || !rightButton) {
        console.error("Essential slider elements are missing.");
        return;
    }

    // Генерация афиш
    spawnAffiches();

    // Настройка кнопок навигации
    leftButton.addEventListener('click', navigateLeft);
    rightButton.addEventListener('click', navigateRight);

    // Обработчики свайпов
    addSwipeHandlers(track);

    // Обновление состояния слайдера
    updateSlider();
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

// Обновление состояния слайдера
function updateSlider() {
    const track = document.querySelector('.affiche-track');
    const affiches = document.querySelectorAll('.affiche');

    if (!affiches.length) {
        console.error("No affiches available for slider.");
        return;
    }

    const afficheWidth = affiches[0].offsetWidth;
    const offset = -currentIndex * afficheWidth;

    track.style.transform = `translateX(${offset}px)`;
    track.style.transition = 'transform 0.3s ease-in-out';

    updateDots();
    updateButtonsVisibility();
}

// Обновление точек
function updateDots() {
    const dotsContainer = document.querySelector('.dots-container');
    if (!dotsContainer) return;

    dotsContainer.innerHTML = '';
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

// Добавление обработчиков свайпов
function addSwipeHandlers(track) {
    let startX = 0;
    let currentX = 0;

    track.addEventListener('touchstart', (event) => {
        startX = event.touches[0].clientX;
    });

    track.addEventListener('touchmove', (event) => {
        currentX = event.touches[0].clientX;
    });

    track.addEventListener('touchend', () => {
        const swipeDistance = currentX - startX;
        if (swipeDistance > 30) {
            navigateLeft();
        } else if (swipeDistance < -30) {
            navigateRight();
        }
    });
}

function setupLanguageSwitcher() {
    const selectedLanguageBtn = document.querySelector('.selected-language');
    const languageDropdown = document.querySelector('.language-dropdown');

    if (!selectedLanguageBtn || !languageDropdown) {
        console.error('Language switcher elements not found.');
        return;
    }

    // Переключение видимости выпадающего списка
    selectedLanguageBtn.addEventListener('click', () => {
        const isVisible = languageDropdown.classList.contains('visible');
        languageDropdown.classList.toggle('visible', !isVisible);
        languageDropdown.classList.toggle('hidden', isVisible);
    });

    // Закрытие выпадающего списка при клике вне него
    document.addEventListener('click', (event) => {
        if (!selectedLanguageBtn.contains(event.target) && !languageDropdown.contains(event.target)) {
            languageDropdown.classList.add('hidden');
            languageDropdown.classList.remove('visible');
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

    selectedLanguageBtn.addEventListener('click', () => {
        console.log('Button clicked!');
    });
    selectedLanguageBtn.addEventListener('click', () => {
        const isVisible = languageDropdown.classList.contains('visible');
        languageDropdown.classList.toggle('visible', !isVisible);
        languageDropdown.classList.toggle('hidden', isVisible);
    
        console.log('Dropdown classes:', languageDropdown.classList);
    });
    
}


// Обновление языка
function updateLanguage(lang) {
    currentLanguage = lang;

    // Перегенерируем афиши и обновляем слайдер
    spawnAffiches();
    updateSlider();
}
