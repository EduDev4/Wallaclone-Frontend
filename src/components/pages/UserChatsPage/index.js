import { connect } from 'react-redux';

import UserChatsPage from './UserChatsPage';
import {
  getUi,
  getUsername,
  getIsLoggedUser,
  getUserId,
} from '../../../store/selectors';

const mapStateToProps = state => ({
  getUi,
  currentUsername: getUsername(state),
  currentUserId: getUserId(state),
  isLogged: getIsLoggedUser(state),
});

// const mapDispatchToProps = dispatch => ({
//   loadAdvertDetail: id => dispatch(loadAdvertDetail(id)),
//   onDelete: advertId => dispatch(deleteAdvert(advertId)),
// });
export default connect(mapStateToProps)(UserChatsPage);
