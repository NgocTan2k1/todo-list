import React from 'react';

// firebase
// The components
// The customized components
// CSS
// The stores
// The customized hooks
// The constants

export interface IBaseNewPage {
    tailwindCSS?: string;
    children: React.ReactNode;
}

const BaseNewPage: React.FC<IBaseNewPage> = ({ tailwindCSS, children }) => {
    return <div className={`h-full overflow-hidden bg-[#F9F9F9] ${tailwindCSS}`}> {children}</div>;
};

export default BaseNewPage;
