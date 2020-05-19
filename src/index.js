// import styles
import './main.css';

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
