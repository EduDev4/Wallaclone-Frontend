import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Button } from 'antd';

import MainLayout from '../../layout/MainLayout';

import { signupConfirm } from '../../../store/actions';
import { getUi } from '../../../store/selectors';

const SignupConfirmPage = ({ onConfirm, loading, error }) => {
  //TODO extraer email y usuario del estado (curentEmail y currentUsername con isLogged:false)
  //TODO lanzar confirm al back
  const { token } = useParams();

  const handleConfirm = event => {
    event.preventDefault();
    console.log(token);
    const data = token;
    onConfirm(data);
    console.log(data);
  };

  const IsSubmitting = () => !loading;

  return (
    <MainLayout title="Sing up email confirmation">
      <div>
        <form onSubmit={handleConfirm}>
          <div className="form-field centered">
            <Button type="primary" htmlType="submit" disabled={!IsSubmitting()}>
              Confirm email
            </Button>
            {error && <div>{error.message}</div>}
          </div>
        </form>
      </div>
    </MainLayout>
  );
};

SignupConfirmPage.propTypes = {
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
