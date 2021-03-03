import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { setLocaleLanguageHeader } from '../../../api/client';

import './LangButton.css';

const LangButton = ({ initialLang }) => {
  const [lang, setLang] = useState(initialLang);
  const { i18n } = useTranslation();

  const changeLanguage = language => {
    setLang(language);
    setLocaleLanguageHeader(language);
    i18n.changeLanguage(language);
  };

  const renderContent = () => (
    <img
      className="flag-icon"
      src={
        lang === 'es'
          ? `${process.env.REACT_APP_PUBLIC_URL}/icons/lang-spanish-menu-60.png`
          : `${process.env.REACT_APP_PUBLIC_URL}/icons/lang-english-menu-60.png`
      }
      alt={lang === 'es' ? 'Spanish' : 'English'}
    />
  );

  return (
    <button
      type="button"
      className="flags-wrapper"
      onClick={() => {
        if (i18n.language === 'es') changeLanguage('en');
        else changeLanguage('es');
      }}
    >
      {renderContent()}
    </button>
  );
};

LangButton.propTypes = {
  initialLang: PropTypes.string,
};

LangButton.defaultProps = {
  initialLang: 'es',
};

export default LangButton;