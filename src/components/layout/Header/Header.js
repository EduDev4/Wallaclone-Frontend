import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Button } from 'antd';
import { Link, useHistory } from 'react-router-dom';
import { AuthContext } from '../../App';
import { logout } from '../../../api/auth';

import './Header.css';

function Header({ className }) {
  const { isLogged, onLogout } = useContext(AuthContext);
  const history = useHistory();

  const handleLogout = () => {
    logout();
    history.push('/login');
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
};
Header.defaultProps = {
  className: 'layout-header',
};

export default Header;
