import React, { useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import PropTypes from 'prop-types';

import NewAdvertPage from '../NewAdvertPage';

export default function EditAdvertPage({ advert, loadAdvertDetail }) {
  const { id } = useParams();
  const history = useHistory();
  console.log(advert);
  useEffect(() => {
    if (!advert) {
      loadAdvertDetail(id);
    }
    // if (advert._id !== id) history.push('/404');
  }, []);

  const renderContent = () =>
    advert && (
      <NewAdvertPage
        mode="edit"
        initialForm={{
          name: advert.name,
          sale: advert.sale,
          price: advert.price,
          tags: advert.tags,
          description: advert.description,
          image: advert.image,
        }}
      />
    );
  return renderContent();
}
EditAdvertPage.propTypes = {
  advert: PropTypes.objectOf(PropTypes.any),
};

EditAdvertPage.defaultProps = {
  advert: null,
};
