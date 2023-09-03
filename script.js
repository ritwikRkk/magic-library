// College Library Website
showBooksInUI();

// constructor
function Book(name, author, type) {
    this.name = name;
    this.author = author;
    this.type = type;
}

// Display Constructor
function Display() {

}

// add method to display prototype in local storage
function showBooksInUI() {
    // console.log("Adding to UI");
    let books = localStorage.getItem('books');
    if (books == null) {
        bookDetails = [];
    }
    else {
        bookDetails = JSON.parse(books);
    }
    tableBody = document.getElementById('tableBody');
    let uiString = "";
    bookDetails.forEach(function (element, index) {
        uiString += `<tr class="bookCard">
                        <td>${element.bookname}</td>
                        <td>${element.bookauthor}</td>
                        <td>${element.booktype}</td>
                        <td><button id= "${index}" onclick="deleteBook(this.id)" class="btn btn-primary">Delete Book</button></td>
                        
                   </tr>`;
    });

    tableBody.innerHTML = uiString;
}

function deleteBook(index) {
    // console.log('I am deleting', index);
    let books = localStorage.getItem('books');
    if (books == null) {
        bookDetails = [];
    }
    else {
        bookDetails = JSON.parse(books);
    }
    bookDetails.splice(index, 1);
    localStorage.setItem('books', JSON.stringify(bookDetails));
    showBooksInUI();
}

// implementing clear function
Display.prototype.clear = function () {
    let libraryform = document.getElementById('libraryForm');
    libraryform.reset();
}



// validating the name & author of the book
Display.prototype.validate = function (book) {
    if (book.name.length < 2 || book.author.length < 2) {
        return false;
    }
    else {
        return true;
    }
}

Display.prototype.show = function (type, displayMessage) {
    let message = document.getElementById('message');
    message.innerHTML = `<div class="alert alert-${type} alert-dismissible fade show" role="alert">
                            <strong>Message:</strong> ${displayMessage}
                            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                            <span aria-hidden="true">×</span>
                            </button>
                     </div>`;
    setTimeout(function () {
        message.innerHTML = "";
    }, 2000);

}

// Add submit event listener to libraryform
let libraryform = document.getElementById('libraryForm');
libraryform.addEventListener('submit', libraryformSubmit);

function libraryformSubmit(e) {
    // let name1= document.getElementById('bookName');
    let name = document.getElementById('bookName').value;
    let author = document.getElementById('author').value;
    let type;

    let fiction = document.getElementById('fiction');
    let programming = document.getElementById('programming');
    let cooking = document.getElementById('cooking');

    if (fiction.checked) {
        type = fiction.value;
    }
    else if (programming.checked) {
        type = "computer" + " " + programming.value;
    }
    else if (cooking.checked) {
        type = cooking.value;
    }

    let book = new Book(name, author, type);
    console.log('You have submitted library form');
    console.log(book);
    // name1.value="";

    let display = new Display();
    if (display.validate(book)) {
        // display.add(book);
        display.clear();
        display.show('success', 'Your book has been successfully added!');

        let books = localStorage.getItem('books');
        if (books == null) {
            bookDetails = [];
        }
        else {
            bookDetails = JSON.parse(books);
        }

        let myObj = {
            bookname: name,
            bookauthor: author,
            booktype: type
        }
        bookDetails.push(myObj);
        localStorage.setItem('books', JSON.stringify(bookDetails));

    }
    else {
        // show error to the user
        display.show('error', 'Sorry! you can not add this book');
    }
    showBooksInUI();

    e.preventDefault();
}

let search = document.getElementById('searchTxt');
search.addEventListener('input', function(){
    let inputval= search.value.toLowerCase();
    // console.log('input event fired', inputval);
    let bookCards= document.getElementsByClassName('bookCard');
    Array.from(bookCards).forEach(function (element) {
        // console.log(element.children[0]);
        let bookName=element.children[0].innerText;
        let bookAuthor=element.children[1].innerText;
        let bookType=element.children[2].innerText;
        if(bookName.includes(inputval)){
            element.style.display = "table-row";
        }
        else if(bookAuthor.includes(inputval)){
            element.style.display = "table-row";
        }
        else if(bookType.includes(inputval)){
            element.style.display = "table-row";
        }
        else{
            element.style.display = "none";
        }
    });

});