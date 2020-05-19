import Categories from '../categories/categories.js';
import Search from '../search/search.js';

export default class Filter {
  constructor() {
    this.random = 'random';
    this.fromCategories = ['animal', 'career', 'celebrity', 'dev'];
    this.search = '';
    this.finalFilterValue = '';
  }

  // Render 'Filter component'
  render() {
    let form = document.createElement('form');
    form.innerHTML = `
      <div id="radio-buttons-wrapper">

        <label class="radio-button-label" for="random-radio">
          <input tabindex="0" type="radio" id="random-radio" class="radio" name="joke" value="random" data-radio="random" />
          Random
        </label>

        <label class="radio-button-label" for="category-radio">
          <input tabindex="0" type="radio" id="category-radio" class="radio" name="joke" data-radio="from-category" />
          From categories
        </label>

        <div id="tabs-wrapper"></div>

        <label class="radio-button-label" for="search-radio">
          <input tabindex="0" type="radio" id="search-radio" class="radio" name="joke" data-radio="from-search" />
          Search
        </label>

        <div class="search-wrapper"></div>

      </div>
      
      <div>

        <button type="submit" id="submit">Get a joke</button>

      </div>
    `;

    return form;
  }

  listenFilter() {
    let radioButtons = document.querySelectorAll('.radio-button-label');
    let tabsWrapper = document.getElementById('tabs-wrapper');
    let searchWrapper = document.querySelectorAll('.search-wrapper')[0];

    for (let i = 0; i < radioButtons.length; i++) {
      // Lister radio buttons of 'Filter component'
      radioButtons[i].addEventListener('click', (e) => {
        // if target 'Random'
        if (e.target.tagName === 'INPUT' && e.target.getAttribute('data-radio') === 'random') {
          this.finalFilterValue = 'random';

          if (tabsWrapper.childNodes[0]) {
            tabsWrapper.childNodes[0].style.display = 'none';
          }
          if (searchWrapper.childNodes[0]) {
            searchWrapper.childNodes[0].style.display = 'none';
          }

          // if radio 'From category'
        } else if (e.target.tagName === 'INPUT' && e.target.getAttribute('data-radio') === 'from-category') {
          let categories = new Categories(this.fromCategories);

          if (tabsWrapper.innerHTML === '') {
            tabsWrapper.appendChild(categories.renderTabs());
          }

          if (searchWrapper.childNodes[0]) {
            searchWrapper.childNodes[0].style.display = 'none';
          }

          tabsWrapper.childNodes[0].style.display = 'block';
          let tabsItems = tabsWrapper.childNodes[0].querySelectorAll('.tabs__item');

          // When click 'From category' radio button focus on the first item
          tabsItems[0].focus();
          this.finalFilterValue = tabsItems[0].getAttribute('data-value');

          tabsItems.forEach((tabList) => {
            tabList.addEventListener('focus', (e) => {
              if (e.target.tagName === 'LI') {
                this.finalFilterValue = e.target.getAttribute('data-value');
              } else if (e.target.tagName === 'A') {
                this.finalFilterValue = e.target.getAttribute('data-category-value');
              }
            });
          });
          // if radio 'Search'
        } else if (e.target.tagName === 'INPUT' && e.target.getAttribute('data-radio') === 'from-search') {
          let search = new Search();
          let input;

          if (tabsWrapper.childNodes[0]) {
            tabsWrapper.childNodes[0].style.display = 'none';
          }
          if (searchWrapper.innerHTML === '') {
            searchWrapper.appendChild(search.render());
          }

          searchWrapper.childNodes[0].style.display = 'block';

          input = searchWrapper.querySelector('input');
          input.focus();

          input.addEventListener('keyup', (e) => {
            this.finalFilterValue = e.target.value;
          });
        }
      });
    }
  }
}
