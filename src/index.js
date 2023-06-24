import React from 'react';
import ReactDOM from 'react-dom/client';
import {ChakraProvider, theme}from "@chakra-ui/react"

import App from './App';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode theme={theme}>
    <ChakraProvider>
    <App />
    </ChakraProvider>
  </React.StrictMode>
);

export const server=`https://api.coingecko.com/api/v3`

//`https://api.coingecko.com/api/v3/coins/markets?vs_currency=inc&orer=market_cap_desc&per_page=100&page=1&sparkline=false`