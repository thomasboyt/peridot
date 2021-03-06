import {Promise} from 'es6-promise';

import React from 'react';
import Router from 'react-router';
import {Provider} from 'react-redux';

import routes from '../../../app/routes';
import createStore from '../../../app/store';

export default function renderRoute(location, data) {
  const store = createStore(data);

  return new Promise((resolve/*, reject*/) => {
    Router.run(routes, location, (Root, routerState) => {

      const out = React.renderToString(
        <Provider store={store}>
          {() => <Root routerState={routerState} />}
        </Provider>
      );

      resolve(out);
    });
  });
}

