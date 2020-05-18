import "./main.css";

import Categories from "./components/categories/categories.js";

let root = document.getElementById("root");

let categories = new Categories(["dev", "celebrities"]);
console.log(categories.renderTabs());
root.appendChild(categories.renderTabs());
