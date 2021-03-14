/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect, useState } from 'react';

import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import AdvertCard from '../../adverts';

import MainLayout from '../../layout/MainLayout';

import '../UserPage/UserPage.css';
import UserPageAside from '../UserPage/UserPageAside';

function UserSoldPage({
  match,
  currentUsername,
  isLogged,
  adverts,
  onLoadSoldAdverts,
}) {
  const handleDelete = () => {};
  const user = match.params.username;
  const { t } = useTranslation(['userpage']);

  useEffect(() => {
    onLoadSoldAdverts();
  }, []);

  const renderAdverts = () => {
    if (!adverts) return null;
    return adverts.map(ad => <AdvertCard key={ad._id} {...ad} />);
  };

  return (
    <MainLayout title="">
      <div className="userPage">
        <div className="grid-container">
          <aside className="userPage-aside">
            <UserPageAside user={user} onDelete={handleDelete} />
          </aside>
          <div className="userPage-content">
            {isLogged && currentUsername === user ? (
              <h2>{t('Mis Anuncios Favoritos')}</h2>
            ) : null}
            <div className="userPage-adswrapper flex-container">
              {!adverts ? <p>no hay anuncios</p> : renderAdverts()}
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}

UserSoldPage.propTypes = {
  // eslint-disable-next-line react/require-default-props

  currentUsername: PropTypes.string,
  // currentUserEmail: PropTypes.string,
  isLogged: PropTypes.bool,
  // eslint-disable-next-line react/require-default-props
  match: PropTypes.shape({
    params: PropTypes.shape({
      username: PropTypes.string.isRequired,
    }),
  }),
  onLoadSoldAdverts: PropTypes.func.isRequired,
  adverts: PropTypes.arrayOf(PropTypes.object),
};

UserSoldPage.defaultProps = {
  currentUsername: '',
  isLogged: false,
  adverts: null,
};

export default UserSoldPage;
