function scrollToTopDrinks() {
    var element = document.getElementById("h3TopDrinks");
    if (element) {
        // Получаем координаты элемента
        var rect = element.getBoundingClientRect();

        // Сдвигаем страницу, добавив 100px к положению элемента
        window.scrollTo({
            top: rect.top + window.scrollY - 150, // смещаем на 100 пикселей ниже
            behavior: 'smooth' // плавная прокрутка
        });
    }
}

function scrollToSignatureСocktails() {
    var element = document.getElementById("h3SignatureСocktails");
    if (element) {
        // Получаем координаты элемента
        var rect = element.getBoundingClientRect();

        // Сдвигаем страницу, добавив 100px к положению элемента
        window.scrollTo({
            top: rect.top + window.scrollY - 150, // смещаем на 100 пикселей ниже
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

