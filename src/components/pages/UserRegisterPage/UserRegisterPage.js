import React from 'react';
import PropTypes from 'prop-types';
import { Select, Slider, Input, Button } from 'antd';

import MainLayout from '../../layout/MainLayout';

const UserRegisterPage = () => (
  <MainLayout title="User Register">
    <div className="registerPage">
      <form className="register-form">
        <div className="form-field">
          <Input placeholder="Nombre de usuario" />
        </div>
        <div className="form-field">
          <Input placeholder="Contraseña" />
        </div>
        <div className="form-field">
          <Button type="primary">Register</Button>
        </div>
      </form>
    </div>
  </MainLayout>
);

export default UserRegisterPage;
