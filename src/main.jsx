import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import App from './App.jsx';
import { I18nProvider } from './i18n/I18nProvider.jsx';
import './index.css';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import 'react-pdf/dist/esm/Page/TextLayer.css';

const router = createBrowserRouter([
  {
    path: '*',
    element: (
      <I18nProvider>
        <App />
      </I18nProvider>
    ),
    future: {
      v7_startTransition: true,
      v7_relativeSplatPath: true,
    },
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <HelmetProvider>
      <RouterProvider router={router} />
    </HelmetProvider>
  </React.StrictMode>
);
