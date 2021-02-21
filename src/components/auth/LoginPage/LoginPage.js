import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link, useHistory } from 'react-router-dom';
import { Button, Input, Checkbox } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import login from '../../../api/auth';

import MainLayout from '../../layout/MainLayout';
import useForm from '../../../hooks/useForm';
import {
  authLoginRequest,
  authLoginFailure,
  authLoginSuccess,
} from '../../../store/actions';
import { getUi } from '../../../store/selectors';

import './LoginPage.css';

function LoginPage({ onLoginRequest, onLoginFailure, onLoginSuccess }) {
  const [form, onChangeForm] = useForm({
    username: '',
    passwd: '',
    remember: false,
  });

  const history = useHistory();

  const { username, passwd, remember } = form;

  const handleSubmit = async event => {
    event.preventDefault();
    onLoginRequest();
    const credentials = form;

    try {
      const auth = await login(credentials);

      // console.log('auth.data en loginpage', auth.data);

      // onLogin(auth.data);
      // TODO preguntar si esta comprobación de status hace falta
      // if (auth.status === 'success') {
      const { tokenJWT, userEmail } = auth.data;
      // console.log('isLogged en App:', !!tokenJWT);
      onLoginSuccess(!!tokenJWT, username, userEmail);
      // console.log('usuario logado');
      history.push('/adverts');
      // }
    } catch (error) {
      console.log(error.message);
      onLoginFailure(error);
    }
  };

  return (
    <MainLayout title="Login">
      <div className="loginPage">
        <form className="login-form" onSubmit={handleSubmit}>
          <div className="form-field">
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="Username"
              type="text"
              name="username"
              value={username}
              onChange={onChangeForm}
            />
          </div>
          <div className="form-field">
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Contraseña"
              name="passwd"
              value={passwd}
              onChange={onChangeForm}
            />
          </div>

          <div className="form-field">
            <Checkbox
              onChange={onChangeForm}
              name="remember"
              valuePropName={remember}
            >
              Remember me
            </Checkbox>
          </div>
          <div className="form-field centered">
            <Button type="primary" htmlType="submit">
              Login
            </Button>
          </div>
        </form>
      </div>
    </MainLayout>
  );
}

LoginPage.propTypes = {
  onLoginRequest: PropTypes.func.isRequired,
  onLoginFailure: PropTypes.func.isRequired,
  onLoginSuccess: PropTypes.func.isRequired,
};

const mapStateToProps = getUi;

const mapDispatchToProps = {
  onLoginRequest: authLoginRequest,
  onLoginFailure: authLoginFailure,
  onLoginSuccess: authLoginSuccess,
};

const ConnectedLoginPage = connect(
  mapStateToProps,
  mapDispatchToProps,
)(LoginPage);

export default ConnectedLoginPage;
