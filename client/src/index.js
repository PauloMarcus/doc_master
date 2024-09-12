import React from 'react';
import './assets/css/main.css';
import './assets/js/main.js'; 
import 'bootstrap-icons/font/bootstrap-icons.css';
import { App } from './App';
import reportWebVitals from './reportWebVitals';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { GlobalObservable } from 'open-observable';

const container = document.getElementById('root');
const root = createRoot(container);
root.render(
      <GlobalObservable>
            <BrowserRouter>
                  <App />
            </BrowserRouter>
      </GlobalObservable>
);

reportWebVitals();
