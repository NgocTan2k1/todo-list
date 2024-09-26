import React from 'react';

export const loaderLoginPage = async (): Promise<Response | string> => {
    return await 'loaderLoginPage';
};

const LoginPage: React.FC = () => {
    return <div> Login Page</div>;
};

export default LoginPage;
