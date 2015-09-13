// Polyfills window.fetch
import 'whatwg-fetch';

import React from 'react';
import {Router} from 'react-router';
import createBrowserHistory from 'history/lib/createBrowserHistory';
import {Provider} from 'react-redux';

import createStore from './store';
import routes from './routes';

/* global __PROJECT__ */
require(__PROJECT__ + '/app/frontendEntry');

const mountPoint = document.getElementById('mount-point');

const store = createStore(window.__data__);

const history = createBrowserHistory();

React.render((
  <Provider store={store}>
    {() =>
      <Router history={history}>
        {routes}
      </Router>
    }
  </Provider>
), mountPoint);
