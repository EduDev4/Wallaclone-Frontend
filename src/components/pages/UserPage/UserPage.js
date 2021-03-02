/* eslint-disable react/jsx-props-no-spreading */
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Input, Button, Col, Row } from 'antd';
import AdvertCard from '../../adverts';

import MainLayout from '../../layout/MainLayout';
import {
  getUi,
  getUsername,
  getUserEmail,
  getIsLoggedUser,
} from '../../../store/selectors';

import './UserPage.css';
import { getAdverts } from '../../../api/adverts';
import UserPageAside from './UserPageAside';

function UserPage({ match }) {
  const handleDelete = () => {};
  const [adverts, setAdverts] = useState(null);
  const user = match.params.username;

  useEffect(() => {
    getAdverts(`username=${user}`).then(setAdverts);
  }, []);

  const renderAdverts = () => {
    const advertsList = adverts.adverts;

    // console.log(advertsList);

    if (advertsList.length === 0) {
      return console.log('no hay anuncios');
    }
    return advertsList.map(advert => (
      <AdvertCard key={advert._id} {...advert} />
    ));
  };

  return (
    <MainLayout title="My Profile">
      <div className="userPage container">
        <div className="row">
          <aside className="userPage-aside col-3">
            <UserPageAside user={user} onDelete={handleDelete} />
          </aside>
          <div className="userPage-content col-9">
            <h2>Mis anuncios</h2>
            <div className="userPage-adswrapper row">
              {!adverts ? <p>no hay anuncios</p> : renderAdverts()}
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}

UserPage.propTypes = {
  // eslint-disable-next-line react/require-default-props
  loading: PropTypes.bool,
  error: PropTypes.bool,
  currentUsername: PropTypes.string,
  currentUserEmail: PropTypes.string,
  isLogged: PropTypes.bool,
  // eslint-disable-next-line react/require-default-props
  match: PropTypes.shape({
    params: PropTypes.shape({
      username: PropTypes.string.isRequired,
    }),
  }),
};

UserPage.defaultProps = {
  loading: false,
  error: null,
  currentUsername: '',
  currentUserEmail: '',
  isLogged: false,
};

const mapStateToProps = state => ({
  getUi,
  currentUsername: getUsername(state),
  currentUserEmail: getUserEmail(state),
  isLogged: getIsLoggedUser(state),
});

// const mapDispatchToProps = {
//   onLogin: login,
// };

const ConnectedUserPage = connect(mapStateToProps)(UserPage);

export default ConnectedUserPage;
