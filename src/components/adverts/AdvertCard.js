import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';

import 'antd/dist/antd.css';

import FavoriteButton from '../shared/FavoriteButton';

import { getIsLoggedUser, getUserId } from '../../store/selectors';
import './AdvertCard.css';
import { getApiBaseUrl, getPublicUrl } from '../../config/envConfig';

const AdvertCard = ({
  _id,
  name,
  price,
  sale,
  description,
  state,
  tags,
  createdAt,
  image,
  isFavBy,
  createdBy,
}) => {
  const isLogged = useSelector(getIsLoggedUser);
  const userId = useSelector(getUserId);
  const history = useHistory();
  const isFav = dataObj => {
    if (dataObj) {
      if (dataObj[userId]) {
        return dataObj[userId];
      }
    }
    return false;
  };

  const renderIcons = () => {
    if (state === 'Reserved') {
      return (
        <img src={`${getPublicUrl()}/icons/reserved-30.png`} alt="Reserved" />
      );
    }
    if (state === 'Sold') {
      return (
        <img
          src={`${getPublicUrl()}/icons/sold-filled-advert-50.png`}
          alt="Sold"
        />
      );
    }
    return null;
  };

  const createdAtText = new Date(createdAt).toLocaleDateString();

  const { username } = createdBy;

  return (
    <>
      <Link className="card-link" to={`/adverts/view/${_id}`}>
        <article className="advert-tile hover-tile flex-item">
          {username ? (
            <div className="advert-author">
              <button
                type="button"
                className="nav-button author-name"
                onClick={ev => {
                  ev.preventDefault();
                  history.push(`/user/${username}`);
                }}
              >
                {username}
              </button>
            </div>
          ) : (
            ''
          )}
          <div className="advert-tile-top">
            <img
              src={`${getApiBaseUrl()}${image}`}
              alt={name}
              className="advert-photo"
            />
          </div>

          <div itemProp="name" className="advert-tile-bottom">
            <div className="icons">
              <FavoriteButton
                initialValue={isLogged ? isFav(isFavBy) : false}
                adId={_id}
              />
              {isLogged && renderIcons()}
            </div>
            <div className="advert-price">{price} €</div>
            <div className="advert-tile-title">
              <span>{name}</span>
            </div>
            <div className="tags">
              {tags.map(tag => (
                <span className="tag" key={`${tag}${Date.now()}`}>
                  {tag}
                </span>
              ))}
            </div>
            <div className="advert-desc">
              <span>{description}</span>
            </div>

            <div
              title={sale ? 'Se vende' : 'Se busca'}
              className={sale ? 'advert-sell' : 'advert-buy'}
            >
              {sale ? 'Se vende' : 'Se busca'}
            </div>
            <div className="advert-created">{createdAtText}</div>
          </div>
        </article>
      </Link>
    </>
  );
};

AdvertCard.propTypes = {
  _id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  state: PropTypes.string.isRequired,
  sale: PropTypes.bool.isRequired,
  tags: PropTypes.arrayOf(PropTypes.string),
  isFavBy: PropTypes.objectOf(PropTypes.any),
  description: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  createdBy: PropTypes.objectOf(PropTypes.any),
};

AdvertCard.defaultProps = {
  tags: [],
  isFavBy: {},
  createdBy: {},
};

export default AdvertCard;
