// import "./categories.css";

export default class Categories {
	constructor(arrayOfCategories) {
		this.arrayOfCategories = arrayOfCategories;
	}

	renderTabs() {
		let tabs = document.createElement("div");
		tabs.className = "tabs";
		let tabsList = document.createElement("ul");
		tabsList.className = "tabs__list";
		for (let i = 0; i < this.arrayOfCategories.length; i++) {
			let tabsItem = document.createElement("li");
			tabsItem.className = "tabs__item";
			tabsItem.innerHTML = this.arrayOfCategories[i];
			tabsList.appendChild(tabsItem);
		}
		tabs.appendChild(tabsList);

		return tabs;
	}
}
