import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Input, Button } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';

import useForm from '../../../hooks/useForm';
import MainLayout from '../../layout/MainLayout';

import { signup } from '../../../store/actions';
import { getUi } from '../../../store/selectors';

import './SignupPage.css';

const SignupPage = ({ onSignup, loading, error }) => {
  const [form, onChangeForm] = useForm({
    username: '',
    email: '',
    passwd: '',
    passwd2: '',
  });

  const { username, email, passwd, passwd2 } = form;

  const handleSubmit = event => {
    event.preventDefault();
    const formData = form;
    onSignup(formData);
    console.log(formData);
  };

  const IsSubmitting = () => !loading && username && passwd && passwd2 && email;

  return (
    <MainLayout title="User Sign up">
      <div className="signupPage">
        <form className="signup-form" onSubmit={handleSubmit}>
          <div className="form-field">
            <Input
              placeholder="Username"
              type="text"
              name="username"
              value={username}
              onChange={onChangeForm}
              prefix={<UserOutlined className="site-form-item-icon" />}
            />
          </div>
          <div className="form-field">
            <Input
              type="email"
              placeholder="Email"
              name="email"
              value={email}
              onChange={onChangeForm}
              prefix="@"
            />
          </div>
          <div className="form-field">
            <Input.Password
              type="password"
              placeholder="Contraseña"
              name="passwd"
              value={passwd}
              onChange={onChangeForm}
              prefix={<LockOutlined className="site-form-item-icon" />}
            />
          </div>
          <div className="form-field">
            <Input.Password
              type="password"
              placeholder="Confirma contraseña"
              name="passwd2"
              value={passwd2}
              onChange={onChangeForm}
              prefix={<LockOutlined className="site-form-item-icon" />}
            />
          </div>
          <div className="form-field centered">
            <Button type="primary" htmlType="submit" disabled={!IsSubmitting()}>
              Sing up
            </Button>
          </div>
        </form>
        {error && <div className="singupPage-error">{error.message}</div>}
      </div>
    </MainLayout>
  );
};

SignupPage.propTypes = {
  error: PropTypes.objectOf(PropTypes.any),
  onSignup: PropTypes.func.isRequired,
};
SignupPage.defaultProps = {
  loading: false,
  error: null,
};

const mapStateToProps = getUi;

const mapDispatchToProps = {
  onSignup: signup,
};

const ConnectedSignupPage = connect(
  mapStateToProps,
  mapDispatchToProps,
)(SignupPage);

export default ConnectedSignupPage;
