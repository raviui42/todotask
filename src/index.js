import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import { store } from './store';
import './assets/css/global.scss';
import Dashboard from './containers/Dashboard/Dashboard';

const App = () => (
  <Provider store={store}>
    <Dashboard />
  </Provider>
);

ReactDOM.render(<App />, document.getElementById('app'));
