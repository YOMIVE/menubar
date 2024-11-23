import dishesCollection from '../data/dishes.js';
import drinksCollection from '../data/drinks.js';
import affichesCollection from '../data/affiches.js';

let currentType = 'food'; // Default type

document.addEventListener('DOMContentLoaded', () => {
    setupTypeSwitching();
    setupDescriptionToggle();
    setupCategorySelection();
    setupForms();
    setupExportButtons();
    loadFromLocalStorage();
    window.addEventListener('beforeunload', saveToLocalStorage);
});

function setupTypeSwitching() {
    const typeFood = document.getElementById('type-food');
    const typeDrink = document.getElementById('type-drink');

    typeFood.addEventListener('click', () => {
        currentType = 'food';
        typeFood.classList.add('selected');
        typeDrink.classList.remove('selected');
    });

    typeDrink.addEventListener('click', () => {
        currentType = 'drink';
        typeDrink.classList.add('selected');
        typeFood.classList.remove('selected');
    });
}

function setupDescriptionToggle() {
    const needsDescription = document.getElementById('needs-description');
    const descriptionFields = document.getElementById('description-fields');

    needsDescription.addEventListener('change', () => {
        descriptionFields.style.display = needsDescription.checked ? 'block' : 'none';
    });
}

function setupCategorySelection() {
    const categoriesList = document.getElementById('categories-list');
    const categories = ['SC', 'DS', 'SN', 'CF', 'C', 'CO'];

    categories.forEach(category => {
        const button = document.createElement('button');
        button.type = 'button';
        button.textContent = category;
        button.classList.add('category-btn');
        button.addEventListener('click', () => {
            document.querySelectorAll('.category-btn').forEach(btn => btn.classList.remove('selected'));
            button.classList.add('selected');
        });
        categoriesList.appendChild(button);
    });
}

function setupForms() {
    document.getElementById('item-form').addEventListener('submit', (e) => {
        e.preventDefault();
        saveItem();
    });

    document.getElementById('affiche-form').addEventListener('submit', (e) => {
        e.preventDefault();
        saveAffiche();
    });
}

function saveItem() {
    const image = document.getElementById('item-image').files[0];
    const name = document.getElementById('item-name').value;
    const price = document.getElementById('item-price').value;
    const selectedCategoryBtn = document.querySelector('.category-btn.selected');

    if (!selectedCategoryBtn) {
        alert("Please select a category.");
        return;
    }

    const category = selectedCategoryBtn.textContent;
    const isTop = document.getElementById('is-top').checked;
    const needsDescription = document.getElementById('needs-description').checked;

    const newItem = {
        id: `${category}${getNextIndex(category)}`,
        name,
        price,
        image: `../data/${currentType === 'food' ? 'dishes' : 'drinks'}Images/${image.name}`,
        isTop,
        isOpen: needsDescription,
    };

    if (needsDescription) {
        newItem.descENG = document.getElementById('desc-eng').value;
        newItem.descRUS = document.getElementById('desc-rus').value;
        // Add other languages as needed
    }

    if (currentType === 'food') {
        dishesCollection.push(newItem);
    } else {
        drinksCollection.push(newItem);
    }

    alert("Item added successfully!");
}

function saveAffiche() {
    const image = document.getElementById('affiche-image').files[0];
    const nameEng = document.getElementById('affiche-name-eng').value;
    const date = document.getElementById('affiche-date').value;

    const newAffiche = {
        id: `A${getNextIndex('A')}`,
        mainTextENG: nameEng,
        date,
        image: `../data/afficheImages/${image.name}`,
    };

    affichesCollection.push(newAffiche);

    alert("Affiche added successfully!");
}

function getNextIndex(category) {
    const collection = currentType === 'food' ? dishesCollection : drinksCollection;
    const maxIndex = Math.max(
        ...collection
            .filter(item => item.id.startsWith(category))
            .map(item => parseInt(item.id.replace(category, ''), 10))
    );
    return String(maxIndex + 1 || 1).padStart(3, '0');
}

function setupExportButtons() {
    document.getElementById('export-dishes').addEventListener('click', () => {
        exportToFile('dishes.json', dishesCollection);
    });
    document.getElementById('export-drinks').addEventListener('click', () => {
        exportToFile('drinks.json', drinksCollection);
    });
    document.getElementById('export-affiches').addEventListener('click', () => {
        exportToFile('affiches.json', affichesCollection);
    });
}

function exportToFile(filename, data) {
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
}

function saveToLocalStorage() {
    localStorage.setItem('dishes', JSON.stringify(dishesCollection));
    localStorage.setItem('drinks', JSON.stringify(drinksCollection));
    localStorage.setItem('affiches', JSON.stringify(affichesCollection));
}

function loadFromLocalStorage() {
    const dishes = localStorage.getItem('dishes');
    const drinks = localStorage.getItem('drinks');
    const affiches = localStorage.getItem('affiches');

    if (dishes) dishesCollection.push(...JSON.parse(dishes));
    if (drinks) drinksCollection.push(...JSON.parse(drinks));
    if (affiches) affichesCollection.push(...JSON.parse(affiches));
}
