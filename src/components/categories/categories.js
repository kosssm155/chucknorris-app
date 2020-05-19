// class resposible for rendering and listening tabs from categories
// when we press radio button 'From categories'

export default class Categories {
  constructor(arrayOfCategories) {
    this.arrayOfCategories = arrayOfCategories;
    this.finalValue = '';
  }

  renderTabs() {
    let tabs = document.createElement('div');
    let tabsList = document.createElement('ul');
    tabs.className = 'tabs';
    tabsList.className = 'tabs__list';

    for (let i = 0; i < this.arrayOfCategories.length; i++) {
      let tabsItem = document.createElement('li');
      let tabsLink = document.createElement('a');
      tabsItem.className = 'tabs__item';
      tabsItem.setAttribute('tabindex', '0');
      tabsItem.setAttribute('data-value', this.arrayOfCategories[i]);
      tabsLink.className = 'tabs__link';
      tabsLink.innerHTML = this.arrayOfCategories[i].toUpperCase();
      tabsLink.setAttribute('data-category-value', this.arrayOfCategories[i]);
      tabsItem.appendChild(tabsLink);
      tabsList.appendChild(tabsItem);
    }

    tabs.appendChild(tabsList);

    return tabs;
  }
}
