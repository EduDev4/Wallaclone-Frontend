import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Button } from 'antd';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getIsLoggedUser, getUsername } from '../../../store/selectors';
import { logout } from '../../../store/actions';
import ConfirmButton from '../../shared/ConfirmButton';

import './Header.css';

function Header({ className, isLogged, onLogout, currentUser, ...props }) {
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
        {isLogged ? (
          <>
            <Link className="nav-button" to="/user/adverts">
              <Button type="primary">Mis Anuncios</Button>
            </Link>
            <Link className="nav-button" to={`/user/${currentUser}`}>
              <Button type="primary">Mi Perfil</Button>
            </Link>

            <ConfirmButton
              acceptAction={handleLogout}
              confirmProps={{
                title: 'Logout',
                message: 'Are you sure you want to logout?',
              }}
              typeButton="dashed"
            >
              Logout
            </ConfirmButton>
          </>
        ) : (
          <>
            <Link className="nav-button" to="/">
              <Button type="primary">Anuncios</Button>
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
