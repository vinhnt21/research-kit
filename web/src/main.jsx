import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

window.__RK_BUILD__ = typeof __APP_BUILD_TIME__ !== 'undefined' ? __APP_BUILD_TIME__ : '1.0.1';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
