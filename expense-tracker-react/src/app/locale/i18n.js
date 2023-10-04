import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import { getItem } from './../../Helpers';

import bn from './translations/bn';
import en from './translations/en';

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources: {
      en: en,
      bn: bn
    },
    lng: getItem('language') ? getItem('language') : 'en',
    keySeparator: false, // we do not use keys in form messages.welcome
    interpolation: {
      escapeValue: false // react already safes from xss
    }
  });

export default i18n;
