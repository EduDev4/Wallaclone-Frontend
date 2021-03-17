import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

import { Slider, Input, Button, Radio } from 'antd';

import useForm from '../../../hooks/useForm';

import SelectTags from '../SelectTags';

const FiltersForm = ({ onSubmit, initialForm, advert }) => {
  const { t } = useTranslation(['advertspage']);
  const [form, onChange] = useForm(initialForm);

  const handleSubmit = event => {
    event.preventDefault();

    const formData = new FormData();
    Object.keys(form).forEach(key => {
      if (key === 'tags') form[key].forEach(val => formData.append(key, val));
      else formData.append(key, form[key]);
    });
    const searchParams = new URLSearchParams();
    if (form.name) searchParams.append('name', form.name);
    if (form.price) searchParams.append('price', -form.price);
    if (form.sale !== '') searchParams.append('sale', form.sale);
    if (form.sort) searchParams.append('sort', '-createdAt');
    if (form.tags.length !== 0) searchParams.append('tags', form.tags);
    onSubmit(searchParams.toString());
  };

  return (
    <form className="filter-form" onSubmit={handleSubmit}>
      <div className="form-title">
        <h3>{t('Busca por')}</h3>
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
          placeholder={t('Etiquetas')}
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
          <Radio value>{t('Descendente')}</Radio>
          <Radio value={false}>{t('Ascendente')}</Radio>
        </Radio.Group>
      </div>
      <div className="form-field centered">
        <Button htmlType="submit" type="primary">
          {t('Buscar')}
        </Button>
      </div>
    </form>
  );
};

FiltersForm.propTypes = {
  initialForm: PropTypes.objectOf(PropTypes.any),
  onSubmit: PropTypes.func.isRequired,
  advert: PropTypes.objectOf(PropTypes.any),
};

FiltersForm.defaultProps = {
  initialForm: {
    name: '',
    sale: '',
    tags: [],
    price: 0,
    sort: false,
  },
  advert: {},
};

export default FiltersForm;
