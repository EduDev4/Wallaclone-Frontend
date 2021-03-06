import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Input, Button } from 'antd';

import { useTranslation } from 'react-i18next';
import MainLayout from '../../layout/MainLayout';
import useForm from '../../../hooks/useForm';

import './EditUserPage.css';

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
  const { t } = useTranslation(['userpage']);

  const handleSubmit = event => {
    event.preventDefault();
    const dataForUpdate = form;

    onEditUser(currentUsername, dataForUpdate);
  };

  const IsSubmitting = () =>
    !loading && (newUsername || newUserEmail || newPasswd);

  return (
    <MainLayout title="My Profile">
      <div className="userPage row">
        <aside className="userPage-aside col-sm-12 col-md-3">
          <h2>{currentUsername}</h2>
          <p>{currentUserEmail}</p>
        </aside>
        <div className="userPage-content col-sm-12 col-md-9">
          <h2>{t('Editar mis datos')}</h2>
          <form className="edit-user-form" onSubmit={handleSubmit}>
            <input
              placeholder={currentUsername}
              type="text"
              name="newUsername"
              value={newUsername}
              onChange={onChangeForm}
              className="editUserInput"
            />
            <div className="form-field">
              <input
                placeholder={currentUserEmail}
                type="email"
                name="newUserEmail"
                value={newUserEmail}
                onChange={onChangeForm}
                className="editUserInput"
              />
            </div>
            <div className="form-field">
              <input
                type="password"
                placeholder="Contraseña"
                name="newPasswd"
                value={newPasswd}
                onChange={onChangeForm}
                className="editUserInput"
              />
            </div>
            <div className="form-field centered">
              <Button
                type="primary"
                htmlType="submit"
                ghost
                disabled={!IsSubmitting()}
              >
                {t('Enviar')}
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

export default EditUserPage;
