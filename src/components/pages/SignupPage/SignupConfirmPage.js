import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Alert } from 'antd';

import MainLayout from '../../layout/MainLayout';

import { signupConfirm } from '../../../store/actions';
import { getUi } from '../../../store/selectors';

const SignupConfirmPage = ({ onConfirm, loading, error }) => {
  const { token } = useParams();

  useEffect(() => {
    onConfirm(token);
  }, []);

  return (
    <MainLayout title="Email validation">
      <div>
        {loading && <div>Verificando...</div>}
        {error ? (
          <Alert
            message="Error"
            description={error.message}
            type="error"
            showIcon
          />
        ) : (
          <Alert
            message="Email confirmado!"
            description="Ya puedes iniciar sesión con tu email y contraseña."
            type="success"
            showIcon
          />
        )}
      </div>
    </MainLayout>
  );
};

SignupConfirmPage.propTypes = {
  loading: PropTypes.bool,
  error: PropTypes.objectOf(PropTypes.any),
  onConfirm: PropTypes.func.isRequired,
};
SignupConfirmPage.defaultProps = {
  loading: false,
  error: null,
};

const mapStateToProps = getUi;

const mapDispatchToProps = {
  onConfirm: signupConfirm,
};

const ConnectedSignupConfirmPage = connect(
  mapStateToProps,
  mapDispatchToProps,
)(SignupConfirmPage);

export default ConnectedSignupConfirmPage;
