import React from 'react';
import Post from '../../components/Post';

const postData = window.__data__.post;

const mountPoint = document.getElementById('mount-point');

const post = <Post {...postData} />;

React.render(post, mountPoint);
