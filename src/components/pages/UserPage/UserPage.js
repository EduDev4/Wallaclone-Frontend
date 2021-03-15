/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect } from 'react';

import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import AdvertCard from '../../adverts';

import MainLayout from '../../layout/MainLayout';

import './UserPage.css';
import UserPageAside from './UserPageAside';

function UserPage({
  match,
  currentUsername,
  isLogged,
  adverts,
  loadAdverts,
  mode,
}) {
  const user = match.params.username;
  const { t } = useTranslation(['userpage']);

  useEffect(() => {
    loadAdverts(`username=${user}`);
  }, [user]);

  const renderAdverts = () => {
    if (!adverts) return null;
    return adverts.map(ad => <AdvertCard key={ad._id} {...ad} />);
  };

  return (
    <MainLayout title="">
      <div className="userPage">
        <div className="grid-container">
          <aside className="userPage-aside">
            <UserPageAside user={user} />
          </aside>
          <div className="userPage-content">
            {isLogged && currentUsername === user ? (
              <h2>{mode === 'chats' ? t('Mis Chats') : t('Mis Anuncios')}</h2>
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

UserPage.propTypes = {
  // eslint-disable-next-line react/require-default-props
  // loading: PropTypes.bool,
  // error: PropTypes.bool,
  currentUsername: PropTypes.string,
  // currentUserEmail: PropTypes.string,
  isLogged: PropTypes.bool,
  // eslint-disable-next-line react/require-default-props
  match: PropTypes.shape({
    params: PropTypes.shape({
      username: PropTypes.string.isRequired,
    }),
  }),
  loadAdverts: PropTypes.func.isRequired,
  adverts: PropTypes.arrayOf(PropTypes.object),
  mode: PropTypes.string,
};

UserPage.defaultProps = {
  //   loading: false,
  //   error: null,
  currentUsername: '',
  //   currentUserEmail: '',
  isLogged: false,
  adverts: null,
  mode: '',
};

export default UserPage;
