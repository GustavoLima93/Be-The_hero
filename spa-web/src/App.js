import React from 'react';
import GlobalStyle from './styles/global';
import { ToastContainer } from 'react-toastify';

import Routes from './routes';

function App() {
  return (
    <>
      <Routes />
      <GlobalStyle />
      <ToastContainer autoClose={4000} />
    </>
  );
}

export default App;
