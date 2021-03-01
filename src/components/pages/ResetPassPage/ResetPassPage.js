/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import { Input, Button } from 'antd';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { resetPasswd } from '../../../api/users';

import MainLayout from '../../layout/MainLayout';

import './ResetPassPage.css';

class ResetPassPage extends React.Component {
  state = {
    form: {
      passwd: '',
      passwd1: '',
    },
  };

  handleChange = event => {
    this.setState(state => ({
      form: { ...state.form, [event.target.name]: event.target.value },
    }));
  };

  canSubmit = (passwd, passwd1) =>
    passwd.length > 0 && passwd1.length > 0 && passwd === passwd1;

  render() {
    // eslint-disable-next-line react/destructuring-assignment
    const { hash } = this.props.match.params;
    const {
      form: { passwd, passwd1 },
    } = this.state;
    // const { t } = useTranslation(['forgotpasswd']);

    return (
      <MainLayout title="New Password">
        <div className="resetPage">
          <form className="reset-form">
            <div className="form-field">
              <Input
                name="passwd"
                type="password"
                placeholder="Password"
                value={passwd}
                onChange={this.handleChange}
              />
            </div>
            <div className="form-field">
              <Input
                name="passwd1"
                type="password"
                placeholder="Password Confirmation"
                value={passwd1}
                onChange={this.handleChange}
              />
            </div>
            <p>Passwords must be the same(min 6 char)!</p>
            <div className="form-field centered">
              <Button
                as={Link}
                to="/login"
                type="primary"
                onClick={() => resetPasswd(passwd, hash)}
                disabled={!this.canSubmit(passwd, passwd1)}
              >
                Submit
              </Button>
            </div>
          </form>
        </div>
      </MainLayout>
    );
  }
}

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
