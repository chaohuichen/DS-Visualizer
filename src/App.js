import React from 'react';
import './App.css';

import 'bootstrap/dist/css/bootstrap.min.css';
import { StylesProvider } from '@material-ui/core/styles';
import styles from './buttonStyle.module.css';

import D3Tree from './D3Tree';
function App() {
  return (
    <StylesProvider injectFirst>
      <D3Tree />
    </StylesProvider>
  );
}

export default App;
