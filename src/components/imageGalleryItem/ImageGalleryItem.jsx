import React from 'react';
import s from './imageGalleryItem.module.css';

const ImageGalleryItem = ({ onClick, imagesAray }) => {
  const largeImgesModal = largeImageURL => {
    onClick(largeImageURL);
  };

  return imagesAray.map(({ id, webformatURL, largeImageURL, tags }) => (
    <li key={id} className={s.ImageGalleryItem} onClick={() => largeImgesModal(largeImageURL)}>
      <img src={webformatURL} alt={tags} className={s.ImageGalleryItemImage} />
    </li>
  ));
};

export default ImageGalleryItem;
