import React from 'react';
import PropTypes from 'prop-types';
import { Input, Button } from 'antd';
import { Link } from 'react-router-dom';
import { forgotPasswd } from '../../../api/users';

import MainLayout from '../../layout/MainLayout';

import './ForgotPassPage.css';

const ForgotPassPage2 = email => (
  <MainLayout title="Reset Password">
    <div className="forgotPage">
      <form className="forgot-form">
        <div className="form-field">
          <Input type="email" placeholder="Email" value={email} />
        </div>
        <div className="form-field centered">
          <Button
            as={Link}
            to="/"
            type="primary"
            onClick={() => forgotPasswd(email)}
          >
            Send
          </Button>
        </div>
      </form>
    </div>
  </MainLayout>
);

forgotPasswd.propTypes = {
  hash: PropTypes.string,
};

export default ForgotPassPage2;
