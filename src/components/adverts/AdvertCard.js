import React from 'react';
import PropTypes from 'prop-types';

import 'antd/dist/antd.css';
import { Card, Tag } from 'antd';
import { CheckCircleOutlined } from '@ant-design/icons';
import FavoriteButton from '../shared/FavoriteButton';
import './AdvertCard.css';

const AdvertCard = ({ id, name, price, sale, tags, fav }) => (
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
      <FavoriteButton initialValue={fav} adId={id} />
    </Card>
  </article>
);

AdvertCard.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  sale: PropTypes.bool.isRequired,
  tags: PropTypes.arrayOf(PropTypes.string),
  fav: PropTypes.bool.isRequired,
};

AdvertCard.defaultProps = {
  tags: [],
};

export default AdvertCard;
