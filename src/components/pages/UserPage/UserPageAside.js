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

function UserPageAside({
  loading,
  error,
  currentUsername,
  currentUserEmail,
  isLogged,
  user,
}) {
  const handleDelete = () => {};
  return (
    <>
      <h2>{user}</h2>

      {isLogged && currentUsername === user ? (
        <>
          <p>{currentUserEmail}</p>
          <Link className="edit-link" to={`/user/edit/${currentUsername}`}>
            <Button type="primary" className="edit-button">
              Editar mis datos <EditOutlined className="site-form-item-icon" />
            </Button>
          </Link>

          <Button type="dashed" onClick={handleDelete} danger>
            Darme de baja <DeleteOutlined className="site-form-item-icon" />
          </Button>
        </>
      ) : (
        <></>
      )}
    </>
  );
}

UserPageAside.propTypes = {
  user: PropTypes.string.isRequired,
  loading: PropTypes.bool,
  error: PropTypes.bool,
  currentUsername: PropTypes.string,
  currentUserEmail: PropTypes.string,
  isLogged: PropTypes.bool,
};

UserPageAside.defaultProps = {
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
const ConnectedUserPageAside = connect(mapStateToProps)(UserPageAside);
export default ConnectedUserPageAside;
