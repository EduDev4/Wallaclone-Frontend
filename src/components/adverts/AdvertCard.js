import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

import 'antd/dist/antd.css';
import { Card, Tag } from 'antd';
import { CheckCircleOutlined } from '@ant-design/icons';

import FavoriteButton from '../shared/FavoriteButton';
import { getIsLoggedUser, getUserId } from '../../store/selectors';
import './AdvertCard.css';

const AdvertCard = ({ id, name, price, sale, tags, isFavBy }) => {
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

  return (
    <article className="advert-card">
      <Card title={name} hoverable="true" style={{ width: 270 }}>
        <p>Precio: {price} €</p>
        <p>{sale ? 'Se vende' : 'Se busca'}</p>
        <div className="advert-tags">
          {tags.map(tag => (
            <Tag icon={<CheckCircleOutlined />} color="success" key={tag}>
              {tag}
            </Tag>
          ))}
        </div>
        <FavoriteButton
          initialValue={isLogged ? isFav(isFavBy) : false}
          adId={id}
        />
      </Card>
    </article>
  );
};

AdvertCard.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  sale: PropTypes.bool.isRequired,
  tags: PropTypes.arrayOf(PropTypes.string),
  isFavBy: PropTypes.objectOf(PropTypes.any),
};

AdvertCard.defaultProps = {
  tags: [],
  isFavBy: {},
};

export default AdvertCard;
