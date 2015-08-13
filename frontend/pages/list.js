import React from 'react';
import List from '../../components/pages/List';

const mountPoint = document.getElementById('mount-point');

React.render((
  <List entries={window.__data__.entries} />
), mountPoint);
