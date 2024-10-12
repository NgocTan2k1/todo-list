import React from 'react';

// firebase
// The components
// The customized components
import BaseNewPage from '../../components/layout/BasePage';

// CSS
import styles from './HomePage.module.css';
// The stores
// The customized hooks
import { useHandleBindingClass } from '../../hooks/useHandleBindingClass';

// The constants
const HomePage: React.FC = () => {
    // The customized hooks
    const cx = useHandleBindingClass(styles);

    return (
        <BaseNewPage tailwindCSS={cx('wrapper__home-page', 'flex flex-col h-full w-full')}>
            <div className={cx('title', 'text-[1.8rem]')}>
                <h2>Home Page</h2>
            </div>
            <div className={cx('container', 'flex-full')}></div>
        </BaseNewPage>
    );
};

export default HomePage;
