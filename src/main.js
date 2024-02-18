import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const refs = {
  searchForm: document.querySelector('form'),
  searchInput: document.querySelector('input'),
  searchButton: document.querySelector('button'),
  gallery: document.querySelector('.images'),
  loader: document.querySelector('.loader'), 
};

hideLoader();

const lightbox = new SimpleLightbox('.images a');

refs.gallery.addEventListener('click', e => {
  if (e.target === e.currentTarget) return;
  e.preventDefault();
});

refs.searchForm.addEventListener('submit', async e => {
  e.preventDefault();
  const userValue = e.target.elements.input.value;

  if (userValue === '') return;

  showLoader(); 

  try {
    const data = await searchImages(userValue);
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

function searchImages(userValue) {
  const BASE_URL = `https://pixabay.com/api/?key=42312276-5bc23f4af127c6565aecd0d27&q=${userValue}`;

  const options = {
    q: `${userValue}`,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
  };
  return fetch(BASE_URL, options).then(res => res.json());
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
  refs.gallery.insertAdjacentHTML('afterbegin', markup);
}
