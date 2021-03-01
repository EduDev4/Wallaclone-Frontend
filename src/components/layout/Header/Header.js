/* eslint-disable react/self-closing-comp */
/* eslint-disable react/style-prop-object */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Button, Input, Select } from 'antd';
import { UserOutlined, LogoutOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { getIsLoggedUser, getUsername } from '../../../store/selectors';
import { logout } from '../../../store/actions';
import ConfirmButton from '../../shared/ConfirmButton';
import UserTools from '../../auth/UserTools';

import './Header.css';

function Header({ className, isLogged, onLogout, currentUser, ...props }) {
  const [isMobile, setMobile] = useState(window.innerWidth < 760);

  const updateMedia = () => {
    setMobile(window.innerWidth < 760);
  };

  useEffect(() => {
    window.addEventListener('resize', updateMedia);
    return () => window.removeEventListener('resize', updateMedia);
  });

  const { Search } = Input;
  const { Option } = Select;
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
        <Select
          defaultValue="es"
          className="lang-select"
          style={{ width: 120 }}
          clearIcon
          onChange={() => {
            if (i18n.language === 'es') i18n.changeLanguage('en');
            else if (i18n.language === 'en') i18n.changeLanguage('es');
          }}
        >
          <Option value="en" clearIcon>
            EN
          </Option>
          <Option value="es" clearIcon>
            ES
          </Option>
        </Select>

        {isLogged ? (
          <>
            {isMobile ? null : <UserTools />}

            <ConfirmButton
              acceptAction={handleLogout}
              confirmProps={{
                title: 'Logout',
                message: 'Are you sure you want to logout?',
              }}
              typeButton="primary"
              danger
              icon={<LogoutOutlined />}
            />
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