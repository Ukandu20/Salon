import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';
import { NextUIProvider } from '@nextui-org/react';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <NextUIProvider>
        <ChakraProvider resetCSS={false} disableGlobalStyle={true}> 
          <App />
        </ChakraProvider>
      </NextUIProvider>
    </BrowserRouter>
  </React.StrictMode>
);

reportWebVitals();
