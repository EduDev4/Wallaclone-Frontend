import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { Input, Button, Alert } from 'antd';
import { Link } from 'react-router-dom';

import { forgotPasswd } from '../../../api/users';

import useForm from '../../../hooks/useForm';
import MainLayout from '../../layout/MainLayout';

import './ForgotPassPage.css';

function ForgotPassPage({ error }) {
  const [form, onChangeForm] = useForm({
    email: '',
  });
  const { t } = useTranslation(['forgotpass']);
  const { email } = form;

  const IsSubmitting = () => email;

  return (
    <MainLayout title={t('Cambiar Contraseña')}>
      <div className="forgotPage">
        <form className="forgot-form">
          {t('Introduce el email de tu usario de wallaclone')}
          <div className="form-field">
            <Input
              name="email"
              type="email"
              placeholder="Email"
              value={email}
              onChange={onChangeForm}
            />
          </div>
          <div className="form-field centered">
            <Button
              as={Link}
              to="/login"
              type="primary"
              onClick={() => forgotPasswd(email)}
              disabled={!IsSubmitting(email)}
            >
              {t('Enviar')}
            </Button>
          </div>
        </form>
        {error && (
          <Alert
            message="Error"
            description={error.message}
            type="error"
            showIcon
          />
        )}
      </div>
    </MainLayout>
  );
}

forgotPasswd.propTypes = {
  email: PropTypes.string,
  error: PropTypes.objectOf(PropTypes.any),
};

ForgotPassPage.propTypes = {
  error: PropTypes.objectOf(PropTypes.any),
};
ForgotPassPage.defaultProps = {
  error: null,
};
export default ForgotPassPage;
