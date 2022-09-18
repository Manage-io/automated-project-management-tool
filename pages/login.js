import { useSession, signIn } from "next-auth/react";
import { useState, useContext } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import Head from 'next/head';
import Link from 'next/link';

// Context
import { NotifyContext } from '../context/NotifyContext';

// Components
import Footer from '../components/Footer';

// MUI Components
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import TextField from '@mui/material/TextField';
import Container from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import InputAdornment from '@mui/material/InputAdornment';
import FormControlLabel from '@mui/material/FormControlLabel';
import CircularProgress from '@mui/material/CircularProgress';

// Metarial Icon
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

// Stylesheets
import styles from '../styles/Auth.module.css';

const Login = () => {
    const router = useRouter();
    const { status } = useSession();
    const { notify } = useContext(NotifyContext);

    const [loading, setLoading] = useState(false);
    const [errorText, setErrorText] = useState('');
    const [formData, setFormData] = useState({
        email: { value: '', error: false },
        pass: { value: '', error: false },
    })
    const [passVisible, setPassVisible] = useState(false);

    const onHandleLogin = () => {
        setLoading(true);

        if (!(/[A-Za-z0-9._+-]+@[A-Za-z0-9 -]+\.[a-z]{2,4}/).test(formData.email.value)) {
            setFormData(e => ({ ...e, email: { ...e.email, error: true } }));
            setErrorText('Invalid email.');
        } else if (formData.email.error) {
            setFormData(e => ({ ...e, email: { ...e.email, error: false } }));
        }

        if (formData.pass.value.length < 6) {
            setFormData(e => ({ ...e, pass: { ...e.pass, error: true } }));
            setErrorText('Passwor must be atleast 6 Charecters.');
        } else if (formData.pass.error) {
            setFormData(e => ({ ...e, pass: { ...e.pass, error: false } }));
        }

        if (errorText !== '') { setErrorText('') }

        signIn('credentials', {
            redirect: false,
            email: formData.email.value,
            password: formData.pass.value
        }).then(({ error, status, ok }) => {
            if (!error && ok) {
                setLoading(false);
                notify('success', 'Login Succesful.');
                router.push('/project');
            }
            else {
                setFormData(e => ({
                    email: { ...e.email, error: true },
                    pass: { ...e.pass, error: true }
                }))
                setErrorText('Invalid Login Credentials.');
                setLoading(false);
            }
        }).catch((err) => {
            notify('error', 'Server Error. Please Login Later.');
            setLoading(false);
        })

    }

    if (!formData.email.value && !formData.pass.value && status === "authenticated") {
        router.push('/');
    }

    return (<>
        <Head>
            <title>Login - Manage.io</title>
        </Head>

        <Container className={styles.mainContainer} component="main" maxWidth={false}>
            <Grid container spacing={0}>
                <Grid item md={5} lg={6}
                    sx={{
                        display: { xs: 'none', md: 'flex' },
                        alignItems: 'center'
                    }}
                >
                    <Box className={styles.sectionLeft} sx={{ pr: 1, pl: { md: 0, lg: 2 } }} >
                        <Typography variant="h4" color='text.primary' gutterBottom>
                            Hi, Welcome Back
                        </Typography>
                        <Image
                            src="/assets/images/illustration_login.png"
                            alt="Illustration Login"
                            layout="responsive"
                            width="1440"
                            height="1080"
                        />
                    </Box>
                </Grid>
                {status === "unauthenticated" && <Grid item xs={12} md={7} lg={6}>
                    <Typography variant="h4" color='text.primary' sx={{
                        display: { md: 'none' },
                        textAlign: 'center',
                        fontWeight: 'bold',
                        mb: 4
                    }}>
                        Hi, Welcome Back
                    </Typography>
                    <Card className={styles.authCard} sx={{ marginLeft: { xs: 'auto', md: 0 }, p: 1 }}>
                        <CardContent className={styles.authCardBody} sx={{ pt: 3 }}>
                            <Typography mb={5} mx="auto" variant='h5'>
                                Login to Manage.io
                            </Typography>

                            <TextField
                                type="email"
                                label="Email"
                                variant="outlined"
                                value={formData.email.value}
                                error={formData.email.error}
                                sx={{
                                    mb: 3, '& input': {
                                        boxShadow: 'none !important'
                                    }
                                }}
                                onChange={({ target }) => setFormData(e => ({
                                    ...e,
                                    email: { ...e.email, value: target.value }
                                }))}
                            />
                            <TextField
                                label="Password"
                                variant="outlined"
                                value={formData.pass.value}
                                error={formData.pass.error}
                                type={passVisible ? 'text' : 'password'}
                                sx={{
                                    mb: 2, '& input': {
                                        boxShadow: 'none !important'
                                    }
                                }}
                                onChange={({ target }) => setFormData(e => ({
                                    ...e,
                                    pass: { ...e.pass, value: target.value }
                                }))}
                                InputProps={{
                                    endAdornment: (<InputAdornment position="end">
                                        <IconButton
                                            edge="end"
                                            aria-label="toggle visibility"
                                            onClick={() => setPassVisible(e => !e)}
                                        >
                                            {passVisible ? <Visibility /> : <VisibilityOff />}
                                        </IconButton>
                                    </InputAdornment>),
                                }}
                            />

                        </CardContent>
                        <CardActions className={styles.authCardFooter} sx={{ p: 2 }}>
                            <Typography variant='body2' sx={{ color: 'error.main', mx: 'auto !important' }}>
                                {errorText}
                            </Typography>

                            <Box sx={{
                                width: '100%',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between'
                            }}>
                                <FormControlLabel
                                    label="Remember Me"
                                    control={<Checkbox
                                        disabled
                                        defaultChecked
                                        color="primary"
                                    />}
                                />
                                <Link href="/forget-pass" passHref>
                                    <Typography component="a" variant='subtitle1' color='primary.main'>
                                        Forget Password?
                                    </Typography>
                                </Link>
                            </Box>

                            <Button size="large" variant='contained'
                                sx={{
                                    '&:hover': {
                                        backgroundColor: 'primary.light'
                                    }
                                }}
                                disabled={loading}
                                onClick={onHandleLogin}
                                startIcon={loading && <CircularProgress
                                    color="inherit"
                                    sx={{
                                        mr: 1,
                                        height: '24px !important',
                                        width: '24px !important'
                                    }}
                                />}
                            >
                                {loading ? 'Loggin In...' : 'Login'}
                            </Button>

                            <Typography variant='subtitle1' mt={1} mx="auto">
                                Don&apos;t have an account?... <Link href="/register" passHref>
                                    <Box component="a" color="primary.main">Register Now</Box>
                                </Link>
                            </Typography>
                        </CardActions>
                    </Card>
                </Grid>}
            </Grid>
        </Container>

        <Footer />
    </>)
}

export default Login