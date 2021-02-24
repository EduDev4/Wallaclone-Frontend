import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Radio, Input, InputNumber, Button, Alert } from 'antd';
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
  const { id } = useParams();
  const { TextArea } = Input;
  const [result, setResult] = useState(null);
  const [form, onChange] = useForm(initialForm);

  const handleSubmit = ev => {
    ev.preventDefault();

    const formData = new FormData();
    Object.keys(form).forEach(key => {
      if (key !== 'file') {
        if (key === 'tags') form[key].forEach(val => formData.append(key, val));
        else formData.append(key, form[key]);
      }
    });

    if (form.file) formData.append('image', form.file);

    if (mode === 'new') {
      onCreate(formData);
    } else if (mode === 'edit') {
      onUpdate(id, formData);
    }
  };

  return (
    <MainLayout title={mode === 'edit' ? 'Edit Advert' : 'New Advert'}>
      <div className="newAdvertPage">
        <form className="newad-form" onSubmit={handleSubmit}>
          <div className="fields-container">
            <div className="field-group">
              <div className="form-field">
                <Input name="name" placeholder="Nombre" onChange={onChange} />
              </div>
              <div className="form-field">
                <span className="form-field--label">Precio: </span>
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
                <span className="form-field--label">Tipo: </span>
                <Radio.Group name="sale" onChange={onChange} value={form.sale}>
                  <Radio value>Sale</Radio>
                  <Radio value={false}>Buy</Radio>
                </Radio.Group>
              </div>
              <div className="form-field">
                <SelectTags
                  defaultTags={form.tags}
                  placeholder="Select tags"
                  onChange={onChange}
                />
              </div>
              <div className="form-field">
                <TextArea
                  name="description"
                  placeholder="Descripción"
                  rows={5}
                  onChange={onChange}
                />
              </div>
            </div>
            <div className="form-field-image centered">
              <FileImageLoad
                label="Select a single image file"
                onFileSelect={file => {
                  form.file = file;
                }}
              />
            </div>
          </div>
          <div className="button">
            <Button htmlType="submit" className="button" type="primary">
              {mode === 'edit' ? 'Editar' : 'Crear'}
            </Button>
          </div>
        </form>
      </div>
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
  error: PropTypes.objectOf(PropTypes.any).isRequired,
};

NewAdvertPage.defaultProps = {
  mode: 'new',
  initialForm: {
    name: '',
    sale: true,
    tags: [],
    price: 0,
    description: '',
    file: null,
  },
};

export default NewAdvertPage;
