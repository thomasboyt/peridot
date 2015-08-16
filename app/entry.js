import React from 'react';
import Router, {HistoryLocation} from 'react-router';

import routes from './routes';

const mountPoint = document.getElementById('mount-point');

import createStore from './store';
import {Provider} from 'react-redux';

Router.run(routes, HistoryLocation, (Root, routerState) => {
  React.render((
    <Provider store={createStore(window.__data__)}>
      {() => <Root routerState={routerState} />}
    </Provider>
  ), mountPoint);
});
