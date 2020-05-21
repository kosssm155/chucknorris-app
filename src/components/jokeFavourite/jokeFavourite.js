export default class JokeFavourite {
  constructor({
    categories = 'undefined',
    created_at = 'undefined',
    icon_url = 'undefined',
    id = 'undefined',
    updated_at = 'undefined',
    url = 'undefined',
    value = 'undefined',
  }) {
    this.categories = categories.length === 0 ? 'random' : categories[0];
    this.created_at = created_at;
    this.icon_url = icon_url;
    this.id = id;
    this.updated_at = updated_at;
    this.url = url;
    this.value = value;
  }

  renderJoke() {
    let jokeContainer = document.createElement('div');
    jokeContainer.className = `joke ${this.id}`;
    jokeContainer.innerHTML = `
    <div class="joke__inner">
      <p class="joke__id"><span>ID:</span><a href="${this.url}">${this.id}</a></p>
      <p class="joke__text">
        ${this.value}
      </p>
      <div class="joke__footer">
        <span class="joke__last-update">Last update: ${this.updated_at}</span>
        <span class="joke__category">${this.categories}</span>
      </div>
    </div>
    <div class="joke__outer">
      <div class="joke__like ${this.id} heart-active"></div>
      <div class="joke__message"></div>
    </div>
    `;

    document.getElementById('layout__favourites').appendChild(jokeContainer);
  }
}
