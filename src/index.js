require('regenerator-runtime/runtime');

import { requestDOMPermit } from '@abcnews/env-utils'
import React from 'react';
import { render } from 'react-dom';
import App from './components/App';
import { prepare } from './utils';

function init() {
  prepare(mountNode => {
    render(<App />, mountNode);
  });
}

requestDOMPermit('page').then(init);
