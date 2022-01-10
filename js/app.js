// function for searching books
const searchBooks = () => {
  const searchText = document.getElementById("search-field").value;
  //   document.getElementById("spinner").style.display = "block";
  document.getElementById("search-field").value = "";
  document.getElementById("search-count").innerText = "";
  document.getElementById("books-display").innerText = "";
  //   document.getElementById("section").innerText = "";
  const url = `https://openlibrary.org/search.json?q=${searchText}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => displayBooks(data));
};``

// function for displaying search results
const displayBooks = (books) => {
  displaySearchCount(books.numFound);
  if (books.numFound === 0) {
    document.getElementById("section").innerHTML = `
            <h2 class="text-center">Oops, No result found!</h2>
        `;
  } else {
    const sectionContainer = document.getElementById("books-display");
    let imgUrl = "";
    for (const book in books.docs) {
      const div = document.createElement("div");
      div.classList.add("col");
      if (books.docs[book].cover_edition_key) {
        imgUrl = `https://covers.openlibrary.org/b/olid/${books.docs[book].cover_edition_key}-M.jpg`;
      } else {
        imgUrl =
          "https://st3.depositphotos.com/23594922/31822/v/600/depositphotos_318221368-stock-illustration-missing-picture-page-for-website.jpg";
      }
      div.innerHTML = `
    <div class="card" style="width: 18rem;">
  <a href="https://openlibrary.org${books.docs[book].key}" target="_blank">
  <img src=${imgUrl} class="card-img-top" alt="${books.docs[book].title}">
  </a>
  <div class="card-body">
    <h5 class="card-title">${books.docs[book].title}</h5>
    <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
  </div>
  <ul class="list-group list-group-flush">
    <li class="list-group-item">Author: ${
      books.docs[book].author_name[0] === undefined
        ? "No Author"
        : books.docs[book].author_name[0]
    }</li>
    <li class="list-group-item">First Publication Year: ${
      books.docs[book].first_publish_year
        ? books.docs[book].first_publish_year
        : "No Data Available"
    }</li>
    <li class="list-group-item">A third item</li>
  </ul>
  <div class="card-body">
    <a href="#" class="card-link">Card link</a>
    <a href="#" class="card-link">Another link</a>
  </div>
</div>
  `;
      sectionContainer.appendChild(div);
    }
  }
  console.log(books.docs);
};

// function for showing book count from search
const displaySearchCount = (booksFound) => {
  const headerContainer = document.getElementById("header");
  const p = document.getElementById("search-count");
  p.innerText = `Number of search results: ${booksFound}`;
  headerContainer.appendChild(p);
};
