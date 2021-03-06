/* eslint-disable react/self-closing-comp */
/* eslint-disable react/style-prop-object */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Button, Menu, Dropdown } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { Link, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import ConfirmButton from '../../shared/ConfirmButton';
import LangButton from '../../shared/LangButton';
import UserTools from '../../auth/UserTools';

import './Header.css';

function Header({
  className,
  isLogged,
  onLogout,
  currentUser,
  loadAdverts,
  ...props
}) {
  const [isMobile, setMobile] = useState(window.innerWidth < 768);
  const [isSmall, setSmall] = useState(window.innerWidth > 450);

  const updateMedia = () => {
    setMobile(window.innerWidth < 768);
    setSmall(window.innerWidth > 450);
  };

  useEffect(() => {
    window.addEventListener('resize', updateMedia);
    return () => window.removeEventListener('resize', updateMedia);
  });

  const [search, setSearch] = useState('');
  const { username } = useParams();

  const handleSubmitSearch = event => {
    event.preventDefault();
    if (username) {
      if (search) {
        loadAdverts(`username=${username}&name=${search}`);
      } else {
        loadAdverts(`username=${username}`);
      }
    } else if (search) {
      loadAdverts(`name=${search}`);
    } else {
      loadAdverts();
    }
  };

  const { t, i18n } = useTranslation(['header']);

  const menuLogin = (
    <Menu
      style={{ textAlign: 'center', backgroundColor: 'var(--bg-solid-color)' }}
    >
      <Menu.Item>
        <Link to={`/user/${currentUser}`}>{t('Mis datos')}</Link>
      </Menu.Item>
      <Menu.Item>
        <ConfirmButton
          acceptAction={() => onLogout()}
          confirmProps={{
            title: 'Logout',
            message: 'Are you sure you want to logout?',
          }}
          typeButton="text"
        >
          {t('Cerrar sesión')}
        </ConfirmButton>
      </Menu.Item>
    </Menu>
  );

  return (
    <header className={classNames('header', className)}>
      <div className="header-wrapper">
        <Link to="/" className="header-logo">
          {isSmall ? (
            <h1 className="walla-logo">Wallaclone</h1>
          ) : (
            <h1 className="walla-logo">W</h1>
          )}
        </Link>
        <form onSubmit={handleSubmitSearch}>
          <input
            type="text"
            placeholder={t('Buscar...')}
            name="search"
            value={search}
            onChange={ev => setSearch(ev.target.value)}
            className="header-search-input"
          />
        </form>

        <LangButton initialLang={i18n.language} />

        {isLogged ? (
          <>
            {isMobile ? null : <UserTools />}
            <Dropdown
              overlay={menuLogin}
              placement="bottomRight"
              arrow
              trigger={['click', 'hover']}
            >
              <img
                src={`${process.env.REACT_APP_PUBLIC_URL}/icons/profile-menu-30.png`}
                alt="fav"
                className="login-image"
              />
            </Dropdown>
          </>
        ) : (
          <>
            <Link className="nav-button" to="/login">
              <Button type="default" shape="circle" icon={<UserOutlined />} />
            </Link>
          </>
        )}
      </div>
    </header>
  );
}

Header.propTypes = {
  className: PropTypes.string,
  isLogged: PropTypes.bool,
  onLogout: PropTypes.func,
  currentUser: PropTypes.string,
  loadAdverts: PropTypes.func.isRequired,
};
Header.defaultProps = {
  className: 'layout-header',
  isLogged: false,
  onLogout: PropTypes.func,
  currentUser: '',
};

export default Header;
