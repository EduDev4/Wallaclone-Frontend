import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Checkbox, Input, Button } from 'antd';

import MainLayout from '../../layout/MainLayout';

function LoginPage() {
  return (
    <MainLayout title="Login">
      <div className="loginPage">
        <form className="login-form">
          <div className="form-field">
            <Input placeholder="Nombre de usuario" />
          </div>
          <div className="form-field">
            <Input placeholder="Contraseña" />
          </div>
          <div className="form-field">
            <Checkbox style={{ color: 'white' }} name="remcredentials">
              Rememberme
            </Checkbox>
          </div>
          <div className="form-field">
            <Button type="primary">Login</Button>
          </div>
          <div className="form-field">
            <span>Aún no tienes cuenta.</span>
            <Link to="/register">Regístrate</Link>
          </div>
        </form>
      </div>
    </MainLayout>
  );
}

export default LoginPage;
