import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import { getStoredState, persistStore } from 'redux-persist';
import { createBrowserHistory } from 'history';
import localForage from 'localforage';
import registerServiceWorker from 'registerServiceWorker';
import configureStore from 'store/configureStore';
import routes from 'routes.jsx';
import listData from 'mocks/list.json';
import './index.scss';

const persistConfig = {
  storage: localForage,
  whitelist: ['movie']
};

getStoredState(persistConfig).then((restoredState) => {

  if(!restoredState.movie) {
    restoredState = {
      movie: {
        list: listData,
        item: {}
      }
    };
  }

  const history = createBrowserHistory();
  const store = configureStore(restoredState, history);

  persistStore(store, persistConfig);

  render(
    <Provider store={store}>
      <ConnectedRouter history={history} children={routes} />
    </Provider>,
    document.getElementById('root')
  );

  registerServiceWorker();
});
