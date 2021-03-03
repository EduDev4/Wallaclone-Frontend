import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Button } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';

import ConfirmButton from '../../shared/ConfirmButton';

import {
  getUi,
  getUsername,
  getUserEmail,
  getIsLoggedUser,
} from '../../../store/selectors';

import './UserPage.css';
import { deleteUser } from '../../../store/actions';

function UserPageAside({
  loading,
  error,
  currentUsername,
  currentUserEmail,
  isLogged,
  user,
  onDeleteUser,
}) {
  const { t } = useTranslation(['userpage']);
  return (
    <>
      <h2>{user}</h2>

      {isLogged && currentUsername === user ? (
        <>
          <p>{currentUserEmail}</p>
          <Link className="edit-link" to={`/user/edit/${currentUsername}`}>
            <Button type="primary" className="edit-button">
              {t('Editar mis datos')}
              <EditOutlined className="site-form-item-icon" />
            </Button>
          </Link>

          <ConfirmButton
            acceptAction={onDeleteUser}
            confirmProps={{
              title: t('Eliminar Cuenta de Usuario'),
              message: t('¿Estás seguro de eliminar tu cuenta?'),
            }}
            typeButton="dashed"
            danger
            icon={<DeleteOutlined className="site-form-item-icon" />}
          >
            {t('Eliminar Cuenta')}
          </ConfirmButton>
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
  onDeleteUser: PropTypes.func.isRequired,
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

const mapDispatchToProps = { onDeleteUser: deleteUser };

const ConnectedUserPageAside = connect(
  mapStateToProps,
  mapDispatchToProps,
)(UserPageAside);
export default ConnectedUserPageAside;
