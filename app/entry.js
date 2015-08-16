import React from 'react';
import Router, {HistoryLocation} from 'react-router';
import {Provider} from 'react-redux';

import createStore from './store';
import routes from './routes';

const mountPoint = document.getElementById('mount-point');

Router.run(routes, HistoryLocation, (Root, routerState) => {
  React.render((
    <Provider store={createStore(window.__data__)}>
      {() => <Root routerState={routerState} />}
    </Provider>
  ), mountPoint);
});
