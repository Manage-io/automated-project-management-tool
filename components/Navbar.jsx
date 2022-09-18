import { signOut, useSession } from "next-auth/react";
import { useContext, useState } from 'react';
import { useRouter } from "next/router";
import Link from 'next/link';

// Contexts
import { ThemeContext } from '../context/ThemeContext';

// MUI Components
import Menu from '@mui/material/Menu';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import AppBar from '@mui/material/AppBar';
import Divider from '@mui/material/Divider';
import Tooltip from '@mui/material/Tooltip';
import Toolbar from '@mui/material/Toolbar';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import ListItemIcon from '@mui/material/ListItemIcon';

// MUI Icons
import Logout from '@mui/icons-material/Logout';
import PersonIcon from '@mui/icons-material/Person';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import DashboardIcon from '@mui/icons-material/Dashboard';


const Navbar = () => {
    const { pathname, push } = useRouter();
    const { data: session, status } = useSession();
    const { themeDark, toggleTheme } = useContext(ThemeContext);

    const [profileDropdown, setProfileDropdown] = useState(null);


    return (
        <AppBar elevation={1} position="sticky" sx={{ zIndex: 1249 }}>
            <Toolbar sx={{ backgroundColor: 'primary.main' }}>
                <Link href="/" passHref>
                    <Typography variant="h6" component="a" sx={{
                        textDecoration: 'none !important',
                        ml: pathname.split('/').includes('[projectId]') ? { xs: 5, lg: 0 } : 0,
                        mr: "auto"
                    }}>
                        Manage.io
                    </Typography>
                </Link>

                {(status !== 'loading') && <>
                    {(status === 'unauthenticated') && <Link href="/login" passHref>
                        <Button component="a" variant='outlined' color="inherit">
                            Login
                        </Button>
                    </Link>}

                    {(status === 'authenticated') && <>
                        <Tooltip title="Account settings">
                            <IconButton
                                size="small"
                                sx={{ ml: 2 }}
                                aria-haspopup="true"
                                aria-label="Profile Dropdown"
                                aria-expanded={profileDropdown ? 'true' : undefined}
                                aria-controls={profileDropdown ? 'account-menu' : undefined}
                                onClick={({ currentTarget }) => setProfileDropdown(currentTarget)}
                            >
                                <Avatar sx={{
                                    backgroundColor: 'secondary.main',
                                    color: 'secondary.contrastText'
                                }}>
                                    {(session.user.name).split(' ').map((key, i) => {
                                        return ((i <= 3) ? key[0] : '')
                                    })}
                                </Avatar>
                            </IconButton>
                        </Tooltip>
                        <Menu
                            disableScrollLock
                            anchorEl={profileDropdown}
                            open={Boolean(profileDropdown)}
                            onClose={() => setProfileDropdown(null)}
                            onClick={() => setProfileDropdown(null)}
                            PaperProps={{
                                elevation: 3,
                                sx: {
                                    overflow: 'visible',
                                    mt: 1,
                                    '&:before': {
                                        content: '""',
                                        display: 'block',
                                        position: 'absolute',
                                        top: 0,
                                        right: 20,
                                        width: 10,
                                        height: 10,
                                        bgcolor: 'background.paper',
                                        backgroundImage: 'inherit',
                                        transform: 'translateY(-50%) rotate(45deg)',
                                        zIndex: 0,
                                    }
                                }
                            }}
                            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                        >
                            <Link href='/profile' passHref>
                                <MenuItem>
                                    <ListItemIcon>
                                        <PersonIcon fontSize="small" />
                                    </ListItemIcon>
                                    My Profile
                                </MenuItem>
                            </Link>
                            <Link href='/project' passHref>
                                <MenuItem>
                                    <ListItemIcon>
                                        <DashboardIcon fontSize="small" />
                                    </ListItemIcon>
                                    Project Dashboard
                                </MenuItem>
                            </Link>
                            <Divider />
                            <MenuItem onClick={() => {
                                signOut({
                                    redirect: false
                                }).then((res) => {
                                    if (res.url) push('/')
                                })
                            }}>
                                <ListItemIcon>
                                    <Logout fontSize="small" />
                                </ListItemIcon>
                                Logout
                            </MenuItem>
                        </Menu>
                    </>}
                </>}

                <IconButton
                    edge="end"
                    size="large"
                    sx={{ ml: 2 }}
                    color='inherit'
                    onClick={toggleTheme}
                >
                    {themeDark ? <LightModeIcon /> : <DarkModeIcon />}
                </IconButton>
            </Toolbar>
        </AppBar>
    )
}

export default Navbar;