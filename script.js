//TODO: add LocalStorage to store data
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
    this.status === 'read'?
    this.status = 'not read' :
    this.status = 'read';
  }
}

const container = document.querySelector('#container');

const form = document.forms.newBookForm;
form.addEventListener('submit', addBookToLibrary);

function addBookToLibrary() {
  let title = form.elements.title.value;
  let author = form.elements.author.value;
  let pages = form.elements.pages.value;
  let status = form.elements.status.value;
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
    deleteButton.textContent = '×';
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
    book.parentNode.removeChild(book);
    resetScreen();
    showAllBooks();
  }
}

function changeBookStatus(book) {
  myLibrary[book.id].changeStatus();
  resetScreen();
  showAllBooks();
}

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

const addBookButton = document.querySelector('#addBook');
const modal = document.querySelector('#newBook');
const modalCloseButton = document.querySelector('#closeModal');

addBookButton.onclick = function() {
  modal.style.display = "block";
}
modalCloseButton.onclick = function() {
  modal.style.display = "none";
}

window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

//Initial setting
let book1 = new Book('Harry Potter and the Philosopher\'s Stone', 'J.K.Rowling', 223, 'read');
let book2 = new Book('Outlander', 'D.Gabaldon', 850, 'not read');
let book3 = new Book('The Hobbit', 'J.R.R. Tolkien', 295, 'read');

myLibrary.push(book1);
myLibrary.push(book2);
myLibrary.push(book3);

showAllBooks();
