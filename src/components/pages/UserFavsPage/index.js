import { connect } from 'react-redux';

import UserFavsPage from './UserFavsPage';
import {
  getUi,
  getUsername,
  getUserEmail,
  getIsLoggedUser,
  getAdverts,
  getIsFavAdvert,
} from '../../../store/selectors';

import { loadFavAdverts } from '../../../store/actions';

const mapStateToProps = state => ({
  getUi,
  currentUsername: getUsername(state),
  currentUserEmail: getUserEmail(state),
  isLogged: getIsLoggedUser(state),
  adverts: getAdverts(state),
  favsAdverts: getIsFavAdvert(state),
});

const mapDispatchToProps = {
  onLoadFavAdverts: loadFavAdverts,
};

export default connect(mapStateToProps, mapDispatchToProps)(UserFavsPage);
