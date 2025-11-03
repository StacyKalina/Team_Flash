import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { AppRouter } from './routes';
import { Provider } from 'react-redux';
import { store } from './store';
import { ThemeProvider } from './context/ThemeContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <ThemeProvider>
        <Provider store={store}>
            <AppRouter />
        </Provider>
    </ThemeProvider>
);
