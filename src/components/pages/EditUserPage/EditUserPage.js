import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Input, Button } from 'antd';
import storage from '../../../utils/storage';

import MainLayout from '../../layout/MainLayout';
import useForm from '../../../hooks/useForm';
import { getUi, getUsername, getUserEmail } from '../../../store/selectors';
import { editUser } from '../../../store/actions';

function EditUserPage({
  loading,
  error,
  currentUsername,
  currentUserEmail,
  onEditUser,
}) {
  const [form, onChangeForm] = useForm({
    newUsername: '',
    newUserEmail: '',
    newPasswd: '',
  });

  const { newUsername, newUserEmail, newPasswd } = form;

  const handleSubmit = event => {
    event.preventDefault();
    const dataForUpdate = form;

    onEditUser(currentUsername, dataForUpdate);
  };

  const IsSubmitting = () => !loading;

  return (
    <MainLayout title="My Profile">
      <div className="userPage">
        <aside className="userPage-aside">
          <h2>{currentUsername}</h2>
          <p>{currentUserEmail}</p>
        </aside>
        <div className="userPage-content">
          <h2>Editar mis datos</h2>
          <form className="edit-user-form" onSubmit={handleSubmit}>
            <div className="form-field">
              <Input
                placeholder={currentUsername}
                type="text"
                name="newUsername"
                value={newUsername}
                onChange={onChangeForm}
              />
            </div>
            <div className="form-field">
              <Input
                placeholder={currentUserEmail}
                type="email"
                name="newUserEmail"
                value={newUserEmail}
                onChange={onChangeForm}
              />
            </div>
            <div className="form-field">
              <Input
                type="password"
                placeholder="Contraseña"
                name="newPasswd"
                value={newPasswd}
                onChange={onChangeForm}
              />
            </div>
            <div className="form-field centered">
              <Button
                type="primary"
                htmlType="submit"
                disabled={!IsSubmitting()}
              >
                Enviar
              </Button>
            </div>
          </form>
          {error && <div className="loginPage-error">{error.message}</div>}
        </div>
      </div>
    </MainLayout>
  );
}

EditUserPage.propTypes = {
  loading: PropTypes.bool,
  error: PropTypes.bool,
  currentUsername: PropTypes.string.isRequired,
  currentUserEmail: PropTypes.string.isRequired,
  onEditUser: PropTypes.func.isRequired,
};

EditUserPage.defaultProps = {
  loading: false,
  error: null,
};

const mapStateToProps = state => ({
  getUi,
  currentUsername: getUsername(state),
  currentUserEmail: getUserEmail(state),
});

const mapDispatchToProps = {
  onEditUser: editUser,
};

const ConnectedEditUserPage = connect(
  mapStateToProps,
  mapDispatchToProps,
)(EditUserPage);

export default ConnectedEditUserPage;
