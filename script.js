"use strict";

const container = document.querySelector(".container");

const addBtn = document.querySelector(".btnAdd");
const addBookForm = document.querySelector(".form");

const submit = document.querySelector(".btnSubmit");

const myLibrary = [];

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

Book.prototype.info = function () {
  return `${this.title} by ${this.author}, ${this.pages} pages, ${this.read}`;
};

Book.prototype.toggleRead = function () {
  if (this.read === "Read") {
    this.read = "Unread";
  } else {
    this.read = "Read";
  }
};

submit.addEventListener("click", function (e) {
  e.preventDefault();
  const title = document.querySelector("#title");
  const author = document.querySelector("#author");
  const pages = document.querySelector("#pages");

  const box = document.createElement("div");

  const newBook = new Book(title.value, author.value, pages.value, read.value);

  title.value = "";
  author.value = "";
  pages.value = "";

  myLibrary.push(newBook);

  container.appendChild(box);

  box.classList.add("box");

  box.innerHTML += `<h2 class="box-title">${
    myLibrary[myLibrary.length - 1].title
  }</h2>`;

  box.innerHTML += `<h3 class="box-author">${
    myLibrary[myLibrary.length - 1].author
  }</h3>`;

  box.innerHTML += `<p class="box-pages">${
    myLibrary[myLibrary.length - 1].pages
  }</p>`;

  box.innerHTML += `<button class="btn-read" data-index="${
    myLibrary.length - 1
  }">${myLibrary[myLibrary.length - 1].read}</button>`;

  box.innerHTML += `<button class="delete" data-index="${
    myLibrary.length - 1
  }">Delete</button>`;

  addBookForm.classList.add("hidden");
  addBtn.classList.remove("hidden");
  container.classList.remove("hidden");

  const readValue = read.value;
  const btnRead = box.querySelector(".btn-read");

  if (readValue === "Read") {
    btnRead.style.backgroundColor = "green";
  } else {
    btnRead.style.backgroundColor = "";
  }
});

container.addEventListener("click", function (event) {
  if (event.target.classList.contains("delete")) {
    const index = event.target.getAttribute("data-index");
    myLibrary.splice(index, 1);
    event.target.parentNode.remove();
    updateUI();
  }
  if (event.target.classList.contains("btn-read")) {
    const index = event.target.getAttribute("data-index");
    myLibrary[index].toggleRead();
    event.target.textContent = myLibrary[index].read;

    if (myLibrary[index].read === "Read") {
      event.target.style.backgroundColor = "green";
    } else {
      event.target.style.backgroundColor = "";
    }
  }
});

addBtn.addEventListener("click", function () {
  addBookForm.classList.remove("hidden");
  addBtn.classList.add("hidden");
  container.classList.add("hidden");
});

const updateUI = () => {
  container.innerHTML = "";
  for (let i = 0; i < myLibrary.length; i++) {
    const box = document.createElement("div");

    box.classList.add("box");

    box.innerHTML += `<h2 class="box-title">${myLibrary[i].title}</h2>`;
    box.innerHTML += `<h3 class="box-author">${myLibrary[i].author}</h3>`;
    box.innerHTML += `<p class="box-pages">${myLibrary[i].pages}</p>`;
    box.innerHTML += `<button class="btn-read" data-index="${i}">${myLibrary[i].read}</button>`;
    box.innerHTML += `<button class="delete" data-index="${i}">Delete</button>`;

    container.appendChild(box);

    const readValue = myLibrary[i].read;
    const btnRead = box.querySelector(".btn-read");

    if (readValue === "Read") {
      btnRead.style.backgroundColor = "green";
    } else {
      btnRead.style.backgroundColor = "";
    }
  }

  addBookForm.classList.add("hidden");
  addBtn.classList.remove("hidden");
  container.classList.remove("hidden");
};
