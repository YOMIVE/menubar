function scrollToTopDrinks() {
    var element = document.getElementById("h3TopDrinks");
    if (element) {
        // Получаем координаты элемента
        var rect = element.getBoundingClientRect();

        // Проверяем ширину экрана и задаем смещение
        var offset = window.innerWidth < 600 ? 90 : 150;

        // Сдвигаем страницу
        window.scrollTo({
            top: rect.top + window.scrollY - offset, // смещаем на заданное значение
            behavior: 'smooth' // плавная прокрутка
        });
    }
}

function scrollToDesserts() {
    var element = document.getElementById("h3Desserts");
    if (element) {
        // Получаем координаты элемента
        var rect = element.getBoundingClientRect();

        // Проверяем ширину экрана и задаем смещение
        var offset = window.innerWidth < 600 ? 90 : 150;

        // Сдвигаем страницу
        window.scrollTo({
            top: rect.top + window.scrollY - offset, // смещаем на заданное значение
            behavior: 'smooth' // плавная прокрутка
        });
    }
}

function scrollToDishes() {
    var element = document.getElementById("h3Dishes");
    if (element) {
        // Получаем координаты элемента
        var rect = element.getBoundingClientRect();

        // Проверяем ширину экрана и задаем смещение
        var offset = window.innerWidth < 600 ? 90 : 150;

        // Сдвигаем страницу
        window.scrollTo({
            top: rect.top + window.scrollY - offset, // смещаем на заданное значение
            behavior: 'smooth' // плавная прокрутка
        });
    }
}


function scrollToSignatureСocktails() {
    var element = document.getElementById("h3SignatureСocktails");
    if (element) {
        // Получаем координаты элемента
        var rect = element.getBoundingClientRect();

        // Проверяем ширину экрана и задаем смещение
        var offset = window.innerWidth < 600 ? 90 : 150;

        // Сдвигаем страницу
        window.scrollTo({
            top: rect.top + window.scrollY - offset, // смещаем на заданное значение
            behavior: 'smooth' // плавная прокрутка
        });
    }
}



// Функция для открытия меню
function openPhoneMenu() {
    const navBarPhone = document.querySelector('.nav-bar-phone');
    navBarPhone.classList.add('active');
}

// Функция для закрытия меню
function closePhoneMenu() {
    const navBarPhone = document.querySelector('.nav-bar-phone');
    navBarPhone.classList.remove('active');
}

