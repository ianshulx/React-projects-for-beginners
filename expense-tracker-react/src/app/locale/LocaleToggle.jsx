import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

import { Button } from 'primereact/button';

import { setItem } from './../../Helpers';

const LocaleToggle = (props) => {

  const [t, i18n] = useTranslation();

  const toggleLanguage = useCallback(() => {
    i18n.language === 'en' ? i18n.changeLanguage('bn') : i18n.changeLanguage('en')
    setItem('language', i18n.language);
  }, [i18n]);

  return (
    <Button type="button" onClick={toggleLanguage}
      label={t('lng')} icon="pi pi-globe"
      className={props.className ? props.className : "p-button-raised p-button-rounded p-button-secondary"}
      style={{ width: '100px' }} />
  );
};

LocaleToggle.propTypes = {
  className: PropTypes.string,
};

export default React.memo(LocaleToggle);
