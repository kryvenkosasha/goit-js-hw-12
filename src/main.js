import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import axios from 'axios';

const refs = {
  searchForm: document.querySelector('form'),
  searchInput: document.querySelector('input'),
  searchButton: document.querySelector('.search'),
  gallery: document.querySelector('.images'),
  loader: document.querySelector('.loader'),
  loadMore: document.querySelector('.load-more'),
};

let userValue;
let page = 1;
let maxPage;

hideLoader();
hideLoadMoreBtn();

const lightbox = new SimpleLightbox('.images a');

refs.loadMore.addEventListener('click', async e => {
  e.preventDefault();
  page += 1;
  showLoader();
  const data = await searchImages(userValue, page);
  renderImages(data);
  hideLoader();
  lightbox.refresh();

  let elem = document.querySelector('li');
  let rect = elem.getBoundingClientRect();
  window.scrollBy({
    top: rect.height * 2,
    left: 0,
    behavior: 'smooth',
  });
  console.log(rect);
  chekBtnVisibleStatus();
});

refs.gallery.addEventListener('click', e => {
  if (e.target === e.currentTarget) return;
  e.preventDefault();
});

refs.searchForm.addEventListener('submit', async e => {
  e.preventDefault();
  userValue = e.target.elements.input.value;

  if (userValue === '') return;

  showLoader();

  try {
    const data = await searchImages(userValue, page);
    refs.gallery.innerHTML = '';
    renderImages(data);
    lightbox.refresh();
  } catch (error) {
    console.log(error);
  } finally {
    hideLoader();
  }
});

function showLoader() {
  refs.loader.style.display = 'block';
}

function hideLoader() {
  refs.loader.style.display = 'none';
}

async function searchImages(userValue, page) {
  const BASE_URL = `https://pixabay.com/api/?key=42312276-5bc23f4af127c6565aecd0d27&q=${userValue}`;

  const options = {
    q: `${userValue}`,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    page: page,
    per_page: 15,
  };

  page = 1;

  const res = await axios.get(BASE_URL, { params: options });
  maxPage = Math.ceil(res.data.totalHits / 15);
  chekBtnVisibleStatus();
  return res.data;
}

function createMarcup(images) {
  if (images.hits.length === 0) {
    iziToast.show({
      message: 'За запитом нічого не знайдено',
      color: 'red',
    });
    return;
  }
  const markup = images.hits
    .map(image => {
      return `<li><a href=${image.largeImageURL} ><img src=${image.webformatURL}></a>
  <p>Tags: ${image.tags} </p>
  <p>Likes: ${image.likes} </p>
  <p>Views: ${image.views} </p>
  <p>Comments: ${image.comments} </p>
  <p>Downloads: ${image.downloads} </p>
  </li>`;
    })
    .join('\n');
  return markup;
}

function renderImages(data) {
  if (data.hits.length === 0) {
    iziToast.show({
      message: 'За запитом нічого не знайдено',
      color: 'red',
    });
    return;
  }
  const markup = createMarcup(data);
  refs.gallery.insertAdjacentHTML('beforeend', markup);
}

function showLoadMoreBtn() {
  refs.loadMore.classList.remove('hidden');
}

function hideLoadMoreBtn() {
  refs.loadMore.classList.add('hidden');
}

function chekBtnVisibleStatus() {
  if (page === maxPage) {
    hideLoadMoreBtn();
    iziToast.show({
      message: 'This are all photos',
      color: 'blue',
    });
  } else {
    showLoadMoreBtn();
  }
}
