import React from 'react';
import {Route, IndexRoute} from 'react-router';

import App from './views/App';
import Entry from './views/Entry';
import Index from './views/Index';

const routes = (
  <Route path="/" component={App}>
    <IndexRoute component={Index} />
    <Route path="/entries/:slug/" component={Entry} />
  </Route>
);

export default routes;
