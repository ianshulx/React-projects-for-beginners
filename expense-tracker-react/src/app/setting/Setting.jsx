import React, { useState, useCallback } from 'react';
import { Helmet } from 'react-helmet';
import { useTranslation } from 'react-i18next';

import { Messages } from 'primereact/messages';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';

import CurrencySidebar from './../common/CurrencySidebar';

import { currencyApiEndpoints } from './../../API';
import axios from './../../Axios';
import { setItem } from './../../Helpers';
import { useTracked } from './../../Store';

let messages; // For alert message

const Setting = (props) => {

  const [state, setState] = useTracked();
  const [visible, setVisible] = useState(false);
  const [t, i18n] = useTranslation();

  const toggleLanguage = useCallback(() => {
    i18n.language === 'en' ? i18n.changeLanguage('bn') : i18n.changeLanguage('en');
    setItem('language', i18n.language);
  }, [i18n]);

  const submitSetting = () => {
    axios.put(currencyApiEndpoints.currency + '/' + state.user.id, JSON.stringify({ currency_id: state.currentCurrency.id }))
      .then(response => {
        console.log('success', response.data);

        if (response.status === 200) {

          setState(prev => ({ ...prev, currency_id: response.data.request.currency_id }));

          messages.show({
            severity: 'success',
            detail: 'Current currency set to ' + state.currentCurrency.currency_code + ' (' + state.currentCurrency.currency_name + ').',
            sticky: false,
            closable: false,
            life: 5000
          });
        }

      })
      .catch(error => {
        console.log('error');
        console.log(error.response);

        if (error.response.status === 401) {
          messages.clear();
          messages.show({
            severity: 'error',
            detail: 'Something went wrong. Try again.',
            sticky: true,
            closable: true,
            life: 5000
          });
        }

        if (error.response.status === 422) {
          messages.clear();
          messages.show({
            severity: 'error',
            detail: 'Currency is same as selected. Nothing changed.',
            sticky: true,
            closable: true,
            life: 5000
          });
        }

      })
  };

  return (
    <div>
      <Helmet title="Settings" />

      <CurrencySidebar visible={visible} onHide={(e) => setVisible(false)} />

      <div className="p-grid p-nogutter">
        <div className="p-col-12">
          <div className="p-fluid">
            <Messages ref={(el) => messages = el} />
          </div>
        </div>
      </div>

      <div className="p-grid">

        <div className="p-col-12 p-md-6">
          <Card className="rounded-border">
            <div>
              <div className="p-card-title p-grid p-nogutter p-justify-between">App Settings</div>
              <div className="p-card-subtitle">Below are the current setup for this app.</div>
            </div>
            <br />
            <div className="p-grid p-nogutter p-justify-between">
              <h3 className="color-title p-col-4">
                Current Currency:
                </h3>
              <h3 className="color-highlight p-col-4">
                {state.currencies.length === 0 ? 'loading' : state.currentCurrency.currency_code + ' (' + state.currentCurrency.currency_name + ')'}
              </h3>
              <h3>
                <Button label="Change" icon="pi pi-refresh"
                  className="p-button-rounded p-button-raised p-button-secondary" type="button"
                  onClick={(e) => setVisible(true)} />
              </h3>
            </div>

            <div className="p-card-footer p-fluid">
              <Button label="Update" className="" icon="pi pi-save" onClick={() => submitSetting()} />
            </div>
          </Card>
        </div>

        <div className="p-col-12 p-md-6">
          <Card className="rounded-border">
            <div>
              <div className="p-card-title p-grid p-nogutter p-justify-between">Interface Setting</div>
              <div className="p-card-subtitle">Below are the current setup for this UI.</div>
            </div>
            <br />
            <div className="p-grid p-nogutter p-justify-between">
              <h3 className="color-title p-col-4">
                Menu Color:
                </h3>
              <h3 className="color-highlight p-col-4">
                {state.layoutColorMode === 'dark' ? 'Dark' : 'Light'}
              </h3>
              <h3>
                <Button label="Toggle" icon="pi pi-refresh"
                  className="p-button-rounded p-button-raised p-button-secondary"
                  type="button"
                  onClick={(e) => {
                    state.layoutColorMode === 'dark' ? setState(prev => ({ ...prev, layoutColorMode: 'light' })) : setState(prev => ({ ...prev, layoutColorMode: 'dark' }))
                  }} />
              </h3>
            </div>
            <div className="p-grid p-nogutter p-justify-between">
              <h3 className="color-title p-col-4">
                Menu Mode:
                </h3>
              <h3 className="color-highlight p-col-4">
                {state.layoutMode === 'static' ? 'Static' : 'Overlay'}
              </h3>
              <h3>
                <Button label="Toggle" icon="pi pi-refresh"
                  className="p-button-rounded p-button-raised p-button-secondary"
                  type="button"
                  onClick={(e) => {
                    state.layoutMode === 'static' ? setState(prev => ({ ...prev, layoutMode: 'overlay' })) : setState(prev => ({ ...prev, layoutMode: 'static' }))
                  }} />
              </h3>
            </div>
            <div className="p-grid p-nogutter p-justify-between">
              <h3 className="color-title p-col-4">
                Language:
                </h3>
              <h3 className="color-highlight p-col-4">
                {i18n.language === 'en' ? 'English' : 'বাংলা'}
              </h3>
              <h3>
                <Button label="Toggle" icon="pi pi-refresh"
                  className="p-button-rounded p-button-raised p-button-secondary"
                  type="button"
                  onClick={(e) => toggleLanguage()} />
              </h3>
            </div>
          </Card>
        </div>

      </div>
    </div>

  )
}

export default React.memo(Setting);
