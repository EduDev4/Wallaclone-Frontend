import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import PropTypes from 'prop-types';

import NewAdvertPage from '../NewAdvertPage';

export default function EditAdvertPage() {
  const { id } = useParams();
  const history = useHistory();

  // TODO: pasar advert detail, desde redux, por props cuando esté hecho
  const adDetail = {
    name: 'Nuevo',
    sale: true,
    tags: ['work', 'mobile'],
    price: 13,
    description: 'fdfddfdfdfdfdfdfdfd',
    createdBy: '60354991e7ba670c7aedb708',
    _id: '60375db75538450811b9f11f',
    image: '/img/adverts/60354991e7ba670c7aedb708/1614241207486_galaxytab.jpg',
  };

  useEffect(() => {
    if (!adDetail) history.push('/404');
    if (adDetail._id !== id) history.push('/404');
  }, []);

  const renderContent = () => (
    <NewAdvertPage
      mode="edit"
      initialForm={{
        name: adDetail.name,
        sale: adDetail.sale,
        price: adDetail.price,
        tags: adDetail.tags,
        description: adDetail.description,
        image: adDetail.image,
      }}
    />
  );
  return renderContent();
}
