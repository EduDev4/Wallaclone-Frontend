/* eslint-disable react/self-closing-comp */
/* eslint-disable react/style-prop-object */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Button, Input } from 'antd';
import { UserOutlined, LogoutOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { getIsLoggedUser, getUsername } from '../../../store/selectors';
import { logout } from '../../../store/actions';
import ConfirmButton from '../../shared/ConfirmButton';
import LangButton from '../../shared/LangButton';
import UserTools from '../../auth/UserTools';

import './Header.css';

function Header({ className, isLogged, onLogout, currentUser, ...props }) {
  const [isMobile, setMobile] = useState(window.innerWidth < 768);

  const updateMedia = () => {
    setMobile(window.innerWidth < 768);
  };

  useEffect(() => {
    window.addEventListener('resize', updateMedia);
    return () => window.removeEventListener('resize', updateMedia);
  });

  const { Search } = Input;
  const { t, i18n } = useTranslation(['header']);
  const handleLogout = () => {
    onLogout();
  };
  return (
    <header className={classNames('header', className)}>
      <div className="header-wrapper">
        <Link to="/" className="header-logo">
          <h1 className="walla-logo">Wallaclone</h1>
        </Link>
        <form>
          <Search placeholder={t('Buscar...')} style={{ width: 200 }} />
        </form>

        <LangButton initialLang={i18n.language} />

        {isLogged ? (
          <>
            {isMobile ? null : <UserTools />}

            <ConfirmButton
              acceptAction={handleLogout}
              confirmProps={{
                title: 'Logout',
                message: 'Are you sure you want to logout?',
              }}
              typeButton="text"
            >
              <img
                src={`${process.env.REACT_APP_PUBLIC_URL}/icons/profile-menu-30.png`}
                alt="Profile"
              />
            </ConfirmButton>
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
