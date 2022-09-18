import { useState, useLayoutEffect } from 'react';
import Link from 'next/link';

// Components
import Footer from './Footer';

// MUI Components
import Box from '@mui/system/Box';
import List from '@mui/material/List';
import Drawer from '@mui/material/Drawer';
import Toolbar from '@mui/material/Toolbar';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import Container from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListItemButton from '@mui/material/ListItemButton';

// MUI Icons
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import DashboardIcon from '@mui/icons-material/Dashboard';

const ProjectPageWrapper = ({ children }) => {
    const [drawer, setDrawer] = useState({ type: 'permanent', open: true });

    useLayoutEffect(() => {
        const updateSize = () => {
            if (window.innerWidth > 991) {
                setDrawer({ type: 'permanent', open: true })
            } else {
                setDrawer(e => ({ ...e, type: 'temporary' }))
            }
        }

        updateSize();
        window.addEventListener('resize', updateSize);
        return () => window.removeEventListener('resize', updateSize);
    }, []);

    return (<Box sx={{ display: 'flex', height: 'calc(100vh - var(--NavbarHeight))' }}>
        {(drawer.type === 'temporary') && <IconButton
            size="large"
            aria-label="menu"
            sx={{
                mr: 1,
                color: '#fff',
                zIndex: 1249,
                position: 'absolute',
                top: { xs: 4, sm: 8 },
                left: { xs: 4, sm: 12 },
                display: { lg: 'none' }
            }}
            onClick={() => setDrawer(e => ({ ...e, open: !e.open }))}
        >
            {drawer.open ? <CloseIcon /> : <MenuIcon />}
        </IconButton>}

        <Drawer sx={{
            width: 220,
            flexShrink: 0,
            position: 'relative',
            '& .MuiDrawer-paper': {
                width: 220,
                boxSizing: 'border-box'
            },
        }}
            anchor="left"
            open={drawer.open}
            variant={drawer.type}
            hideBackdrop={drawer.type === 'permanent'}
            onClick={() => setDrawer(e => ({ ...e, open: false }))}
            onClose={() => setDrawer(e => ({ ...e, open: false }))}
        >
            <Toolbar />

            <List>
                <ListItem disablePadding>
                    <Link href="/project/projectId" passHref>
                        <ListItemButton component="a">
                            <ListItemIcon sx={{ minWidth: 40 }}>
                                <DashboardIcon />
                            </ListItemIcon>
                            <ListItemText primary='Dashboard' />
                        </ListItemButton>
                    </Link>
                </ListItem>
            </List>
            <Divider />

            <List>
                <ListItem disablePadding>
                    <Link href="/project/projectId/designation/create" passHref>
                        <ListItemButton component="a">
                            <ListItemIcon sx={{ minWidth: 40 }}>
                                <DashboardIcon />
                            </ListItemIcon>
                            <ListItemText primary='Create Designation' />
                        </ListItemButton>
                    </Link>
                </ListItem>
                <ListItem disablePadding>
                    <Link href="/project/projectId/designation" passHref>
                        <ListItemButton component="a">
                            <ListItemIcon sx={{ minWidth: 40 }}>
                                <DashboardIcon />
                            </ListItemIcon>
                            <ListItemText primary='View Designations' />
                        </ListItemButton>
                    </Link>
                </ListItem>
            </List>
            <Divider />

            <List>
                <ListItem disablePadding>
                    <Link href="/project/projectId/module/create" passHref>
                        <ListItemButton component="a">
                            <ListItemIcon sx={{ minWidth: 40 }}>
                                <DashboardIcon />
                            </ListItemIcon>
                            <ListItemText primary='Create Module' />
                        </ListItemButton>
                    </Link>
                </ListItem>
                <ListItem disablePadding>
                    <Link href="/project/projectId/module" passHref>
                        <ListItemButton component="a">
                            <ListItemIcon sx={{ minWidth: 40 }}>
                                <DashboardIcon />
                            </ListItemIcon>
                            <ListItemText primary='View Modules' />
                        </ListItemButton>
                    </Link>
                </ListItem>
                <ListItem disablePadding>
                    <Link href="/project/projectId/module/assign" passHref>
                        <ListItemButton component="a">
                            <ListItemIcon sx={{ minWidth: 40 }}>
                                <DashboardIcon />
                            </ListItemIcon>
                            <ListItemText primary='Assign Modules' />
                        </ListItemButton>
                    </Link>
                </ListItem>
            </List>
            <Divider />

            <List>
                <ListItem disablePadding>
                    <Link href="/project/projectId/invite/sent" passHref>
                        <ListItemButton component="a">
                            <ListItemIcon sx={{ minWidth: 40 }}>
                                <DashboardIcon />
                            </ListItemIcon>
                            <ListItemText primary='Sent Invite' />
                        </ListItemButton>
                    </Link>
                </ListItem>
                <ListItem disablePadding>
                    <Link href="/project/projectId/invite" passHref>
                        <ListItemButton component="a">
                            <ListItemIcon sx={{ minWidth: 40 }}>
                                <DashboardIcon />
                            </ListItemIcon>
                            <ListItemText primary='View Invites' />
                        </ListItemButton>
                    </Link>
                </ListItem>
            </List>
            <Divider />

            <List>
                <ListItem disablePadding>
                    <Link href="/project/projectId/bug/create" passHref>
                        <ListItemButton component="a">
                            <ListItemIcon sx={{ minWidth: 40 }}>
                                <DashboardIcon />
                            </ListItemIcon>
                            <ListItemText primary='Create Bug' />
                        </ListItemButton>
                    </Link>
                </ListItem>
                <ListItem disablePadding>
                    <Link href="/project/projectId/bug" passHref>
                        <ListItemButton component="a">
                            <ListItemIcon sx={{ minWidth: 40 }}>
                                <DashboardIcon />
                            </ListItemIcon>
                            <ListItemText primary='View Bugs' />
                        </ListItemButton>
                    </Link>
                </ListItem>
                <ListItem disablePadding>
                    <Link href="/project/projectId/bug/assign" passHref>
                        <ListItemButton component="a">
                            <ListItemIcon sx={{ minWidth: 40 }}>
                                <DashboardIcon />
                            </ListItemIcon>
                            <ListItemText primary='Assign Bugs' />
                        </ListItemButton>
                    </Link>
                </ListItem>
            </List>
            <Divider />
        </Drawer>

        <Box sx={{ flexGrow: 1, overflowY: 'auto' }}>
            <Container component="main" maxWidth={false}>
                {children}
            </Container>

            <Footer />
        </Box>
    </Box>)
}

export default ProjectPageWrapper