import React from 'react';
//import ReactDOM from 'react-dom';
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

//import * as serviceWorker from './serviceWorker';
//serviceWorker.unregister();
