import React from 'react';
import List from '../../components/List';

const entriesData = window.__data__;

const mountPoint = document.getElementById('mount-point');

const list = <List entries={entriesData} />;

React.render(list, mountPoint);
