import React from 'react';
// firebase
// The components
// The customized components
// CSS
// The stores
// The customized hooks
// The constants

import './GlobalStyles.css';

export interface IGlobalStyles {
    children: React.ReactNode;
}

const GlobalStyles: React.FC<IGlobalStyles> = ({ children }) => {
    return <>{children}</>;
};

export default GlobalStyles;
