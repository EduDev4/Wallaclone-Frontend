/* eslint-disable react/self-closing-comp */
/* eslint-disable react/style-prop-object */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Button } from 'antd';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { getIsLoggedUser, getUsername } from '../../../store/selectors';
import { logout } from '../../../store/actions';

import './UserTools.css';

function UserTools({ className, currentUser, ...props }) {
  const [isDesktop, setDesktop] = useState(window.innerWidth > 1200);

  const updateMedia = () => {
    setDesktop(window.innerWidth > 1200);
  };

  useEffect(() => {
    window.addEventListener('resize', updateMedia);
    return () => window.removeEventListener('resize', updateMedia);
  });

  const { t, i18n } = useTranslation(['header']);

  return (
    // TODO COMPONENTE CON LOS ENLACES DE NOTIFICACIONES QUE SE LLAMARÁ DESDE HEADER Y FOOTER
    <>
      <div className="usertools">
        <Link className="nav-button" to={`/user/${currentUser}`}>
          <Button type="primary">{t('Mis Anuncios')}</Button>
        </Link>
        <Link className="nav-button" to={`/user/${currentUser}`}>
          <Button type="primary">{t('Mi Perfil')}</Button>
        </Link>
        <Link className="nav-button" to="/adverts/new">
          <Button type="primary">{t('Nuevo Anuncio')}</Button>
        </Link>
      </div>
    </>
  );
}

UserTools.propTypes = {
  className: PropTypes.string,
  currentUser: PropTypes.string,
};
UserTools.defaultProps = {
  className: 'layout-header',
  currentUser: '',
};

const mapStateToProps = state => ({
  isLogged: getIsLoggedUser(state),
  currentUser: getUsername(state),
});

const mapDispatchToProps = {
  onLogout: logout,
};

const ConnectedUserTools = connect(
  mapStateToProps,
  mapDispatchToProps,
)(UserTools);

export default ConnectedUserTools;
