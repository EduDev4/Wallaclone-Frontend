import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Button } from 'antd';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { getIsLoggedUser, getUsername } from '../../../store/selectors';
import { logout } from '../../../store/actions';
import ConfirmButton from '../../shared/ConfirmButton';

import './Header.css';

function Header({ className, isLogged, onLogout, currentUser, ...props }) {
  const { t, i18n } = useTranslation(['header']);
  const handleLogout = () => {
    onLogout();
  };
  return (
    <header className={classNames('header', className)}>
      <Link to="/">
        <div className="header-logo">
          <h1>Wallaclone</h1>
        </div>
      </Link>

      <nav className="header-nav">
        <Button
          className="nav-button"
          type="link"
          onClick={() => {
            if (i18n.language === 'es') i18n.changeLanguage('en');
            else if (i18n.language === 'en') i18n.changeLanguage('es');
          }}
        >
          ES/EN
        </Button>
        {isLogged ? (
          <>
            <Link className="nav-button" to="/user/adverts">
              <Button type="primary">{t('Mis Anuncios')}</Button>
            </Link>
            <Link className="nav-button" to={`/user/${currentUser}`}>
              <Button type="primary">{t('Mi Perfil')}</Button>
            </Link>
            <Link className="nav-button" to="/adverts/new">
              <Button type="primary">{t('Nuevo Anuncio')}</Button>
            </Link>

            <ConfirmButton
              acceptAction={handleLogout}
              confirmProps={{
                title: 'Logout',
                message: 'Are you sure you want to logout?',
              }}
              typeButton="dashed"
              danger
            >
              Logout
            </ConfirmButton>
          </>
        ) : (
          <>
            <Link className="nav-button" to="/">
              <Button type="primary">{t('Anuncios')}</Button>
            </Link>

            <Link className="nav-button" to="/login">
              <Button type="primary">Login</Button>
            </Link>
          </>
        )}
      </nav>
    </header>
  );
}

Header.propTypes = {
  className: PropTypes.string,
  isLogged: PropTypes.bool,
  onLogout: PropTypes.func,
  currentUser: PropTypes.string,
};
Header.defaultProps = {
  className: 'layout-header',
  isLogged: false,
  onLogout: PropTypes.func,
  currentUser: '',
};

const mapStateToProps = state => ({
  isLogged: getIsLoggedUser(state),
  currentUser: getUsername(state),
});

const mapDispatchToProps = {
  onLogout: logout,
};

const ConnectedHeader = connect(mapStateToProps, mapDispatchToProps)(Header);

export default ConnectedHeader;
