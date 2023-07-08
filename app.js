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

// Change book status
Book.prototype.statusBook = function (title, author, pages, read) {
	Book.call(this, title, author, pages, read);
	if (this.read === "Read") {
		this.read = "Not Read";
		const card = document.querySelector(".card");
		myLibrary.push(`${this.title} by ${this.author}, ${this.pages} pages, ${this.read}`);
		card.textContent = myLibrary;
	} else {
		this.read = "Read";
		const card = document.querySelector(".card");
		myLibrary[read] = this.read;
	}
};

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

			// Change book status
			const statusBtn = document.createElement("button");
			statusBtn.classList.add("status");
			statusBtn.textContent = "Change Status";
			statusBtn.addEventListener("click", () => {
				newBook.statusBook(bookName, author, pages);
			});

			card.appendChild(statusBtn);

			// Delete button that removes items from library
			const deleteBtn = document.createElement("button");
			deleteBtn.classList.add("delete");
			deleteBtn.textContent = "Remove Book";
			deleteBtn.addEventListener("click", () => {
				container.removeChild(card);
			});
			container.appendChild(card);
			card.appendChild(deleteBtn);
		}
	}
	loopArray();
});
