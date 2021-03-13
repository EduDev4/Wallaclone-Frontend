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
    <span>{reserved ? 'Poner disponible' : 'Reservar'}</span>
  );

  return (
    <button
      type="button"
      className={
        reserved ? 'reserved-wrapper-reserved' : 'reserved-wrapper-available'
      }
      onClick={handleClick}
    >
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
