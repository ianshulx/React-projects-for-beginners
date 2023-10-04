import React from 'react';
import { Helmet } from 'react-helmet';

import { Provider } from './Store';
import Routes from './Routes';

import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import './extra/nova-light.css';
import 'primeflex/primeflex.css';
import '@fullcalendar/core/main.css';
import '@fullcalendar/daygrid/main.css';
import '@fullcalendar/timegrid/main.css';
import '@fullcalendar/list/main.css';
import './extra/layout.css'; // Sigma theme from primereact
import './extra/blueberry-orange.css'; // Custom theme made by me
import './App.css'; // Is for testing CSS

const app_name = process.env.REACT_APP_APP_NAME;

const App = () => (
  <Provider>
    <Helmet
      defaultTitle={app_name}
      titleTemplate={`%s | ${app_name}`}
      meta={[
        { name: 'title', content: 'Expense Tracker - Track and manage your expenses on the go' },
        { name: 'description', content: 'Expense Tracker - Track and manage your expenses on the go' },
        {
          name: 'keywords',
          content: 'expense,tracker,expense-tracker'
        },
        { name: 'og:url', content: 'domain' },
        { property: 'og:image', content: 'public_image_url' }
      ]}
    />
    <Routes />
  </Provider>
);

export default App;
