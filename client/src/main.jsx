import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './App.css'
import './index.css'
import { CartProvider } from './context/CartContext.jsx'
import { Toaster } from 'react-hot-toast'





ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <CartProvider>
      <Toaster
        containerStyle={{
          zIndex: 10000,
        }}
      // Controls the order of toasts
      />
      <App />
    </CartProvider>
  </React.StrictMode>,
)
