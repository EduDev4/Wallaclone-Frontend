import React, { useState } from 'react';
import PropTypes from 'prop-types';

import soldEmptyIcon from '../../../assets/sold-empty-advert-50.png';
import soldFilledIcon from '../../../assets/sold-filled-advert-50.png';
import { setUnsetSold } from '../../../api/users';

import './SoldButton.css';

const SoldButton = ({ initialValue, adId }) => {
  const [sold, setSold] = useState(initialValue);

  const handleClick = async e => {
    e.preventDefault();
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
