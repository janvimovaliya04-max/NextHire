import { HelmetProvider } from 'react-helmet-async';
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

import { ThemeProvider } from "./context/ThemeContext";
import { CandidateProvider } from "./context/CandidateContext";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <HelmetProvider>
    <React.StrictMode>
      <ThemeProvider>
        <CandidateProvider>
          <App />
          <ToastContainer
            position="top-right"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop
            closeOnClick
            pauseOnHover
            draggable
            theme="colored"
            limit={3}
          />
        </CandidateProvider>
      </ThemeProvider>
    </React.StrictMode>
  </HelmetProvider>

);