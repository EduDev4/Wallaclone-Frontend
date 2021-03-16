import { connect } from 'react-redux';

import UserReservedPage from './UserReservedPage';
import {
  getUi,
  getUsername,
  getUserEmail,
  getIsLoggedUser,
  getAdverts,
} from '../../../store/selectors';

import { loadReservedAdverts } from '../../../store/actions/user-adverts-actions';

const mapStateToProps = state => ({
  getUi,
  currentUsername: getUsername(state),
  currentUserEmail: getUserEmail(state),
  isLogged: getIsLoggedUser(state),
  adverts: getAdverts(state),
});

const mapDispatchToProps = {
  onLoadReservedAdverts: loadReservedAdverts,
};

export default connect(mapStateToProps, mapDispatchToProps)(UserReservedPage);