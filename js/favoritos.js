const favoriteResults = document.getElementById('favoriteResults');


function loadFavorites() {
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    if (favorites.length === 0) {
        favoriteResults.innerHTML = '<p>No tienes libros favoritos.</p>';
    } else {
        favorites.forEach(item => {
            displayFavoriteBook(item);
        });
    }
}


function displayFavoriteBook(item) {
    const bookElement = document.createElement('div');
    bookElement.classList.add('book');
    bookElement.innerHTML = `
        <img src="${item.thumbnail}" alt="${item.title}">
        <h3>${item.title}</h3>
        <p>Autores: ${item.authors}</p>
        <button class="remove-btn" data-title="${item.title}">Quitar de Favoritos</button>
    `;
    favoriteResults.appendChild(bookElement);

    bookElement.querySelector('.remove-btn').addEventListener('click', () => {
        removeFromFavorites(item.title);
    });
}


function removeFromFavorites(title) {
    let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    favorites = favorites.filter(item => item.title !== title); 
    localStorage.setItem('favorites', JSON.stringify(favorites)); 
    favoriteResults.innerHTML = '';
    loadFavorites(); 
}


loadFavorites();