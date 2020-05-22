import Joke from '../joke/joke.js';
import JokeFavourite from '../jokeFavourite/jokeFavourite.js';

// Button class functions:
// 1. Get JSON data as a string
// 2. Fetch url
// 3. Listen when user like joke
// 4. Listen when user dislike joke
// 5. If the user input tha same in search, for example 'data', program have to track already liked jokes
// 6. Dislike jokes of favourite container
// 7. Input type='text' is required
// 8. Value of search input has to be correct

export default class Button {
  constructor() {
    this.jsonVal = {};
    this.jsonValArrOfObjects = [];
    this.arrayOfFavouriteObjects = [];
  }

  // add event listener to buttor and return fetch object
  buttonListener(filter) {
    let favouriteJokesWrapper = document.getElementById('layout__favourites');
    let getAJokeButton = document.getElementById('submit');
    let joke;
    let jokeFavourite;
    let layoutJokes = document.getElementById('layout__jokes');
    // let searchInput = document.getElementById('site-search');

    getAJokeButton.addEventListener('click', (e) => {
      e.preventDefault();

      // input type='text' is required
      if (document.getElementsByClassName('search')[0]) {
        if (document.getElementsByClassName('search')[0].style.display === 'block') {
          if (document.getElementById('site-search').value === '') {
            alert('search text is required');
            return;
          }
        }
      }

      if (document.body.contains(document.getElementById('site-search'))) {
        // clear input search when user press Get a joke button
        document.getElementById('site-search').value = '';
      }

      this.getJSONData(filter.finalFilterValue).then((data) => {
        this.jsonVal = data;

        if (this.jsonVal.total) {
          this.jsonValArrOfObjects = [];
          this.jsonValArrOfObjects = this.jsonVal.result;
        } else {
          this.jsonValArrOfObjects = [];
          this.jsonValArrOfObjects.push(this.jsonVal);
        }

        document.getElementById('layout__jokes').innerHTML = '';
        this.jsonValArrOfObjects.forEach((element) => {
          joke = new Joke(element);
          // Value of search input has to be correct
          if (joke.value === 'undefined') {
            alert("Text doest's fit search requirements. Pls type in another search value");
            return;
          }
          joke.renderJoke();
        });

        // if the user input tha same in search, for example 'data', program have to track already liked jokes
        for (let i = 0; i < this.arrayOfFavouriteObjects.length; i++) {
          for (let j = 0; j < this.jsonValArrOfObjects.length; j++) {
            if (JSON.stringify(this.arrayOfFavouriteObjects[i]) === JSON.stringify(this.jsonValArrOfObjects[j])) {
              layoutJokes
                .getElementsByClassName(`${this.arrayOfFavouriteObjects[i].id}`)[1]
                .classList.add('heart-active');
            }
          }
        }

        let jokesNodeList = layoutJokes.querySelectorAll('.joke');

        // like/dislike joke
        jokesNodeList.forEach((element) => {
          element.addEventListener('click', (e) => {
            // remove event listener of favourite jokes
            let favouriteContainer = document.getElementById('layout__favourites');
            let favouriteContainerJoke = favouriteContainer.getElementsByClassName('joke');
            for (let i = 0; i < favouriteContainerJoke.length; i++) {
              console.log(favouriteContainerJoke[i]);
            }

            // listen dislikes
            if (e.target.classList[2] === 'heart-active') {
              e.target.classList.remove('heart-active');
              this.arrayOfFavouriteObjects = this.arrayOfFavouriteObjects.filter((el) => {
                return el.id !== element.classList[1];
              });
              //listen likes
            } else if (e.target.className.split(' ')[0] === 'joke__like') {
              e.target.classList.add('heart-active');
              let favouriteJokeObject = this.jsonValArrOfObjects.filter((el) => {
                return el.id === element.classList[1];
              });
              this.arrayOfFavouriteObjects.push(favouriteJokeObject[0]);
            }
            // render layout__favourites wrapper
            favouriteJokesWrapper.innerHTML = '';

            this.arrayOfFavouriteObjects.forEach((favouriteJoke) => {
              jokeFavourite = new JokeFavourite(favouriteJoke);
              jokeFavourite.renderJoke();
            });

            // dislike joke in favourite container
            let jokesFavouriteNodeList = favouriteJokesWrapper.getElementsByClassName('joke');
            for (let j = 0; j < jokesFavouriteNodeList.length; j++) {
              jokesFavouriteNodeList[j].addEventListener('click', (e) => {
                if (e.target.classList[2] === 'heart-active') {
                  this.arrayOfFavouriteObjects = this.arrayOfFavouriteObjects.filter((el) => {
                    return el.id !== e.target.classList[1];
                  });

                  e.target.parentNode.parentNode.remove();

                  let classListToDubble = document.getElementById(e.target.classList[1]);

                  if (classListToDubble != null) {
                    classListToDubble.getElementsByClassName('heart-active')[0].classList.remove('heart-active');
                  }
                }
                localStorage.setItem('favouriteJokesArray', JSON.stringify(this.arrayOfFavouriteObjects));
              });
            }
            localStorage.setItem('favouriteJokesArray', JSON.stringify(this.arrayOfFavouriteObjects));
          });
        });
      });
    });
  }

  // fetch data
  getJSONData(string) {
    return fetch(`https://api.chucknorris.io/jokes/${string}`, {}).then((response) => {
      if (response.status === 200) {
        return response.json();
      } else {
        throw new Error('Unable to fetch data');
      }
    });
  }
}
