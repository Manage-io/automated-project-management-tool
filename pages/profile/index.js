import Head from 'next/head';

// Components
import Footer from '../../components/Footer';

// MUI Components
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

const Profile = () => {
    return <>
        <Head>
            <title>My Profile - Manage.io</title>
        </Head>

        <Container component="main" maxWidth={false}>
            <Typography variant="h4" color='text.primary' gutterBottom>
                My Profile
            </Typography>
        </Container>

        <Footer />
    </>
}

export default Profile