import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import soldEmptyIcon from '../../../assets/sold-empty-advert-50.png';
import soldFilledIcon from '../../../assets/sold-filled-advert-50.png';
import { setUnsetSold } from '../../../api/users';

import { getIsLoggedUser } from '../../../store/selectors';
import './SoldButton.css';

const SoldButton = ({ initialValue, adId }) => {
  const [sold, setSold] = useState(initialValue);
  const isLogged = useSelector(getIsLoggedUser);
  const history = useHistory();

  const handleClick = async e => {
    e.preventDefault();
    if (!isLogged) {
      history.push('/login');
      return;
    }
    try {
      await setUnsetSold(adId);
      setSold(!sold);
    } catch (err) {
      console.log(err);
    }
  };
  const renderContent = () => (
    <img
      className="sold-icon"
      src={sold ? soldFilledIcon : soldEmptyIcon}
      alt={sold ? 'Sold' : 'No sold'}
    />
  );

  return (
    <button type="button" className="sold-wrapper" onClick={handleClick}>
      {renderContent()}
    </button>
  );
};

SoldButton.propTypes = {
  initialValue: PropTypes.bool,
  adId: PropTypes.string.isRequired,
};

SoldButton.defaultProps = {
  initialValue: false,
};

export default SoldButton;
