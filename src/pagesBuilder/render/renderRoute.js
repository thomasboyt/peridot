import {Promise} from 'es6-promise';

import React from 'react';
import {Router} from 'react-router';
import createMemoryHistory from 'history/lib/createMemoryHistory';
import {Provider} from 'react-redux';

import routes from '../../../app/routes';
import createStore from '../../../app/store';

export default function renderRoute(location, data) {
  const store = createStore(data);

  return React.renderToString(
    <Provider store={store}>
      {() =>
        <Router history={createMemoryHistory()}>
          {routes}
        </Router>
      }
    </Provider>
  );
}
