
   

const form = document.getElementById('bookForm');
const resultDiv = document.getElementById('bookResults');


function saveResultsToLocalStorage(results) {
    localStorage.setItem('bookResults', JSON.stringify(results));
}


function getResultsFromLocalStorage() {
    return JSON.parse(localStorage.getItem('bookResults')) || [];
}


function loadSavedResults() {
    const savedResults = getResultsFromLocalStorage();
    if (savedResults.length > 0) {
        savedResults.forEach(item => displayBook(item));
    }
}

function displayBook(item) {
    const bookElement = document.createElement('div');
    bookElement.classList.add('book');
    bookElement.innerHTML = `
        <img src="${item.thumbnail}" alt="${item.title}">
        <h3>${item.title}</h3>
        <p>Autores: ${item.authors}</p>
    `;
    resultDiv.appendChild(bookElement);
}

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const query = document.getElementById('bookInput').value;

    
    fetch(`https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(query)}`)
        .then(response => response.json())
        .then(data => {
            resultDiv.innerHTML = ''; 
            const results = []; 

            if (data.items) {
                data.items.forEach(item => {
                    const title = item.volumeInfo.title;
                    const authors = item.volumeInfo.authors ? item.volumeInfo.authors.join(', ') : 'Sin autor';
                    const thumbnail = item.volumeInfo.imageLinks ? item.volumeInfo.imageLinks.thumbnail : 'https://via.placeholder.com/128x195';

                    results.push({ title, authors, thumbnail });
                    displayBook({ title, authors, thumbnail }); 
                });
                saveResultsToLocalStorage(results); 
            } else {
                resultDiv.innerHTML = '<p>No se encontraron resultados.</p>';
            }
        })
        .catch(error => {
            console.error('Error:', error);
            resultDiv.innerHTML = '<p>Error al buscar libros.</p>';
        });
});

function displayBook(item) {
    const bookElement = document.createElement('div');
    bookElement.classList.add('book');
    bookElement.innerHTML = `
        <img src="${item.thumbnail}" alt="${item.title}">
        <h3>${item.title}</h3>
        <p>Autores: ${item.authors}</p>
        <button class="favorite-btn" data-title="${item.title}" data-authors="${item.authors}" data-thumbnail="${item.thumbnail}">Agregar a Favoritos</button>
    `;
    resultDiv.appendChild(bookElement);
    
  
    bookElement.querySelector('.favorite-btn').addEventListener('click', () => {
        addToFavorites(item);
    });
}


function addToFavorites(item) {
    let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    if (!favorites.some(fav => fav.title === item.title)) {
        favorites.push(item);
        localStorage.setItem('favorites', JSON.stringify(favorites));
        alert(`${item.title} ha sido agregado a tus favoritos.`);
    } else {
        alert(`${item.title} ya está en tus favoritos.`);
    }
}

loadSavedResults();