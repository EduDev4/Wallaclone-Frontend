import React from 'react';
import PropTypes from 'prop-types';
import { Input, Button } from 'antd';

import MainLayout from '../../layout/MainLayout';

import './UserRegisterPage.css';

const UserRegisterPage = () => (
  <MainLayout title="User Register">
    <div className="registerPage">
      <form className="register-form">
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
          <Button type="primary">Register</Button>
        </div>
      </form>
    </div>
  </MainLayout>
);

export default UserRegisterPage;
