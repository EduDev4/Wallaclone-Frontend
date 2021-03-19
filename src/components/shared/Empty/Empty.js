import React from 'react';

import { useTranslation } from 'react-i18next';

import './Empty.css';

const Empty = () => {
  const { t } = useTranslation(['advertspage']);
  return (
    <div>
      <p>{t('No hay anuncios')}</p>
    </div>
  );
};

export default Empty;
