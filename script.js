let myLibrary = [];

function Book(title, author, pages, status) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.status = status;
  this.info = function() {
  	return `${title} by ${author}, ${pages} pages`;
  }
  this.changeStatus = function() {
    status === 'read'?
    this.status = 'not read' :
    this.status = 'read';
  }
}

const container = document.querySelector('#container');
const addBookButton = document.querySelector('#addBook');

function addBookToLibrary() {
  let title = prompt('Enter the title:');
  let author = prompt('Enter the author:');
  let pages = prompt('How many pages is the book?');
  let status = prompt('Have you read it? (read/not read)');
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

    let bookStatus = document.createElement('div');
    bookStatus.textContent = book.status;
    bookStatus.classList.add('bookStatus');
    if (book.status === 'read') {
      bookStatus.style.background = '#76E498';
    } else {
      bookStatus.style.background = '#FF9A9D';
    }
    bookCard.appendChild(bookStatus);

    let deleteButton = document.createElement('button');
    deleteButton.classList.add('deleteButton');
    deleteButton.textContent = 'x';
    bookCard.appendChild(deleteButton);

    container.appendChild(bookCard);
  })
  listenForChange();
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

//TODO: fix bug with changing status again
function changeBookStatus(book) {
  myLibrary[book.id].changeStatus();
  resetScreen();
  showAllBooks();
}

addBookButton.addEventListener('click', addBookToLibrary);

function listenForChange() {
  let deleteButtons = document.querySelectorAll('.deleteButton');
  deleteButtons.forEach(button => {
    button.onclick = () => {
      let book = button.parentElement;
      deleteBookFromLibrary(book);
    };
  });
  let changeStatuses = document.querySelectorAll('.bookStatus');
  changeStatuses.forEach(button => {
    button.onclick = () => {
      let book = button.parentElement;
      changeBookStatus(book);
    };
  });
}

//Initial setting
let book1 = new Book('Harry Potter and the Philosopher\'s Stone', 'J.K.Rowling', 223, 'read');
let book2 = new Book('Outlander', 'D.Gabaldon', 850, 'not read');
let book3 = new Book('The Hobbit', 'J.R.R. Tolkien', 295, 'read');

myLibrary.push(book1);
myLibrary.push(book2);
myLibrary.push(book3);

showAllBooks();
