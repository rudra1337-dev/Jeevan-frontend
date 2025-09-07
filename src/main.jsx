//bootstrap css and js
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';


import { AuthProvider } from "./context/authContext";


import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { HashRouter } from "react-router-dom";


import {BrowserRouter} from "react-router-dom";

createRoot(document.getElementById('root')).render(
  <StrictMode>
     <AuthProvider>
      <HashRouter>
        <App />
      </HashRouter>
     </AuthProvider>
  </StrictMode>,
)





