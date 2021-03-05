import { connect } from 'react-redux';

import UserPage from './UserPage';
import {
  getUi,
  getUsername,
  getUserEmail,
  getIsLoggedUser,
  getAdverts,
} from '../../../store/selectors';

import { loadAdverts } from '../../../store/actions';

const mapStateToProps = state => ({
  getUi,
  currentUsername: getUsername(state),
  currentUserEmail: getUserEmail(state),
  isLogged: getIsLoggedUser(state),
  adverts: getAdverts(state),
});

const mapDispatchToProps = dispatch => ({
  loadAdverts: form => dispatch(loadAdverts(form)),
});

export default connect(mapStateToProps, mapDispatchToProps)(UserPage);
