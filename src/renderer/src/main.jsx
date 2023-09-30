import React from 'react'
import ReactDOM from 'react-dom/client'
import './assets/index.css'
import 'bootstrap/dist/js/bootstrap.min.js'
import { HashRouter } from 'react-router-dom'
import Router from './router/Router'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <HashRouter>
      <Router />
    </HashRouter>
  </React.StrictMode>
)
