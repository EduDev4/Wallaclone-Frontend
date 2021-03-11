import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';

import { advertsSetAdState } from '../../../store/actions';
import { getPublicUrl } from '../../../config/envConfig';
import { setUnsetReserved } from '../../../api/users';
import './ReserveButton.css';

const ReserveButton = ({ initialValue, adId }) => {
  const [reserved, setReserved] = useState(initialValue);
  const dispatch = useDispatch();

  const handleClick = async e => {
    e.preventDefault();
    try {
      const { adStatus } = await setUnsetReserved(adId);
      setReserved(!reserved);
      dispatch(advertsSetAdState(adStatus));
    } catch (err) {
      console.log(err);
    }
  };
  const renderContent = () => (
    <img
      className="favorite-icon"
      src={
        reserved
          ? `${getPublicUrl()}/icons/reserved-30.png`
          : `${getPublicUrl()}/icons/unreserved-30.png`
      }
      alt={reserved ? 'Reserved' : 'No reserved'}
    />
  );

  return (
    <button type="button" className="favorite-wrapper" onClick={handleClick}>
      {renderContent()}
    </button>
  );
};

ReserveButton.propTypes = {
  initialValue: PropTypes.bool,
  adId: PropTypes.string.isRequired,
};

ReserveButton.defaultProps = {
  initialValue: false,
};

export default ReserveButton;
