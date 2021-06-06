let myLibrary = [];

function Book(title, author, pages, status) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.status = status;
  this.info = function() {
  	return `${title} by ${author}, ${pages} pages, ${status}`;
  }
}

const container = document.querySelector('#container');
const addBookButton = document.querySelector('#addBook');

function addBookToLibrary() {
  let title = prompt('Enter the title:');
  let author = prompt('Enter the author:');
  let pages = prompt('How many pages is the book?');
  let status = prompt('Have you read it? (read/not read yet)');
  let book = new Book(title, author, pages, status);
  myLibrary.push(book);
  resetScreen();
  showAllBooks();
}

function showAllBooks() {
  myLibrary.forEach(book => {
    let bookCard = document.createElement('div');
    bookCard.textContent = book.info();
    bookCard.classList.add('book')
    container.appendChild(bookCard);
  })
}

function resetScreen() {
  while (container.firstChild) {
    container.removeChild(container.firstChild);
  };
}

let book1 = new Book('Harry Potter', 'J.K.Rowling', 600, 'read');
let book2 = new Book('Outlander', 'D.Gabaldon', 1000, 'not read yet');
let book3 = new Book('The Hobbit', 'J.R.R. Tolkien', 295, 'read');

myLibrary.push(book1);
myLibrary.push(book2);
myLibrary.push(book3);

addBookButton.addEventListener('click', addBookToLibrary);
showAllBooks();
