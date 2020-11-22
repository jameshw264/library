let myLibrary = [];
const container = document.querySelector('.container')
var id = 0;
if (localStorage.myLibrary){
    myLibrary = JSON.parse(localStorage.myLibrary);
    originalLibrary = myLibrary.length;
    myLibrary.forEach(book =>{
        addBookToLibrary(book.title, book.author, book.pages, book.read);

    });
    for(i = 0; i < originalLibrary; i ++){
        myLibrary.shift()
    }
    myLibrary.forEach(book=>{
        editIndex(book);
    });
    resetLocalStorage();
    
    displayLibrary();
}


function Book(id, title, author, number_of_pages, read) {
    this.id = id;
    this.title = title;
    this.author = author;
    this.pages = number_of_pages;
    this.read = read;

  
}

function addBookToLibrary(title, author, number_of_pages, read) {
    id = myLibrary.length;
    let book = new Book(id, title, author, number_of_pages, read);
    myLibrary.push(book);
    resetLocalStorage()
}
function resetLocalStorage(){
    localStorage.setItem('myLibrary', JSON.stringify(myLibrary));
}
function editIndex(book){
    book.id = myLibrary.indexOf(book)
    resetLocalStorage()
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
        if (book.read == false){
            card_read.textContent = 'You have not read this book.'
            const card_read_change = document.createElement('button');
            card_read_change.textContent = 'Read book?'
            card_read_change.classList.add('card-read-change');
            card_read_change.setAttribute('data-attr', book.id);
            card.appendChild(card_read)
            card.appendChild(card_read_change);
            const remove_book = document.createElement('button');
            remove_book.textContent = 'Remove book';
            remove_book.classList.add('remove-book');
            remove_book.setAttribute('data-attr', book.id);
            card.appendChild(remove_book);
            container.appendChild(card)
            const read_change = document.querySelectorAll('.card-read-change');
            read_change.forEach(button => {
                button.onclick = function () {
                    const id = button.getAttribute('data-attr');
                    const book = myLibrary[id];
                    book.toggleRead();
                    displayLibrary();
                    resetLocalStorage();
                }
            });
        } else {
            card_read.textContent = 'You have read this book.'
            card.appendChild(card_read)
            const remove_book = document.createElement('button');
            remove_book.textContent = 'Remove book';
            remove_book.classList.add('remove-book');
            remove_book.setAttribute('data-attr', book.id);
            card.appendChild(remove_book);
            container.appendChild(card);
        }
        const remove_book = document.querySelectorAll('.remove-book');
        remove_book.forEach(button =>{
            button.onclick = function () {
                const id = button.getAttribute('data-attr');
                myLibrary.splice(id, 1);
                myLibrary.forEach(book =>{
                    editIndex(book);
                })
                displayLibrary();
                resetLocalStorage();
                
            }
        });
        resetLocalStorage();

    })
}

Book.prototype.toggleRead = function (){
    if (this.read == false){
        this.read = true;
    } else {
        this.read = false;
    }
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
    const read = document.getElementById('read').checked;
    addBookToLibrary(title, author, pages, read)
    displayLibrary()
    resetLocalStorage();
}
displayLibrary()