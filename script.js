let myLibrary = [];
const container = document.querySelector('.container')

function Book(title, author, number_of_pages, read) {
    this.title = title;
    this.author = author;
    this.pages = number_of_pages;
    this.read = read;

  
}

function addBookToLibrary(title, author, number_of_pages, read) {
    let book = new Book(title, author, number_of_pages, read);
    myLibrary.push(book)
}

function displayLibrary(){
    container.innerHTML = '';
    myLibrary.forEach(book =>{
        const card = document.createElement('div')
        card.classList.add('item-card')
        const card_title = document.createElement('h3');
        card_title.textContent = book.title;
        card.appendChild(card_title);
        const card_author = document.createElement('p');
        card_author.textContent = 'This book was written by ' + book.author + '.'
        card.appendChild(card_author);
        const card_pages = document.createElement('p');
        card_pages.textContent = 'This book has ' + book.pages + ' pages.';
        card.appendChild(card_pages)
        const card_read = document.createElement('p');
        card_read.textContent = 'You have read this book.'
        card.appendChild(card_read)
        container.appendChild(card)
    })
}

const new_book = document.querySelector('.new-book');
const modal = document.querySelector('.modal');
new_book.onclick = function () {
    modal.classList.add("visible");
}

window.onclick = function(event) {
    if (event.target == modal) {
      modal.classList.remove("visible");
    }
  }

const confirm_book = document.querySelector(".confirm-new-book");

confirm_book.onclick = function () {
    modal.classList.remove("visible")
    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const pages = document.getElementById('pages').value;
    const read = document.getElementById('read').value;
    addBookToLibrary(title, author, pages, read)
    displayLibrary()
}
displayLibrary()