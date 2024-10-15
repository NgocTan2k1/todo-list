/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import { privateRoutes } from '../../routers/routes';

// firebase
// The components
import Box from '@mui/material/Box';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import { Tooltip } from '@mui/material';
import MuiDrawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import SettingsIcon from '@mui/icons-material/Settings';

// The customized components
// CSS
import styles from './Layout.module.css';
import { styled, useTheme, Theme, CSSObject } from '@mui/material/styles';

// The stores
import useCommonStores from '../../stores/commonStores';

// The hooks were customized
import { useHandleBindingClass } from '../../hooks/useHandleBindingClass';
import { useHandleNavigation } from '../../hooks/useHandleNavigation';

// The constants
import { drawerWidth } from '../../global/constants';

export interface IBaseMenu {
    children?: React.ReactNode;
}
const openedMixin = (theme: Theme): CSSObject => ({
    width: drawerWidth,
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: 'hidden',
});

const closedMixin = (theme: Theme): CSSObject => ({
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: `calc(${theme.spacing(7)} + 1px)`,
    [theme.breakpoints.up('sm')]: {
        width: `calc(${theme.spacing(8)} + 1px)`,
    },
});

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(({ theme }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    variants: [
        {
            props: ({ open }) => open,
            style: {
                ...openedMixin(theme),
                '& .MuiDrawer-paper': openedMixin(theme),
            },
        },
        {
            props: ({ open }) => !open,
            style: {
                ...closedMixin(theme),
                '& .MuiDrawer-paper': closedMixin(theme),
            },
        },
    ],
}));

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    // padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
}));

