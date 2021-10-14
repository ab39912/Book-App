// Book Class 
class Book{
    constructor(title,author, isbn){
        this.title  = title;
        this.author = author;
        this.isbn = isbn;

    }
}


//UI Class

class UI {
    static displayBooks(){
        
        const books = Store.getBooks();

        books.forEach((book) => UI.addBookToList(book));
        
    }
    static addBookToList(book){
        const list = document.querySelector('#book-list');

        const row = document.createElement('tr');

        row.innerHTML = `
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.isbn}</td>
        <td><a href="#" class="btn btn-danger
        delete">X</a></td>
        `;


     list.appendChild(row);


    }

    static deleteBook(el){
        if(el.classList.contains('delete')) {
            el.parentElement.parentElement.remove();

        }

    }

    static showAlert(message, className) {
        const div = document.createElement('div');
        div.className = `alert alert-${className}`;
        div.appendChild(document.createTextNode(message));
        const container = document.querySelector('.container');
        const form = document.querySelector('#book-form');
        container.insertBefore(div, form);

        // Vanish in seconds
        setTimeout(() => document.querySelector('.alert').remove(),
        3000);

    }


    static clearFields() {
        document.querySelector('#title').value='';
        document.querySelector('#author').value='';
        document.querySelector('#isbn').value='';
    }
}

// Store Class
class Store {
   static getBooks(){
       let books;
       if(localStorage.getItem('books') === null) {
           books = [];

       }else {
           books = JSON.parse(localStorage.getItem('books'));
       }
       return books;

    }

    static addBook(book){
        const books = Store.getBooks();

        books.push(book);

        localStorage.setItem('books', JSON.stringify(books));


    }

    static removeBook(isbn){
        const books = Store.getBooks();

        books.forEach((book, index) => {
            if(book.isbn === isbn) {
                books.splice(index, 1);

            }
        });

        localStorage.setItem('books', JSON.stringify(books));


    }
}

// Event Display
document.addEventListener('DOMContentLoaded', UI.displayBooks);

// Event Add 
document.querySelector('#book-form').addEventListener('submit',(e)=>
{
    // Prevent actual submit
    e.preventDefault();
    
    //Get Form Value
    const title = document.querySelector('#title').value;
    const author = document.querySelector('#author').value;
    const isbn = document.querySelector('#isbn').value;

    //Validate
    if(title ==='' || author ==='' || isbn === ''){
        UI.showAlert('please fill in all fields', 'danger');
    } else {
         //Instatiate book
    const book = new Book(title,author, isbn);

    // Add book to UI
    UI.addBookToList(book);

    // Add book to store
    Store.addBook(book);

    //Show success message
    UI.showAlert('Book Added', 'success');

    //Clear fields
    UI.clearFields();
    }
});

// Event Remove
document.querySelector('#book-list').addEventListener('click', (e)=>
{
    //Remove book from UI
    UI.deleteBook(e.target)

    // Remove book from store
    Store.removeBook(e.target.parentElement.previousElementSibling.textContent);

    //Show remove message
    UI.showAlert('Book Removed', 'success');
}

);