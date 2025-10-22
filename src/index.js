import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { AppRouter } from './routes';
import { Provider } from 'react-redux';
import { store } from './store';
import { CartProvider } from './context/CartContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Provider store={store}>
        <CartProvider>
            <AppRouter />
        </CartProvider>
    </Provider>
);
