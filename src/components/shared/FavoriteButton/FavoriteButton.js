import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import favEmptyIcon from '../../../assets/fav-empty-advert-30.png';
import favFilledIcon from '../../../assets/fav-filled-advert-30.png';
import { setUnsetFav } from '../../../api/users';
import { getIsLoggedUser } from '../../../store/selectors';
import './FavoriteButton.css';

const FavoriteButton = ({ initialValue, adId }) => {
  const [fav, setFav] = useState(initialValue);
  const isLogged = useSelector(getIsLoggedUser);
  const history = useHistory();

  const handleClick = async () => {
    if (!isLogged) {
      history.push('/login');
      return;
    }
    try {
      await setUnsetFav(adId);
      setFav(!fav);
    } catch (err) {
      console.log(err);
    }
  };
  const renderContent = () => (
    <img
      className="favorite-icon"
      src={fav ? favFilledIcon : favEmptyIcon}
      alt={fav ? 'Fav' : 'No fav'}
    />
  );

  return (
    <button type="button" className="favorite-wrapper" onClick={handleClick}>
      {renderContent()}
    </button>
  );
};

FavoriteButton.propTypes = {
  initialValue: PropTypes.bool,
  adId: PropTypes.string.isRequired,
};

FavoriteButton.defaultProps = {
  initialValue: false,
};

export default FavoriteButton;
