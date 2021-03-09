import { connect } from 'react-redux';

import AdvertPage from './AdvertPage';
import {
  getUi,
  getUsername,
  getUserEmail,
  getIsLoggedUser,
  getAdvertDetail,
} from '../../../store/selectors';

import { loadAdvertDetail, deleteAdvert } from '../../../store/actions';

const mapStateToProps = state => ({
  getUi,
  currentUsername: getUsername(state),
  currentUserEmail: getUserEmail(state),
  isLogged: getIsLoggedUser(state),
  advert: getAdvertDetail(state),
});

const mapDispatchToProps = dispatch => ({
  loadAdvertDetail: id => dispatch(loadAdvertDetail(id)),
  onDelete: advertId => dispatch(deleteAdvert(advertId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AdvertPage);
