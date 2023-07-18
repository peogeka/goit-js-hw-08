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
galleryList.onclick = (event) => {
    event.preventDefault();
    if (!event.target.classList.contains('gallery_image')) {
        return;
    }

    const imageSource = event.target.dataset.source;
    const instance = new SimpleLightbox(`<img src="${imageSource}" width="1400" height="900">`, {
        onShow: () => {
            window.addEventListener('keydown', onEsc);
        },
        onClose: () => {
            window.removeEventListener('keydown', onEsc);
        }
    });

    instance.show();

    function onEsc(event) {
        if (event.key === 'Escape') {
            instance.close();
        }
    }
};

console.log(galleryItems);
