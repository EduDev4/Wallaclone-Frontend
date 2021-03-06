import { connect } from 'react-redux';
import Header from './Header';
import {
  getUi,
  getAdverts,
  getIsLoggedUser,
  getUsername,
} from '../../../store/selectors';
import { loadAdverts, logout } from '../../../store/actions';

const mapStateToProps = state => ({
  isLogged: getIsLoggedUser(state),
  currentUser: getUsername(state),
  adverts: getAdverts(state),
});

const mapDispatchToProps = dispatch => ({
  onLogout: () => dispatch(logout()),
  loadAdverts: form => dispatch(loadAdverts(form)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
