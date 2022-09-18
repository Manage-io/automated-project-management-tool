import { useState, useContext } from 'react';
import { useSession } from "next-auth/react";
import { useTimer } from 'react-timer-hook';
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
import TextField from '@mui/material/TextField';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CircularProgress from '@mui/material/CircularProgress';

// Stylesheets
import styles from '../styles/Auth.module.css';


const Register = () => {
    const router = useRouter();
    const { status } = useSession();
    const { notify } = useContext(NotifyContext);

    const [isOtpSent, setIsOtpSent] = useState(false);

    if (status === "authenticated") {
        router.push('/');
    }

    return (
        <>
            <Head>
                <title>Register - Manage.io</title>
            </Head>

            <Container className={styles.mainContainer} component="main" maxWidth={false}>
                <Grid container spacing={0}>
                    <Grid item md={5} lg={6} sx={{
                        display: { xs: 'none', md: 'flex' },
                        alignItems: 'center'
                    }}>
                        <Box className={styles.sectionLeft} sx={{ pr: 1, pl: { md: 0, lg: 2 } }} >
                            <Typography variant="h4" color='text.primary' gutterBottom>
                                {isOtpSent ?
                                    'Confirm your account' :
                                    'Manage projectts more effectively with Manage.io'
                                }
                            </Typography>
                            <Image
                                src="/assets/images/illustration_register.png"
                                alt="Illustration Login"
                                layout="responsive"
                                width="1440"
                                height="1080"
                            />
                        </Box>
                    </Grid>
                    {status === "unauthenticated" && <Grid item
                        xs={12} md={7} lg={6}
                        sx={{
                            display: { xs: 'none', md: 'flex' },
                            alignItems: 'center'
                        }}
                    >
                        {!isOtpSent ? <SignUp
                            notify={notify}
                            otpSent={(id) => setIsOtpSent(id)}
                        /> : <ConfirmOtp
                            notify={notify}
                            email={isOtpSent}
                        />}
                    </Grid>}
                </Grid>
            </Container>

            <Footer />
        </>
    )
}


