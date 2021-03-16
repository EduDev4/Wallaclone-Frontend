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

export default connect(mapStateToProps)(UserChatsPage);
