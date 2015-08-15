import React from 'react';
import {Route, DefaultRoute} from 'react-router';

import App from './views/App';
import Entry from './views/Entry';
import Index from './views/Index';

const routes = (
  <Route handler={App}>
    <DefaultRoute name="index" handler={Index} />
    <Route name="entry" path="entries/:slug/" handler={Entry} />
  </Route>
);

export default routes;