const BaseMenu: React.FC<IBaseMenu> = () => {
    // The hooks were customized
    const cx = useHandleBindingClass(styles);
    const handleNavigation = useHandleNavigation();

    // stores
    const isExpandMenu = useCommonStores((state) => state.isExpandMenu);
    const setIsExpandMenu = useCommonStores((state) => state.setIsExpandMenu);
    const currentIndex = useCommonStores((state) => state.currentIndex);
    const setCurrentIndex = useCommonStores((state) => state.setCurrentIndex);

    // states
    const theme = useTheme();

    const handleDrawerOpen = () => {
        setIsExpandMenu(true);
    };

    const handleDrawerClose = () => {
        setIsExpandMenu(false);
    };

    return (
        <>
            <Drawer className={cx('wrapper__base-menu', 'flex')} variant="permanent" open={false} onClose={handleDrawerClose}>
                <DrawerHeader className={cx('menu__icons', '!justify-center')}>
                    <IconButton
                        className={cx('menu__icon--expand', '!m-0')}
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        edge="start"
                    >
                        <MenuIcon />
                    </IconButton>
                </DrawerHeader>
                <Divider />
                <List className={cx('menu__list', 'flex-full')}>
                    {privateRoutes.map((route, index) => {
                        return (
                            route?.isMenu && (
                                <ListItem className={cx('menu__item', 'flex flex-col !justify-start')} key={index} disablePadding>
                                    <ListItemButton
                                        onClick={() => {
                                            handleNavigation(route.path);
                                            setCurrentIndex(index);
                                        }}
                                        className={cx(
                                            'menu__item--icon',
                                            '!min-h-[48px] !px-[20px] w-full !justify-center',
                                            currentIndex === index && '!bg-[#E0E0E0]',
                                        )}
                                    >
                                        <Tooltip
                                            className={cx('menu__item--tooltip', '!text-[1.6rem]')}
                                            title={route.tooltipText}
                                            placement="right-end"
                                            arrow
                                        >
                                            <ListItemIcon
                                                sx={[
                                                    {
                                                        minWidth: 0,
                                                        justifyContent: 'center',
                                                        mr: 'auto',
                                                    },
                                                ]}
                                            >
                                                {route?.IconMenu}
                                            </ListItemIcon>
                                        </Tooltip>
                                        <ListItemText
                                            className={cx('menu__item--name', 'opacity-0')}
                                            primary={route.primaryText}
                                        />
                                    </ListItemButton>
                                    {route?.children && (
                                        <List className={cx('menu__list', 'flex-full w-full !py-0')}>
                                            {route?.children.map((child, childIndex) => {
                                                return (
                                                    <ListItem
                                                        className={cx(
                                                            'menu__item  !w-full',
                                                            'block',
                                                            currentIndex === Number(index + '.' + (childIndex + 1)) &&
                                                                'bg-[#E0E0E0]',
                                                        )}
                                                        onClick={() => {
                                                            handleNavigation(route.path + child.path);
                                                            setCurrentIndex(Number(index + '.' + (childIndex + 1)));
                                                        }}
                                                        key={Number(index + '.' + (childIndex + 1))}
                                                        disablePadding
                                                    >
                                                        <ListItemButton
                                                            className={cx(
                                                                'menu__item--icon',
                                                                '!min-h-[48px] !px-[20px]  w-full !justify-center',
                                                            )}
                                                            onClick={() => {
                                                                handleNavigation(route.path + child.path);
                                                                setCurrentIndex(Number(index + '.' + (childIndex + 1)));
                                                            }}
                                                        >
                                                            <Tooltip
                                                                className={cx('menu__item--tooltip', '!text-[1.6rem]')}
                                                                title={child.tooltipText}
                                                                placement="right-end"
                                                                arrow
                                                            >
                                                                <ListItemIcon
                                                                    sx={[
                                                                        {
                                                                            minWidth: 0,
                                                                            justifyContent: 'center',
                                                                            mr: 'auto',
                                                                        },
                                                                    ]}
                                                                >
                                                                    {child?.IconMenu}
                                                                </ListItemIcon>
                                                            </Tooltip>
                                                        </ListItemButton>
                                                    </ListItem>
                                                );
                                            })}
                                        </List>
                                    )}
                                </ListItem>
                            )
                        );
                    })}
                </List>
                <Divider />
                <List className={cx('menu__list', 'flex-0')}>
                    <ListItem
                        className={cx('menu__item', 'block', currentIndex === 9999 && 'bg[#E0E0E0]')}
                        onClick={() => {
                            handleNavigation('/setting');
                            setCurrentIndex(9999);
                        }}
                        disablePadding
                    >
                        <ListItemButton className={cx('menu__item--icon', '!min-h-[48px] !px-[20px] !justify-center')}>
                            <Tooltip
                                className={cx('menu__item--tooltip', '!text-[1.6rem]')}
                                title={'Setting'}
                                placement="right-end"
                                arrow
                            >
                                <ListItemIcon
                                    sx={[
                                        {
                                            minWidth: 0,
                                            mr: 'auto',
                                            justifyContent: 'center',
                                        },
                                    ]}
                                >
                                    <SettingsIcon />
                                </ListItemIcon>
                            </Tooltip>
                        </ListItemButton>
                    </ListItem>
                </List>
                <Divider />
            </Drawer>

            <SwipeableDrawer
                className={cx('wrapper__base-menu', '')}
                anchor={'left'}
                open={isExpandMenu}
                onClose={handleDrawerClose}
                onOpen={handleDrawerOpen}
            >
                <Box
                    className={cx('', 'flex flex-col h-full overflow-hidden')}
                    role="presentation"
                    onClick={handleDrawerClose}
                    onKeyDown={handleDrawerClose}
                    sx={{ width: drawerWidth }}
                >
                    <DrawerHeader className={cx('menu__icons', '!justify-between')}>
                        <h3 className={cx('', 'text-[1.6rem] w-full text-center')}>Todo List Menu</h3>
                        <IconButton
                            className={cx('menu__icon--collapse', 'h-full !rounded-none !text-[1.6rem]')}
                            onClick={handleDrawerClose}
                        >
                            {theme.direction === 'rtl' ? <ChevronRightIcon className={cx('h-full')} /> : <ChevronLeftIcon />}
                        </IconButton>
                    </DrawerHeader>
                    <Divider />
                    <List className={cx('menu__list', 'flex-full')}>
                        {privateRoutes.map((route, index) => {
                            return (
                                route?.isMenu && (
                                    <ListItem
                                        className={cx('menu__item', 'flex flex-col !justify-start')}
                                        key={index}
                                        disablePadding
                                    >
                                        <ListItemButton
                                            onClick={() => {
                                                handleNavigation(route.path);
                                                setCurrentIndex(index);
                                            }}
                                            className={cx(
                                                'menu__item--icon',
                                                '!min-h-[48px] !px-[20px] w-full !justify-initial',
                                                currentIndex === index && '!bg-[#E0E0E0]',
                                            )}
                                        >
                                            <ListItemIcon
                                                sx={[
                                                    {
                                                        minWidth: 0,
                                                        justifyContent: 'center',
                                                    },
                                                    isExpandMenu
                                                        ? {
                                                              mr: 3,
                                                          }
                                                        : {
                                                              mr: 'auto',
                                                          },
                                                ]}
                                            >
                                                {route?.IconMenu}
                                            </ListItemIcon>
                                            <ListItemText
                                                className={cx('menu__item--name', 'opacity-100')}
                                                primary={route.primaryText}
                                            />
                                        </ListItemButton>
                                        {route?.children && (
                                            <List className={cx('menu__list', 'flex-full w-full !ml-0')}>
                                                {route?.children.map((child, childIndex) => {
                                                    return (
                                                        <ListItem
                                                            className={cx(
                                                                'menu__item !w-full',
                                                                'block',
                                                                currentIndex === Number(index + '.' + (childIndex + 1)) &&
                                                                    'bg-[#E0E0E0]',
                                                            )}
                                                            key={Number(index + '.' + (childIndex + 1))}
                                                            disablePadding
                                                        >
                                                            <ListItemButton
                                                                className={cx(
                                                                    'menu__item--icon',
                                                                    '!min-h-[48px] !pl-[5.6rem]  w-full !justify-initial',
                                                                )}
                                                                onClick={() => {
                                                                    handleNavigation(route.path + child.path);
                                                                    setCurrentIndex(Number(index + '.' + (childIndex + 1)));
                                                                }}
                                                            >
                                                                <ListItemIcon
                                                                    sx={[
                                                                        {
                                                                            minWidth: 0,
                                                                            justifyContent: 'center',
                                                                        },
                                                                        isExpandMenu
                                                                            ? {
                                                                                  mr: 3,
                                                                              }
                                                                            : {
                                                                                  mr: 'auto',
                                                                              },
                                                                    ]}
                                                                >
                                                                    {child?.IconMenu}
                                                                </ListItemIcon>
                                                                <ListItemText
                                                                    className={cx('menu__item--name', 'opacity-100')}
                                                                    primary={child.primaryText}
                                                                />
                                                            </ListItemButton>
                                                        </ListItem>
                                                    );
                                                })}
                                            </List>
                                        )}
                                    </ListItem>
                                )
                            );
                        })}
                    </List>
                    <Divider />
                    <List className={cx('menu__list', 'flex-0')}>
                        <ListItem
                            className={cx('menu__item', 'block', currentIndex === 9999 && 'bg[#E0E0E0]')}
                            onClick={() => {
                                handleNavigation('/setting');
                                setCurrentIndex(9999);
                            }}
                            disablePadding
                        >
                            <ListItemButton
                                className={cx(
                                    'menu__item--icon',
                                    '!min-h-[48px] !px-[20px]',
                                    isExpandMenu ? '!justify-initial' : '!justify-center',
                                )}
                            >
                                {!isExpandMenu ? (
                                    <Tooltip
                                        className={cx('menu__item--tooltip', '!text-[1.6rem]')}
                                        title={'Setting'}
                                        placement="right-end"
                                        arrow
                                    >
                                        <ListItemIcon
                                            sx={[
                                                {
                                                    minWidth: 0,
                                                    justifyContent: 'center',
                                                },
                                                isExpandMenu
                                                    ? {
                                                          mr: 3,
                                                      }
                                                    : {
                                                          mr: 'auto',
                                                      },
                                            ]}
                                        >
                                            <SettingsIcon />
                                        </ListItemIcon>
                                    </Tooltip>
                                ) : (
                                    <ListItemIcon
                                        sx={[
                                            {
                                                minWidth: 0,
                                                justifyContent: 'center',
                                            },
                                            isExpandMenu
                                                ? {
                                                      mr: 3,
                                                  }
                                                : {
                                                      mr: 'auto',
                                                  },
                                        ]}
                                    >
                                        <SettingsIcon />
                                    </ListItemIcon>
                                )}
                                <ListItemText
                                    className={cx('menu__item--name', isExpandMenu ? 'opacity-100' : 'opacity-0')}
                                    primary={'Setting'}
                                />
                            </ListItemButton>
                        </ListItem>
                    </List>
                    <Divider />
                </Box>
            </SwipeableDrawer>
        </>
    );
};

export default BaseMenu;
