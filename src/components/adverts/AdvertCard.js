import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import 'antd/dist/antd.css';
import { Tag } from 'antd';
import { CheckCircleOutlined } from '@ant-design/icons';

import FavoriteButton from '../shared/FavoriteButton';
import { getIsLoggedUser, getUserId } from '../../store/selectors';
import './AdvertCard.css';

const AdvertCard = ({
  _id,
  name,
  price,
  sale,
  description,
  tags,
  createdAt,
  image,
  isFavBy,
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
  const serverUrl = process.env.REACT_APP_API_BASE_URL_LOCAL;
  return (
    <>
      <article className="advert-tile hover-tile col-4">
        <div className="advert-author">
          <Link className="nav-button" to="/adverts/new">
            Autor
          </Link>
        </div>
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
          </div>
          <div className="advert-price">{price} €</div>
          <div className="advert-tile-title">
            <p>{name}</p>
          </div>
          <div className="advert-desc">
            <p>{description}</p>
          </div>

          <div className={sale ? 'advert-sell' : 'advert-buy'}>
            {sale ? 'Se vende' : 'Se busca'}
          </div>
          <div className="advert-created">{createdAt}</div>
        </div>
      </article>
    </>
  );
};

AdvertCard.propTypes = {
  _id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  sale: PropTypes.bool.isRequired,
  tags: PropTypes.arrayOf(PropTypes.string),
  isFavBy: PropTypes.objectOf(PropTypes.any),
  description: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
};

AdvertCard.defaultProps = {
  tags: [],
  isFavBy: {},
};

export default AdvertCard;
