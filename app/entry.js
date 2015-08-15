import React from 'react';
import Router, {HistoryLocation} from 'react-router';
import routes from './routes';

const mountPoint = document.getElementById('mount-point');

import createStore from './store';

Router.run(routes, HistoryLocation, (Root) => {
  React.render(<Root store={createStore()} />, mountPoint);
});
