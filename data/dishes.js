const dishesCollection = [
    {
        id: 'DSH001',
        name: 'Eggs Benedict',
        price: '8$',
        descENG: 'Poached eggs with hollandaise sauce.',
        descRUS: 'Яйца пашот с голландским соусом.',
        descUKR: 'Яйця пашот з голландським соусом.',
        descTUR: 'Poşe yumurta ve hollandez sosu.',
        descSRB: 'Јаја поширана са холандским сосом.',
        descKAZ: 'Пашот жұмыртқасы голланд тұздығымен.',
        descARM: 'Հոլանդական սոուսով պոչված ձու:',
        descBLR: 'Яйкі пашот з галандскім соусам.',
        image: '../data/dishesImages/expDish.png',
        isTop: true,
        isOpen: true,
    },
    {
        id: 'DS002',
        name: 'Pancakes',
        price: '5$',
        image: '../data/dishesImages/expDish.png',
        isTop: false,
        isOpen: false,
    },
    {
        id: 'SN001',
        name: 'French Fries',
        price: '3$',
        image: '../data/dishesImages/expDish.png',
        isTop: false,
        isOpen: false,
    },
];

// Экспорт коллекции по умолчанию
export default dishesCollection;
