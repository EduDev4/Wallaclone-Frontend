import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Button } from 'antd';
import { Link } from 'react-router-dom';

const Header = ({ className }) => (
  <header className={classNames('header', className)}>
    <Link to="/">
      <div className="header-logo">
        <h1>Wallaclone</h1>
      </div>
    </Link>

    <nav className="header-nav">
      <Link to="/user/adverts">
        <Button type="primary">Mis Anuncios</Button>
      </Link>
      <Link to="/user/data">
        <Button type="primary">Mis Datos</Button>
      </Link>
      <Link to="/login">
        <Button type="primary">Login</Button>
      </Link>
      <Link to="/logout">
        <Button type="dashed">Logout</Button>
      </Link>
    </nav>
  </header>
);

Header.propTypes = {
  className: PropTypes.string,
};
Header.defaultProps = {
  className: 'layout-header',
};

export default Header;
