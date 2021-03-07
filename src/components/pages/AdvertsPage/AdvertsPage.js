/* eslint-disable react/jsx-props-no-spreading */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

import { Slider, Input, Button } from 'antd';

import MainLayout from '../../layout/MainLayout';
import AdvertCard from '../../adverts';
import Spinner from '../../shared/Spinner';
import SelectTags from '../../shared/SelectTags';
import './AdvertsPage.css';

const AdvertsPage = ({ adverts, loading, loadAdverts }) => {
  const { t } = useTranslation(['advertspage']);
  const [filter] = useState();

  useEffect(() => {
    loadAdverts(filter);
    return () => {
      // eslint-disable-next-line no-console
      // console.log('cleanup');
    };
  }, []);

  const renderContent = () => {
    if (!adverts) return null;
    return adverts.map(ad => <AdvertCard key={ad._id} {...ad} />);
  };

  return (
    <MainLayout title="Adverts">
      <div className="advertsPage">
        <div className="grid-container">
          <aside className="advertsPage-aside">
            <form className="filter-form">
              <div className="form-title">
                <h3>Busca por:</h3>
              </div>
              <div className="form-field">
                <Input placeholder="Nombre" />
              </div>
              <div className="form-field">
                <span className="form-field--label">Precio: </span>
                <Slider range min={0} max={20000} />
              </div>

              <div className="form-field">
                <SelectTags
                  placeholder={t('Selecciona tags')}
                  onChange={() => console.log()}
                />
              </div>
              <div className="form-field centered">
                <Button type="primary">Filter</Button>
              </div>
            </form>
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
  loadAdverts: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
};

AdvertsPage.defaultProps = {
  adverts: null,
};

export default AdvertsPage;
