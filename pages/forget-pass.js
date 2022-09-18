import { useState, useContext } from 'react';
import { useSession } from "next-auth/react";
import { useRouter } from 'next/router';
import Head from 'next/head';
import Link from 'next/link';

// Context
import { NotifyContext } from '../context/NotifyContext';

// Components
import Footer from "../components/Footer";

// MUI Components
import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CircularProgress from '@mui/material/CircularProgress';


const ForgetPass = () => {
    const router = useRouter();
    const { status } = useSession();
    const { notify } = useContext(NotifyContext);

    const [email, setEmail] = useState('')
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false);

    const onHandleSubmit = async () => {
        setLoading(true);
        (error !== '') && setError('');

        try {
            const res = await (await fetch('/api/auth/forget-pass-mail', {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email: email })
            })).json();

            if (res.resStatus) {
                notify('success', res.message);
                setLoading(false)
            } else if (res.code === 'ENF') {
                setError('Inavlid Email Address.')
                notify('error', res.message);
                setLoading(false)
            } else {
                throw (new Error(res.message))
            }

        } catch (err) {
            setLoading(false);
            notify('error', 'Some error occured. Please try after some time.');
        }
    }


    if (status === "authenticated") {
        router.push('/');
    }

    return (<>
        <Head>
            <title>Forget Password - Manage.io</title>
        </Head>

        <Container component="main" maxWidth={false} sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center'
        }}>
            {status === 'unauthenticated' && <Card sx={{
                marginLeft: { xs: 'auto', md: 0 },
                p: 1, maxWidth: 575
            }}>
                <CardContent sx={{ pt: 3, pb: 1, textAlign: 'center' }}>
                    <Typography mb={1} mx="auto" variant='h4'>
                        Forgot your password?
                    </Typography>
                    <Typography variant='subtitle1' sx={{
                        mb: 4,
                        mx: 'auto',
                        lineHeight: 1.55
                    }}>
                        Please enter the email address associated with your account and We
                        will email you a link to reset your password.
                    </Typography>

                    <TextField
                        type="email"
                        value={email}
                        variant="outlined"
                        disabled={loading}
                        error={error !== ''}
                        label="Email Address"
                        sx={{
                            width: '100%', '& input': {
                                boxShadow: 'none !important'
                            }
                        }}
                        onChange={({ target }) => setEmail(target.value)}
                    />
                </CardContent>
                <CardActions sx={{ px: 2, pb: 2, pt: "4px", display: 'flex', flexDirection: 'column' }}>
                    <Typography variant='body2' sx={{
                        color: 'error.main',
                        mx: 'auto !important',
                        lineHeight: 1.25,
                        minHeight: 20
                    }}> {error} </Typography>

                    <Button size="large" variant='contained'
                        sx={{
                            width: '100%',
                            '&:hover': {
                                backgroundColor: 'primary.light'
                            }
                        }}
                        disabled={loading}
                        onClick={onHandleSubmit}
                        startIcon={loading && <CircularProgress
                            color="inherit"
                            sx={{
                                mr: 1,
                                height: '24px !important',
                                width: '24px !important'
                            }}
                        />}
                    >
                        {loading ? 'Senting...' : 'Send Request'}
                    </Button>

                    <Link href='./login' passHref>
                        <Button size="large" color="primary" sx={{
                            ml: '0 !important',
                            mt: 1, width: '100%'
                        }}>
                            Back
                        </Button>
                    </Link>
                </CardActions>
            </Card>}
        </Container>

        <Footer />
    </>)
}

export default ForgetPass