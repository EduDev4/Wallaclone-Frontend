import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import 'antd/dist/antd.css';
import { Tag } from 'antd';
import { CheckCircleOutlined } from '@ant-design/icons';

import FavoriteButton from '../shared/FavoriteButton';
import { getIsLoggedUser, getUserId } from '../../store/selectors';
import './AdvertCard.css';
import { getUsername } from '../../api/users';

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
  const isFav = dataObj => {
    if (dataObj) {
      if (dataObj[userId]) {
        return dataObj[userId];
      }
    }
    return false;
  };
  const createdAtText = new Date(createdAt).toLocaleDateString();
  const serverUrl = process.env.REACT_APP_API_BASE_URL_LOCAL;

  const [userFromId, setuserFromId] = useState('');

  useEffect(() => {
    getUsername(createdBy).then(username => setuserFromId(username));
  }, []);

  return (
    <>
      <Link className="card-link" to={`/adverts/view/${_id}`}>
        <article className="advert-tile hover-tile flex-item">
          {userFromId ? (
            <div className="advert-author">
              <Link
                className="nav-button author-name"
                to={`/user/${userFromId}`}
              >
                {userFromId}
              </Link>
            </div>
          ) : (
            ''
          )}
          <div className="advert-tile-top">
            <img
              src={`${serverUrl}${image}`}
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
              {state === 'Reserved' && (
                <img
                  src={`${process.env.REACT_APP_PUBLIC_URL}/icons/reserved-30.png`}
                  alt="Reserved"
                />
              )}
            </div>
            <div className="advert-price">{price} €</div>
            <div className="advert-tile-title">
              <span>{name}</span>
            </div>
            <div className="tags">
              {tags.map(tag => (
                <span className="tag" key={tag}>
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
  createdBy: PropTypes.string.isRequired,
};

AdvertCard.defaultProps = {
  tags: [],
  isFavBy: {},
};

export default AdvertCard;
