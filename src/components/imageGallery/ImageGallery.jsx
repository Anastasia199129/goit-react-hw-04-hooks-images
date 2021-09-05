import s from './imageGallery.module.css';
import PropTypes from 'prop-types';

const ImageGallery = ({ children }) => {
  return (
    <section>
      <ul className={s.ImageGallery}> {children}</ul>
    </section>
  );
};

export default ImageGallery;

ImageGallery.propTypes = {
  children: PropTypes.any,
};
