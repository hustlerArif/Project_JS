const URL = "https://hustlerarif.github.io/API_endpoints/db.json";

const parentElement = document.querySelector(".main");
const searchInput = document.querySelector(".input");
const movieRatings = document.querySelector("#rating-select");
const movieGenres = document.querySelector("#genre-select");

let searchValue = "";
let filteredArrOfMovies = [];
let ratings = 0;
let genre = "";

const getMovies = async (url) => {
  try {
    const { data } = await axios.get(url);
    // console.log(data);
    return data;
  } catch (err) {}
};

let movies = await getMovies(URL);
// console.log(movies)

const createElement = (element) => document.createElement(element); // figure it out

const createMovieCard = (movies) => {
  for (let movie of movies) {
    // creating parent container
    const cardContainer = createElement("div");
    cardContainer.classList.add("card", "shadow");

    // creating image container
    const imageContainer = createElement("div");
    imageContainer.classList.add("card-image-container");

    // creating card image
    const imageEle = createElement("img");
    imageEle.classList.add("card-image");
    imageEle.setAttribute("src", movie.img_link);
    imageEle.setAttribute("alt", movie.name);
    imageContainer.appendChild(imageEle);

    cardContainer.appendChild(imageContainer);

    // creating card details container

    const cardDetails = createElement("div");
    cardDetails.classList.add("movie-details");

    // card title

    const titleEle = createElement("p");
    titleEle.classList.add("title");
    titleEle.innerText = movie.name;
    cardDetails.appendChild(titleEle);

    // card genre

    const genreEle = createElement("p");
    genreEle.classList.add("genre");
    genreEle.innerText = `Genre: ${movie.genre}`;
    cardDetails.appendChild(genreEle);

    // ratings and length container
    const movieRating = createElement("div");
    movieRating.classList.add("ratings");

    // star/rating component

    const ratings = createElement("div");
    ratings.classList.add("star-rating");

    // star icon
    const starIcon = createElement("span");
    starIcon.classList.add("material-icons-outlined");
    starIcon.innerText = "star";
    ratings.appendChild(starIcon);

    // ratings
    const ratingValue = createElement("span");
    ratingValue.innerText = movie.imdb_rating;
    ratings.appendChild(ratingValue);

    movieRating.appendChild(ratings);

    // length
    const length = createElement("p");
    length.innerText = `${movie.duration} mins`;

    movieRating.appendChild(length);
    cardDetails.appendChild(movieRating);
    cardContainer.appendChild(cardDetails);

    parentElement.appendChild(cardContainer);
  }
};

function getFilteredData() {
  filteredArrOfMovies =
    searchValue?.length > 0
      ? movies.filter(
          (movie) =>
            searchValue === movie.name ||
            searchValue === movie.director_name ||
            movie.writter_name.split(",").includes(searchValue) ||
            movie.cast_name.split(",").includes(searchValue)
        )
      : movies;

  if (ratings > 0) {
    filteredArrOfMovies =
      searchValue?.length > 0 ? filteredArrOfMovies : movies;
    filteredArrOfMovies = filteredArrOfMovies.filter(
      (movie) => movie.imdb_rating >= ratings
    );
  }

  if (genre?.length > 0) {
    filteredArrOfMovies =
      searchValue?.length > 0 || ratings > 7 ? filteredArrOfMovies : movies;  // if search value is given + rating applied
    filteredArrOfMovies = filteredArrOfMovies.filter((movie) =>
      movie.genre.includes(genre)
    );
  }

  return filteredArrOfMovies;
}

function handleSearch(event) {
  // console.log(event.target.value)
  searchValue = event.target.value;
  // console.log(searchValue);

  // filteredArrOfMovies =
  //   searchValue?.length > 0
  //     ? movies.filter(
  //         (movie) =>
  //           searchValue === movie.name ||
  //           searchValue === movie.director_name ||
  //           movie.writter_name.split(",").includes(searchValue) ||
  //           movie.cast_name.split(",").includes(searchValue)
  //       )
  //     : movies;
  // console.log("filtered Data", filteredArrOfMovies);

  let filterBySearch = getFilteredData();
  parentElement.innerHTML = "";
  // createMovieCard(filteredArrOfMovies);
  createMovieCard(filterBySearch);
}

function debounce(callback, delay) {
  let timerId;

  return (...args) => {
    clearTimeout(timerId);
    timerId = setTimeout(() => {
      callback(...args);
    }, delay);
  };
}

function handleRatingSelector(event) {
  // console.log(event.target.value)
  ratings = event.target.value;
  let filterByRating = getFilteredData();
  parentElement.innerHTML = "";
  createMovieCard(ratings ? filterByRating : movies);
}

const debounceInput = debounce(handleSearch, 500);

searchInput.addEventListener("keyup", debounceInput); // performance optimization using debounce

movieRatings.addEventListener("change", handleRatingSelector); // Rating with searchable input



// Filter By Genre;

// const genre= movies.map((movie)=> movie.genre)
// console.log(genre)

const genres = movies.reduce((acc, cur) => {
  let genresArr = [];
  let tempGenresArr = cur.genre.split(",");
  acc = [...acc, ...tempGenresArr];
  for (let genre of acc) {
    if (!genresArr.includes(genre)) {
      genresArr = [...genresArr, genre];
    }
  }
  return genresArr;
}, []);

for (let genre of genres) {
  const option = createElement("option");
  option.classList.add("option");
  option.setAttribute("value", genre);
  option.innerText = genre;
  movieGenres.appendChild(option);
}

function handleGenreSelect(event) {
  genre = event.target.value;
  const filteredMoviesByGenre = getFilteredData();
  parentElement.innerHTML = "";
  createMovieCard(genre ? filteredMoviesByGenre : movies);
}

movieGenres.addEventListener("change", handleGenreSelect);

createMovieCard(movies);

// fetch(URL)
// .then((response)=>response.json())
// .then((data)=>console.log(data))
// .catch((err)=>console.log(err))
