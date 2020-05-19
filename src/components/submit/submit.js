export default class Button {
  constructor() {
    this.jsonVal = {};
  }

  // add event listener to buttor and return fetch object
  buttonListener(filter) {
    let getAJokeButton = document.getElementById('submit');
    getAJokeButton.addEventListener('click', (e) => {
      e.preventDefault();
      this.getJSONData(filter.finalFilterValue).then((data) => {
        this.jsonVal = data;
        console.log(this);
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
