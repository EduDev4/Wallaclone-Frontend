import React from 'react';
import PropTypes from 'prop-types';
import { Input, Button } from 'antd';

import MainLayout from '../../layout/MainLayout';

import './SignupPage.css';

const SignupPage = () => (
  <MainLayout title="User Sign up">
    <div className="signupPage">
      <form className="signup-form">
        <div className="form-field">
          <Input placeholder="Nombre de usuario" />
        </div>
        <div className="form-field">
          <Input type="email" placeholder="Email" />
        </div>
        <div className="form-field">
          <Input placeholder="Contraseña" />
        </div>
        <div className="form-field">
          <Input placeholder="Confirma contraseña" />
        </div>
        <div className="form-field centered">
          <Button type="primary">Sign up</Button>
        </div>
      </form>
    </div>
  </MainLayout>
);

export default SignupPage;
