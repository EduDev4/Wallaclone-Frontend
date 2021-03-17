/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import ReactPaginate from 'react-paginate';
import MainLayout from '../../layout/MainLayout';
import AdvertCard from '../../adverts';
import Spinner from '../../shared/Spinner';
import './AdvertsPage.css';

import FiltersForm from '../../shared/FiltersForm';

const AdvertsPage = ({ adverts, pages, loading, loadAdverts, location }) => {
  const { t } = useTranslation(['advertspage']);

  const querySearch = location.search.substring(1);

  const [pageCount] = useState(pages);

  const handlePageClick = async e => {
    const selectedPage = e.selected;
    const selectAdverts = new URLSearchParams();
    const start = selectedPage + 1;
    selectAdverts.append('start', start);
    await loadAdverts(selectAdverts.toString());
  };

  const handleSubmit = async params => {
    await loadAdverts(params);
  };

  useEffect(() => {
    loadAdverts(querySearch);
  }, [querySearch]);

  const renderContent = () => {
    if (!adverts) return null;
    return adverts.map(ad => <AdvertCard key={ad._id} {...ad} />);
  };

  return (
    <MainLayout title={t('Anuncios')}>
      <div className="advertsPage">
        <div className="grid-container">
          <aside className="advertsPage-aside">
            <FiltersForm onSubmit={handleSubmit} />
          </aside>
          <div className="advertsPage-content">
            <h2>{t('¿Qué estás buscando?')}</h2>
            <div className="advertsPage-adswrapper flex-container">
              {loading ? <Spinner /> : renderContent()}
            </div>
            <ReactPaginate
              previousLabel="<<"
              nextLabel=">>"
              breakLabel="..."
              breakClassName="break-me"
              pageCount={pageCount}
              marginPagesDisplayed={2}
              pageRangeDisplayed={5}
              onPageChange={handlePageClick}
              containerClassName="pagination"
              subContainerClassName="pages pagination"
              activeClassName="active"
            />
          </div>
        </div>
      </div>
    </MainLayout>
  );
};
AdvertsPage.propTypes = {
  adverts: PropTypes.arrayOf(PropTypes.object),
  pages: PropTypes.number.isRequired,
  initialForm: PropTypes.objectOf(PropTypes.any),
  loadAdverts: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  location: PropTypes.shape({
    search: PropTypes.string,
  }),
};

AdvertsPage.defaultProps = {
  adverts: null,
  initialForm: {
    name: '',
    sale: '',
    tags: [],
    price: 0,
    sort: false,
  },
  location: PropTypes.shape({
    search: '',
  }),
};

export default AdvertsPage;