const ConfirmOtp = ({ notify, email }) => {
    const router = useRouter();

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState({ text: '', code: 0 });
    const [otp, setOtp] = useState(['', '', '', '', '', '']);

    const { seconds, minutes, isRunning, restart } = useTimer({
        expiryTimestamp: (new Date()).setSeconds((new Date()).getSeconds() + 3 * 60)
    });

    const otpInput = (pos, event) => {
        const { target } = event;

        if (target.value.length === 1 && (/([A-Za-z0-9]){1}/).test(target.value)) {
            setOtp(arr => ([...arr.slice(0, pos), target.value, ...arr.slice(pos + 1)]));

            var nextField = target.parentElement.parentElement.nextElementSibling;
            var nextInput = nextField?.querySelector('input');

            while (nextField && nextInput.value !== '') {
                nextField = nextField.nextElementSibling;
                nextInput = nextField?.querySelector('input');
            }

            if (nextInput) {
                nextInput.focus();
            } else {
                target.blur();
            }
        } else if (target.value === '') {
            setOtp(arr => ([...arr.slice(0, pos), '', ...arr.slice(pos + 1)]));
        }
    }

    const onSubmitOtp = async () => {
        const fullOtp = otp.join('');

        if (fullOtp.length === 6) {
            setLoading(true);
            setError(e => ({ ...e, code: 0 }));

            try {
                const responce = await (await fetch('/api/auth/confirmation', {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        email: email,
                        code: fullOtp
                    })
                })).json();

                if (responce.resStatus) {
                    notify('success', responce.body);
                    setLoading(false);
                    router.push('/login');
                }
                else {
                    throw ({ message: responce.err, code: responce.code })
                }
            } catch (err) {
                if (['UNE', 'UAE', 'OCI'].includes(err.code)) {
                    setError({ text: err.message, code: 2 });
                } else {
                    notify('error', err.message);
                }
                setLoading(false);
            }

        } else {
            setError({ text: 'Please Enter The Full OTP', code: 1 });
        }
    }

    const resendOTP = async ({ target }) => {
        target.innerText = 'Sending OTP...';
        target.disabled = true;

        try {
            let responce = await (await fetch('/api/auth/resend-otp', {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email: email })
            })).json();


            if (responce.resStatus) {
                notify('success', responce.message);
                restart((new Date()).setSeconds((new Date()).getSeconds() + 3 * 60));
            }
            else {
                throw ({ message: responce.err });
            }
        } catch (err) {
            notify('error', responce.err);
        }
    }

    return (
        <Card className={styles.authCard} sx={{ marginLeft: { xs: 'auto', md: 0 }, p: 1 }}>
            <CardContent className={styles.authCardBody} sx={{ pt: 3 }}>
                <Typography variant='h4'>
                    Please check your email!
                </Typography>
                <Typography variant='subtitle1' sx={{
                    mx: 'auto',
                    mb: 3, mt: 1,
                    lineHeight: 1.55
                }}>
                    We have emailed a 6-digit confirmation code to {email},
                    please enter the code in below box to verify your email.
                </Typography>

                <Box mb={2} sx={{
                    display: 'flex',
                    width: '100%',
                    gap: "max(1.9992%, 1vw)",
                    '& input': {
                        textAlign: 'center'
                    }
                }}>
                    <TextField
                        hiddenLabel
                        type="text"
                        value={otp[0]}
                        variant="outlined"
                        onChange={(e) => otpInput(0, e)}
                        error={(error.code === 1 && otp[0] === '') || error.code === 2}
                    />
                    <TextField
                        hiddenLabel
                        type="text"
                        value={otp[1]}
                        variant="outlined"
                        onChange={(e) => otpInput(1, e)}
                        error={(error.code === 1 && otp[1] === '') || error.code === 2}
                    />
                    <TextField
                        hiddenLabel
                        type="text"
                        value={otp[2]}
                        variant="outlined"
                        onChange={(e) => otpInput(2, e)}
                        error={(error.code === 1 && otp[2] === '') || error.code === 2}
                    />
                    <TextField
                        hiddenLabel
                        type="text"
                        value={otp[3]}
                        variant="outlined"
                        onChange={(e) => otpInput(3, e)}
                        error={(error.code === 1 && otp[3] === '') || error.code === 2}
                    />
                    <TextField
                        hiddenLabel
                        type="text"
                        value={otp[4]}
                        variant="outlined"
                        onChange={(e) => otpInput(4, e)}
                        error={(error.code === 1 && otp[4] === '') || error.code === 2}
                    />
                    <TextField
                        hiddenLabel
                        type="text"
                        value={otp[5]}
                        variant="outlined"
                        onChange={(e) => otpInput(5, e)}
                        error={(error.code === 1 && otp[5] === '') || error.code === 2}
                    />
                </Box>

            </CardContent>
            <CardActions className={styles.authCardFooter} sx={{ px: 2, pb: isRunning ? 2 : 1 }}>
                <Typography variant='body2' sx={{
                    color: 'error.main',
                    fontWeight: 'bold',
                    mx: 'auto !important',
                    mb: '0.25rem !important',
                }}> {error.code !== 0 ? error.text : ''} </Typography>

                <Button size="large" variant='contained'
                    sx={{
                        '&:hover': {
                            backgroundColor: 'primary.light'
                        }
                    }}
                    disabled={loading}
                    onClick={onSubmitOtp}
                    startIcon={loading && <CircularProgress
                        color="inherit"
                        sx={{
                            mr: 1,
                            height: '24px !important',
                            width: '24px !important'
                        }}
                    />}
                >
                    {loading ? 'Checking...' : 'Confirm OTP'}
                </Button>

                {isRunning && <Typography variant="subtitle1" sx={{
                    lineHeight: 1,
                    mx: 'auto !important',
                    mt: '17px !important',
                }}>
                    Timer Remaining <Typography component="span" color="error"
                        sx={{ lineHeight: 'inherit' }}
                    >
                        {minutes}:{seconds.length < 2 ? '0' + seconds : seconds}
                    </Typography>
                </Typography>}

                {!isRunning && <Button color="success" size="small"
                    onClick={resendOTP}
                    disabled={loading}
                    sx={{
                        ml: '0 !important',
                        textTransform: 'capitalize',
                        fontSize: '0.875rem !important'
                    }}
                >
                    Resend OTP
                </Button>}
            </CardActions>
        </Card>
    )
}


