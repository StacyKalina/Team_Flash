import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css'
import { AppRoutes } from './routes';
import { CartProvider } from './context/CartContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <CartProvider>
        <AppRoutes />
    </CartProvider>
);
