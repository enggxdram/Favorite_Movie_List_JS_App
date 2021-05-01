const addMovieModal = document.getElementById("add-modal");
const addBackdrop = document.getElementById("backdrop");
const userInputs = document.querySelectorAll("input");
const entryTextSection = document.getElementById("entry-text");
const movieList = document.getElementById("movie-list");
const deleteMovieModal = document.getElementById("delete-modal");

const addMovieModalButton = document.querySelector("header button");
const cancelAddMovieButton = addMovieModal.querySelector("button.btn--passive");
const addMovieButton = cancelAddMovieButton.nextElementSibling;

const movies = [];

//Event Listeners
addMovieModalButton.addEventListener("click", openMovieModal);
addBackdrop.addEventListener("click", backdropClickHandler);
cancelAddMovieButton.addEventListener("click", cancelAddMovieHandler);
addMovieButton.addEventListener("click", addMovieHandler);

//Functions
function closeMovieModal() {
  addMovieModal.classList.remove("visible");
  toggleBackdrop();
}

function openMovieModal() {
  addMovieModal.classList.add("visible");
  toggleBackdrop();
}

function toggleBackdrop() {
  addBackdrop.classList.toggle("visible");
}

function backdropClickHandler() {
  closeMovieModal();
  deleteMovieModal.classList.remove("visible");
}

function clearInputs() {
  userInputs[0].value = "";
  userInputs[1].value = "";
  userInputs[2].value = "";
}

function cancelAddMovieHandler() {
  clearInputs();
  closeMovieModal();
}

function updateUI() {
  if (movies.length != 0) {
    entryTextSection.style.display = "none";
  } else {
    entryTextSection.style.display = "block";
  }
}

function deleteMovie(movieId) {
  let movieIndex = 0;
  for (const movie of movies) {
    if (movie.id === movieId) {
      break;
    }
    movieIndex++;
  }
  movies.splice(movieIndex, 1);
  movieList.children[movieIndex].remove();
  backdropClickHandler();
  updateUI();
}

function cancelMovieDeletion() {
  backdropClickHandler();
}

function confirmMovieDeletetion(movieId) {
  deleteMovie(movieId);
}

function deleteMovieHandler(movieId) {
  deleteMovieModal.classList.add("visible");
  toggleBackdrop();
  const cancelMovieDeleteButton = deleteMovieModal.querySelector(
    ".btn--passive"
  );
  cancelMovieDeleteButton.removeEventListener("click", confirmMovieDeletetion);
  let confirmMovieDeleteButton = deleteMovieModal.querySelector(".btn--danger");

  confirmMovieDeleteButton.replaceWith(
    confirmMovieDeleteButton.cloneNode(true)
  );

  confirmMovieDeleteButton = deleteMovieModal.querySelector(".btn--danger");

  cancelMovieDeleteButton.addEventListener("click", cancelMovieDeletion);
  confirmMovieDeleteButton.addEventListener(
    "click",
    deleteMovie.bind(null, movieId)
  );
}

function renderNewMovieElement(id, title, imageURL, rating) {
  const newMovieElement = document.createElement("li");
  newMovieElement.className = "movie-element";
  newMovieElement.innerHTML = `
    <div class="movie-element__image">
      <img src="${imageURL}" alt="${title}">
    </div>
    <div class="movie-element__info">
      <h2>${title}</h2>
      <p>${rating}/5 stars</p>
    </div>
  `;

  newMovieElement.addEventListener("click", deleteMovieHandler.bind(null, id));

  movieList.append(newMovieElement);
}

function addMovieHandler() {
  const title = userInputs[0].value;
  const imageURL = userInputs[1].value;
  const rating = userInputs[2].value;

  if (
    title.trim() == "" ||
    imageURL.trim() == "" ||
    rating.trim() == "" ||
    +rating < 1 ||
    +rating > 5
  ) {
    alert("Please input valid values! (The rating should be between 1 and 5.");
    return;
  }

  const newMovie = {
    id: Math.random().toString(),
    title: title,
    image: imageURL,
    rating: rating,
  };

  movies.push(newMovie);
  console.log(movies);
  closeMovieModal();
  renderNewMovieElement(
    newMovie.id,
    newMovie.title,
    newMovie.image,
    newMovie.rating
  );
  updateUI();
  clearInputs();
}
