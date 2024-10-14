import React from 'react';

// firebase
// The components
import { Button, Divider } from '@mui/material';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import AddIcon from '@mui/icons-material/Add';

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
            <Divider />
            <div className={cx('container', 'flex-full')}>
                <Box className={cx('', 'flex w-full h-full my-4')}>
                    <Button className={cx('', 'w-[18rem] h-[18rem]')}>
                        <Box className={cx('', 'flex w-full h-full justify-center items-center')}>
                            <AddIcon />
                        </Box>
                    </Button>
                    <Paper elevation={3} />
                    <Paper />
                    <Paper elevation={3} />
                    <Paper />
                    <Paper elevation={3} />
                    <Paper />
                    <Paper elevation={3} />
                </Box>
            </div>
        </BaseNewPage>
    );
};

export default HomePage;
