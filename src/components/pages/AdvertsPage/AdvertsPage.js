/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

import { Slider, Input, Button, Radio } from 'antd';
import useForm from '../../../hooks/useForm';

import MainLayout from '../../layout/MainLayout';
import AdvertCard from '../../adverts';
import Spinner from '../../shared/Spinner';
import SelectTags from '../../shared/SelectTags';
import './AdvertsPage.css';

const AdvertsPage = ({ adverts, loading, initialForm, loadAdverts }) => {
  const { t } = useTranslation(['advertspage']);
  // const [filters] = useState();
  const [form, onChange] = useForm(initialForm);

  const handleSubmit = async ev => {
    ev.preventDefault();

    const formData = new FormData();
    Object.keys(form).forEach(key => {
      if (key === 'tags') form[key].forEach(val => formData.append(key, val));
      else formData.append(key, form[key]);
    });
    const searchParams = new URLSearchParams();
    if (form.name) searchParams.append('name', form.name);
    if (form.price) searchParams.append('price', -form.price);
    if (form.sale !== '') searchParams.append('sale', form.sale);
    if (form.sort) searchParams.append('sort', -form.sort);
    if (form.tags.length !== 0) searchParams.append('tags', form.tags);

    await loadAdverts(searchParams.toString());
  };

  useEffect(() => {
    loadAdverts();
  }, []);

  const renderContent = () => {
    if (!adverts) return null;
    return adverts.map(ad => <AdvertCard key={ad._id} {...ad} />);
  };

  return (
    <MainLayout title="Anuncios">
      <div className="advertsPage">
        <div className="grid-container">
          <aside className="advertsPage-aside">
            <form className="filter-form" onSubmit={handleSubmit}>
              <div className="form-title">
                <h3>Busca por:</h3>
              </div>
              <div className="form-field">
                <Input
                  name="name"
                  placeholder={`${t('Nombre del anuncio')}`}
                  onChange={onChange}
                  value={form.name}
                  size="large"
                />
              </div>
              <div className="form-field">
                <span className="form-field--label">{t('Precio')}: </span>
                <Slider
                  min={0}
                  max={6000}
                  onChange={value => {
                    onChange({ target: { value, name: 'price' } });
                  }}
                  value={form.price}
                  size="large"
                />
              </div>

              <div className="form-field">
                <SelectTags
                  defaultTags={form.tags}
                  placeholder={t('Selecciona tags')}
                  onChange={onChange}
                  size="large"
                />
              </div>
              <div className="form-field-type">
                <span className="form-field--label">{t('Tipo')}: </span>
                <Radio.Group name="sale" onChange={onChange} value={form.sale}>
                  <Radio value>{t('Venta')}</Radio>
                  <Radio value={false}>{t('Compra')}</Radio>
                  <Radio value="">{t('Todos')}</Radio>
                </Radio.Group>
              </div>
              <div className="form-field-type">
                <span className="form-field--label">{t('Ordenar')}: </span>
                <Radio.Group name="sort" onChange={onChange} value={form.sort}>
                  <Radio value>{t('Asc')}</Radio>
                  <Radio value={false}>{t('Desc')}</Radio>
                </Radio.Group>
              </div>
              <div className="form-field centered">
                <Button htmlType="submit" type="primary">
                  {t('Buscar')}
                </Button>
              </div>
            </form>
          </aside>
          <div className="advertsPage-content">
            <h2>¿Qué estás buscando?</h2>
            <div className="advertsPage-adswrapper flex-container">
              {loading ? <Spinner /> : renderContent()}
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};
AdvertsPage.propTypes = {
  adverts: PropTypes.arrayOf(PropTypes.object),
  initialForm: PropTypes.objectOf(PropTypes.any),
  loadAdverts: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
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
};

export default AdvertsPage;
