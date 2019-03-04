require('@babel/polyfill');

import React from 'react';
import { render } from 'react-dom';
import App from './components/App';
import { prepare } from './utils';

function init() {
  prepare(mountNode => {
    render(<App />, mountNode);
  });
}

init();
