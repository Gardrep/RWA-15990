import React from 'react';
import { render } from 'react-dom';

import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import configureStore from './redux/store/configure-store';

const store = configureStore();
render(
  <div>
    <Provider store={store}>
      <App />  
    </Provider>
  </div>,
  document.getElementById('root')
)
