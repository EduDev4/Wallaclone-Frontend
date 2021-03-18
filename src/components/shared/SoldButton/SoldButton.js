import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';

import { advertsSetAdState } from '../../../store/actions/adverts-actions';
import soldEmptyIcon from '../../../assets/sold-empty-advert-50.png';
import soldFilledIcon from '../../../assets/sold-filled-advert-50.png';
import { setUnsetSold } from '../../../api/users';

import './SoldButton.css';

const SoldButton = ({ initialValue, adId }) => {
  const [sold, setSold] = useState(initialValue);
  const { t } = useTranslation(['advertdetails']);
  const dispatch = useDispatch();

  const handleClick = async e => {
    e.preventDefault();
    try {
      const { adStatus } = await setUnsetSold(adId);
      setSold(!sold);
      dispatch(advertsSetAdState(adStatus));
    } catch (err) {
      console.log(err);
    }
  };
  const renderContent = () => (
    <span>{sold ? t('Poner a la venta') : t('Marcar como vendido')}</span>
  );

  return (
    <button
      type="button"
      className={sold ? 'sold-wrapper-sold' : 'sold-wrapper-available'}
      onClick={handleClick}
    >
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
