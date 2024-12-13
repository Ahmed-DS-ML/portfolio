import React from "react";
import ReactDOM from "react-dom/client";
import { 
  BrowserRouter, 
  createBrowserRouter,
  RouterProvider 
} from "react-router-dom";
import App from "./App.jsx";
import "./index.css";

// Configure React Router with v7 features
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    future: {
      v7_startTransition: true,
      v7_relativeSplatPath: true
    }
  }
]);

// Register Service Worker
if ("serviceWorker" in navigator && import.meta.env.PROD) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("/sw.js")
      .then((registration) => {
        console.log("ServiceWorker registration successful:", registration.scope);
      })
      .catch((error) => {
        console.log("ServiceWorker registration failed:", error);
      });
  });
}

const rootElement = document.getElementById("root");
if (!rootElement) {
  throw new Error(
    "Root element not found. Please check if the element with id 'root' exists in your HTML."
  );
}

ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
