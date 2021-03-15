/* eslint-disable react/self-closing-comp */
/* eslint-disable react/style-prop-object */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Button } from 'antd';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { getIsLoggedUser, getUsername } from '../../../store/selectors';

import './UserTools.css';
import { getPublicUrl } from '../../../config/envConfig';

function UserTools({ className, currentUser, ...props }) {
  const { t, i18n } = useTranslation(['header']);

  return (
    // TODO COMPONENTE CON LOS ENLACES DE NOTIFICACIONES QUE SE LLAMARÁ DESDE HEADER Y FOOTER
    <>
      <div className="usertools">
        <div className="imgwrapper">
          <Link className="nav-button" to="/adverts">
            <img src={`${getPublicUrl()}/icons/home-icon.svg`} alt="Home" />
          </Link>
        </div>
        <div className="imgwrapper">
          <Link className="nav-button" to={`/user/${currentUser}`}>
            <img
              src={`${getPublicUrl()}/icons/noti-menu-hover-30.png`}
              alt="Notifications"
            />
          </Link>
        </div>
        <div className="imgwrapper">
          <Link className="nav-button" to={`/user/${currentUser}/chats`}>
            <img src={`${getPublicUrl()}/icons/chat-icon.svg`} alt="Chat" />
          </Link>
        </div>
        <div className="imgwrapper">
          <Link className="nav-button" to={`/user/${currentUser}/favorites`}>
            <img
              src={`${getPublicUrl()}/icons/fav-menu-hover-30.png`}
              alt="Favorites"
            />
          </Link>
        </div>
        <div className="imgwrapper">
          <Link className="nav-button" to="/adverts/new">
            <img src={`${getPublicUrl()}/icons/add-icon.svg`} alt="Create" />
          </Link>
        </div>
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

// const mapDispatchToProps = {
//   onLogout: logout,
// };

const ConnectedUserTools = connect(mapStateToProps, null)(UserTools);

export default ConnectedUserTools;
