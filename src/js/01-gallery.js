// Add imports above this line
import { galleryItems } from './gallery-items';
// Change code below this line
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

import { galleryItems } from './gallery-items.js'; 

const galleryList = document.querySelector('.gallery');
const imgList = galleryItems
    .map(({ preview, original, description }) =>
        `<li class="gallery_item">
            <a class="gallery_link" href="${original}">
                <img
                    class="gallery_image"
                    src="${preview}"
                    data-source="${original}"
                    alt="${description}"
                />
            </a>
        </li>`
    )
    .join('');

galleryList.insertAdjacentHTML('beforeend', imgList);


const lightbox = new SimpleLightbox('.gallery a', {
  captionsData: function(element) {
    return `<img src="${element.href}" width="1400" height="900">`;
  },

});

 