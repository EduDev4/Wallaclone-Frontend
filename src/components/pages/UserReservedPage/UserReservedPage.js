/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect } from 'react';

import PropTypes from 'prop-types';
import { useParams, Redirect } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import AdvertCard from '../../adverts';

import MainLayout from '../../layout/MainLayout';

import '../UserPage/UserPage.css';
import UserPageAside from '../UserPage/UserPageAside';

function UserReservedPage({
  currentUsername,
  isLogged,
  adverts,
  onLoadReservedAdverts,
}) {
  const { username } = useParams();
  const { t } = useTranslation(['userpage']);

  useEffect(() => {
    onLoadReservedAdverts();
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
            <UserPageAside user={username} />
          </aside>
          <div className="userPage-content">
            {currentUsername === username ? (
              <>
                <h2>{t('Mis Anuncios Reservados')}</h2>
                <div className="userPage-adswrapper flex-container">
                  {!adverts ? <p>no hay anuncios</p> : renderAdverts()}
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

UserReservedPage.propTypes = {
  // eslint-disable-next-line react/require-default-props

  currentUsername: PropTypes.string,
  // currentUserEmail: PropTypes.string,
  isLogged: PropTypes.bool,
  // eslint-disable-next-line react/require-default-props
  // match: PropTypes.shape({
  //   params: PropTypes.shape({
  //     username: PropTypes.string.isRequired,
  //   }),
  // }),
  onLoadReservedAdverts: PropTypes.func.isRequired,
  adverts: PropTypes.arrayOf(PropTypes.object),
};

UserReservedPage.defaultProps = {
  currentUsername: '',
  isLogged: false,
  adverts: null,
};

export default UserReservedPage;
