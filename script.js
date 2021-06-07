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
    bookCard.id = myLibrary.indexOf(book);
    bookCard.classList.add('book');
    let deleteButton = document.createElement('button');
    deleteButton.classList.add('deleteButton');
    deleteButton.textContent = 'x';
    bookCard.appendChild(deleteButton);
    container.appendChild(bookCard);
  })
  listenForRemoval();
}

function resetScreen() {
  while (container.firstChild) {
    container.removeChild(container.firstChild);
  };
}

function deleteBookFromLibrary(book) {
  if (confirm('Are you sure you want to delete this book?')) {
    myLibrary.splice(book.id, 1);
    console.log(myLibrary);
    book.parentNode.removeChild(book);
    resetScreen();
    showAllBooks();
  }
}

addBookButton.addEventListener('click', addBookToLibrary);


function listenForRemoval() {
  let deleteButtons = document.querySelectorAll('.deleteButton');
  deleteButtons.forEach(button => {
    button.onclick = () => {
      let book = button.parentElement;
      console.log(book);
      deleteBookFromLibrary(book);
    };
  });
}

//Initial setting
let book1 = new Book('Harry Potter', 'J.K.Rowling', 600, 'read');
let book2 = new Book('Outlander', 'D.Gabaldon', 1000, 'not read yet');
let book3 = new Book('The Hobbit', 'J.R.R. Tolkien', 295, 'read');

myLibrary.push(book1);
myLibrary.push(book2);
myLibrary.push(book3);

showAllBooks();
