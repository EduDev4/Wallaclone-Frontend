/* eslint-disable react/prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import 'antd/dist/antd.css';
import { Tag } from 'antd';
import { CheckCircleOutlined } from '@ant-design/icons';
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
}) => {
  const serverUrl = process.env.REACT_APP_API_BASE_URL;
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
            <img
              src="data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAABmJLR0QA/wD/AP+gvaeTAAADxElEQVRIie3WbWwTdRwH8O9db3fXrjgStolukjFGdEAaIcQu20JWF9swppgs1BcqAd+RaKJZYC+UMHUaxLCgGMQYHxKMBBvQKMsepSSyOTdhbLqto7UjeyK2ZZP2rr27Xu/vG9csa0fbyXxh+CaXNP/79ve5h1zugPv5j0IlW+y2mvJZlq8Hy+3RpEgBRdEqzXEzmqyciUYjpys6hnyL+wzLH9BlcS9qivwQIRqj4/VTJCo7FFlqXtxPCvfZttnBMp/nWWqY3KqnOMO6YhBVRWR6Ev6uFilw5UcFqvLCE63XfgCAXtv23TTHnMmtrM7Kq97F6wseAcUwCE944Xe2ywFnm0rU2H5z21XHknCfbZudzjZ+Ufpms8FQtCHpJRI9LriaGkQ1GLRTFKF1xpxzjx0+ZsgueTRpPzzuwWhjfTgWFvctxONwt9WUn8Xx3s3vnspeCp2P4B7B6JH6EACUvtW8ylhSete+6HVj5PWXRSkWXb+jdcAPAPT8Tpbl6/MsNUwqFACMGzdhbW0dv7a2jk+FAkB28UbkVtkYXse8Nr8Wh8Gwe3ItVi7llH9SULc3q6Bub1a6/TzLTo5mOXucm/9BFOlhfWFRunNAc2zaXQDQryuCJkmF8f/HYZrWoGkZDcssBAQUSYB1LP9bcPj6irGRyZvQcfx0AqyGhZPT574UVgq+fcWpaKrybQI8sWrDWenW1Ozcrz33HFWFIHydFwmRI6cSYLvDEYvJkX3ej96LqKHgPYVnzn+tUBR9wdwxNJ4AA0BZ+6CTKNHTng+aBBCSOGEZCbl+x59t30mKJLy6cJ1eXBznCw8KN1yjU2c/U/8tqoohuN8/IhBJsi9+USTAdocjpoh3am9dPD8buNyx7OdLUxSMvX1I0GTpQ3PXYPvi/QkwAFR0DPk0Saq8+emJ4O0eZ+Yq0eA+3ihGJicubd/aczhZJSkMAGWd193RsLDDe/KoGPipK+0bTjQNnhPvhEPDg1f9UZ+dakTSq5b0Q2BhfraazDpW31n8SoNxTbnlrn1NUXDj2BthYWy43y/7bDWtHnmpbkoYAPqtpi2EN1wuPnBw9ZrKJ3XJOmrwDlxNh0RperLVwAWf3+wYVtKZnTK/WE3r+3aXT8189XGUhObIwi08MkCuPVct9j9TdpykeTIZpbd6y4P9z1a4/zjaIGl/BQgJzRF/yzda39PmcO/OrS9lMivjoxuoenx1NEffYizZZOLy8pnZ7ktz0Yi0q7xrcGBFYQBwVlUxxgfkT0DTObIW2F/5/VhoOXPu5/+dvwE+WqsjEGLHCwAAAABJRU5ErkJggg=="
              alt="fav"
            />
            <img
              src="data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAABmJLR0QA/wD/AP+gvaeTAAADuElEQVRIie2U309bVQDHv+f+aHtLW7bJUirSQQUydK8z6zQLJk7F8WMSHxYTwpY9jNjNdYBbspEZhYgSCbq1MhIVdQ/KYP8BGy/ORI3GxIFzzhaGKYyU0tabcm/vj+ODa2XjritLfeObnId7zvd+P+d7cu4FNrShDRVIBABUVZdkWY5puj5jNvG/cRx/k1KEWBYhACFCyPJ6QimlAgCXqsLDMPAoilKTSqV2MAzrKSqyOnmeLSYAoGmUth46CFepC4+7XHCXl6e2bXOnXaVlZOvWxwSe502ZUEVRpHRa/slut50GsCMeT75vEQS7ieexyqMuLS2lIvMROjt72zQ7NydEIhHML8zj4sgXYFlCuIw5HJ5BODyTebTeHWtks9ks3l3e3R1+/0RalvhzgSC+//EHiKK42sYBcOQ6FS7XopFEUYRVEMjinTv88c4OxOPx9UY8Grhx3z7sb2rC8Y4TiCcSjwRdN7i5sQmvNjfD39lxD3S314s32tvxRFkZOI7Dc3V1hQO/+MJeQ2hbaytea2kBw7AYGx9D8MJwXnl5g1+pfxnBoaEsdFNxMY75fKitrcURnw+apuFCIABJTuOzkZHCgccuX0b3mdNYXFyErumorKzAt99dQ7vPh2QyCQBoP3oUQ4EAVE3Fl19dzJmX/Y7vX4gnEqmDhw9bo9Fodo7neVRXVUEQBITDYcSW1/5XXKWlGAoEMDo2jq9Hv4HT6cRwMLhSUlIiZDwsSwgx2g2ldLMopn7hON595eoV9PX3Q9f1/I7mLvyTQACjly7h9QMHUg6HY9Bk4j7PtiUkxBi9mE6r/quTk86G/c2oqa6h3l3evKEAML+wgO63z+JQWxscDseA2cx3E0JCmQEAhmAAlDCEyrKMGzd/p73vvoNTb3WBYR5k/09Pejxwu8uhaRp0SmNmM3/WyGeYZDJxH9Xt2fPz5MSEPjU9zdQ3NGB7zXb6zM6dDwVv2bwFwY/PY+CD/hXBIhx5kM8QTAiJOxz2Z3VN63n6qVpJURT88ect9PX24lSXcfNM09t/zYEwjGS3Fw2azdz4usAZrW5+fWqK1Dc2orqqGkbN/216Dp8OD68UWYWTPM+fyZWdE2zUPBQO4b2enmzze5uyUrHDNmixmM7nys1blNJNyeTf1xRV1/r6P6TP732J/np9mp7oOknf9HfSaDRGo0vLKUlKH8s38+HXFGubsywLi8VCKysqoKgKOI6T7DbbQMGa3q9Mc0lKS6KYmkwmxRux5cQtWVZb/hfghgqhfwCYGJQjvRJ0IgAAAABJRU5ErkJggg=="
              alt="fav"
            />
          </div>
          <div className="advert-price">Precio: {price} €</div>
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

AdvertCard.protoTypes = {
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  sale: PropTypes.bool.isRequired,
  tags: PropTypes.arrayOf(PropTypes.string),
};

export default AdvertCard;
