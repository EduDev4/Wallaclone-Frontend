import React from 'react';
import PropTypes from 'prop-types';
import { Select, Slider, Input, Button } from 'antd';

import MainLayout from '../../layout/MainLayout';

import './AdvertsPage.css';

const AdvertsPage = () => {
  const { Option } = Select;
  const tags = ['electronics', 'sports', 'cars', 'hobbies'];
  return (
    <MainLayout title="Adverts">
      <div className="advertsPage">
        <aside className="advertsPage-aside">
          <form className="filter-form">
            <div className="form-title">
              <h3>Busca por:</h3>
            </div>
            <div className="form-field">
              <Input placeholder="Nombre" />
            </div>
            <div className="form-field">
              <span className="form-field--label">Precio: </span>
              <Slider range min={0} max={20000} />
            </div>

            <div className="form-field">
              <Select mode="tags" style={{ width: '100%' }} placeholder="Tags">
                {tags && tags.map(tag => <Option key={tag}>{tag}</Option>)}
              </Select>
            </div>
            <div className="form-field centered">
              <Button type="primary">Filter</Button>
            </div>
          </form>
        </aside>
        <div className="advertsPage-content">
          <h2>Qué estás buscando?</h2>
          <div className="advertsPage-adswrapper">
            <div className="advert-card" />
            <div className="advert-card" />
            <div className="advert-card" />
            <div className="advert-card" />
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default AdvertsPage;
