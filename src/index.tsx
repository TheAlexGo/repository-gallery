import React, { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';

import { Provider } from 'react-redux';

import { App } from '@components/App/App';
import { store } from '@store';
import { isDevelopment } from '@utils/app';

import './styles/common.scss';

if (isDevelopment) {
    // eslint-disable-next-line import/no-extraneous-dependencies
    import('@axe-core/react').then(({ default: axe }) => {
        setTimeout(() => {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            axe(React, ReactDOM, 1000);
        }, 1000);
    });
}

const container = document.getElementById('root')!;
const root = ReactDOM.createRoot(container);
root.render(
    <StrictMode>
        <Provider store={store}>
            <App />
        </Provider>
    </StrictMode>,
);
