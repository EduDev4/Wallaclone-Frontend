import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Input, Button } from 'antd';

import MainLayout from '../../layout/MainLayout';
import useForm from '../../../hooks/useForm';
import { getUi, getUsername, getUserEmail } from '../../../store/selectors';
import { updateUser } from '../../../api/users';

function EditUserPage({ loading, error, currentUsername, currentUserEmail }) {
  const [form, onChangeForm] = useForm({
    newUsername: '',
    newUserEmail: '',
    newPasswd: '',
  });

  const { newUsername, newUserEmail, newPasswd } = form;

  const handleSubmit = async event => {
    event.preventDefault();
    const credentials = form;
    // onLogin(credentials);
    console.log('credentals:', credentials);
    try {
      const { username, userEmail } = await updateUser(
        currentUsername,
        credentials,
      );
      console.log('user:', username, userEmail);
        
      // console.log('userEmail:', userEmail);
    } catch (err) {
      console.log(error);
    }
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

// const mapDispatchToProps = {
//   onLogin: login,
// };

const ConnectedEditUserPage = connect(mapStateToProps)(EditUserPage);

export default ConnectedEditUserPage;
