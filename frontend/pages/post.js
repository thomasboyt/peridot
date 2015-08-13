import React from 'react';
import Post from '__PROJECT__/components/pages/Post';

const mountPoint = document.getElementById('mount-point');

React.render((
  <Post {...window.__data__.post} />
), mountPoint);
