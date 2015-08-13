import React from 'react';
import Post from '../../components/Post';

const mountPoint = document.getElementById('mount-point');

React.render((
  <Post {...window.__data__.post} />
), mountPoint);
