/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect } from 'react';

import PropTypes from 'prop-types';
import { Link, useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { getIsLoggedUser, getUserId } from '../../../store/selectors';
import FavoriteButton from '../../shared/FavoriteButton';

import MainLayout from '../../layout/MainLayout';

import './AdvertPage.css';
import { getApiBaseUrl } from '../../../config/envConfig';

function AdvertPage({
  match,
  currentUsername,
  isLogged,
  advert,
  loadAdvertDetail,
  error,
}) {
  const handleDelete = () => {};
  const { id } = match.params;
  const history = useHistory();
  const { t } = useTranslation(['advertpage']);

  const userId = useSelector(getUserId);
  const isFav = dataObj => {
    if (dataObj) {
      if (dataObj[userId]) {
        return dataObj[userId];
      }
    }
    return false;
  };

  const handleChatClick = () => {
    const room = `${id.substr(id.length - 4)}${advert.createdBy.substr(
      advert.createdBy.length - 4,
    )}${userId.substr(userId.length - 4)}`;
    console.log(id, advert.createdBy, userId, 'Room:', room);
    history.push(`/chat?Rid=${room}&uId=${userId}`, { room, email: userId });
  };

  useEffect(() => {
    loadAdvertDetail(id);
  }, []);
  /*
    advert.createdAt        "2021-03-01T22:35:41.762Z"
    advert.createdBy        "603d6a44ff30d20d8034b971"
    advert.description          "222"
    advert.image        "\img\adverts\603d6a44ff30d20d8034b971\1614638141752_f.png"
    advert.isFavBy          {6043daf0d806c7f080306489: true}
    advert.name         "Avocado"
    advert.price        2
    advert.sale         true
    advert.state        "Available"
    advert.tags         ["mobile"]
    advert.updatedAt        "2021-03-07T13:18:30.444Z"
*/

  return (
    <MainLayout title={t('Detalle del Anuncio')}>
      <div className="advertPage">
        {advert ? (
          <div className="advertpage-container">
            <div className="advertpage-advert-header">
              <div className="advertpage-author">{advert.createdBy}</div>

              <div className="advertpage-actions">
                <div className="advertpage-favorite">
                  <FavoriteButton
                    initialValue={isLogged ? isFav(advert.isFavBy) : false}
                    adId={advert._id}
                  />
                </div>
                <button
                  type="button"
                  onClick={handleChatClick}
                  className="advertpage-chatbutton"
                >
                  Chat
                </button>
              </div>
            </div>
            <div className="advertpage-photo-container">
              <img alt="ad_photo" src={`${getApiBaseUrl()}${advert.image}`} />
            </div>
            <div className="advertpage-title-price">
              <div className="advertpage-title">{advert.name}</div>
              <div className={`advertpage-status-${advert.state}`}>&nbsp;</div>
              <div className="advertpage-sell">
                {advert.sale ? 'Se vende' : 'Se busca'}
              </div>
              <div className="advertpage-price">{advert.price} €</div>
            </div>
            <div className="advertpage-tags">
              {advert.tags.length > 0
                ? advert.tags.map(tag => (
                    <span className="advertpage-tag" key={tag}>
                      {tag}
                    </span>
                  ))
                : ''}
            </div>
            <div className="advertpage-description">{advert.description}</div>
            <div className="advertpage-footer">
              <div className="advertpage-created">
                {new Date(advert.createdAt).toLocaleDateString()}
              </div>
            </div>
          </div>
        ) : (
          ''
        )}
      </div>
    </MainLayout>
  );
}

AdvertPage.propTypes = {
  currentUsername: PropTypes.string,
  isLogged: PropTypes.bool,
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }),
  }),
  advert: PropTypes.objectOf(PropTypes.any),
  loadAdvertDetail: PropTypes.func.isRequired,
  error: PropTypes.bool,
};

AdvertPage.defaultProps = {
  currentUsername: '',
  isLogged: false,
  match: [],
  advert: {},
  error: null,
};

export default AdvertPage;
