// import styles
import './main.css';
import JokeFavourite from '../src/components/jokeFavourite/jokeFavourite.js';

// import js
import Filter from './components/filter/filter.js';
import Button from './components/submit/submit.js';

// root
let layoutFilter = document.getElementById('layout__filter');

// ===== filter create and listen =====
let filter = new Filter();
// 1. render filter
layoutFilter.appendChild(filter.render());
// 2. add event listeners to filter
filter.listenFilter();

// ===== filter 'Get a joke' button =====
let button = new Button();
// 1. get final value from form when click 'Submit'
button.buttonListener(filter);

// ===== local storage =====
button.arrayOfFavouriteObjects = JSON.parse(localStorage.getItem('favouriteJokesArray'));
if (button.arrayOfFavouriteObjects === null) {
  button.arrayOfFavouriteObjects = [];
}

button.arrayOfFavouriteObjects.forEach((favouriteJoke) => {
  let jokeFavourite = new JokeFavourite(favouriteJoke);
  jokeFavourite.renderJoke();
});

// ===== handling favourite likes from local storage =====
// 1. add event listener for every joke of favourite container
// 2. remove event listener when user clicks like button of ordinary joke
// it should be fine bacause like listens from Button.arrayOfFavouriteObjects

// 1. == add event listener for every joke of favourite container ==
let favouriteContainer = document.getElementById('layout__favourites');
let favouriteContainerJoke = favouriteContainer.getElementsByClassName('joke');
for (let i = 0; i < favouriteContainerJoke.length; i++) {
  favouriteContainerJoke[i].addEventListener('click', (event) => {
    // console.log(favouriteContainerJoke);
    if (event.target.classList[2] === 'heart-active') {
      // 2. remove joke
      // console.log(event.target.parentNode.parentNode.remove());
      // favouriteContainerJoke[i].remove();
      event.target.parentNode.parentNode.remove();
      // 3. remove object with joke from array
      button.arrayOfFavouriteObjects = button.arrayOfFavouriteObjects.filter((favObj) => {
        return favObj.id !== event.target.classList[1];
      });
    }
    localStorage.setItem('favouriteJokesArray', JSON.stringify(button.arrayOfFavouriteObjects));

    // == when user unlike button of favourite container it responce on like of ordinary joke ==
    let layoutJokes = document.getElementById('layout__jokes');
    if (layoutJokes.innerHTML) {
      let jokeOfOrdinaryContainer = layoutJokes.getElementsByClassName('joke');
      for (let j = 0; j < jokeOfOrdinaryContainer.length; j++) {
        let necessaryLike = jokeOfOrdinaryContainer[j].getElementsByClassName(event.target.classList[1])[0];
        if (necessaryLike) {
          necessaryLike.classList.remove('heart-active');
        }
      }
    }
    console.log(favouriteContainerJoke);
  });
}
