import React from 'react';
import PropTypes from 'prop-types';

import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';

const Root = ({ children, store, history }) => (
  <Provider store={store}>
    <ConnectedRouter history={history}>{children}</ConnectedRouter>
  </Provider>
);

Root.propTypes = {
  children: PropTypes.node.isRequired,
  store: PropTypes.objectOf(PropTypes.any).isRequired,
  history: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default Root;
