import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Input, Button } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';

import MainLayout from '../../layout/MainLayout';
import {
  getUi,
  getUsername,
  getUserEmail,
  getIsLoggedUser,
} from '../../../store/selectors';

import './UserPage.css';

function UserPage({
  loading,
  error,
  currentUsername,
  currentUserEmail,
  isLogged,
  match,
}) {
  const handleDelete = () => {};
  const handleEdit = () => {};
  const url = `/user/edit/${currentUsername}`;

  return (
    <MainLayout title="My Profile">
      <div className="userPage">
        <aside className="userPage-aside">
          <h2>{match.params.username}</h2>

          {isLogged && currentUsername === match.params.username ? (
            <>
              <p>{currentUserEmail}</p>
              <Link className="edit-link" to={url}>
                <Button type="primary" className="edit-button">
                  Editar mis datos{' '}
                  <EditOutlined className="site-form-item-icon" />
                </Button>
              </Link>

              <Button type="dashed" onClick={handleDelete} danger>
                Darme de baja <DeleteOutlined className="site-form-item-icon" />
              </Button>
            </>
          ) : (
            <></>
          )}
        </aside>
        <div className="userPage-content">
          <h2>Mis anuncios</h2>
          <div className="userPage-adswrapper">
            <div className="advert-card">
              <p>
                Chocolate oat cake marshmallow soufflé. Carrot cake muffin
                dessert macaroon. Jujubes pudding jelly beans fruitcake cookie
                cookie toffee cotton candy gingerbread. Candy
              </p>
            </div>
            <div className="advert-card">
              <p>
                Chocolate oat cake marshmallow soufflé. Carrot cake muffin
                dessert macaroon. Jujubes pudding jelly beans fruitcake cookie
                cookie toffee cotton candy gingerbread. Candy
              </p>
            </div>
            <div className="advert-card">
              <p>
                Chocolate oat cake marshmallow soufflé. Carrot cake muffin
                dessert macaroon. Jujubes pudding jelly beans fruitcake cookie
                cookie toffee cotton candy gingerbread. Candy
              </p>
            </div>
            <div className="advert-card">
              <p>
                Chocolate oat cake marshmallow soufflé. Carrot cake muffin
                dessert macaroon. Jujubes pudding jelly beans fruitcake cookie
                cookie toffee cotton candy gingerbread. Candy
              </p>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}

UserPage.propTypes = {
  loading: PropTypes.bool,
  error: PropTypes.bool,
  currentUsername: PropTypes.string,
  currentUserEmail: PropTypes.string,
  isLogged: PropTypes.bool,
  match: PropTypes.objectOf(PropTypes.any).isRequired,
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
