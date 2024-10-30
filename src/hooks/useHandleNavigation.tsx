import { useNavigate } from 'react-router-dom';

export const useHandleNavigation = () => {
    const navigate = useNavigate();

    const handleNavigation = (navigationURL: string) => {
        // if (routerTimeoutId) {
        //     clearTimeout(routerTimeoutId);
        // }
        // setIsClipPath(true);
        // const timeoutId = setTimeout(() => navigate(navigationURL), 2000);
        // setRouterTimeoutId(timeoutId);
        navigate(navigationURL);
    };

    return handleNavigation;
};
