import React from 'react';

// firebase
// The components
import { Button, Divider } from '@mui/material';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

// The customized components
import BaseNewPage from '../../components/layout/BasePage';

// CSS
import styles from './HomePage.module.css';

// The stores
// The customized hooks
import { useHandleBindingClass } from '../../hooks/useHandleBindingClass';
import useCommonStores from '../../stores/commonStores';

// The constants
const HomePage: React.FC = () => {
    // The customized hooks
    const cx = useHandleBindingClass(styles);

    // stores
    const isExpandMenu = useCommonStores((state) => state.isExpandMenu);
    const array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 1, 2, 1, 1, 1, 1, 1, 1, 9, 2, 1, 2, 4, 5, 6, 3, 9, 9, 2, 1, 1, 5, 5, 4, 1, 2];
    return (
        <BaseNewPage
            tailwindCSS={cx(
                'wrapper__home-page',
                'flex flex-col h-full w-full over overflow-hidden max-[639px]:pt-[1.4rem] max-[639px]:pl-[0.7rem] pt-[2.4rem] pl-[2.4rem]',
            )}
        >
            <div className={cx('title', 'text-[1.8rem] h-auto')}>
                <h2>Home Page</h2>
            </div>
            <Divider className={cx('container', 'flex-0 min-w-full')} />
            <div className={cx('container', 'flex-full overflow-y-auto px-2 min-w-full')}>
                <Box
                    className={cx(
                        '',
                        isExpandMenu
                            ? 'max-[639px]:w-[24rem] sm:w-[28rem] lg:w-[59rem] xl:w-[90rem] 2xl:w-[121rem] min-[1660px]:w-[152rem]'
                            : 'max-[639px]:w-[24rem] md:w-[59rem] lg:w-[90rem] 2xl:w-[121rem] min-[1660px]:w-[152rem]',

                        'flex flex-wrap sm:w-[28rem] h-auto sm:justify-center md:justify-start gap-x-12 gap-y-12 my-4 mx-auto',
                    )}
                >
                    {array.map((_, index) => (
                        <Paper
                            key={index}
                            component={Button}
                            className={cx(
                                '',
                                'max-[639px]:!min-w-[24rem] max-[640px]:!min-h-[20rem] !min-w-[28rem] !min-h-[26rem] !rounded-3xl  hover:bg-neutral-100',
                            )}
                            elevation={3}
                        >
                            <AddCircleOutlineIcon className={cx('item__icon', '!w-[4rem] !h-[4rem]')} />
                        </Paper>
                    ))}
                </Box>
                <Stack spacing={2}>
                    <Pagination className={cx('pagination', '!m-4')} count={5} showFirstButton showLastButton />
                </Stack>
            </div>
        </BaseNewPage>
    );
};

export default HomePage;
