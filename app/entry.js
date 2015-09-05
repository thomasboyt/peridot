// Polyfills window.fetch
import 'whatwg-fetch';

import React from 'react';
import Router, {HistoryLocation} from 'react-router';
import {Provider} from 'react-redux';

import createStore from './store';
import routes from './routes';

/* global __PROJECT__ */
require(__PROJECT__ + '/app/frontendEntry');

const mountPoint = document.getElementById('mount-point');

const store = createStore(window.__data__);

Router.run(routes, HistoryLocation, (Root, routerState) => {
  React.render((
    <Provider store={store}>
      {() => <Root routerState={routerState} />}
    </Provider>
  ), mountPoint);
});
