import Joke from '../joke/joke.js';

// Button class functions:
// 1. Get JSON data as a string
// 2. Fetch url
// 3. Listen when user like joke

export default class Button {
  constructor() {
    this.jsonVal = {};
    this.jsonValArrOfObjects = [];
  }

  // add event listener to buttor and return fetch object
  buttonListener(filter) {
    let getAJokeButton = document.getElementById('submit');
    getAJokeButton.addEventListener('click', (e) => {
      e.preventDefault();
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
          let joke = new Joke(element);
          joke.renderJoke();
        });

        let layoutJokes = document.getElementById('layout__jokes');
        let jokesNodeList = layoutJokes.querySelectorAll('.joke');

        jokesNodeList.forEach((element) => {
          element.addEventListener('click', (e) => {
            if (e.target.classList[2] === 'heart-active') {
              e.target.classList.remove('heart-active');
            } else if (e.target.className.split(' ')[0] === 'joke__like') {
              e.target.classList.add('heart-active');
            }
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

  // handleJoke(e) {
  //   console.log(this);
  //   console.log(e);
  //   let like = this.querySelectorAll('.joke__like');
  // }
}
