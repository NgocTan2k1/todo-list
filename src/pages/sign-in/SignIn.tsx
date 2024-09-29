import React from 'react';

export const loaderSignInPage = async (): Promise<Response | string> => {
    return await 'loaderSignInPage';
};

const SignInPage: React.FC = () => {
    return <div> Sign In Page</div>;
};

export default SignInPage;
