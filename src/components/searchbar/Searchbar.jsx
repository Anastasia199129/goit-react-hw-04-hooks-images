import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import LoaderHearts from '../loader/Loader';
import s from './searchbar.module.css';
import axios from 'axios';
import Button from '../button/Button';
import ImageGallery from '../imageGallery/ImageGallery';
import ImageGalleryItem from '../imageGalleryItem/ImageGalleryItem';
import Modal from '../modal/Modal';

const API_KEY = '22334770-5fe06baa3562bf01c1a6f3fbc';

const Searchbar = ({ onSubmit }) => {
  const [value, setValue] = useState('');
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [searchValue, setSearchValue] = useState('');
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [largeImeges, setLargeImeges] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!searchValue) {
      return;
    }
    setLoading(true);
    const fetch = () => {
      return axios
        .get(
          `https://pixabay.com/api/?q=${searchValue}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`,
        )
        .then(response => {
          if (response.status === 200) {
            setLoading(false);
            return response.data.hits;
          }
        });
    };
    fetch()
      .then(resp => {
        setImages(prevState => [...prevState, ...resp]);
        if (resp.length === 0) {
          toast.error('По такому запросу картинки не найденны!');
        }
        if (images.length > 11) {
          window.scrollTo({
            top: document.documentElement.scrollHeight,
            behavior: 'smooth',
          });
        }
        if (resp.status === 400) {
          setError('картинки по вашему зыпросу не найдены');
        }
      })
      .catch(error => setError(error));
  }, [searchValue, page]);

  const onButtonClick = e => {
    setPage(page + 1);
  };

  const onChangeHandler = e => {
    setValue(e.currentTarget.value.toLowerCase());
  };

  const reset = () => {
    setValue('');
  };

  const togleModal = () => {
    setShowModal(pevShowModal => !pevShowModal);
  };

  const onItemClick = e => {
    setLargeImeges(e);
    togleModal();
  };

  const onSubmitForm = e => {
    e.preventDefault();
    if (value.trim() === '') {
      toast.warn('Заполните поле поиска!');
      return;
    }

    setSearchValue(value);
    onSubmit(value);
    reset();
    setPage(1);
    setImages([]);
    setError(null);
  };

  return (
    <section>
      <header className={s.Searchbar}>
        <form className={s.SearchForm} onSubmit={onSubmitForm}>
          <button type="submit" className={s.SearchFormButton}>
            <span className={s.SearchFormButtonLabel}>Search</span>
          </button>

          <input
            onChange={onChangeHandler}
            className={s.SearchFormInput}
            type="text"
            value={value}
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
          />
        </form>
      </header>
      {error && <h1>An error has occurred!</h1>}
      {loading && <LoaderHearts />}
      {images.length !== 0 && (
        <ImageGallery arrayImages={images}>
          <ImageGalleryItem imagesAray={images} onClick={onItemClick} />
        </ImageGallery>
      )}

      {images.length !== 0 && <Button text="Load more" onClick={onButtonClick} />}
      {showModal && <Modal onClose={togleModal} modalImg={largeImeges} />}
    </section>
  );
};

Searchbar.propTypes = {
  value: PropTypes.string,
  images: PropTypes.array,
  page: PropTypes.number,
  searchValue: PropTypes.string,
  loading: PropTypes.bool,
  showModal: PropTypes.bool,
  largeImeges: PropTypes.string,
  onSubmit: PropTypes.func,
};

export default Searchbar;
