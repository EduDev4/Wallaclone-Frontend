import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Radio, Input, InputNumber, Button, Alert } from 'antd';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';

import SelectTags from '../../shared/SelectTags';
import FileImageLoad from '../../shared/FileImageLoad';
import MainLayout from '../../layout/MainLayout';
import useForm from '../../../hooks/useForm';

import './NewAdvertPage.css';

const NewAdvertPage = ({
  mode,
  initialForm,
  onCreate,
  onUpdate,
  loading,
  error,
}) => {
  const { t } = useTranslation(['newadvertpage']);
  const { id } = useParams();
  const { TextArea } = Input;
  const [result, setResult] = useState(null);
  const [form, onChange] = useForm(initialForm);

  const handleSubmit = async ev => {
    ev.preventDefault();
    setResult(null);

    const formData = new FormData();
    Object.keys(form).forEach(key => {
      if (key !== 'file' && key !== 'image') {
        if (key === 'tags') form[key].forEach(val => formData.append(key, val));
        else formData.append(key, form[key]);
      }
    });

    if (form.file) formData.append('image', form.file);

    if (mode === 'new') {
      await onCreate(formData);
      setResult({ type: 'success', message: t('Anuncio Creado!') });
    } else if (mode === 'edit') {
      await onUpdate(id, formData);
      setResult({ type: 'success', message: t('Anuncio Editado!') });
    }
  };

  const canSubmit = () => {
    if (mode === 'new') return !loading && form.name && form.price;
    const canSub = JSON.stringify(form) !== JSON.stringify(initialForm);
    return !loading && canSub;
  };

  return (
    <MainLayout
      title={mode === 'edit' ? t('Editar Anuncio') : t('Nuevo Anuncio')}
    >
      <div className="newAdvertPage">
        <form className="newad-form" onSubmit={handleSubmit}>
          <div className="fields-container">
            <div className="field-group">
              <div className="form-field">
                <Input
                  name="name"
                  placeholder={t('Nombre')}
                  onChange={onChange}
                  value={form.name}
                />
              </div>
              <div className="form-field">
                <span className="form-field--label">{t('Precio')}: </span>
                <InputNumber
                  name="price"
                  onChange={value => {
                    onChange({ target: { value, name: 'price' } });
                  }}
                  min={0}
                  max={20000}
                  value={form.price}
                />
              </div>
              <div className="form-field">
                <span className="form-field--label">{t('Tipo')}: </span>
                <Radio.Group name="sale" onChange={onChange} value={form.sale}>
                  <Radio value>{t('Venta')}</Radio>
                  <Radio value={false}>{t('Compra')}</Radio>
                </Radio.Group>
              </div>
              <div className="form-field">
                <SelectTags
                  defaultTags={form.tags}
                  placeholder={t('Selecciona tags')}
                  onChange={onChange}
                />
              </div>
              <div className="form-field">
                <TextArea
                  name="description"
                  placeholder={t('Descripción')}
                  rows={4}
                  onChange={onChange}
                  style={{ resize: 'none' }}
                  value={form.description}
                />
              </div>
            </div>
            <div className="form-field-image centered">
              <FileImageLoad
                label={t('Selecciona una imagen')}
                imgUrl={form.image}
                onFileSelect={file => {
                  form.file = file;
                }}
              />
            </div>
          </div>
          <div className="button">
            <Button
              htmlType="submit"
              className="button"
              type="primary"
              disabled={!canSubmit()}
            >
              {mode === 'edit' ? t('Editar') : t('Crear')}
            </Button>
          </div>
        </form>
      </div>
      {error && (
        <div className="message-result">
          <Alert message={error.message} type="error" />
        </div>
      )}
      {result && (
        <div className="message-result">
          <Alert message={result.message} type={result.type} />
        </div>
      )}
    </MainLayout>
  );
};

NewAdvertPage.propTypes = {
  mode: PropTypes.string,
  initialForm: PropTypes.objectOf(PropTypes.any),
  onCreate: PropTypes.func.isRequired,
  onUpdate: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  error: PropTypes.objectOf(PropTypes.any),
};

NewAdvertPage.defaultProps = {
  mode: 'new',
  initialForm: {
    name: '',
    sale: true,
    tags: [],
    price: 0,
    description: '',
    image: '/img/adverts/noAdImage.jpg',
    file: null,
  },
  error: null,
};

export default NewAdvertPage;
