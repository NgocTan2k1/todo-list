import React from 'react';
import { privateRoutes } from '../../routers/routes';

// firebase
// The components
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
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';

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
            <Drawer variant="permanent" open={isExpandMenu}>
                <DrawerHeader className={cx('menu__icons', !isExpandMenu && '!justify-center')}>
                    <IconButton
                        className={cx('menu__icon--expand', '!m-0', isExpandMenu && ' !hidden')}
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        edge="start"
                    >
                        <MenuIcon />
                    </IconButton>
                    <IconButton
                        className={cx('menu__icon--collapse', 'h-full !rounded-none')}
                        onClick={handleDrawerClose}
                        sx={[!isExpandMenu && { display: 'none' }]}
                    >
                        {theme.direction === 'rtl' ? <ChevronRightIcon className={cx('h-full')} /> : <ChevronLeftIcon />}
                    </IconButton>
                </DrawerHeader>
                <Divider />
                <List>
                    {privateRoutes.map(
                        (route, index) =>
                            route?.isMenu && (
                                <ListItem
                                    onClick={() => handleNavigation(route.path)}
                                    key={index}
                                    disablePadding
                                    sx={{ display: 'block' }}
                                >
                                    <ListItemButton
                                        sx={[
                                            {
                                                minHeight: 48,
                                                px: 2.5,
                                            },
                                            isExpandMenu
                                                ? {
                                                      justifyContent: 'initial',
                                                  }
                                                : {
                                                      justifyContent: 'center',
                                                  },
                                        ]}
                                    >
                                        {!isExpandMenu ? (
                                            <Tooltip title={route.tooltipText} placement="right-end" arrow>
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
                                                    <InboxIcon />
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
                                                <InboxIcon />
                                            </ListItemIcon>
                                        )}

                                        <ListItemText
                                            primary={route.primaryText}
                                            sx={[
                                                isExpandMenu
                                                    ? {
                                                          opacity: 1,
                                                      }
                                                    : {
                                                          opacity: 0,
                                                      },
                                            ]}
                                        />
                                    </ListItemButton>
                                </ListItem>
                            ),
                    )}
                </List>
                <Divider />
                <List>
                    {['All mail', 'Trash', 'Spam'].map((text, index) => (
                        <ListItem key={text} disablePadding sx={{ display: 'block' }}>
                            <ListItemButton
                                sx={[
                                    {
                                        minHeight: 48,
                                        px: 2.5,
                                    },
                                    isExpandMenu
                                        ? {
                                              justifyContent: 'initial',
                                          }
                                        : {
                                              justifyContent: 'center',
                                          },
                                ]}
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
                                    {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                                </ListItemIcon>
                                <ListItemText
                                    primary={text}
                                    sx={[
                                        isExpandMenu
                                            ? {
                                                  opacity: 1,
                                              }
                                            : {
                                                  opacity: 0,
                                              },
                                    ]}
                                />
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
            </Drawer>
        </>
    );
};

export default BaseMenu;
