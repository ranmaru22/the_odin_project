// GLOBAL LIBRARY VARIABLE & BOOK PROTOTYPE
const myLibrary = new Map();

function Book(title, author, numPages, read = false) {
    this.title = title;
    this.author = author;
    this.pages = numPages;
    this.read = read;
    // ? Can I make the ID a private member somehow?
    this.id = '_' + Math.random().toString(36).substr(2, 9);
}

Book.prototype.getId = function () {
    return this.id;
}

// BASIC FUNCTIONS
function addToLibrary(title, author, numPages, read = false) {
    const book = new Book(title, author, numPages, read);
    const bookId = book.getId();
    myLibrary.set(bookId, book);
    return book;
}

function processSubmitForm(e) {
    e.preventDefault();
    const title = document.querySelector("#titleField").value;
    const author = document.querySelector("#authorField").value;
    const pages = document.querySelector("#pagesField").value;
    const read = document.querySelector("#readField").value;
    document.querySelector("#addDialog").classList.toggle("hidden");
    const shelf = document.querySelector("#shelf");
    const newBook = addToLibrary(title, author, pages, read);
    renderNewBook(newBook, shelf);
}

function removeFromLibrary(e) {
    const book = e.target.parentElement;
    if (confirm(`Remove ${myLibrary.get(book.getAttribute("data-value")).title} from your library?`)) {
        myLibrary.delete(book.getAttribute("data-value"));
        book.parentElement.removeChild(book);
    }
}

function toggleRead(e) {
    const book = myLibrary.get(e.target.parentElement.getAttribute("data-value"));
    e.target.classList.toggle("notRead");
    book.read = !book.read;
}

function showAddDialog() {
    const addDialog = document.querySelector("#addDialog");
    addDialog.classList.toggle("hidden");
}

function renderNewBook(book, shelf) {
    const newBook = document.createElement("div");
    newBook.classList.add("book");
    // Add a delete button.
    const delButton = document.createElement("a");
    delButton.classList.add("deleteButton");
    delButton.setAttribute("href", "#");
    delButton.textContent = "delete";
    delButton.addEventListener("click", (e) => removeFromLibrary(e));
    // Set title, author, and pages attribute.
    const bookTitle = document.createElement("h2");
    bookTitle.classList.add("bookTitle");
    bookTitle.textContent = book.title;
    const bookAuthor = document.createElement("p");
    bookAuthor.classList.add("bookAuthor");
    bookAuthor.textContent = book.author;
    const bookPages = document.createElement("p");
    bookPages.classList.add("bookPages");
    bookPages.textContent = `(${book.pages} pages)`;
    // Make a clickable area to toggle read status
    const bookRead = document.createElement("div");
    bookRead.classList.add("bookRead");
    if (!book.read) {
        bookRead.classList.add("notRead");
    }
    bookRead.addEventListener("click", (e) => toggleRead(e));
    // Append all to the node and generate a unique ID.
    newBook.appendChild(bookTitle);
    newBook.appendChild(delButton);
    newBook.appendChild(bookAuthor);
    newBook.appendChild(bookPages);
    newBook.appendChild(bookRead);
    newBook.setAttribute("data-value", book.getId());
    shelf.appendChild(newBook);
}

function renderPage() {
    const shelf = document.querySelector("#shelf");
    for (const book of myLibrary.values()) {
        renderNewBook(book, shelf);
    }
}

window.onload = function main() {
    const addButton = document.querySelector("#addButton");
    addButton.addEventListener("click", () => showAddDialog());
    const closeAddButton = document.querySelector("#closeAddDialog");
    closeAddButton.addEventListener("click", () => showAddDialog());
    const submitForm = document.querySelector("#addBook");
    submitForm.addEventListener("submit", (e) => processSubmitForm(e));

    // Adding some sample books ...
    addToLibrary("The Hobbit", "J.R.R. Tolkien", 295);
    addToLibrary("It", "Stephen King", 1138);
    addToLibrary("Hard-boiled Wonderland and the End of the World", "Haruki Murakami", 618, true);
    addToLibrary("Psychology of the Unconscious", "Carl Jung", 570, true);
    renderPage();
}