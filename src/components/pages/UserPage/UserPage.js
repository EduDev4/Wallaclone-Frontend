/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect } from 'react';

import PropTypes from 'prop-types';
import { Link, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import AdvertCard from '../../adverts';

import MainLayout from '../../layout/MainLayout';

import './UserPage.css';
import UserPageAside from './UserPageAside';
import Empty from '../../shared/Empty';
import Spinner from '../../shared/Spinner';

function UserPage({
  currentUsername,
  isLogged,
  loading,
  adverts,
  loadAdverts,
  mode,
}) {
  const { username } = useParams();
  const { t } = useTranslation(['userpage']);

  useEffect(() => {
    loadAdverts(`username=${username}`);
  }, [username]);

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
            {isLogged && currentUsername === username ? (
              <h2>{t('Mis Anuncios')}</h2>
            ) : null}
            <div className="userPage-adswrapper flex-container">
              {loading ? <Spinner /> : renderAdverts()}
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}

UserPage.propTypes = {
  currentUsername: PropTypes.string,
  // currentUserEmail: PropTypes.string,
  isLogged: PropTypes.bool,
  // eslint-disable-next-line react/require-default-props
  // match: PropTypes.shape({
  //   params: PropTypes.shape({
  //     username: PropTypes.string.isRequired,
  //   }),
  // }),
  // match: PropTypes.objectOf(PropTypes.any).isRequired,
  loadAdverts: PropTypes.func.isRequired,
  adverts: PropTypes.arrayOf(PropTypes.object),
  loading: PropTypes.bool.isRequired,
  mode: PropTypes.string,
};

UserPage.defaultProps = {
  currentUsername: '',
  //   currentUserEmail: '',
  isLogged: false,
  adverts: null,
  mode: '',
};

export default UserPage;
