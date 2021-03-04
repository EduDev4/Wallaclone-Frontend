import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';

import { Alert } from 'antd';
import Header from '../Header';
import Footer from '../Footer';

import './MainLayout.css';
import { uiReset } from '../../../store/actions';

const MainLayout = ({ alert, children, title }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(uiReset());
  }, []);

  return (
    <div className="layout">
      <Header className="layout-header" />
      {alert && (
        <Alert
          type={alert.type}
          className="layout-main--error"
          message={alert.message}
          showIcon
        />
      )}
      <main className="layout-main">
        <h2 className="layout-main--title">{title}</h2>
        <section className="layout-main--section">{children}</section>
      </main>
      <Footer className="layout-footer" />
    </div>
  );
};

MainLayout.propTypes = {
  alert: PropTypes.objectOf(PropTypes.any),
  children: PropTypes.node.isRequired,
  title: PropTypes.string.isRequired,
};

MainLayout.defaultProps = {
  alert: null,
};

export default MainLayout;
