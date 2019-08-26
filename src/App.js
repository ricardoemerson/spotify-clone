import dotenv from 'dotenv';

import React from 'react';
import { Provider } from 'react-redux';

import './config/reactotron';

import store from './store';

import GlobalStyle from './styles/global';
import Main from './pages/Main';

dotenv.config();

const App = () => (
  <Provider store={ store }>
    <Main />
    <GlobalStyle />
  </Provider>
);

export default App;
