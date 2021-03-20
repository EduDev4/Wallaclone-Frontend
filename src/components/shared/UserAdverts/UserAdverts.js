/* eslint-disable react/jsx-props-no-spreading */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useParams, Redirect, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import AdvertCard from '../../adverts';
import MainLayout from '../../layout/MainLayout';
import Spinner from '../Spinner';
import Empty from '../Empty';

import '../../pages/UserPage/UserPage.css';
import UserPageAside from '../../pages/UserPage/UserPageAside';

function UserAdverts({
  mode,
  loading,
  currentUsername,
  adverts,
  onLoadFavAdverts,
  favsAdverts,
  onLoadReservedAdverts,
  onLoadSoldAdverts,
  loadAdverts,
}) {
  const { username } = useParams();
  const { pathname } = useLocation();
  const { t } = useTranslation(['userpage']);
  const [sectionTitle, setSectionTitle] = useState('');

  useEffect(() => {
    if (mode === 'userAdverts') {
      if (currentUsername === username) setSectionTitle(t('Mis Anuncios'));

      loadAdverts(`username=${username}`);
    }
    if (mode === 'reserved') {
      setSectionTitle(t('Mis Anuncios Reservados'));
      onLoadReservedAdverts();
    }
    if (mode === 'sold') {
      setSectionTitle(t('Mis Anuncios Vendidos'));
      onLoadSoldAdverts();
    }
  }, [pathname, username]);

  useEffect(() => {
    if (mode === 'favs') {
      setSectionTitle(t('Mis Anuncios Favoritos'));
      onLoadFavAdverts();
    }
  }, [favsAdverts, pathname]);

  const renderAdverts = () => {
    if (adverts.length < 1) return <Empty />;
    return adverts.map(ad => <AdvertCard key={ad._id} {...ad} />);
  };

  return (
    <MainLayout title="">
      <div className="userPage">
        <div className="grid-container">
          <aside className="userPage-aside">
            <UserPageAside user={username} />
          </aside>
          <div className="userPage-content">
            {mode === 'userAdverts' || currentUsername === username ? (
              <>
                <h2>{sectionTitle}</h2>
                <div className="userPage-adswrapper flex-container">
                  {loading ? <Spinner /> : renderAdverts()}
                </div>
              </>
            ) : (
              <Redirect to={`/user/${username}`} />
            )}
          </div>
        </div>
      </div>
    </MainLayout>
  );
}

UserAdverts.propTypes = {
  mode: PropTypes.string.isRequired,
  currentUsername: PropTypes.string,
  onLoadFavAdverts: PropTypes.func.isRequired,
  adverts: PropTypes.arrayOf(PropTypes.object),
  favsAdverts: PropTypes.objectOf(PropTypes.any),
  loading: PropTypes.bool.isRequired,
  onLoadReservedAdverts: PropTypes.func.isRequired,
  onLoadSoldAdverts: PropTypes.func.isRequired,
  loadAdverts: PropTypes.func.isRequired,
};

UserAdverts.defaultProps = {
  currentUsername: '',
  adverts: null,
  favsAdverts: {},
};

export default UserAdverts;
