// function for searching books
const searchBooks = () => {
  const searchText = document.getElementById("search-field").value;
  const url = `https://openlibrary.org/search.json?q=${searchText}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => displayBooks(data));
};

// function for displaying search results
const displayBooks = (books) => {
  console.log(books);
};
