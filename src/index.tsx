import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import GlobalStyles from './global/GlobalStyles';
import { BrowserRouter } from 'react-router-dom';

const root: ReactDOM.Root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
    <React.StrictMode>
        <GlobalStyles>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </GlobalStyles>
    </React.StrictMode>,
);
