// import styles
import './main.css';

// import js
import Categories from './components/categories/categories.js';
import Filter from './components/filter/filter.js';

// root
let root = document.getElementById('root');

// ===== filter create and listen =====
let filter = new Filter();
root.appendChild(filter.render());
filter.listenFilter();

// ===== filter 'Get a joke' button =====
let getAJokeButton = document.getElementById('submit');
getAJokeButton.addEventListener('click', (e) => {
  e.preventDefault();
  console.log(filter.finalFilterValue);
});
