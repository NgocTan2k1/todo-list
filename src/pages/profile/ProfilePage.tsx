/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';

// firebase
import { getAuth } from 'firebase/auth';
import { firebaseApp } from '../../firebase';

// The components
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

// The customized components
import BaseNewPage from '../../components/layout/BasePage';
import BaseHeader from '../../components/layout/BaseHeader';

// CSS
import styles from './ProfilePage.module.css';
// The stores
// The customized hooks
import { useHandleBindingClass } from '../../hooks/useHandleBindingClass';

// The constants
import avatar from '../../assets/img/avatar.jpg';

const ProfilePage: React.FC = () => {
    // The customized hooks
    const cx = useHandleBindingClass(styles);

    // firebase
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const auth = getAuth(firebaseApp);

    return (
        <BaseNewPage tailwindCSS={cx('wrapper__profile-page', 'flex flex-col !h-full')}>
            <BaseHeader pageName="Welcome, Taan" time={true} isNotification={true} notificationQuanlity={20} />
            <div
                className={cx(
                    'content__profile',
                    'flex-full !max-w-full !overflow-hidden bg-white shadow-xl rounded-xl mx-[2.4rem] mb-[2.4rem]',
                    'max-[639px]:mx-[1.2rem] max-[639px]:mb-[1.2rem]',
                )}
            >
                <div className={cx('', 'max-[600px]:hidden !bg-custom-gradient !w-full h-[3.6rem]')}></div>
                <Box className={cx('', 'flex flex-full w-full')}>
                    <Grid className={cx('', '!flex !items-start !max-h-fit !w-full !gap-0 !ml-0 !mt-0')} container spacing={2}>
                        <Grid
                            className={cx('', 'relative flex justify-center !h-fit items-center p-[1.6rem]')}
                            item
                            xs={12}
                            sm={4}
                            md={5}
                            xl={4}
                        >
                            <Avatar
                                className={cx(
                                    'profile-page__avatar',
                                    '!min-h-[15.2rem] !min-w-[15.2rem] !h-auto !w-[60%] aspect-square',
                                    'max-[599px]:!w-[80%] max-[599px]:!h-auto',
                                )}
                                src={avatar}
                            />
                            <Stack
                                className={cx('', 'absolute bottom-[-1.6rem] right-[50%] translate-x-[50%]', '')}
                                spacing={2}
                                direction="row"
                            >
                                <Button className={cx('', 'text-[1.4rem] !font-bold')} variant="outlined" color="error">
                                    Edit
                                </Button>
                            </Stack>
                        </Grid>

                        <Grid className={cx('', 'p-[1.6rem] max-w-full max-h-fit')} item xs={12} sm={8} md={7} xl={8}>
                            <Grid
                                className={cx(
                                    '',
                                    'flex p-[1.6rem] !flex-col !items-start !justify-center gap-[1.2rem] !h-full !w-full !ml-0 !mt-0 !overflow-hidden',
                                    'max-[599px]:!mx-auto',
                                )}
                                container
                                spacing={2}
                            >
                                <Grid
                                    className={cx(
                                        '',
                                        'flex !p-0 items-center gap-3 !max-w-full !h-full !max-h-fit overflow-hidden',
                                    )}
                                    item
                                    xs={12}
                                >
                                    <div
                                        className={cx(
                                            '',
                                            'flex justify-between items-center !h-full !min-w-[6.4rem]',
                                            'max-[639px]:!min-w-[5.8rem]',
                                        )}
                                    >
                                        <strong className={cx('', 'text-[1.8rem] text-left', 'max-[639px]:!text-[1.6rem]')}>
                                            Name
                                        </strong>
                                        <strong className={cx('', 'text-[1.8rem]', 'max-[639px]:!text-[1.6rem]')}>:</strong>
                                    </div>
                                    <p
                                        className={cx(
                                            '',
                                            'flex-full text-[1.6rem] max-w-[calc(100%-6.4rem-0.75rem)] overflow-hidden text-ellipsis whitespace-nowrap',
                                            'max-[639px]:!text-[1.2rem] max-[639px]:max-w-[calc(100%-5.8rem-0.75rem)] max-[639px]:!leading-[1.2rem]',
                                        )}
                                    >
                                        Phạm Ngọc Tân
                                    </p>
                                </Grid>
                                <Grid
                                    className={cx('', 'flex !p-0 items-center gap-3 !max-w-full !max-h-fit overflow-hidden')}
                                    item
                                    xs={12}
                                >
                                    <div
                                        className={cx(
                                            '',
                                            'flex justify-between items-center !h-full !min-w-[6.4rem]',
                                            'max-[639px]:!min-w-[5.8rem]',
                                        )}
                                    >
                                        <strong className={cx('', 'text-[1.8rem] text-left', 'max-[639px]:!text-[1.6rem]')}>
                                            Age
                                        </strong>
                                        <strong className={cx('', 'text-[1.8rem]', 'max-[639px]:!text-[1.6rem]')}>:</strong>
                                    </div>
                                    <p
                                        className={cx(
                                            '',
                                            'flex-full text-[1.6rem] max-w-[calc(100%-6.4rem-0.75rem)] overflow-hidden text-ellipsis whitespace-nowrap',
                                            'max-[639px]:!text-[1.2rem] max-[639px]:max-w-[calc(100%-5.8rem-0.75rem)] max-[639px]:!leading-[1.2rem]',
                                        )}
                                    >
                                        18
                                    </p>
                                </Grid>
                                <Grid
                                    className={cx('', 'flex !p-0 items-center gap-3 !max-w-full !max-h-fit overflow-hidden')}
                                    item
                                    xs={12}
                                >
                                    <div
                                        className={cx(
                                            '',
                                            'flex justify-between items-center !h-full !min-w-[6.4rem]',
                                            'max-[639px]:!min-w-[5.8rem]',
                                        )}
                                    >
                                        <strong className={cx('', 'text-[1.8rem] text-left', 'max-[639px]:!text-[1.6rem]')}>
                                            E-mail
                                        </strong>
                                        <strong className={cx('', 'text-[1.8rem]', 'max-[639px]:!text-[1.6rem]')}>:</strong>
                                    </div>
                                    <p
                                        className={cx(
                                            '',
                                            'flex-full text-[1.6rem] max-w-[calc(100%-6.4rem-0.75rem)] overflow-hidden text-ellipsis whitespace-nowrap',
                                            'max-[639px]:!text-[1.2rem] max-[639px]:max-w-[calc(100%-5.8rem-0.75rem)] max-[639px]:!leading-[1.2rem]',
                                        )}
                                    >
                                        phamngoctan2016@gmail.com.vn
                                    </p>
                                </Grid>
                                <Grid
                                    className={cx('', 'flex !p-0 items-center gap-3 !max-w-full !max-h-fit overflow-hidden')}
                                    item
                                    xs={12}
                                >
                                    <div
                                        className={cx(
                                            '',
                                            'flex justify-between items-center !h-full !min-w-[6.4rem]',
                                            'max-[639px]:!min-w-[5.8rem]',
                                        )}
                                    >
                                        <strong className={cx('', 'text-[1.8rem] text-left', 'max-[639px]:!text-[1.6rem]')}>
                                            Phone
                                        </strong>
                                        <strong className={cx('', 'text-[1.8rem]', 'max-[639px]:!text-[1.6rem]')}>:</strong>
                                    </div>
                                    <p
                                        className={cx(
                                            '',
                                            'flex-full text-[1.6rem] max-w-[calc(100%-6.4rem-0.75rem)] overflow-hidden text-ellipsis whitespace-nowrap',
                                            'max-[639px]:!text-[1.2rem] max-[639px]:max-w-[calc(100%-5.8rem-0.75rem)] max-[639px]:!leading-[1.2rem]',
                                        )}
                                    >
                                        0386158494
                                    </p>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Box>
            </div>
        </BaseNewPage>
    );
};

export default ProfilePage;
