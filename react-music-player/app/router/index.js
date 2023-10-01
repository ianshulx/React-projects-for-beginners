import React from 'react';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import Root from './Root';


render(
    <AppContainer>
        <Root />
    </AppContainer>,
    document.getElementById('root')
);

if (module.hot) {
    module.hot.accept('./Root', () => {
        const NewRoot = require('./Root').default;
        render(
            <AppContainer>
                <NewRoot />
            </AppContainer>,
            document.getElementById('root')
        );
    });
}
