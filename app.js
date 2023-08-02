let myLibrary = [];

class Book {
	constructor(title, author, pages, read) {
		this.title = title;
		this.author = author;
		this.pages = pages;
		this.read = read;
	}
	// Console log to check if info works
	info() {
		console.log(myLibrary);
		console.log(`${this.title} by ${this.author}, ${this.pages} pages, ${this.read}`);
	}

	// Push to library
	addBookToLibrary() {
		return myLibrary.push(`${this.title} by ${this.author}, ${this.pages} pages, ${this.read}`);
	}
}

// Sample

const Hobbit = new Book("The Hobbit", "J.R.R. Tolkien", "295", "not read");
Hobbit.info();

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

	const newBook = new Book(bookName, author, pages, readOrNot);
	newBook.info();
	newBook.addBookToLibrary();

	// Loop over array and display elements on screen
	const container = document.querySelector(`.books`);
	function loopArray() {
		for (let i = 0; i < 1; i++) {
			const card = document.createElement("div");
			card.classList.add("card");
			const last = myLibrary.slice(-1);
			card.textContent = last;

			// Change book status button
			const statusBtn = document.createElement("button");
			statusBtn.classList.add("status");
			statusBtn.textContent = "Change Status";
			statusBtn.addEventListener("click", () => {
				myLibrary.slice(e.target);
				container.removeChild(card);
				newBook.statusBook(bookName, author, pages, readOrNot);
			});

			card.appendChild(statusBtn);

			// Delete button that removes items from library
			const deleteBtn = document.createElement("button");
			deleteBtn.classList.add("delete");
			deleteBtn.textContent = "Remove Book";
			deleteBtn.addEventListener("click", (e) => {
				myLibrary.pop(e.target);
				container.removeChild(card);
			});
			container.appendChild(card);
			card.appendChild(deleteBtn);
		}
	}
	loopArray();

	// Change book status
	Book.prototype.statusBook = function (title, author, pages, read) {
		Book.call(this, title, author, pages, read);
		if (this.read === "Read") {
			this.read = "Not Read";

			myLibrary.push(`${this.title} by ${this.author}, ${this.pages} pages, ${this.read}`);
			return loopArray();
		} else {
			this.read = "Read";

			myLibrary.push(`${this.title} by ${this.author}, ${this.pages} pages, ${this.read}`);
			return loopArray();
		}
	};
});
