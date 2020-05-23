export let close = document.querySelector('.close');

close.addEventListener('click', () => {
  document.querySelector('.background-transparent').classList.remove('display');
  document.querySelector('#layout__favourites-wr').classList.remove('display-block');
});
