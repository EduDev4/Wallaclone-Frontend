import { connect } from 'react-redux';

import UserPage from './UserPage';
import {
  getUi,
  getUsername,
  getUserEmail,
  getIsLoggedUser,
  getAdverts,
} from '../../../store/selectors';

import { loadAdverts } from '../../../store/actions/adverts-actions';

const mapStateToProps = state => ({
  currentUsername: getUsername(state),
  currentUserEmail: getUserEmail(state),
  isLogged: getIsLoggedUser(state),
  adverts: getAdverts(state),
  loading: getUi(state).loading,
  error: getUi(state).error,
});

const mapDispatchToProps = dispatch => ({
  loadAdverts: form => dispatch(loadAdverts(form)),
});

export default connect(mapStateToProps, mapDispatchToProps)(UserPage);