const SignUp = ({ notify, otpSent }) => {
    const [loading, setLoading] = useState(false);
    const [errorText, setErrorText] = useState('');
    const [formData, setFormData] = useState({
        uName: { value: '', error: false },
        email: { value: '', error: false },
        pass: { value: '', error: false },
        rePass: { value: '', error: false },
    })

    const onHandleRegister = async () => {
        setLoading(true);
        try {
            if (formData.uName.value.length < 4) {
                setFormData(e => ({ ...e, uName: { ...e.uName, error: true } }));
                throw ({ message: 'UserName must be atleast 4 Charecters.', code: 'IFC' });
            } else if (formData.uName.error) {
                setFormData(e => ({ ...e, uName: { ...e.uName, error: false } }));
            }

            if (!(/[A-Za-z0-9._+-]+@[A-Za-z0-9 -]+\.[a-z]{2,4}/).test(formData.email.value)) {
                setFormData(e => ({ ...e, email: { ...e.email, error: true } }));
                throw ({ message: 'Invalid email.', code: 'IFC' });
            } else if (formData.email.error) {
                setFormData(e => ({ ...e, email: { ...e.email, error: false } }));
            }

            if (formData.pass.value.length < 6) {
                setFormData(e => ({ ...e, pass: { ...e.pass, error: true } }));
                throw ({ message: 'Passwor must be atleast 6 Charecters.', code: 'IFC' });
            } else if (formData.pass.error) {
                setFormData(e => ({ ...e, pass: { ...e.pass, error: false } }));
            }

            if (formData.pass.value !== formData.rePass.value) {
                setFormData(e => ({ ...e, rePass: { ...e.rePass, error: true } }));
                throw ({ message: 'Invalid Confirm Password.', code: 'IFC' });
            } else if (formData.rePass.error) {
                setFormData(e => ({ ...e, rePass: { ...e.rePass, error: false } }));
            }

            if (errorText !== '') { setErrorText('') }


            const responce = await (await fetch('/api/auth/signup', {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    userName: formData.uName.value,
                    email: formData.email.value,
                    password: formData.pass.value
                })
            })).json();

            if (responce.resStatus) {
                otpSent(responce.email);
                notify('success', 'Message sent to ' + responce.email);
            }
            else {
                throw ({ message: responce.err, code: responce.code })
            }
        } catch (err) {
            if (['IFC', 'UAE'].includes(err.code)) {
                setErrorText(err.message);
            } else {
                notify('error', err.message);
            }
            setLoading(false);
        }
    }

    return (<>
        <Typography variant="h5" color='text.primary' sx={{
            display: { md: 'none' },
            textAlign: 'center',
            mb: 4
        }}>
            Manage projectts more effectively with Manage.io
        </Typography>
        <Card className={styles.authCard} sx={{ marginLeft: { xs: 'auto', md: 0 }, p: 1 }}>
            <CardContent className={styles.authCardBody} sx={{ pt: 3 }}>
                <Typography variant='h5'>
                    Get started absolutely free.
                </Typography>
                <Typography mb={4} variant='subtitle1' sx={{
                    textAlign: 'left',
                    color: 'text.secondary'
                }}>
                    Free forever. No credit card needed.
                </Typography>

                <TextField
                    type="text"
                    label="UserName"
                    variant="outlined"
                    placeholder='Username'
                    value={formData.uName.value}
                    error={formData.uName.error}
                    sx={{
                        mb: 3, '& input': {
                            boxShadow: 'none !important'
                        }
                    }}
                    onChange={({ target }) => setFormData(e => ({
                        ...e,
                        uName: { ...e.uName, value: target.value }
                    }))}
                />
                <TextField
                    type="email"
                    label="Email"
                    variant="outlined"
                    placeholder='mail@email.com'
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
                    type="password"
                    label="Password"
                    variant="outlined"
                    placeholder='Password'
                    value={formData.pass.value}
                    error={formData.pass.error}
                    sx={{
                        mb: 3, '& input': {
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
                        mb: 2, '& input': {
                            boxShadow: 'none !important'
                        }
                    }}
                    onChange={({ target }) => setFormData(e => ({
                        ...e,
                        rePass: { ...e.rePass, value: target.value }
                    }))}
                />

            </CardContent>
            <CardActions className={styles.authCardFooter} sx={{ p: 2 }}>
                <Typography variant='body2' sx={{
                    color: 'error.main',
                    mb: '0.25rem !important'
                }}> {errorText} </Typography>

                <Button size="large" variant='contained'
                    sx={{
                        '&:hover': {
                            backgroundColor: 'primary.light'
                        }
                    }}
                    disabled={loading}
                    onClick={onHandleRegister}
                    startIcon={loading && <CircularProgress
                        color="inherit"
                        sx={{
                            mr: 1,
                            height: '24px !important',
                            width: '24px !important'
                        }}
                    />}
                >
                    {loading ? 'Registering...' : 'Register'}
                </Button>

                <Typography variant='body2' sx={{
                    mt: '.65rem !important',
                    mx: 'auto !important'
                }}>
                    By registering, I agree to Manage.io&nbsp;
                    <Link href='/' passHref>
                        <Typography component='a' color="primary" >
                            Terms and policy.
                        </Typography>
                    </Link>
                </Typography>
            </CardActions>
        </Card>
    </>)
}

export default Register;