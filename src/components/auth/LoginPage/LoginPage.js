import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link, useHistory } from 'react-router-dom';
import { Button } from 'antd';
import login from '../../../api/auth';

import MainLayout from '../../layout/MainLayout';

import './LoginPage.css';

function LoginPage({ onLogin }) {
  const [username, setUsername] = useState('');
  const [passwd, setPasswd] = useState('');
  const [remember, setRemember] = useState(false);

  const history = useHistory();

  const handleChangeUsername = event => setUsername(event.target.value);
  const handleChangePasswd = event => setPasswd(event.target.value);
  const handleChangeCheckbox = event => setRemember(event.target.checked);

  const handleSubmit = async event => {
    event.preventDefault();
    const credentials = { username, passwd, remember };

    try {
      const status = await login(credentials);
      onLogin(true);
      if (status === 'success') {
        console.log('usuario logado');
        history.push('/adverts');
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <MainLayout title="Login">
      <div className="loginPage">
        <form className="login-form" onSubmit={handleSubmit}>
          <div className="form-field">
            <input
              className="input-text"
              type="name"
              name="username"
              value={username}
              onChange={handleChangeUsername}
              required
            />
          </div>
          <div className="form-field">
            <input
              className="input-text"
              type="password"
              name="passwd"
              value={passwd}
              onChange={handleChangePasswd}
              required
            />
          </div>
          <div className="form-field">
            <label htmlFor="remember">
              <input
                type="checkbox"
                id="remember"
                name="remember"
                checked={remember}
                onChange={handleChangeCheckbox}
              />
              Remember me
            </label>
          </div>
          <div className="form-field centered">
            <Button type="primary" htmlType="submit">
              Login
            </Button>
          </div>
          <div className="form-field centered">
            <span>Aún no tienes cuenta. </span>
            <Link to="/signup">Regístrate</Link>
          </div>
        </form>
      </div>
    </MainLayout>
  );
}

LoginPage.propTypes = {
  onLogin: PropTypes.func.isRequired,
};
export default LoginPage;
