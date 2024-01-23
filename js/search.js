import { initializeApp } from "https://www.gstatic.com/firebasejs/9.5.0/firebase-app.js";
import {
  getDatabase,
  ref,
  onValue,
} from "https://www.gstatic.com/firebasejs/9.5.0/firebase-database.js";

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

const booksRef = ref(db, "books");

const carouselInner = document.querySelector(".carousel-inner");
const searchInput = document.getElementById("searchBook");
const searchBtn = document.getElementById("searchBtn");

const carouselBtn = document.querySelector(".carouselBtn");

searchBtn.addEventListener("click", function (e) {
  e.preventDefault();
  filterBook(searchInput.value);
});


const filterBook = (name) => {
    onValue(booksRef, (snapshot) => {
      const bookData = snapshot.val();
      const bookArr = Object.entries(bookData);
  
      const resultArr = bookArr.filter((item) => {
        return item[1].title.toLowerCase().includes(name.toLowerCase());
      });
  
      const existingMessage = carouselInner.querySelector(".alert-warning");
  
      if (name.trim() !== "" && resultArr.length === 0) {
        if (!existingMessage) {
          const messageContainer = document.createElement("marquee");
          messageContainer.classList.add("alert");
          messageContainer.classList.add("alert-warning");
          messageContainer.classList.add("mb-3");
          messageContainer.innerHTML = "No book title found";
          carouselInner.appendChild(messageContainer);
        } else {
          existingMessage.innerHTML = "No book title found";
        }
      } else if (name.trim() === "") {
        if (!existingMessage) {
          const messageContainer = document.createElement("marquee");
          messageContainer.classList.add("alert");
          messageContainer.classList.add("alert-warning");
          messageContainer.classList.add("mb-3");
          messageContainer.innerHTML = "Please enter a book title";
          carouselInner.appendChild(messageContainer);
        } else {
          existingMessage.innerHTML = "Please enter a book title";
        }
      }
  
      if (name.trim() !== "" && resultArr.length > 0) {
        displayResults(resultArr);
      }
    });
  };
  

const displayResults = (results) => {
  carouselInner.innerHTML = "";
  results.forEach((item) => {
    const book = item[1];
    const bookElement = document.createElement("div");
    bookElement.classList.add("carousel-item");
    bookElement.classList.add("d-bloc");

    bookElement.innerHTML = `
      <div class="carouselBox d-flex justify-content-around align-items-center gap-4">
        <img src="${book.bookImage}" alt="${book.title}" />
        <div class="book-about">
          <h2 class="book-name">${book.title}</h2>
          <h4 class="book-writer">${book.author}</h4>
          <p class="about-the-book">${book.description}</p>
        </div>
      </div>
    `;
    carouselInner.appendChild(bookElement);
    console.log(carouselInner.children.length);
  });

  if (results.length > 0) {
    carouselInner.firstElementChild.classList.add("active");
  }
  if (carouselInner.children.length === 1) {
    carouselBtn.classList.add("d-none");
  } else {
    carouselBtn.classList.remove("d-none");
  }
};
