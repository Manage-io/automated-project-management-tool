import { useState, useContext } from 'react';
import { getSession } from "next-auth/react";
import { useRouter } from 'next/router';
import { decode } from 'jwt-simple';
import Head from 'next/head';

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
import Unauthorize from '../components/Unauthorize';


export const getServerSideProps = async (context) => {
    const { req, query } = context;
    const session = await getSession(req);

    if (session) {
        return {
            redirect: {
                permanent: false,
                destination: "/",
            },
            props: { session },
        }
    } else {
        try {
            const { id } = decode(query.token, process.env.JWT_SECRECT_KEY, false);

            return {
                props: {
                    status: true,
                    data: {
                        id: id
                    }
                },
            };

        } catch (err) {
            console.log(err);

            return {
                props: {
                    status: false,
                    data: {
                        title: "Invalid Reset Token.",
                        subTitle: 'The Link is either invalid or expired. Please get the Reset Password again.'
                    }
                },
            };
        }
    }
};

const ForgetPass = ({ status, data }) => {
    const router = useRouter();
    const { notify } = useContext(NotifyContext);

    const [error, setError] = useState('')
    const [formData, setFormData] = useState({
        pass: { value: '', error: false },
        rePass: { value: '', error: false },
    })
    const [loading, setLoading] = useState(false);

    const onHandleSubmit = async () => {
        setLoading(true);

        try {
            if (formData.pass.value.length < 6) {
                setFormData(e => ({ ...e, pass: { ...e.pass, error: true } }))
                throw ({ message: 'Invalid Password Length.', code: 'CSE' })
            } else {
                setFormData(e => ({ ...e, pass: { ...e.pass, error: false } }))
            }

            if (formData.pass.value !== formData.rePass.value) {
                setFormData(e => ({ ...e, rePass: { ...e.rePass, error: true } }))
                throw ({ message: 'Invalid Confirm Password.', code: 'CSE' })
            } else {
                setFormData(e => ({ ...e, rePass: { ...e.rePass, error: false } }))
            }

            (error !== '') && setError('');


            const res = await (await fetch('/api/auth/reset-password', {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    id: data.id,
                    newPass: formData.pass.value
                })
            })).json();

            if (res.resStatus) {
                notify('success', res.message + ' Login now.');
                router.push('./login');
            } else {
                throw (new Error(res.message))
            }

        } catch (err) {
            if (err.code === 'CSE') {
                setError(err.message);
            } else {
                notify('error', 'Some error occured. Please try after some time.');
            }
            setLoading(false);
        }
    }

    return (<>
        <Head>
            <title>Reset Password - Manage.io</title>
        </Head>

        <Container component="main" maxWidth={false} sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center'
        }}>
            {status ? <Card sx={{
                marginLeft: { xs: 'auto', md: 0 },
                p: 1, maxWidth: 575, width: '100%'
            }}>
                <CardContent sx={{ pt: 3, pb: 1, textAlign: 'center' }}>
                    <Typography mb={5} mx="auto" variant='h4'>
                        Reset Your Password
                    </Typography>

                    <TextField
                        type="password"
                        label="New Password"
                        variant="outlined"
                        placeholder='Type Password'
                        value={formData.pass.value}
                        error={formData.pass.error}
                        sx={{
                            width: '100%', mb: 3, '& input': {
                                boxShadow: 'none !important'
                            }
                        }}
                        onChange={({ target }) => setFormData(e => ({
                            ...e,
                            pass: { ...e.pass, value: target.value }
                        }))}
                    />
                    <TextField
                        type="password"
                        variant="outlined"
                        label="Confirm Password"
                        placeholder="Confirm Password"
                        value={formData.rePass.value}
                        error={formData.rePass.error}
                        sx={{
                            width: '100%', '& input': {
                                boxShadow: 'none !important'
                            }
                        }}
                        onChange={({ target }) => setFormData(e => ({
                            ...e,
                            rePass: { ...e.rePass, value: target.value }
                        }))}
                    />
                </CardContent>
                <CardActions sx={{ px: 2, pb: 2, pt: "4px", display: 'flex', flexDirection: 'column' }}>
                    <Typography variant='body2' sx={{
                        color: 'error.main',
                        mx: 'auto !important',
                        lineHeight: 1.25,
                        minHeight: 20
                    }}>
                        {error}
                    </Typography>

                    <Button size="large" variant='contained'
                        sx={{
                            width: '100%',
                            '&:hover': {
                                backgroundColor: 'primary.light'
                            }
                        }}
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
                        {loading ? 'Senting...' : 'Reset Password'}
                    </Button>
                </CardActions>
            </Card> : <Unauthorize
                title={data.title}
                subTitle={data.subTitle}
            />}
        </Container>

        <Footer />
    </>)
}

export default ForgetPass