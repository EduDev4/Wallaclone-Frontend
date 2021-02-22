import React from 'react';
import PropTypes from 'prop-types';
import { Input, Button } from 'antd';
import { Link } from 'react-router-dom';
import { forgotPasswd } from '../../../api/users';

import MainLayout from '../../layout/MainLayout';

import './ForgotPassPage.css';

class ForgotPassPage extends React.Component {
  state = {
    form: {
      email: '',
    },
    submitting: false,
  };

  handleChange = event => {
    this.setState(state => ({
      form: { ...state.form, [event.target.name]: event.target.value },
    }));
  };

  canSubmit = () => {
    const {
      form: { email },
    } = this.state;
    return email;
  };

 /* handleSubmit = async event => {
    const { history } = this.props;
    const { form: email } = this.state;
    event.preventDefault();
    this.setState({ submitting: true });
    try {
        
        await forgotPasswd(email);
        this.setState({ submitting: false, error: null });
        history.push('/login');
      } catch (error) {
        this.setState({ submitting: false, error });
      }
    };


  resetError = () => this.setState({ error: null });*/

  render() {
    const {
      form: { email },
    } = this.state;

    return (
      <MainLayout title="Reset Password">
        <div className="forgotPage">
          <form className="forgot-form">
            <div className="form-field">
              <Input
                name="email"
                type="email"
                placeholder="Email"
                value={email}
                onChange={this.handleChange}
              />
            </div>
            <div className="form-field centered">
              <Button
                as={Link}
                to="/login"
                type="primary"
                onClick={() => forgotPasswd(email)}
                disabled={!this.canSubmit(email)}
            
              >
                Send
              </Button>
            </div>
          </form>
        </div>
      </MainLayout>
    );
  }
}

forgotPasswd.propTypes = {
  email: PropTypes.string,
};
export default ForgotPassPage;
