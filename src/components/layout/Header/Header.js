import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Button } from 'antd';
import { Link, useHistory } from 'react-router-dom';
import { useSelector, useDispatch, connect } from 'react-redux';
import { getIsLoggedUser } from '../../../store/selectors';
import { authLogout } from '../../../store/actions';

import { logout } from '../../../api/auth';

import './Header.css';

function Header({ className, isLogged, authLogoutD, ...props }) {
  // const isLogged = useSelector(getIsLoggedUser);
  // const dispatch = useDispatch();
  const history = useHistory();

  // const onLogout = () => dispatch(authLogout());

  const handleLogout = () => {
    logout();
    history.push('/login');
    authLogoutD();
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
  authLogoutD: PropTypes.func,
};
Header.defaultProps = {
  className: 'layout-header',
  isLogged: false,
  authLogoutD: PropTypes.func,
};

const mapStateToProps = state => ({
  isLogged: getIsLoggedUser(state),
});

const mapDispatchToProps = {
  authLogoutD: authLogout,
};

const ConnectedHeader = connect(mapStateToProps, mapDispatchToProps)(Header);

export default ConnectedHeader;
