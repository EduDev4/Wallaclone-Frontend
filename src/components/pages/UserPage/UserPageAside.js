import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Input, Button } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';

import MainLayout from '../../layout/MainLayout';
import { getUi, getUsername, getUserEmail } from '../../../store/selectors';

import './UserPage.css';

function UserPageAside() {
  return <p></p>;
}
export default UserPageAside;
