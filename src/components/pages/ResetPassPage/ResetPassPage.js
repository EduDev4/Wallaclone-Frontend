import React from 'react';
import PropTypes from 'prop-types';
import { Input, Button } from 'antd';
import { Link } from 'react-router-dom';
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
    console.log(hash);
    const {
      form: { passwd, passwd1 },
    } = this.state;

    return (
      <MainLayout title="New Password">
        <div className="resetPage">
          <form className="reset-form">
            <div className="form-field">
              <Input
                name="passwd"
                type="password"
                placeholder="Contraseña"
                value={passwd}
                onChange={this.handleChange}
              />
            </div>
            <div className="form-field">
              <Input
                name="passwd1"
                type="password"
                placeholder="Confirma contraseña"
                value={passwd1}
                onChange={this.handleChange}
              />
            </div>
            <p>Passwords must be equal(min 6 characters )!</p>
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

ResetPassPage.propTypes = {
  match: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default ResetPassPage;
