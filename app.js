let myLibrary = [];

function Book(title, author, pages, read) {
	this.title = title;
	this.author = author;
	this.pages = pages;
	this.read = read;

	// Console log to check if info works
	this.info = function () {
		console.log(`${this.title} by ${this.author}, ${this.pages} pages, ${this.read}`);
	};
}

// Sample

const Hobbit = new Book("The Hobbit", "J.R.R. Tolkien", "295", "not read");
Hobbit.info();

// Push to library
function AddBookToLibrary(title, author, pages, read) {
	Book.call(this, title, author, pages, read);
	return myLibrary.push(`${this.title} by ${this.author}, ${this.pages} pages, ${this.read}`);
}

// Link addbook function to book function. addbooktolibrary.book.prototype
Object.setPrototypeOf(AddBookToLibrary.prototype, Book.prototype);
Object.setPrototypeOf(BookStatus.prototype, AddBookToLibrary.prototype);

function BookStatus(read) {
	Book.call(this, read);
	const statusBtn = document.createElement("button");
	statusBtn.classList.add("switch");
	statusBtn.textContent = "test";
	card.appendChild(statusBtn);
	statusBtn.addEventListener("click", () => {
		if (radioButton.id === read_book) {
			console.log("Did read the book");
		} else console.log("DID NOT READ THE BOOK");
		statusBtn.textContent = "not a test";
	});
}
// Display the hidden form on page

const startForm = document.querySelector(".start-form");
startForm.addEventListener("click", () => {
	const form = document.querySelector("form");
	form.style.display = "block";
});

// Create a new book object
const submitForm = document.querySelector(".add-book");
submitForm.addEventListener("click", (e) => {
	e.preventDefault();
	const bookName = document.getElementById("book_name").value;
	const author = document.getElementById("author").value;
	const pages = document.getElementById("pages").value;

	// Check which radio button is checked
	const radioButtons = document.querySelectorAll('input[name="reading"]');
	let readOrNot;
	for (let radioButton of radioButtons) {
		if (radioButton.checked) {
			console.log(radioButton.id);
			readOrNot = radioButton.value;
			break;
		}
	}

	const newBook = new AddBookToLibrary(bookName, author, pages, readOrNot);
	newBook.info();

	// Loop over array and display elements on screen
	const container = document.querySelector(`.books`);
	function loopArray() {
		for (let i = 0; i < myLibrary.length; i++) {
			const card = document.createElement("div");
			card.classList.add("card");
			let last = myLibrary.pop();
			card.textContent = last;

			// Delete button that removes items from library
			const deleteBtn = document.createElement("button");
			deleteBtn.classList.add("delete");
			deleteBtn.textContent = "Remove Book";
			deleteBtn.addEventListener("click", (e) => {
				container.removeChild(card);
			});
			container.appendChild(card);
			card.appendChild(deleteBtn);
		}
	}
	loopArray();
});
