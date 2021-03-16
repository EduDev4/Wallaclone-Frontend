import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link, useLocation, useRouteMatch } from 'react-router-dom';
import { Button } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';

import ConfirmButton from '../../shared/ConfirmButton';
import FiltersForm from '../../shared/FiltersForm';

import {
  getUi,
  getUsername,
  getUserEmail,
  getIsLoggedUser,
} from '../../../store/selectors';

import './UserPage.css';
import { deleteUser } from '../../../store/actions/user-actions';
import { loadAdverts } from '../../../store/actions/adverts-actions';

function UserPageAside({
  loading,
  error,
  currentUsername,
  currentUserEmail,
  isLogged,
  user,
  onDeleteUser,
  onLoadAdverts,
}) {
  const { t } = useTranslation(['userpage']);

  const { url } = useRouteMatch();
  const classAdverts =
    url.includes('favs') || url.includes('reserved') || url.includes('sold')
      ? 'tab innactive'
      : 'tab active';
  const classReserved = url.includes('reserved')
    ? 'tab active'
    : 'tab innactive';
  const classFavourites = url.includes('favs') ? 'tab active' : 'tab innactive';
  const classSold = url.includes('sold') ? 'tab active' : 'tab innactive';

  const handleSubmit = params => {
    onLoadAdverts(`username=${user}&${params}`);
  };
  return (
    <>
      <span className="username">{user}</span>

      {isLogged && currentUsername === user ? (
        <>
          <p>{currentUserEmail}</p>

          <Link className="edit-link" to={`/user/edit/${currentUsername}`}>
            <Button type="primary" className="edit-button">
              {t('Editar mis datos')}
              <EditOutlined className="site-form-item-icon" />
            </Button>
          </Link>

          <Link className="tab active adverts" to={`/user/${currentUsername}`}>
            {t('Anuncios')}
          </Link>

          <Link
            className={classReserved}
            to={`/user/${currentUsername}/reserved`}
          >
            {t('Reservados')}
          </Link>

          <Link
            className={classFavourites}
            to={`/user/${currentUsername}/favs`}
          >
            {t('Favoritos')}
          </Link>

          <Link
            className="tab innactive sold"
            to={`/user/${currentUsername}/sold`}
          >
            {t('Vendidos')}
          </Link>

          <ConfirmButton
            className="delete-button"
            acceptAction={() => onDeleteUser()}
            confirmProps={{
              title: t('Eliminar Cuenta de Usuario'),
              message: t('¿Estás seguro de eliminar tu cuenta?'),
            }}
            typeButton="dashed"
            danger
            icon={<DeleteOutlined className="site-form-item-icon" />}
          >
            {t('Eliminar Cuenta')}
          </ConfirmButton>
        </>
      ) : (
        <FiltersForm onSubmit={handleSubmit} />
      )}
    </>
  );
}

UserPageAside.propTypes = {
  user: PropTypes.string.isRequired,
  loading: PropTypes.bool,
  error: PropTypes.bool,
  currentUsername: PropTypes.string,
  currentUserEmail: PropTypes.string,
  isLogged: PropTypes.bool,
  onDeleteUser: PropTypes.func.isRequired,
  onLoadAdverts: PropTypes.func.isRequired,
};

UserPageAside.defaultProps = {
  loading: false,
  error: null,
  currentUsername: '',
  currentUserEmail: '',
  isLogged: false,
};

const mapStateToProps = state => ({
  getUi,
  currentUsername: getUsername(state),
  currentUserEmail: getUserEmail(state),
  isLogged: getIsLoggedUser(state),
});

const mapDispatchToProps = {
  onDeleteUser: deleteUser,
  onLoadAdverts: form => loadAdverts(form),
};

const ConnectedUserPageAside = connect(
  mapStateToProps,
  mapDispatchToProps,
)(UserPageAside);
export default ConnectedUserPageAside;
