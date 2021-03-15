/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { Input, Button, Alert } from 'antd';
import { Link } from 'react-router-dom';
import { resetPasswd } from '../../../api/users';
import useForm from '../../../hooks/useForm';
import MainLayout from '../../layout/MainLayout';

import './ResetPassPage.css';

function ResetPassPage({ match, error }) {
  const [form, onChangeForm] = useForm({
    passwd: '',
    passwd1: '',
  });

  const { t } = useTranslation(['resetpass']);
  const { passwd, passwd1 } = form;

  const IsSubmitting = () =>
    passwd.length > 0 && passwd1.length > 0 && passwd === passwd1;

  // eslint-disable-next-line react/destructuring-assignment
  const { hash } = match.params;

  return (
    <MainLayout title={t('Nueva Contraseña')}>
      <div className="resetPage">
        <form className="reset-form">
          <div className="form-field">
            <Input
              name="passwd"
              type="password"
              placeholder={t('Contraseña')}
              value={passwd}
              onChange={onChangeForm}
            />
          </div>
          <div className="form-field">
            <Input
              name="passwd1"
              type="password"
              placeholder={t('Confirma Contraseña')}
              value={passwd1}
              onChange={onChangeForm}
            />
          </div>
          <p>{t('Contraseñas tienen que ser iguales(min 6 car)')}</p>
          <div className="form-field centered">
            <Button
              as={Link}
              to="/login"
              type="primary"
              onClick={() => resetPasswd(passwd, hash)}
              disabled={!IsSubmitting(passwd, passwd1)}
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
ResetPassPage.propTypes = {
  error: PropTypes.objectOf(PropTypes.any),
};
ResetPassPage.defaultProps = {
  error: null,
};

resetPasswd.propTypes = {
  passwd: PropTypes.string,
  passwd1: PropTypes.string,
  canSubmit: PropTypes.func,
  handleChange: PropTypes.func,
  match: PropTypes.shape({
    params: PropTypes.shape({
      hash: PropTypes.string.isRequired,
    }),
  }),
};
export default ResetPassPage;
