import './App.css';
import PropTypes from 'prop-types';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useState } from 'react';
import Searchbar from './components/searchbar/Searchbar';
import ImageGallery from './components/imageGallery/ImageGallery';

const App = () => {
  const [imageName, setImageName] = useState('');

  const onSubmithandler = data => {
    setImageName(data.value);
  };

  return (
    <div>
      <Searchbar onSubmit={onSubmithandler} />
      <ImageGallery imageName={imageName} />
      <ToastContainer autoClose={3000} position="top-center" />
    </div>
  );
};

App.propTypes = {
  imageName: PropTypes.string,
};

export default App;
