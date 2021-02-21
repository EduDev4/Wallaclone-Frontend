import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Button } from 'antd';
import { Link, useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { getIsLoggedUser } from '../../../store/selectors';
import { logout } from '../../../store/actions';

import './Header.css';

function Header({ className, isLogged, onLogout, ...props }) {
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
        <Link className="nav-button" to="/user/adverts">
          <Button type="primary">Mis Anuncios</Button>
        </Link>
        <Link className="nav-button" to="/user/data">
          <Button type="primary">Mis Datos</Button>
        </Link>
        {isLogged ? (
          <Button type="dashed" onClick={handleLogout}>
            Logout
          </Button>
        ) : (
          <Link className="nav-button" to="/login">
            <Button type="primary">Login</Button>
          </Link>
        )}
      </nav>
    </header>
  );
}

Header.propTypes = {
  className: PropTypes.string,
  isLogged: PropTypes.bool,
  onLogout: PropTypes.func,
};
Header.defaultProps = {
  className: 'layout-header',
  isLogged: false,
  onLogout: PropTypes.func,
};

const mapStateToProps = state => ({
  isLogged: getIsLoggedUser(state),
});

const mapDispatchToProps = {
  onLogout: logout,
};

const ConnectedHeader = connect(mapStateToProps, mapDispatchToProps)(Header);

export default ConnectedHeader;
