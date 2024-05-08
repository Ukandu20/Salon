import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';
import reportWebVitals from './reportWebVitals';




const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
        <ChakraProvider resetCSS={false} disableGlobalStyle={true}> 
          <App />
        </ChakraProvider>
    </BrowserRouter>
  </React.StrictMode>
);

reportWebVitals();
