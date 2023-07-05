let myLibrary = ["Book 1", "Book 2", "Book 3"];

function Book(title, author, pages, read) {
	this.title = title;
	this.author = author;
	this.pages = pages;
	this.read = read;

	this.info = function () {
		console.log(`${this.title} by ${this.author}, ${this.pages} pages, ${this.read}`);
	};
}

const theHobbit = new Book("The Hobbit", "J.K Rowllings", "295", "Read");

theHobbit.info();

function addBookToLibrary() {
	myLibrary.push(`${userInput}`);
}

function loopArray() {
	for (let book of myLibrary) {
		const container = document.querySelector(`.books`);
		console.log(container);
		const card = document.createElement("div");
		card.classList.add("card");
		card.textContent = book;

		container.appendChild(card);
	}
}

loopArray();
