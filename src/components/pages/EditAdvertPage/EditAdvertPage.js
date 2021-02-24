import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import PropTypes from 'prop-types';

import NewAdvertPage from '../NewAdvertPage';
import { getAdvertDetail } from '../../../api/adverts';

export default function EditAdvertPage() {
  const { id } = useParams();
  const [advert, setAdvert] = useState(null);

  useEffect(() => {
    getAdvertDetail(id)
      .then(res => {
        const { adv } = res;
        setAdvert(adv);
        console.log(advert);
      })
      .catch(err => console.log(err));
    // Setear el form

    return () => {
      // eslint-disable-next-line no-console
      // console.log('cleanup');
    };
  }, []);

  const renderContent = () => <NewAdvertPage mode="edit" />;

  return renderContent();
}
