import React from 'react';

export const loaderNotFoundPage = async (): Promise<string> => {
    if (location?.pathname) {
        throw new Response('Redirecting...', {
            status: 302,
            headers: { Location: '/about' }, // Đường dẫn bạn muốn redirect đến
        });
    }

    return 'loaderNotFoundPage';
};

const NotFoundPage: React.FC = () => {
    return <div> NotFound Page</div>;
};

export default NotFoundPage;
