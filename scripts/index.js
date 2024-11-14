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
        function scrollRight() {
            scrollContainer.scrollBy({ left: 200, behavior: 'smooth' });
        }

        function scrollLeft() {
            scrollContainer.scrollBy({ left: -200, behavior: 'smooth' });
        }

        // Обновление видимости кнопок
        function updateButtonVisibility() {
            leftButton.style.display = scrollContainer.scrollLeft === 0 ? 'none' : 'flex';
            rightButton.style.display = (scrollContainer.scrollLeft + scrollContainer.clientWidth >= scrollContainer.scrollWidth) ? 'none' : 'flex';
        }

        // Обработчики для кнопок прокрутки
        leftButton.addEventListener('click', () => {
            scrollLeft();
            setTimeout(updateButtonVisibility, 300);
        });

        rightButton.addEventListener('click', () => {
            scrollRight();
            setTimeout(updateButtonVisibility, 300);
        });

        // Проверка начального состояния кнопок
        updateButtonVisibility();

        // Обработчик прокрутки контейнера
        scrollContainer.addEventListener('scroll', updateButtonVisibility);

        // Обработчик клика по пустому пространству в drinks-container
        container.addEventListener('click', (event) => {
            if (!event.target.closest('.card')) {
                closeAllCards();
            }
        });
    });

    // Настройка обработчиков для каждой карточки
    document.querySelectorAll('.card').forEach(card => {
        card.addEventListener('click', toggleActiveClass);
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

// Функция для обработки клика по карточке
function toggleActiveClass(event) {
    const clickedCard = event.currentTarget;

    // Проверяем, есть ли у карточки класс active
    const isActive = clickedCard.classList.contains('active');

    // Убираем класс active у всех карточек и скрываем описание
    closeAllCards();

    // Если карточка не была активна, добавляем класс active к ней
    if (!isActive) {
        clickedCard.classList.add('active');

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
    }
}
