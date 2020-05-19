export default class Search {
  render() {
    let search = document.createElement('div');
    search.className = 'search';
    search.innerHTML = `
      <input
        class="search__input"
        type="search"
        id="site-search"
        aria-label="Search through site content"
        placeholder="Free text search..."
      />
    `;

    return search;
  }
}
