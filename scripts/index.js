document.addEventListener("DOMContentLoaded", () => {
    // Настройка обработчиков для каждого контейнера прокрутки и его кнопок
    document.querySelectorAll('.drinks-container').forEach(container => {
        const scrollContainer = container.querySelector('.scrollable');
        const leftButton = container.querySelector('.nav-button.left');
        const rightButton = container.querySelector('.nav-button.right');

        if (!scrollContainer || !leftButton || !rightButton) {
            console.error("Scrollable container or navigation buttons not found.");
            return;
        }

        // Функции прокрутки для текущего контейнера
        const scrollRight = () => {
            scrollContainer.scrollBy({ left: 200, behavior: 'smooth' });
        };

        const scrollLeft = () => {
            scrollContainer.scrollBy({ left: -200, behavior: 'smooth' });
        };

        // Обновление видимости кнопок
        const updateButtonVisibility = () => {
            leftButton.style.display = scrollContainer.scrollLeft === 0 ? 'none' : 'flex';
            rightButton.style.display = (scrollContainer.scrollLeft + scrollContainer.clientWidth >= scrollContainer.scrollWidth) ? 'none' : 'flex';
        };

        // Привязка обработчиков событий для кнопок прокрутки
        leftButton.addEventListener('click', () => {
            scrollLeft();
            setTimeout(updateButtonVisibility, 300); // Обновление кнопок после прокрутки
        });

        rightButton.addEventListener('click', () => {
            scrollRight();
            setTimeout(updateButtonVisibility, 300); // Обновление кнопок после прокрутки
        });

        // Проверка начального состояния кнопок
        updateButtonVisibility();

        // Обработчик прокрутки контейнера
        scrollContainer.addEventListener('scroll', updateButtonVisibility);
    });
});


// Функция для закрытия всех активных карточек
function closeAllCards() {
    document.querySelectorAll('.card.active').forEach(card => {
        card.classList.remove('active');
        card.style.height = ''; // Сброс высоты
        card.querySelector('.textDesc').style.opacity = 0; // Скрыть описание
    });
}
