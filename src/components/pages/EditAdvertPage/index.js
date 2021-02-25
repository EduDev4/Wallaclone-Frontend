import { connect } from 'react-redux';

import EditAdvertPage from './EditAdvertPage';

import { getAdvertDetail } from '../../../store/selectors';

const mapStateToProps = state => ({
  advert: getAdvertDetail(state),
});

export default connect(mapStateToProps)(EditAdvertPage);
