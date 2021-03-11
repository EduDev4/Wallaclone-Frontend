/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';

import MainLayout from '../../layout/MainLayout';
import AdvertCard from '../../adverts';
import Spinner from '../../shared/Spinner';
import './AdvertsPage.css';

import FiltersForm from '../../shared/FiltersForm';

const AdvertsPage = ({ adverts, loading, loadAdverts, location }) => {
  const { t } = useTranslation(['advertspage']);

  const querySearch = location.search.substring(1);

  const handleSubmit = async params => {
    await loadAdverts(params);
  };

  useEffect(() => {
    loadAdverts(querySearch);
  }, [querySearch]);

  const renderContent = () => {
    if (!adverts) return null;
    return adverts.map(ad => <AdvertCard key={ad._id} {...ad} />);
  };

  return (
    <MainLayout title="Anuncios">
      <div className="advertsPage">
        <div className="grid-container">
          <aside className="advertsPage-aside">
            <FiltersForm onSubmit={handleSubmit} />
          </aside>
          <div className="advertsPage-content">
            <h2>¿Qué estás buscando?</h2>
            <div className="advertsPage-adswrapper flex-container">
              {loading ? <Spinner /> : renderContent()}
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};
AdvertsPage.propTypes = {
  adverts: PropTypes.arrayOf(PropTypes.object),
  initialForm: PropTypes.objectOf(PropTypes.any),
  loadAdverts: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  location: PropTypes.shape({
    search: PropTypes.string,
  }),
};

AdvertsPage.defaultProps = {
  adverts: null,
  initialForm: {
    name: '',
    sale: '',
    tags: [],
    price: 0,
    sort: false,
  },
  location: PropTypes.shape({
    search: '',
  }),
};

export default AdvertsPage;
