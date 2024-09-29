import React from 'react';

export const loaderSignUpPage = async (): Promise<Response | string> => {
    return await 'loaderSignUpPage';
};

const SignUpPage: React.FC = () => {
    return <div> SignUp Page</div>;
};

export default SignUpPage;
