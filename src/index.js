import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'mobx-react';
import { startRouter } from 'mobx-router';
import * as serviceWorker from './serviceWorker';
import { App } from './App';
import { store, routerStore } from './store';
import { Routes } from './routes';

if (process.env.REACT_APP_EMULATE_WEBVIEW_PRESENCE === 'true') {
    window.AndroidCallback = {
        logout: () => {},
    };
}

startRouter(Routes, routerStore, {
    notfound: () => {
        if (window && !(window.location.href.indexOf(`${process.env.REACT_APP_API_BASE_URL}/user/`) > -1)) {
            routerStore.router.goTo(Routes.notFound);
        }
    },
});

ReactDOM.render(
    <Provider store={routerStore} {...store} className="root">
        <App />
    </Provider>,
    document.getElementById('root'),
);

if (localStorage.getItem('accessToken') || sessionStorage.getItem('accessToken')) {
    store.authorization.fetchCurrentUser();
}

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
