export let open = document.querySelector('.open__open');

open.addEventListener('click', () => {
  let block = document.getElementById('layout__favourites-wr');
  block.classList.add('display-block');
});
