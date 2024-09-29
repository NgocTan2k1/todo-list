import React from 'react';

export const loaderSignInPage = async (): Promise<Response | string> => {
    return await 'loaderSignInPage';
};

const SignInPage: React.FC = () => {
    return <div> SignIn Page</div>;
};

export default SignInPage;
