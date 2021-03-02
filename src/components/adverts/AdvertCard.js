/* eslint-disable react/prop-types */
import React from 'react';
import PropTypes from 'prop-types';

import 'antd/dist/antd.css';
import { Card, Tag } from 'antd';
import { CheckCircleOutlined } from '@ant-design/icons';
import './AdvertCard.css';

const AdvertCard = ({ _id, name, price, sale, tags }) => (
  <>
    <article className="advert-card col-sm-4">
      <p>Precio: {price} €</p>
      <p>{sale ? 'Se vende' : 'Se busca'}</p>
      <div className="advert-tags">
        {tags.map(tag => (
          <Tag icon={<CheckCircleOutlined />} color="success" key={tag}>
            {tag}
          </Tag>
        ))}
      </div>
    </article>
  </>
);

AdvertCard.protoTypes = {
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  sale: PropTypes.bool.isRequired,
  tags: PropTypes.arrayOf(PropTypes.string),
};

export default AdvertCard;
