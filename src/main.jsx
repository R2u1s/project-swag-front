import React from 'react'
import ReactDOM from 'react-dom/client'
// import App from './App.jsx'
import './index.css'
import { RouterProvider } from "react-router-dom";
import { router } from "./App";
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Theme } from './theme/theme';

ReactDOM.createRoot(document.getElementById('root')).render(
/*   <React.StrictMode> */
    <ThemeProvider theme={Theme}>
      <CssBaseline />
      <RouterProvider router={router} />
    </ThemeProvider>
/*   </React.StrictMode> */
)