import { connect } from 'react-redux';

import UserSoldPage from './UserSoldPage';
import {
  getUi,
  getUsername,
  getUserEmail,
  getIsLoggedUser,
  getAdverts,
} from '../../../store/selectors';

import { loadSoldAdverts } from '../../../store/actions/user-adverts-actions';

const mapStateToProps = state => ({
  getUi,
  currentUsername: getUsername(state),
  currentUserEmail: getUserEmail(state),
  isLogged: getIsLoggedUser(state),
  adverts: getAdverts(state),
});

const mapDispatchToProps = {
  onLoadSoldAdverts: loadSoldAdverts,
};

export default connect(mapStateToProps, mapDispatchToProps)(UserSoldPage);
